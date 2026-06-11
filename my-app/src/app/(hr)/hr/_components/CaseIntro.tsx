'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'

const CASES = [
  {
    id: 'kitai',
    label: '期待の星くん',
    copy: '「部長みたいになりたいっす」と言ってたリーダー候補も、辞めた。',
    img: '/hr/characters/char_kitai.webp',
    w: 662,
    h: 1472,
  },
  {
    id: 'daijobu',
    label: '大丈夫さん',
    copy: '「大丈夫です」が口癖の優等生が、急に辞めた。',
    img: '/hr/characters/char_daijobu.webp',
    w: 390,
    h: 1483,
  },
  {
    id: 'domino',
    label: '友達ドミノくん',
    copy: '転職した友達に影響を受けて、辞めた。',
    img: '/hr/characters/char_domino.webp',
    w: 566,
    h: 1427,
  },
] as const

/** 問題提起 — 3 つの離職ケース */
export function CaseIntro() {
  const reduced = useReducedMotion()

  return (
    <section aria-labelledby="case-intro-title" className="bg-[#141210] py-20 sm:py-28">
      <div className="hr-container">
        <h2
          id="case-intro-title"
          className="hr-impact text-center font-black leading-tight text-white"
          style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}
        >
          その<span className="text-[#fff200]">“辞める”</span>、
          <br className="sm:hidden" />
          本当に突然でしたか？
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:mt-16 md:grid-cols-3 md:gap-6">
          {CASES.map((c, i) => (
            <motion.article
              key={c.id}
              initial={reduced ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.15 }}
              whileHover={reduced ? undefined : { y: -6 }}
              className="flex flex-col items-center rounded-[14px] bg-[#1c1c1e] px-6 pb-8 pt-10 ring-1 ring-white/5"
            >
              <div className="relative flex h-56 items-end justify-center sm:h-64">
                <Image
                  src={c.img}
                  alt={`${c.label}（離職ケースの人物イメージ）`}
                  width={c.w}
                  height={c.h}
                  className="h-full w-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
                  sizes="(max-width: 768px) 60vw, 240px"
                />
              </div>

              <span className="hr-impact mt-6 inline-block -rotate-1 bg-[#ed008c] px-4 py-1.5 text-base font-black tracking-wide text-white sm:text-lg">
                {c.label}
              </span>

              <p className="mt-4 text-center text-sm leading-relaxed text-white/85 sm:text-[15px]">
                {c.copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
