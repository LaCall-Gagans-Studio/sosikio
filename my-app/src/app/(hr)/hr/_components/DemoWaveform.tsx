'use client'

import React, { useRef, useEffect } from 'react'

type Props = {
  stream: MediaStream | null
  isRecording: boolean
}

const LINE_COLOR = '#fff200'
const FILL_COLOR = 'rgba(255, 242, 0, 0.22)'
const BAR_COLOR = 'rgba(237, 0, 140, 0.55)'
const GRID_COLOR = 'rgba(255, 242, 0, 0.12)'

export function DemoWaveform({ stream, isRecording }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    audioCtx: null as AudioContext | null,
    analyser: null as AnalyserNode | null,
    source: null as MediaStreamAudioSourceNode | null,
    timeData: null as Uint8Array | null,
    freqData: null as Uint8Array | null,
    raf: 0,
    gain: 8,
    active: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const syncSize = () => {
      const rect = canvas.getBoundingClientRect()
      if (rect.width === 0) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const ro = new ResizeObserver(syncSize)
    ro.observe(canvas)
    syncSize()
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const s = stateRef.current
    cancelAnimationFrame(s.raf)
    if (s.source) { s.source.disconnect(); s.source = null }
    if (s.analyser) { s.analyser.disconnect(); s.analyser = null }
    if (s.audioCtx) { void s.audioCtx.close(); s.audioCtx = null }
    s.timeData = null
    s.freqData = null
    s.active = false

    if (!stream || !isRecording) {
      const drawIdle = () => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return
        const w = canvas.clientWidth, h = canvas.clientHeight
        if (w === 0) { s.raf = requestAnimationFrame(drawIdle); return }
        ctx.clearRect(0, 0, w, h)
        drawGrid(ctx, w, h)
        ctx.strokeStyle = `${LINE_COLOR}55`
        ctx.lineWidth = 2
        ctx.beginPath(); ctx.moveTo(0, h / 2); ctx.lineTo(w, h / 2); ctx.stroke()
        s.raf = requestAnimationFrame(drawIdle)
      }
      s.raf = requestAnimationFrame(drawIdle)
      return () => { cancelAnimationFrame(s.raf) }
    }

    const audioCtx = new AudioContext()
    const analyser = audioCtx.createAnalyser()
    analyser.fftSize = 2048
    analyser.smoothingTimeConstant = 0.65
    analyser.minDecibels = -90
    analyser.maxDecibels = -10

    const source = audioCtx.createMediaStreamSource(stream)
    source.connect(analyser)

    s.audioCtx = audioCtx
    s.analyser = analyser
    s.source = source
    s.timeData = new Uint8Array(analyser.fftSize)
    s.freqData = new Uint8Array(analyser.frequencyBinCount)
    s.gain = 8
    s.active = true

    if (audioCtx.state === 'suspended') void audioCtx.resume()
    const onStateChange = () => { if (audioCtx.state === 'suspended') void audioCtx.resume() }
    audioCtx.addEventListener('statechange', onStateChange)

    const draw = () => {
      if (!s.active) return
      const canvas = canvasRef.current
      const ctx = canvas?.getContext('2d')
      if (!canvas || !ctx) { s.raf = requestAnimationFrame(draw); return }

      const w = canvas.clientWidth, h = canvas.clientHeight
      if (w === 0 || h === 0) { s.raf = requestAnimationFrame(draw); return }

      ctx.clearRect(0, 0, w, h)
      drawGrid(ctx, w, h)

      if (!s.analyser || !s.timeData || !s.freqData) {
        s.raf = requestAnimationFrame(draw)
        return
      }

      if (audioCtx.state === 'suspended') void audioCtx.resume()

      s.analyser.getByteTimeDomainData(s.timeData)
      s.analyser.getByteFrequencyData(s.freqData)

      let peak = 0
      for (let i = 0; i < s.timeData.length; i++) {
        peak = Math.max(peak, Math.abs(s.timeData[i] - 128))
      }
      const targetGain = peak < 3 ? 20 : Math.min(24, Math.max(4, 96 / peak))
      s.gain += (targetGain - s.gain) * 0.10
      const gain = s.gain

      const barCount = 48
      const barGap = 2
      const barW = (w - barGap * (barCount - 1)) / barCount
      const step = Math.max(1, Math.floor(s.freqData.length / barCount))
      for (let i = 0; i < barCount; i++) {
        let sum = 0
        for (let j = 0; j < step; j++) sum += s.freqData[i * step + j] ?? 0
        const avg = sum / step / 255
        const bh = Math.max(3, avg * h * 0.55 * Math.min(gain / 5, 2.5))
        ctx.fillStyle = BAR_COLOR
        roundRect(ctx, i * (barW + barGap), h - bh, barW, bh, 2)
      }

      const mid = h / 2
      const amp = h * 0.42
      const sliceWidth = w / (s.timeData.length - 1)

      ctx.beginPath()
      for (let i = 0; i < s.timeData.length; i++) {
        const norm = ((s.timeData[i] - 128) / 128) * gain
        const c = Math.max(-1.15, Math.min(1.15, norm))
        const x = i * sliceWidth, y = mid + c * amp
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.lineTo(w, mid); ctx.lineTo(0, mid); ctx.closePath()
      ctx.fillStyle = FILL_COLOR
      ctx.fill()

      ctx.beginPath()
      for (let i = 0; i < s.timeData.length; i++) {
        const norm = ((s.timeData[i] - 128) / 128) * gain
        const c = Math.max(-1.15, Math.min(1.15, norm))
        const x = i * sliceWidth, y = mid + c * amp
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.lineWidth = 3
      ctx.strokeStyle = LINE_COLOR
      ctx.shadowColor = LINE_COLOR
      ctx.shadowBlur = 14
      ctx.stroke()
      ctx.shadowBlur = 0

      s.raf = requestAnimationFrame(draw)
    }

    s.raf = requestAnimationFrame(draw)

    return () => {
      s.active = false
      cancelAnimationFrame(s.raf)
      audioCtx.removeEventListener('statechange', onStateChange)
      source.disconnect()
      analyser.disconnect()
      void audioCtx.close()
      s.audioCtx = null
      s.analyser = null
      s.source = null
      s.timeData = null
      s.freqData = null
    }
  }, [stream, isRecording])

  return (
    <canvas
      ref={canvasRef}
      className="h-40 w-full rounded-xl sm:h-48"
      aria-label="音声波形の可視化"
      role="img"
    />
  )
}

function drawGrid(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.strokeStyle = GRID_COLOR
  ctx.lineWidth = 1
  for (let i = 1; i <= 3; i++) {
    const y = (h / 4) * i
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke()
  }
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const radius = Math.min(r, w / 2, h / 2)
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + w - radius, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
  ctx.lineTo(x + w, y + h - radius)
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  ctx.lineTo(x + radius, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
  ctx.fill()
}
