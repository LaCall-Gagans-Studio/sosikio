'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function ScrollLink({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() =>
        document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      className="text-sm text-white/60 transition-colors hover:text-[#fff200]"
    >
      {label}
    </button>
  )
}

const SERVICE_LINKS = [
  { label: 'コエの健康診断', href: '/hr#two-voices-title' },
  { label: 'コエカラ研修', href: '/hr#kanama-title' },
  { label: 'Probe', href: '/probe' },
] as const

const COMPANY_LINKS = [
  { label: 'SOSIKIOとは', href: '/' },
  { label: '理念・会社情報', href: '/philosophy' },
] as const

export function HrFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-[#141210]">
      <div className="hr-container py-14 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-flex w-fit rounded-md bg-white px-3 py-2">
              <Image
                src="/hr/brand/logo_sosikio.webp"
                alt="SOSIKIO"
                width={900}
                height={287}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-sm leading-relaxed text-white/60">
              コエで組織の健康を可視化する
            </p>
          </div>

          {/* Column 2: サービス */}
          <div>
            <p className="hr-impact mb-4 text-sm font-bold tracking-wider text-white/90">
              サービス
            </p>
            <ul className="flex flex-col gap-2.5">
              {SERVICE_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 transition-colors hover:text-[#fff200]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: 会社情報 */}
          <div>
            <p className="hr-impact mb-4 text-sm font-bold tracking-wider text-white/90">
              会社情報
            </p>
            <ul className="flex flex-col gap-2.5">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 transition-colors hover:text-[#fff200]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: お問い合わせ */}
          <div>
            <p className="hr-impact mb-4 text-sm font-bold tracking-wider text-white/90">
              お問い合わせ
            </p>
            <ul className="flex flex-col gap-2.5">
              <li>
                <ScrollLink label="資料請求" />
              </li>
              <li>
                <a
                  href="mailto:info@sosikio.jp"
                  className="text-sm text-white/60 transition-colors hover:text-[#fff200]"
                >
                  メール
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="hr-container flex flex-col items-center justify-between gap-3 py-6 text-center sm:flex-row">
          <p className="text-xs tracking-widest text-white/50">
            &copy; {year} HOKURYO DENKO Co.,Ltd. ALL RIGHTS RESERVED.
          </p>
          <Link
            href="/rule"
            className="text-xs text-white/50 underline-offset-4 transition-colors hover:text-[#fff200] hover:underline"
          >
            利用規約
          </Link>
        </div>
      </div>
    </footer>
  )
}
