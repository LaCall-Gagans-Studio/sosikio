import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { OsSwitchboard } from './OsSwitchboard'

export function ThinkingOs() {
  return (
    <section
      id="thinking-os"
      aria-labelledby="thinking-os-title"
      className="scroll-mt-20 border-b border-hr-rule py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="06"
          eyebrow="Core Technology"
          id="thinking-os-title"
          title="Thinking OS ─ 分析視点の切り替え機能"
          accent={{ src: '/hr/probe/accent-moon.webp' }}
          lead={
            <>
              同一のデータでも、生産性を重視する管理職と、メンバーの負荷を重視する管理職とでは着眼点が異なります。probe
              はこの分析視点を、切り替え可能な人格として実装しました。
              <br />
              タブを切り替えると、同一セッションに対する解釈と論点がどう変わるかを確認できます。
            </>
          }
        />

        <OsSwitchboard />

        {/* 「AIが適当に言っているのでは」という初見の疑いに、ここで答えておく */}
        <Reveal>
          <div className="mt-14 grid gap-px border border-hr-rule bg-hr-rule lg:mt-20 lg:grid-cols-2">
            <div className="bg-hr-raised p-7 lg:p-9">
              <span className="hr-badge">出 力 根 拠</span>
              <h3 className="hr-heading mt-4 text-hr-ink">判断根拠を必ず併記</h3>
              <p className="mt-4 text-[14px] leading-7 text-hr-muted">
                出力される論点には、どの発話のどの数値を根拠としたかが必ず付随します。生成AIが自由に文章を作成するのではなく、規定の条件を満たした場合にのみ出力する設計です。
              </p>
              <p className="mt-4 text-[14px] leading-7 text-hr-muted">
                根拠を示せないときは、そもそも文章を生成しません。「それらしいが確かめようがない所見」がレポートに混ざらないようにしています。
              </p>
            </div>
            <div className="bg-hr-raised p-7 lg:p-9">
              <span className="hr-badge">判 定 基 準</span>
              <h3 className="hr-heading mt-4 text-hr-ink">場の状況は、定義済みの分類で判定</h3>
              <p className="mt-4 text-[14px] leading-7 text-hr-muted">
                会議で起きていることは、18種類の定義済み分類で判定します。たとえば「リーダーが話しすぎ」は、発話量の40%以上を1名が占めた場合に検出されます。
              </p>
              <p className="mt-4 text-[14px] leading-7 text-hr-muted">
                判定基準を固定しているため、同じ状況には同じ検出が返ります。解析するたびに結果が変わることはありません。
              </p>
            </div>
          </div>
        </Reveal>

        {/* 標準人格の話から、自社人格を「つくる」話へ渡す */}
        <Reveal>
          <div className="mt-10 flex flex-col gap-4 border-t border-hr-rule-strong pt-10 sm:flex-row sm:items-center sm:justify-between">
            <p className="hr-heading text-hr-ink">
              選ぶだけでなく、自社の熟練者そのものを人格にすることもできます。
            </p>
            <a href="#persona-dev" className="hr-btn hr-btn-ghost shrink-0">
              人格開発について見る
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </Reveal>

        <Reveal>
          <p className="mt-8 text-[12px] leading-6 text-hr-faint">
            ※
            標準人格3体（実行家・戦略家・伴走者）は全プランに搭載されます。掲載しているのは著者レビュー前（draft）の版です。実測値は表示イメージであり、実際のセッションデータではありません。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
