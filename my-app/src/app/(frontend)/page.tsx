// src/app/page.tsx
import { HeroSection } from '@/sections/hero'
import { OverviewSection } from '@/sections/overview'
import { AboutSection } from '@/sections/about'
import { ContactTrialSection } from '@/sections/contact-trial'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const [{ docs: products }, overview] = await Promise.all([
    payload.find({
      collection: 'products',
      sort: 'order',
      depth: 2,
    }),
    payload.findGlobal({
      slug: 'overview',
      depth: 2,
    }),
  ])

  const keywords = (overview.issueKeywords ?? []).map((item) => item.keyword)

  return (
    <main className="bg-[#f1f1f1] text-gray-800 font-zenKakuGothicNew tracking-wide">
      <HeroSection keywords={keywords} />
      <OverviewSection products={products} overview={overview} />
      <AboutSection products={products} />
      <ContactTrialSection products={products} />
    </main>
  )
}
