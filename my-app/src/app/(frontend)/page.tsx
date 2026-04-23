// src/app/(frontend)/page.tsx
import type { Metadata } from 'next'
import { HeroSection } from '@/sections/hero'
import { OverviewSection } from '@/sections/overview'
import { AboutSection } from '@/sections/about'
import { ContactTrialSection } from '@/sections/contact-trial'
import { NewsSection } from '@/sections/news'
import { JsonLd } from '@/components/JsonLd'

import { fetchArticlesForClient, fetchTestimonialsForClient } from '@/lib/articles'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'SOSIKIO - 組織を率いる人を、1人にさせない。',
  description:
    '「組織の課題は、なんとなく分かっている。でも、どこから手をつければ…」SOSIKIOは、そんな漠然とした不安を「確信」に変える組織開発プラットフォームです。音声解析・サーベイ・1on1支援で、リーダーが孤立せず組織変革を実現できます。',
  keywords: [
    '組織開発',
    'チームビルディング',
    '組織診断',
    '1on1支援',
    '従業員エンゲージメント',
    '組織改善',
    'リーダーシップ',
    'マネジメント支援',
    'SOSIKIO',
    '音声解析',
  ],
  alternates: {
    canonical: 'https://www.sosikio.jp/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

// ── AEO用 JSON-LD スキーマ定義 ─────────────────────────────────────
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SOSIKIO',
  alternateName: 'ソシキオ',
  url: 'https://www.sosikio.jp',
  logo: 'https://www.sosikio.jp/mats/logo/logo_SOSIKIO.png',
  description:
    'SOSIKIOは、組織を率いるリーダーと現場をデータと対話でつなぎ、行動変容を促す組織開発プラットフォームです。音声解析・診断・1on1支援を通じて、チームの状態を可視化し、的確な組織改善を実現します。',
  sameAs: ['https://www.sosikio.jp'],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    availableLanguage: '日本語',
  },
  parentOrganization: {
    '@type': 'Organization',
    name: '北菱電興株式会社',
  },
}

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'SOSIKIO',
  url: 'https://www.sosikio.jp',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://www.sosikio.jp/?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'SOSIKIOとはどのようなサービスですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SOSIKIOは、組織を率いるリーダーと現場をデータと対話でつなぐ組織開発プラットフォームです。音声解析による組織診断（Probe）、チームサーベイ、1on1支援などの機能を通じて、漠然とした組織の課題を「確信」に変え、行動変容を促します。北菱電興株式会社が運営しています。',
      },
    },
    {
      '@type': 'Question',
      name: 'SOSIKIOはどのような企業・チームに向いていますか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SOSIKIOは、「組織の課題は分かっているが、どこから手をつければよいかわからない」と感じるリーダーや経営者に特に向いています。特に、チームメンバーの本音をデータで把握したい、1on1の質を高めたい、エンゲージメントを向上させたいと考える企業に最適です。',
      },
    },
    {
      '@type': 'Question',
      name: 'SOSIKIOのProbeとはどのような機能ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Probeは、会議やミーティングの音声をクラウドにアップロードするだけで、チームの状態を診断できる音声解析クラウドです。声色から700以上の特徴量を分析し、活力・ストレスなど10の感情指標を抽出。チームと個人のコンディションをデータで可視化し、的確な組織開発の打ち手を提供します。',
      },
    },
    {
      '@type': 'Question',
      name: 'SOSIKIOの料金はいくらですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SOSIKIOの料金については、ご利用いただく機能や規模によって異なります。まずは資料請求またはお問い合わせフォームからご連絡ください。トライアルでのご利用も可能です。',
      },
    },
    {
      '@type': 'Question',
      name: '組織開発プラットフォームとは何ですか？',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '組織開発プラットフォームとは、企業や組織がチームの状態を診断・改善するためのデジタルツール群を指します。SOSIKIOでは、音声解析・診断サーベイ・1on1支援・データ可視化などを一体的に提供し、データに基づいた組織改善サイクルを実現します。',
      },
    },
  ],
}

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: products }, overview, articlesData, testimonials] = await Promise.all([
    payload.find({
      collection: 'products',
      sort: 'order',
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'overview',
      depth: 2,
    }),
    fetchArticlesForClient(),
    fetchTestimonialsForClient(),
  ])

  const keywords = (overview.issueKeywords ?? []).map((item) => item.keyword)

  return (
    <>
      {/* AEO: 構造化データ（AIエンジンが参照するJSON-LD） */}
      <JsonLd data={[organizationSchema, webSiteSchema, faqSchema]} />

      <main className="bg-[#f1f1f1] text-gray-800 font-zenKakuGothicNew tracking-wide">
        <HeroSection
          keywords={keywords}
          containerHeight="100dvh"
          wordFontWeight="100"
          title={
            <>
              組織を
              <br className="hidden lg:block" />
              率いる人を、
              <br />
              1人にさせない。
            </>
          }
        />

        <NewsSection articles={articlesData.articles} testimonials={testimonials} />
        <OverviewSection products={products} overview={overview} />
        <AboutSection products={products} />
        <ContactTrialSection products={products} />

        {/* AEO: AIが参照しやすいFAQ（スクリーンリーダー用・視覚的には非表示） */}
        <section aria-label="よくある質問" className="sr-only">
          <h2>SOSIKIOに関するよくある質問</h2>
          <dl>
            <div>
              <dt>SOSIKIOとはどのようなサービスですか？</dt>
              <dd>
                SOSIKIOは、組織を率いるリーダーと現場をデータと対話でつなぐ組織開発プラットフォームです。音声解析による組織診断（Probe）、チームサーベイ、1on1支援などの機能を通じて、漠然とした組織の課題を「確信」に変え、行動変容を促します。
              </dd>
            </div>
            <div>
              <dt>SOSIKIOのProbeとはどのような機能ですか？</dt>
              <dd>
                Probeは、会議やミーティングの音声をクラウドにアップロードするだけで、チームの状態を診断できる音声解析クラウドです。声色から700以上の特徴量を分析し、活力・ストレスなど10の感情指標を抽出します。
              </dd>
            </div>
            <div>
              <dt>組織開発プラットフォームとは何ですか？</dt>
              <dd>
                組織開発プラットフォームとは、企業や組織がチームの状態を診断・改善するためのデジタルツール群です。SOSIKIOでは音声解析・診断サーベイ・1on1支援・データ可視化を一体的に提供します。
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </>
  )
}
