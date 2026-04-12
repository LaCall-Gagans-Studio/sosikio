'use client'

import { motion } from 'framer-motion'
import FlowParticles from './FlowParticles'

export default function Hero() {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen w-full bg-[#fff9f3] overflow-hidden flex items-center">
      {/* Three.js Fluid Particles Background */}
      <FlowParticles />

      {/* Subdued Background Grid Texture for SaaS Feel */}
      <div
        className="absolute inset-0 z-0 opacity-[0.3]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Elegant Logo Watermark */}
      <div className="absolute right-[-20%] top-[-10%] md:right-[-10%] md:top-[5%] w-screen md:w-[70vw] max-w-[900px] z-0 pointer-events-none select-none mix-blend-multiply opacity-[0.03]">
        <motion.img
          src="/probe/probe.png"
          alt=""
          className="w-full h-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="relative z-10 max-w-8xl mx-auto w-full px-6 sm:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 py-24 lg:py-0 mt-8 md:mt-16">
        {/* Left Side: Typography */}
        <motion.div
          className="flex flex-col justify-center max-w-2xl"
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.15, delayChildren: 0.1 }}
        >
          <motion.div
            variants={fadeUpVariant}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-slate-200 text-[#d7145b] text-sm font-bold tracking-wider mb-8 shadow-sm">
              音声だけでチームがわかる
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUpVariant}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[4.5rem] font-bold tracking-tight text-slate-900 leading-[1.15] mb-8"
          >
            <span className="bg-[#d7145b] text-white">組織開発に特化した</span>
            <br className="mb-2" />
            音声解析
            <img src="/probe/probe.png" alt="" />
          </motion.h1>

          <motion.p
            variants={fadeUpVariant}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-slate-600 leading-relaxed font-medium mb-10 max-w-[540px]"
          >
            「組織の課題はなんとなく分かっている。でもどこから手をつければ...」
            <br />
            そんな漠然とした不安を「確信」に変える。
            <br />
            データに基づいたアプローチで、確実なチームビルディングを実現します。
          </motion.p>
        </motion.div>

        {/* Right Side: Dashboard-like Solid Card */}
        <motion.div
          className="flex items-center justify-center lg:justify-end"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="bg-white rounded-[24px] p-8 sm:p-12 w-full max-w-[480px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col items-center text-center relative z-20 hover:shadow-[0_30px_80px_-15px_rgba(0,0,0,0.08)] transition-all duration-500">
            {/* Top Accent Line for Software Feel */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-[#d7145b] rounded-b-full" />

            <h3 className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 leading-snug mb-4 mt-2">
              Probeがあなたの
              <br />
              <span className="text-[#d7145b]">最高なチームづくり</span>
              <br />
              に寄り添います。
            </h3>

            <p className="text-slate-500 mb-8 text-[15px] sm:text-base font-medium">
              アカウント作成後、すぐに機能をお試しいただけます。
            </p>

            <a
              href="https://main.dr5lrenz9l9vu.amplifyapp.com/trial/register"
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-[#d7145b] text-white rounded-xl font-bold text-[16px] shadow-[0_8px_16px_-4px_rgba(215,20,91,0.3)] transition-all duration-300 hover:bg-[#b00f49] hover:-translate-y-1 hover:shadow-[0_12px_24px_-4px_rgba(215,20,91,0.4)] active:scale-95"
            >
              まずは試しに使ってみる
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            {/* Micro-interaction Pill Tags */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mt-8">
              {['メンバーが何を思っているか心配...', 'Probeって？', 'これハラスメント？...'].map(
                (text, i) => (
                  <a
                    key={i}
                    href="https://main.dr5lrenz9l9vu.amplifyapp.com/trial/register"
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-[13px] text-slate-600 font-medium hover:bg-white hover:border-[#d7145b]/50 hover:text-[#d7145b] hover:shadow-[0_4px_12px_-4px_rgba(215,20,91,0.2)] transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {text}
                  </a>
                ),
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
