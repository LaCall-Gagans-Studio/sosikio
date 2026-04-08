import React from 'react'
import { ProbeContactForm } from '@/components/Forms/ProbeContactForm'

export function ProbeContactSection() {
  return (
    <section
      id="contact"
      className="bg-[#ffffff] py-20 sm:py-28"
      aria-labelledby="probe-contact-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="mb-12 sm:mb-16 text-center">
          <h2
            id="probe-contact-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-gray-900 mb-6 font-sans"
          >
            CONTACT
          </h2>
          <div className="w-12 h-[2px] bg-[#d81e5c] mx-auto mb-8"></div>
          <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto font-bold tracking-wide">
            probeクラウド版のご利用コードのご購入やトラブル時のサポート、
            <br className="hidden sm:block" />
            その他ご不明点などお気軽にお問い合わせください。
          </p>
        </div>

        <div className="border border-[#babec0] bg-[#ffffff] p-6 sm:p-10 lg:p-14">
          <ProbeContactForm />
        </div>
      </div>
    </section>
  )
}
