// src/lib/philosophy.ts
const BASE = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'

export type Staff = {
  id: string
  name: string
  role: string
  bio?: string
  avatar: string
  links?: { label: string; href: string }[]
}

export type TimelineItem = {
  year: string
  title: string
  detail?: string
}

export type Office = {
  label: string
  address: string
  note?: string
  mapEmbedUrl?: string // Google Maps 埋め込み用URL（任意）
}

export type CompanyOffice = {
  label: string // 拠点名（本社/富山支店…）
  address: string
  tel?: string
  fax?: string
  mapEmbedUrl?: string // 任意
}

export type RelatedCompany = {
  name: string
  logoUrl: string // 会社ロゴ（/public 配下推奨）
  url: string
  description?: string
  established?: string
  capital?: string
  motto?: string // 社是
  employees?: string
  businesses?: string[] // 事業領域の見出しだけ抽出
  offices: CompanyOffice[]
}

export type CMSMedia =
  | { url?: string } // depth=0 のとき
  | { url?: string; filename?: string; sizes?: any } // depth=1+

// ---- Types your page expects ----
export type StaffDoc = {
  id: string
  name: string
  role: string
  bio?: string
  avatar: string // resolved URL
  links?: { label: string; href: string }[]
}

export type TimelineDoc = {
  id: string
  year: string
  title: string
  detail?: string
  order?: number
}

export type VisionDoc = {
  tagline: string
  lead: string
}

export type RepresentativeDoc = {
  name: string
  title: string
  greeting: string
  avatar: string // resolved URL
}

export type RelatedCompanyDoc = {
  name: string
  logoUrl: string
  url: string
  description?: string
  established?: string
  capital?: string
  motto?: string
  employees?: string
  businesses?: string[]
  offices: {
    label: string
    address: string
    tel?: string
    fax?: string
    mapEmbedUrl?: string
  }[]
}

// ---- helpers ----
function fileToUrl(f: any): string {
  if (!f) return ''
  if (typeof f === 'string') return f // already URL
  return f.url || ''
}

// ---- fetchers ----
export async function getVisionAndRep(): Promise<{
  vision: VisionDoc
  representative: RepresentativeDoc
} | null> {
  const r = await fetch(`${BASE}/api/globals/philosophy?depth=1`, { next: { revalidate: 60 } })
  if (!r.ok) return null
  const g = await r.json()

  const vision: VisionDoc = {
    tagline: g?.vision?.tagline ?? '',
    lead: g?.vision?.lead ?? '',
  }

  const representative: RepresentativeDoc = {
    name: g?.representative?.name ?? '',
    title: g?.representative?.title ?? '',
    greeting: g?.representative?.greeting ?? '',
    avatar: fileToUrl(g?.representative?.avatar),
  }

  return { vision, representative }
}

export async function getStaff(): Promise<StaffDoc[]> {
  const r = await fetch(`${BASE}/api/staff?limit=100&depth=1&sort=name`, {
    next: { revalidate: 60 },
  })
  if (!r.ok) return []
  const json = await r.json()
  return (json.docs ?? []).map((d: any) => ({
    id: d.id,
    name: d.name,
    role: d.role,
    bio: d.bio,
    avatar: fileToUrl(d.avatar),
    links: (d.links ?? []).map((l: any) => ({ label: l.label, href: l.href })),
  }))
}

export async function getTimeline(): Promise<TimelineDoc[]> {
  const r = await fetch(`${BASE}/api/timeline?limit=100&depth=0&sort=order`, {
    next: { revalidate: 60 },
  })
  if (!r.ok) return []
  const json = await r.json()
  return (json.docs ?? []).map((d: any) => ({
    id: d.id,
    year: d.year,
    title: d.title,
    detail: d.detail,
    order: d.order,
  }))
}

export async function getRelatedCompany(): Promise<RelatedCompanyDoc | null> {
  const r = await fetch(`${BASE}/api/globals/related-company?depth=1`, {
    next: { revalidate: 60 },
  })
  if (!r.ok) return null
  const g = await r.json()

  return {
    name: g?.name ?? '',
    logoUrl: fileToUrl(g?.logo),
    url: g?.url ?? '',
    description: g?.description ?? '',
    established: g?.established ?? '',
    capital: g?.capital ?? '',
    motto: g?.motto ?? '',
    employees: g?.employees ?? '',
    businesses: (g?.businesses ?? []).map((b: any) => b?.name).filter(Boolean),
    offices: (g?.offices ?? []).map((o: any) => ({
      label: o?.label ?? '',
      address: o?.address ?? '',
      tel: o?.tel ?? '',
      fax: o?.fax ?? '',
      mapEmbedUrl: o?.mapEmbedUrl ?? '',
    })),
  }
}
