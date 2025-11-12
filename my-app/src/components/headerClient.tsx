'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Logo } from '@/components/Logo/Logo'
import Link from 'next/link'

const headerData = [
  { title: 'サービス O シル', url: '#products', special: false },
  { title: 'SOSIKIO O シル', url: '/philosophy', special: false },
  { title: '事例 O ミル', url: '/articles', special: false },
  { title: 'お問い合わせ / 資料請求', url: '#contact', special: true },
]

export const HeaderClient = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const panelRef = useRef<HTMLDivElement>(null)

  // ヘッダー背景の挙動
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // 背景スクロールロック & Escでクローズ
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  // パネル外クリックで閉じる
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false)
    }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [open])

  // 固定ヘッダ分オフセットしてスムーススクロール
  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const headerOffset = 80 // ヘッダー高さに合わせて調整
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  // クリック時の挙動
  const handleClick = (url: string) => {
    const close = () => setOpen(false)

    if (url.startsWith('#')) {
      const id = url.slice(1)

      if (pathname === '/') {
        // 同一ページならそのままスクロール
        scrollToId(id)
      } else {
        // 他ページならトップへ遷移しつつハッシュを付与
        // ブラウザ標準のアンカー移動が働く（初期表示後に自動スクロール）
        router.push(`/#${id}`)
      }
      close()
      return
    }

    // 通常のページ遷移
    router.push(url)
    close()
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md backdrop-blur-sm' : 'bg-transparent'
      }`}
      role="banner"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/">
          <Logo loading="eager" priority="high" />
        </Link>

        {/* デスクトップナビ */}
        <nav className="hidden md:flex items-center space-x-4">
          {headerData.map((h, k) => (
            <button
              key={k}
              onClick={() => handleClick(h.url)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                h.special ? 'text-white bg-black hover:bg-black/80' : 'text-black hover:bg-gray-200'
              }`}
            >
              {h.title}
            </button>
          ))}
        </nav>

        {/* ハンバーガー（モバイル） */}
        <button
          aria-label="メニューを開く"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-black hover:bg-black/5"
        >
          <span className="sr-only">Open main menu</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-black transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-opacity ${open ? 'opacity-0' : 'opacity-100'}`}
            />
            <span
              className={`block h-0.5 w-6 bg-black transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`}
            />
          </div>
        </button>
      </div>

      {/* モバイルメニュー（スライドダウン） */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
        id="mobile-menu"
      >
        <div className="backdrop-blur-sm bg-white/80 border-t border-gray-200">
          <div
            ref={panelRef}
            className="container mx-auto px-6 py-4 flex flex-col gap-3"
            role="menu"
            aria-label="モバイルメニュー"
          >
            {headerData.map((h, k) => (
              <button
                key={k}
                onClick={() => handleClick(h.url)}
                className={`w-full text-left px-4 py-3 rounded-lg text-base font-semibold ${
                  h.special
                    ? 'text-white bg-black hover:bg-black/80'
                    : 'text-black hover:bg-gray-200'
                }`}
                role="menuitem"
              >
                {h.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
