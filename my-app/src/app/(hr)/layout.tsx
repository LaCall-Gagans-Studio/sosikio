import React, { Suspense } from 'react'
import '../(frontend)/styles.css'
import './hr.css'
import type { Metadata, Viewport } from 'next'
import { Instrument_Serif, Shippori_Mincho_B1, Inter, Noto_Sans_JP, Geist_Mono } from 'next/font/google'
import { AnalyticsScripts } from '@/components/AnalyticsScripts'
import { AnalyticsTracker } from '@/components/AnalyticsTracker'

/* 3書体システム（デザイン.md §3.1）
   Display = 明朝（語るとき）/ Text = ゴシック（示すとき）/ Mono = 数値
   和文は容量が大きいため preload しない */

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hr-serif',
})

const shipporiMincho = Shippori_Mincho_B1({
  weight: ['600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hr-mincho',
  preload: false,
})

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hr-sans',
})

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hr-jp',
  preload: false,
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hr-mono',
})

const TITLE = 'probe（プローブ）｜会議の録音から、チームの状態が見える'
const DESCRIPTION =
  'いつもの定例や1on1を録音するだけ。声から一人ひとりの活力とストレスを数値にし、「次の面談で誰に何を聞けばいいか」までお届けします。専用機材は不要、次の定例から始められます。人事評価には使いません。'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sosikio.jp'),
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'probe',
    'プローブ',
    'SOSIKIO',
    '組織開発',
    '音声解析',
    '会議分析',
    'エンゲージメント',
    '離職防止',
    '1on1',
    'サーベイ',
    'Thinking OS',
    'マネジメント支援',
  ],
  alternates: {
    canonical: 'https://www.sosikio.jp/hr',
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: 'https://www.sosikio.jp/hr',
    siteName: 'SOSIKIO',
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
  },
}

export const viewport: Viewport = {
  themeColor: '#f7f6f3',
}

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ja"
      className={`${instrumentSerif.variable} ${shipporiMincho.variable} ${inter.variable} ${notoSansJp.variable} ${geistMono.variable}`}
    >
      <body className="hr-page antialiased">
        <AnalyticsScripts />
        <Suspense fallback={null}>
          <AnalyticsTracker />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
