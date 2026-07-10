'use client'

import React from 'react'
import { Reveal } from './Reveal'

/** 締め CTA — 黄ベタパネル */
export function ClosingCTA() {
  return (
    <section aria-labelledby="closing-title" className="bg-[#fff200] py-20 sm:py-28">
      <div className="hr-container text-center">
        <Reveal>
          <p className="hr-brush text-2xl text-[#141210]/70 sm:text-3xl" aria-hidden="true">
            「俺、辞めます！」
          </p>
          <h2
            id="closing-title"
            className="hr-impact mt-5 font-black leading-tight text-[#141210]"
            style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)' }}
          >
            あなたなら、
            <br className="sm:hidden" />
            どう引き止める？
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById('lead-form')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
            data-clarity-event="hr-cta-closing"
            data-track-cta="hr_closing_request_docs"
            className="hr-impact mt-10 inline-flex items-center justify-center rounded-md bg-[#141210] px-10 py-5 text-lg font-black text-[#fff200] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 sm:text-xl"
          >
            資料を請求する
          </button>
        </Reveal>
      </div>
    </section>
  )
}
