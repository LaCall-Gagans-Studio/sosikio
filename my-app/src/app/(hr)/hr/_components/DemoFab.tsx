'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AudioLines, Mic } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'

export function DemoFab() {
  const [visible, setVisible] = useState(true)
  const reduced = useReducedMotion()

  useEffect(() => {
    const target = document.getElementById('lead-form')
    if (!target) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <motion.div
      className="fixed bottom-6 right-4 z-40 pb-[env(safe-area-inset-bottom)] sm:bottom-8 sm:right-6"
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.5 }}
    >
      <Link
        href="/hr/demo"
        data-track-cta="hr_demo_fab"
        aria-label="音声感情分析デモへ移動"
        className="group relative inline-flex h-20 w-20 flex-col items-center justify-center rounded-full bg-[#ed008c] text-white shadow-[0_16px_40px_-10px_rgba(237,0,140,0.7)] ring-2 ring-[#fff200]/65 transition-transform duration-200 hover:scale-105 sm:h-24 sm:w-24"
      >
        <span className="pointer-events-none absolute -top-10 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-full border border-white/30 bg-[#141210]/90 px-3 py-1 text-[11px] font-bold tracking-wide text-white/90 backdrop-blur-sm sm:block">
          最短3秒デモ
        </span>
        <motion.span
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-[#fff200]/70"
          animate={reduced ? undefined : { scale: [1, 1.14], opacity: [0.7, 0] }}
          transition={reduced ? undefined : { duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
        />
        <AudioLines size={14} className="mb-0.5 text-[#fff200]" />
        <PulsingMic reduced={!!reduced} />
        <span className="mt-1 text-[10px] font-black leading-none sm:text-[11px]">音声分析</span>
      </Link>
    </motion.div>
  )
}

function PulsingMic({ reduced }: { reduced: boolean }) {
  if (reduced) {
    return <Mic size={26} className="shrink-0" />
  }

  return (
    <motion.span
      className="inline-flex shrink-0"
      animate={{ scale: [1, 1.18, 1] }}
      transition={{
        duration: 0.6,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 7.4,
      }}
    >
      <Mic size={26} />
    </motion.span>
  )
}
