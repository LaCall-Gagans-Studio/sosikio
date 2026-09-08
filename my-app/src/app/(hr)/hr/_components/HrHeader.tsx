'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'サービス概要', href: '#about' },
  { label: '導入効果', href: '#benefits' },
  { label: 'レポート画面', href: '#dashboard' },
  { label: 'Thinking OS', href: '#thinking-os' },
  { label: '人格開発', href: '#persona-dev' },
  { label: '導入の流れ', href: '#onboarding' },
  { label: 'FAQ', href: '#faq' },
] as const

function scrollToLeadForm() {
  document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function HrHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? Math.min(1, y / max) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ヘッダー高さ分を除いた帯の中で、いちばん上にあるセクションを現在地とする
  useEffect(() => {
    const sections = NAV_ITEMS.map(({ href }) => document.getElementById(href.slice(1))).filter(
      (el): el is HTMLElement => el !== null,
    )
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(`#${visible[0].target.id}`)
      },
      { rootMargin: '-64px 0px -55% 0px' },
    )
    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const closeMenu = useCallback(() => setMenuOpen(false), [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200 ${
        scrolled
          ? 'border-hr-rule bg-hr-paper/95 backdrop-blur-sm'
          : 'border-transparent bg-transparent'
      }`}
    >
      <div className="hr-container flex h-16 items-center justify-between gap-6">
        <Link href="/hr" className="flex shrink-0 items-center gap-3" aria-label="probe トップへ">
          <Image
            src="/hr/probe/logo-probe.webp"
            alt="probe"
            width={480}
            height={218}
            priority
            className="h-6 w-auto object-contain"
          />
          <span className="hr-label hidden sm:inline" lang="en">
            by SOSIKIO
          </span>
        </Link>

        <nav aria-label="セクション" className="hidden items-center gap-7 lg:flex">
          {NAV_ITEMS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              aria-current={active === href ? 'true' : undefined}
              className={`border-b pb-0.5 text-[13px] font-medium transition-colors hover:text-hr-ink ${
                active === href
                  ? 'border-hr-accent text-hr-ink'
                  : 'border-transparent text-hr-muted hover:border-hr-ink'
              }`}
            >
              {label}
            </a>
          ))}
          <button type="button" onClick={scrollToLeadForm} className="hr-btn hr-btn-primary !py-2.5">
            資料を請求する
          </button>
        </nav>

        <button
          type="button"
          aria-label={menuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="p-2 text-hr-ink lg:hidden"
        >
          {menuOpen ? <X size={22} strokeWidth={1.25} /> : <Menu size={22} strokeWidth={1.25} />}
        </button>
      </div>

      {menuOpen && (
        <nav
          aria-label="モバイルナビゲーション"
          className="border-t border-hr-rule bg-hr-paper lg:hidden"
        >
          <ul className="hr-container flex flex-col py-2">
            {NAV_ITEMS.map(({ label, href }) => (
              <li key={href} className="border-b border-hr-rule last:border-b-0">
                <a
                  href={href}
                  onClick={closeMenu}
                  className="block py-3.5 text-[15px] text-hr-ink"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <button
                type="button"
                onClick={() => {
                  closeMenu()
                  scrollToLeadForm()
                }}
                className="hr-btn hr-btn-primary w-full"
              >
                資料を請求する
              </button>
            </li>
          </ul>
        </nav>
      )}

      <div aria-hidden className="absolute inset-x-0 bottom-0 h-px">
        <div
          className="h-full origin-left transition-transform duration-150 ease-out"
          style={{
            background: 'var(--color-hr-accent)',
            transform: `scaleX(${progress})`,
          }}
        />
      </div>
    </header>
  )
}
