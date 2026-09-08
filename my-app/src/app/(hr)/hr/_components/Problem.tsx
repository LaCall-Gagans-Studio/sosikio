import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

const WALLS = [
  {
    no: '01',
    title: '離職の予兆を、事前に捕捉できない',
    label: '予 兆 検 知',
    body: '面談では問題なしと回答し、勤怠にも異常が出ない。表情や言葉は意識的に取り繕えるため、申告ベースの把握では手遅れになります。',
    voice: '辞表を受け取った時点で、もう引き止められる段階を過ぎている。',
  },
  {
    no: '02',
    title: 'サーベイが形骸化し、変化を検出できない',
    label: '測 定 精 度',
    body: '月次アンケートは回答率が低下し、スコアも硬直化します。回答者が無難な選択肢を選ぶ構造上、実態との乖離が広がります。',
    voice: '毎月とっているのに、スコアがずっと同じで打ち手につながらない。',
  },
  {
    no: '03',
    title: '1on1の論点設定が、担当者の力量に依存する',
    label: '実 行 品 質',
    body: '時間を確保しても近況報告に終始しがちです。誰に何を確認すべきかを事前に特定できず、面談の質がマネージャーごとにばらつきます。',
    voice: '何を聞けばいいか分からないまま、30分が近況報告で終わる。',
  },
]

export function Problem() {
  return (
    <section
      id="problem"
      aria-labelledby="problem-title"
      className="scroll-mt-20 border-b border-hr-rule py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="01"
          eyebrow="Issues"
          id="problem-title"
          title="組織の状態把握における、3つの課題"
          lead={
            <>
              マネジメントの現場で繰り返し起きている、既存手法の限界を整理しました。
            </>
          }
        />

        <ol className="mt-12 grid gap-px bg-hr-rule lg:mt-16 lg:grid-cols-3">
          {WALLS.map(({ no, title, label, body, voice }, i) => (
            <Reveal
              as="li"
              key={no}
              delay={i * 0.06}
              className="flex flex-col bg-hr-raised p-7 transition-colors duration-200 hover:bg-hr-paper lg:p-9"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="hr-badge">{label}</span>
                <span className="hr-num text-[13px] text-hr-faint">{no}</span>
              </div>
              <h3 className="hr-heading mt-5 text-hr-ink">{title}</h3>
              <p className="mt-4 text-[14px] leading-7 text-hr-muted">{body}</p>

              <figure className="mt-auto pt-7">
                <blockquote
                  className="border-l-2 pl-4 text-[13px] leading-7 text-hr-ink"
                  style={{ borderColor: 'var(--color-hr-accent)' }}
                >
                  「{voice}」
                </blockquote>
                <figcaption className="hr-label mt-2.5 pl-4">現 場 で 聞 か れ る 声</figcaption>
              </figure>
            </Reveal>
          ))}
        </ol>

        <Reveal>
          <div className="mt-12 flex flex-col gap-4 border-t border-hr-rule-strong pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <p className="hr-heading text-hr-ink">
              いずれも「測れていないこと」に起因する課題です。
            </p>
            <a href="#about" className="hr-btn hr-btn-ghost shrink-0">
              probe の解決アプローチ
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
