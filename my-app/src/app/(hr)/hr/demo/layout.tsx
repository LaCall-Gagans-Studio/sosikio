import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '音声感情分析デモ | SOSIKIO',
  description:
    '最短3秒であなたの音声から感情状態を分析。SOSIKIOのコエの健康診断を体験してください。',
}

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
