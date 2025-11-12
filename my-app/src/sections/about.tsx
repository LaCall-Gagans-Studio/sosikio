'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { ArrowRight, X } from 'lucide-react'

import {
  Product,
  ProductId,
  PointDetail,
  AboutContent,
  FeatureDetail,
  ProcessStep,
} from '../app/(frontend)/data_products'

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
// PointDetailModal (レスポンシブ最適化)
// ========================
const PointDetailModal: React.FC<{ point: PointDetail; onClose: () => void }> = ({
  point,
  onClose,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm font-zenKakuGothicAntique"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${point.title} の詳細`}
      >
        <motion.div
          initial={{ scale: 0.95, y: 12 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 12 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          // モバイルで全幅に近い / タブレット以降は最大幅を広げる
          className="bg-white rounded-lg w-full max-w-lg sm:max-w-2xl md:max-w-3xl overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 画像高さを画面サイズに応じて段階調整 */}
          <img
            src={point.image}
            alt={point.title}
            className="w-full h-44 sm:h-56 md:h-64 object-cover"
          />
          <div className="p-5 sm:p-7 md:p-8">
            <h3 className="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight">
              {point.title}
            </h3>
            <p className="mt-3 sm:mt-4 text-gray-700 leading-relaxed text-base sm:text-lg">
              {point.description}
            </p>
          </div>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 sm:p-2.5 rounded-lg bg-black/20 text-white hover:bg-black/40 transition"
            aria-label="閉じる"
          >
            <X size={22} className="sm:hidden" />
            <X size={24} className="hidden sm:block" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ========================
// ProductAboutPage（レスポンシブ強化）
// ========================
const ProductAboutPage: React.FC<{ product: Product; allProducts: Product[] }> = ({
  product,
  allProducts,
}) => {
  const [modalPoint, setModalPoint] = useState<PointDetail | null>(null)

  return (
    <>
      <AnimatePresence>
        {modalPoint && <PointDetailModal point={modalPoint} onClose={() => setModalPoint(null)} />}
      </AnimatePresence>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. about_hero */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center"
        >
          <div className="text-left flex flex-col justify-center">
            <div className="pl-2 sm:pl-4">
              <img
                src={`/mats/logo/${product.logo}`}
                className="h-28 sm:h-36 md:h-44 object-contain object-bottom"
                alt={`${product.name} ロゴ`}
              />
            </div>

            <p
              className={`mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${product.mainColor} pl-2 sm:pl-4`}
            >
              {product.tagline}
            </p>

            <h3 className="mt-6 sm:mt-10 md:mt-16 text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 tracking-tight pl-2 sm:pl-4">
              {product.catchphrase}
            </h3>

            <p className="mt-4 sm:mt-6 text-gray-700 leading-relaxed sm:leading-loose text-base sm:text-lg font-medium pl-2 sm:pl-4">
              {product.description}
            </p>
          </div>

          <motion.div
            className="w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-square rounded-lg sm:rounded-lg shadow-xl overflow-hidden group border border-gray-100"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </motion.div>
        </motion.div>

        {/* 2. about_main */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-40 mx-auto text-center"
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl font-black rounded-lg tracking-tighter text-white ${product.bgColor_light} text-center leading-tight px-3 py-2 inline-block`}
          >
            {product.about.main.heading_en}
          </h2>
          <h3 className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight text-gray-800 text-center mt-3 sm:mt-4">
            {product.about.main.heading_jp}
          </h3>
          <p className="mt-6 sm:mt-8 text-base sm:text-lg md:text-xl max-w-3xl mx-auto text-gray-700 leading-relaxed sm:leading-loose whitespace-pre-wrap px-1">
            {product.about.main.text}
          </p>
        </motion.section>

        {/* 3. about_process */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-40"
        >
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter text-gray-900 leading-none">
              {product.about.process.title_en}
            </h2>
            <p
              className={`text-base sm:text-xl md:text-2xl font-semibold rounded-lg w-11/12 sm:w-4/5 md:w-1/2 mx-auto text-white mt-2 sm:mt-3 ${product.bgColor_light} px-3 py-1.5`}
            >
              {product.about.process.title_jp}
            </p>
          </div>

          {/* 列数: 1 → 2 → 3 */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
            {product.about.process.steps.map((step, i) => (
              <div
                key={i}
                className="relative text-left p-6 sm:p-7 md:p-8 bg-white rounded-lg border border-gray-200"
              >
                <div
                  className={`text-5xl sm:text-6xl md:text-7xl font-black ${product.mainColor} mb-3 sm:mb-4`}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                  {step.title_en}
                </h3>
                <p className="text-lg sm:text-xl font-bold text-gray-800">{step.title_jp}</p>
                <p className="mt-3 sm:mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 4. about_features */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 md:mt-24 lg:mt-40"
        >
          <div className="text-center w-auto">
            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-9xl font-black tracking-tighter text-gray-900 leading-tight">
              {product.about.features.title_en}
            </h2>
            <p
              className={`text-base sm:text-xl md:text-2xl font-semibold rounded-lg w-11/12 sm:w-4/5 md:w-1/2 mx-auto text-white mt-2 sm:mt-3 ${product.bgColor_light} px-3 py-1.5`}
            >
              {product.about.features.title_jp}
            </p>
          </div>

          <div className="mt-12 sm:mt-16 md:mt-20 space-y-14 sm:space-y-16 md:space-y-20">
            {product.about.features.items.map((feature, i) => (
              <div
                key={i}
                className={`grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center ${
                  i % 2 !== 0 ? 'md:grid-flow-row-dense' : ''
                }`}
              >
                <motion.div
                  className={`w-full aspect-[16/10] md:aspect-video rounded-lg sm:rounded-lg shadow-lg overflow-hidden border border-gray-100 ${
                    i % 2 !== 0 ? 'md:col-start-2' : ''
                  }`}
                >
                  <img
                    src={feature.image}
                    alt={feature.title_jp}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <div className="text-left">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tighter leading-tight">
                    <span className={`${product.bgColor_light} pr-2`}>{feature.title_en}</span>
                  </h3>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 mt-3">
                    {feature.title_jp}
                  </p>
                  <p className="mt-3 sm:mt-4 md:mt-5 text-gray-700 leading-relaxed text-base sm:text-lg">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 8. about_link (CTA) */}
        <motion.section
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`relative mt-16 sm:mt-20 md:mt-24 lg:mt-40 text-center ${product.bgColor_light} text-white p-8 sm:p-12 md:p-16 lg:p-20 rounded-lg overflow-hidden`}
        >
          <div className="absolute inset-0 -z-10" />
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">
            {product.about.cta.title_en}
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2">
            {product.about.cta.title_jp}
          </h3>
          <p className="mt-4 sm:mt-6 max-w-3xl mx-auto text-base sm:text-lg text-gray-100 leading-relaxed px-2">
            {product.about.cta.description}
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="mt-6 sm:mt-8 px-7 sm:px-9 md:px-10 py-3.5 sm:py-4 bg-white text-gray-900 font-bold rounded-lg text-base sm:text-lg shadow-lg"
          >
            <span className={`${product.mainColor} font-bold`}>{product.about.cta.buttonText}</span>
            <ArrowRight className="inline-block ml-2" />
          </motion.button>
        </motion.section>
      </div>
    </>
  )
}

// ========================
// AboutSection（セレクターをモバイル最適化）
// ========================
export const AboutSection: React.FC<{ products: Product[] }> = ({ products }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const [direction, setDirection] = useState(0)

  const handleSetActiveIndex = (index: number) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  useEffect(() => {
    const listener = (e: Event) => {
      const pid = (e as CustomEvent<ProductId>).detail
      const index = products.findIndex((p) => p.id === pid)
      if (index >= 0) handleSetActiveIndex(index)
    }
    window.addEventListener('sosikio:select-product', listener as EventListener)
    return () => window.removeEventListener('sosikio:select-product', listener as EventListener)
  }, [products])

  return (
    <section
      className="relative py-10 sm:py-12 md:py-16 px-4 transition-colors duration-500 ease-in-out overflow-hidden"
      id="about"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{ background: products[activeIndex].gradient }}
        transition={{ duration: 1.5, ease: 'easeInOut' }}
      />

      {/* プロダクト選択（横スクロール可） */}
      <div className="container mx-auto mb-10 sm:mb-12 md:mb-16">
        <div className="flex justify-center">
          <div className="flex items-center p-1 sm:p-1.5 rounded-lg bg-white/70 gap-2 shadow-md overflow-x-auto max-w-full">
            {products.map((p, index) => {
              const isActive = activeIndex === index
              return (
                <button
                  key={p.id}
                  onClick={() => handleSetActiveIndex(index)}
                  aria-pressed={isActive}
                  className="relative shrink-0 px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-bold transition-colors duration-300 z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                >
                  {isActive && (
                    <motion.div
                      layoutId="product-selector-bg"
                      className="absolute inset-0 bg-white rounded-lg shadow-md"
                      transition={{ type: 'spring', stiffness: 350, damping: 35 }}
                    />
                  )}
                  <span
                    className={`relative block text-center ${
                      isActive ? products[activeIndex].mainColor : 'text-gray-600'
                    }`}
                  >
                    <p className="text-base sm:text-lg md:text-2xl font-bold mb-1 tracking-tight">
                      {p.tagline}
                    </p>
                    <img
                      src={`/mats/logo/${p.logo}`}
                      className="h-7 sm:h-8 md:h-10 w-auto mx-auto"
                      alt={`${p.name} ロゴ`}
                    />
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
              className="w-full bg-white rounded-lg p-5 sm:p-6 md:p-8 lg:p-12 shadow-2xl border border-gray-100"
            >
              <ProductAboutPage product={products[activeIndex]} allProducts={products} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
