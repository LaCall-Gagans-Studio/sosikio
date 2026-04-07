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
    // ページ遷移時や初回ロード時にポップアップを表示
    setIsOpen(false)
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 600) // 画面切り替え後にリッチなアニメーションで表示
    
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-[90vw] max-w-[500px] flex flex-col bg-[#1a1a1a] rounded-4xl shadow-2xl overflow-hidden ring-1 ring-white/10"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 z-20 flex items-center justify-center w-11 h-11 bg-black/40 backdrop-blur-xl rounded-full text-white/90 hover:text-white transition-all duration-300 border border-white/20"
              aria-label="閉じる"
            >
              <X size={22} strokeWidth={2.5} />
            </motion.button>
            
            <div className="relative w-full aspect-square shrink-0">
              <Image
                src="/popup_1.jpg"
                alt="Popup"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, 500px"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/10 via-transparent to-black/30 pointer-events-none mix-blend-overlay" />
            </div>

            <div className="p-5 md:p-6 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] flex justify-center items-center">
              <motion.a
                href="https://eight-event.8card.net/lp/startup-japan/2026/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative w-full overflow-hidden group flex items-center justify-center py-4 px-6 rounded-2xl bg-white text-black font-bold text-lg shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                {/* ボタンのキラッと光るエフェクト */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:animate-[shine_1.5s_ease-in-out_infinite] bg-linear-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]" />
                <span className="relative z-10 flex items-center gap-2">
                  参加申し込みはこちら
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
