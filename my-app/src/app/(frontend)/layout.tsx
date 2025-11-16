import React from 'react'
import './styles.css'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'SOSIKIO - 組織を率いる人を、1人にさせない。',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
