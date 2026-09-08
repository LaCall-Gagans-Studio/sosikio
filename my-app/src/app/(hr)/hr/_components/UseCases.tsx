import React from 'react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

/**
 * 「うちで使えるのか」を判断してもらうための具体例。
 * 抽象的な効能ではなく、誰が・どの場面で・何をするかまで書く。
 */
const CASES = [
  {
    who: '人 事 ・ 人 材 開 発',
    scene: '離職リスクの早期把握',
    body: '各部署の定例を月1回解析し、数値の連続的な低下が見られた部署を抽出します。全社サーベイの実施を待たずに、部門長との個別協議に着手できます。',
    freq: '月 次 ／ 部 署 単 位',
  },
  {
    who: '部 門 長 ・ マ ネ ー ジ ャ ー',
    scene: '1on1の論点設定',
    body: '定例後に出力される論点を、次回面談の議題としてそのまま使用します。近況確認に終始していた面談を、具体的な課題の議論から開始できます。',
    freq: '週 次 ／ メ ン バ ー 単 位',
  },
  {
    who: '経 営 ・ 役 員',
    scene: '組織状態の定点観測',
    body: '部署ごとの推移を並列で確認し、四半期単位の変化を把握します。施策を実施した部署と未実施の部署の差分が、数値の変動として可視化されます。',
    freq: '四 半 期 ／ 全 社',
  },
  {
    who: '管 理 職 研 修 担 当',
    scene: '研修効果の検証',
    body: '研修の前後で同一チームの会議を解析します。受講した管理職の発話量が減少し、メンバーの発話量が増加したかを定量的に検証できます。',
    freq: '施 策 前 後 ／ 対 象 チ ー ム',
  },
]

export function UseCases() {
  return (
    <section
      id="usecases"
      aria-labelledby="usecases-title"
      className="scroll-mt-20 border-b border-hr-rule bg-hr-sunken py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="08"
          eyebrow="Use Cases"
          id="usecases-title"
          title="役割別の活用シーン"
          accent={{ src: '/hr/probe/accent-books.webp' }}
          lead={<>職掌によって参照する指標も運用方法も異なります。想定される活用例を示します。</>}
        />

        <ol className="mt-12 border-b border-hr-rule lg:mt-16">
          {CASES.map(({ who, scene, body, freq }, i) => (
            <Reveal as="li" key={scene} delay={i * 0.05}>
              <div className="grid gap-x-10 gap-y-4 border-t border-hr-rule py-8 transition-colors duration-200 hover:bg-hr-raised lg:-mx-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)_minmax(0,12rem)] lg:px-6 lg:py-9">
                <p className="hr-label lg:pt-1.5">{who}</p>
                <div>
                  <h3 className="hr-heading text-hr-ink">{scene}</h3>
                  <p className="hr-measure mt-3 text-[14px] leading-7 text-hr-muted">{body}</p>
                </div>
                <p className="hr-label lg:pt-1.5 lg:text-right">{freq}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
