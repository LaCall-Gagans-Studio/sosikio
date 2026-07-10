import React from 'react'
import { HrHeader } from './_components/HrHeader'
import { HeroAlert } from './_components/HeroAlert'
import { CaseIntro } from './_components/CaseIntro'
import { TwoVoices } from './_components/TwoVoices'
import { CaseGraphs } from './_components/CaseGraphs'
import { PluginMax } from './_components/PluginMax'
import { KanamaMethod } from './_components/KanamaMethod'
import { OnboardingSteps } from './_components/OnboardingSteps'
import { FAQ } from './_components/FAQ'
import { ClosingCTA } from './_components/ClosingCTA'
import { LeadForm } from './_components/LeadForm'
import { HazardDivider } from './_components/HazardDivider'
import { HashScrollToForm } from './_components/HashScrollToForm'
import { DemoFab } from './_components/DemoFab'
import { HrFooter } from './_components/HrFooter'

export default function HrPage() {
  return (
    <>
      <HashScrollToForm />
      <HrHeader />
      <DemoFab />

      <main className="pt-14">
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

        <OnboardingSteps />
        <HazardDivider />

        <FAQ />
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

      <HrFooter />
    </>
  )
}
