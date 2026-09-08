import React from 'react'
import { JsonLd } from '@/components/JsonLd'
import { HrHeader } from './_components/HrHeader'
import { HrFooter } from './_components/HrFooter'
import { HashScrollToForm } from './_components/HashScrollToForm'
import { Hero } from './_components/Hero'
import { SpecBand } from './_components/SpecBand'
import { Problem } from './_components/Problem'
import { About } from './_components/About'
import { Benefits } from './_components/Benefits'
import { Outcome } from './_components/Outcome'
import { DashboardShowcase } from './_components/DashboardShowcase'
import { ThinkingOs } from './_components/ThinkingOs'
import { PersonaDev } from './_components/PersonaDev'
import { MidCTA } from './_components/MidCTA'
import { UseCases } from './_components/UseCases'
import { Disclosure } from './_components/Disclosure'
import { Guardrails } from './_components/Guardrails'
import { Onboarding } from './_components/Onboarding'
import { FAQ, FAQ_ITEMS } from './_components/FAQ'
import { ClosingCTA } from './_components/ClosingCTA'
import { StickyCTA } from './_components/StickyCTA'

const softwareAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'probe Thinking OS',
  alternateName: ['プローブ', 'Thinking OS', '人格AI'],
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  url: 'https://www.sosikio.jp/hr',
  image: 'https://www.sosikio.jp/hr/og.png',
  description:
    'probe（プローブ）は、いつもの定例や1on1の録音から、メンバー一人ひとりの活力とストレスを数値にする組織開発サービスです。専用機材は不要で、次の定例から始められます。解析結果は「次の面談で誰に何を聞けばいいか」という具体的な問いの形で届きます。見せる範囲は5段階から選べ、人事評価には使いません。',
  provider: {
    '@type': 'Organization',
    name: 'SOSIKIO',
    url: 'https://www.sosikio.jp',
    parentOrganization: { '@type': 'Organization', name: '北菱電興株式会社' },
  },
  featureList: [
    '会議の録音から活力とストレスを数値化',
    '発言者ごと・時間帯ごとの状態を可視化',
    '次の1on1で聞くべき問いを提示',
    '標準3種の分析視点（Thinking OS）を切り替え可能',
    '自社の優れたリーダーの視点を専用人格として追加構築',
    '見せる範囲を5段階で出し分け',
    'セッションを重ねた推移の追跡',
    'リーダー承認を経てからレポートに掲載',
  ],
}

const howToSchema = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: 'probe の使い方',
  description: '会議の録音をアップロードしてから、次に聞くべき問いを受け取るまでの3ステップ。',
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '録音をアップロードする',
      text: 'いつもの定例や1on1をスマホやPCで録音して、画面にドラッグします。専用のマイクもアプリのインストールも必要ありません。1時間の会議は約500〜700回の発言に分解されます。',
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '声から状態を数値にする',
      text: '何を話したかではなく、どんな声で話したかを解析します。声の張り・速さ・間の取り方から、発言者ごとに活力とストレスを数値にします。',
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '次に聞くべきことを受け取る',
      text: '数値の意味を読み解いて、誰にいつ何を聞けばよいかを具体的な問いの形でお渡しします。1回の会議につき最大3つ、判断の根拠となった発言と数値が添えられます。',
    },
  ],
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
}

export default function HrPage() {
  return (
    <>
      <JsonLd data={[softwareAppSchema, howToSchema, faqSchema]} />
      <HashScrollToForm />
      <HrHeader />

      {/* LPの導線: 共感 → 概要 → 便益 → 実物 → 差別化 → 自分事化 → 不安の解消 → 導入 → CTA */}
      <main className="pt-16">
        <Hero />
        <SpecBand />
        <Problem />
        <About />
        <Benefits />
        <Outcome />
        <DashboardShowcase />
        <ThinkingOs />
        <PersonaDev />
        <MidCTA />
        <UseCases />
        <Disclosure />
        <Guardrails />
        <Onboarding />
        <FAQ />
        <ClosingCTA />
      </main>

      <StickyCTA />
      <HrFooter />
    </>
  )
}
