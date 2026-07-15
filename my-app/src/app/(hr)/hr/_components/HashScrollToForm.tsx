'use client'

import { useEffect } from 'react'

const FORM_ID = 'lead-form'

function scrollToTarget(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** URL のハッシュに合わせて該当セクションへスクロール（広告サイトリンク用） */
export function HashScrollToForm() {
  useEffect(() => {
    const run = () => {
      const raw = window.location.hash
      // /hr# （空のハッシュ）のときは従来どおりフォームへ
      if (raw === '#') {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => scrollToTarget(FORM_ID))
        })
        return
      }

      const id = raw.slice(1)
      if (!id) return

      requestAnimationFrame(() => {
        requestAnimationFrame(() => scrollToTarget(id))
      })
    }

    run()
    window.addEventListener('hashchange', run)
    return () => window.removeEventListener('hashchange', run)
  }, [])

  return null
}
