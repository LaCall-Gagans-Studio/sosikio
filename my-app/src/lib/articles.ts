// app/(frontend)/lib/articles.ts
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Article as ArticleDoc, Testimonial as TestimonialDoc } from '../payload-types'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export type ArticleType = 'column' | 'voice'

interface BaseContent {
  slug: string
  title: string
  date: string
  image: string
  tags: string[]
  excerpt: string
  content: SerializedEditorState
}

export interface ArticleForClient extends BaseContent {
  type: 'column'
}

export interface TestimonialForClient extends BaseContent {
  type: 'voice'
  voice: {
    name: string
    title: string
    company: string
    avatarUrl: string
    logoUrl: string
    products: ('LOOK' | 'PROBE' | 'BOON')[]
    quote: string
  }
}

// ───────── Articles（コラム）取得 ─────────
export async function fetchArticlesForClient() {
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'articles',
    where: {
      _status: { equals: 'published' },
    },
    sort: '-date',
    depth: 1,
    limit: 100,
  })

  const articles: ArticleForClient[] = (res.docs as ArticleDoc[]).map((doc) => {
    const tags = (doc.tags || []).map((t: any) => t.value).filter(Boolean)

    const imageUrl =
      typeof doc.image === 'string'
        ? doc.image
        : doc.image && typeof doc.image === 'object'
          ? ((doc.image as any).url ?? '')
          : ''

    return {
      slug: doc.slug,
      title: doc.title,
      type: 'column',
      date: doc.date || '',
      image: imageUrl,
      tags,
      excerpt: doc.excerpt || '',
      // Articles コレクションの content は richText（Lexical）想定
      content: doc.content as SerializedEditorState,
    }
  })

  const tags = Array.from(new Set(articles.flatMap((a) => a.tags))).sort()

  return {
    articles,
    tags,
  }
}

// ───────── Testimonials（お客様の声）取得 ─────────
export async function fetchTestimonialsForClient() {
  const payload = await getPayload({ config: configPromise })

  const res = await payload.find({
    collection: 'testimonials',
    sort: '-createdAt',
    depth: 1,
    limit: 100,
  })

  const testimonials: TestimonialForClient[] = (res.docs as TestimonialDoc[]).map((t) => {
    const avatarUrl = t.avatar && typeof t.avatar === 'object' ? ((t.avatar as any).url ?? '') : ''
    const logoUrl = t.logo && typeof t.logo === 'object' ? ((t.logo as any).url ?? '') : ''

    return {
      slug: `voice-${t.id}`,
      title: `${t.company} ご担当者様の声`,
      type: 'voice',
      date: (t as any).createdAt ?? '',
      image: avatarUrl || logoUrl,
      tags: ['お客様の声', ...(t.products || [])],
      excerpt: t.quote,
      // Testimonials に追加した richText の content フィールドを使用
      content: (t as any).content as SerializedEditorState,
      voice: {
        name: t.name,
        title: t.title,
        company: t.company,
        avatarUrl,
        logoUrl,
        products: t.products as any,
        quote: t.quote,
      },
    }
  })

  return testimonials
}
