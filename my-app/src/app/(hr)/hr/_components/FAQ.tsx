'use client'

import React, { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from './Reveal'

type FaqItem = { q: string; a: string }

const FAQ_DATA: FaqItem[] = [
  {
    q: '診断の精度はどの程度ですか？',
    a: '音声感情分析は、金沢大学・金間大介教授の知見に基づく独自アルゴリズムを採用しています。主観サーベイとの掛け合わせにより、従来のサーベイ単体よりも高い精度で予兆を捉えます。定量的な精度指標は導入前説明でお伝えいたします。',
  },
  {
    q: '個人情報の取り扱いは？',
    a: '音声データはサーバーに保存せず、分析後即座に破棄します。診断結果は匿名化された数値のみを管理者に提供します。プライバシーマーク取得済みの運用体制で、個人情報保護法に準拠しています。',
  },
  {
    q: '録音はどのように行いますか？',
    a: '退勤時にスマートフォンのブラウザから「声の日報」として30秒程度の音声を録音するだけです。専用アプリのインストールは不要。通信環境があれば場所を選びません。',
  },
  {
    q: '既存のエンゲージメントサーベイと併用できますか？',
    a: 'はい、併用を推奨しています。SOSIKIOは既存サーベイを置き換えるのではなく、毎日の変化検知レイヤーとして追加するプラグイン型の設計です。既存サーベイの結果をより深く解釈するための補完ツールとしてお使いいただけます。',
  },
  {
    q: '導入にどのくらいの期間がかかりますか？',
    a: '最短2週間で運用を開始できます。初期設定（対象チーム選定・アカウント発行）に1週間、テスト運用に1週間が目安です。30日間の導入ロードマップをご用意していますので、スムーズに定着いただけます。',
  },
  {
    q: '費用はどのくらいですか？',
    a: 'チーム規模・利用機能に応じた料金体系をご用意しています。まずは資料請求いただき、貴社の状況に合わせた最適なプランをご提案いたします。',
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-[#141210] py-20 sm:py-28">
      <div className="hr-container max-w-[800px]">
        <Reveal>
          <h2
            id="faq-title"
            className="hr-impact text-center font-black leading-tight text-[#fff200]"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)' }}
          >
            よくあるご質問
          </h2>
        </Reveal>

        <div className="mt-12 flex flex-col gap-3 sm:mt-16">
          {FAQ_DATA.map((item, i) => (
            <Reveal key={i} delay={i * 0.05}>
              <FaqAccordion
                item={item}
                isOpen={openIndex === i}
                onToggle={() => toggle(i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FaqAccordion({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="rounded-[14px] bg-[#1c1c1e] ring-1 ring-white/5">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
      >
        <span className="flex-1 text-sm font-bold leading-relaxed text-white sm:text-base">
          {item.q}
        </span>
        <motion.span
          className="shrink-0 text-white/50"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25 }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-5 text-sm leading-relaxed text-white/75 sm:px-6 sm:pb-6">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
