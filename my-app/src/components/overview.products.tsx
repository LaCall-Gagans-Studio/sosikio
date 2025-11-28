'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Product, Media } from '@/payload-types'

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
  mainLogo?: CmsMedia
}

export const OverviewProducts: React.FC<Props> = ({ products, mainLogo }) => {
  const selectProductAndScroll = (productKey: string) => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      const isMobile = window.innerWidth < 768
      const OFFSET = isMobile ? 80 : 160
      const y = aboutSection.getBoundingClientRect().top + window.scrollY + OFFSET
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    window.dispatchEvent(new CustomEvent('sosikio:select-product', { detail: productKey }))
  }

  return (
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
          {mainLogo && (
            <img
              src={getMediaUrl(mainLogo)}
              alt="SOSIKIO Concept"
              className="w-4/5 h-auto lg::h-16 lg:max-w-52 lg:w-auto object-contain"
            />
          )}
          を構成する3つのコアサービス
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 font-medium whitespace-pre-wrap">
          「データで組織を<b>ミル</b>」　
          <br className="lg:hidden" />
          「会議を<b>キク</b>」　 「対話で<b>アゲル</b>」
          <br className="" />
          明日から始められる
          <br className="lg:hidden" />
          即効性にこだわった 3 つのサービス
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
    </motion.div>
  )
}
