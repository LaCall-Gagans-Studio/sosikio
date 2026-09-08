import React from 'react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

/** JSON-LD の FAQPage と本文を一致させるため、データはここを唯一の出所にする */
export const FAQ_ITEMS = [
  {
    q: '会話の内容を聞かれてしまうのですか？',
    a: 'probe が主に見るのは「何を話したか」ではなく「どんな声で話したか」です。声の張りや速さ、間の取り方から状態を数値にします。会議の書き起こしを上司が読んで評価する、という使い方を想定したサービスではありません。',
  },
  {
    q: '特別な機材やアプリは必要ですか？',
    a: '不要です。スマホやPC、Web会議ツールの録音機能で録れたデータがあれば始められます。専用マイクの購入も、メンバー全員へのアプリ配布も要りません。',
  },
  {
    q: 'メンバーに数値が見えてしまうのが不安です。',
    a: '見せる範囲を5段階から選べます。Lv.0 は天気予報のような一言だけ、Lv.4 は全員の全数値です。見せない情報はそもそもレポートに書き出されないため、設定を間違えて個人の数値が全員に届くことはありません。',
  },
  {
    q: '人事評価に使えますか？',
    a: '想定していません。判定は性格診断に近いもので、昇給や査定の根拠になる精度のものではありません。あくまで「次に誰と何を話すか」を決めるための道具としてお使いください。',
  },
  {
    q: 'AI が出した内容が的外れだったら？',
    a: 'AI の文章はまず下書きとして保存され、リーダーが確認して承認したものだけがレポートに載ります。また、どの発言のどの数値からそう判断したかを示せない場合は、そもそも文章を生成しません。',
  },
  {
    q: '1回試すだけでも意味はありますか？',
    a: '1回目は現状把握になります。ただし本来の価値は続けたときに出ます。3回目以降は前回との比較ができるので、打った手が効いたかどうかが数値の動きとして読めるようになります。',
  },
  {
    q: 'Thinking OS とは何ですか？',
    a: '数値を読み解く「見る目」を選べる仕組みです。実行家（何が決まっていないか）、戦略家（何が検証されていないか）、伴走者（誰の状態が削られているか）の3種を標準で搭載しています。同じ会議でも、選んだ視点によって届く問いが変わります。このほか、目的や職掌に応じた専用人格を個別に構築することもできます。',
  },
  {
    q: '自社の人格を開発する場合、どれくらいのデータが必要ですか？',
    a: '同意を得たうえで記録した面談や研修の音声と、ご本人へのインタビューが起点になります。過去の録音が十分にない場合でも、インタビューと初回の解析結果から判断ロジックを組み立てられます。取得範囲と同意プロセスは、初回のお打ち合わせで貴社の規程に合わせて設計します。',
  },
  {
    q: '開発した人格が、本人と違うことを言ってしまいませんか？',
    a: '出力は必ずご本人が確認し、追認したものだけをお渡しする運用です。AI が単独で最終回答を出す仕組みにはしていません。運用を重ねるなかで、ずれた箇所を判断ロジック側に反映して精度を上げていきます。',
  },
  {
    q: '導入までどれくらいかかりますか？',
    a: '次の定例から始められます。事前のヒアリングと録音方法の確認だけで、システム側の準備や既存ツールとの連携作業は必要ありません。',
  },
]

export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="scroll-mt-20 border-b border-hr-rule py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead no="12" eyebrow="FAQ" id="faq-title" title="よくあるご質問" />

        <dl className="mt-12 lg:mt-16">
          {FAQ_ITEMS.map(({ q, a }, i) => (
            <Reveal key={q} delay={i * 0.04}>
              <details className="group border-t border-hr-rule last:border-b last:border-hr-rule">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
                  <dt className="text-[15px] font-medium leading-8 text-hr-ink sm:text-[16px]">
                    {q}
                  </dt>
                  {/* アイコンは細線の +/− だけ */}
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
