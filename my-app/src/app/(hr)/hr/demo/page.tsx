'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  Mic,
  Square,
  Lock,
  Mail,
  ShieldCheck,
  BarChart3,
  Activity,
  Brain,
  TrendingDown,
  Clock,
  Users,
} from 'lucide-react'
import { trackEvent } from '@/lib/analytics'
import { DemoWaveform } from '../_components/DemoWaveform'
import { LeadStepForm } from '../_components/LeadStepForm'

type Stage = 'intro' | 'recording' | 'analyzing' | 'result' | 'gate' | 'form' | 'complete'

const ANALYSIS_LABELS = [
  '音声データを取得中…',
  '感情パターンを照合中…',
  'コエの健康値を算出中（最終検証）…',
] as const

const METRIC_SPECS = [
  { key: 'vitality', label: '活力度', base: 72, spread: 9, color: '#fff200' },
  { key: 'stress', label: 'ストレス傾向', base: 38, spread: 8, color: '#ed008c' },
  { key: 'stability', label: '発話安定度', base: 81, spread: 7, color: '#ffffff' },
] as const

const MIN_RECORD_SEC = 3
const DEVICE_ID_STORAGE_KEY = 'hr-demo-device-id'

type Metric = { label: string; value: number; color: string }

export default function DemoPage() {
  const [stage, setStage] = useState<Stage>('intro')
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [elapsed, setElapsed] = useState(0)
  const [progress, setProgress] = useState(0)
  const [analysisLabel, setAnalysisLabel] = useState<string>(ANALYSIS_LABELS[0])
  const [recordDuration, setRecordDuration] = useState(0)
  const [micError, setMicError] = useState('')
  const [metrics, setMetrics] = useState<Metric[]>([])

  const timerRef = useRef<ReturnType<typeof setInterval>>(null)
  const startTimeRef = useRef(0)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    streamRef.current = stream
  }, [stream])
  useEffect(() => {
    trackEvent('demo_open', { page_type: 'hr' })
  }, [])

  const goTo = useCallback(
    (next: Stage) => {
      trackEvent('demo_stage', { from: stage, to: next })
      setStage(next)
    },
    [stage],
  )

  async function startRecording() {
    setMicError('')
    try {
      const ms = await navigator.mediaDevices.getUserMedia({ audio: true })
      setStream(ms)
      startTimeRef.current = Date.now()
      setElapsed(0)
      trackEvent('record_start', { page_type: 'hr' })
      timerRef.current = setInterval(() => {
        setElapsed(Math.floor((Date.now() - startTimeRef.current) / 1000))
      }, 250)
      goTo('recording')
    } catch {
      setMicError('マイクへのアクセスが許可されていません。ブラウザの設定をご確認ください。')
      trackEvent('demo_mic_error', { page_type: 'hr' })
    }
  }

  function stopRecording() {
    const dur = (Date.now() - startTimeRef.current) / 1000
    if (dur < MIN_RECORD_SEC) return
    if (timerRef.current) clearInterval(timerRef.current)
    setRecordDuration(Math.round(dur))
    trackEvent('record_stop', { page_type: 'hr', record_duration_sec: Math.round(dur) })
    stream?.getTracks().forEach((t) => t.stop())
    setStream(null)
    goTo('analyzing')
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      streamRef.current?.getTracks().forEach((t) => t.stop())
    }
  }, [])

  useEffect(() => {
    if (stage !== 'analyzing') return
    let frame: number
    const start = Date.now()
    const DURATION = 5200
    function tick() {
      const t = Math.min((Date.now() - start) / DURATION, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      const pct = Math.min(eased * 100, 100)
      setProgress(pct)
      if (pct < 45) setAnalysisLabel(ANALYSIS_LABELS[0])
      else if (pct < 82) setAnalysisLabel(ANALYSIS_LABELS[1])
      else setAnalysisLabel(ANALYSIS_LABELS[2])
      if (pct >= 100) {
        trackEvent('analysis_complete', { page_type: 'hr' })
        goTo('result')
        return
      }
      frame = requestAnimationFrame(tick)
    }
    trackEvent('analysis_start', { page_type: 'hr' })
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [stage, goTo])

  useEffect(() => {
    if (stage === 'result') setMetrics(generateMetricsForDevice())
  }, [stage])

  function formatTime(sec: number) {
    return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`
  }

  const canStop = elapsed >= MIN_RECORD_SEC
  const pv = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  return (
    <div className="relative flex min-h-dvh flex-col bg-[#141210]">
      <div className="hr-container flex items-center justify-between pt-5">
        <Link
          href="/hr"
          className="inline-flex items-center gap-1.5 text-sm text-white/50 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} aria-hidden="true" />
          <span>戻る</span>
        </Link>
        <span className="inline-flex rounded-md bg-white px-2.5 py-1.5">
          <Image
            src="/hr/brand/logo_sosikio.webp"
            alt="SOSIKIO"
            width={900}
            height={287}
            className="h-4 w-auto sm:h-5"
            priority
          />
        </span>
      </div>

      <main className="hr-container flex flex-1 flex-col items-center justify-center py-10">
        <AnimatePresence mode="wait">
          {/* ── INTRO ── */}
          {stage === 'intro' && (
            <motion.div
              key="intro"
              {...pv}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl text-center"
            >
              <p className="hr-latin text-xs font-bold tracking-[0.3em] text-[#ed008c]">
                VOICE EMOTION ANALYSIS
              </p>
              <h1 className="hr-impact mt-4 text-2xl font-black leading-tight text-white sm:text-4xl">
                あなたのコエから、
                <br />
                感情の状態を分析します
              </h1>
              <p className="mt-5 text-sm leading-loose text-white/65 sm:text-base">
                SOSIKIOの「コエの健康診断」は、声の微細な変化から
                <br className="hidden sm:inline" />
                <strong className="text-[#fff200]">本人も気づいていないストレスや活力の低下</strong>
                を検出します。
                <br className="hidden sm:inline" />
                たった3秒の録音で、あなたのコエの状態をリアルタイムで分析。
              </p>

              <div className="mx-auto mt-8 grid max-w-lg grid-cols-3 gap-3 text-center">
                {[
                  { icon: <Clock size={18} />, text: '最短3秒' },
                  { icon: <Brain size={18} />, text: 'AI感情解析' },
                  { icon: <ShieldCheck size={18} />, text: 'データ非保存' },
                ].map((f) => (
                  <div
                    key={f.text}
                    className="rounded-xl bg-[#1c1c1e] px-3 py-3.5 ring-1 ring-white/5"
                  >
                    <span className="mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#fff200]/10 text-[#fff200]">
                      {f.icon}
                    </span>
                    <p className="text-xs font-bold text-white/80">{f.text}</p>
                  </div>
                ))}
              </div>

              <div className="mx-auto mt-6 max-w-lg rounded-xl border border-white/10 bg-[#1c1c1e] px-5 py-4 text-left">
                <p className="inline-flex items-center gap-2 text-sm font-bold text-[#fff200]">
                  <ShieldCheck size={15} />
                  プライバシー保護
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/60 sm:text-sm">
                  録音中は波形特徴量のみを一時処理し、音声内容はテキスト化も保存もされません。解析完了後にすべての処理データは自動削除されます。
                </p>
              </div>

              {micError && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  role="alert"
                  className="mx-auto mt-5 max-w-sm rounded-md bg-[#ed008c]/15 px-4 py-3 text-sm font-bold text-[#ff7ec4]"
                >
                  {micError}
                </motion.p>
              )}

              <button
                type="button"
                onClick={startRecording}
                className="hr-impact mx-auto mt-8 flex items-center gap-2.5 rounded-full bg-[#fff200] px-10 py-4 text-base font-black text-[#141210] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(255,242,0,0.35)] active:translate-y-0"
              >
                <Mic size={20} aria-hidden="true" />
                音声分析を開始する
              </button>
              <p className="mt-3 text-xs text-white/35">マイクへのアクセス許可が必要です</p>
            </motion.div>
          )}

          {/* ── RECORDING ── */}
          {stage === 'recording' && (
            <motion.div
              key="recording"
              {...pv}
              transition={{ duration: 0.4 }}
              className="flex w-full max-w-xl flex-col items-center text-center"
            >
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ed008c] opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#ed008c]" />
                </span>
                <p className="hr-latin text-sm font-bold tracking-wider text-[#ed008c]">
                  RECORDING
                </p>
              </div>

              <p
                className="hr-latin mt-3 text-5xl font-bold tabular-nums text-white sm:text-6xl"
                aria-live="polite"
              >
                {formatTime(elapsed)}
              </p>

              <div className="mt-6 w-full overflow-hidden rounded-xl bg-[#141210]/60 p-1 ring-1 ring-[#fff200]/20">
                <DemoWaveform stream={stream} isRecording />
              </div>

              <p className="mt-4 text-sm text-white/50">
                {canStop
                  ? '停止ボタンを押して録音を終了してください'
                  : `あと ${MIN_RECORD_SEC - elapsed} 秒お話しください`}
              </p>

              <div className="mt-5 flex items-start gap-3 rounded-xl border border-white/10 bg-[#1c1c1e] px-4 py-3 text-left">
                <Activity size={16} className="mt-0.5 shrink-0 text-[#fff200]" />
                <p className="text-xs leading-relaxed text-white/55">
                  音声の<strong className="text-white/80">周波数パターン・声のゆらぎ・話速</strong>
                  をリアルタイムで取得しています。これらの特徴量から感情状態を推定します。内容の記録は一切行いません。
                </p>
              </div>

              <button
                type="button"
                onClick={stopRecording}
                disabled={!canStop}
                aria-label="録音を停止"
                className="mt-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#ed008c] text-white transition-transform duration-200 hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Square size={22} fill="currentColor" aria-hidden="true" />
              </button>
            </motion.div>
          )}

          {/* ── ANALYZING ── */}
          {stage === 'analyzing' && (
            <motion.div
              key="analyzing"
              {...pv}
              transition={{ duration: 0.4 }}
              className="flex w-full max-w-lg flex-col items-center text-center"
            >
              <p className="hr-impact text-xl font-black text-white sm:text-2xl">音声感情分析中</p>
              <p className="mt-2 text-sm text-white/50">
                あなたのコエから感情パターンを抽出しています
              </p>

              <div className="mt-8 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[#fff200]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-sm text-white/60" aria-live="polite">
                {analysisLabel}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {[
                  {
                    icon: <BarChart3 size={18} />,
                    title: '主観のコエ',
                    desc: 'アンケート回答から顕在的な意識を数値化',
                  },
                  {
                    icon: <Activity size={18} />,
                    title: '感情のコエ',
                    desc: '声の周波数変化から潜在的な感情を検出',
                  },
                  {
                    icon: <TrendingDown size={18} />,
                    title: '予兆の可視化',
                    desc: '両者のギャップから離職リスクを早期発見',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-xl bg-[#1c1c1e] px-4 py-4 text-left ring-1 ring-white/5"
                  >
                    <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-[#fff200]/10 text-[#fff200]">
                      {item.icon}
                    </span>
                    <p className="text-sm font-bold text-white/90">{item.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-white/50">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ── RESULT ── */}
          {stage === 'result' && (
            <motion.div
              key="result"
              {...pv}
              transition={{ duration: 0.4 }}
              className="w-full max-w-xl"
            >
              <p className="hr-latin text-center text-xs font-bold tracking-[0.3em] text-[#fff200]/60">
                ANALYSIS COMPLETE
              </p>
              <h2 className="hr-impact mt-2 text-center text-xl font-black text-white sm:text-2xl">
                あなたのコエの診断結果
              </h2>
              <p className="mt-2 text-center text-sm text-white/50">
                以下はサマリー結果です。詳細レポートにはさらに深い分析が含まれます。
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {metrics.map((m, i) => (
                  <motion.div
                    key={m.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                    className="rounded-xl bg-[#1c1c1e] p-4 text-center ring-1 ring-white/10"
                  >
                    <p className="text-xs text-white/50">{m.label}</p>
                    <p
                      className="hr-latin mt-1 text-3xl font-bold sm:text-4xl"
                      style={{ color: m.color }}
                    >
                      {m.value}
                    </p>
                    <p className="text-[10px] text-white/30">/ 100</p>
                  </motion.div>
                ))}
              </div>

              {/* ── 統合レポート (実DOM要素) + 段階的ぼかし + CTA ── */}
              <div className="relative mt-6 overflow-hidden rounded-xl bg-white ring-1 ring-black/10">
                <LockedReport metrics={metrics} />

                {/* 上端フェード + 末尾ベタ塗り（中盤の86%は各セクション本文側で適用） */}
                <div
                  className="pointer-events-none absolute inset-0 z-1"
                  style={{
                    background:
                      'linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.38) 10%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 96%, #ffffff 100%)',
                  }}
                />

                {/* CTA — 黒系ぼかしパネル */}
                <div className="absolute inset-x-0 top-8 z-10 flex justify-center px-4 sm:top-10">
                  <div className="flex w-full max-w-md flex-col items-center rounded-2xl bg-[#141210]/88 px-5 py-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.45)] ring-1 ring-white/10 backdrop-blur-md sm:px-7 sm:py-7">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/15">
                      <Lock size={18} className="text-[#fff200]" aria-hidden="true" />
                    </div>
                    <p className="hr-impact mt-3 text-base font-black text-white sm:text-lg">
                      統合レポートはロック中
                    </p>
                    <p className="mt-1.5 max-w-sm text-center text-xs leading-relaxed text-white/60 sm:text-sm">
                      感情推移・リスクスコア・介入提案・チーム比較・音声特徴量の詳細など、すべての分析結果がロック解除で閲覧可能になります。
                    </p>
                    <button
                      type="button"
                      onClick={() => goTo('gate')}
                      className="hr-impact mt-5 inline-flex items-center gap-2 rounded-full bg-[#fff200] px-8 py-3.5 text-base font-black text-[#141210] shadow-[0_8px_28px_rgba(255,242,0,0.28)] transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Mail size={18} aria-hidden="true" />
                      結果を受け取る
                    </button>
                  </div>
                </div>
              </div>

              {/* ナーチャリング: 実運用では何がわかるのか */}
              <div className="mt-8 rounded-xl border border-white/10 bg-[#1c1c1e] px-5 py-5">
                <p className="text-sm font-bold text-[#fff200]">
                  実際の導入では、さらに深い分析が可能です
                </p>
                <ul className="mt-3 space-y-2.5">
                  {[
                    {
                      icon: <TrendingDown size={14} />,
                      text: '14日間の感情推移グラフで、変化の兆候をリアルタイムに把握',
                    },
                    {
                      icon: <Users size={14} />,
                      text: 'チーム全体のエンゲージメントを一覧で可視化',
                    },
                    {
                      icon: <Brain size={14} />,
                      text: '主観と感情の乖離検出で、本人も気づかない予兆を発見',
                    },
                    {
                      icon: <BarChart3 size={14} />,
                      text: '管理職向けの介入提案レポートを自動生成',
                    },
                  ].map((item) => (
                    <li key={item.text} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0 text-[#fff200]/70">{item.icon}</span>
                      <span className="text-xs leading-relaxed text-white/65 sm:text-sm">
                        {item.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}

          {/* ── GATE / FORM ── */}
          {(stage === 'gate' || stage === 'form') && (
            <motion.div
              key="form"
              {...pv}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg"
            >
              <h2 className="hr-impact mb-2 text-center text-xl font-black text-white sm:text-2xl">
                詳細レポートをお届けします
              </h2>
              <p className="mb-3 text-center text-sm text-white/55">
                以下の情報を入力すると、あなたの音声から解析した詳細な分析レポートをメールでお送りします。
              </p>
              <p className="mb-8 text-center text-xs text-white/35">
                通常は担当者が導入説明と合わせてレポートの読み方をご案内します。
              </p>
              <LeadStepForm onComplete={() => goTo('complete')} recordDuration={recordDuration} />
            </motion.div>
          )}

          {/* ── COMPLETE ── */}
          {stage === 'complete' && (
            <motion.div
              key="complete"
              {...pv}
              transition={{ duration: 0.4 }}
              className="w-full max-w-lg text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#fff200]/15"
              >
                <Mail size={28} className="text-[#fff200]" aria-hidden="true" />
              </motion.div>

              <h2 className="hr-impact mt-6 text-xl font-black text-white sm:text-2xl">
                送信が完了しました
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                詳細な分析レポートがメールで届くのをお待ちください。
                <br />
                より正確な診断は、14日以上の継続測定により精度が大幅に向上します。
              </p>

              <div className="mx-auto mt-8 max-w-md rounded-xl border border-white/10 bg-[#1c1c1e] px-5 py-5 text-left">
                <p className="text-sm font-bold text-white/80">コエの健康診断でできること</p>
                <ul className="mt-3 space-y-2">
                  {[
                    '毎日の声から、チームの健康状態をリアルタイムに可視化',
                    '年次サーベイでは拾えない「日単位の変化」を検知',
                    '既存の施策を置き換えず、プラグインとして追加導入可能',
                  ].map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2 text-xs leading-relaxed text-white/55 sm:text-sm"
                    >
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#fff200]" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/hr#lead-form"
                  className="hr-impact inline-flex items-center gap-2 rounded-full bg-[#fff200] px-6 py-3 text-sm font-black text-[#141210] transition-transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  担当者に相談する
                </Link>
                <Link
                  href="/hr"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-[#fff200]/40 hover:text-white"
                >
                  SOSIKIOについて詳しく見る
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

/* ────────────── Utility functions ────────────── */

function generateMetricsForDevice(): Metric[] {
  const deviceId = getOrCreateDeviceId()
  const today = new Date().toISOString().slice(0, 10)
  const jitterSeed = hashString(`${deviceId}:${today}`)
  return METRIC_SPECS.map((spec, index) => {
    const baseSeed = hashString(`${deviceId}:${spec.key}`)
    const baseOffset = mapToRange(baseSeed, -spec.spread, spec.spread)
    const dailyJitter = mapToRange(jitterSeed + index * 97, -2, 2)
    const value = clamp(Math.round(spec.base + baseOffset + dailyJitter), 5, 98)
    return { label: spec.label, value, color: spec.color }
  })
}

function getOrCreateDeviceId(): string {
  if (typeof window === 'undefined') return 'server-fallback'
  try {
    const existing = window.localStorage.getItem(DEVICE_ID_STORAGE_KEY)
    if (existing) return existing
    const arr = new Uint32Array(4)
    window.crypto.getRandomValues(arr)
    const generated = Array.from(arr, (v) => v.toString(16).padStart(8, '0')).join('-')
    window.localStorage.setItem(DEVICE_ID_STORAGE_KEY, generated)
    return generated
  } catch {
    return 'storage-unavailable'
  }
}

function hashString(input: string): number {
  let hash = 2166136261
  for (let i = 0; i < input.length; i++) {
    hash ^= input.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}
function mapToRange(seed: number, min: number, max: number): number {
  return min + ((seed % 10_000) / 10_000) * (max - min)
}
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

/* ────────────── Locked Report (real DOM) ────────────── */

function SvgLine({
  points,
  color,
  w = 200,
  h = 60,
}: {
  points: number[]
  color: string
  w?: number
  h?: number
}) {
  const d = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w
      const y = (1 - v) * h
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
}

function SvgArea({
  points,
  color,
  w = 200,
  h = 60,
}: {
  points: number[]
  color: string
  w?: number
  h?: number
}) {
  const d = points
    .map((v, i) => {
      const x = (i / (points.length - 1)) * w
      const y = (1 - v) * h
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  return <path d={`${d} L${w},${h} L0,${h} Z`} fill={color} />
}

function HBar({
  label,
  value,
  color,
  max = 100,
}: {
  label: string
  value: number
  color: string
  max?: number
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-right text-[11px] text-black/45">{label}</span>
      <div className="relative h-3.5 flex-1 overflow-hidden rounded-full bg-black/5">
        <div
          className="h-full rounded-full"
          style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-8 text-right text-[11px] font-bold text-black/60">{value}</span>
    </div>
  )
}

function RadarChart({
  vitality,
  stress,
  stability,
}: {
  vitality: number
  stress: number
  stability: number
}) {
  const dims = ['活力', 'ストレス耐性', '安定度', '社交性', '集中力']
  const stressResist = clamp(100 - stress, 10, 95)
  const social = clamp(Math.round(vitality * 0.6 + stability * 0.3 + 8), 20, 85)
  const focus = clamp(Math.round(stability * 0.7 + (100 - stress) * 0.2 + 5), 25, 90)
  const values = [vitality / 100, stressResist / 100, stability / 100, social / 100, focus / 100]
  const cx = 70,
    cy = 70,
    r = 55
  const angleStep = (2 * Math.PI) / dims.length
  const off = -Math.PI / 2
  const gridPaths = [0.33, 0.66, 1].map((s) => {
    const pts = dims.map(
      (_, i) =>
        `${cx + Math.cos(off + i * angleStep) * r * s},${cy + Math.sin(off + i * angleStep) * r * s}`,
    )
    return `M${pts.join('L')}Z`
  })
  const dataPoints = values.map(
    (v, i) =>
      `${cx + Math.cos(off + i * angleStep) * r * v},${cy + Math.sin(off + i * angleStep) * r * v}`,
  )
  return (
    <svg viewBox="0 0 140 140" className="h-full w-full">
      {gridPaths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="1" />
      ))}
      {dims.map((_, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(off + i * angleStep) * r}
          y2={cy + Math.sin(off + i * angleStep) * r}
          stroke="rgba(0,0,0,0.06)"
          strokeWidth="1"
        />
      ))}
      <path
        d={`M${dataPoints.join('L')}Z`}
        fill="rgba(237,0,140,0.10)"
        stroke="#ed008c"
        strokeWidth="1.5"
      />
      {dims.map((label, i) => {
        const lx = cx + Math.cos(off + i * angleStep) * (r + 14)
        const ly = cy + Math.sin(off + i * angleStep) * (r + 14)
        return (
          <text
            key={label}
            x={lx}
            y={ly}
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(0,0,0,0.45)"
            fontSize="8"
            fontFamily="sans-serif"
          >
            {label}
          </text>
        )
      })}
    </svg>
  )
}

function ReportSectionTitle({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <p
      className={`relative z-2 inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-[#141210] ${className}`}
    >
      <span className="h-3.5 w-0.5 shrink-0 rounded-full bg-[#ed008c]" aria-hidden="true" />
      {children}
    </p>
  )
}

/** 中盤コンテンツ用: タイトル外の本文だけ 86% 白ベール */
function FadedBody({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {children}
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] bg-white/86"
        aria-hidden="true"
      />
    </div>
  )
}

function LockedReport({ metrics }: { metrics: Metric[] }) {
  const vitality = metrics.find((m) => m.label === '活力度')?.value ?? 72
  const stress = metrics.find((m) => m.label === 'ストレス傾向')?.value ?? 38
  const stability = metrics.find((m) => m.label === '発話安定度')?.value ?? 81

  const riskScore = clamp(
    Math.round(stress * 1.2 + (100 - vitality) * 0.5 + (100 - stability) * 0.3),
    15,
    95,
  )
  const riskLevel = riskScore >= 65 ? 'HIGH' : riskScore >= 40 ? 'MEDIUM' : 'LOW'
  const gapDetected = Math.abs(vitality - (100 - stress)) > 15

  const trendVitality = buildDecayTrend(vitality / 100, 14, 0.025)
  const trendEmotion = buildDecayTrend(((100 - stress) / 100) * 0.85, 14, 0.03)
  const trendStability = buildDecayTrend(stability / 100, 15, 0.018)

  const engagement = clamp(
    Math.round(vitality * 0.5 + (100 - stress) * 0.3 + stability * 0.1),
    12,
    88,
  )
  const resilience = clamp(
    Math.round((100 - stress) * 0.5 + stability * 0.3 + vitality * 0.1),
    15,
    85,
  )
  const social = clamp(Math.round(vitality * 0.4 + stability * 0.35 + 12), 20, 85)
  const cogLoad = clamp(Math.round(stress * 0.7 + (100 - stability) * 0.3 + 8), 18, 92)

  const weeks = [
    {
      week: 'Week 1',
      v: clamp(vitality + 12, 20, 95),
      st: clamp(stress - 14, 5, 90),
      sb: clamp(stability + 10, 20, 95),
      trend: '→',
    },
    {
      week: 'Week 2',
      v: clamp(vitality + 4, 20, 95),
      st: clamp(stress - 5, 5, 90),
      sb: clamp(stability + 3, 20, 95),
      trend: '↘',
    },
    {
      week: 'Week 3',
      v: clamp(vitality - 6, 20, 95),
      st: clamp(stress + 8, 5, 90),
      sb: clamp(stability - 8, 20, 95),
      trend: '↓',
    },
    { week: 'Week 4', v: vitality, st: stress, sb: stability, trend: riskScore >= 65 ? '↓↓' : '↓' },
  ]

  const selfX = clamp(Math.round((stress / 100) * 200 + 20), 20, 220)
  const selfY = clamp(Math.round((1 - vitality / 100) * 80 + 10), 10, 90)

  return (
    <div className="select-none bg-white px-4 pb-8 pt-4 sm:px-6" aria-hidden="true">
      <div className="rounded-lg bg-[#fff8c4] px-4 py-2.5">
        <p className="text-[13px] font-bold text-[#141210]/80">統合診断レポート</p>
        <p className="mt-0.5 text-[10px] text-black/35">
          Report ID: SVD-2025-07-10-A3F8 ｜ Generated by SOSIKIO v2.4
        </p>
      </div>

      {/* Section 1: 感情推移 + サマリー */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="rounded-lg bg-black/3 p-4 sm:col-span-3">
          <ReportSectionTitle className="mb-2">感情推移（14日間トレンド）</ReportSectionTitle>
          <svg viewBox="0 0 220 70" className="w-full">
            {[0.25, 0.5, 0.75].map((v) => (
              <line
                key={v}
                x1="0"
                y1={v * 70}
                x2="220"
                y2={v * 70}
                stroke="rgba(0,0,0,0.06)"
                strokeWidth="1"
              />
            ))}
            <SvgArea points={trendVitality} color="rgba(196,160,0,0.08)" w={220} h={70} />
            <SvgLine points={trendVitality} color="#c4a000" w={220} h={70} />
            <SvgArea points={trendEmotion} color="rgba(237,0,140,0.08)" w={220} h={70} />
            <SvgLine points={trendEmotion} color="#ed008c" w={220} h={70} />
          </svg>
          <div className="mt-2 flex gap-4 text-[10px] text-black/40">
            <span className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-3 rounded bg-[#c4a000]" />
              主観のコエ
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-1.5 w-3 rounded bg-[#ed008c]" />
              感情のコエ
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:col-span-2">
          <div className="rounded-lg bg-[#ed008c]/10 px-3 py-2.5">
            <p className="text-[10px] font-bold text-[#ed008c]">介入優先度</p>
            <p className="text-lg font-black text-[#ed008c]">{riskLevel}</p>
          </div>
          <div className="rounded-lg bg-[#fff8c4] px-3 py-2.5">
            <p className="text-[10px] font-bold text-[#c4a000]">主観×感情ギャップ</p>
            <p className="text-sm font-bold text-[#a88800]">
              {gapDetected ? '乖離を検出' : '正常範囲'}
            </p>
          </div>
          <div className="rounded-lg bg-black/3 px-3 py-2">
            <p className="text-[10px] font-bold text-black/50">判定根拠</p>
            <p className="text-[11px] leading-relaxed text-black/40">
              活力度 {vitality}、ストレス傾向 {stress}、安定度 {stability} の組合せから総合リスクを{' '}
              {riskScore} と算出。
              {gapDetected ? '主観と感情の乖離が顕著。' : ''}
            </p>
          </div>
        </div>
      </div>

      {/* Section 2: 推奨アクション */}
      <div className="mt-5">
        <ReportSectionTitle>推奨アクション</ReportSectionTitle>
        <FadedBody className="mt-2">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {[
              { n: '01', t: '1on1の頻度を週1以上に引き上げ', p: '優先度: 高' },
              { n: '02', t: '負荷要因のヒアリングを実施', p: '優先度: 高' },
              { n: '03', t: 'キャリア面談を今週中に設定', p: '優先度: 中' },
              { n: '04', t: '部門横断でのサポート体制構築', p: '優先度: 中' },
            ].map((a) => (
              <div key={a.n} className="rounded-lg bg-black/3 px-3 py-2.5">
                <span className="text-[10px] font-bold text-[#c4a000]/70">{a.n}</span>
                <p className="mt-0.5 text-[11px] leading-snug text-black/55">{a.t}</p>
                <p className="mt-1 text-[10px] text-[#ed008c]/70">{a.p}</p>
              </div>
            ))}
          </div>
        </FadedBody>
      </div>

      {/* Section 3: リスクスコア */}
      <div className="mt-5">
        <ReportSectionTitle className="mb-3">リスクスコア分布（チーム比較）</ReportSectionTitle>
        <FadedBody className="rounded-lg bg-black/3 p-4">
          <div className="space-y-2">
            <HBar label="本人" value={riskScore} color="#ed008c" />
            <HBar label="チーム平均" value={clamp(riskScore - 22, 15, 55)} color="#c4a000" />
            <HBar label="全社平均" value={clamp(riskScore - 30, 12, 48)} color="rgba(0,0,0,0.35)" />
          </div>
        </FadedBody>
      </div>

      {/* Section 4: レーダー + 安定度トレンド */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <ReportSectionTitle className="mb-2">コンディション多軸分析</ReportSectionTitle>
          <FadedBody className="rounded-lg bg-black/3 p-4">
            <div className="mx-auto h-36 w-36">
              <RadarChart vitality={vitality} stress={stress} stability={stability} />
            </div>
          </FadedBody>
        </div>
        <div>
          <ReportSectionTitle className="mb-2">安定度トレンド（30日間）</ReportSectionTitle>
          <FadedBody className="rounded-lg bg-black/3 p-4">
            <svg viewBox="0 0 200 50" className="w-full">
              {[0.25, 0.5, 0.75].map((v) => (
                <line
                  key={v}
                  x1="0"
                  y1={v * 50}
                  x2="200"
                  y2={v * 50}
                  stroke="rgba(0,0,0,0.05)"
                  strokeWidth="1"
                />
              ))}
              <SvgArea points={trendStability} color="rgba(196,160,0,0.08)" w={200} h={50} />
              <SvgLine points={trendStability} color="#c4a000" w={200} h={50} />
            </svg>
            <p className="mt-1.5 text-[10px] text-black/35">
              安定度は30日間で {stability > 70 ? '-18%' : stability > 50 ? '-32%' : '-45%'} の低下傾向
            </p>
          </FadedBody>
        </div>
      </div>

      {/* Section 5: 音声特徴量テーブル */}
      <div className="mt-5">
        <ReportSectionTitle className="mb-2">音声特徴量の詳細分析</ReportSectionTitle>
        <FadedBody className="overflow-hidden rounded-lg ring-1 ring-black/8">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="bg-black/4">
                <th className="px-3 py-2 font-bold text-black/50">指標</th>
                <th className="px-3 py-2 font-bold text-black/50">測定値</th>
                <th className="hidden px-3 py-2 font-bold text-black/50 sm:table-cell">基準範囲</th>
                <th className="px-3 py-2 font-bold text-black/50">判定</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {[
                {
                  m: '発話速度',
                  v: `${(3.8 + vitality * 0.02).toFixed(1)} 音節/秒`,
                  r: '4.8〜5.5',
                  s: vitality < 60 ? '低下' : '正常',
                  sc: vitality < 60 ? '#ed008c' : '#c4a000',
                },
                {
                  m: '声のゆらぎ (Jitter)',
                  v: `${(0.015 + stress * 0.0004).toFixed(3)}`,
                  r: '0.01〜0.025',
                  s: stress > 50 ? '注意' : '正常',
                  sc: stress > 50 ? '#c4a000' : 'rgba(0,0,0,0.45)',
                },
                {
                  m: 'ピッチ変動幅',
                  v: `${clamp(Math.round(20 + vitality * 0.5), 18, 65)} Hz`,
                  r: '40〜65 Hz',
                  s: vitality < 65 ? '低下' : '正常',
                  sc: vitality < 65 ? '#ed008c' : 'rgba(0,0,0,0.45)',
                },
                {
                  m: '発話エネルギー',
                  v: `${(-8 + vitality * 0.06).toFixed(1)} dB`,
                  r: '-3〜+2 dB',
                  s: vitality < 70 ? '低下' : '正常',
                  sc: vitality < 70 ? '#ed008c' : 'rgba(0,0,0,0.45)',
                },
                {
                  m: 'ポーズ頻度',
                  v: `${(4 + stress * 0.08).toFixed(1)} 回/分`,
                  r: '4〜6 回/分',
                  s: stress > 40 ? '増加' : '正常',
                  sc: stress > 40 ? '#c4a000' : 'rgba(0,0,0,0.45)',
                },
                {
                  m: 'スペクトル重心',
                  v: `${clamp(Math.round(2600 - stress * 12), 1400, 2800)} Hz`,
                  r: '2200〜2800 Hz',
                  s: stress > 45 ? '低域偏移' : '正常',
                  sc: stress > 45 ? '#c4a000' : 'rgba(0,0,0,0.45)',
                },
                {
                  m: 'HNR (調波雑音比)',
                  v: `${(22 - stress * 0.15).toFixed(1)} dB`,
                  r: '18〜25 dB',
                  s: stress > 55 ? '低下' : '正常',
                  sc: stress > 55 ? '#ed008c' : 'rgba(0,0,0,0.45)',
                },
              ].map((row) => (
                <tr key={row.m} className="bg-black/1.5">
                  <td className="px-3 py-1.5 text-black/50">{row.m}</td>
                  <td className="px-3 py-1.5 font-mono text-black/60">{row.v}</td>
                  <td className="hidden px-3 py-1.5 text-black/30 sm:table-cell">{row.r}</td>
                  <td className="px-3 py-1.5 font-bold" style={{ color: row.sc }}>
                    {row.s}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadedBody>
      </div>

      {/* Section 6: 介入タイムライン */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-5">
        <div className="sm:col-span-3">
          <ReportSectionTitle className="mb-2">推奨介入タイムライン</ReportSectionTitle>
          <FadedBody>
            <div className="space-y-0">
              {[
                { day: 'Day 1', text: '緊急面談を設定、直属上長に共有', urgent: true },
                { day: 'Day 3', text: '負荷要因を特定するヒアリング実施', urgent: true },
                { day: 'Day 7', text: '介入後の変化を経過観測', urgent: false },
                { day: 'Day 14', text: '再アセスメント（音声再測定）', urgent: false },
                { day: 'Day 21', text: 'チーム体制の調整完了確認', urgent: false },
                { day: 'Day 30', text: '総合評価レポート生成', urgent: false },
              ].map((step, i) => (
                <div key={step.day} className="flex items-start gap-3 py-1.5">
                  <div className="flex flex-col items-center">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${step.urgent ? 'bg-[#ed008c]' : 'bg-black/20'}`}
                    />
                    {i < 5 && <span className="h-4 w-px bg-black/10" />}
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`text-[11px] font-bold ${step.urgent ? 'text-[#ed008c]/80' : 'text-black/40'}`}
                    >
                      {step.day}
                    </span>
                    <span className="text-[11px] text-black/45">{step.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </FadedBody>
        </div>

        <div className="flex flex-col gap-3 sm:col-span-2">
          <FadedBody className="rounded-lg bg-[#ed008c]/8 px-3 py-3">
            <p className="text-[10px] font-bold text-[#ed008c]/70">総合リスク判定</p>
            <p className="hr-latin text-3xl font-black text-[#ed008c]">
              {riskScore}
              <span className="text-base font-bold text-[#ed008c]/50"> / 100</span>
            </p>
            <p className="mt-1 text-[10px] text-black/35">
              {riskScore >= 65
                ? '早期介入を強く推奨'
                : riskScore >= 40
                  ? '注意観察を推奨'
                  : '経過観察'}
            </p>
          </FadedBody>
          <FadedBody className="rounded-lg bg-black/3 px-3 py-3">
            <p className="text-[10px] font-bold text-black/45">経過予測</p>
            <p className="mt-1 text-[11px] leading-relaxed text-black/35">
              現在のトレンドが継続した場合、4週間以内にバーンアウトリスクが臨界域に到達する可能性があります。介入により改善確率は
              {clamp(90 - riskScore, 40, 85)}%。
            </p>
          </FadedBody>
        </div>
      </div>

      {/* Section 7: 週次サマリー比較 */}
      <div className="mt-5">
        <ReportSectionTitle className="mb-2">週次サマリー比較</ReportSectionTitle>
        <FadedBody>
          <div className="grid grid-cols-4 gap-2">
            {weeks.map((w) => (
              <div key={w.week} className="rounded-lg bg-black/3 px-2.5 py-2.5 text-center">
                <p className="text-[10px] font-bold text-black/40">{w.week}</p>
                <div className="mt-1.5 space-y-1">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-black/30">活力</span>
                    <span className="font-mono text-[#c4a000]">{w.v}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-black/30">ストレス</span>
                    <span className="font-mono text-[#ed008c]">{w.st}</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-black/30">安定度</span>
                    <span className="font-mono text-black/50">{w.sb}</span>
                  </div>
                </div>
                <p className="mt-1.5 text-sm text-black/50">{w.trend}</p>
              </div>
            ))}
          </div>
        </FadedBody>
      </div>

      {/* Section 8: チーム内ポジショニング */}
      <div className="mt-5">
        <ReportSectionTitle className="mb-2">チーム内ポジショニングマップ</ReportSectionTitle>
        <FadedBody className="rounded-lg bg-black/3 p-4">
          <svg viewBox="0 0 240 100" className="w-full">
            <line x1="120" y1="0" x2="120" y2="100" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            <line x1="0" y1="50" x2="240" y2="50" stroke="rgba(0,0,0,0.06)" strokeWidth="1" />
            <text x="2" y="8" fill="rgba(0,0,0,0.3)" fontSize="7" fontFamily="sans-serif">
              高活力
            </text>
            <text x="2" y="98" fill="rgba(0,0,0,0.3)" fontSize="7" fontFamily="sans-serif">
              低活力
            </text>
            <text x="195" y="47" fill="rgba(0,0,0,0.3)" fontSize="7" fontFamily="sans-serif">
              高ストレス
            </text>
            <text x="2" y="47" fill="rgba(0,0,0,0.3)" fontSize="7" fontFamily="sans-serif">
              低ストレス
            </text>
            <circle cx="60" cy="30" r="4" fill="rgba(0,0,0,0.12)" />
            <circle cx="80" cy="38" r="4" fill="rgba(0,0,0,0.12)" />
            <circle cx="90" cy="25" r="4" fill="rgba(0,0,0,0.12)" />
            <circle cx="110" cy="42" r="4" fill="rgba(0,0,0,0.12)" />
            <circle cx="70" cy="55" r="4" fill="rgba(0,0,0,0.12)" />
            <circle cx="95" cy="35" r="4" fill="rgba(0,0,0,0.12)" />
            <circle cx="55" cy="45" r="4" fill="rgba(0,0,0,0.12)" />
            <circle cx={selfX} cy={selfY} r="6" fill="#ed008c" opacity="0.8" />
            <circle
              cx={selfX}
              cy={selfY}
              r="10"
              fill="none"
              stroke="#ed008c"
              strokeWidth="1"
              opacity="0.35"
            />
            <text
              x={selfX + 12}
              y={selfY + 3}
              fill="rgba(237,0,140,0.7)"
              fontSize="8"
              fontFamily="sans-serif"
            >
              本人
            </text>
          </svg>
        </FadedBody>
      </div>

      {/* Section 9: 補足指標 */}
      <FadedBody className="mt-5">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            {
              label: 'エンゲージメント',
              value: `${engagement}%`,
              sub: `前月比 ${engagement < 50 ? '-' : '+'}${Math.abs(engagement - 56)}pt`,
              color: engagement < 50 ? '#ed008c' : '#c4a000',
            },
            {
              label: 'レジリエンス',
              value: `${resilience}%`,
              sub: resilience < 50 ? '回復力低下中' : '回復力正常',
              color: resilience < 50 ? '#c4a000' : 'rgba(0,0,0,0.55)',
            },
            {
              label: '対人関係スコア',
              value: `${social}%`,
              sub: social < 50 ? '低下傾向' : '平均域',
              color: social < 50 ? '#c4a000' : 'rgba(0,0,0,0.55)',
            },
            {
              label: '認知負荷',
              value: `${cogLoad}%`,
              sub: cogLoad > 60 ? '高負荷域' : '正常域',
              color: cogLoad > 60 ? '#ed008c' : 'rgba(0,0,0,0.55)',
            },
          ].map((m) => (
            <div key={m.label} className="rounded-lg bg-black/3 px-3 py-3 text-center">
              <p className="text-[10px] text-black/35">{m.label}</p>
              <p className="hr-latin mt-0.5 text-xl font-bold" style={{ color: m.color }}>
                {m.value}
              </p>
              <p className="mt-0.5 text-[9px] text-black/25">{m.sub}</p>
            </div>
          ))}
        </div>
      </FadedBody>

      {/* Section 10: AI所見 */}
      <div className="mt-5">
        <ReportSectionTitle>AI総合所見</ReportSectionTitle>
        <FadedBody className="mt-2 rounded-lg border border-[#c4a000]/20 bg-[#fff8c4]/60 px-4 py-3">
          <p className="text-[11px] leading-relaxed text-black/40">
            対象者の音声パターンは過去14日間にわたり一貫した低下傾向を示しています。活力度 {vitality}
            、ストレス傾向 {stress}、発話安定度 {stability} の測定値から、総合リスクスコアは{' '}
            {riskScore}/100 と算出されました。
            {gapDetected
              ? '主観スコアと感情指標の乖離が顕著であり、当人が自身の状態を正確に認識できていない可能性があります。'
              : ''}
            早期の介入と継続的なモニタリングを{riskScore >= 65 ? '強く' : ''}推奨します。
          </p>
        </FadedBody>
      </div>

      <FadedBody className="mt-5 border-t border-black/5 pt-3">
        <p className="text-[9px] text-black/20">
          本レポートはSOSIKIO Voice Diagnostics Engine
          v2.4により自動生成されました。医療診断を目的としたものではありません。
        </p>
        <p className="mt-1 text-[9px] text-black/15">
          © 2025 SOSIKIO Inc. All rights reserved. Confidential.
        </p>
      </FadedBody>
    </div>
  )
}

function buildDecayTrend(start: number, count: number, decayRate: number): number[] {
  const points: number[] = []
  let v = clamp(start + 0.08, 0.1, 0.95)
  for (let i = 0; i < count; i++) {
    const noise = Math.sin(i * 2.7 + start * 10) * 0.025
    points.push(clamp(v + noise, 0.05, 0.98))
    v -= decayRate * (0.8 + Math.sin(i * 1.3) * 0.3)
  }
  return points
}
