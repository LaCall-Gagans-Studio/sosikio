'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'

const POPUP_IMAGE = {
  src: '/probe/popup_4.webp',
  width: 1280,
  height: 670,
} as const

export function GlobalPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (pathname.startsWith('/probe') || pathname.startsWith('/hr')) return

    setIsOpen(false)
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 600)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-[6px]"
            onClick={() => setIsOpen(false)}
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
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100/80 hover:text-slate-600"
              aria-label="閉じる"
            >
              <X size={22} strokeWidth={1.75} />
            </button>

            <div className="px-5 sm:px-6 py-6 sm:py-7">
              <div className="font-bold rounded-xl shadow-[0_8px_32px_-8px_rgba(215,20,91,0.12)] ring-1 ring-slate-900/5">
                <Image
                  src={POPUP_IMAGE.src}
                  alt="イベント出展のお知らせ"
                  width={POPUP_IMAGE.width}
                  height={POPUP_IMAGE.height}
                  className="h-auto w-full"
                  sizes="(max-width: 680px) 100vw, 680px"
                  priority
                />
              </div>
              <Link
                href="/hr"
                onClick={() => setIsOpen(false)}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-[#d7145b] px-6 py-3.5 text-base font-bold text-white shadow-[0_8px_20px_-6px_rgba(215,20,91,0.4)] transition-all duration-200 hover:bg-[#b00f49] hover:-translate-y-0.5 active:translate-y-0 sm:text-lg"
              >
                詳しく知る
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
