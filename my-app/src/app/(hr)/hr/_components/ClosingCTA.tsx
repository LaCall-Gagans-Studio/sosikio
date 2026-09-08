import React from 'react'
import { Reveal } from './Reveal'
import { LeadForm } from './LeadForm'

export function ClosingCTA() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="scroll-mt-20 bg-hr-sunken py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container max-w-[820px]">
        <Reveal>
          <div className="text-center">
            <p className="hr-eyebrow justify-center">
              <span className="hr-num">13</span>
              <span lang="en">Contact</span>
            </p>
            <h2 id="contact-title" className="hr-title mx-auto mt-5 max-w-[24em] text-hr-ink">
              資料請求・デモのお申し込み
            </h2>
            <p className="mx-auto mt-5 max-w-[30em] text-[15px] leading-8 text-hr-muted">
              サービス概要資料（PDF）をお送りします。デモをご希望の場合は、備考欄にその旨をご記入ください。
            </p>
            <p className="mx-auto mt-4 text-[12px] text-hr-faint">
              担当より2営業日以内にご連絡します。ご記入いただいた情報は本件のご連絡以外に使用しません。
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mt-14">
            <LeadForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
