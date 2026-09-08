'use client'

import React, { useEffect, useState } from 'react'
import { ArrowRight } from 'lucide-react'

/**
 * モバイル専用の追従CTA。
 * ヒーローを抜けてから出し、フォームに到達したら引っ込める。
 */
export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const form = document.getElementById('lead-form')

    const onScroll = () => {
      const pastHero = window.scrollY > window.innerHeight * 0.9
      const formInView = form ? form.getBoundingClientRect().top < window.innerHeight : false
      setVisible(pastHero && !formInView)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-hr-rule-strong bg-hr-paper/95 backdrop-blur-sm transition-transform duration-300 lg:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="hr-container flex items-center gap-4 py-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-bold text-hr-ink">サービス概要資料（無料）</p>
          <p className="truncate text-[11px] text-hr-muted">解析項目・レポート見本・費用感を収録</p>
        </div>
        <a
          href="#lead-form"
          tabIndex={visible ? undefined : -1}
          className="hr-btn hr-btn-primary shrink-0 !px-5 !py-2.5 !text-[13px]"
        >
          請求する
          <ArrowRight size={14} strokeWidth={2} aria-hidden />
        </a>
      </div>
    </div>
  )
}
