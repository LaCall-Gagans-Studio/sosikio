// src/app/(frontend)/philosophy/page.tsx
import { Suspense } from 'react'
import { getVisionAndRep, getStaff, getTimeline, getRelatedCompany } from '@/lib/philosophy'
import PhilosophyPageClient from './page.client'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Philosophy',
  description:
    'SOSIKIOの理念・ビジョンについて。私たちは、組織を率いる人を、1人にさせないために存在します。',
}

export default async function PhilosophyPage() {
  // ① getPayloadの初期化を Promise として定義し、他のデータ取得と同時に開始
  const payloadPromise = getPayload({ config: configPromise })

  const [visionAndRep, staffs, timeline, company, payload] = await Promise.all([
    getVisionAndRep(), // { vision, representative } を返す想定
    getStaff(), // Staff[] を返す想定
    getTimeline(), // Timeline[] を返す想定
    getRelatedCompany(), // RelatedCompany を返す想定
    payloadPromise, // getPayload の完了を待つ
  ])

  // ② overview の取得も、最初の Promise.all が完了した直後、
  //    payload インスタンスを使ってすぐに開始（ここでは単一なので await で十分）
  const [overview] = await Promise.all([
    payload.findGlobal({
      slug: 'overview',
      depth: 2,
    }),
  ])

  const keywords = (overview.issueKeywords ?? []).map((item) => item.keyword)

  return (
    <Suspense fallback={<p className="px-5 py-16 text-sm  text-ws-primary/70">読み込み中…</p>}>
      <PhilosophyPageClient
        vision={visionAndRep?.vision ?? null}
        representatives={visionAndRep?.representatives ?? []}
        staffs={staffs ?? []}
        timeline={timeline ?? []}
        company={company ?? null}
        keywords={keywords}
      />
    </Suspense>
  )
}
