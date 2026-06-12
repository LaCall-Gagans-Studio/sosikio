import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { HeroAlert } from './_components/HeroAlert'
import { CaseIntro } from './_components/CaseIntro'
import { TwoVoices } from './_components/TwoVoices'
import { CaseGraphs } from './_components/CaseGraphs'
import { PluginMax } from './_components/PluginMax'
import { KanamaMethod } from './_components/KanamaMethod'
import { ClosingCTA } from './_components/ClosingCTA'
import { LeadForm } from './_components/LeadForm'
import { HazardDivider } from './_components/HazardDivider'

export default function HrPage() {
  return (
    <>
      <main>
        <HeroAlert />
        <HazardDivider />

        <CaseIntro />
        <HazardDivider />

        <TwoVoices />
        <HazardDivider />

        <CaseGraphs />
        <HazardDivider />

        <PluginMax />
        <HazardDivider />

        <KanamaMethod />
        <HazardDivider />

        <ClosingCTA />
        <HazardDivider />

        {/* 資料請求 */}
        <section aria-labelledby="lead-title" className="bg-[#141210] py-20 sm:py-28">
          <div className="hr-container max-w-[760px]">
            <h2
              id="lead-title"
              className="hr-impact text-center font-black leading-tight text-white"
              style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)' }}
            >
              資料請求・デモのご依頼
            </h2>
            <p className="mt-4 text-center text-sm leading-relaxed text-white/70 sm:text-base">
              「コエの健康診断」「コエカラ研修」の詳しい資料をお送りします。
            </p>
            <div className="mt-10">
              <LeadForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#141210] py-12">
        <div className="hr-container flex flex-col items-center gap-6 text-center">
          <span className="inline-flex rounded-md bg-white px-3 py-2">
            <Image
              src="/hr/brand/logo_sosikio.webp"
              alt="SOSIKIO"
              width={900}
              height={287}
              className="h-6 w-auto"
            />
          </span>

          <nav
            aria-label="サイト内リンク"
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            <Link
              href="/"
              className="text-sm font-medium text-white/75 underline-offset-4 transition-colors hover:text-[#fff200] hover:underline"
            >
              SOSIKIOとは
            </Link>
            <Link
              href="/philosophy"
              className="text-sm font-medium text-white/75 underline-offset-4 transition-colors hover:text-[#fff200] hover:underline"
            >
              理念・会社情報
            </Link>
          </nav>

          <p className="text-xs tracking-widest text-white/60">
            &copy; {new Date().getFullYear()} HOKURYO DENKO Co.,Ltd. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </>
  )
}
