'use client'

import { useEffect } from 'react'

const FORM_ID = 'lead-form'

function shouldScrollToForm(): boolean {
  // /hr# （空のハッシュ）のときフォームへ
  return window.location.hash === '#'
}

function scrollToLeadForm() {
  document.getElementById(FORM_ID)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

/** URL 末尾が # のとき、お問い合わせフォームへスクロール */
export function HashScrollToForm() {
  useEffect(() => {
    const run = () => {
      if (!shouldScrollToForm()) return
      // レイアウト・フォント読み込み後にスクロール（iOS 対策）
      requestAnimationFrame(() => {
        requestAnimationFrame(scrollToLeadForm)
      })
    }

    run()
    window.addEventListener('hashchange', run)
    return () => window.removeEventListener('hashchange', run)
  }, [])

  return null
}
