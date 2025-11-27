// app/(frontend)/articles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { RichText } from '@payloadcms/richtext-lexical/react'
import {
  fetchArticlesForClient,
  fetchTestimonialsForClient,
  type ArticleForClient,
  type TestimonialForClient,
} from '@/lib/articles'
import { formatIsoDateToJa } from '@/lib/formatDate'

export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const [{ articles }, testimonials] = await Promise.all([
    fetchArticlesForClient(),
    fetchTestimonialsForClient(),
  ])

  const articleFromColumns = articles.find((a) => a.slug === slug)
  const articleFromVoices = testimonials.find((t) => t.slug === slug)

  const article = (articleFromColumns ?? articleFromVoices) as
    | ArticleForClient
    | TestimonialForClient
    | undefined

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      images: article.image
        ? [
            {
              url: article.image,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : undefined,
    },
  }
}

// 以前の PageProps/ArticlePageProps の定義を削除

// コンポーネントの引数から型アノテーションを完全に削除し、Next.jsの自動推論に任せる
// ただし、params は構造分解して使用する
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  // 修正点2: params を await してから slug を取り出す
  const { slug } = await params

  // const slug = (params as { slug: string }).slug  <-- これは古い書き方でエラーになります

  const [{ articles }, testimonials] = await Promise.all([
    fetchArticlesForClient(),
    fetchTestimonialsForClient(),
  ])

  const articleFromColumns = articles.find((a) => a.slug === slug)
  const articleFromVoices = testimonials.find((t) => t.slug === slug)

  const article = (articleFromColumns ?? articleFromVoices) as
    | ArticleForClient
    | TestimonialForClient
    | undefined

  if (!article) return notFound()

  const isVoice = article.type === 'voice'

  return (
    <main className="min-h-screen bg-gradient-to-b from-ws-background via-slate-100 to-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-10">
        {/* パンくず & ラベル */}
        <div className="space-y-4">
          <nav className="text-xs text-slate-500">
            <Link href="/articles" className="underline-offset-2 hover:underline">
              SOSIKIO Library
            </Link>
            <span className="mx-1.5">/</span>
            <span className="text-slate-700">
              {isVoice
                ? 'お客様の声'
                : article.category === 'exhibition'
                  ? '展示会'
                  : article.category === 'product_info'
                    ? '製品情報'
                    : 'コラム'}
            </span>
          </nav>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={[
                'inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide',
                isVoice
                  ? 'bg-rose-500/90 text-white shadow-sm shadow-rose-500/40'
                  : article.category === 'column'
                    ? 'bg-cyan-500/90 text-slate-950 shadow-sm shadow-cyan-500/40'
                    : 'bg-red-500/90 text-white shadow-sm shadow-red-500/40',
              ].join(' ')}
            >
              {isVoice
                ? 'お客様の声'
                : article.category === 'exhibition'
                  ? '展示会'
                  : article.category === 'product_info'
                    ? '製品情報'
                    : 'コラム'}
            </span>
            <span className="text-[11px] font-mono text-slate-500">
              {formatIsoDateToJa(article.date)}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
            {article.title}
          </h1>
        </div>

        {/* メインビジュアル */}
        {article.image && (
          <div className="overflow-hidden rounded-2xl bg-slate-900/80">
            <div className="relative w-full h-64 sm:h-80 md:h-96">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/0 to-transparent" />
            </div>
          </div>
        )}

        {/* VOICE のプロフィールカード */}
        {isVoice && 'voice' in article && article.voice && (
          <section className="rounded-2xl border border-slate-800/70 px-4 py-4 sm:px-6 sm:py-5 flex gap-4 sm:gap-6 items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.voice.avatarUrl}
              alt={article.voice.name}
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover border-4 border-slate-950 bg-ws-background flex-shrink-0"
            />
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-sm font-semibold text-black">{article.voice.name}</p>
                <p className="text-xs sm:text-sm text-black">
                  {article.voice.company} / {article.voice.title}
                </p>
              </div>
              <p className="text-sm text-black leading-relaxed">「{article.voice.quote}」</p>
              {article.voice.logoUrl && (
                <div className="pt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.voice.logoUrl}
                    alt={article.voice.company}
                    className="h-7 sm:h-8 object-contain"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* 本文 */}
        <article className="rounded-2xl bg-slate-50/80 px-4 py-6 sm:px-6 sm:py-8 shadow-sm border border-slate-200/70">
          <div className="prose prose-blue prose-img:rounded-xl prose-ul:list-disc max-w-none prose-p:leading-relaxed prose-headings:scroll-mt-20">
            {article.content && <RichText data={article.content} className="w-full" />}
          </div>
        </article>

        {/* タグ */}
        {article.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {article.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-slate-900 px-2.5 py-0.5 text-[11px] text-slate-200"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        {/* 戻るリンク */}
        <div className="pt-4 border-t border-slate-300/70">
          <Link
            href="/articles"
            className="inline-flex items-center text-xs sm:text-sm font-medium text-slate-700 hover:text-cyan-600 hover:underline underline-offset-4"
          >
            ← SOSIKIO Library に戻る
          </Link>
        </div>
      </div>
    </main>
  )
}

// generateStaticParams は props を受け取らないため、修正は不要です。
export async function generateStaticParams() {
  const [{ articles }, testimonials] = await Promise.all([
    fetchArticlesForClient(),
    fetchTestimonialsForClient(),
  ])

  return [...articles, ...testimonials].map((a) => ({
    slug: a.slug,
  }))
}
