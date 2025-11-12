// app/(frontend)/articles/page.tsx
import { Suspense } from 'react'
import { ArticlesClient } from './client'

export default function ArticlesPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading…</div>}>
      <ArticlesClient />
    </Suspense>
  )
}
