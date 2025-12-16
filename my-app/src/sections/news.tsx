// src/sections/news.tsx
import Link from 'next/link'
import { ArrowRight, ChevronRight } from 'lucide-react'
import { formatIsoDateToJa } from '@/lib/formatDate'
import type { ArticleForClient, TestimonialForClient } from '@/lib/articles'

type NewsItem = ArticleForClient | TestimonialForClient

type Props = {
  articles: ArticleForClient[]
  testimonials: TestimonialForClient[]
}

export function NewsSection({ articles, testimonials }: Props) {
  // コラムとお客様の声を結合・ソートして最新5件を取得
  const newsItems: NewsItem[] = [...articles, ...testimonials]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)

  if (newsItems.length === 0) return null

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#f8f8f8]">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー部分 */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <span>最新情報</span>
            <span className="text-sm text-gray-400 font-medium hidden sm:inline-block">
              Latest News
            </span>
          </h2>
          <Link
            href="/articles"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 hover:text-cyan-700 transition-colors"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ニュースリスト */}
        <ul className="flex flex-col border-t border-gray-300/60">
          {newsItems.map((item) => {
            const isColumn = item.type === 'column'
            return (
              <li key={item.slug} className="border-b border-gray-300/60">
                <Link
                  href={
                    item.linkType === 'external' && item.externalLink
                      ? item.externalLink
                      : `/articles/${item.slug}`
                  }
                  target={item.linkType === 'external' ? '_blank' : undefined}
                  rel={item.linkType === 'external' ? 'noopener noreferrer' : undefined}
                  className="group flex flex-col sm:flex-row sm:items-center py-4 px-3 hover:bg-white transition-colors duration-200 rounded-lg"
                >
                  {/* 日付とタグ */}
                  <div className="flex items-center gap-3 mb-2 sm:mb-0 sm:w-48 shrink-0">
                    <time className="text-sm font-medium text-gray-700 font-mono tracking-wide">
                      {formatIsoDateToJa(item.date)}
                    </time>
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-bold tracking-wider uppercase rounded-md border ${
                        isColumn
                          ? 'border-cyan-200 text-cyan-800 bg-cyan-100'
                          : 'border-rose-200 text-rose-800 bg-rose-100'
                      }`}
                    >
                      {isColumn ? 'COLUMN' : 'VOICE'}
                    </span>
                  </div>

                  {/* タイトル */}
                  <h3 className="flex-1 text-lg font-bold text-gray-900 group-hover:text-cyan-800 transition-colors line-clamp-2 sm:line-clamp-1 mt-2 sm:mt-0">
                    {item.title}
                  </h3>

                  {/* 矢印アイコン（PCのみ表示） */}
                  <div className="hidden sm:flex items-center justify-end w-8 text-gray-400 group-hover:text-cyan-600 transition-transform duration-300 group-hover:translate-x-1">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* モバイル用「View all」リンク */}
        <div className="mt-6 text-right sm:hidden">
          <Link
            href="/articles"
            className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-600 hover:text-cyan-700"
          >
            <span>View all</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
