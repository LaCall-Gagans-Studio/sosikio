import React from 'react'
import './styles.css'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import type { Metadata } from 'next'
import Script from 'next/script' // next/scriptをインポート

// TypeScriptに window.dataLayer が存在することを教える
declare global {
  interface Window {
    dataLayer: any[]
  }
}

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

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props
  // "yourProjectId" の部分を実際のプロジェクトIDに置き換えてください
  const clarityProjectId = 'uoc6ifrhln'

  return (
    <html lang="ja">
      <head>
        {/* Juicerタグ */}
        <Script src="//kitchen.juicer.cc/?color=s110owz4x8Y=" strategy="afterInteractive" />

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-L0S28DRFQM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-L0S28DRFQM');
          `}
        </Script>

        {/* Microsoft Clarity (npmを使わずScriptタグで挿入することでサーバーエラーを回避) */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${clarityProjectId}");
          `}
        </Script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
