'use client'

import { motion } from 'framer-motion'
import { Mic, Cpu, MessageSquare } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Process() {
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        setShowCTA(true)
      } else {
        setShowCTA(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const steps = [
    {
      icon: <Mic className="w-8 h-8 md:w-10 md:h-10" />,
      title: 'いつもの会議音声を',
      bottomTitle: 'アップロードする',
      desc: '普段のミーティングや1on1の録音データをアップロード。特別な機材は一切不要です。',
    },
    {
      icon: <Cpu className="w-8 h-8 md:w-10 md:h-10" />,
      title: '独自の感情解析で',
      bottomTitle: '指標を抽出',
      desc: '声色から700以上の特徴量を分析し、組織開発に必要な10の感情指標を精密に抽出します。',
    },
    {
      icon: <MessageSquare className="w-8 h-8 md:w-10 md:h-10" />,
      title: '組織と個人の状態を',
      bottomTitle: '直感的に可視化',
      desc: '活力とストレスを評価し、チーム全体とメンバー個別のコンディションを可視化します。',
    },
  ]

  return (
    <>
      <section id="process" className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Gradient & Texture */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#d7145b] via-[#ff4b8b] to-[#ff8e53]"></div>
        <div
          className="absolute inset-0 z-1 opacity-[0.1]"
          style={{
            backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)',
            backgroundSize: '32px 32px',
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
          {/* Section Header */}
          <motion.div
            className="mb-16 md:mb-24 text-white max-w-"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.3] md:leading-[1.4] tracking-tight">
              チームの真のコンディションは、
              <br />
              発話の「声色」に表れる。
              <br />
              独自解析で活力と
              <br className="block lg:block" />
              ストレスを可視化し、
              <br />
              組織開発を次のステージへ。
            </h2>
          </motion.div>

          {/* Process Flow */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 lg:gap-8 relative max-w-5xl mx-auto">
            {steps.map((step, idx) => (
              <div key={idx} className="contents">
                {/* Step Card */}
                <motion.div
                  className="flex-1 w-full max-w-[340px] bg-white rounded-[24px] flex flex-col items-center justify-start text-center p-6 shadow-xl relative group overflow-hidden border border-white/40"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  <div className="mb-4 w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#fff9f3] flex items-center justify-center text-[#d7145b] shadow-inner border border-[#d7145b]/10 group-hover:scale-110 transition-transform duration-500">
                    {step.icon}
                  </div>
                  <div className="text-lg md:text-xl font-bold text-slate-900 leading-tight mb-4 min-h-[3rem] flex flex-col justify-center">
                    <p>{step.title}</p>
                    {step.bottomTitle && <p className="mt-1">{step.bottomTitle}</p>}
                  </div>
                  {/* description */}
                  <div className="w-8 h-1 bg-[#ff5f6d] rounded-full mb-4"></div>
                  <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </motion.div>

                {/* Arrow (Desktop) */}
                {idx < steps.length - 1 && (
                  <motion.div
                    className="hidden md:flex justify-center items-center z-10 flex-shrink-0"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.2 + 0.1 }}
                  >
                    <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[18px] border-l-white/90 border-b-[12px] border-b-transparent drop-shadow-sm"></div>
                  </motion.div>
                )}

                {/* Arrow (Mobile) */}
                {idx < steps.length - 1 && (
                  <div className="flex md:hidden justify-center py-1 z-10 flex-shrink-0">
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[16px] border-t-white/90 border-r-[10px] border-r-transparent drop-shadow-sm"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating CTA Circle Button (Fixed at Bottom Right) */}
      <motion.div
        className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[100] pointer-events-auto"
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{
          opacity: showCTA ? 1 : 0,
          scale: showCTA ? 1 : 0.5,
          y: showCTA ? 0 : 50,
          pointerEvents: showCTA ? 'auto' : 'none',
        }}
        transition={{ duration: 0.5, ease: 'backOut' }}
      >
        <button className="group relative w-[130px] h-[130px] md:w-[160px] md:h-[160px] bg-gradient-to-br from-[#ff5f6d] to-[#d7145b] text-white rounded-full flex flex-col items-center justify-center shadow-[0_15px_30px_-10px_rgba(215,20,91,0.6)] hover:shadow-[0_20px_40px_-5px_rgba(215,20,91,0.7)] transition-all hover:scale-105 active:scale-95 border-[3px] border-white/90 overflow-hidden">
          {/* Button Shine Effect */}
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-[shimmer_1.5s_infinite] skew-x-12"></div>

          <span className="text-[10px] md:text-[11px] mb-1.5 opacity-90 font-bold tracking-wider relative z-10">
            30秒で登録
          </span>
          <span className="text-base md:text-[1.3rem] font-black leading-[1.15] text-center relative z-10">
            まずは簡単
            <br />
            トライアル
          </span>
        </button>
      </motion.div>
    </>
  )
}
