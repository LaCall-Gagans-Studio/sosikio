'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { trackEvent } from '@/lib/analytics'

const GA_MEASUREMENT_ID = 'G-L0S28DRFQM'
const SCROLL_MILESTONES = [25, 50, 75, 100] as const

/** ルート変化とユーザー行動のイベントを GA に送る */
export function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname) return
    const query = searchParams?.toString()
    const pagePath = query ? `${pathname}?${query}` : pathname

    let retryTimer: number | null = null
    let retries = 0
    const emitPageView = () => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('config', GA_MEASUREMENT_ID, { page_path: pagePath })
        return
      }
      if (retries >= 20) return
      retries += 1
      retryTimer = window.setTimeout(emitPageView, 250)
    }
    emitPageView()

    trackEvent('lp_view', {
      page_path: pagePath,
      page_type: pathname.startsWith('/hr') ? 'hr' : pathname.startsWith('/probe') ? 'probe' : 'frontend',
    })

    return () => {
      if (retryTimer) window.clearTimeout(retryTimer)
    }
  }, [pathname, searchParams])

  useEffect(() => {
    if (!pathname) return
    const seen = new Set<number>()

    const onScroll = () => {
      const root = document.documentElement
      const scrollable = root.scrollHeight - root.clientHeight
      if (scrollable <= 0) return
      const depth = Math.round((window.scrollY / scrollable) * 100)
      for (const threshold of SCROLL_MILESTONES) {
        if (depth >= threshold && !seen.has(threshold)) {
          seen.add(threshold)
          trackEvent('scroll_depth', {
            depth_percent: threshold,
            page_path: pathname,
          })
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    if (!pathname) return

    const targetNodes = Array.from(
      document.querySelectorAll<HTMLElement>('section[id], section[aria-labelledby], [data-track-section]'),
    )
    if (!targetNodes.length) return

    const sent = new Set<string>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          const el = entry.target as HTMLElement
          const sectionId = el.dataset.trackSection || el.id || el.getAttribute('aria-labelledby') || ''
          if (!sectionId || sent.has(sectionId)) continue
          sent.add(sectionId)
          trackEvent('section_view', {
            section_id: sectionId,
            page_path: pathname,
          })
        }
      },
      { threshold: 0.25, rootMargin: '0px 0px -10% 0px' },
    )

    targetNodes.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  useEffect(() => {
    if (!pathname) return
    const startedForms = new Set<string>()

    const getFormId = (form: HTMLFormElement) => form.dataset.trackForm || form.id || 'unknown_form'

    const onInput = (event: Event) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      const form = target.closest('form[data-track-form]') as HTMLFormElement | null
      if (!form) return
      const formId = getFormId(form)
      if (startedForms.has(formId)) return
      startedForms.add(formId)
      trackEvent('form_start', { form_id: formId, page_path: pathname })
    }

    const onSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement | null
      if (!form || !form.matches('form[data-track-form]')) return
      trackEvent('form_submit', { form_id: getFormId(form), page_path: pathname })
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return
      const el = target.closest<HTMLElement>('[data-track-cta]')
      if (!el) return
      const ctaName = el.dataset.trackCta || 'unknown_cta'
      const href =
        (el as HTMLAnchorElement).href ||
        (el as HTMLButtonElement).getAttribute('href') ||
        (el as HTMLButtonElement).getAttribute('data-target') ||
        ''
      trackEvent('cta_click', {
        cta_name: ctaName,
        page_path: pathname,
        target_path: href,
      })
    }

    document.addEventListener('input', onInput, true)
    document.addEventListener('submit', onSubmit, true)
    document.addEventListener('click', onClick, true)
    return () => {
      document.removeEventListener('input', onInput, true)
      document.removeEventListener('submit', onSubmit, true)
      document.removeEventListener('click', onClick, true)
    }
  }, [pathname])

  return null
}

