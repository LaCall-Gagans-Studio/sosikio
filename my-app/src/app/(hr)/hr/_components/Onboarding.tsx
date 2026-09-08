import React from 'react'
import Image from 'next/image'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

const STEPS = [
  {
    no: '01',
    title: 'ヒアリング',
    body: '現行の定例・1on1の運用状況、重視する観点、想定する開示範囲を確認します。',
  },
  {
    no: '02',
    title: '測定設計',
    body: '対象セッション、録音方法、参加者への説明および同意取得のプロセスを策定します。',
  },
  {
    no: '03',
    title: '初回解析・報告',
    body: '解析結果を担当者とともに確認します。この時点で、継続導入の可否をご判断いただけます。',
  },
  {
    no: '04',
    title: '本運用',
    body: '定例ごとにデータを蓄積し、推移を追跡します。自社人格の開発は、必要が生じた段階で別途ご相談ください。',
  },
]

export function Onboarding() {
  return (
    <section
      id="onboarding"
      aria-labelledby="onboarding-title"
      className="scroll-mt-20 border-b border-hr-rule py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="11"
          eyebrow="Onboarding"
          id="onboarding-title"
          title="導入の流れ"
          accent={{ src: '/hr/probe/accent-pen.webp' }}
          lead={
            <>
              新規の仕組みを立ち上げる必要はありません。既存の会議を1つ選定し、録音を開始するところから始めます。
            </>
          }
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)] lg:gap-16">
          <ol>
            {STEPS.map(({ no, title, body }, i) => (
              <Reveal as="li" key={no} delay={i * 0.05}>
                <div className="grid gap-x-8 gap-y-2 border-t border-hr-rule py-7 sm:grid-cols-[auto_minmax(0,13rem)_minmax(0,1fr)]">
                  <span className="hr-num text-[13px] text-hr-faint">{no}</span>
                  <h3 className="text-[16px] font-semibold text-hr-ink">{title}</h3>
                  <p className="text-[14px] leading-7 text-hr-muted sm:col-start-3">{body}</p>
                </div>
              </Reveal>
            ))}

            <Reveal as="li">
              <div className="border-t border-hr-rule-strong pt-8">
                <p className="hr-label">所 要 期 間 の 目 安</p>
                <dl className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-3">
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
                <p className="mt-8 text-[13px] leading-7 text-hr-muted">
                  費用と期間は、対象セッション数と自社人格を開発するかどうかで変わります。まずは概算をご提示しますので、お気軽にご相談ください。
                </p>
              </div>
            </Reveal>
          </ol>

          <Reveal delay={0.1} className="relative hidden min-h-[420px] lg:block">
            <Image
              src="/hr/probe/portrait-folder.webp"
              alt="資料を手にした人物のモノクロ写真"
              fill
              sizes="340px"
              className="object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
