'use client'

import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import KEYWORDS from '../app/(frontend)/data_keywords'

// 表示するキーワードのリスト
const keywords = KEYWORDS

// --- 画像（スコープで透かして見せる背景レイヤ） ---
const SCOPE_BG_URL = 'mats/hero_bg.webp' // ←適宜差し替え

// --- kazaHole（円）サイズ/挙動（デスクトップ既定） ---
const HOLE_DIAMETER_VMIN = 50
const HOLE_BORDER_PX = 20
// --- ★ モバイル専用（ここだけ好きな値に変更） ---
const HOLE_DIAMETER_VMIN_MOBILE = 65
const HOLE_BORDER_PX_MOBILE = 12

const FOLLOW_ENABLE_SCROLL_Y = 200
const FOLLOW_LERP = 0.2

// レイヤ順（テキスト > リング > 画像 > 下地）
const Z_SCOPE_BG = 10
const Z_RING = 20
const Z_TEXT = 30

// --- 初期位置（デバイス別オフセット） -------------------------
const INIT_OFFSET_DESKTOP = { x: -300, y: 0 }
const INIT_OFFSET_MOBILE = { x: 0, y: -100 }
// -----------------------------------------------------------

// --- 突風（Wind Gust）関連 ---
const GUST_MIN_MS = 8000
const GUST_MAX_MS = 16000
const GUST_FORCE = 0.115
const GUST_UP_FORCE = 0.01
const GUST_DURATION_MS = 1500
const GUST_TARGET_Y = 0.75
const GUST_SPEED_THRESHOLD = 1.2

// デバイス簡易判定
const isMobileLike = () =>
  (typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer:coarse)').matches) ||
  (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent))

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  // 円（kazaHole）とスコープ画像
  const holeWrapperRef = useRef<HTMLDivElement>(null) // 位置だけ持つ固定ラッパー
  const ringRef = useRef<HTMLDivElement>(null) // 黒枠の円（発光もここに適用）
  const scopeBgRef = useRef<HTMLDivElement>(null) // 背景画像（clip-path で穴抜き）

  // 文字（Matter.js）
  const [words, setWords] = useState<{ id: number; text: string }[]>([])
  const matterRefs = useRef<{
    engine: Matter.Engine | null
    runner: Matter.Runner | null
    bodies: { [id: number]: Matter.Body }
    elements: { [id: number]: HTMLDivElement | null }
  }>({ engine: null, runner: null, bodies: {}, elements: {} })

  // 外側発光（box-shadow）を state で保持
  const [holeBoxShadow, setHoleBoxShadow] = useState<string>(`
    inset 0 0 0 ${HOLE_BORDER_PX}px #000,
    10px 10px 20px rgba(0, 0, 0, 0.3),
    -25px -25px 35px rgba(0, 220, 255, 0.85),
    25px -25px 35px rgba(255, 0, 150, 0.8),
    -20px 25px 35px rgba(255, 180, 0, 0.8)
  `)

  // フェーズ（発射と同期）
  const [phase, setPhase] = useState<'idle' | 'burst' | 'after'>('idle')
  const phaseRef = useRef<'idle' | 'burst' | 'after'>('idle')
  const blastStartAt = useRef<number>(-1)

  // 自動発射
  const autoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastBlastAtRef = useRef<number>(0)
  const AUTO_MIN_MS = 2600
  const AUTO_MAX_MS = 5200
  const MIN_GAP_MS = 700

  // 突風
  const gustTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isGustingRef = useRef(false)

  // スクロール領域制御（policyより下は停止）
  const isActiveRef = useRef(true)
  const policyBottomRef = useRef<number>(0)

  // 円の現在位置/目標位置（px, viewport基準）
  const holePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const holeTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const holeRadiusRef = useRef<number>(0)

  // 入力（マウス/タッチ）
  const isPointerFollowingRef = useRef(false)
  const prevFollowingRef = useRef(false)
  const pointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  // 追従チューニング
  const FOLLOW_CATCHUP_LERP = 0.15
  const FOLLOW_CATCHUP_MS = 300
  const SNAP_TO_POINTER_ON_ENTER = false

  // 追従切替の一時状態
  const followCatchupUntilRef = useRef<number>(0)

  // ポインタ位置が一度でも取得できたか（マウス未移動対策）
  const hasPointerEverMovedRef = useRef<boolean>(false)

  // hero 中央（viewport座標）
  const getHeroCenterScreenPos = () => {
    const host = heroRef.current
    if (!host) return { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const r = host.getBoundingClientRect()
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 }
  }

  // 初期スポーン位置（端末別オフセット適用）
  const getInitialSpawnPos = () => {
    const cen = getHeroCenterScreenPos()
    const off = isMobileLike() ? INIT_OFFSET_MOBILE : INIT_OFFSET_DESKTOP
    return { x: cen.x + off.x, y: cen.y + off.y }
  }

  // 円の現在位置 → ページ座標（文字発射の原点）
  const getHolePagePos = () => {
    return { x: holePosRef.current.x, y: holePosRef.current.y + window.scrollY }
  }

  // policy セクション下端（ページ座標）
  const getPolicyBottomPageY = () => {
    const el = document.getElementById('policy-section')
    return el
      ? el.getBoundingClientRect().bottom + window.scrollY
      : window.scrollY + window.innerHeight
  }

  // vmin から半径(px)を算出（★モバイルサイズを考慮）
  const computeHoleRadiusPx = () => {
    const vmin = Math.min(window.innerWidth, window.innerHeight)
    const diamVmin = isMobileLike() ? HOLE_DIAMETER_VMIN_MOBILE : HOLE_DIAMETER_VMIN
    return (diamVmin * vmin) / 100 / 2
  }

  // --- 自動発射スケジューラ ---
  const scheduleNextAutoBlast = () => {
    if (!isActiveRef.current) return
    if (document.hidden) return
    if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current)
    const wait = Math.floor(Math.random() * (AUTO_MAX_MS - AUTO_MIN_MS + 1)) + AUTO_MIN_MS
    autoTimeoutRef.current = setTimeout(() => triggerBlast(), wait)
  }

  // 発射
  const triggerBlast = () => {
    if (!isActiveRef.current) return
    const now = performance.now()
    if (now - lastBlastAtRef.current < MIN_GAP_MS) return
    lastBlastAtRef.current = now

    // 衝撃波アニメ開始（膨張のトリガ）
    blastStartAt.current = performance.now() / 1000

    // ランダム個数で単語追加
    const numToSpawn = Math.floor(Math.random() * 3) + 2 // 2〜4
    const newWords: { id: number; text: string }[] = []
    for (let i = 0; i < numToSpawn; i++) {
      const randomWord = keywords[Math.floor(Math.random() * keywords.length)]
      const newWordId = Date.now() + Math.random() * (i + 1)
      newWords.push({ id: newWordId, text: randomWord })
    }
    setWords((prev) => [...prev, ...newWords])

    // DOM 反映後に物理ボディを作成（円の中心から吐き出す）
    setTimeout(() => {
      const spawn = getHolePagePos()
      newWords.forEach((word) => {
        const numChars = word.text.length
        const charSize = 40
        const parts: Matter.Body[] = []
        for (let i = 0; i < numChars; i++) {
          const offsetX = (i - (numChars - 1)) * (charSize * 0.45)
          const part = Matter.Bodies.rectangle(offsetX, 0, charSize * 0.9, charSize, {
            chamfer: { radius: 3 },
          })
          parts.push(part)
        }
        const newBody = Matter.Body.create({
          parts,
          restitution: 0.6,
          friction: 0.05,
          density: 0.01,
        })
        Matter.Body.setPosition(newBody, { x: spawn.x, y: spawn.y })
        matterRefs.current.bodies[word.id] = newBody
        if (matterRefs.current.engine) {
          Matter.World.add(matterRefs.current.engine.world, newBody)
        }
        // 初速
        const forceMagnitudeY = -0.05
        const forceMagnitudeX = (Math.random() - 0.5) * 0.3
        Matter.Body.applyForce(newBody, newBody.position, {
          x: forceMagnitudeX,
          y: forceMagnitudeY,
        })
        Matter.Body.setAngularVelocity(newBody, (Math.random() - 0.5) * 0.2)

        // 15秒の保険削除
        const ttl = window.setTimeout(() => {
          const { engine: currentEngine, bodies, elements } = matterRefs.current
          const bodyToRemove = bodies[word.id]
          if (currentEngine && bodyToRemove) {
            Matter.World.remove(currentEngine.world, bodyToRemove)
            delete bodies[word.id]
            delete elements[word.id]
          }
          setWords((prev) => prev.filter((w) => w.id !== word.id))
          window.clearTimeout(ttl)
        }, 15000)
      })
    }, 0)

    scheduleNextAutoBlast()
  }

  // --- 突風 ---
  const scheduleNextGustBlast = () => {
    if (!isActiveRef.current) return
    if (document.hidden) return
    if (gustTimeoutRef.current) clearTimeout(gustTimeoutRef.current)
    const wait = Math.floor(Math.random() * (GUST_MAX_MS - GUST_MIN_MS + 1)) + GUST_MIN_MS
    gustTimeoutRef.current = setTimeout(() => triggerGustBlast(), wait)
  }

  const triggerGustBlast = () => {
    if (!isActiveRef.current) return
    if (isGustingRef.current) return
    isGustingRef.current = true

    const dir = Math.random() < 0.5 ? 1 : -1
    const strength = GUST_FORCE

    const { bodies } = matterRefs.current
    const vpH = window.innerHeight
    const targetY = window.scrollY + vpH * GUST_TARGET_Y
    const originalAir: Record<number, number> = {}

    Object.keys(bodies).forEach((idStr) => {
      const id = Number(idStr)
      const body = bodies[id]
      if (!body) return
      const isLow = body.position.y >= targetY
      const isSlow = body.speed <= GUST_SPEED_THRESHOLD
      if (isLow || isSlow) {
        originalAir[id] = body.frictionAir
        Matter.Body.set(body, { frictionAir: Math.max(0.02, body.frictionAir * 2) })
        const fx = dir * strength * body.mass
        const lift = GUST_UP_FORCE * (isLow ? 1.6 : 1.0)
        const fyJitter = (Math.random() - 0.5) * 0.0015
        const fy = -(lift * body.mass) + fyJitter
        Matter.Body.applyForce(body, body.position, { x: fx, y: fy })
        const spin = dir * (0.02 + Math.random() * 0.03)
        Matter.Body.setAngularVelocity(body, body.angularVelocity + spin)
      }
    })

    setTimeout(() => {
      Object.keys(bodies).forEach((idStr) => {
        const id = Number(idStr)
        const body = bodies[id]
        if (body && originalAir[id] != null) {
          Matter.Body.set(body, { frictionAir: originalAir[id] })
        }
      })
      isGustingRef.current = false
      scheduleNextGustBlast()
    }, GUST_DURATION_MS)
  }

  // 追従モードと有効/無効の切替
  const updateActiveStateAndTargets = () => {
    policyBottomRef.current = getPolicyBottomPageY()
    const middlePageY = window.scrollY + window.innerHeight / 2
    const nowActive = middlePageY < policyBottomRef.current - 20
    const wasActive = isActiveRef.current
    isActiveRef.current = nowActive

    // 直前の追従状態を保持
    const wasFollowing = isPointerFollowingRef.current
    const nextFollowing = window.scrollY > FOLLOW_ENABLE_SCROLL_Y

    if (nowActive) {
      isPointerFollowingRef.current = nextFollowing

      // 停止→再開したときはスケジュール復帰
      if (!wasActive) {
        scheduleNextAutoBlast()
        scheduleNextGustBlast()
      }

      // ★ 追従OFF→ON に切り替わった瞬間の処理
      if (!wasFollowing && nextFollowing) {
        // 目標はまず現在のポインタ（未取得なら画面中央）
        const target = hasPointerEverMovedRef.current
          ? pointerRef.current
          : { x: window.innerWidth / 2, y: window.innerHeight / 2 }

        holeTargetRef.current.x = target.x
        holeTargetRef.current.y = target.y

        if (SNAP_TO_POINTER_ON_ENTER) {
          holePosRef.current.x = target.x
          holePosRef.current.y = target.y
        } else {
          followCatchupUntilRef.current = performance.now() + FOLLOW_CATCHUP_MS
        }
      }
    } else {
      // 非アクティブ：各種停止
      if (autoTimeoutRef.current) {
        clearTimeout(autoTimeoutRef.current)
        autoTimeoutRef.current = null
      }
      if (gustTimeoutRef.current) {
        clearTimeout(gustTimeoutRef.current)
        gustTimeoutRef.current = null
      }
      isPointerFollowingRef.current = false
    }

    // 追従しないときは hero 中央へ戻す（既存ロジック）
    if (!isPointerFollowingRef.current) {
      const cen = getHeroCenterScreenPos()
      const off = isMobileLike() ? INIT_OFFSET_MOBILE : INIT_OFFSET_DESKTOP
      holeTargetRef.current.x = cen.x + off.x
      holeTargetRef.current.y = cen.y + off.y
    }
  }

  useEffect(() => {
    if (!heroRef.current) return

    // 初期半径と位置（端末別オフセットを適用）
    holeRadiusRef.current = computeHoleRadiusPx()
    const init = getInitialSpawnPos()
    holePosRef.current = { ...init }
    holeTargetRef.current = { ...init }

    // 背景画像レイヤ初期化
    const scope = scopeBgRef.current
    if (scope) {
      scope.style.backgroundColor = `ffffff`
      scope.style.backgroundSize = 'contain'
      scope.style.backgroundPosition = 'center'
      scope.style.pointerEvents = 'none'
      scope.style.zIndex = String(Z_SCOPE_BG)
      scope.style.position = 'fixed'
      scope.style.inset = '0'
    }

    // Matter.js セットアップ
    const engine = Matter.Engine.create()
    const runner = Matter.Runner.create()
    engine.world.gravity.y = 1.2

    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      getPolicyBottomPageY() + 50,
      window.innerWidth * 2,
      100,
      { isStatic: true },
    )
    Matter.World.add(engine.world, [ground])
    Matter.Runner.run(runner, engine)
    matterRefs.current.engine = engine
    matterRefs.current.runner = runner

    const updateGround = () => {
      Matter.Body.setPosition(ground, {
        x: window.innerWidth / 2,
        y: getPolicyBottomPageY() + 50,
      })
    }

    // 入力
    const onMouseMove = (e: MouseEvent) => {
      hasPointerEverMovedRef.current = true
      pointerRef.current = { x: e.clientX, y: e.clientY }
      if (isPointerFollowingRef.current) {
        holeTargetRef.current.x = pointerRef.current.x
        holeTargetRef.current.y = pointerRef.current.y
      }
    }

    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      hasPointerEverMovedRef.current = true
      pointerRef.current = { x: t.clientX, y: t.clientY }
      holeTargetRef.current.x = pointerRef.current.x
      holeTargetRef.current.y = pointerRef.current.y
    }

    const onClick = () => {
      if (!isActiveRef.current) return
      triggerBlast()
    }

    // 画面イベント
    const onResize = () => {
      holeRadiusRef.current = computeHoleRadiusPx()
      updateGround()
      updateActiveStateAndTargets()
    }
    const onScroll = () => {
      updateGround()
      updateActiveStateAndTargets()
    }
    const onVisChange = () => {
      if (document.hidden) {
        if (autoTimeoutRef.current) {
          clearTimeout(autoTimeoutRef.current)
          autoTimeoutRef.current = null
        }
        if (gustTimeoutRef.current) {
          clearTimeout(gustTimeoutRef.current)
          gustTimeoutRef.current = null
        }
      } else {
        updateActiveStateAndTargets()
        scheduleNextAutoBlast()
        scheduleNextGustBlast()
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    heroRef.current.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisChange)

    // 初回スケジュール
    updateActiveStateAndTargets()
    scheduleNextAutoBlast()
    scheduleNextGustBlast()

    // ====== アニメーションループ ======
    let rafId = 0
    const BURST_DURATION = 1.2
    const AFTER_DURATION = 4.0

    const tick = () => {
      rafId = requestAnimationFrame(tick)

      const pos = holePosRef.current
      const target = holeTargetRef.current

      // ★ 切替直後だけ高速Lerp を使用
      const now = performance.now()
      const activeLerp = now < followCatchupUntilRef.current ? FOLLOW_CATCHUP_LERP : FOLLOW_LERP

      pos.x += (target.x - pos.x) * activeLerp
      pos.y += (target.y - pos.y) * activeLerp

      // 発射からの経過で膨張＆発光を変化
      const nowSec = performance.now() / 1000
      const timeSinceBlast = blastStartAt.current >= 0 ? nowSec - blastStartAt.current : Infinity

      // 膨張スケール（発射直後だけ 0.5 振幅）
      let pulseScale = 1
      if (timeSinceBlast < 1.0) {
        const progress = timeSinceBlast / 1.0
        const blastEffect = Math.exp(-progress * 5.0) * Math.sin(progress * Math.PI * 3.0)
        pulseScale = 1.0 + blastEffect * 0.5
      }

      // ラッパー位置
      const wrap = holeWrapperRef.current
      if (wrap) {
        wrap.style.transform = `translate(${pos.x}px, ${pos.y}px)`
        wrap.style.zIndex = String(Z_RING)
        wrap.style.position = 'fixed'
        wrap.style.top = '0'
        wrap.style.left = '0'
        wrap.style.width = '0'
        wrap.style.height = '0'
        wrap.style.pointerEvents = 'none'
      }

      // ★ モバイル/デスクトップでサイズ＆縁幅を都度切替
      const DIAM_VMIN = isMobileLike() ? HOLE_DIAMETER_VMIN_MOBILE : HOLE_DIAMETER_VMIN
      const BORDER_PX = isMobileLike() ? HOLE_BORDER_PX_MOBILE : HOLE_BORDER_PX

      // リング（黒枠＋外側発光）
      const ring = ringRef.current
      const r = holeRadiusRef.current
      if (ring) {
        ring.style.transform = `translate(-50%, -50%) scale(${pulseScale})`
        ring.style.width = `${DIAM_VMIN}vmin`
        ring.style.height = `${DIAM_VMIN}vmin`
        ring.style.borderRadius = '50%'
        ring.style.border = `${BORDER_PX}px solid #000`
        ring.style.background = 'transparent'
        ring.style.pointerEvents = 'none'
        ring.style.willChange = 'transform, box-shadow'

        const baseAmplitude = 15
        const blastAmplitude =
          timeSinceBlast < 1.0 ? Math.abs(Math.sin(timeSinceBlast * Math.PI * 3.0)) * 80 : 0
        const amplitude = baseAmplitude + blastAmplitude
        const speed = 0.7
        const baseBlur = 35
        const blastBlur =
          timeSinceBlast < 1.0 ? Math.abs(Math.sin(timeSinceBlast * Math.PI * 3.0)) * 100 : 0
        const blur = baseBlur + blastBlur
        const blueX = -25 + amplitude * Math.cos(nowSec * speed * 1.1)
        const blueY = -25 + amplitude * Math.sin(nowSec * speed * 1.1)
        const pinkX = 25 + amplitude * Math.cos(nowSec * speed * 0.9)
        const pinkY = -25 + amplitude * Math.sin(nowSec * speed * 0.9)
        const orangeX = -20 + amplitude * Math.cos(nowSec * speed * 1.3)
        const orangeY = 25 + amplitude * Math.sin(nowSec * speed * 1.3)

        const newBoxShadow = `
          inset 0 0 0 ${BORDER_PX}px #000,
          10px 10px 20px rgba(0,0,0,0.3),
          ${blueX}px ${blueY}px ${blur}px rgba(0,220,255,0.85),
          ${pinkX}px ${pinkY}px ${blur}px rgba(255,0,150,0.8),
          ${orangeX}px ${orangeY}px ${blur}px rgba(255,180,0,0.8)
        `
        if (holeBoxShadow !== newBoxShadow) setHoleBoxShadow(newBoxShadow)
        ring.style.boxShadow = holeBoxShadow
      }

      // スコープ画像に clip-path を適用（穴抜き）
      const scope = scopeBgRef.current
      if (scope) {
        const clip = `circle(${r}px at ${pos.x}px ${pos.y}px)`
        ;(scope.style as any).clipPath = clip
        ;(scope.style as any).webkitClipPath = clip
      }

      // Matter.js DOM 同期
      const scrollY = window.scrollY
      Object.keys(matterRefs.current.bodies).forEach((idStr) => {
        const id = Number(idStr)
        const body = matterRefs.current.bodies[id]
        const el = matterRefs.current.elements[id]
        if (!body || !el) return
        const { x, y } = body.position
        const angle = body.angle
        el.style.transform = `translate(${x - el.clientWidth / 2}px, ${y - scrollY - el.clientHeight / 2}px) rotate(${angle}rad)`
      })

      // 画面外クリーンアップ
      const W = window.innerWidth
      const docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
      const margin = 300
      const { engine: currentEngine, bodies, elements } = matterRefs.current
      Object.keys(bodies).forEach((idStr) => {
        const id = Number(idStr)
        const b = bodies[id]
        if (!b || !currentEngine) return
        const { x, y } = b.position
        const off = x < -margin || x > W + margin || y < -margin || y > docH + margin
        if (off) {
          Matter.World.remove(currentEngine.world, b)
          delete bodies[id]
          delete elements[id]
          setWords((prev) => prev.filter((w) => w.id !== id))
        }
      })

      // フェーズ更新（テキスト演出用）
      let nextPhase: 'idle' | 'burst' | 'after' = 'idle'
      if (timeSinceBlast >= 0 && timeSinceBlast < BURST_DURATION) nextPhase = 'burst'
      else if (timeSinceBlast >= BURST_DURATION && timeSinceBlast < BURST_DURATION + AFTER_DURATION)
        nextPhase = 'after'
      else nextPhase = 'idle'
      if (nextPhase !== phaseRef.current) {
        phaseRef.current = nextPhase
        setPhase(nextPhase)
      }
    }
    rafId = requestAnimationFrame(tick)

    // クリーンアップ
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove as any)
      window.removeEventListener('touchmove', onTouchMove as any)
      heroRef.current?.removeEventListener('click', onClick as any)
      window.removeEventListener('resize', onResize as any)
      window.removeEventListener('scroll', onScroll as any)
      document.removeEventListener('visibilitychange', onVisChange as any)
      if (autoTimeoutRef.current) {
        clearTimeout(autoTimeoutRef.current)
        autoTimeoutRef.current = null
      }
      if (gustTimeoutRef.current) {
        clearTimeout(gustTimeoutRef.current)
        gustTimeoutRef.current = null
      }
      const { engine: e, runner: r } = matterRefs.current
      if (r && e) {
        Matter.Runner.stop(r)
        Matter.World.clear(e.world, false)
        Matter.Engine.clear(e)
      }
      matterRefs.current.bodies = {}
      matterRefs.current.elements = {}
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // コンテナ
  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'calc(100vh)',
    overflow: 'hidden',
    backgroundColor: '#f1f1f1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  }

  return (
    <div ref={heroRef} style={containerStyle} className="relative">
      {/* 下地（グラデ） */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          background: 'linear-gradient(to bottom, #ffffff 0%, #f7f7f7 35%, #f1f1f1 100%)',
        }}
      />
      {/* スコープ：背景画像（clip-path で丸く透ける） */}
      <div
        ref={scopeBgRef}
        className="fixed inset-0 opacity-30"
        style={{
          zIndex: Z_SCOPE_BG,
          backgroundColor: `ffffff`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
        }}
      />
      {/* テキスト */}
      <div className="absolute inset-0 font-semibold antialiased">
        <div
          className="absolute left-1/2 top-1/2 translate-y-24 lg:-translate-y-1/2 lg:-translate-x-0 -translate-x-1/2"
          style={{ zIndex: Z_TEXT }}
        >
          <h1 className="font-zenKakuGothicAntique text-nowrap text-4xl leading-snug text-center lg:text-left sm:text-5xl md:text-6xl lg:text-7xl lg:leading-normal">
            日常に
            <br className="hidden lg:block" />
            組織が変わる
            <br />
            歓びを
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-center lg:text-left leading-relaxed font-zenKakuGothicNew">
            組織を率いるリーダーと現場を
            <br className="lg:hidden" />
            「データと対話」でつなぎ、
            <br className="" />
            行動変容を促すプラットフォーム <br className="lg:hidden" />
            <span className="font-extrabold text-white mt-2 lg:mt-0 bg-black px-2 py-0 inline-block">
              SOSIKIO
            </span>
          </p>
        </div>
      </div>
      {/* kazaHole（リングのみ。内側は透過） */}
      <div
        ref={holeWrapperRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 0,
          height: 0,
          pointerEvents: 'none',
          zIndex: Z_RING,
          willChange: 'transform',
        }}
      >
        <div
          ref={ringRef}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            transform: 'translate(-50%, -50%)', // scale は tick で付与
            // width/height/border は tick() 内でモバイル判定して更新
            borderRadius: '50%',
            background: 'transparent',
            pointerEvents: 'none',
            willChange: 'transform, box-shadow',
            boxShadow: holeBoxShadow,
          }}
        />
      </div>
      {/* 飛び散る文字（Matter.js） */}
      {words.map((word) => (
        <div
          key={word.id}
          ref={(el) => {
            matterRefs.current.elements[word.id] = el
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 40,
            color: '#000',
            // fontSize: '2.5rem',
            fontWeight: 'lighter' as any,
            pointerEvents: 'none',
            userSelect: 'none',
            transform: 'translate(-9999px, -9999px)',
            fontFamily: '"MS 明朝","serif"',
          }}
          className="text-2xl lg:text-4xl"
        >
          {word.text}
        </div>
      ))}
    </div>
  )
}
