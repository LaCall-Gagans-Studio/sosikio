'use client'

import React from 'react'
import Image from 'next/image'
import CountUp from 'react-countup'
import { Eye, Ear, Plus } from 'lucide-react'
import { Reveal } from './Reveal'

/** 解決＝コエの健康診断（主観のコエ × 感情のコエ） */
export function TwoVoices() {
  return (
    <section
      id="feature"
      aria-labelledby="two-voices-title"
      className="scroll-mt-20 bg-[#141210] py-20 sm:py-28"
    >
      <div className="hr-container">
        <Reveal>
          <h2
            id="two-voices-title"
            className="hr-impact text-center font-black leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}
          >
            <span className="text-[#fff200]">「主観のコエ」</span>
            <span className="text-white">×</span>
            <span className="text-[#ed008c]">「感情のコエ」</span>
            <span className="block pt-2 text-white">で、予兆を可視化。</span>
          </h2>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-1 gap-12 sm:mt-16 lg:grid-cols-2 lg:gap-8">
          {/* 主観のコエ／顕在診断 */}
          <Reveal>
            <article className="flex h-full flex-col rounded-[14px] bg-[#1c1c1e] p-7 ring-1 ring-[#fff200]/25 sm:p-9">
              <h3 className="hr-impact inline-flex items-center gap-3 self-start bg-[#fff200] px-4 py-2 text-base font-black text-[#141210] sm:text-lg">
                <Eye size={20} strokeWidth={2.5} aria-hidden="true" />
                主観のコエ／顕在診断
              </h3>

              <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:items-start">
                <Image
                  src="/hr/ui/phone_survey.webp"
                  alt="スマホで答える主観サーベイ画面（アンケートの所要時間は100秒）"
                  width={820}
                  height={1400}
                  className="w-36 shrink-0 sm:w-44"
                  sizes="176px"
                />
                <div>
                  <p className="text-[15px] leading-relaxed text-white/85">
                    金間大介教授監修のサーベイ＋退勤時に「心の状態」を選択。本人の主観的なエンゲージメントを可視化。
                  </p>
                  <p className="mt-6 flex items-baseline gap-1 text-white">
                    <span className="text-sm font-bold text-white/70">所要</span>
                    <span className="hr-latin text-5xl font-bold leading-none text-[#fff200] sm:text-6xl">
                      <CountUp end={100} duration={1.6} enableScrollSpy scrollSpyOnce />
                    </span>
                    <span className="hr-impact text-xl font-black text-[#fff200]">秒</span>
                  </p>
                </div>
              </div>
            </article>
          </Reveal>

          {/* 中央の + */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#141210] p-3 ring-2 ring-white/20 lg:flex"
          >
            <Plus size={28} strokeWidth={3} className="text-white" />
          </div>

          {/* 感情のコエ／潜在診断 */}
          <Reveal delay={0.15}>
            <article className="flex h-full flex-col rounded-[14px] bg-[#1c1c1e] p-7 ring-1 ring-[#ed008c]/30 sm:p-9">
              <h3 className="hr-impact inline-flex items-center gap-3 self-start bg-[#ed008c] px-4 py-2 text-base font-black text-white sm:text-lg">
                <Ear size={20} strokeWidth={2.5} aria-hidden="true" />
                感情のコエ／潜在診断
              </h3>

              <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:items-start">
                <Image
                  src="/hr/ui/voice_report.webp"
                  alt="スマホに向かって声の日報を録音する人物"
                  width={1200}
                  height={900}
                  className="w-48 shrink-0 rounded-lg sm:w-56"
                  sizes="224px"
                />
                <div>
                  <p className="text-[15px] leading-relaxed text-white/85">
                    声の日報を録音するだけ。音声から元気度・ストレスを自動測定。本人も気づかない深層を毎日検知。
                  </p>
                  <p className="hr-impact mt-6 text-lg font-black text-[#ed008c] sm:text-xl">
                    本人も気づかない深層を、毎日。
                  </p>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
