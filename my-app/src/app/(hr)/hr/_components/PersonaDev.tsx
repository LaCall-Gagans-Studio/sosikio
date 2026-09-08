import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

/**
 * 人格AI開発。
 * 出典: public/hr/newplan/人格AI開発のご提案Ver1.0_20260907更新版.pptx
 * 標準人格を「選ぶ」機能に対して、こちらは自社の熟練者を「つくる」提供。
 * 提案書の 5 ステップと 3 つの提供価値をそのまま構造として使う。
 */
const STEPS = [
  {
    no: '01',
    title: '対話・音声データの収集',
    body: '同意を得たうえで、面談や研修の音声を記録します。特別な収録環境は必要ありません。',
  },
  {
    no: '02',
    title: '感情・思考の分析',
    body: 'probe が声の抑揚や間合いを解析し、その人が何に反応し、どこで判断を変えるかを可視化します。',
  },
  {
    no: '03',
    title: '判断ロジックの学習',
    body: 'インタビューと分析結果から、判断基準・価値観・避ける言い回しを「型」として構造化します。',
  },
  {
    no: '04',
    title: '回答の生成',
    body: '構築した人格が、実際の会議データや相談内容に対して「本人ならこう答える」を出力します。',
  },
  {
    no: '05',
    title: '本人による確認・追認',
    body: '出力内容は本人が確認し、追認したものだけを提供します。品質への責任を人が持ち続けます。',
  },
]

const VALUES = [
  {
    no: '01',
    label: '規 模',
    title: '品質を保ったまま、範囲を広げる',
    body: '一人の熟練者が対応できる人数には上限があります。判断の型を複製することで、対応品質を維持したまま担当範囲を数倍に広げられます。',
  },
  {
    no: '02',
    label: '承 継',
    title: '暗黙知を、組織に残す',
    body: '「あの人が見れば分かる」を型として残します。異動や退職で失われていた判断基準が、後進育成の教材としても機能します。',
  },
  {
    no: '03',
    label: '説 得 力',
    title: '経験則に、データの裏付けを与える',
    body: 'これまで感覚で伝えていたフィードバックに、probe が算出した数値が根拠として付きます。経営層への報告でも通る材料になります。',
  },
]

export function PersonaDev() {
  return (
    <section
      id="persona-dev"
      aria-labelledby="persona-dev-title"
      className="scroll-mt-20 border-b border-hr-rule bg-hr-sunken py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="07"
          eyebrow="Personality AI"
          id="persona-dev-title"
          title="社内の「あの人の目」を、人格として複製できます"
          accent={{ src: '/hr/probe/accent-crumple.webp' }}
          lead={
            <>
              標準人格から選ぶだけでなく、貴社の熟練者そのものを人格として開発できます。対話スタイル・思考の型・判断ロジックを学習させ、「私ならこう答える」を再現します。
            </>
          }
        />

        {/* 誰の何を複製するのか、対象を先に言い切る */}
        <Reveal>
          <div className="mt-12 grid gap-px bg-hr-rule lg:mt-16 lg:grid-cols-3">
            {[
              { who: '経営者・役員', what: '判断の優先順位と、譲れない一線' },
              { who: '熟練コンサルタント', what: '相談への切り返し方と、着眼の順序' },
              { who: '評価の高い管理職', what: 'メンバーの変化に気づく観点' },
            ].map(({ who, what }) => (
              <div key={who} className="bg-hr-raised p-7 lg:p-8">
                <p className="hr-label">複 製 の 対 象</p>
                <p className="hr-heading mt-3 text-hr-ink">{who}</p>
                <p className="mt-3 text-[13px] leading-7 text-hr-muted">{what}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* 開発プロセス。番号を線でつないで順序を体で分からせる */}
        <Reveal>
          <div className="mt-14 lg:mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="hr-heading text-hr-ink">開発プロセス</h3>
              <span className="hr-badge">構 築 期 間 の 目 安 4 〜 6 週 間</span>
            </div>

            <ol className="mt-8 grid gap-px bg-hr-rule lg:grid-cols-5">
              {STEPS.map(({ no, title, body }) => (
                <li key={no} className="flex flex-col bg-hr-raised p-6">
                  <div className="flex items-center gap-3">
                    <span
                      className="hr-num text-[12px]"
                      style={{ color: 'var(--color-hr-accent)' }}
                    >
                      {no}
                    </span>
                    <span aria-hidden className="h-px flex-1 bg-hr-rule" />
                  </div>
                  <h4 className="mt-4 text-[14px] font-bold leading-6 text-hr-ink">{title}</h4>
                  <p className="mt-3 text-[12px] leading-6 text-hr-muted">{body}</p>
                </li>
              ))}
            </ol>

            <p className="mt-5 text-[12px] leading-6 text-hr-faint">
              データの取得範囲と同意プロセスは、初回のお打ち合わせで貴社の規程に合わせて設計します。
            </p>
          </div>
        </Reveal>

        {/* 提供価値 */}
        <Reveal>
          <div className="mt-14 lg:mt-20">
            <h3 className="hr-heading text-hr-ink">開発によって得られるもの</h3>
            <ol className="mt-8 grid gap-px bg-hr-rule lg:grid-cols-3">
              {VALUES.map(({ no, label, title, body }) => (
                <li key={no} className="bg-hr-raised p-7 lg:p-9">
                  <div className="flex items-center justify-between gap-4">
                    <span className="hr-badge hr-badge-accent">{label}</span>
                    <span className="hr-num text-[13px] text-hr-faint">{no}</span>
                  </div>
                  <h4 className="hr-heading mt-5 text-hr-ink">{title}</h4>
                  <p className="mt-4 text-[14px] leading-7 text-hr-muted">{body}</p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {/* 体制と費用。ここまで書くと検討が前に進む */}
        <Reveal>
          <div className="mt-14 grid gap-px border border-hr-rule bg-hr-rule lg:mt-20 lg:grid-cols-3">
            <div className="bg-hr-raised p-7 lg:p-8">
              <p className="hr-label">開 発 ・ 提 供</p>
              <p className="mt-3 text-[15px] font-bold text-hr-ink">北菱電興株式会社</p>
              <p className="mt-2 text-[13px] leading-7 text-hr-muted">
                人格の設計・実装と、probe 本体の提供を担当します。
              </p>
            </div>
            <div className="bg-hr-raised p-7 lg:p-8">
              <p className="hr-label">監 修</p>
              <p className="mt-3 text-[15px] font-bold text-hr-ink">複製元となるご本人</p>
              <p className="mt-2 text-[13px] leading-7 text-hr-muted">
                ナレッジの提供と、出力内容の監修をご担当いただきます。
              </p>
            </div>
            <div className="bg-hr-raised p-7 lg:p-8">
              <p className="hr-label">費 用</p>
              <p className="mt-3 text-[15px] font-bold text-hr-ink">個別見積もり</p>
              <p className="mt-2 text-[13px] leading-7 text-hr-muted">
                対象人数と学習範囲により変動します。まずは概算をご提示します。
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-12 flex flex-col gap-4 border-t border-hr-rule-strong pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="hr-heading text-hr-ink">
              まずは、どなたの判断を複製したいかをお聞かせください。
            </p>
            <a href="#lead-form" className="hr-btn hr-btn-primary shrink-0">
              人格開発について相談する
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
