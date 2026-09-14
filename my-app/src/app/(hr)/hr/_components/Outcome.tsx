import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { TrendChart } from './TrendChart'
import { ChartReading } from './ChartReading'

const STATES = [
  {
    label: '会 議 の 翌 日',
    title: '誰と話すべきかが、決まっている',
    body: '状態が下がっているメンバーと、確認すべき論点が特定された状態でレポートが届きます。',
  },
  {
    label: '導 入 1 か 月',
    title: '面談が、近況報告で終わらない',
    body: '論点が事前に届くため、1on1が具体的な話から始まります。',
  },
  {
    label: '導 入 3 か 月',
    title: '打った手の成否が、データで残る',
    body: '施策の前後で数値を比較でき、続ける／止めるの判断が根拠を持ちます。',
  },
  {
    label: '導 入 6 か 月',
    title: '異変が、報告される前に見つかる',
    body: '平常時からの逸脱を検知できるため、退職や体調不良の申告を待たずに動けます。',
  },
]

export function Outcome() {
  return (
    <section
      id="outcome"
      aria-labelledby="outcome-title"
      className="scroll-mt-20 border-b border-hr-rule py-16 sm:py-20 lg:py-24"
    >
      <div className="hr-container">
        <SectionHead
          no="04"
          eyebrow="After Introduction"
          id="outcome-title"
          title="組織は、こう改善していきます"
          accent={{ src: '/hr/probe/accent-plant.webp' }}
          lead="既存の定例会議を活かすだけで、現場の動き方が変わります。"
        />

        <Reveal className="hr-panel mt-10 lg:mt-14">
          <p className="hr-label" lang="en">
            SESSION TREND
          </p>
          <h3 className="hr-heading mt-2 text-hr-ink">セッション間の推移</h3>
          <p className="mt-3 text-[13px] leading-7 text-hr-muted">
            定例ごとにデータが貯まります。打ち手を実施した回に印を付け、効果をそのまま検証できます。
          </p>
          <div className="mt-7 overflow-x-auto">
            <div className="min-w-[680px]">
              <TrendChart />
            </div>
          </div>
          <ChartReading
            findings={[
              '打ち手実施後、活力は 4.10 から 4.82 へ、ストレスは 4.90 から 3.91 へ改善しています。基準線を上回ったのは実施から約1か月後です。',
            ]}
            action="効果が確認できた打ち手を他チームへ展開し、基準線を下回った時点で介入します。"
          />
        </Reveal>

        <ol className="mt-6 grid gap-px bg-hr-rule sm:grid-cols-2 lg:grid-cols-4">
          {STATES.map(({ label, title, body }, i) => (
            <Reveal
              as="li"
              key={label}
              delay={i * 0.05}
              className="flex flex-col bg-hr-raised p-7 transition-colors duration-200 hover:bg-hr-paper lg:p-8"
            >
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
          <div className="mt-10 flex flex-col gap-4 border-t border-hr-rule-strong pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="hr-heading text-hr-ink">導入スケジュールと費用感は、資料でご確認ください。</p>
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
