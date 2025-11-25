// src/app/(frontend)/philosophy/page.client.tsx
'use client'

import * as React from 'react'
import Link from 'next/link'

import { HeroSection } from './hero.p'
import { PolicySection } from '@/app/(frontend)/philosophy/policy'
import type { Staff, TimelineItem, RelatedCompany } from '@/lib/philosophy'

type PhilosophyPageClientProps = {
  vision: {
    tagline: string
    lead: string
  } | null
  representative: {
    name: string
    title: string
    avatar?: string | null
    greeting: string
  } | null
  staffs: Staff[]
  timeline: TimelineItem[]
  company: RelatedCompany | null
  keywords: string[]
}

export default function PhilosophyPageClient({
  vision,
  representative,
  staffs,
  timeline,
  company,
  keywords,
}: PhilosophyPageClientProps) {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <HeroSection keywords={keywords} />
      <PolicySection />

      {/* 2) リード */}
      {representative && (
        <section
          className="bg-gray-50 text-center container mx-auto px-6 py-16 sm:py-10 mt-"
          id="leader"
        >
          <h1 className="text-2xl sm:text-6xl font-bold">{vision?.tagline}</h1>
          <p className="text-2xl sm:text-2xl mt-5 whitespace-pre-wrap">{vision?.lead}</p>
        </section>
      )}

      {/* 2) 代表 & 挨拶 */}
      {representative && (
        <section className="bg-gray-50" id="leader">
          <div className="container mx-auto px-6 py-16 sm:py-24">
            <div className="flex flex-col lg:flex-row items-center gap-8 lg:items-start">
              <div className="relative aspect-square min-w-60 w-72 rounded-lg overflow-hidden shadow-lg">
                <img
                  src={representative.avatar || '/common/default-avatar.png'}
                  alt={representative.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold">代表あいさつ</h2>
                <p className="mt-1 text-lg text-gray-500">
                  {representative.name}（{representative.title}）
                </p>
                <p className="mt-4 text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {representative.greeting}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 3) BOONIST 紹介 */}
      {staffs.length > 0 && (
        <section id="boonist">
          <div className="container mx-auto px-6 py-16 sm:py-24">
            <div className="gap-4">
              <h2 className="text-2xl sm:text-3xl lg:text-7xl font-bold">BOONIST</h2>
              <p>（スタッフ）</p>
            </div>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {staffs.map((s) => (
                <StaffCard key={s.id} s={s} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4) 沿革 */}
      {timeline.length > 0 && (
        <section className="bg-gray-50" id="history">
          <div className="container mx-auto px-6 py-16 sm:py-24">
            <h2 className="text-2xl sm:text-3xl font-bold">沿革</h2>
            <ol className="mt-8 relative border-s-2 border-gray-200">
              {timeline.map((t, i) => (
                <li key={i} className="mb-8 ms-6">
                  <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-lg bg-black text-white text-xs">
                    {t.year.slice(-2)}
                  </span>
                  <h3 className="text-lg font-semibold">{t.title}</h3>
                  {t.detail && <p className="mt-1 text-sm text-gray-600">{t.detail}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* 5) 関連会社情報（北菱電興） */}
      {company && <RelatedAndOffices company={company} />}
    </main>
  )
}

function StaffCard({ s }: { s: Staff }) {
  return (
    <div className="group rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
        <img
          src={s.avatar}
          alt={s.name}
          className="object-cover h-full w-full transition group-hover:scale-105 "
        />
      </div>
      <div className="mt-4">
        <p className="text-base font-bold">{s.name}</p>
        <p className="text-sm text-gray-500">{s.role}</p>
        {s.bio && <p className="mt-2 text-sm text-gray-700">{s.bio}</p>}
        {s.links && s.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {s.links.map((l, i) => (
              <Link
                key={i}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold underline underline-offset-4"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function RelatedAndOffices({ company }: { company: RelatedCompany }) {
  const c = company

  return (
    <section id="related-offices" className="bg-white py-16 sm:py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">所在 & 関連会社</h2>

        {/* 会社ボックス */}
        <div className="mt-8 sm:mt-10 rounded-lg border bg-white/70 shadow-sm p-6 sm:p-8 flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-64 flex items-center justify-center">
            <img src={c.logoUrl} alt={c.name} className="h-44 w-auto object-contain" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="text-2xl font-bold">{c.name}</h3>
              <Link
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-lg border px-3 py-1.5 text-sm font-semibold hover:bg-gray-50"
              >
                公式サイトへ
              </Link>
            </div>

            {c.description && <p className="mt-3 text-gray-600 leading-relaxed">{c.description}</p>}

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {c.established && (
                <div>
                  <span className="font-semibold">設立：</span>
                  <span>{c.established}</span>
                </div>
              )}
              {c.capital && (
                <div>
                  <span className="font-semibold">資本金：</span>
                  <span>{c.capital}</span>
                </div>
              )}
              {c.motto && (
                <div>
                  <span className="font-semibold">社是：</span>
                  <span>{c.motto}</span>
                </div>
              )}
              {c.employees && (
                <div>
                  <span className="font-semibold">従業員数：</span>
                  <span>{c.employees}</span>
                </div>
              )}
            </div>

            {c.businesses?.length ? (
              <div className="mt-4">
                <div className="text-sm font-semibold text-gray-800 mb-1">主な事業領域</div>
                <ul className="text-sm text-gray-700 list-disc pl-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                  {c.businesses.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {/* 拠点リスト */}
        {c.offices?.length ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.offices.map((o) => (
              <div
                key={o.label}
                className={`
          rounded-lg border bg-white/70 p-5 hover:shadow-md transition-shadow
          ${o.mapEmbedUrl ? 'lg:col-span-3 md:col-span-2 lg:w-1/2 md:w-3/4' : ''}
        `}
              >
                <h4 className="font-bold">{o.label}</h4>
                <p className="mt-1 text-sm text-gray-700 whitespace-pre-line">{o.address}</p>
                {(o.tel || o.fax) && (
                  <p className="mt-1 text-sm text-gray-600">
                    {o.tel ? <>TEL {o.tel}</> : null}
                    {o.tel && o.fax ? '　/　' : null}
                    {o.fax ? <>FAX {o.fax}</> : null}
                  </p>
                )}
                {o.mapEmbedUrl ? (
                  <div className="mt-3 overflow-hidden rounded-lg">
                    <iframe
                      src={o.mapEmbedUrl}
                      loading="lazy"
                      className="w-full h-48 border-0"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
