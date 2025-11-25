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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f8f8]">
      <div className="max-w-5xl mx-auto">
        {/* ヘッダー部分 */}
        <div className="flex items-end justify-between mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-3">
            <span>Latest News</span>
            <span className="text-xs font-medium uppercase tracking-[0.18em] bg-black text-white px-2 py-1 hidden sm:inline-block">
              UPDATES
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
                  href={`/articles/${item.slug}`}
                  className="group flex flex-col sm:flex-row sm:items-center py-5 px-2 hover:bg-white transition-colors duration-200"
                >
                  {/* 日付とタグ */}
                  <div className="flex items-center gap-3 mb-2 sm:mb-0 sm:w-48 shrink-0">
                    <time className="text-sm text-gray-500 font-mono tracking-wide">
                      {formatIsoDateToJa(item.date)}
                    </time>
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-sm border ${
                        isColumn
                          ? 'border-cyan-200 text-cyan-700 bg-cyan-50'
                          : 'border-rose-200 text-rose-700 bg-rose-50'
                      }`}
                    >
                      {isColumn ? 'COLUMN' : 'VOICE'}
                    </span>
                  </div>

                  {/* タイトル */}
                  <h3 className="flex-1 text-base font-medium text-gray-800 group-hover:text-cyan-700 transition-colors line-clamp-2 sm:line-clamp-1">
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
