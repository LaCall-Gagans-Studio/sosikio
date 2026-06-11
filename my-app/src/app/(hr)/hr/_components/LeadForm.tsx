'use client'

import React, { useState } from 'react'
import { CheckCircle2, Loader2 } from 'lucide-react'
import { Reveal } from './Reveal'

const INTERESTS = ['SOSIKIO（コエの健康診断）', 'コエカラ研修'] as const

type Status = 'idle' | 'sending' | 'done' | 'error'

/** 資料請求フォーム */
export function LeadForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)

    // honeypot（bot 対策）
    if (fd.get('website')) return

    const company = String(fd.get('company') ?? '').trim()
    const name = String(fd.get('name') ?? '').trim()
    const email = String(fd.get('email') ?? '').trim()
    const phone = String(fd.get('phone') ?? '').trim()
    const note = String(fd.get('note') ?? '').trim()
    const interests = INTERESTS.filter((i) => fd.get(`interest-${i}`))

    if (!company || !name || !email) {
      setErrorMsg('会社名・お名前・メールアドレスは必須です。')
      setStatus('error')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
          source: 'hr-lp',
          company,
          name,
          email,
          phone,
          interests,
          note,
        }),
      })
      if (!res.ok) throw new Error('send failed')
      setStatus('done')
    } catch {
      setErrorMsg('送信に失敗しました。時間をおいて再度お試しください。')
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div
        id="lead-form"
        className="rounded-[14px] bg-[#1c1c1e] px-8 py-16 text-center ring-1 ring-[#fff200]/30"
        role="status"
      >
        <CheckCircle2 size={44} className="mx-auto text-[#fff200]" aria-hidden="true" />
        <p className="hr-impact mt-5 text-xl font-black text-white sm:text-2xl">
          送信が完了しました
        </p>
        <p className="mt-3 text-sm leading-relaxed text-white/75">
          お問い合わせありがとうございます。
          <br />
          担当者より 2 営業日以内にご連絡いたします。
        </p>
      </div>
    )
  }

  const inputCls =
    'w-full rounded-md border border-white/20 bg-[#141210] px-4 py-3 text-[15px] text-white placeholder:text-white/35'

  return (
    <form id="lead-form" onSubmit={handleSubmit} noValidate className="scroll-mt-24">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="hr-company" className="mb-1.5 block text-sm font-bold text-white">
            会社名 <span className="text-[#ed008c]">*</span>
          </label>
          <input
            id="hr-company"
            name="company"
            type="text"
            required
            autoComplete="organization"
            placeholder="株式会社○○"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="hr-name" className="mb-1.5 block text-sm font-bold text-white">
            お名前 <span className="text-[#ed008c]">*</span>
          </label>
          <input
            id="hr-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="山田 太郎"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="hr-email" className="mb-1.5 block text-sm font-bold text-white">
            メールアドレス <span className="text-[#ed008c]">*</span>
          </label>
          <input
            id="hr-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="taro@example.co.jp"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="hr-phone" className="mb-1.5 block text-sm font-bold text-white">
            電話番号
          </label>
          <input
            id="hr-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="090-1234-5678"
            className={inputCls}
          />
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="mb-2 text-sm font-bold text-white">ご興味のあるサービス</legend>
        <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-6">
          {INTERESTS.map((i) => (
            <label key={i} className="inline-flex cursor-pointer items-center gap-2.5 text-[15px] text-white/90">
              <input
                type="checkbox"
                name={`interest-${i}`}
                className="h-4.5 w-4.5 accent-[#fff200]"
              />
              {i}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-6">
        <label htmlFor="hr-note" className="mb-1.5 block text-sm font-bold text-white">
          備考
        </label>
        <textarea
          id="hr-note"
          name="note"
          rows={4}
          placeholder="デモ希望・導入時期・組織規模など、ご自由にご記入ください"
          className={inputCls}
        />
      </div>

      {/* honeypot（画面には表示しない） */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="hr-website">website</label>
        <input id="hr-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-5 rounded-md bg-[#ed008c]/15 px-4 py-3 text-sm font-bold text-[#ff7ec4]">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        data-clarity-event="hr-lead-submit"
        className="hr-impact mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#fff200] px-8 py-4 text-lg font-black text-[#141210] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' && (
          <Loader2 size={20} className="animate-spin" aria-hidden="true" />
        )}
        {status === 'sending' ? '送信中…' : '資料を請求する'}
      </button>
    </form>
  )
}
