'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

export function GlobalPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // /probe ページでは表示しない
    if (pathname.startsWith('/probe')) return

    setIsOpen(false)
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 600)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* 背景オーバーレイ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* カード */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-[90vw] max-w-[460px] flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-200"
          >
            {/* 閉じるボタン */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 z-20 flex items-center justify-center w-9 h-9 bg-black/30 hover:bg-black/50 backdrop-blur-sm rounded-full text-white transition-all duration-200"
              aria-label="閉じる"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* 画像エリア */}
            <div className="relative w-full h-full object-contain aspect-[16/9] shrink-0 overflow-hidden bg-slate-100">
              <img
                src="/probe/popup_2.png"
                alt="Probe Cloud — 音声だけでチームがわかる"
                className="mt-16"
              />

              {/* NEW RELEASE バッジ */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 left-3 z-10"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d7145b] text-white text-[11px] font-bold tracking-widest uppercase shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  New Release
                </span>
              </motion.div>
            </div>

            {/* CTAエリア — Probeブランドカラー（白背景 + #d7145b） */}
            <div className="px-5 pt-4 pb-5 bg-white flex flex-col gap-3">
              {/* アクセントライン */}
              <div className="w-10 h-1 bg-[#d7145b] rounded-full mx-auto" />

              <p className="text-slate-500 text-xs text-center leading-relaxed">
                組織診断クラウド Probe が正式リリース。
                <br />
                チームの状態をデータで把握し、的確な打ち手を。
              </p>

              <motion.a
                href="/probe"
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className="relative w-full overflow-hidden group flex items-center justify-center py-3.5 px-6 rounded-xl bg-[#d7145b] hover:bg-[#b00f49] text-white font-bold text-base shadow-[0_8px_20px_-6px_rgba(215,20,91,0.4)] hover:shadow-[0_12px_28px_-6px_rgba(215,20,91,0.55)] transition-all duration-300"
              >
                <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
                <span className="relative z-10 flex items-center gap-2">
                  詳しくはこちら
                  <svg
                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
