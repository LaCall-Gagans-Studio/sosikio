import React from 'react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

/**
 * 「で、これは何？」に最初に答えるセクション。
 * 専門用語を使わずに3ステップで説明し、用語の対訳はこの下の表に隔離する。
 */
const STEPS = [
  {
    no: 'STEP 01',
    title: '音声データをアップロード',
    body: '定例や1on1の録音ファイルをアップロードします。専用マイクの導入やアプリの配布は不要で、既存の録音環境をそのまま利用できます。',
    note: '1時間の会議 ＝ 約500〜700発話',
  },
  {
    no: 'STEP 02',
    title: '発話から状態を定量化',
    body: '発話内容ではなく音響特徴量を解析します。声量・話速・間合いなどから、発言者ごとの活力とストレスを数値として算出します。',
    note: '発言者別・時間帯別に算出',
  },
  {
    no: 'STEP 03',
    title: '確認すべき論点を受領',
    body: '算出結果を解釈し、誰にいつ何を確認すべきかを問いの形式で出力します。担当者が数値を読み解く工数は発生しません。',
    note: '1セッションあたり最大3件',
  },
]

const COMPARISON = [
  {
    axis: '測定対象',
    survey: '本人の自己申告',
    probe: '実際の発話（音響特徴量）',
  },
  {
    axis: '測定頻度',
    survey: '月次・四半期',
    probe: '定例のたびに自動で蓄積',
  },
  {
    axis: '回答者の負担',
    survey: '設問への回答工数が発生',
    probe: 'なし（既存の会議に相乗り）',
  },
  {
    axis: '本音との乖離',
    survey: '無難な回答に偏りやすい',
    probe: '意識的な調整が及びにくい',
  },
  {
    axis: '結果の使い道',
    survey: 'スコアの提示まで',
    probe: '次に確認すべき論点まで提示',
  },
]

/** LP本文では平易な言葉を使い、製品画面上の呼び名はここでだけ対応づける */
const GLOSSARY = [
  { plain: '活力', formal: 'ワークエンゲージメント（WE）', desc: '仕事に前向きに向かえている度合い' },
  { plain: 'ストレス', formal: 'バーンアウト（BO）', desc: '消耗・疲弊が進んでいる度合い' },
  { plain: '話す量のかたより', formal: '発話バランス（Gini）', desc: '特定の人に発言が集中していないか' },
]

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="scroll-mt-20 border-b border-hr-rule bg-hr-sunken py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="02"
          eyebrow="Service Overview"
          id="about-title"
          title="会議音声を解析し、組織状態を定量化する"
          accent={{ src: '/hr/probe/accent-glasses.webp' }}
          lead={
            <>
              自己申告に依存する従来のサーベイに対し、probe
              は発話そのものを測定対象とします。運用は3ステップで完結します。
            </>
          }
        />

        <ol className="mt-14 grid gap-px bg-hr-rule lg:mt-20 lg:grid-cols-3">
          {STEPS.map(({ no, title, body, note }, i) => (
            <Reveal
              as="li"
              key={no}
              delay={i * 0.06}
              className="flex flex-col bg-hr-paper p-7 transition-colors duration-200 hover:bg-hr-raised lg:p-9"
            >
              <div className="flex items-center gap-3">
                <span className="hr-num text-[11px] tracking-[0.14em] text-hr-accent">{no}</span>
                <span aria-hidden className="h-px flex-1 bg-hr-rule" />
              </div>
              <h3 className="hr-heading mt-4 text-hr-ink">{title}</h3>
              <p className="mt-4 text-[14px] leading-7 text-hr-muted">{body}</p>
              {/* 本文の長さが違っても、3枚の注記の位置を揃える */}
              <div className="mt-auto pt-6">
                <p className="hr-label border-t border-hr-rule pt-4">{note}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* 比較表は購買検討でいちばん参照される。判断軸ごとに並べる */}
        <Reveal>
          <div className="mt-14 lg:mt-20">
            <h3 className="hr-heading text-hr-ink">従来のサーベイとの比較</h3>
            <div className="mt-6 overflow-x-auto border border-hr-rule bg-hr-raised">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-hr-rule-strong">
                    <th className="hr-label px-6 py-4 font-normal">比 較 軸</th>
                    <th className="hr-label px-6 py-4 font-normal">従 来 の サ ー ベ イ</th>
                    {/* 見てほしい列は、地の明度と天の罫線で先に目を止める */}
                    <th
                      className="hr-label border-x border-t-2 bg-hr-sunken px-6 py-4 font-semibold"
                      style={{
                        color: 'var(--color-hr-accent)',
                        borderTopColor: 'var(--color-hr-accent)',
                        borderLeftColor: 'var(--color-hr-rule)',
                        borderRightColor: 'var(--color-hr-rule)',
                      }}
                    >
                      p r o b e
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map(({ axis, survey, probe }) => (
                    <tr key={axis} className="border-b border-hr-rule last:border-b-0">
                      <th className="px-6 py-4 text-left text-[13px] font-medium text-hr-ink">
                        {axis}
                      </th>
                      <td className="px-6 py-4 text-[13px] leading-6 text-hr-faint">{survey}</td>
                      <td className="border-x border-hr-rule bg-hr-sunken px-6 py-4 text-[13px] font-medium leading-6 text-hr-ink">
                        {probe}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* 用語はここに隔離する。本文を平易に保つための対訳表 */}
        <Reveal>
          <div className="mt-14 border-t border-hr-rule-strong pt-8 lg:mt-20">
            <p className="hr-label">こ の ペ ー ジ で 使 う 言 葉</p>
            <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-3">
              {GLOSSARY.map(({ plain, formal, desc }) => (
                <div key={plain} className="border-t border-hr-rule pt-4">
                  <dt className="text-[15px] font-bold text-hr-ink">
                    {plain}
                    <span className="hr-label ml-2">{formal}</span>
                  </dt>
                  <dd className="mt-2 text-[13px] leading-7 text-hr-muted">{desc}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

      </div>
    </section>
  )
}
