// app/(frontend)/articles/client.tsx  ← Client Component
'use client'

import * as React from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { allArticles, allArticleTags, type Article, type ArticleType } from '../data_articles'

type TypeFilter = 'all' | ArticleType

export function ArticlesClient() {
  const router = useRouter()
  const sp = useSearchParams()

  // --- 状態
  const [keyword, setKeyword] = React.useState<string>('')
  const [selected, setSelected] = React.useState<string[]>([])
  const [typeFilter, setTypeFilter] = React.useState<TypeFilter>('all')

  // 初期化（1回だけ）
  const didInitRef = React.useRef(false)
  React.useEffect(() => {
    if (didInitRef.current) return
    didInitRef.current = true

    const q = sp.get('q') ?? ''
    const tags = (sp.get('tags') ?? '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)

    const t = sp.get('type') as TypeFilter | null
    setKeyword(q)
    setSelected(tags)
    setTypeFilter(t === 'column' || t === 'voice' ? t : 'all')
  }, [sp])

  // URL 同期（状態が変わった時だけ）
  React.useEffect(() => {
    const params = new URLSearchParams()
    if (keyword) params.set('q', keyword)
    if (selected.length) params.set('tags', selected.join(','))
    if (typeFilter !== 'all') params.set('type', typeFilter)
    const query = params.toString()
    router.replace(query ? `/articles?${query}` : '/articles', { scroll: false })
  }, [keyword, selected, typeFilter, router])

  // フィルタリング
  const filtered: Article[] = React.useMemo(() => {
    const kw = keyword.trim().toLowerCase()
    return allArticles
      .filter((a) => {
        // タイプ
        if (typeFilter !== 'all' && a.type !== typeFilter) return false
        // タグ（AND）
        if (selected.length && !selected.every((t) => a.tags.includes(t))) return false
        // キーワード
        if (!kw) return true
        const hay = `${a.title} ${a.excerpt} ${a.content} ${a.tags.join(' ')} ${
          a.voice ? `${a.voice.name} ${a.voice.company} ${a.voice.title}` : ''
        }`.toLowerCase()
        return hay.includes(kw)
      })
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [keyword, selected, typeFilter])

  const toggleTag = (t: string) =>
    setSelected((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]))

  return (
    <main className="bg-white text-black px-12 pt-24 py-10">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">SOSIKIO Library</h1>

      {/* 検索・タイプ・タグ */}
      <div className="flex flex-col gap-4 md:gap-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="キーワードで検索"
            className="w-full sm:max-w-md px-4 py-2 border rounded-lg"
          />
          <div className="flex items-center gap-2">
            {(['all', 'column', 'voice'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-2 rounded-lg text-sm font-semibold border ${
                  typeFilter === t ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
                }`}
              >
                {t === 'all' ? 'すべて' : t === 'column' ? 'コラム' : 'お客様の声'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {allArticleTags.map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className={`px-3 py-1 rounded-full text-sm border ${
                selected.includes(t) ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'
              }`}
            >
              #{t}
            </button>
          ))}
          {!!selected.length && (
            <button
              onClick={() => setSelected([])}
              className="px-3 py-1 rounded-full text-sm border bg-white hover:bg-gray-100"
            >
              タグをクリア
            </button>
          )}
        </div>
      </div>

      {/* リスト */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((a) => (
          <li key={a.slug} className="border rounded-lg overflow-hidden bg-white">
            <Link href={`/articles/${a.slug}`} className="block">
              <div className="w-full h-48 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-bold ${
                      a.type === 'voice' ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-700'
                    }`}
                  >
                    {a.type === 'voice' ? 'お客様の声' : 'コラム'}
                  </span>
                  <span className="text-xs text-gray-500">{a.date}</span>
                </div>
                <h3 className="font-bold leading-snug">{a.title}</h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">{a.excerpt}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {a.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {!filtered.length && (
        <p className="mt-10 text-center text-gray-500">条件に合う記事が見つかりませんでした。</p>
      )}
    </main>
  )
}
