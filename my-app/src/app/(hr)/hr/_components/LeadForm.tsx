'use client'

import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

const INTERESTS = [
  'probe ダッシュボード',
  'Thinking OS（標準人格）',
  '自社人格の開発',
  '費用・プランを知りたい',
  'デモを見たい',
] as const

type Status = 'idle' | 'sending' | 'done' | 'error'

const FIELD =
  'w-full border border-hr-rule-strong bg-hr-raised px-4 py-3 text-[15px] text-hr-ink placeholder:text-hr-faint'

export function LeadForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    // honeypot（bot 対策）
    if (fd.get('website')) return

    const company = String(fd.get('company') ?? '').trim()
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const note = String(fd.get('note') ?? '').trim()
    const interests = INTERESTS.filter((i) => fd.get(`interest-${i}`))

    if (!company || !name || !email) {
      trackEvent('form_error', { form_id: 'hr_lead_form', error_type: 'required_missing' })
      setErrorMsg('会社名・お名前・メールアドレスは必須です。')
      setStatus('error')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      trackEvent('form_error', { form_id: 'hr_lead_form', error_type: 'email_invalid' })
      setErrorMsg('メールアドレスの形式が正しくありません。')
      setStatus('error')
      return
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'hr',
          source: 'hr-lp-thinking-os',
          company,
          name,
          email,
          phone,
          interests,
          note,
        }),
      })
      if (!res.ok) throw new Error('send failed')
      trackEvent('form_success', { form_id: 'hr_lead_form' })
      setStatus('done')
    } catch {
      trackEvent('form_error', { form_id: 'hr_lead_form', error_type: 'network_error' })
      setErrorMsg('送信に失敗しました。時間をおいて再度お試しください。')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div id="lead-form" role="status" className="border border-hr-rule-strong bg-hr-raised px-8 py-16 text-center">
        <p className="hr-label" lang="en">
          RECEIVED
        </p>
        <p className="hr-heading mt-5 text-hr-ink">送信が完了しました。</p>
        <p className="mt-4 text-[14px] leading-8 text-hr-muted">
          お問い合わせありがとうございます。
          <br />
          担当者より 2 営業日以内にご連絡いたします。
        </p>
      </div>
    )
  }

  return (
    <form
      id="lead-form"
      data-track-form="hr_lead_form"
      onSubmit={handleSubmit}
      noValidate
      className="scroll-mt-24"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="hr-company" className="mb-2 block text-[13px] font-medium text-hr-ink">
            会社名 <span className="text-hr-accent">*</span>
          </label>
          <input
            id="hr-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="株式会社○○"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="hr-name" className="mb-2 block text-[13px] font-medium text-hr-ink">
            お名前 <span className="text-hr-accent">*</span>
          </label>
          <input
            id="hr-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="山田 太郎"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="hr-email" className="mb-2 block text-[13px] font-medium text-hr-ink">
            メールアドレス <span className="text-hr-accent">*</span>
          </label>
          <input
            id="hr-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="taro@example.co.jp"
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="hr-phone" className="mb-2 block text-[13px] font-medium text-hr-ink">
            電話番号
          </label>
          <input
            id="hr-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="090-1234-5678"
            className={FIELD}
          />
        </div>
      </div>

      <fieldset className="mt-8 border-t border-hr-rule pt-6">
        <legend className="hr-label">ご 興 味 の あ る 内 容</legend>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {INTERESTS.map((i) => (
            <label
              key={i}
              className="inline-flex cursor-pointer items-center gap-3 text-[14px] text-hr-ink"
            >
              <input
                type="checkbox"
                name={`interest-${i}`}
                className="size-4 accent-[var(--color-hr-accent)]"
              />
              {i}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-8">
        <label htmlFor="hr-note" className="mb-2 block text-[13px] font-medium text-hr-ink">
          備考
        </label>
        <textarea
          id="hr-note"
          name="note"
          rows={4}
          placeholder="定例の頻度・参加人数・見たい観点など、ご自由にご記入ください"
          className={FIELD}
        />
      </div>

      {/* honeypot（画面には表示しない） */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="hr-website">website</label>
        <input id="hr-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p
          role="alert"
          className="mt-6 border-l-2 border-hr-accent bg-hr-raised px-4 py-3 text-[13px] text-hr-ink"
        >
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        data-track-cta="hr_lead_form_submit"
        data-clarity-event="hr-lead-submit"
        disabled={status === 'sending'}
        className="hr-btn hr-btn-primary mt-9 w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-12"
      >
        {status === 'sending' && <Loader2 size={16} className="animate-spin" aria-hidden />}
        {status === 'sending' ? '送信中…' : '資料を請求する'}
      </button>

      <p className="mt-6 text-[12px] leading-6 text-hr-faint">
        いただいた情報は、資料送付とご連絡のみに使用します。
      </p>
    </form>
  )
}
