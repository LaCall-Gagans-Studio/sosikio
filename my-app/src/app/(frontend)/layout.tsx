import React from 'react'
import './styles.css'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import Clarity from '@microsoft/clarity'

// "yourProjectId" の部分を実際のプロジェクトIDに置き換えてください
const projectId = 'yourProjectId'

Clarity.init(projectId)

import type { Metadata } from 'next'

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
        url: '/og-image.png', // TODO: Add actual OG image
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
    // site: '@sosikio', // If there is a Twitter account
    // creator: '@sosikio',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ja">
      <head>
        <script src="//kitchen.juicer.cc/?color=s110owz4x8Y=" async></script>
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
