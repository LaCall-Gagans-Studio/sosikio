// app/(frontend)/articles/client.tsx
'use client'

import * as React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import type { ArticleForClient, TestimonialForClient } from '@/lib/articles'
import { Search, Tag, XCircle } from 'lucide-react'
import { formatIsoDateToJa } from '@/lib/formatDate'

type Props = {
  initialArticles: ArticleForClient[]
  initialTags: string[]
  initialTestimonials: TestimonialForClient[]
}

export function ArticlesClient({ initialArticles, initialTags, initialTestimonials }: Props) {
  const router = useRouter()
  const sp = useSearchParams()

  // フィルタ（コラムだけ対象）
  const [keyword, setKeyword] = React.useState('')
  const [selected, setSelected] = React.useState<string[]>([])

  // --- 初期化 ---
  const didInitRef = React.useRef(false)
  React.useEffect(() => {
    if (didInitRef.current) return
    didInitRef.current = true

    const q = sp.get('q') ?? ''
    const tags = (sp.get('tags') ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    setKeyword(q)
    setSelected(tags)
  }, [sp])

  // --- URL同期 ---
  React.useEffect(() => {
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (selected.length) params.set('tags', selected.join(','))
    const query = params.toString()
    router.replace(query ? `/articles?${query}` : '/articles', { scroll: false })
  }, [keyword, selected, router])

  // --- フィルタリング（コラムのみ） ---
  const filteredArticles = React.useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    return initialArticles
      .filter((a) => {
        if (selected.length && !selected.every((t) => a.tags.includes(t))) return false
        if (!kw) return true
        const hay = `${a.title} ${a.excerpt} ${a.tags.join(' ')}`.toLowerCase()
        return hay.includes(kw)
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [keyword, selected, initialArticles])

  const toggleTag = (t: string) =>
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  return (
    <main className="min-h-screen bg-gradient-to-b from-ws-background via-slate-100 to-slate-400 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-16">
        {/* ヘッダー */}
        <header className="space-y-2">
          <p className="text-xs uppercase font-bold tracking-[0.25em] bg-black text-white">
            Knowledge & Stories
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <span>SOSIKIO</span>
            <span>Library</span>
          </h1>
        </header>

        {/* --- ① お客様の声 --- */}
        {initialTestimonials.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-3">
                  <span>お客様の声</span>
                  <span className="text-xs font-medium uppercase tracking-[0.18em] bg-black text-white p-1 ">
                    VOICES
                  </span>
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  SOSIKIO を活用している企業の生のインサイトをピックアップしています。
                </p>
              </div>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {initialTestimonials.map((t) => (
                <li key={t.slug}>
                  {/* 外側のグラデ枠 */}
                  <Link
                    href={`/articles/${t.slug}`}
                    className="group block h-full rounded-2xl border p-[1px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(244,114,182,0.25)]"
                  >
                    <div className="flex h-full flex-col overflow-hidden rounded-[1rem] ">
                      {t.image && (
                        <div className="relative w-full h-44 overflow-hidden">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={t.image}
                            alt={t.title}
                            className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/0 to-transparent" />
                        </div>
                      )}

                      <div className="flex flex-1 flex-col p-5">
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="inline-flex items-center rounded-full bg-rose-500/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-white shadow-sm">
                            VOICE
                          </span>
                          <span className="text-[11px] font-mono text-slate-700">
                            {formatIsoDateToJa(t.date)}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-semibold leading-snug text-black line-clamp-2">
                          {t.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-black line-clamp-3">
                          {t.excerpt}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {t.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-300"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* --- ② コラム --- */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold flex items-center gap-3">
                <span>コラム</span>
                <span className="text-xs font-medium uppercase tracking-[0.18em] bg-black text-white p-1 ">
                  COLUMNS
                </span>
              </h2>
              <p className="mt-1 text-sm text-slate-600 max-w-xl">
                データと対話で組織を変えてきた知見を、読み物として整理しています。
                <br />
                キーワードやタグから、気になるテーマを絞り込めます。
              </p>
            </div>
          </div>

          {/* フィルタバー */}
          <div className="space-y-4 rounded-2xl border border-slate-800/80  px-4 py-5 sm:px-6 sm:py-6 backdrop-blur">
            {/* 検索バー */}
            <div className="relative w-full">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 " />
              <input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="キーワードでコラムを検索（例：心理的安全性 / LOOK / PROBE）"
                className="w-full rounded-xl border border-slate-700  py-3 pl-10 pr-4 text-sm  focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/60"
              />
            </div>

            {/* タグリスト */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center text-xs font-semibold tracking-wide text-slate-600 mr-1">
                <Tag className="mr-1 h-4 w-4" />
                TAGS
              </span>
              {initialTags.map((t) => {
                const isActive = selected.includes(t)
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => toggleTag(t)}
                    className={[
                      'rounded-full px-3.5 py-1 text-xs sm:text-[13px] font-medium transition-colors border',
                      isActive
                        ? 'bg-cyan-500 text-slate-950 border-transparent shadow-sm shadow-cyan-500/50'
                        : 'bg-slate-800/60 text-slate-200 border-slate-700 hover:bg-cyan-600 hover:text-white hover:border-cyan-500',
                    ].join(' ')}
                  >
                    #{t}
                  </button>
                )
              })}
              {!!selected.length && (
                <button
                  type="button"
                  onClick={() => setSelected([])}
                  className="ml-2 inline-flex items-center rounded-full border border-slate-700 bg-slate-900/80 px-3 py-1 text-xs font-medium text-slate-400 hover:border-rose-500 hover:text-rose-300"
                >
                  <XCircle className="mr-1 h-4 w-4" />
                  クリア
                </button>
              )}
            </div>
          </div>

          {/* コラム一覧 */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredArticles.map((a) => (
              <li key={a.slug}>
                <Link
                  href={`/articles/${a.slug}`}
                  className="group block h-full rounded-2xl bg-gradient-to-br from-cyan-500/25 via-slate-900 to-slate-900 p-[1px] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(34,211,238,0.25)]"
                >
                  <div className="flex h-full flex-col overflow-hidden rounded-[1rem] bg-slate-900/90 border border-slate-800/80">
                    {a.image && (
                      <div className="relative w-full h-44 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={a.image}
                          alt={a.title}
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-105 group-hover:opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/0 to-transparent" />
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="inline-flex items-center rounded-full bg-cyan-500/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-slate-950">
                          コラム
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">{a.date}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-semibold leading-snug text-slate-50 line-clamp-2">
                        {a.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-3">
                        {a.excerpt}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {a.tags.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] text-slate-300"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

          {!filteredArticles.length && (
            <div className="mt-16 border-t border-slate-800 pt-10">
              <p className="text-center text-base sm:text-lg text-slate-700">
                条件に合うコラム記事が見つかりませんでした。
                キーワードやタグを少し広めにして再検索してみてください。
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
