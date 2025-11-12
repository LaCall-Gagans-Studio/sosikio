'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Twitter, Linkedin, Youtube, ArrowRight } from 'lucide-react'
import { Logo } from '@/components/Logo'

export function Footer() {
  const year = new Date().getFullYear()
  const router = useRouter()
  const pathname = usePathname()

  // 固定ヘッダ分オフセットしてスムーススクロール
  const scrollToId = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const OFFSET = 80
    const y = el.getBoundingClientRect().top + window.scrollY - OFFSET
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  // 他ページでもアンカー対応
  const handleClick = (url: string) => {
    if (url.startsWith('#')) {
      const id = url.slice(1)
      if (pathname === '/') scrollToId(id)
      else router.push(`/#${id}`)
      return
    }
    router.push(url)
  }

  // 製品クリックで「選択して about セクションへ」スクロール
  const selectProductAndScroll = (productId: string) => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      const OFFSET = 200
      const y = aboutSection.getBoundingClientRect().top + window.scrollY + OFFSET
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
    window.dispatchEvent(new CustomEvent('sosikio:select-product', { detail: productId }))
  }

  return (
    <footer className="relative bg-black text-gray-300 font-zenKakuGothicNew border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        {/* --- Top Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-3 ">
            <Logo className="bg-white p-2 rounded-lg" />
            <p className="text-sm text-gray-400 leading-relaxed">
              データと対話で、組織の変化を日常に。
              <br />
              組織が変わる歓びを、もっと身近に。
            </p>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-white tracking-wider mb-4">Products</h4>
            <ul className="space-y-2 text-sm">
              {['LOOK', 'PROBE', 'BOON'].map((product) => (
                <li key={product}>
                  <button
                    onClick={() => selectProductAndScroll(product)}
                    className="flex items-center justify-between w-full text-left text-gray-400 hover:text-white transition"
                  >
                    <span>{`SOSIKIO.${product}`}</span>
                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-1 transition-transform" />
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleClick('/articles')}
                  className="text-gray-400 hover:text-white transition"
                >
                  お客様の声・コラム
                </button>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white tracking-wider mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleClick('/philosophy#leader')}
                  className="hover:text-white transition"
                >
                  代表挨拶
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick('/philosophy#boonist')}
                  className="hover:text-white transition"
                >
                  BOONIST!一覧
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick('/philosophy#history')}
                  className="hover:text-white transition"
                >
                  沿革
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick('/philosophy#related-offices')}
                  className="hover:text-white transition"
                >
                  会社情報
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick('#contact')}
                  className="hover:text-white transition"
                >
                  お問い合わせ / 資料請求
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white tracking-wider mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleClick('/privacy')}
                  className="hover:text-white transition"
                >
                  プライバシーポリシー
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick('/terms')}
                  className="hover:text-white transition"
                >
                  利用規約
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* --- Bottom --- */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {year} HOKURYO DENKO Co.,Ltd. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  )
}
