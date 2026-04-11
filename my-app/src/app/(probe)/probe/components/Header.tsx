'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuLinks = [
    { name: 'Top', href: '#' },
    { name: 'プロセス', href: '#process' },
    { name: '導入事例', href: '#story' },
    { name: '機能', href: '#features' },
    { name: 'お問い合わせ', href: '#contact' },
  ]

  return (
    <>
      <header className="fixed top-0 w-full z-[110] bg-transparent pt-8 px-6 md:px-12 flex justify-end">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="px-8 py-2.5 border-[1.5px] border-black rounded-full text-black bg-white/70 backdrop-blur-sm hover:bg-white transition-colors shadow-sm relative z-[120]"
        >
          <span className="font-semibold tracking-wider text-sm md:text-base">
            {isMenuOpen ? 'CLOSE' : 'MENU'}
          </span>
        </button>
      </header>

      {/* Slide-up Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed bottom-0 left-0 w-full z-[105] bg-white rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] overflow-hidden"
              style={{ height: 'auto', minHeight: '40vh' }}
            >
              <div className="max-w-7xl mx-auto px-8 md:px-16 py-12 md:py-16 flex flex-col md:flex-row justify-between items-center gap-12">
                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 md:gap-12">
                  {menuLinks.map((link, i) => (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="text-2xl md:text-4xl font-black text-slate-900 border-b-4 border-transparent hover:border-[#d7145b] transition-all pb-1 "
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>

                {/* Big CTA in Menu */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="w-full md:w-auto"
                >
                  <button className="group w-full md:w-auto bg-[#d7145b] text-white px-10 py-6 md:px-16 md:py-8 rounded-full flex flex-col items-center md:items-start shadow-2xl hover:bg-[#b5104a] transition-all hover:scale-105 active:scale-95">
                    <span className="text-xs md:text-sm font-bold opacity-80 mb-1">
                      今すぐチームを可視化する
                    </span>
                    <span className="text-2xl md:text-3xl font-black ">
                      <a
                        href="https://main.dr5lrenz9l9vu.amplifyapp.com/trial/register"
                        className="flex items-center gap-3 text-nowrap"
                      >
                        無料トライアル{' '}
                        <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
                      </a>
                    </span>
                  </button>
                </motion.div>
              </div>

              {/* Bottom Decoration */}
              <div className="h-4 bg-gradient-to-r from-[#d7145b] to-[#ff8e53] w-full mt-4"></div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
