'use client'

import React from 'react'
import { Reveal } from './Reveal'

type Step = {
  number: number
  period: string
  title: string
  description: string
}

const STEPS: Step[] = [
  {
    number: 1,
    period: 'Week 1',
    title: 'ヒアリング',
    description: '貴社の課題・組織構成をヒアリングし、対象チームと運用方針を決定します。',
  },
  {
    number: 2,
    period: 'Week 2',
    title: '環境構築',
    description: 'アカウント発行・チーム設定・管理者向けレクチャーを実施します。',
  },
  {
    number: 3,
    period: 'Week 3-4',
    title: 'テスト運用',
    description: '対象チームで実運用をスタート。日々の診断データが蓄積されていきます。',
  },
  {
    number: 4,
    period: 'Day 30+',
    title: '本格運用',
    description: 'レポートの項目・介入判断の基準を御社に合わせて調整し、全社展開へ。',
  },
]

export function OnboardingSteps() {
  return (
    <section aria-labelledby="onboarding-title" className="bg-[#141210] py-20 sm:py-28">
      <div className="hr-container">
        <Reveal>
          <h2
            id="onboarding-title"
            className="hr-impact text-center font-black leading-tight text-[#fff200]"
            style={{ fontSize: 'clamp(1.4rem, 4.5vw, 2.4rem)' }}
          >
            最短30日で定着する導入ロードマップ
          </h2>
        </Reveal>

        {/* Timeline */}
        <div className="relative mt-14 sm:mt-20">
          {/* Horizontal connector line (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-white/15 lg:block"
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.number} delay={i * 0.1}>
                <div className="relative flex flex-col items-center text-center lg:items-center">
                  {/* Vertical connector (mobile/tablet) */}
                  {i < STEPS.length - 1 && (
                    <div
                      aria-hidden="true"
                      className="absolute left-1/2 top-14 h-[calc(100%+2rem)] -translate-x-1/2 border-l-2 border-dashed border-white/15 sm:hidden"
                    />
                  )}

                  {/* Step circle */}
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-[#fff200] text-xl font-black text-[#141210]">
                    {step.number}
                  </div>

                  {/* Card */}
                  <div className="mt-4 w-full rounded-[14px] bg-[#1c1c1e] px-5 py-5 ring-1 ring-white/5">
                    <span className="hr-latin text-xs font-bold tracking-widest text-[#fff200]/70">
                      {step.period}
                    </span>
                    <h3 className="hr-impact mt-1.5 text-lg font-bold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/65">{step.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <Reveal delay={0.4}>
          <p className="mt-10 text-center text-xs leading-relaxed text-white/45 sm:mt-14 sm:text-sm">
            ※ 組織規模・ご要望に応じてスケジュールは調整いたします。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
