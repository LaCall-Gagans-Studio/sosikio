'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link' // ← 追加
import { Product } from '../app/(frontend)/data_products'
import { Testimonial } from '../app/(frontend)/data_testimonials'
import { clientLogos, featuredArticles } from '@/app/(frontend)/data_articles'
import { allTestimonials } from '../app/(frontend)/data_testimonials'
import { products } from '../app/(frontend)/data_products'

// --- 汎用アニメーション設定 ---
const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
}

interface ArchiveSectionProps {
  products: Product[]
  allTestimonials: Testimonial[]
}

export const ArchiveSection: React.FC<ArchiveSectionProps> = ({ products, allTestimonials }) => {
  return (
    <section id="archive" className="bg-white">
      {/* 1. archive_logo */}
      <div className="py-16 sm:py-20 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
              導入企業
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-600">
              業界をリードする多くの企業様にご利用いただいています。
            </p>
          </div>

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-2 xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12 items-center"
          >
            {clientLogos.map((src, index) => (
              <motion.img
                key={index}
                src={src}
                alt={`Client ${index + 1}`}
                className="mx-auto h-8 sm:h-10 w-auto grayscale opacity-60"
                transition={{ duration: 0.3 }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. archive_fb - お客様の声 */}
      <div className="py-16 sm:py-20 md:py-32 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-12 md:mb-16 flex flex-col sm:flex-row items-start sm:items-end sm:justify-between gap-4">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                お客様の声
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-gray-600">
                SOSIKIOは、業界を問わず多くの企業様にご導入いただいています。
              </p>
            </div>
            {/* もっと見る（お客様の声） */}
            <Link
              href={{ pathname: '/articles', query: { section: 'testimonials' } }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              もっと見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {allTestimonials.slice(0, 6).map((item, i) => (
              <motion.div
                key={i}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="bg-white/50 rounded-lg shadow-lg p-6 sm:p-8 backdrop-blur-sm border relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-sky-200/50 rounded-lg blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-orange-200/50 rounded-lg blur-3xl translate-y-1/2 -translate-x-1/2" />

                <div className="flex items-start gap-4">
                  <img
                    src={item.avatarUrl}
                    alt={item.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover border-4 border-black shadow-md"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.products.map((prodId) => {
                        const product = products.find((p) => p.id === prodId)
                        if (!product) return null
                        return (
                          <span
                            key={prodId}
                            className={`px-2 py-0.5 text-xs font-bold rounded-lg ${product.mainColor} ${product.bgColor}`}
                          >
                            {product.id}
                          </span>
                        )
                      })}
                    </div>
                    <p className="mt-2 text-sm sm:text-base text-gray-600 italic relative z-10">
                      ”{item.quote}”
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-4 justify-end border-t pt-4">
                  <div className="text-right">
                    <p className="font-bold text-sm sm:text-base">{item.name}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{item.title}</p>
                  </div>
                  <img src={item.logoUrl} alt={item.company} className="h-6 sm:h-8 w-auto" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. archive_article - お役立ち資料・コラム */}
      <div className="py-16 sm:py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-8 sm:mb-12 md:mb-16 flex flex-col sm:flex-row items-start sm:items-end sm:justify-between gap-4">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">
                お役立ち資料・コラム
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl text-base sm:text-lg text-gray-600">
                組織開発に役立つ最新情報や、導入事例を公開しています。
              </p>
            </div>
            {/* もっと見る（お役立ち資料） */}
            <Link
              href={{ pathname: '/articles', query: { section: 'resources' } }}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors"
            >
              もっと見る
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredArticles.map((item) => (
              <motion.div
                key={item.slug}
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden group"
              >
                <div className="w-full h-44 sm:h-48 md:h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 sm:p-6">
                  <span className="text-xs sm:text-sm font-bold text-sky-600">
                    {item.type === 'voice' ? 'お客様の声' : 'コラム'}
                  </span>
                  <h3 className="mt-2 text-base sm:text-lg font-bold min-h-12 sm:min-h-14">
                    {item.title}
                  </h3>
                  <Link
                    href={`/articles/${item.slug}`}
                    className="mt-4 inline-flex items-center font-semibold text-gray-800 hover:text-black"
                  >
                    続きを読む
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M5 12h14M13 5l7 7-7 7"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
