import React from 'react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

/**
 * 機能ではなく結果を並べる。
 * 「何ができるか」ではなく「何が変わるか」を主語にする。
 */
const BENEFITS = [
  {
    no: '01',
    title: '離職予兆の早期検知',
    label: 'リ ス ク 管 理',
    before: '退職の申し出を受けた時点で、はじめて不調を認識する。',
    after: '発話の変化は自己申告に先行して現れます。数値の低下段階で介入判断が可能になります。',
  },
  {
    no: '02',
    title: '1on1準備工数の削減',
    label: '生 産 性',
    before: '面談のたびに、確認事項をマネージャーが個別に検討している。',
    after: 'セッションごとに論点が自動提示されます。事前検討の工数を実質ゼロにできます。',
  },
  {
    no: '03',
    title: '施策効果の定量評価',
    label: '効 果 測 定',
    before: '研修や面談の実施後、効果を検証する指標が存在しない。',
    after: '前後のセッションを比較することで、施策の効果を数値の変動として確認できます。',
  },
  {
    no: '04',
    title: 'マネジメント品質の標準化',
    label: '育 成 ・ 承 継',
    before: '状態把握の精度が、管理職個人の経験と勘に依存している。',
    after: '優れた管理職の着眼点を設定として共有できます。担当交代後も観点を維持できます。',
  },
]

export function Benefits() {
  return (
    <section
      id="benefits"
      aria-labelledby="benefits-title"
      className="scroll-mt-20 border-b border-hr-rule py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="03"
          eyebrow="Benefits"
          id="benefits-title"
          title="probe が解決する、4つの領域"
          accent={{ src: '/hr/probe/accent-plant.webp' }}
          lead={<>導入前後で、実務がどう変わるかを対比で示します。</>}
        />

        <ol className="mt-12 grid gap-px bg-hr-rule sm:grid-cols-2 lg:mt-16">
          {BENEFITS.map(({ no, title, label, before, after }, i) => (
            <Reveal
              as="li"
              key={no}
              delay={i * 0.05}
              className="bg-hr-raised p-7 transition-colors duration-200 hover:bg-hr-paper lg:p-9"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="hr-badge">{label}</span>
                <span className="hr-num text-[13px] text-hr-faint">{no}</span>
              </div>
              <h3 className="hr-heading mt-5 text-hr-ink">{title}</h3>

              <dl className="mt-6 border-t border-hr-rule pt-5">
                <div className="flex gap-4">
                  <dt className="hr-label w-16 shrink-0 pt-1">導 入 前</dt>
                  <dd className="text-[13px] leading-7 text-hr-faint">{before}</dd>
                </div>
                <div className="mt-4 flex gap-4">
                  <dt
                    className="hr-label w-16 shrink-0 pt-1"
                    style={{ color: 'var(--color-hr-accent)' }}
                  >
                    導 入 後
                  </dt>
                  <dd className="text-[14px] leading-7 text-hr-ink">{after}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
