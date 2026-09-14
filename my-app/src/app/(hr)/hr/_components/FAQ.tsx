import React from 'react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

/** JSON-LD の FAQPage と本文を一致させるため、データはここを唯一の出所にする */
export const FAQ_ITEMS = [
  {
    q: '会話の内容を聞かれてしまうのですか？',
    a: 'probe が主に見るのは「何を話したか」ではなく「どんな声で話したか」です。会議の書き起こしを上司が読んで評価する、という使い方は想定していません。',
  },
  {
    q: '特別な機材やアプリは必要ですか？',
    a: '不要です。スマホやPC、Web会議ツールの録音があれば始められます。',
  },
  {
    q: 'メンバーに数値が見えてしまうのが不安です。',
    a: '見せる範囲を5段階から選べます。見せない情報はレポートに書き出されないため、個人の数値が誤って全員に届くことはありません。',
  },
  {
    q: '人事評価に使えますか？',
    a: '想定していません。あくまで「次に誰と何を話すか」を決めるための道具です。',
  },
  {
    q: '導入までどれくらいかかりますか？',
    a: '録音データがあれば即日から始められます。システム連携は不要です。',
  },
]

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-20 border-b border-hr-rule py-16 sm:py-20 lg:py-24"
    >
      <div className="hr-container">
        <SectionHead no="06" eyebrow="FAQ" id="faq-title" title="よくあるご質問" />

        <dl className="mt-10 lg:mt-14">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 0.04}>
              <details className="group border-t border-hr-rule last:border-b last:border-hr-rule">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <dt className="text-[15px] font-medium leading-8 text-hr-ink sm:text-[16px]">
                    {q}
                  </dt>
                  <span
                    aria-hidden
                    className="relative mt-3 block size-3.5 shrink-0 text-hr-muted"
                  >
                    <span className="absolute inset-x-0 top-1/2 block h-px -translate-y-1/2 bg-current" />
                    <span className="absolute inset-y-0 left-1/2 block w-px -translate-x-1/2 bg-current transition-opacity group-open:opacity-0" />
                  </span>
                </summary>
                <dd className="hr-measure pb-7 text-[14px] leading-8 text-hr-muted">{a}</dd>
              </details>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
