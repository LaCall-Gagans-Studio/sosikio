// app/(frontend)/articles/page.tsx
import { Suspense } from 'react'
import { ArticlesClient } from './page.client'
import { fetchArticlesForClient, fetchTestimonialsForClient } from '@/lib/articles'

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
