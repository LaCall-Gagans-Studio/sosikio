import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

const STEPS = [
  {
    no: '01',
    title: 'ヒアリング',
    body: '現行の定例・1on1と、見たい観点を確認します。',
  },
  {
    no: '02',
    title: '初回解析',
    body: '既存の録音で一度回し、継続可否をご判断いただきます。',
  },
  {
    no: '03',
    title: '本運用',
    body: '定例ごとに蓄積し、推移を追跡します。専用機材は不要です。',
  },
]

export function Onboarding() {
  return (
    <section
      id="onboarding"
      aria-labelledby="onboarding-title"
      className="scroll-mt-20 border-b border-hr-rule py-16 sm:py-20 lg:py-24"
    >
      <div className="hr-container">
        <SectionHead
          no="05"
          eyebrow="Onboarding"
          id="onboarding-title"
          title="導入の流れ"
          accent={{ src: '/hr/probe/accent-pen.webp' }}
          lead="新しい会議体は不要です。いまある定例の録音から始められます。"
        />

        <ol className="mt-10 lg:mt-14">
          {STEPS.map(({ no, title, body }, i) => (
            <Reveal as="li" key={no} delay={i * 0.04}>
              <div className="grid gap-x-8 gap-y-2 border-t border-hr-rule py-6 sm:grid-cols-[auto_minmax(0,13rem)_minmax(0,1fr)]">
                <span className="hr-num text-[13px] text-hr-faint">{no}</span>
                <h3 className="text-[16px] font-semibold text-hr-ink">{title}</h3>
                <p className="text-[14px] leading-7 text-hr-muted sm:col-start-3">{body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <dl className="mt-2 grid gap-x-10 gap-y-6 border-t border-hr-rule-strong pt-8 sm:grid-cols-3">
            {[
              { term: 'ヒアリングから初回報告まで', value: '3', unit: '週間' },
              { term: '貴社側で必要な準備工数', value: '2', unit: '時間程度' },
              { term: '既存ツールとの連携作業', value: '0', unit: '件' },
            ].map(({ term, value, unit }) => (
              <div key={term} className="border-l-2 border-hr-rule-strong pl-4">
                <dd className="flex items-baseline gap-1.5 text-hr-ink">
                  <span className="hr-display text-[30px] leading-none">{value}</span>
                  <span className="text-[12px] text-hr-muted">{unit}</span>
                </dd>
                <dt className="mt-2 text-[12px] leading-6 text-hr-muted">{term}</dt>
              </div>
            ))}
          </dl>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] leading-7 text-hr-muted">
              費用は対象セッション数によります。まずは概算をご提示します。
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
