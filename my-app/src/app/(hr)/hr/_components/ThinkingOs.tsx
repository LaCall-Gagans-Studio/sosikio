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
      className="scroll-mt-20 border-b border-hr-rule py-16 sm:py-20 lg:py-24"
    >
      <div className="hr-container">
        <SectionHead
          no="02"
          eyebrow="Core Technology"
          id="thinking-os-title"
          title="Thinking OS ─ 見る目を切り替える"
          accent={{ src: '/hr/probe/accent-moon.webp' }}
          lead="同じ会議でも、着眼点が違えば届く問いが変わります。タブを切り替えて、解釈の差をご確認ください。実行家・戦略家・伴走者の3種を標準搭載しています。"
        />

        <OsSwitchboard />

        <Reveal>
          <p className="mt-8 text-[12px] leading-6 text-hr-faint">
            ※ 掲載は著者レビュー前（draft）の版です。実測値は表示イメージです。自社の熟練者を人格として追加構築することもできます。
          </p>
          <div className="mt-8 flex flex-col gap-4 border-t border-hr-rule-strong pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="hr-heading text-hr-ink">レポート見本と人格の詳細は、資料にまとめています。</p>
            <a href="#lead-form" className="hr-btn hr-btn-primary shrink-0">
              資料を請求する（無料）
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
