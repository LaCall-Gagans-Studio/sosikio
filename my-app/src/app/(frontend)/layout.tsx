import React, { Suspense } from 'react'
import './styles.css'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { GlobalPopup } from '@/components/GlobalPopup'
import { AnalyticsScripts } from '@/components/AnalyticsScripts'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'
import type { Metadata } from 'next'
import Script from 'next/script' // next/scriptをインポート
import { Kosugi, Zen_Kaku_Gothic_New } from 'next/font/google'

export const metadata: Metadata = {
  metadataBase: new URL('https://sosikio.com'),
  title: {
    default: 'SOSIKIO - 組織を率いる人を、1人にさせない。',
    template: '%s | SOSIKIO',
  },
  description:
    '「組織の課題は、なんとなく分かっている。でも、どこから手をつければ…」SOSIKIOは、そんな漠然とした不安を「確信」に変えるプラットフォームです。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sosikio.jp',
    siteName: 'SOSIKIO',
    title: 'SOSIKIO - 組織を率いる人を、1人にさせない。',
    description:
      '「組織の課題は、なんとなく分かっている。でも、どこから手をつければ…」SOSIKIOは、そんな漠然とした不安を「確信」に変えるプラットフォームです。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SOSIKIO',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOSIKIO - 組織を率いる人を、1人にさせない。',
    description:
      '「組織の課題は、なんとなく分かっている。でも、どこから手をつければ…」SOSIKIOは、そんな漠然とした不安を「確信」に変えるプラットフォームです。',
  },
}

// next/font: サーバーサイドで最適化されたフォントローダー（レンダリングブロッキングなし）
const kosugi = Kosugi({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-kosugi',
  preload: false, // 日本語フォントは容量が大きいため、遅延ロードに切り替え
})

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ['300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-zenKakuGothicNew',
  preload: false, // 日本語フォントは容量が大きいため、遅延ロードに切り替え
})

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ja" className={`${kosugi.variable} ${zenKakuGothicNew.variable}`}>
      <head>
        {/* LCP最適化: Heroセクションのメイン背景画像をプリロード */}
        <link rel="preload" as="image" href="/mats/hero_bg.webp" type="image/webp" />
        {/* 外部フォントへのプリコネクト（フォールバック用） */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Juicerタグ */}
        <Script src="//kitchen.juicer.cc/?color=s110owz4x8Y=" strategy="afterInteractive" />
      </head>
      <body>
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {/* <GlobalPopup /> */}
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
