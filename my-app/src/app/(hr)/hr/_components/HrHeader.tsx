'use client'

import React, { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'コエの健康診断', href: '/hr' },
  { label: '理念・会社情報', href: '/philosophy' },
] as const

function scrollToLeadForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HrHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-[#141210]/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="hr-container flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="inline-flex shrink-0 rounded-md bg-white px-3 py-1.5">
          <Image
            src="/hr/brand/logo_sosikio.webp"
            alt="SOSIKIO"
            width={900}
            height={287}
            className="h-5 w-auto sm:h-6"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="メインナビゲーション" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                href === '/hr' ? 'text-[#fff200]' : 'text-white/75 hover:text-[#fff200]'
              }`}
            >
              {label}
            </Link>
          ))}
          <button
            type="button"
            onClick={scrollToLeadForm}
            className="hr-impact rounded-md bg-[#fff200] px-5 py-2 text-sm font-bold text-[#141210] transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            資料請求
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="inline-flex items-center justify-center rounded-md p-2 text-white md:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <nav
          aria-label="モバイルナビゲーション"
          className="border-t border-white/10 bg-[#141210]/95 backdrop-blur-md md:hidden"
        >
          <ul className="hr-container flex flex-col gap-1 py-4">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={closeMenu}
                  className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors ${
                    href === '/hr'
                      ? 'bg-white/5 text-[#fff200]'
                      : 'text-white/80 hover:bg-white/5 hover:text-[#fff200]'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <button
                type="button"
                onClick={() => {
                  closeMenu()
                  scrollToLeadForm()
                }}
                className="hr-impact mt-2 w-full rounded-md bg-[#fff200] px-5 py-3 text-base font-bold text-[#141210]"
              >
                資料請求
              </button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
