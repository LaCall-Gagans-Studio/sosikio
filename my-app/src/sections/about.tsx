// src/sections/about.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import type { Product as CmsProduct, Media } from '@/payload-types'

// ===== 型 & ヘルパー =====

type CmsMedia = Media | string | null | undefined

const getMediaUrl = (media: CmsMedia): string => {
  if (!media) return ''
  if (typeof media === 'string') return media
  return media.url ?? ''
}

type ProductId = string

// --- 汎用アニメーション設定 ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

// ========================
// ImageModal
// ========================
const ImageModal = ({ src, onClose }: { src: string; onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-full max-h-full flex flex-col items-center justify-center"
      >
        <img
          src={src}
          alt="Full size"
          className="max-w-full max-h-[90vh] object-contain rounded-md"
        />
        <button
          className="absolute -top-12 right-0 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <X size={32} />
        </button>
      </motion.div>
    </motion.div>,
    document.body,
  )
}

// ========================
// ProductAboutPage
// ========================
const ProductAboutPage: React.FC<{ product: CmsProduct }> = ({ product }) => {
  // about が未設定の場合のガード
  const about = product.about
  const main = about?.main
  const process = about?.process
  const features = about?.features
  const cta = about?.cta

  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. about_hero */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center"
        >
          <div className="text-left flex flex-col justify-center">
            <div className="pl-2 sm:pl-4">
              {product.logo && (
                <img
                  src={getMediaUrl(product.logo as CmsMedia)}
                  className="h-28 sm:h-36 md:h-44 object-contain object-bottom"
                  alt={`${product.name} ロゴ`}
                />
              )}
            </div>

            <p
              className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight pl-2 sm:pl-4`}
              style={{ color: product.mainColor ?? undefined }}
            >
              {product.tagline}
            </p>

            <h3 className="mt-6 sm:mt-10 md:mt-16 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight pl-2 sm:pl-4">
              {product.catchphrase}
            </h3>

            <p className="mt-4 sm:mt-6 text-gray-800 leading-relaxed sm:leading-loose text-lg sm:text-xl font-medium pl-2 sm:pl-4">
              {product.description}
            </p>
          </div>

          <motion.div
            className="w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-square rounded-lg sm:rounded-lg shadow-xl overflow-hidden group border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {product.image && (
              <img
                src={getMediaUrl(product.image as CmsMedia)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>
        </motion.div>

        {/* 2. about_main */}
        {main && (
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24 mx-auto text-center"
          >
            <h2
              className={`text-3xl sm:text-4xl md:text-5xl font-black rounded-lg tracking-tighter text-white  text-center leading-tight px-3 py-2 inline-block`}
              style={{ backgroundColor: product.mainColor ?? undefined }}
            >
              {main.heading_en}
            </h2>
            <h3 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-gray-800 text-center mt-3 sm:mt-4">
              {main.heading_jp}
            </h3>
            <p className="mt-5 sm:mt-6 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-800 font-medium leading-relaxed sm:leading-loose whitespace-pre-wrap px-1">
              {main.text}
            </p>
          </motion.section>
        )}

        {/* 3. about_process */}
        {process && (
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
          >
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-6xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter text-gray-900 leading-none">
                {process.title_en}
              </h2>
              <p
                className={`text-base sm:text-xl md:text-2xl font-semibold rounded-lg w-11/12 sm:w-4/5 md:w-1/2 mx-auto text-white mt-2 sm:mt-3 px-3 py-1.5`}
                style={{ backgroundColor: product.mainColor ?? undefined }}
              >
                {process.title_jp}
              </p>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {(process.steps ?? []).map((step, i) => (
                <div
                  key={i}
                  className="relative text-left p-6 sm:p-7 md:p-8 bg-white rounded-lg border border-gray-200"
                >
                  <div
                    className={`text-6xl md:text-7xl font-black  mb-3 sm:mb-4`}
                    style={{ color: product.mainColor ?? undefined }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                    {step.title_en}
                  </h3>
                  <p className="text-xl font-bold text-gray-800">{step.title_jp}</p>
                  <p className="mt-3 text-gray-800 text-base sm:text-lg leading-relaxed font-medium">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 4. about_features */}
        {features && (
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-12 sm:mt-16 md:mt-20 lg:mt-24"
          >
            <div className="text-center w-auto">
              <h2 className="text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter text-gray-900 leading-tight">
                {features.title_en}
              </h2>
              <p
                className={`text-base sm:text-xl md:text-2xl font-semibold rounded-lg w-11/12 sm:w-4/5 md:w-1/2 mx-auto text-white mt-2 sm:mt-3  px-3 py-1.5`}
                style={{ backgroundColor: product.mainColor ?? undefined }}
              >
                {features.title_jp}
              </p>
            </div>

            <div className="mt-10 sm:mt-12 md:mt-16 space-y-10 sm:space-y-12 md:space-y-16">
              {(features.items ?? []).map((feature, i) => {
                const imgUrl = getMediaUrl(feature.image as CmsMedia)
                return (
                  <div
                    key={i}
                    className={`grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center ${
                      i % 2 !== 0 ? 'md:grid-flow-row-dense' : ''
                    }`}
                  >
                    <motion.div
                      className={`w-full aspect-[16/10] md:aspect-video rounded-lg sm:rounded-lg shadow-lg overflow-hidden border border-gray-100 cursor-pointer ${
                        i % 2 !== 0 ? 'md:col-start-2' : ''
                      }`}
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      onClick={() => setSelectedImage(imgUrl)}
                    >
                      {feature.image && (
                        <img
                          src={imgUrl}
                          alt={feature.title_jp ?? ''}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </motion.div>

                    <div className="text-left">
                      <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight">
                        <span
                          className={` pr-2`}
                          style={{ backgroundColor: product.mainColor ?? undefined }}
                        >
                          {feature.title_en}
                        </span>
                      </h3>
                      <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-3">
                        {feature.title_jp}
                      </p>
                      <p className="mt-3 sm:mt-4 md:mt-5 text-gray-800 font-medium leading-relaxed text-lg sm:text-xl whitespace-pre-wrap">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.section>
        )}

        {/* 8. about_link (CTA) */}
        {cta && (
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`relative mt-12 sm:mt-16 md:mt-20 lg:mt-24 text-center  text-white p-6 sm:p-10 md:p-12 lg:p-16 rounded-lg overflow-hidden`}
            style={{ backgroundColor: product.mainColor ?? undefined }}
          >
            <div className="absolute inset-0 -z-10" />
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter">
              {cta.title_en}
            </h2>
            <h3 className="text-base md:text-4xl font-bold mt-2">{cta.title_jp}</h3>
            <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-white font-medium leading-relaxed px-2">
              {cta.description}
            </p>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-6 sm:mt-8 px-7 sm:px-9 md:px-10 py-3.5 mx-auto sm:py-4 bg-white flex items-center text-gray-900 font-bold rounded-lg text-sm sm:text-lg shadow-lg flex-nowrap"
            >
              <span
                className={`font-bold`}
                style={{ color: product.mainColor ?? undefined }}
                onClick={(e) => {
                  const el = document.getElementById('trial')
                  if (el) {
                    e.preventDefault()
                    const y = el.getBoundingClientRect().top + window.scrollY - 100
                    window.scrollTo({ top: y, behavior: 'smooth' })
                  }
                }}
              >
                {cta.buttonText}
              </span>
              <ArrowRight className="inline-block ml-2" />
            </motion.button>
          </motion.section>
        )}
        <AnimatePresence>
          {selectedImage && (
            <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

// ========================
// AboutSection
// ========================
export const AboutSection: React.FC<{ products: CmsProduct[] }> = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [direction, setDirection] = useState(0)

  // ここで hooks は必ず呼ぶ
  useEffect(() => {
    if (!products || products.length === 0) return

    const listener = (e: Event) => {
      const pid = (e as CustomEvent<ProductId>).detail
      const index = products.findIndex((p) => p.productId === pid)
      if (index >= 0) {
        setDirection(index > activeIndex ? 1 : -1)
        setActiveIndex(index)
      }
    }

    window.addEventListener('sosikio:select-product', listener as EventListener)
    return () => window.removeEventListener('sosikio:select-product', listener as EventListener)
  }, [products, activeIndex])

  // products が空なら何も表示しない
  if (!products || products.length === 0) {
    return null
  }

  const handleSetActiveIndex = (index: number) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const activeProduct = products[activeIndex]

  return (
    <section
      className="relative py-10 sm:py-12 md:py-16 px-4 transition-colors duration-500 ease-in-out overflow-hidden"
      id="about"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ background: activeProduct.mainColor ?? '' }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* プロダクト選択（横スクロール可） */}
      <div className="container mx-auto mb-8 sm:mb-10 md:mb-12">
        <div className="flex flex-col items-center justify-center">
          {/* 改善点1: ラベルを追加して操作を促す */}
          <p className="text-xs text-gray-500 mb-2 font-bold flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-black animate-pulse"></span>
            表示するサービスを切り替え
          </p>

          <div className="grid grid-cols-3 items-center p-1 sm:p-1.5 rounded-xl bg-gray-100/80 gap-2 shadow-inner overflow-x-auto max-w-full border border-white/40">
            {products.map((p, index) => {
              const isActive = activeIndex === index
              return (
                <button
                  key={p.id}
                  onClick={() => handleSetActiveIndex(index)}
                  aria-pressed={isActive}
                  // 改善点2: cursor-pointerの明示と、未選択時のスタイル（hover:scaleなど）を強化
                  className={`
              relative shrink-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-bold 
              transition-all duration-300 z-10 
              focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
              cursor-pointer select-none
              ${isActive ? '' : 'hover:bg-white/60 hover:shadow-md hover:scale-[1.02] active:scale-95'}
            `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="product-selector-bg"
                      // 改善点3: アクティブな背景に強いシャドウを入れて「選ばれている感」を出す
                      className="absolute inset-0 rounded-lg shadow-lg text-white ring-1 ring-black/5"
                      transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                      style={{ backgroundColor: p.mainColor ?? undefined }}
                    >
                      {/* 改善点4: 下向きの三角などを入れて「下のコンテンツと繋がっている」ことを示唆する手もあり */}
                      {/* <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-inherit rotate-45"></div> */}
                    </motion.div>
                  )}

                  <span
                    className={`relative block text-center flex flex-col items-center justify-center gap-1 ${
                      isActive ? 'bg-opacity-5' : 'bg-opacity-20 opacity-70 hover:opacity-100' // 未選択は少し薄くしてメリハリをつける
                    }`}
                    style={{ color: isActive ? 'white' : p.mainColor }}
                  >
                    <p className="text-sm md:text-2xl font-bold tracking-tight lg:px-0 text-nowrap">
                      {p.tagline}
                    </p>
                    {p.logo && (
                      <img
                        src={getMediaUrl(p.logo as CmsMedia)}
                        className="h-7 sm:h-8 md:h-10 w-auto object-contain drop-shadow-sm" // ロゴにも影を少し入れる
                        alt={`${p.name} ロゴ`}
                      />
                    )}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* メイン */}
      <div className="container mx-auto px-0 sm:px-2 md:px-4 relative">
        <div className="mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ x: direction > 0 ? '100%' : '-100%', opacity: 0 }}
              animate={{ x: '0%', opacity: 1 }}
              exit={{ x: direction < 0 ? '100%' : '-100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="w-full bg-white rounded-lg p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-100"
            >
              <ProductAboutPage product={activeProduct} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
