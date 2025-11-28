// app/(frontend)/articles/page.tsx
import { Suspense } from 'react'
import { ArticlesClient } from './page.client'
import { fetchArticlesForClient, fetchTestimonialsForClient } from '@/lib/articles'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Library',
  description:
    'SOSIKIO Libraryでは、組織開発に関するコラムや、実際にSOSIKIOを活用している企業様の声をお届けします。',
}

export default async function ArticlesPage() {
  const [{ articles, tags }, testimonials] = await Promise.all([
    fetchArticlesForClient(),
    fetchTestimonialsForClient(),
  ])

  return (
    <Suspense fallback={<div className="p-8">Loading…</div>}>
      <ArticlesClient
        initialArticles={articles}
        initialTags={tags}
        initialTestimonials={testimonials}
      />
    </Suspense>
  )
}
