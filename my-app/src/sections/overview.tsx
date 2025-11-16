// src/sections/overview.tsx
'use client'

import React from 'react'
import { useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { getIconComponent } from '@/components/getIconComponent'
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

  const selectProductAndScroll = (productKey: string) => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      const OFFSET = 200
      const y = aboutSection.getBoundingClientRect().top + window.scrollY + OFFSET
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    window.dispatchEvent(new CustomEvent('sosikio:select-product', { detail: productKey }))
  }

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
            <h1 className="font-zenKakuGothicAntique text-[clamp(2.25rem,6vw,4.5rem)]">
              {titleHighlight}
            </h1>

            <div className="flex flex-row items-center mt-4 sm:mt-6 gap-2 sm:gap-3">
              <span className="text-xl lg:text-3xl font-zenKakuGothicAntique [writing-mode:vertical-rl]">
                それが
              </span>
              {hero?.mainLogo && (
                <img
                  src={getMediaUrl(hero.mainLogo as CmsMedia)}
                  className="h-16 sm:h-24 md:h-28 lg:h-32 sm:ml-3"
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
        <motion.div
          id="products"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12 sm:mb-16 mt-16 sm:mt-20 md:mt-24 lg:mt-28 max-w-9xl w-auto mx-auto rounded-lg px-4 sm:px-6 py-6 sm:py-8 bg-white">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              {hero?.mainLogo && (
                <img
                  src={getMediaUrl(hero.mainLogo as CmsMedia)}
                  alt="SOSIKIO Concept"
                  className="h-12 sm:h-14 md:h-16"
                />
              )}
              を構成する3つのコアサービス
            </h2>
            <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 font-medium">
              「データで組織を<b>ミル</b>」　「会議を<b>キク</b>」　「対話で<b>アゲル</b>」
              <br className="hidden md:block" />
              明日から始められる即効性にこだわった 3 つのサービス
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => {
              const productKey = (product as any).productId || product.id?.toString() || ''

              return (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -6, boxShadow: '0 18px 40px -10px rgba(0,0,0,0.15)' }}
                  className={`p-6 sm:p-8 bg-white rounded-lg shadow-lg border border-gray-100 flex flex-col items-center text-center ${
                    (product as any).bgColor ?? ''
                  } relative overflow-hidden group`}
                >
                  <div
                    className={`absolute -top-16 -right-16 w-40 sm:w-48 h-40 sm:h-48 opacity-10 rounded-full blur-2xl transition-transform duration-500 group-hover:scale-125`}
                    style={{ backgroundColor: product.mainColor ?? undefined }}
                  />
                  <div className="z-10 w-full mb-4 sm:mb-6">
                    <p
                      className={`font-bold text-2xl sm:text-3xl mb-3 sm:mb-5 font-zenKakuGothicAntique `}
                      style={{ color: product.mainColor ?? undefined }}
                    >
                      {(product as any).tagline}
                    </p>
                    {product.logo && (
                      <img
                        src={getMediaUrl(product.logo as CmsMedia)}
                        alt={product.name}
                        className="mx-auto h-14 sm:h-16 md:h-20 object-contain"
                      />
                    )}
                  </div>

                  <motion.div
                    className="w-full h-40 sm:h-48 mb-4 sm:mb-6 z-10"
                    layoutId={`product-image-${product.id}`}
                  >
                    {product.image && (
                      <img
                        src={getMediaUrl(product.image as CmsMedia)}
                        alt={product.catchphrase ?? ''}
                        className="rounded-xl w-full h-full object-cover shadow-md"
                      />
                    )}
                  </motion.div>

                  <div className="z-10 flex-grow">
                    <h4 className="text-base sm:text-lg font-semibold text-gray-900 my-3 sm:my-4">
                      {product.catchphrase}
                    </h4>
                    <p className="mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <button
                    onClick={() => selectProductAndScroll(productKey)}
                    className={`mt-5 sm:mt-6 text-base sm:text-lg font-bold text-white rounded-lg px-4 sm:px-5 py-2 hover:opacity-80 transition-opacity flex items-center justify-center group/button z-10 w-full sm:w-auto`}
                    style={{ backgroundColor: product.mainColor ?? undefined }}
                  >
                    {productKey || product.name} の詳細を見る
                    <ArrowRight className="w-5 h-5 ml-2 group-hover/button:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )
            })}
          </div>

          {/* WHY SOSIKIO */}
          {strengths.length > 0 && (
            <div className="mt-16 sm:mt-20 md:mt-28 text-center relative overflow-hidden p-6 sm:p-8 md:p-12 rounded-lg py-16 bg-black sm:py-20 md:py-24 border border-slate-700 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-rose-500/5 to-cyan-500/5 -z-10" />
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter text-white ">
                WHY SOSIKIO
              </h2>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white mb-6 sm:mb-8 md:mb-10">
                SOSIKIOだけの強み
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
                {strengths.map((s, i) => {
                  const Icon = getIconComponent((s as any).icon)

                  return (
                    <div
                      key={i}
                      className="group rounded-xl border border-slate-700/60 bg-white/5 backdrop-blur-sm p-5 sm:p-6 md:p-7 hover:bg-white/7 transition"
                    >
                      {s.badge && (
                        <div className="mb-3">
                          <span className="shrink-0 rounded-md bg-emerald-400/15 text-emerald-200 mb-3 px-2.5 py-1 text-[13px] font-semibold border border-emerald-400/30">
                            {s.badge}
                          </span>
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-white/10">
                            <Icon className="h-6 w-6 text-white" aria-hidden />
                          </span>
                          <h3 className="text-lg sm:text-lg lg:text-xl font-semibold text-white leading-snug">
                            <span className="text-black bg-white px-1 py-1">{s.title}</span>
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-base text-white">{s.description}</p>

                      <ul className="mt-4 space-y-2.5">
                        {(s.points ?? []).map((p, idx) => (
                          <li key={idx} className="flex gap-2 text-white text-sm lg:text-base">
                            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
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

const getHighlightedTitle = (title: string): React.ReactNode[] => {
  const parts: React.ReactNode[] = []
  // [[...]] パターンをキャプチャする正規表現
  const regex = /(\[\[.*?\]\])/g
  let lastIndex = 0

  title.replace(regex, (match, highlightedPart, index) => {
    // 1. ハイライト前の通常テキストを追加
    if (index > lastIndex) {
      parts.push(title.substring(lastIndex, index))
    }

    // 2. ハイライト部分のテキスト (記号 [[ ]] を除く) を追加
    const textToHighlight = highlightedPart.slice(2, -2)
    parts.push(
      <span key={index} className="bg-slate-900 text-white p-0.5  whitespace-nowrap">
        {textToHighlight}
      </span>,
    )

    lastIndex = index + match.length
    return match
  })

  // 3. 最後の通常テキストを追加
  if (lastIndex < title.length) {
    parts.push(title.substring(lastIndex))
  }

  return parts
}
