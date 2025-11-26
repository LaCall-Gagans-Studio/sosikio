'use client'

import React from 'react'

type FormState = {
  name: string
  email: string
  company: string
  message: string
  agree: boolean
}

export function ContactForm() {
  const [state, setState] = React.useState<FormState>({
    name: '',
    email: '',
    company: '',
    message: '',
    agree: false,
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState<null | 'ok' | 'ng'>(null)

  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
      setState((s) => ({ ...s, [key]: value }))
    }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDone(null)

    if (!state.name || !state.email || !state.message || !state.agree) {
      setDone('ng')
      return
    }

    setSubmitting(true)

    try {
      // ★ ここでAPIルート (/api/contact) にデータを送信します
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(state),
      })

      if (res.ok) {
        setDone('ok')
        setState({ name: '', email: '', company: '', message: '', agree: false })
      } else {
        setDone('ng')
        console.error('送信エラー')
      }
    } catch (err) {
      console.error(err)
      setDone('ng')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-semibold">お名前</span>
          <input
            type="text"
            value={state.name}
            onChange={onChange('name')}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            placeholder="山田 太郎"
            required
          />
        </label>
        <label className="block">
          <span className="block text-sm font-semibold">メール</span>
          <input
            type="email"
            value={state.email}
            onChange={onChange('email')}
            className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
            placeholder="you@example.com"
            required
          />
        </label>
      </div>

      <label className="block">
        <span className="block text-sm font-semibold">会社・組織名（任意）</span>
        <input
          type="text"
          value={state.company}
          onChange={onChange('company')}
          className="mt-1 w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-black"
          placeholder="株式会社○○"
        />
      </label>

      <label className="block">
        <span className="block text-sm font-semibold">ご相談内容</span>
        <textarea
          value={state.message}
          onChange={onChange('message')}
          className="mt-1 w-full rounded-md border px-3 py-2 min-h-[120px] outline-none focus:ring-2 focus:ring-black"
          placeholder="気になっている点や現状の課題などをご記入ください。"
          required
        />
      </label>

      <label className="flex items-start gap-2 text-sm">
        <input
          type="checkbox"
          checked={state.agree}
          onChange={onChange('agree')}
          className="mt-1"
          required
        />
        <span>
          送信にあたり
          <a
            href="https://www.hokuryodenko.co.jp/privacy/"
            className="underline underline-offset-2 hover:opacity-80"
            target="_blank"
            rel="noreferrer"
          >
            プライバシーポリシー
          </a>
          に同意します。
        </span>
      </label>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-md bg-black px-5 py-2.5 text-white font-semibold hover:bg-black/85 disabled:opacity-60"
        >
          {submitting ? '送信中…' : '送信する'}
        </button>
        {done === 'ok' && (
          <p className="text-sm text-green-600">送信しました。ありがとうございます！</p>
        )}
        {done === 'ng' && <p className="text-sm text-red-600">未入力の必須項目があります。</p>}
      </div>
    </form>
  )
}
