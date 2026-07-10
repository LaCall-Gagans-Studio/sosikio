'use client'

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
    return
  }

  // gtag 初期化前でも dataLayer に積んでおく
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(['event', eventName, params])
}

