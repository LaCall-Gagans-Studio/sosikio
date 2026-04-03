'use client'

import React from 'react'

type FormState = {
  name: string
  email: string
  company: string
  companySize: string
  role: string
  phone: string
  message: string
  agree: boolean
}

export function ProbeContactForm() {
  const [state, setState] = React.useState<FormState>({
    name: '',
    email: '',
    company: '',
    companySize: '',
    role: '',
    phone: '',
    message: '',
    agree: false,
  })
  const [submitting, setSubmitting] = React.useState(false)
  const [done, setDone] = React.useState<null | 'ok' | 'ng'>(null)

  const onChange =
    (key: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const value =
        e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value
      setState((s) => ({ ...s, [key]: value }))
    }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setDone(null)

    if (!state.name || !state.email || !state.companySize || !state.message || !state.agree) {
      setDone('ng')
      return
    }

    setSubmitting(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...state, type: 'probe-cloud' }),
      })

      if (res.ok) {
        setDone('ok')
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

  const inputClass = "mt-2 w-full rounded-none border border-[#babec0] bg-[#ffffff] px-4 py-3 outline-none focus:border-[#d81e5c] focus:ring-1 focus:ring-[#d81e5c] transition-colors"
  
  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <label className="block">
          <span className="block text-sm font-bold text-gray-800 tracking-wide">お名前 <span className="text-[#d81e5c] font-normal">*</span></span>
          <input
            type="text"
            value={state.name}
            onChange={onChange('name')}
            className={inputClass}
            placeholder="山田 太郎"
            required
            disabled={done === 'ok'}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-bold text-gray-800 tracking-wide">メールアドレス <span className="text-[#d81e5c] font-normal">*</span></span>
          <input
            type="email"
            value={state.email}
            onChange={onChange('email')}
            className={inputClass}
            placeholder="you@example.com"
            required
            disabled={done === 'ok'}
          />
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <label className="block">
          <span className="block text-sm font-bold text-gray-800 tracking-wide">会社・組織名（任意）</span>
          <input
            type="text"
            value={state.company}
            onChange={onChange('company')}
            className={inputClass}
            placeholder="株式会社○○"
            disabled={done === 'ok'}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-bold text-gray-800 tracking-wide">会社規模 <span className="text-[#d81e5c] font-normal">*</span></span>
          <select
            value={state.companySize}
            onChange={onChange('companySize')}
            className={inputClass}
            required
            disabled={done === 'ok'}
          >
            <option value="">選択してください</option>
            <option value="1〜50名">1〜50名</option>
            <option value="51〜100名">51〜100名</option>
            <option value="101〜500名">101〜500名</option>
            <option value="501〜1000名">501〜1000名</option>
            <option value="1001名以上">1001名以上</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <label className="block">
          <span className="block text-sm font-bold text-gray-800 tracking-wide">役職（任意）</span>
          <input
            type="text"
            value={state.role}
            onChange={onChange('role')}
            className={inputClass}
            placeholder="代表取締役、人事部長 など"
            disabled={done === 'ok'}
          />
        </label>
        <label className="block">
          <span className="block text-sm font-bold text-gray-800 tracking-wide">電話番号（任意）</span>
          <input
            type="tel"
            value={state.phone}
            onChange={onChange('phone')}
            className={inputClass}
            placeholder="03-XXXX-XXXX"
            disabled={done === 'ok'}
          />
        </label>
      </div>

      <label className="block">
        <span className="block text-sm font-bold text-gray-800 tracking-wide">ご相談内容 <span className="text-[#d81e5c] font-normal">*</span></span>
        <textarea
          value={state.message}
          onChange={onChange('message')}
          className={`${inputClass} min-h-[160px] resize-y`}
          placeholder="ご利用コードのご購入希望数や、その他気になっている点をご記入ください。"
          required
          disabled={done === 'ok'}
        />
      </label>

      <div className="pt-4">
        <label className="flex items-start gap-3 text-sm cursor-pointer border border-[#babec0] p-4 bg-[#fafafa]">
          <input
            type="checkbox"
            checked={state.agree}
            onChange={onChange('agree')}
            className="mt-1 h-4 w-4 rounded-none border-[#babec0] text-[#d81e5c] focus:ring-[#d81e5c]"
            required
            disabled={done === 'ok'}
          />
          <span className="text-gray-700 leading-relaxed font-bold">
            送信にあたり
            <a
              href="https://www.hokuryodenko.co.jp/privacy/"
              className="text-[#d81e5c] underline underline-offset-2 hover:opacity-80 px-1"
              target="_blank"
              rel="noreferrer"
            >
              プライバシーポリシー
            </a>
            に同意します。
          </span>
        </label>
      </div>

      <div className="pt-6 border-t border-[#babec0] flex flex-col items-center">
        {done !== 'ok' && (
          <button
            type="submit"
            disabled={submitting}
            className="w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center rounded-none bg-[#d81e5c] px-8 py-4 text-[#ffffff] font-bold tracking-widest hover:bg-[#b0184a] focus:ring-2 focus:ring-offset-2 focus:ring-[#d81e5c] disabled:opacity-60 transition-all text-lg"
          >
            {submitting ? '送信中…' : '送信する'}
          </button>
        )}

        {done === 'ok' && (
          <div className="w-full p-8 bg-white border-2 border-[#d81e5c] text-center text-sm leading-relaxed">
            <p className="font-bold mb-3 text-[#d81e5c] text-xl tracking-wider">お問い合わせを受け付けました</p>
            <p className="text-gray-700">
              内容を確認のうえ、担当者よりご連絡させていただきます。<br />
              今しばらくお待ちいただけますようお願い申し上げます。
            </p>
          </div>
        )}

        {done === 'ng' && <p className="text-[#d81e5c] mt-4 font-bold tracking-wide">未入力の必須項目があるか、通信エラーが発生しました。</p>}
      </div>
    </form>
  )
}
