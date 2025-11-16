// src/sections/contact-trial.tsx
'use client'

import React from 'react'
import type { Product } from '@/payload-types'
import { ContactForm } from '@/components/Forms/ContactForm'
import { TrialForm } from '@/components/Forms/TrialForm'

type Props = {
  products: Product[]
}

export function ContactTrialSection({ products }: Props) {
  // TrialForm に渡すための「プロダクト一覧」
  const trialProducts = products.map((p) => {
    const id = (p as any).productId || String(p.id)
    return { id }
  })

  return (
    <section
      id="contact"
      className="bg-white py-16 sm:py-20 md:py-24 border-t border-gray-200"
      aria-labelledby="contact-trial-heading"
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 text-center">
          <h2
            id="contact-trial-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            お問い合わせ & 資料請求
          </h2>
          <p className="mt-3 text-gray-600">
            ご相談はカジュアルにどうぞ。まずは軽く話してみる、でもOKです。
          </p>
        </div>

        {/* 横並び（モバイルは縦積み） */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <div id="contact-card" className="rounded-2xl border bg-white shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="mb-4">
                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-gray-100">
                  お問い合わせ
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold">まずは情報交換から</h3>
                <p className="mt-1 text-sm text-gray-600">
                  サービス概要や導入可否、費用感などお気軽に。
                </p>
              </div>
              <ContactForm />
            </div>
          </div>

          <div id="trial" className="rounded-2xl border bg-white shadow-sm">
            <div className="p-6 sm:p-8">
              <div className="mb-4">
                <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-black text-white">
                  資料請求
                </span>
                <h3 className="mt-2 text-xl sm:text-2xl font-bold">100秒サーベイから試す</h3>
                <p className="mt-1 text-sm text-gray-600 flex items-center">
                  {trialProducts.map((p, n) => {
                    return (
                      <span key={p.id} className="flex items-center">
                        {n == 0 ? '' : ' / '}
                        {p.id}
                      </span>
                    )
                  })}
                  の中から気になるものを選んでお試し。
                </p>
              </div>

              <TrialForm products={trialProducts} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
