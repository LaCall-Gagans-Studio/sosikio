import React from 'react'
import '../(frontend)/styles.css'
import type { Metadata } from 'next'
import Link from 'next/link'
import Header from './probe/components/Header'

export const metadata: Metadata = {
  title: 'Probe クラウド| 組織開発に特化した音声解析プラットフォーム',
  description:
    '「音声だけでチームがわかる」組織開発に特化した音声解析プラットフォーム Probe（プローブ）クラウド版。1on1や会議の対話を可視化し、組織の課題を確信に変え、データに基づいた最高なチームづくりと組織改善を支援します。',
  keywords: [
    'Probe',
    'プローブ',
    'SOSIKIO',
    '組織開発',
    '音声解析',
    'チームビルディング',
    'ハラスメント対策',
    '1on1',
    '対話の可視化',
    'HRテック',
    '組織改善',
  ],
  openGraph: {
    title: 'Probe クラウド| 組織開発に特化した音声解析プラットフォーム',
    description:
      '音声データからチームの状態を可視化。組織の課題を解決し、対話の質を高める組織開発プラットフォーム Probe。',
    url: 'https://sosikio.jp/probe',
    siteName: 'SOSIKIO Probe',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/probe/probe.png',
        width: 1200,
        height: 630,
        alt: 'Probe',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Probe クラウド| 組織開発に特化した音声解析プラットフォーム',
    description:
      '音声データからチームの状態を可視化。組織の課題を解決し、対話の質を高める組織開発プラットフォーム Probe。',
    images: ['/probe/probe.png'],
  },
}

function ProbeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#ffffff] border-b border-[#babec0] shadow-sm">
      <div className="container mx-auto px-8 h-20 flex items-center justify-between">
        <Link href="/probe">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mats/logo/logo_Probe_long.png"
            alt="probe logo"
            className="h-10 w-auto object-contain"
          />
        </Link>
      </div>
    </header>
  )
}

function ProbeFooter() {
  return (
    <footer className="bg-[#babec0] text-[#ffffff] py-10 mt-auto">
      <div className="container mx-auto px-8 flex flex-col items-center text-sm">
        <img
          src="/mats/logo/logo_Probe.png"
          alt="probe"
          className="h-8 mb-4 object-contain opacity-80"
        />
        <p className="tracking-widest font-bold">
          &copy; {new Date().getFullYear()} HOKURYO DENKO Co.,Ltd. ALL RIGHTS RESERVED.
        </p>
      </div>
    </footer>
  )
}

export default function ProbeLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      {/* 
        ルートに合わせて Zen Kaku Gothic New を指定
        全体の背景色は白、テキストはダークグレーベース
      */}
      <body className="font-zenKakuGothicNew bg-[#ffffff] text-gray-900 flex flex-col min-h-screen selection:bg-[#d81e5c] selection:text-white">
        {/* <ProbeHeader /> */}
        <Header />
        <main className="flex-grow">{children}</main>
        <ProbeFooter />
      </body>
    </html>
  )
}
