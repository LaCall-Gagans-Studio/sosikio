import React from 'react'
import { Reveal } from './Reveal'

const RULES = [
  {
    no: '01',
    title: '人事評価への利用を想定しない',
    body: '昇給・査定の判断材料としての利用は想定していません。産業医面談や健康診断の代替にもなりません。次の対話の起点をつくることが目的です。',
  },
  {
    no: '02',
    title: '承認を経ずに公開されない',
    body: 'AIが生成した所見は下書きとして保存されます。責任者が根拠を確認し承認したもののみが、レポートとして共有されます。',
  },
  {
    no: '03',
    title: '根拠を示せない所見は出力しない',
    body: '該当する発話と数値を提示できない場合、所見そのものを生成しません。印象論に基づく出力は構造的に発生しない設計です。',
  },
  {
    no: '04',
    title: '測定の限界を明示する',
    body: '録音品質の問題で解析できなかった区間は、点線や低彩度で明示します。データが存在しない箇所を補完して表示することはありません。',
  },
]

/** ページ唯一の暗転。多用すると効かないのでここだけに限定する */
export function Guardrails() {
  return (
    <section
      id="guardrails"
      aria-labelledby="guardrails-title"
      className="scroll-mt-20 bg-hr-ink py-24 text-hr-paper sm:py-32"
    >
      <div className="hr-container">
        <Reveal>
          <p className="hr-eyebrow" style={{ color: 'rgba(247,246,243,.65)' }}>
            <span className="hr-num">10</span>
            <span lang="en">Principles</span>
          </p>
          <h2 id="guardrails-title" className="hr-title mt-5 max-w-[24em]">
            運用における4つの原則
          </h2>
          <p className="hr-measure mt-5 text-[15px] leading-8" style={{ color: 'rgba(247,246,243,.72)' }}>
            従業員の監視を目的としたツールではありません。設計上の制約として、以下を担保しています。
          </p>
        </Reveal>

        <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:mt-20">
          {RULES.map(({ no, title, body }, i) => (
            <Reveal key={no} delay={i * 0.05}>
              <div className="border-t pt-6" style={{ borderColor: 'rgba(247,246,243,.22)' }}>
                <span className="hr-num text-[12px]" style={{ color: 'rgba(247,246,243,.5)' }}>
                  {no}
                </span>
                <h3 className="hr-heading mt-3">{title}</h3>
                <p
                  className="mt-3.5 text-[14px] leading-8"
                  style={{ color: 'rgba(247,246,243,.72)' }}
                >
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <figure
            className="mt-16 border-t pt-12 lg:mt-24"
            style={{ borderColor: 'rgba(247,246,243,.22)' }}
          >
            <figcaption className="hr-label" style={{ color: 'rgba(247,246,243,.5)' }}>
              製 品 画 面 に 常 設 さ れ て い る 注 記
            </figcaption>
            <blockquote
              className="mt-5 border-l-2 pl-6 text-[15px] leading-9"
              style={{ borderColor: 'var(--color-hr-accent)' }}
            >
              AI所見は人事評価や診断ではありません。根拠データを確認し、リーダーが承認した内容だけをレポートに使用します。
            </blockquote>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
