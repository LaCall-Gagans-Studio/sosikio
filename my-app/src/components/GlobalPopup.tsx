'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import Image from 'next/image'

const SEEN_KEY = 'sosikio-hr-popup-seen'

export function GlobalPopup() {
  const pathname = usePathname()
  const onRoot = pathname === '/'
  const [modalOpen, setModalOpen] = useState(false)
  const [pillOpen, setPillOpen] = useState(onRoot)

  useEffect(() => {
    if (!onRoot) {
      setModalOpen(false)
      setPillOpen(false)
      return
    }

    const seen = sessionStorage.getItem(SEEN_KEY) === '1'
    if (seen) {
      setPillOpen(true)
      return
    }

    const timer = setTimeout(() => setModalOpen(true), 400)
    return () => clearTimeout(timer)
  }, [onRoot])

  useEffect(() => {
    if (!modalOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dismissModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [modalOpen])

  function dismissModal() {
    setModalOpen(false)
    setPillOpen(true)
    sessionStorage.setItem(SEEN_KEY, '1')
  }

  function goToLp() {
    sessionStorage.setItem(SEEN_KEY, '1')
  }

  if (!onRoot) return null

  return (
    <>
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-9999 flex items-center justify-center p-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-[6px]"
              onClick={dismissModal}
            />

            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[680px] overflow-hidden rounded-2xl bg-linear-to-b from-[#fff9fa] to-white shadow-[0_32px_64px_-16px_rgba(15,23,42,0.28)] ring-1 ring-[#d7145b]/8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="global-popup-title"
            >
              <button
                type="button"
                onClick={dismissModal}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100/80 hover:text-slate-600"
                aria-label="閉じる"
              >
                <X size={22} strokeWidth={1.75} />
              </button>

              <div className="px-5 py-6 sm:px-6 sm:py-7">
                <p className="text-[11px] font-bold tracking-[0.18em] text-[#d7145b]">PROBE / BY SOSIKIO</p>
                <h2
                  id="global-popup-title"
                  className="mt-2 text-xl font-bold leading-snug text-slate-900 sm:text-2xl"
                >
                  会議を録音するだけで、
                  <br />
                  組織のコンディションが見える。
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  定例会議の音声から活力とストレスを数値化し、次の1on1で聞くべき問いまで届けます。
                </p>

                <div className="mt-5 overflow-hidden rounded-xl shadow-[0_8px_32px_-8px_rgba(215,20,91,0.12)] ring-1 ring-slate-900/5">
                  <Image
                    src="/hr/og.png"
                    alt="probe 紹介ページのプレビュー"
                    width={1200}
                    height={630}
                    className="h-auto w-full"
                    sizes="(max-width: 680px) 100vw, 680px"
                    priority
                  />
                </div>

                <Link
                  href="/hr"
                  onClick={goToLp}
                  data-track-cta="global_popup_hr_link"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d7145b] px-6 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(215,20,91,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#b00f49] active:translate-y-0 sm:text-lg"
                >
                  今すぐ紹介を見る
                  <ArrowRight size={18} strokeWidth={2} aria-hidden />
                </Link>
                <p className="mt-3 text-center text-xs text-slate-400">
                  専用機材は不要です。ページ内から資料請求もできます。
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pillOpen && !modalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            className="fixed right-4 bottom-4 z-50 sm:right-6 sm:bottom-6"
          >
            <Link
              href="/hr"
              data-track-cta="global_popup_hr_pill"
              className="flex items-center gap-2 rounded-full bg-[#d7145b] px-4 py-3 text-sm font-bold text-white shadow-[0_12px_28px_-8px_rgba(215,20,91,0.45)] transition-transform hover:-translate-y-0.5"
            >
              probe を見る
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
