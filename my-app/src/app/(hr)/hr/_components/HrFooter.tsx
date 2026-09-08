'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const SERVICE_LINKS = [
  { label: 'サービス概要', href: '#about' },
  { label: '導入効果', href: '#benefits' },
  { label: 'Thinking OS', href: '#thinking-os' },
  { label: '人格開発', href: '#persona-dev' },
  { label: '活用シーン', href: '#usecases' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Probe クラウド', href: '/probe' },
] as const

const COMPANY_LINKS = [
  { label: 'SOSIKIOとは', href: '/' },
  { label: '理念・会社情報', href: '/philosophy' },
  { label: '記事', href: '/articles' },
] as const

export function HrFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-hr-rule-strong bg-hr-paper">
      <div className="hr-container py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Image
              src="/hr/probe/logo-probe.webp"
              alt="probe"
              width={480}
              height={218}
              className="h-7 w-auto object-contain"
            />
            <p className="mt-5 text-[13px] leading-7 text-hr-muted">
              会議の音声から組織の状態を測定する、
              <br />
              組織開発プラットフォーム。
            </p>
            <p className="hr-label mt-5" lang="en">
              A map of team emotions and engagement
            </p>
          </div>

          <nav aria-labelledby="footer-service">
            <p id="footer-service" className="hr-label">
              サ ー ビ ス
            </p>
            <ul className="mt-5 space-y-3">
              {SERVICE_LINKS.map(({ label, href }) =>
                href.startsWith('#') ? (
                  <li key={href}>
                    <a
                      href={href}
                      className="text-[13px] text-hr-muted underline-offset-4 transition-colors hover:text-hr-ink hover:underline"
                    >
                      {label}
                    </a>
                  </li>
                ) : (
                  <li key={href}>
                    <Link
                      href={href}
                      className="text-[13px] text-hr-muted underline-offset-4 transition-colors hover:text-hr-ink hover:underline"
                    >
                      {label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <nav aria-labelledby="footer-company">
            <p id="footer-company" className="hr-label">
              会 社 情 報
            </p>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[13px] text-hr-muted underline-offset-4 transition-colors hover:text-hr-ink hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="hr-label">お 問 い 合 わ せ</p>
            <ul className="mt-5 space-y-3">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById('lead-form')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }
                  className="text-[13px] text-hr-muted underline-offset-4 transition-colors hover:text-hr-ink hover:underline"
                >
                  資料請求・デモのご依頼
                </button>
              </li>
              <li>
                <a
                  href="mailto:info@sosikio.jp"
                  className="text-[13px] text-hr-muted underline-offset-4 transition-colors hover:text-hr-ink hover:underline"
                >
                  info@sosikio.jp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="hr-measure mt-14 border-t border-hr-rule pt-8 text-[12px] leading-6 text-hr-faint">
          本ページに掲載しているダッシュボードの数値、話者名、セッションデータはすべて表示イメージです。実際の効果や個社の性能を保証するものではありません。
        </p>
      </div>

      <div className="border-t border-hr-rule">
        <div className="hr-container flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className="hr-label" lang="en">
            &copy; {year} HOKURYO DENKO Co.,Ltd.
          </p>
          <Link
            href="/rule"
            className="text-[12px] text-hr-faint underline-offset-4 transition-colors hover:text-hr-ink hover:underline"
          >
            利用規約
          </Link>
        </div>
      </div>
    </footer>
  )
}
