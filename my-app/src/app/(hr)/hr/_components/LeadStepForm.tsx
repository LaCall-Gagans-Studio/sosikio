'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ArrowLeft, AlertCircle } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

type Props = {
  onComplete: () => void
  recordDuration?: number
}

type Step = 1 | 2 | 3
type Status = 'idle' | 'sending' | 'error'

const STEP_CONFIG = [
  {
    step: 1 as Step,
    label: 'メールアドレス',
    name: 'email',
    type: 'email',
    placeholder: 'taro@example.co.jp',
    autoComplete: 'email',
  },
  {
    step: 2 as Step,
    label: '会社名',
    name: 'company',
    type: 'text',
    placeholder: '株式会社○○',
    autoComplete: 'organization',
  },
  {
    step: 3 as Step,
    label: 'お名前',
    name: 'name',
    type: 'text',
    placeholder: '山田 太郎',
    autoComplete: 'name',
  },
] as const

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function LeadStepForm({ onComplete, recordDuration }: Props) {
  const [step, setStep] = useState<Step>(1)
  const [values, setValues] = useState({ email: '', company: '', name: '' })
  const [honeypot, setHoneypot] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    trackEvent('lead_step_view', { step, flow: 'demo_gate' })
  }, [step])

  useEffect(() => {
    inputRef.current?.focus()
  }, [step])

  const currentConfig = STEP_CONFIG[step - 1]
  const progress = (step / 3) * 100

  function validate(): boolean {
    const val = values[currentConfig.name].trim()
    if (!val) {
      setError(`${currentConfig.label}を入力してください。`)
      trackEvent('form_error', {
        form_id: 'hr_demo_gate',
        error_type: 'required_missing',
      })
      return false
    }
    if (step === 1 && !EMAIL_RE.test(val)) {
      setError('メールアドレスの形式が正しくありません。')
      trackEvent('form_error', {
        form_id: 'hr_demo_gate',
        error_type: 'email_invalid',
      })
      return false
    }
    return true
  }

  async function handleNext() {
    setError('')
    if (!validate()) return

    trackEvent('lead_step_complete', { step, flow: 'demo_gate' })

    if (step < 3) {
      setStep((s) => (s + 1) as Step)
      return
    }

    if (honeypot) return

    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'hr-demo',
          source: 'hr-demo-gate',
          email: values.email.trim(),
          company: values.company.trim(),
          name: values.name.trim(),
          record_duration_sec: recordDuration,
          page_path: '/hr/demo',
        }),
      })
      if (!res.ok) throw new Error('send failed')

      trackEvent('lead_complete', { flow: 'demo_gate' })
      onComplete()
    } catch {
      trackEvent('form_error', {
        form_id: 'hr_demo_gate',
        error_type: 'network_error',
      })
      setError('送信に失敗しました。時間をおいて再度お試しください。')
      setStatus('error')
    }
  }

  function handleBack() {
    setError('')
    setStep((s) => (s - 1) as Step)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleNext()
    }
  }

  return (
    <div className="mx-auto w-full max-w-md">
      {/* progress bar */}
      <div
        className="mb-8 h-1 w-full overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`ステップ ${step} / 3`}
      >
        <motion.div
          className="h-full rounded-full bg-[#fff200]"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <p className="hr-latin mb-1 text-xs tracking-wider text-[#fff200]/70">
            STEP {step} / 3
          </p>
          <label
            htmlFor={`demo-${currentConfig.name}`}
            className="hr-impact mb-4 block text-lg font-black text-white"
          >
            {currentConfig.label}
            <span className="ml-1 text-[#ed008c]">*</span>
          </label>

          <input
            ref={inputRef}
            id={`demo-${currentConfig.name}`}
            type={currentConfig.type}
            autoComplete={currentConfig.autoComplete}
            placeholder={currentConfig.placeholder}
            value={values[currentConfig.name]}
            onChange={(e) => {
              setError('')
              setValues((v) => ({ ...v, [currentConfig.name]: e.target.value }))
            }}
            onKeyDown={handleKeyDown}
            className="w-full rounded-lg border border-white/20 bg-[#141210] px-4 py-3.5 text-[15px] text-white placeholder:text-white/35 focus:border-[#fff200]/50 focus:outline-none focus:ring-1 focus:ring-[#fff200]/30"
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="mt-3 flex items-start gap-2 rounded-md bg-[#ed008c]/15 px-3 py-2.5 text-sm font-bold text-[#ff7ec4]"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
              {error}
            </motion.p>
          )}

          <div className="mt-6 flex items-center gap-4">
            {step > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center gap-1.5 text-sm text-white/60 transition-colors hover:text-white"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                戻る
              </button>
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={status === 'sending'}
              className="hr-impact ml-auto inline-flex items-center justify-center gap-2 rounded-lg bg-[#fff200] px-6 py-3 text-base font-black text-[#141210] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'sending' && (
                <Loader2 size={18} className="animate-spin" aria-hidden="true" />
              )}
              {status === 'sending'
                ? '送信中…'
                : step === 3
                  ? '結果を受け取る'
                  : '次へ'}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* honeypot */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="demo-website">website</label>
        <input
          id="demo-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
    </div>
  )
}
