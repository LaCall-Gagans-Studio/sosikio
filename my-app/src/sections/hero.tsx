'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import Matter from 'matter-js'
import { FileText } from 'lucide-react'

interface HeroSectionProps {
  keywords: string[]
  title: React.ReactNode
  containerHeight?: string
  wordFontWeight?: React.CSSProperties['fontWeight']
}

const SCOPE_BG_URL = 'mats/hero_bg.webp'

// --- kazaHole（円）サイズ/挙動 ---
const HOLE_DIAMETER_VMIN = 50
const HOLE_BORDER_PX = 20
const HOLE_DIAMETER_VMIN_MOBILE = 65
const HOLE_BORDER_PX_MOBILE = 12
const HOLE_DIAMETER_VMIN_TABLET = 40
const HOLE_BORDER_PX_TABLET = 15

const FOLLOW_LERP = 0.2

const Z_SCOPE_BG = 10
const Z_RING = 20
const Z_TEXT = 30

// 突風設定
const GUST_MIN_MS = 8000
const GUST_MAX_MS = 16000
const GUST_FORCE = 0.115
const GUST_UP_FORCE = 0.01
const GUST_DURATION_MS = 1500
const GUST_TARGET_Y = 0.75
const GUST_SPEED_THRESHOLD = 1.2

// 判定ロジックをinnerWidthベースでも使えるように補助（初期値用）
const isMobileDevice = () =>
  (typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(pointer:coarse)').matches) ||
  (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent))

export const HeroSection = ({
  keywords,
  title,
  containerHeight = 'calc(95vh)',
  wordFontWeight = '100',
}: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null)
  const [isImageReady, setIsImageReady] = useState(false)

  const holeWrapperRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const scopeBgRef = useRef<HTMLDivElement>(null)

  const [words, setWords] = useState<{ id: number; text: string }[]>([])

  // Matter.js 関連参照
  const matterRefs = useRef<{
    engine: Matter.Engine | null
    runner: Matter.Runner | null
    ground: Matter.Body | null
    bodies: { [id: number]: Matter.Body }
    elements: { [id: number]: HTMLDivElement | null }
  }>({ engine: null, runner: null, ground: null, bodies: {}, elements: {} })

  // フェーズ管理
  const [phase, setPhase] = useState<'idle' | 'burst' | 'after'>('idle')
  const phaseRef = useRef<'idle' | 'burst' | 'after'>('idle')
  const blastStartAt = useRef<number>(-1)

  const autoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastBlastAtRef = useRef<number>(0)
  const AUTO_MIN_MS = 1400
  const AUTO_MAX_MS = 4800
  const MIN_GAP_MS = 1000

  const gustTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isGustingRef = useRef(false)

  // 円の位置・サイズ管理
  const holePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const holeTargetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const holeRadiusRef = useRef<number>(0)

  // ユーティリティ: ground位置計算
  const getHeroBottomPageY = () => {
    const host = heroRef.current
    if (!host) return window.scrollY + window.innerHeight
    const r = host.getBoundingClientRect()
    return r.bottom + window.scrollY
  }

  // ユーティリティ: 発射位置（Page座標）
  const getHolePagePos = () => {
    const host = heroRef.current
    if (!host) return { x: holePosRef.current.x, y: holePosRef.current.y }
    const r = host.getBoundingClientRect()
    const heroTop = r.top + window.scrollY
    const heroLeft = r.left + window.scrollX
    return {
      x: heroLeft + holePosRef.current.x,
      y: heroTop + holePosRef.current.y,
    }
  }

  // ユーティリティ: サイズ計算 (レスポンシブ対応のため引数で判定も可能に)
  // ユーティリティ: サイズ計算
  const computeHoleRadiusPx = () => {
    // 画面の短い辺を基準にする
    const vmin = Math.min(window.innerWidth, window.innerHeight)
    const w = window.innerWidth

    // 💡【修正】幅に応じたサイズ定義の振り分け
    let targetVmin = HOLE_DIAMETER_VMIN

    if (w < 430) {
      // 430px未満: モバイル（大きめ）
      targetVmin = HOLE_DIAMETER_VMIN_MOBILE
    } else if (w < 1024) {
      // 🆕 430px〜1024px未満: タブレット・大型スマホ（小さくする）
      targetVmin = HOLE_DIAMETER_VMIN_TABLET
    } else {
      // 895px以上: デスクトップ
      targetVmin = HOLE_DIAMETER_VMIN
    }

    return (targetVmin * vmin) / 100 / 2
  }

  // --- スケジューラ (変更なし) ---
  const scheduleNextAutoBlast = () => {
    if (document.hidden || keywords.length === 0) return
    if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current)
    const wait = Math.floor(Math.random() * (AUTO_MAX_MS - AUTO_MIN_MS + 1)) + AUTO_MIN_MS
    autoTimeoutRef.current = setTimeout(() => triggerBlast(), wait)
  }

  const triggerBlast = useCallback(() => {
    if (keywords.length === 0) return

    const now = performance.now()
    if (now - lastBlastAtRef.current < MIN_GAP_MS) return
    lastBlastAtRef.current = now
    blastStartAt.current = performance.now() / 1000

    const numToSpawn = Math.floor(Math.random() * 3) + 2
    const newWords: { id: number; text: string }[] = []
    for (let i = 0; i < numToSpawn; i++) {
      const randomWord = keywords[Math.floor(Math.random() * keywords.length)]
      const newWordId = Date.now() + Math.random() * (i + 1)
      newWords.push({ id: newWordId, text: randomWord })
    }
    setWords((prev) => [...prev, ...newWords])

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

        const forceMagnitudeY = -0.05
        const forceMagnitudeX = (Math.random() - 0.5) * 0.3
        Matter.Body.applyForce(newBody, newBody.position, {
          x: forceMagnitudeX,
          y: forceMagnitudeY,
        })
        Matter.Body.setAngularVelocity(newBody, (Math.random() - 0.5) * 0.2)

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
  }, [keywords])

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

  // --- 初期化 & レイアウト更新ロジック ---
  useEffect(() => {
    if (!heroRef.current || keywords.length === 0) return

    // Matter.js 初期化
    const engine = Matter.Engine.create()
    const runner = Matter.Runner.create()
    engine.world.gravity.y = 1.2

    // ground配置
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

    // 背景画像の初期設定
    const scope = scopeBgRef.current
    if (scope) {
      scope.style.backgroundImage = `url("${SCOPE_BG_URL}")`
      scope.style.backgroundSize = 'cover'
      scope.style.backgroundPosition = 'center'
      scope.style.pointerEvents = 'none'
      scope.style.zIndex = String(Z_SCOPE_BG)
      scope.style.position = 'absolute'
      scope.style.inset = '0'
    }

    // 💡【修正点】レイアウト更新関数（初期化時 & リサイズ時に呼ぶ）
    const updateLayout = (isInit = false) => {
      if (!heroRef.current) return

      // 1. 円の半径を更新
      holeRadiusRef.current = computeHoleRadiusPx()

      // 2. ターゲット位置（中心座標）の計算
      const rect = heroRef.current.getBoundingClientRect()
      const centerX = rect.width / 2
      const centerY = rect.height / 2

      // Tailwindの 'lg' ブレークポイント (1024px) に合わせて配置戦略を変更
      const isDesktopLayout = window.innerWidth >= 1024

      let targetX = centerX
      let targetY = centerY

      if (isDesktopLayout) {
        // デスクトップ: テキストが左寄り(left-1/2)になるので、円は左側の空きスペースへ
        // 例: コンテナ幅の20%分左へずらす (固定値 -300px の代わり)
        // 必要に応じて係数(0.2)を調整してください
        targetX = centerX - rect.width * 0.22
        targetY = centerY // 垂直方向は中央
      } else {
        // モバイル/タブレット: テキストが中央配置なので、円を少し上へ
        // 例: コンテナ高さの15%分上へ (固定値 -100px の代わり)
        targetX = centerX
        targetY = centerY - rect.height * 0.15
      }

      holeTargetRef.current = { x: targetX, y: targetY }

      // 初期化時のみ、現在位置も強制的にターゲット位置へ（アニメーションなしで配置）
      if (isInit) {
        holePosRef.current = { x: targetX, y: targetY }
      }

      // 3. Ground位置の更新
      if (matterRefs.current.ground) {
        Matter.Body.setPosition(matterRefs.current.ground, {
          x: window.innerWidth / 2,
          y: getHeroBottomPageY() + 50,
        })
        Matter.Body.setVertices(
          matterRefs.current.ground,
          Matter.Vertices.fromPath(
            `${-window.innerWidth},-50 ${window.innerWidth},-50 ${window.innerWidth},50 ${-window.innerWidth},50`,
            matterRefs.current.ground,
          ),
        )
      }
    }

    const onClick = () => triggerBlast()

    // リサイズハンドラ
    const onResize = () => {
      updateLayout(false) // アニメーションしながら移動
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

    heroRef.current.addEventListener('click', onClick as any)
    window.addEventListener('resize', onResize as any)
    document.addEventListener('visibilitychange', onVisChange as any)

    // 初回レイアウト計算
    updateLayout(true)

    // スケジューリング開始
    scheduleNextAutoBlast()
    scheduleNextGustBlast()

    setIsImageReady(true)

    // ====== アニメーションループ ======
    let rafId = 0
    const BURST_DURATION = 1.2
    const AFTER_DURATION = 4.0

    const tick = () => {
      rafId = requestAnimationFrame(tick)

      const pos = holePosRef.current
      const target = holeTargetRef.current

      // 目標位置へ追従（ウィンドウリサイズでtargetが変わると自動で移動します）
      pos.x += (target.x - pos.x) * FOLLOW_LERP
      pos.y += (target.y - pos.y) * FOLLOW_LERP

      const nowSec = performance.now() / 1000
      const timeSinceBlast = blastStartAt.current >= 0 ? nowSec - blastStartAt.current : Infinity

      let pulseScale = 1
      if (timeSinceBlast < 1.0) {
        const progress = timeSinceBlast / 1.0
        const blastEffect = Math.exp(-progress * 5.0) * Math.sin(progress * Math.PI * 3.0)
        pulseScale = 1.0 + blastEffect * 0.5
      }

      // ラッパー更新
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
        wrap.style.willChange = 'transform'
      }

      // サイズ計算 (Mobile判定)
      const w = window.innerWidth
      let currentDiamVmin = HOLE_DIAMETER_VMIN
      let currentBorderPx = HOLE_BORDER_PX

      if (w < 430) {
        // モバイル
        currentDiamVmin = HOLE_DIAMETER_VMIN_MOBILE
        currentBorderPx = HOLE_BORDER_PX_MOBILE
      } else if (w < 1024) {
        // 🆕 中間サイズ
        currentDiamVmin = HOLE_DIAMETER_VMIN_TABLET
        currentBorderPx = HOLE_BORDER_PX_TABLET
      } else {
        // デスクトップ
        currentDiamVmin = HOLE_DIAMETER_VMIN
        currentBorderPx = HOLE_BORDER_PX
      }

      const ring = ringRef.current
      const r = holeRadiusRef.current

      if (ring) {
        ring.style.transform = `translate(-50%, -50%) scale(${pulseScale})`
        // 決定したVMINを使用
        ring.style.width = `${currentDiamVmin}vmin`
        ring.style.height = `${currentDiamVmin}vmin`
        ring.style.borderRadius = '50%'
        // 決定したBorderを使用
        ring.style.border = `${currentBorderPx}px solid #000`
        ring.style.background = 'transparent'
        ring.style.pointerEvents = 'none'
        ring.style.willChange = 'transform, box-shadow'

        // ... boxShadow アニメーション（変更なし）...
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
          inset 0 0 0 ${currentBorderPx}px #000,
          10px 10px 20px rgba(0,0,0,0.3),
          ${blueX}px ${blueY}px ${blur}px rgba(0,220,255,0.85),
          ${pinkX}px ${pinkY}px ${blur}px rgba(255,0,150,0.8),
          ${orangeX}px ${orangeY}px ${blur}px rgba(255,180,0,0.8)
        `
        // ✅ INP修正: setStateを使わず直接DOMに書き込む（毎フレームの再レンダリングを防ぐ）
        ring.style.boxShadow = newBoxShadow
      }

      // スコープ画像の穴更新
      const scope = scopeBgRef.current
      if (scope) {
        const clip = `circle(${r}px at ${pos.x}px ${pos.y}px)`
        ;(scope.style as any).clipPath = clip
        ;(scope.style as any).webkitClipPath = clip
      }

      // Matter Bodies 位置同期
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

    return () => {
      cancelAnimationFrame(rafId)
      heroRef.current?.removeEventListener('click', onClick as any)
      window.removeEventListener('resize', onResize as any)
      document.removeEventListener('visibilitychange', onVisChange as any)
      if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current)
      if (gustTimeoutRef.current) clearTimeout(gustTimeoutRef.current)

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
  }, [keywords, triggerBlast]) // eslint-disable-line react-hooks/exhaustive-deps

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#f1f1f1',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    // SSRから即座に高さを確保（CSS クラスはhydration後に適用されるためCLSが発生する）
    minHeight: 'max(100svh, 800px)',
  }

  return (
    <div ref={heroRef} style={containerStyle} className="relative hero-container">
      {/* 下地 */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 0,
          background: 'linear-gradient(to bottom, #ffffff 0%, #f7f7f7 35%, #f1f1f1 100%)',
        }}
      />
      {/* スコープ：背景画像 */}
      <div
        ref={scopeBgRef}
        className="absolute inset-0"
        style={{
          opacity: isImageReady ? 0.3 : 0,
          transition: 'opacity 0.5s ease-in-out',
          zIndex: Z_SCOPE_BG,
          backgroundImage: `url("${SCOPE_BG_URL}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: 'none',
        }}
      />
      {/* テキスト */}
      <div className="absolute pointer-events-none inset-0 font-semibold antialiased">
        <div
          className="absolute left-1/2 bottom-32 lg:bottom-1/2 pointer-events-none translate-y-24 lg:translate-y-1/2 lg:-translate-x-0 -translate-x-1/2"
          style={{ zIndex: Z_TEXT }}
        >
          {/* titleは propsで渡ってくるので、ここで表示 */}

          <h1 className="font-zenKakuGothicAntique text-nowrap text-4xl leading-snug text-center lg:text-left sm:text-5xl md:text-5xl lg:text-7xl lg:leading-normal">
            {title}
          </h1>
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg text-center lg:text-left leading-relaxed font-zenKakuGothicNew">
            組織を率いるリーダーと現場を <br className="lg:hidden" />
            「データと対話」でつなぎ、
            <br />
            行動変容を促すプラットフォーム <br className="lg:hidden" />{' '}
            <span className="font-extrabold text-white mt-2 lg:mt-0 bg-black px-2 py-0 inline-block">
              SOSIKIO
            </span>
          </p>
          <div className="mt-8 text-center lg:text-left pointer-events-auto">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-[#d81e5c] text-lg text-white font-zenKakuGothicNew font-bold py-3 px-8 rounded-lg shadow-lg hover:opacity-80 transition duration-300"
            >
              <FileText className="mr-2 w-5 h-5" />
              今すぐ資料請求する
            </a>
          </div>
        </div>
      </div>

      {/* kazaHoleリング */}
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
            // ✅ INP修正: boxShadowはrAFで直接DOMに適用するため初期値のみ設定
            boxShadow: `inset 0 0 0 ${HOLE_BORDER_PX}px #000`,
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
            fontWeight: wordFontWeight,
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
