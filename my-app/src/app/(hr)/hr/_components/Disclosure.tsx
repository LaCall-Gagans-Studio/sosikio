import React from 'react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

/**
 * Lv.4 側に置く密な表。Mono・全値・実名。
 * 数値はダッシュボードや Thinking OS 切替と同じ会議のもの。
 * 平均 WE 4.82 / 平均 BO 3.91 / 最大シェア 48% がここから復元できる。
 * 判定は基準線 4.50 に対する上下で決まる（活力が上・ストレスが下ならイキイキ）。
 */
const FULL_ROWS = [
  { name: '田 中', we: '5.62', bo: '3.12', share: '48%', judge: 'イキイキ' },
  { name: '佐 藤', we: '5.18', bo: '4.62', share: '21%', judge: 'モエスギ' },
  { name: '鈴 木', we: '4.88', bo: '3.38', share: '14%', judge: 'イキイキ' },
  { name: '高 橋', we: '4.31', bo: '3.35', share: '10%', judge: 'ぬるま湯' },
  { name: '伊 藤', we: '4.11', bo: '5.08', share: '7%', judge: '危険' },
]

const JUDGE_COLOR: Record<string, string> = {
  イキイキ: 'var(--color-hr-q-vital)',
  モエスギ: 'var(--color-hr-q-burn)',
  ぬるま湯: 'var(--color-hr-q-tepid)',
  危険: 'var(--color-hr-q-risk)',
}

export function Disclosure() {
  return (
    <section
      id="disclosure"
      aria-labelledby="disclosure-title"
      className="scroll-mt-20 border-b border-hr-rule py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="09"
          eyebrow="Governance"
          id="disclosure-title"
          title="開示範囲のコントロール"
          accent={{ src: '/hr/probe/accent-clock.webp' }}
          lead={
            <>
              個人のストレス値が同僚に共有される懸念があると、現場の受容性は大きく下がります。一方で全面的に非開示とすれば、一方的な監視と受け取られます。
              <br />
              probe は同一の解析結果から、開示範囲の異なるレポートを5段階で発行できます。
            </>
          }
        />

        {/* ここでレイアウトを一度壊す。疎と密を横に並べる */}
        <div className="mt-14 grid gap-px border border-hr-rule bg-hr-rule lg:mt-20 lg:grid-cols-2">
          {/* 疎：Lv.0 占いモード */}
          {/* min-w-0 がないと、右パネルの表の min-width がグリッドトラックを押し広げる */}
          <Reveal className="flex min-w-0 flex-col items-center justify-center bg-hr-paper px-6 py-20 text-center sm:px-10 lg:py-28">
            <p className="hr-label" lang="en">
              LV.0 ／ THROUGH TODAY
            </p>
            <p className="hr-display mt-10 text-[clamp(26px,3.4vw,40px)] leading-[1.5] text-hr-ink">
              今日のチームは、
              <br />
              上り坂の途中にいます。
            </p>

            {/* 手描き風の波線を1本だけ区切りに使う */}
            <svg
              width="120"
              height="14"
              viewBox="0 0 120 14"
              aria-hidden
              className="my-12 text-hr-rule-strong"
            >
              <path
                d="M0 7 H44 M76 7 H120 M52 7 q3 -6 6 0 t6 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>

            <p className="hr-label" lang="en">
              YOUR WEATHER
            </p>
            {/* 天気は絵文字ではなく細線のピクトグラム */}
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              aria-label="晴れときどき曇り"
              role="img"
              className="mt-7 text-hr-ink"
            >
              <circle
                cx="22"
                cy="21"
                r="9"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <line
                  key={deg}
                  x1="22"
                  y1="7"
                  x2="22"
                  y2="3"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  transform={`rotate(${deg} 22 21)`}
                />
              ))}
              <path
                d="M18 42 a7 7 0 0 1 7-7 a9 9 0 0 1 17 2 a6 6 0 0 1 -1 12 H25 a7 7 0 0 1 -7-7 z"
                fill="var(--color-hr-paper)"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinejoin="round"
              />
            </svg>
            <p className="hr-display mt-5 text-[19px] text-hr-ink">晴れときどき曇り</p>
          </Reveal>

          {/* 密：Lv.4 フル開示 */}
          <Reveal delay={0.06} className="min-w-0 bg-hr-raised px-6 py-10 sm:px-8 lg:py-12">
            <p className="hr-label" lang="en">
              LV.4 ／ FULL DISCLOSURE
            </p>
            <h3 className="hr-heading mt-2 text-hr-ink">話者別の全指標</h3>

            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[380px] text-left">
                <thead>
                  <tr className="border-b border-hr-rule-strong">
                    <th className="hr-label pb-2 font-normal">話 者</th>
                    <th className="hr-label pb-2 text-right font-normal">W E</th>
                    <th className="hr-label pb-2 text-right font-normal">B O</th>
                    <th className="hr-label pb-2 text-right font-normal">シ ェ ア</th>
                    <th className="hr-label pb-2 text-right font-normal">判 定</th>
                  </tr>
                </thead>
                <tbody>
                  {FULL_ROWS.map((r) => (
                    <tr key={r.name} className="border-b border-hr-rule">
                      <td className="py-3 pr-3 text-[13px] text-hr-ink">{r.name}</td>
                      <td className="hr-num py-3 text-right text-[13px] text-hr-ink">{r.we}</td>
                      <td className="hr-num py-3 text-right text-[13px] text-hr-ink">{r.bo}</td>
                      <td className="hr-num py-3 text-right text-[13px] text-hr-muted">
                        {r.share}
                      </td>
                      <td className="py-3 text-right text-[12px] whitespace-nowrap">
                        <span
                          className="mr-1.5 inline-block size-1.5 align-middle"
                          style={{ background: JUDGE_COLOR[r.judge] }}
                          aria-hidden
                        />
                        <span className="text-hr-ink">{r.judge}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <dl className="mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-hr-rule pt-6 sm:grid-cols-4">
              {[
                ['平 均 W E', '4.82'],
                ['平 均 B O', '3.91'],
                ['G i n i', '0.38'],
                ['発 話 数', '588'],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="hr-label">{k}</dt>
                  <dd className="hr-num mt-1 text-[17px] text-hr-ink">{v}</dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 text-[12px] leading-6 text-hr-faint">
              左の一文と同じ会議（第12回 開発定例）です。※ 表示イメージで、氏名・数値はすべて架空のものです。
            </p>
          </Reveal>
        </div>

        <Reveal>
          <p className="hr-heading mt-12 max-w-[30em] text-hr-ink lg:mt-16">
            上記2点は同一の解析結果です。開示対象に応じて、粒度のみを変えています。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
