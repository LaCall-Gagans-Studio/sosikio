'use client'

import React, { useCallback, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import {
  ADDITIONAL_PERSONAS,
  FIXED_SESSION,
  SELECTABLE_PERSONAS,
  gapVerdict,
  signed,
  type GapVerdict,
} from './os-data'

const VERDICT_MARK: Record<GapVerdict, string> = {
  範囲内: '—',
  注意: '△',
  ズレ大: '▲',
}

/**
 * Thinking OS の人格切替。
 * 実測値は固定（＝同じ会議）で、選んだ人格の理想値だけが変わる。
 * これで「物差しが違えば、出てくる問いが変わる」ことを1画面で示す。
 *
 * 切り替えられるのは標準提供の3体のみ。それ以外はラインナップとして下に列挙する。
 */
export function OsSwitchboard() {
  const [selected, setSelected] = useState(SELECTABLE_PERSONAS[0].osId)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const reduced = useReducedMotion()

  const index = SELECTABLE_PERSONAS.findIndex((p) => p.osId === selected)
  const persona = SELECTABLE_PERSONAS[index]

  const rows = useMemo(() => {
    const { vitality, stress, speakerMaxShare } = FIXED_SESSION
    return [
      {
        key: 'vitality',
        label: '活力（WE）',
        actual: vitality.toFixed(2),
        target: persona.ideal.vitality.toFixed(2),
        gap: vitality - persona.ideal.vitality,
        digits: 2,
        kind: 'score' as const,
      },
      {
        key: 'stress',
        label: 'ストレス（BO）',
        actual: stress.toFixed(2),
        target: persona.ideal.stress.toFixed(2),
        gap: stress - persona.ideal.stress,
        digits: 2,
        kind: 'score' as const,
      },
      {
        key: 'share',
        label: 'いちばん話した人の割合',
        actual: `${Math.round(speakerMaxShare * 100)}%`,
        target: `${Math.round(persona.ideal.speakerMaxShare * 100)}%`,
        gap: speakerMaxShare - persona.ideal.speakerMaxShare,
        digits: 2,
        kind: 'share' as const,
      },
    ]
  }, [persona])

  /** タブは矢印キーで移動できるようにする */
  const onKeyDown = useCallback((e: React.KeyboardEvent, i: number) => {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
    if (!dir) return
    e.preventDefault()
    const next = (i + dir + SELECTABLE_PERSONAS.length) % SELECTABLE_PERSONAS.length
    setSelected(SELECTABLE_PERSONAS[next].osId)
    tabRefs.current[next]?.focus()
  }, [])

  return (
    <div className="mt-14 lg:mt-20">
      {/* 同じ会議であることの担保。ここは人格を変えても動かない */}
      <div className="border border-hr-rule-strong bg-hr-raised px-6 py-6 sm:px-8">
        <p className="hr-label">こ の 会 議 の 実 測 値 （ 人 格 を 変 え て も 動 き ま せ ん ）</p>
        <dl className="mt-4 flex flex-wrap gap-x-10 gap-y-4">
          <div>
            <dt className="hr-label">活 力（W E）</dt>
            <dd className="hr-num mt-1 text-xl text-hr-ink">
              {FIXED_SESSION.vitality.toFixed(2)}
            </dd>
          </div>
          <div>
            <dt className="hr-label">ス ト レ ス（B O）</dt>
            <dd className="hr-num mt-1 text-xl text-hr-ink">{FIXED_SESSION.stress.toFixed(2)}</dd>
          </div>
          <div>
            <dt className="hr-label">い ち ば ん 話 し た 人 の 割 合</dt>
            <dd className="hr-num mt-1 text-xl text-hr-ink">
              {Math.round(FIXED_SESSION.speakerMaxShare * 100)}%
            </dd>
          </div>
          <div>
            <dt className="hr-label">検 出 し た 状 況</dt>
            <dd className="mt-1.5 flex flex-wrap gap-2">
              {FIXED_SESSION.signals.map((s) => (
                <span
                  key={s}
                  className="border border-hr-rule px-2 py-1 text-[11px] text-hr-ink"
                >
                  {s}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </div>

      {/* 人格タブ */}
      <div
        role="tablist"
        aria-label="Thinking OS の人格"
        className="mt-6 grid grid-cols-1 gap-px border border-hr-rule bg-hr-rule sm:grid-cols-3"
      >
        {SELECTABLE_PERSONAS.map((p, i) => {
          const active = p.osId === selected
          return (
            <button
              key={p.osId}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              id={`os-tab-${p.osId}`}
              aria-selected={active}
              aria-controls="os-panel"
              tabIndex={active ? 0 : -1}
              onClick={() => setSelected(p.osId)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`flex items-center gap-3 px-4 py-4 text-left transition-colors ${
                active ? 'bg-hr-ink text-hr-paper' : 'bg-hr-raised text-hr-ink hover:bg-hr-sunken'
              }`}
            >
              <span
                className="block shrink-0 border p-0.5"
                style={{ borderColor: active ? p.accent : 'var(--color-hr-rule)' }}
              >
                <Image
                  src={p.avatar}
                  alt=""
                  aria-hidden
                  width={640}
                  height={640}
                  className="h-10 w-10 object-cover"
                />
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] font-bold leading-tight">{p.name}</span>
                <span
                  className={`mt-1 block text-[11px] leading-snug ${
                    active ? 'text-hr-paper/70' : 'text-hr-faint'
                  }`}
                >
                  {p.titleFocus}
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* パネル。中身は総入れ替えになるが、動かさずフェードだけ */}
      <motion.div
        role="tabpanel"
        id="os-panel"
        aria-labelledby={`os-tab-${persona.osId}`}
        key={reduced ? undefined : persona.osId}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.16, ease: [0.2, 0, 0, 1] }}
        className="grid gap-px border-x border-b border-hr-rule bg-hr-rule lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)]"
      >
        {/* 左：肖像と人格の輪郭 */}
        <div className="bg-hr-raised p-6 sm:p-8">
          <div className="border p-1" style={{ borderColor: persona.accent }}>
            <Image
              src={persona.avatar}
              alt={`${persona.name} Thinking OS のポートレート`}
              width={640}
              height={640}
              className="h-auto w-full object-cover"
            />
          </div>

          <h3 className="hr-heading mt-6 text-hr-ink">{persona.name}</h3>
          <p className="mt-2 text-[13px] leading-7 text-hr-muted">{persona.tagline}</p>

          <p className="mt-5 border-t border-hr-rule pt-5 text-[13px] leading-7 text-hr-ink">
            指摘するのは「{persona.titleFocus}」
          </p>

          <p className="mt-5 text-[12px] leading-7 text-hr-muted">{persona.overview}</p>

          <p className="hr-label mt-6 border-t border-hr-rule pt-4">
            v{persona.version} · 下書き · 原則 {persona.principleCount} / Reaction{' '}
            {persona.reactionCount}
          </p>
        </div>

        {/* 右：GAP と、この人格が選んだ問い */}
        <div className="bg-hr-paper p-6 sm:p-8">
          <p className="hr-label" lang="en">
            GAP
          </p>
          <h4 className="hr-heading mt-2 text-hr-ink">
            {persona.name}の物差しで見た現在地
          </h4>

          <table className="mt-6 w-full text-left">
            <thead>
              <tr className="border-b border-hr-rule-strong">
                <th className="hr-label pb-2 font-normal">指 標</th>
                <th className="hr-label pb-2 text-right font-normal">実 測</th>
                <th className="hr-label pb-2 text-right font-normal">目 標</th>
                <th className="hr-label pb-2 text-right font-normal">G A P</th>
                <th className="hr-label pb-2 text-right font-normal">判 定</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const verdict = gapVerdict(r.gap, r.kind)
                return (
                  <tr key={r.key} className="border-b border-hr-rule">
                    <td className="py-3.5 pr-3 text-[13px] text-hr-ink">
                      <span
                        className="mr-2 inline-block size-1.5 align-middle"
                        style={{ background: persona.accent }}
                        aria-hidden
                      />
                      {r.label}
                    </td>
                    <td className="hr-num py-3.5 text-right text-[14px] text-hr-muted">
                      {r.actual}
                    </td>
                    <td className="hr-num py-3.5 text-right text-[14px] text-hr-ink">{r.target}</td>
                    <td className="hr-num py-3.5 text-right text-[14px] text-hr-ink">
                      {r.kind === 'share'
                        ? `${signed(r.gap * 100, 0)}pt`
                        : signed(r.gap, r.digits)}
                    </td>
                    <td className="py-3.5 text-right text-[12px] text-hr-ink whitespace-nowrap">
                      <span aria-hidden className="mr-1 text-hr-faint">
                        {VERDICT_MARK[verdict]}
                      </span>
                      {verdict}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <p className="mt-4 text-[12px] leading-6 text-hr-faint">{persona.idealNote}</p>

          {/* 選ばれたカード */}
          <div className="mt-8 border-t border-hr-rule-strong pt-7">
            <p className="hr-label" lang="en">
              SELECTED REACTION · {persona.reaction.id}
            </p>
            <p className="hr-display mt-3 text-[19px] leading-relaxed text-hr-ink">
              {persona.reaction.title}
            </p>

            <dl className="mt-6 space-y-5">
              <div className="border-l-2 border-hr-ink pl-4">
                <dt className="hr-label">リ ー ダ ー へ の 問 い</dt>
                <dd className="mt-1.5 text-[14px] leading-7 text-hr-ink">
                  {persona.reaction.leaderQuestion}
                </dd>
              </div>
              <div className="pl-4">
                <dt className="hr-label">次 の 一 手</dt>
                <dd className="mt-1.5 text-[13px] leading-7 text-hr-muted">
                  {persona.reaction.actionCandidate}
                </dd>
              </div>
              <div className="pl-4">
                <dt className="hr-label">避 け る 反 応</dt>
                <dd className="mt-1.5 text-[13px] leading-7 text-hr-muted">
                  {persona.reaction.avoid}
                </dd>
              </div>
            </dl>
          </div>

          {/* 口調の実物。人格差がいちばん短時間で伝わる */}
          <figure className="mt-8 border-t border-hr-rule pt-7">
            <p className="hr-label" lang="en">
              VOICE
            </p>
            <blockquote className="hr-display mt-3 text-[17px] leading-loose text-hr-ink">
              「{persona.voiceSample}」
            </blockquote>
          </figure>
        </div>
      </motion.div>

      {/* 標準3体以外は、詳細を出さずラインナップとして示す */}
      <div className="mt-6 border border-hr-rule bg-hr-sunken p-6 sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h4 className="hr-heading text-hr-ink">選択できる人格は、ほかにもあります</h4>
          <span className="hr-badge">全 て 提 供 中</span>
        </div>
        <p className="hr-measure mt-3 text-[14px] leading-7 text-hr-muted">
          上記3体は全プランに標準搭載されます。加えて、目的や職掌に応じた人格へ切り替えられます。
        </p>

        <ul className="mt-6 grid gap-px bg-hr-rule sm:grid-cols-2 lg:grid-cols-3">
          {ADDITIONAL_PERSONAS.map((p) => (
            <li
              key={p.name}
              className="group bg-hr-raised p-5 transition-colors hover:bg-hr-paper"
            >
              <p className="flex items-baseline gap-2.5">
                <span
                  aria-hidden
                  className="block size-1.5 shrink-0"
                  style={{ background: 'var(--color-hr-accent)' }}
                />
                <span className="text-[14px] font-bold text-hr-ink">{p.name}</span>
              </p>
              <p className="mt-2 pl-4 text-[12px] leading-6 text-hr-muted">「{p.focus}」</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
