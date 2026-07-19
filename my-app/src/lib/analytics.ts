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
    sendGoogleAdsConversion(conversionEvent)
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

/**
 * Google 広告のコンバージョン イベント スニペット（event_callback / event_timeout 付き）。
 * https://support.google.com/google-ads/answer/ の「送信ボタンなどの前」パターンに準拠。
 * ページ遷移を伴わないフォームでも、送信完了（またはタイムアウト）を待って onSent を呼ぶ。
 */
function sendGoogleAdsConversion(eventName: string, onSent?: () => void) {
  if (typeof window.gtag !== 'function') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push(['event', eventName, {}])
    onSent?.()
    return
  }

  let called = false
  const callback = () => {
    if (called) return
    called = true
    onSent?.()
  }

  window.gtag('event', eventName, {
    event_callback: callback,
    event_timeout: 2000,
  })
}

