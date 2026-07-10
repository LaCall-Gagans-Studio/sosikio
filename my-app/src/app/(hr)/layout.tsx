import React, { Suspense } from 'react'
import '../(frontend)/styles.css'
import './hr.css'
import type { Metadata, Viewport } from 'next'
import { Zen_Kaku_Gothic_New, Noto_Sans_JP, Anton, Yuji_Syuku } from 'next/font/google'
import { AnalyticsScripts } from '@/components/AnalyticsScripts'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hr-body',
  preload: false,
})

const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  weight: ['700', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hr-impact',
  preload: false,
})

const anton = Anton({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hr-latin',
})

const yujiSyuku = Yuji_Syuku({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hr-brush',
  preload: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sosikio.jp'),
  title: '離職の予兆をコエで可視化｜SOSIKIO（コエの健康診断）',
  description:
    '辞表は、ある日突然じゃない。主観のコエ×感情のコエで離職の予兆を毎日可視化。金間大介教授監修',
  alternates: {
    canonical: 'https://www.sosikio.jp/hr',
  },
  openGraph: {
    title: '離職の予兆をコエで可視化｜SOSIKIO（コエの健康診断）',
    description:
      '辞表は、ある日突然じゃない。主観のコエ×感情のコエで離職の予兆を毎日可視化。金間大介教授監修',
    url: 'https://www.sosikio.jp/hr',
    siteName: 'SOSIKIO',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '離職の予兆をコエで可視化｜SOSIKIO（コエの健康診断）',
    description:
      '辞表は、ある日突然じゃない。主観のコエ×感情のコエで離職の予兆を毎日可視化。金間大介教授監修',
  },
}

export const viewport: Viewport = {
  themeColor: '#141210',
}

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${zenKakuGothicNew.variable} ${anton.variable} ${yujiSyuku.variable}`}
    >
      <body className="hr-page hr-body bg-[#141210] text-white antialiased">
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
