'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import type { Product, Media } from '@/payload-types'

// --- Types & Utilities ---

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

// --- Animation Components ---

// 1. Miru (See) - Scanning / Optical
const MiruBackground = ({ color = '#06b6d4' }: { color?: string }) => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Radial Gradient Pulse */}
    <motion.div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(circle at center, ${color}30 0%, transparent 70%)`,
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    />

    {/* Large Rotating Ring */}
    <motion.div
      className="absolute top-1/2 left-1/2 border-2 rounded-full"
      style={{
        width: 'min(80vw, 80vh)',
        height: 'min(80vw, 80vh)',
        borderColor: `${color}20`,
        borderStyle: 'dashed',
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
    />

    {/* Counter-Rotating Ring */}
    <motion.div
      className="absolute top-1/2 left-1/2 border rounded-full"
      style={{
        width: 'min(60vw, 60vh)',
        height: 'min(60vw, 60vh)',
        borderColor: `${color}30`,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ rotate: -360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
    />

    {/* Scanning Line */}
    <motion.div
      className="absolute w-full h-[8px]"
      style={{
        top: '50%',
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        boxShadow: `0 0 30px ${color}`,
      }}
      animate={{
        top: ['0%', '100%'],
        opacity: [0, 1, 0],
      }}
      transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
    />

    {/* Grid */}
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `linear-gradient(to right, ${color}44 1px, transparent 1px), linear-gradient(to bottom, ${color}44 1px, transparent 1px)`,
        backgroundSize: '6rem 6rem',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, #000 60%, transparent 100%)',
      }}
    />
  </motion.div>
)

const MiruCardBg = ({ color = '#06b6d4' }: { color?: string }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Outer Ring */}
    <motion.div
      className="absolute inset-0 border-2 rounded-full"
      style={{
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        borderColor: `${color}40`,
        borderStyle: 'dashed',
      }}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />
    {/* Middle Ring (Counter-rotating) */}
    <motion.div
      className="absolute border-2 rounded-full"
      style={{
        top: '-25%',
        left: '-25%',
        width: '150%',
        height: '150%',
        borderColor: `${color}50`,
      }}
      animate={{ rotate: -360 }}
      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
    />
    {/* Inner Pulsing Circle */}
    <motion.div
      className="absolute top-1/2 left-1/2 rounded-full"
      style={{
        width: '60%',
        height: '60%',
        backgroundColor: `${color}20`,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    />
    {/* Scanning Line */}
    <motion.div
      className="absolute top-1/2 left-1/2 w-[150%] h-[4px]"
      style={{
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        translateX: '-50%',
        translateY: '-50%',
        boxShadow: `0 0 10px ${color}`,
      }}
      animate={{ rotate: [0, 360] }}
      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
    />
  </div>
)

// 2. Kiku (Listen) - Waveforms / Resonance
const KikuBackground = ({ color = '#9333ea' }: { color?: string }) => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Ripples */}
    {[...Array(5)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute top-1/2 left-1/2 rounded-full border"
        style={{
          translateX: '-50%',
          translateY: '-50%',
          borderColor: `${color}60`,
        }}
        initial={{ width: 0, height: 0, opacity: 0.8, borderWidth: 4 }}
        animate={{
          width: ['0vw', '120vw'],
          height: ['0vw', '120vw'],
          opacity: [0.8, 0],
          borderWidth: [4, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: i * 0.6,
          ease: 'easeOut',
        }}
      />
    ))}
    {/* Equalizer Bars (Abstract) */}
    <div className="absolute bottom-0 left-0 right-0 h-96 flex items-end justify-center gap-3 opacity-30">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="w-6 rounded-t-lg"
          style={{ backgroundColor: color }}
          animate={{ height: ['10%', '90%', '10%'] }}
          transition={{
            duration: 0.8 + Math.random() * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  </motion.div>
)

const KikuCardBg = ({ color = '#9333ea' }: { color?: string }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none flex items-center justify-center gap-3">
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="w-6 sm:w-8 rounded-full"
        style={{ backgroundColor: color }}
        initial={{ height: '20%', opacity: 0.2 }}
        animate={{
          height: ['20%', '70%', '20%'],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          delay: i * 0.15,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
)

// 3. Ageru (Launch) - Speed / Particles
const AgeruBackground = ({ color = '#f97316' }: { color?: string }) => (
  <motion.div
    className="absolute inset-0 overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {/* Particles */}
    {[...Array(80)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          width: Math.random() * 4 + 2,
          height: Math.random() * 30 + 10,
          backgroundColor: color,
        }}
        initial={{ top: '110%', opacity: 0 }}
        animate={{
          top: '-20%',
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: Math.random() * 0.8 + 0.4,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: 'linear',
        }}
      />
    ))}
    {/* Speed Lines */}
    <div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(ellipse at bottom, ${color}30, transparent 70%)`,
      }}
    />
  </motion.div>
)

const AgeruCardBg = ({ color = '#f97316' }: { color?: string }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[2px]"
        style={{
          left: `${Math.random() * 100}%`,
          height: `${Math.random() * 40 + 20}%`,
          backgroundColor: `${color}60`,
        }}
        initial={{ top: '100%' }}
        animate={{ top: '-60%' }}
        transition={{
          duration: Math.random() * 1 + 0.5,
          repeat: Infinity,
          delay: Math.random(),
          ease: 'linear',
        }}
      />
    ))}
  </div>
)

// --- Main Component ---

export const OverviewProducts: React.FC<Props> = ({ products, mainLogo }) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [hoveredColor, setHoveredColor] = useState<string | undefined>(undefined)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 895)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const selectProductAndScroll = (productKey: string) => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      const OFFSET = isMobile ? 80 : 160
      const y = aboutSection.getBoundingClientRect().top + window.scrollY + OFFSET
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    window.dispatchEvent(new CustomEvent('sosikio:select-product', { detail: productKey }))
  }

  // Helper to map product animation field to theme
  const getTheme = (product: Product) => {
    const anim = (product as any).animation
    if (anim === 'miru') return 'miru'
    if (anim === 'kiku') return 'kiku'
    if (anim === 'ageru') return 'ageru'
    return 'default'
  }

  // Determine which background to show on PC
  const renderBackground = () => {
    switch (hoveredProduct) {
      case 'miru':
        return <MiruBackground key="miru-bg" color={hoveredColor} />
      case 'kiku':
        return <KikuBackground key="kiku-bg" color={hoveredColor} />
      case 'ageru':
        return <AgeruBackground key="ageru-bg" color={hoveredColor} />
      default:
        return (
          <motion.div
            key="default-bg"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]" />
          </motion.div>
        )
    }
  }

  return (
    <section className="relative w-full pt-32 py-20 overflow-hidden bg-transparent text-slate-900">
      {/* Global Background (PC Only) */}
      {!isMobile && (
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">{renderBackground()}</AnimatePresence>
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 pointer-events-none" />
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 bg-white py-3 bg-opacity-50" id="products">
          <h2 className="text-3xl lg:text-5xl font-bold mb-3 flex md:flex-row items-center justify-center md:gap-4">
            {mainLogo && (
              <img
                src={getMediaUrl(mainLogo)}
                alt="SOSIKIO"
                className="h-20 md:h-24 lg:h-28 object-contain object-center"
              />
            )}
            <span className="text-slate-800 text-left text-xl md:text-3xl">Core Services</span>
          </h2>
          <p className="text-slate-600 text-base lg:text-lg max-w-2xl mx-auto mb-3">
            組織を「ミル」、組織を「キク」、
            <br className="lg:hidden" />
            そして組織を「アゲル」。
            <br />
            3つの力が、あなたの組織を加速させる。
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => {
            const productKey = (product as any).productId || product.id?.toString() || ''
            const theme = getTheme(product)
            const mainColor = product.mainColor || '#000'
            // Use bgColor class if available, otherwise default to white.
            // But user requested "white background" for cards, so we stick to bg-white.
            // We can use bgColor for subtle accents if needed, but let's follow the "white cards" rule strictly.

            return (
              <motion.div
                key={product.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-lg"
                onHoverStart={() => {
                  setHoveredProduct(theme)
                  setHoveredColor(mainColor)
                }}
                onHoverEnd={() => {
                  setHoveredProduct(null)
                  setHoveredColor(undefined)
                }}
                whileHover={{
                  y: -10,
                  boxShadow: `0 20px 40px -10px gray`,
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Mobile Card Background */}
                {isMobile && (
                  <div className="absolute inset-0 z-0 opacity-30">
                    {theme === 'miru' && <MiruCardBg color={mainColor} />}
                    {theme === 'kiku' && <KikuCardBg color={mainColor} />}
                    {theme === 'ageru' && <AgeruCardBg color={mainColor} />}
                  </div>
                )}

                <div className="relative z-10 p-8 flex flex-col items-center text-center h-full">
                  {/* Icon / Logo */}
                  <div
                    className="mb-6 p-4 rounded-full bg-white border shadow-sm transition-all duration-500 group-hover:scale-110"
                    style={{
                      borderColor: `${mainColor}30`,
                      boxShadow: `0 0 20px ${mainColor}20`,
                    }}
                  >
                    {product.logo ? (
                      <img
                        src={getMediaUrl(product.logo as CmsMedia)}
                        alt={product.name}
                        className="h-20 w-20 object-contain"
                      />
                    ) : (
                      <div className="h-20 w-20 rounded-full bg-slate-100" />
                    )}
                  </div>

                  <h3
                    className="text-3xl font-bold mb-2 font-zenKakuGothicAntique tracking-wider"
                    style={{ color: mainColor }}
                  >
                    {(product as any).tagline || product.name}
                  </h3>

                  {product.image && (
                    <div className="w-full h-40 sm:h-48 my-6 rounded-xl overflow-hidden shadow-md">
                      <img
                        src={getMediaUrl(product.image as CmsMedia)}
                        alt={product.catchphrase ?? ''}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <p className="text-lg font-bold mb-3">{product.catchphrase}</p>

                  <div className="grow">
                    <p className="text-slate-600 text-base leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <button
                    onClick={() => selectProductAndScroll(productKey)}
                    className="mt-8 px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 text-white transition-all hover:opacity-90 hover:gap-3"
                    style={{ backgroundColor: mainColor }}
                  >
                    {product.productId}
                    の詳細を見る
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
