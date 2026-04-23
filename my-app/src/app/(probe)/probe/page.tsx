import React from 'react'
import type { Metadata } from 'next'
import { ProbeContactSection } from '@/sections/probe-contact'
import Hero from './components/Hero'
import Process from './components/Process'
import Story from './components/Story'
import Features from './components/Features'
import { JsonLd } from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Probe - 音声だけでチームがわかる組織診断クラウド | SOSIKIO',
  description:
    '会議の音声をアップロードするだけで、チームの活力・ストレスを解析。700以上の特徴量から10の感情指標を抽出し、組織と個人のコンディションを可視化する音声解析クラウド「Probe」。組織開発を次のステージへ。',
  keywords: [
    '音声解析',
    '組織診断',
    'Probe',
    'チーム状態可視化',
    '感情解析',
    '会議分析',
    'エンゲージメント測定',
    '1on1分析',
    '組織開発クラウド',
    'チームビルディングツール',
    'ストレス可視化',
    '活力測定',
  ],
  alternates: {
    canonical: 'https://www.sosikio.jp/probe',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'Probe - 音声だけでチームがわかる組織診断クラウド',
    description:
      '会議の音声をアップロードするだけで、チームの活力・ストレスを解析。700以上の特徴量から10の感情指標を抽出し、組織と個人のコンディションを可視化します。',
    url: 'https://www.sosikio.jp/probe',
    siteName: 'SOSIKIO',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/probe/popup_2.png',
        width: 1200,
        height: 630,
        alt: 'Probe - 音声だけでチームがわかる',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Probe - 音声だけでチームがわかる組織診断クラウド',
    description:
      '会議の音声をアップロードするだけで、チームの活力・ストレスを解析。組織開発を次のステージへ。',
  },
}

// ── AEO用 JSON-LD スキーマ定義 ─────────────────────────────────────
const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Probe',
  alternateName: 'プローブ',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://www.sosikio.jp/probe',
  description:
    'Probeは、会議やミーティングの音声をクラウドにアップロードするだけで、チームの活力とストレスを可視化する組織診断クラウドです。声色から700以上の特徴量を分析し、10の感情指標を精密に抽出。チーム全体と個人のコンディションをリアルタイムで把握できます。',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
    description: 'トライアル無料',
  },
  provider: {
    '@type': 'Organization',
    name: 'SOSIKIO',
    url: 'https://www.sosikio.jp',
    parentOrganization: {
      '@type': 'Organization',
      name: '北菱電興株式会社',
    },
  },
  featureList: [
    '会議音声のアップロードだけでチーム診断',
    '声色から700以上の特徴量を分析',
    '10の感情指標（活力・ストレス等）を抽出',
    'チーム全体と個人のコンディションを可視化',
    '組織開発に特化したAI音声解析',
    '特別な機材不要',
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'Probeで組織診断を始める方法',
  description:
    'ProbeはたったSTEP3つで組織の状態を可視化できます。特別な機材や設定は一切不要です。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '会議音声をアップロード',
      text: '普段のミーティングや1on1の録音データをProbeクラウドにアップロードします。特別な機材は一切不要です。スマートフォンの録音アプリで収録した音声でも利用できます。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '独自の感情解析で指標を抽出',
      text: '声色から700以上の特徴量を分析し、組織開発に必要な10の感情指標（活力・ストレス・関与度など）を精密に抽出します。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '組織と個人の状態を直感的に可視化',
      text: '活力とストレスを評価し、チーム全体とメンバー個別のコンディションをわかりやすいダッシュボードで確認。課題箇所を特定し、的確な組織開発の打ち手を実行できます。',
    },
  ],
}

const probeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Probeとはどのようなツールですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Probeは、会議やミーティングの音声をクラウドにアップロードするだけで、チームの活力とストレスを可視化できる組織診断クラウドです。声色から700以上の特徴量を分析し、10の感情指標を精密に抽出します。特別な機材は一切不要で、30秒でトライアル登録できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'Probeはどのように会議を分析しますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Probeは音声の声色から700以上の特徴量（音程・テンポ・声の張り・抑揚など）を独自AIで分析します。これらを組み合わせて活力・ストレス・関与度・協調性など組織開発に必要な10の感情指標を算出し、チームと個人のコンディションをダッシュボードで可視化します。',
      },
    },
    {
      '@type': 'Question',
      name: 'Probeに特別な機材は必要ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Probeに特別な機材は一切不要です。普段のミーティングや1on1の録音データ（スマートフォンのボイスメモ等）をアップロードするだけで利用できます。',
      },
    },
    {
      '@type': 'Question',
      name: 'Probeでどのような組織課題を解決できますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Probeは、チームメンバーの本音が見えない・1on1の質を高めたい・会議の関係性を改善したい・ハラスメントリスクを早期検知したい・ハイパフォーマンスチームを育てたいといった組織課題に対応します。データに基づいた客観的な視点で、リーダーの意思決定を支援します。',
      },
    },
    {
      '@type': 'Question',
      name: 'Probeは無料で試せますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'はい、Probeはトライアルでご利用いただけます。30秒でアカウント登録が完了し、アカウント作成後すぐに機能をお試しいただけます。',
      },
    },
  ],
}

export default function ProbePage() {
  return (
    <>
      {/* AEO: 構造化データ（AIエンジンが参照するJSON-LD） */}
      <JsonLd data={[softwareAppSchema, howToSchema, probeFaqSchema]} />

      <div>
        <Hero />
        <Process />
        <Story />
        <Features />
        <ProbeContactSection />

        {/* AEO: AIが参照しやすいFAQ（スクリーンリーダー用・視覚的には非表示） */}
        <section aria-label="Probeに関するよくある質問" className="sr-only">
          <h2>Probeに関するよくある質問</h2>
          <dl>
            <div>
              <dt>Probeとはどのようなツールですか？</dt>
              <dd>
                Probeは、会議やミーティングの音声をクラウドにアップロードするだけで、チームの活力とストレスを可視化できる組織診断クラウドです。声色から700以上の特徴量を分析し、10の感情指標を精密に抽出します。
              </dd>
            </div>
            <div>
              <dt>Probeはどのように会議を分析しますか？</dt>
              <dd>
                Probeは音声の声色から700以上の特徴量を独自AIで分析します。活力・ストレス・関与度など10の感情指標を算出し、チームと個人のコンディションをダッシュボードで可視化します。
              </dd>
            </div>
            <div>
              <dt>Probeに特別な機材は必要ですか？</dt>
              <dd>
                特別な機材は一切不要です。普段のミーティングや1on1の録音データをアップロードするだけで利用できます。
              </dd>
            </div>
            <div>
              <dt>Probeはどのような組織課題を解決できますか？</dt>
              <dd>
                チームメンバーの本音が見えない・1on1の質を高めたい・会議の関係性を改善したい・ハラスメントリスクを早期検知したいといった組織課題に対応します。
              </dd>
            </div>
          </dl>
        </section>
      </div>
    </>
  )
}
