'use client'

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    dataLayer?: unknown[]
  }
}

// Google 広告のコンバージョン イベント スニペット（GA4 イベントに連動して発火）
const GOOGLE_ADS_CONVERSION_EVENTS: Record<string, string> = {
  form_success: 'conversion_event_submit_lead_form',
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return
  emitGtagEvent(eventName, params)

  const conversionEvent = GOOGLE_ADS_CONVERSION_EVENTS[eventName]
  if (conversionEvent) {
    emitGtagEvent(conversionEvent, {})
  }
}

function emitGtagEvent(eventName: string, params: AnalyticsParams) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
    return
  }

  // gtag 初期化前でも dataLayer に積んでおく
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(['event', eventName, params])
}

