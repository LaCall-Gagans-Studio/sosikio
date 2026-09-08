import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

/**
 * 機能でも効果でもなく、「運用が定着したあとの状態」を書く。
 * 買い手が最終的に買っているのは機能ではなく、この状態。
 */
const STATES = [
  {
    label: '会 議 の 翌 日',
    title: '誰と話すべきかが、決まっている',
    body: '定例が終わると、状態が下がっているメンバーと確認すべき論点が特定された状態でレポートが届きます。マネージャーが誰から手をつけるか迷う時間がなくなります。',
  },
  {
    label: '導 入 1 か 月',
    title: '面談が、近況報告で終わらない',
    body: '事前に論点が用意されているため、1on1が具体的な話から始まります。「特に問題ありません」で終わる面談が減り、面談自体の目的が共有されます。',
  },
  {
    label: '導 入 3 か 月',
    title: '打った手の成否が、データで残る',
    body: '施策の前後で数値を比較できるため、続けるべき取り組みと止めるべき取り組みが判別できます。経験と勘に基づく議論から、根拠のある意思決定に移行します。',
  },
  {
    label: '導 入 6 か 月',
    title: '異変が、報告される前に見つかる',
    body: '各チームの推移が蓄積され、平常時の水準が把握できます。そこからの逸脱を検知できるため、退職の申し出や体調不良の報告を待たずに動けます。',
  },
]

export function Outcome() {
  return (
    <section
      id="outcome"
      aria-labelledby="outcome-title"
      className="scroll-mt-20 border-b border-hr-rule py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="04"
          eyebrow="After Introduction"
          id="outcome-title"
          title="probe を運用している組織は、こういう状態になります"
          accent={{ src: '/hr/probe/accent-clock.webp' }}
          lead={
            <>
              機能そのものではなく、運用が定着したあとに現場がどう変わるかを時系列で示します。
            </>
          }
        />

        <ol className="mt-12 grid gap-px bg-hr-rule sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {STATES.map(({ label, title, body }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 0.05}
              className="flex flex-col bg-hr-raised p-7 transition-colors duration-200 hover:bg-hr-paper lg:p-8"
            >
              {/* 4枚を横断する時間軸。丸が濃くなるほど運用が進んだ状態 */}
              <div aria-hidden className="mb-6 flex items-center gap-3">
                <span
                  className="block size-2 shrink-0 rounded-none"
                  style={{
                    background: 'var(--color-hr-accent)',
                    opacity: 0.4 + i * 0.2,
                  }}
                />
                <span className="h-px flex-1 bg-hr-rule-strong" />
              </div>

              <span className="hr-badge hr-badge-accent">{label}</span>
              <h3 className="hr-heading mt-5 text-hr-ink">{title}</h3>
              <p className="mt-4 text-[14px] leading-7 text-hr-muted">{body}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-12 flex flex-col gap-4 border-t border-hr-rule-strong pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <p className="hr-heading text-hr-ink">
              いずれも、既存の定例に相乗りするだけで到達できる状態です。
            </p>
            <a href="#lead-form" className="hr-btn hr-btn-primary shrink-0">
              資料を請求する（無料）
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
