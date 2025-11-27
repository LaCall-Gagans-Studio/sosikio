// src/app/(frontend)/philosophy/page.client.tsx
'use client'

import * as React from 'react'
import Link from 'next/link'
import { ArrowDown, X } from 'lucide-react'

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
  const [selectedStaff, setSelectedStaff] = React.useState<Staff | null>(null)

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <HeroSection keywords={keywords} />
      <PageGuide />
      <PolicySection />

      {/* 2) リード */}
      {representative && (
        <section
          className="bg-gray-50 text-center container mx-auto px-6 py-16 sm:py-20 pt-10"
          id="leader"
        >
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight font-zenKakuGothicAntique">
            {vision?.tagline}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mt-8 whitespace-pre-wrap leading-relaxed font-medium text-gray-700">
            {vision?.lead}
          </p>
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
              <h2 className="text-2xl sm:text-3xl lg:text-7xl font-bold mb-3">Member</h2>
              <p>メンバー</p>
            </div>

            <div className="mt-8 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {staffs.map((s) => (
                <StaffCard key={s.id} s={s} onClick={() => setSelectedStaff(s)} />
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
            <div className="mt-12 max-w-3xl mx-auto md:mx-0">
              <ol className="relative border-l border-gray-300 space-y-10">
                {timeline.map((t, i) => (
                  <li key={i} className="ml-6 sm:ml-10">
                    <div className="absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-400" />
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-6">
                      <span className="text-lg font-bold text-gray-500 font-zenKakuGothicAntique min-w-20">
                        {t.year}
                        {t.month ? `.${t.month}` : ''}
                      </span>
                      <div>
                        <h3 className="text-xl font-base md:font-bold text-gray-900">{t.title}</h3>
                        {t.detail && (
                          <p className="mt-2 text-base text-gray-600 leading-relaxed whitespace-pre-wrap">
                            {t.detail}
                          </p>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* 5) 関連会社情報（北菱電興） */}
      {company && <RelatedAndOffices company={company} />}

      {/* Staff Modal */}
      {selectedStaff && <StaffModal staff={selectedStaff} onClose={() => setSelectedStaff(null)} />}
    </main>
  )
}

// --- コンポーネント: ページ内ガイド ---
function PageGuide() {
  const items = [
    { label: 'Philosophy', href: '#policy-section', jp: '理念・想い' },
    { label: 'Message', href: '#leader', jp: '代表挨拶' },
    { label: 'Member', href: '#boonist', jp: 'スタッフ' },
    { label: 'History', href: '#history', jp: '沿革' },
    { label: 'Company', href: '#related-offices', jp: '会社情報' },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault()
    const targetId = href.replace('#', '')
    const elem = document.getElementById(targetId)
    if (elem) {
      const headerOffset = 80 // ヘッダーの高さ分オフセット（HeaderClientと同様）
      const elementPosition = elem.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="relative bg-[#f1f1f1]">
      <div className="container mx-auto px-6 py-8 border-b border-gray-300/50">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* 左側: コンテンツ一覧 */}
          <nav className="w-full md:w-auto">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 text-center md:text-left">
              SOSIKIO O シル
            </p>
            <ul className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-3">
              {items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className="group flex items-center gap-2 text-base font-medium text-gray-600 hover:text-black transition-colors"
                  >
                    <span className="font-bold font-zenKakuGothicAntique">{item.label}</span>
                    <span className="text-base text-gray-400 group-hover:text-gray-600">
                      {item.jp}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* 右側: スクロール促進アニメーション */}
          <div className="hidden md:flex items-center gap-2 text-gray-400 animate-bounce">
            <span className="text-xs font-bold tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

function StaffCard({ s, onClick }: { s: Staff; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="group rounded-lg border bg-white p-5 shadow-sm transition hover:shadow-lg text-left w-full"
    >
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
        {s.bio && <p className="mt-2 text-sm text-gray-700 line-clamp-2">{s.bio}</p>}
        {s.links && s.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
            {s.links.map((l, i) => (
              <Link
                key={i}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold underline underline-offset-4 hover:text-blue-600"
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </button>
  )
}

function StaffModal({ staff, onClose }: { staff: Staff; onClose: () => void }) {
  // Prevent scrolling when modal is open
  React.useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[80vh] flex flex-col md:flex-row">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-gray-100 transition"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Left: Image & Basic Info */}
        <div className="w-full md:w-2/5 bg-gray-50 p-8 flex flex-col items-center text-center overflow-y-visible">
          <div className="flex md:flex-col items-center">
            <div className="h-24 w-24 md:w-48 md:h-48 rounded-full overflow-hidden shadow-md mb-6">
              <img src={staff.avatar} alt={staff.name} className="w-full h-full object-cover" />
            </div>
            <div className="ml-4 md:ml-0">
              <h3 className="text-2xl font-bold mb-2">{staff.name}</h3>
              <p className="text-gray-600 font-medium mb-2 md:mb-6">{staff.role}</p>
            </div>
          </div>

          {staff.links && staff.links.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center">
              {staff.links.map((l, i) => (
                <Link
                  key={i}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-white border rounded-full text-sm font-semibold hover:bg-gray-100 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-3/5 p-8 overflow-y-auto">
          <div className="space-y-8">
            {staff.bio && (
              <section>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  自己紹介
                </h4>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{staff.bio}</p>
              </section>
            )}

            {staff.career && (
              <section>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  経歴
                </h4>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{staff.career}</p>
              </section>
            )}

            {staff.vision && (
              <section>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                  ビジョン
                </h4>
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{staff.vision}</p>
              </section>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {staff.hobbies && (
                <section>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    趣味
                  </h4>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {staff.hobbies}
                  </p>
                </section>
              )}

              {staff.favoriteWords && (
                <section>
                  <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                    好きな言葉
                  </h4>
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {staff.favoriteWords}
                  </p>
                </section>
              )}
            </div>
          </div>
        </div>
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
