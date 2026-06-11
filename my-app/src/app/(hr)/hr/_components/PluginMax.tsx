'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal'

const EXISTING = ['既存サーベイ', '既存研修', '1on1'] as const

/** 既存サーベイにプラグインで最大化 */
export function PluginMax() {
  const reduced = useReducedMotion()

  return (
    <section aria-labelledby="plugin-title" className="bg-[#141210] py-20 sm:py-28">
      <div className="hr-container max-w-[880px]">
        <Reveal>
          <h2
            id="plugin-title"
            className="hr-impact text-center font-black leading-tight text-[#fff200]"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}
          >
            既存サーベイに、
            <br className="sm:hidden" />
            プラグインで最大化。
          </h2>
        </Reveal>

        {/* 既存ツールのチップが SOSIKIO に重なる */}
        <div className="mt-12 flex flex-col items-center">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {EXISTING.map((label, i) => (
              <motion.span
                key={label}
                initial={reduced ? false : { opacity: 0, y: -18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.45, delay: reduced ? 0 : 0.15 + i * 0.18 }}
                className="rounded-full border border-white/30 bg-[#1c1c1e] px-5 py-2 text-sm font-bold text-white/85 sm:text-base"
              >
                {label}
              </motion.span>
            ))}
          </div>

          <motion.div
            aria-hidden="true"
            initial={reduced ? false : { opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.4, delay: reduced ? 0 : 0.75 }}
            className="my-4 h-10 w-[3px] origin-top bg-[#fff200]"
          />

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.5, delay: reduced ? 0 : 1.0 }}
            className="relative rounded-xl bg-[#fff200] px-8 py-5 sm:px-12"
          >
            {/* 吹き出しのしっぽ */}
            <span
              aria-hidden="true"
              className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-[#fff200]"
            />
            <p className="hr-latin text-2xl font-bold tracking-wide text-[#141210] sm:text-3xl">
              + SOSIKIO
            </p>
          </motion.div>
        </div>

        <Reveal delay={0.2}>
          <p className="mx-auto mt-10 max-w-[560px] text-center text-[15px] leading-loose text-white/85 sm:text-base">
            既存サーベイ・既存研修・1on1 — 捨てなくていい。
            <br />
            SOSIKIO は毎日の「コエ」を重ねるだけ。
            <br />
            <strong className="font-bold text-[#fff200]">サーベイの価値が上がります。</strong>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
