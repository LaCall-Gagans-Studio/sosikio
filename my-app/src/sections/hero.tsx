'use client'

import React, { useEffect, useRef, useState } from 'react'
import Matter from 'matter-js'
import KEYWORDS from '../app/(frontend)/data_keywords'

const keywords = KEYWORDS
const SCOPE_BG_URL = 'mats/hero_bg.webp'

// --- kazaHole（円）サイズ/挙動 ---
const HOLE_DIAMETER_VMIN = 50
const HOLE_BORDER_PX = 20
const HOLE_DIAMETER_VMIN_MOBILE = 65
const HOLE_BORDER_PX_MOBILE = 12

const FOLLOW_LERP = 0.2

const Z_SCOPE_BG = 10
const Z_RING = 20
const Z_TEXT = 30

// 初期位置オフセット
const INIT_OFFSET_DESKTOP = { x: -300, y: 0 }
const INIT_OFFSET_MOBILE = { x: 0, y: -100 }

// 突風
const GUST_MIN_MS = 8000
const GUST_MAX_MS = 16000
const GUST_FORCE = 0.115
const GUST_UP_FORCE = 0.01
const GUST_DURATION_MS = 1500
const GUST_TARGET_Y = 0.75
const GUST_SPEED_THRESHOLD = 1.2

const isMobileLike = () =>
  (typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer:coarse)').matches) ||
  (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent))

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null)

  // 円（kazaHole）とスコープ画像
  const holeWrapperRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const scopeBgRef = useRef<HTMLDivElement>(null)

  // 文字（Matter.js）
  const [words, setWords] = useState<{ id: number; text: string }[]>([])
  const matterRefs = useRef<{
    engine: Matter.Engine | null
    runner: Matter.Runner | null
    ground: Matter.Body | null
    bodies: { [id: number]: Matter.Body }
    elements: { [id: number]: HTMLDivElement | null }
  }>({ engine: null, runner: null, ground: null, bodies: {}, elements: {} })

  // 外側発光
  const [holeBoxShadow, setHoleBoxShadow] = useState<string>(`
    inset 0 0 0 ${HOLE_BORDER_PX}px #000,
    10px 10px 20px rgba(0, 0, 0, 0.3),
    -25px -25px 35px rgba(0, 220, 255, 0.85),
    25px -25px 35px rgba(255, 0, 150, 0.8),
    -20px 25px 35px rgba(255, 180, 0, 0.8)
  `)

  // フェーズ（演出）
  const [phase, setPhase] = useState<'idle' | 'burst' | 'after'>('idle')
  const phaseRef = useRef<'idle' | 'burst' | 'after'>('idle')
  const blastStartAt = useRef<number>(-1)

  // 自動発射
  const autoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastBlastAtRef = useRef<number>(0)
  const AUTO_MIN_MS = 1400
  const AUTO_MAX_MS = 4800
  const MIN_GAP_MS = 1000

  // 突風
  const gustTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isGustingRef = useRef(false)

  // 円の現在位置/目標位置
  const holePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const holeTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const holeRadiusRef = useRef<number>(0)

  // hero 中央（viewport）
  const getHeroCenterLocalPos = () => {
    const host = heroRef.current
    if (!host) return { x: 0, y: 0 }
    const r = host.getBoundingClientRect()
    return { x: r.width / 2, y: r.height / 2 }
  }

  // hero の下端（page 座標）— ground 用
  const getHeroBottomPageY = () => {
    const host = heroRef.current
    if (!host) return window.scrollY + window.innerHeight
    const r = host.getBoundingClientRect()
    return r.bottom + window.scrollY
  }

  // 初期スポーン（端末別オフセット）
  const getInitialSpawnPos = () => {
    const cen = getHeroCenterLocalPos()
    const off = isMobileLike() ? INIT_OFFSET_MOBILE : INIT_OFFSET_DESKTOP
    return { x: cen.x + off.x, y: cen.y + off.y }
  }

  // 円中心の page 座標（文字発射原点）
  const getHolePagePos = () => {
    const host = heroRef.current
    if (!host) return { x: holePosRef.current.x, y: holePosRef.current.y } // フォールバック
    const r = host.getBoundingClientRect()
    const heroTop = r.top + window.scrollY
    const heroLeft = r.left + window.scrollX
    return {
      x: heroLeft + holePosRef.current.x,
      y: heroTop + holePosRef.current.y,
    }
  }

  // vmin→半径(px)
  const computeHoleRadiusPx = () => {
    const vmin = Math.min(window.innerWidth, window.innerHeight)
    const diamVmin = isMobileLike() ? HOLE_DIAMETER_VMIN_MOBILE : HOLE_DIAMETER_VMIN
    return (diamVmin * vmin) / 100 / 2
  }

  // --- スケジューラ ---
  const scheduleNextAutoBlast = () => {
    if (document.hidden) return
    if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current)
    const wait = Math.floor(Math.random() * (AUTO_MAX_MS - AUTO_MIN_MS + 1)) + AUTO_MIN_MS
    autoTimeoutRef.current = setTimeout(() => triggerBlast(), wait)
  }

  const triggerBlast = () => {
    const now = performance.now()
    if (now - lastBlastAtRef.current < MIN_GAP_MS) return
    lastBlastAtRef.current = now
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

    // 物理ボディ生成
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
        matterRefs.current.engine && Matter.World.add(matterRefs.current.engine.world, newBody)

        // 初速
        const forceMagnitudeY = -0.05
        const forceMagnitudeX = (Math.random() - 0.5) * 0.3
        Matter.Body.applyForce(newBody, newBody.position, {
          x: forceMagnitudeX,
          y: forceMagnitudeY,
        })
        Matter.Body.setAngularVelocity(newBody, (Math.random() - 0.5) * 0.2)

        // TTL
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

  // 突風
  const scheduleNextGustBlast = () => {
    if (document.hidden) return
    if (gustTimeoutRef.current) clearTimeout(gustTimeoutRef.current)
    const wait = Math.floor(Math.random() * (GUST_MAX_MS - GUST_MIN_MS + 1)) + GUST_MIN_MS
    gustTimeoutRef.current = setTimeout(() => triggerGustBlast(), wait)
  }

  const triggerGustBlast = () => {
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

  useEffect(() => {
    if (!heroRef.current) return

    // 半径と初期位置
    holeRadiusRef.current = computeHoleRadiusPx()
    const init = getInitialSpawnPos()
    holePosRef.current = { ...init }
    holeTargetRef.current = { ...init }

    // 背景画像
    const scope = scopeBgRef.current
    if (scope) {
      scope.style.backgroundImage = `url("${SCOPE_BG_URL}")`
      scope.style.backgroundSize = 'contain'
      scope.style.backgroundPosition = 'center'
      scope.style.pointerEvents = 'none'
      scope.style.zIndex = String(Z_SCOPE_BG)
      scope.style.position = 'absolute'
      scope.style.inset = '0'
    }

    // Matter.js セットアップ
    const engine = Matter.Engine.create()
    const runner = Matter.Runner.create()
    engine.world.gravity.y = 1.2

    // ★ ground を hero の下端に配置
    const ground = Matter.Bodies.rectangle(
      window.innerWidth / 2,
      getHeroBottomPageY() + 50,
      window.innerWidth * 2,
      100,
      { isStatic: true },
    )
    Matter.World.add(engine.world, [ground])
    Matter.Runner.run(runner, engine)
    matterRefs.current.engine = engine
    matterRefs.current.runner = runner
    matterRefs.current.ground = ground

    // ground 再配置（vh 変化・レイアウト変化）
    const updateGround = () => {
      if (!matterRefs.current.ground) return
      Matter.Body.setPosition(matterRefs.current.ground, {
        x: window.innerWidth / 2,
        y: getHeroBottomPageY() + 50,
      })
      Matter.Body.setVertices(
        matterRefs.current.ground!,
        Matter.Vertices.fromPath(
          `${-window.innerWidth},-50 ${window.innerWidth},-50 ${window.innerWidth},50 ${-window.innerWidth},50`,
          matterRefs.current.ground!,
        ),
      )
    }

    const onClick = () => triggerBlast()

    const onResize = () => {
      holeRadiusRef.current = computeHoleRadiusPx()
      updateGround()
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
        scheduleNextAutoBlast()
        scheduleNextGustBlast()
      }
    }

    heroRef.current.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisChange)

    // 初回スケジュール
    scheduleNextAutoBlast()
    scheduleNextGustBlast()

    // ====== ループ ======
    let rafId = 0
    const BURST_DURATION = 1.2
    const AFTER_DURATION = 4.0

    const tick = () => {
      rafId = requestAnimationFrame(tick)

      const pos = holePosRef.current
      const target = holeTargetRef.current

      // 追従は固定ターゲットへ LERP のみ
      pos.x += (target.x - pos.x) * FOLLOW_LERP
      pos.y += (target.y - pos.y) * FOLLOW_LERP

      const nowSec = performance.now() / 1000
      const timeSinceBlast = blastStartAt.current >= 0 ? nowSec - blastStartAt.current : Infinity

      // 膨張パルス
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
        wrap.style.position = 'absolute'
        wrap.style.top = '0'
        wrap.style.left = '0'
        wrap.style.width = '0'
        wrap.style.height = '0'
        wrap.style.pointerEvents = 'none'
      }

      // モバイル/デスクトップ切替
      const DIAM_VMIN = isMobileLike() ? HOLE_DIAMETER_VMIN_MOBILE : HOLE_DIAMETER_VMIN
      const BORDER_PX = isMobileLike() ? HOLE_BORDER_PX_MOBILE : HOLE_BORDER_PX

      // リング
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

      // スコープ画像の穴
      const scope = scopeBgRef.current
      if (scope) {
        const clip = `circle(${r}px at ${pos.x}px ${pos.y}px)`
        ;(scope.style as any).clipPath = clip
        ;(scope.style as any).webkitClipPath = clip
      }

      // Matter DOM 同期
      const heroRect = heroRef.current?.getBoundingClientRect()
      const heroTop = (heroRect?.top || 0) + window.scrollY
      const heroLeft = (heroRect?.left || 0) + window.scrollX
      Object.keys(matterRefs.current.bodies).forEach((idStr) => {
        const id = Number(idStr)
        const body = matterRefs.current.bodies[id]
        const el = matterRefs.current.elements[id]
        if (!body || !el) return
        const { x, y } = body.position
        const angle = body.angle
        el.style.transform = `translate(${x - heroLeft - el.clientWidth / 2}px, ${y - heroTop - el.clientHeight / 2}px) rotate(${angle}rad)`
      })

      // 画面外クリーン
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

      // フェーズ更新
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
      heroRef.current?.removeEventListener('click', onClick as any)
      window.removeEventListener('resize', onResize as any)
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
      matterRefs.current.ground = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    height: 'calc(95vh)',
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
      {/* スコープ：背景画像（clip-path） */}
      <div
        ref={scopeBgRef}
        className="absolute inset-0 opacity-30"
        style={{
          zIndex: Z_SCOPE_BG,
          backgroundImage: `url("${SCOPE_BG_URL}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
        }}
      />
      {/* テキスト */}
      <div className="absolute inset-0 font-semibold antialiased">
        <div
          className="absolute left-1/2 top-1/2 pointer-events-none translate-y-24 lg:-translate-y-1/2 lg:-translate-x-0 -translate-x-1/2"
          style={{ zIndex: Z_TEXT }}
        >
          <h1 className="font-zenKakuGothicAntique text-nowrap text-4xl leading-snug text-center lg:text-left sm:text-5xl md:text-6xl lg:text-7xl lg:leading-normal">
            組織を
            <br className="hidden lg:block" />
            率いる人を、
            <br />
            1人にさせない。
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
          position: 'absolute',
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
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: 'transparent',
            pointerEvents: 'none',
            willChange: 'transform, box-shadow',
            boxShadow: holeBoxShadow,
          }}
        />
      </div>

      {/* 飛び散る文字 */}
      {words.map((word) => (
        <div
          key={word.id}
          ref={(el) => {
            matterRefs.current.elements[word.id] = el
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 40,
            color: '#000',
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
