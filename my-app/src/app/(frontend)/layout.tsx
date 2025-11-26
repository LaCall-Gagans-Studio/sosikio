import React from 'react'
import './styles.css'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://sosikio.com'),
  title: {
    default: 'SOSIKIO - 組織を率いる人を、1人にさせない。',
    template: '%s | SOSIKIO',
  },
  description:
    'SOSIKIOは、組織開発・人材育成の専門家チームです。データと対話で、組織の課題を解決します。',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://sosikio.com',
    siteName: 'SOSIKIO',
    title: 'SOSIKIO - 組織を率いる人を、1人にさせない。',
    description:
      'SOSIKIOは、組織開発・人材育成の専門家チームです。データと対話で、組織の課題を解決します。',
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
      'SOSIKIOは、組織開発・人材育成の専門家チームです。データと対話で、組織の課題を解決します。',
    // site: '@sosikio', // If there is a Twitter account
    // creator: '@sosikio',
  },
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
