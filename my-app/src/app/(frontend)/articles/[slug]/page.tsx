// app/(frontend)/articles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { allArticles } from '../../data_articles'
import Link from 'next/link'

type Params = { slug: string }

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const article = allArticles.find((a) => a.slug === slug)
  if (!article) return notFound()

  const isVoice = article.type === 'voice'
  return (
    <main className="bg-white text-black pt-24 px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`px-2 py-0.5 rounded text-xs font-bold ${
              isVoice ? 'bg-rose-100 text-rose-700' : 'bg-sky-100 text-sky-700'
            }`}
          >
            {isVoice ? 'お客様の声' : 'コラム'}
          </span>
          <span className="text-xs text-gray-500">{article.date}</span>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold">{article.title}</h1>

        <div className="mt-4 w-full h-64 md:h-96 overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
        </div>

        {isVoice && article.voice && (
          <div className="mt-6 p-4 border rounded-lg bg-white flex items-start gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.voice.avatarUrl}
              alt={article.voice.name}
              className="w-16 h-16 rounded-lg object-cover border-4 border-black"
            />
            <div className="flex-1">
              <p className="font-bold">{article.voice.name}</p>
              <p className="text-sm text-gray-600">
                {article.voice.company} / {article.voice.title}
              </p>
              <p className="mt-2 text-gray-700">{article.voice.quote}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={article.voice.logoUrl} alt={article.voice.company} className="mt-3 h-8" />
            </div>
          </div>
        )}

        <article className="prose max-w-none mt-8">
          {/* 実装に合わせて Markdown 変換などに置換可 */}
          <p>{article.content}</p>
        </article>

        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((t) => (
            <span key={t} className="px-2 py-0.5 rounded bg-gray-100 text-gray-600 text-xs">
              #{t}
            </span>
          ))}
        </div>
        <p className="mt-6">
          <Link href="/articles" className="underline text-sm">
            一覧に戻る
          </Link>
        </p>
      </div>
    </main>
  )
}

export async function generateStaticParams(): Promise<Params[]> {
  return allArticles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const article = allArticles.find((a) => a.slug === slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt ?? article.title,
    openGraph: { images: [article.image] },
  }
}
