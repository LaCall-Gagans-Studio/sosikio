'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

function scrollToForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** Hero — 黒×蛍光イエローの警告トーン */
export function HeroAlert() {
  const reduced = useReducedMotion()

  const line = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
          animate: { clipPath: 'inset(0 0% 0 0)', opacity: 1 },
          transition: { duration: 0.7, delay, ease: [0.22, 0.61, 0.36, 1] as const },
        }

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-[#141210] pt-10 pb-0 sm:pt-14"
    >
      {/* 俺、辞めます！ラインアート（背景・装飾） */}
      <motion.div
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: [0, 0.16, 0.1, 0.16] }}
        transition={{ duration: 1.6, times: [0, 0.6, 0.75, 1], delay: 0.6 }}
        className="pointer-events-none absolute -right-10 top-4 w-[340px] sm:w-[460px] lg:w-[560px]"
      >
        <Image
          src="/hr/ui/speaker_lineart.webp"
          alt=""
          width={1144}
          height={1345}
          priority
          className="h-auto w-full opacity-40 sm:opacity-100"
        />
      </motion.div>

      <div className="hr-container relative z-10">
        {/* ラベル */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="hr-latin inline-flex rounded-sm bg-[#ed008c] px-3 py-1 text-sm font-bold tracking-[0.18em] text-white sm:text-base">
            STOP! 離職
          </span>
        </motion.div>

        {/* 見出し */}
        <h1
          id="hero-title"
          className="hr-impact mt-10 font-black leading-[1.12] tracking-tight text-[#fff200]"
          style={{ fontSize: 'clamp(2.4rem, 8vw, 6rem)' }}
        >
          <motion.span className="block" {...line(0.15)}>
            辞表は、ある日
          </motion.span>
          <motion.span className="block" {...line(0.45)}>
            突然じゃない。
          </motion.span>
        </h1>

        <motion.p
          className="hr-impact mt-6 text-xl font-bold leading-snug text-white sm:text-3xl"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.85 },
              })}
        >
          離職の<span className="px-1 text-[#ed008c]">“予兆”</span>を、コエで可視化する。
        </motion.p>

        <motion.p
          className="mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 border border-[#fff200]/60 px-4 py-2 text-sm font-bold tracking-wider text-[#fff200] sm:text-base"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.6, delay: 1.05 },
              })}
        >
          「コエの健康診断」
        </motion.p>

        <motion.p
          className="mt-6 max-w-[620px] text-[15px] leading-relaxed text-white/70"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 1.1 },
              })}
        >
          従来のサーベイでは見逃していた離職の予兆を、毎日の「コエ」で可視化。既存施策を置き換えず、プラグインとして導入可能。予兆検知から介入判断まで、人事の意思決定を支援します。
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10 flex flex-col gap-3 pb-16 sm:flex-row sm:gap-4 sm:pb-20"
          {...(reduced
            ? {}
            : {
                initial: { opacity: 0, y: 16 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 1.2 },
              })}
        >
          <button
            type="button"
            onClick={scrollToForm}
            data-clarity-event="hr-cta-hero"
            data-track-cta="hr_hero_request_docs"
            className="hr-impact inline-flex items-center justify-center rounded-md bg-[#fff200] px-8 py-4 text-lg font-black text-[#141210] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#ffe600] active:translate-y-0"
          >
            資料を請求する
          </button>
          <Link
            href="/hr/demo"
            data-track-cta="hr_hero_watch_demo"
            className="hr-impact inline-flex items-center justify-center rounded-md border-2 border-white/80 px-8 py-4 text-lg font-bold text-white transition-colors duration-200 hover:border-[#fff200] hover:text-[#fff200]"
          >
            デモを見る
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
