// src/components/Forms/TrialForm.tsx
'use client'

import React from 'react'

type TrialProduct = {
  id: string // 例: 'LOOK', 'PROBE', 'BOON'
}

type TrialState = {
  company: string
  name: string
  email: string
  phone?: string
  products: Record<string, boolean> // 動的にプロダクトを持つ
  size: '1-10' | '11-50' | '51-200' | '201+'
  preferred?: string
  note?: string
}

type Props = {
  products: TrialProduct[]
}

export function TrialForm({ products }: Props) {
  // 最初の1件だけ true にしておく
  const [state, setState] = React.useState<TrialState>(() => ({
    company: '',
    name: '',
    email: '',
    phone: '',
    products: products.reduce<Record<string, boolean>>((acc, p, idx) => {
      acc[p.id] = idx === 0 // 先頭だけデフォルトON
      return acc
    }, {}),
    size: '11-50',
    preferred: '',
    note: '',
  }))

  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState<null | 'ok' | 'ng'>(null)

  const onText =
    (key: keyof TrialState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setState((s) => ({ ...s, [key]: e.target.value }))

  const onCheck = (id: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setState((s) => ({
      ...s,
      products: { ...s.products, [id]: e.target.checked },
    }))

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDone(null)

    const anyProduct = Object.values(state.products).some(Boolean)
    if (!state.company || !state.name || !state.email || !anyProduct) {
      setDone('ng')
      return
    }

    setSubmitting(true)
    // ★ここで実バックエンドにPOSTする（fetch など）に差し替え
    await new Promise((r) => setTimeout(r, 900))
    setSubmitting(false)
    setDone('ok')
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-semibold">会社名</span>
          <input
            type="text"
            value={state.company}
            onChange={onText('company')}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            placeholder="株式会社○○"
            required
          />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold">ご担当者名</span>
          <input
            type="text"
            value={state.name}
            onChange={onText('name')}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            placeholder="山田 太郎"
            required
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-semibold">メール</span>
          <input
            type="email"
            value={state.email}
            onChange={onText('email')}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold">電話（任意）</span>
          <input
            type="tel"
            value={state.phone}
            onChange={onText('phone')}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            placeholder="03-1234-5678"
          />
        </label>
      </div>

      <fieldset className="border rounded-md p-3">
        <legend className="text-sm font-semibold px-1">お試ししたいサービス</legend>
        <div className="mt-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm">
          {products.map((p) => (
            <label key={p.id} className="inline-flex items-center gap-2">
              <input type="checkbox" checked={!!state.products[p.id]} onChange={onCheck(p.id)} />
              <span className="font-semibold">{p.id}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-semibold">組織規模</span>
          <select
            value={state.size}
            onChange={onText('size')}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black bg-white"
          >
            <option value="1-10">1–10名</option>
            <option value="11-50">11–50名</option>
            <option value="51-200">51–200名</option>
            <option value="201+">201名以上</option>
          </select>
        </label>
        <label className="block">
          <span className="block text-sm font-semibold">希望開始時期（任意）</span>
          <input
            type="month"
            value={state.preferred}
            onChange={onText('preferred')}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          />
        </label>
      </div>

      <label className="block">
        <span className="block text-sm font-semibold">補足（任意）</span>
        <textarea
          value={state.note}
          onChange={onText('note')}
          className="mt-1 w-full rounded-md border px-3 py-2 min-h-[100px] outline-none focus:ring-2 focus:ring-black"
          placeholder="現状の課題やご希望など"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-white font-semibold hover:bg-black/85 disabled:opacity-60"
        >
          {submitting ? '送信中…' : '資料請求を申し込む'}
        </button>
        {done === 'ok' && (
          <p className="text-sm text-green-600">送信しました。折り返しご連絡します！</p>
        )}
        {done === 'ng' && (
          <p className="text-sm text-red-600">必須項目とサービス選択を確認してください。</p>
        )}
      </div>
    </form>
  )
}
