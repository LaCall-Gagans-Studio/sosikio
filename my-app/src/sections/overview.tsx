// src/sections/overview.tsx
'use client'

import React from 'react'
import { useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { getIconComponent } from '@/components/getIconComponent'
import { OverviewProducts } from '@/components/overview.products'
import type { Product, Overview as OverviewType, Media } from '@/payload-types'

// --- 汎用アニメーション設定 ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

type CmsMedia = Media | string | null | undefined
const getMediaUrl = (media: CmsMedia): string => {
  if (!media) return ''
  if (typeof media === 'string') return media
  return media.url ?? ''
}

type Props = {
  products: Product[]
  overview: OverviewType
}

export const OverviewSection: React.FC<Props> = ({ products, overview }) => {
  const hero = overview.hero
  const logos = overview.clientLogos ?? []
  const strengths = overview.strengths ?? []
  const titleHighlight = useMemo(() => {
    return getHighlightedTitle(hero?.title ?? '組織を読み解き、翻訳する')
  }, [hero?.title])

  return (
    <section className="bg-white" id="overview">
      <div className="py-16 sm:py-20 lg:py-32 relative isolate">
        {/* HERO */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col justify-center items-center text-center">
            <h1 className="font-zenKakuGothicAntique whitespace-pre-wrap text-[clamp(2.25rem,6vw,4.5rem)]">
              {titleHighlight}
            </h1>

            <div className="flex flex-row items-center mt-4 sm:mt-6 gap-2 sm:gap-3">
              <span className="text-xl lg:text-3xl font-zenKakuGothicAntique md:[writing-mode:vertical-rl] ">
                それが
              </span>
              {hero?.mainLogo && (
                <img
                  src={getMediaUrl(hero.mainLogo as CmsMedia)}
                  className="h-16 sm:h-24 md:h-28 lg:h-32 xl:h-44 sm:ml-3"
                  alt="SOSIKIO"
                />
              )}
            </div>

            <p className="mt-6 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto px-2 text-gray-800 whitespace-pre-wrap">
              {hero?.subtitle ??
                '「組織の課題は、なんとなく分かっている。\nでも、どこから手をつければ…」\nSOSIKIOは、そんな漠然とした不安を「確信」に変えるプラットフォームです。'}
            </p>

            <div className="mt-10 sm:mt-12 flex flex-row gap-3 md:gap-6 text-base sm:text-lg duration-300">
              <Link
                href={hero?.ctaPrimaryHref || '#about'}
                onClick={(e) => {
                  // #about のときだけスクロールハンドリング
                  if (!hero?.ctaPrimaryHref || hero.ctaPrimaryHref === '#about') {
                    const el = document.getElementById('about')
                    if (el) {
                      e.preventDefault()
                      const y = el.getBoundingClientRect().top + window.scrollY - 80
                      window.scrollTo({ top: y, behavior: 'smooth' })
                    }
                  }
                }}
                className="p-3 sm:p-4 rounded-lg text-black border border-black hover:bg-black hover:text-white duration-300"
              >
                {hero?.ctaPrimaryLabel || 'サービスを見る'}
              </Link>
              <Link
                href={hero?.ctaSecondaryHref || '/philosophy'}
                className="p-3 sm:p-4 rounded-lg text-white bg-black border border-black hover:text-black hover:bg-white/60 duration-300"
              >
                {hero?.ctaSecondaryLabel || 'SOSIKIOを知る'}
              </Link>
            </div>
          </div>
        </motion.div>

        {/* 背景 */}
        <div
          className="
            absolute inset-0 -z-10 pointer-events-none
            bg-[linear-gradient(to_bottom,white_0%,transparent_60%),url(https://plus.unsplash.com/premium_photo-1742642385305-2df74e349a3f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=715)]
            bg-cover bg-center bg-no-repeat
            after:absolute after:inset-0 after:bg-white/60
            after:content-['']
          "
          id="overview"
        />
        <div className="absolute inset-0 -z-10 pointer-events-none bg-white/30" />

        {/* ロゴスライダー */}
        {logos.length > 0 && (
          <div className="pt-8 sm:pt-10 md:pt-16 mt-10 sm:mt-12">
            <div
              className="w-full inline-flex flex-nowrap overflow-hidden"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              }}
            >
              <ul className="flex items-center justify-center md:justify-start [&_li]:mx-6 sm:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll">
                {logos.map((logo, index) => (
                  <li key={index}>
                    <img
                      src={getMediaUrl(logo.image as CmsMedia)}
                      alt={logo.name ?? ''}
                      className="h-6 sm:h-8 md:h-10 w-auto grayscale opacity-70"
                    />
                  </li>
                ))}
              </ul>
              <ul
                className="flex items-center justify-center md:justify-start [&_li]:mx-6 sm:[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll"
                aria-hidden="true"
              >
                {logos.map((logo, index) => (
                  <li key={`duplicate-${index}`}>
                    <img
                      src={getMediaUrl(logo.image as CmsMedia)}
                      alt={logo.name ?? ''}
                      className="h-6 sm:h-8 md:h-10 w-auto grayscale opacity-70"
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* 各プロダクト */}
        <OverviewProducts products={products} mainLogo={hero?.mainLogo as CmsMedia} />

        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        >
          {/* WHY SOSIKIO */}
          {strengths.length > 0 && (
            <div className="mt-16 sm:mt-20 md:mt-28 text-center relative overflow-hidden p-6 sm:p-8 md:p-12 rounded-lg py-16 bg-white sm:py-20 md:py-24 border border-slate-200 shadow-2xl">
              {/* 背景グラデーションは少し透明度を調整して馴染ませるか、そのまま維持 */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 via-rose-100/30 to-cyan-100/30 -z-10" />
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-wide text-slate-900 ">
                WHY SOSIKIO
              </h2>
              <h2 className="text-2xl mt-2 sm:text-3xl md:text-4xl font-bold tracking-normal text-slate-900 mb-6 sm:mb-8 md:mb-10">
                SOSIKIOだけの強み
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 text-left">
                {strengths.map((s, i) => {
                  const Icon = getIconComponent((s as any).icon)

                  return (
                    <div
                      key={i}
                      // カード: 白背景ベースに見やすい薄いグレー、ホバーで少し濃く
                      className="group rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6 md:p-7 hover:bg-slate-100 transition"
                    >
                      {s.badge && (
                        <div className="mb-5">
                          {/* バッジ: エメラルドの色味を濃く調整 */}
                          <span className="shrink-0 rounded-md bg-emerald-100 text-emerald-800 mb-3 px-2.5 py-1 text-[13px] font-semibold border border-emerald-200">
                            {s.badge}
                          </span>
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {/* アイコン背景: 薄い黒透過に変更 */}
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-slate-900">
                            <Icon className="h-6 w-6 text-slate-100" aria-hidden />
                          </span>
                          <h3 className="text-lg sm:text-lg lg:text-xl font-semibold text-slate-900 leading-snug">
                            {/* タイトル強調: 反転して黒背景に白文字 */}
                            <span className="text-white bg-slate-900 px-1 py-1 text-nowrap md:text-wrap xl:text-nowrap whitespace-pre-wrap">
                              {s.title}
                            </span>
                          </h3>
                        </div>
                      </div>

                      {/* 説明文: 濃いグレー */}
                      <p className="mt-4 text-base text-slate-600">{s.description}</p>

                      <ul className="mt-4 space-y-2.5">
                        {(s.points ?? []).map((p, idx) => (
                          // リストアイテム: 濃いグレー
                          <li key={idx} className="flex gap-2 text-slate-700 text-sm lg:text-base">
                            <ShieldCheck
                              className="mt-2 h-4 w-4 shrink-0 text-emerald-800 font-bold"
                              aria-hidden
                            />
                            <span>{p.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export const getHighlightedTitle = (title: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = []

  // 修正点①: \\n (文字としての\n) もパイプ | で追加してキャプチャする
  // (\[\[.*?\]\]|\\n|\n)
  // ※ \\n は正規表現文字列内ではバックスラッシュをエスケープするため \\\\n と書く必要がありますが、
  //   リテラル正規表現 /.../ では \\n で「バックスラッシュ+n」を意味します。
  const regex = /(\[\[.*?\]\]|\\n|\n)/g

  let lastIndex = 0

  title.replace(regex, (match, captured, index) => {
    // 1. 通常テキストを追加
    if (index > lastIndex) {
      parts.push(title.substring(lastIndex, index))
    }

    // 2. マッチした内容に応じた処理
    // 修正点②: 文字列としての '\\n' も改行扱いにする
    if (match === '\n' || match === '\\n') {
      parts.push(<br key={index} className="lg:hidden" />)
    } else {
      // [[...]] の場合
      const textToHighlight = match.slice(2, -2)
      parts.push(
        <span key={index} className="bg-slate-900 text-white p-0.5 whitespace-nowrap">
          {textToHighlight}
        </span>,
      )
    }

    lastIndex = index + match.length
    return match
  })

  // 3. 残りのテキストを追加
  if (lastIndex < title.length) {
    parts.push(title.substring(lastIndex))
  }

  return parts
}
