// app/(frontend)/data_articles.ts
import { allTestimonials, type Testimonial } from './data_testimonials'

// 2タイプに統一
export type ArticleType = 'column' | 'voice'

export interface Article {
  slug: string
  title: string
  type: ArticleType // "column" | "voice"
  date: string // ISO "2025-11-01"
  image: string
  tags: string[]
  excerpt: string
  voice?: Pick<
    Testimonial,
    'name' | 'title' | 'company' | 'avatarUrl' | 'logoUrl' | 'products' | 'quote'
  >
  content: string
}

// --- コラム（以前の case も column に寄せたいときはここへ統合） ---
export const columnArticles: Article[] = [
  {
    slug: 'measure-psychological-safety',
    title: '「心理的安全性」をデータで測る、新しい組織サーベイの形とは？',
    type: 'column',
    date: '2025-10-01',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    tags: ['サーベイ', '心理的安全性', 'LOOK'],
    excerpt: '心理的安全性を継続的に可視化し、改善アクションへつなげる新しい測定の枠組み。',
    content: '本文ダミー。ここにMarkdownやHTMLで記事本文を入れてください。',
  },
  {
    slug: 'techlead-look-case-cut-turnover',
    title: '離職率半減を実現した「SOSIKIO.LOOK」活用術（株式会社テックリード）',
    type: 'column', // ← 旧 "case" を column に統一
    date: '2025-09-20',
    image:
      'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?q=80&w=2070&auto=format&fit=crop',
    tags: ['導入事例', 'LOOK', '人事'],
    excerpt: 'データ駆動のマネジメントで離職率を大幅改善した取り組みの全容。',
    content: '本文ダミー。ここにMarkdownやHTMLで記事本文を入れてください。',
  },
  {
    slug: 'equal-participation-in-meetings',
    title: '会議の鍵は「発言の均等性」。PROBEデータから見る理想のチーム対話',
    type: 'column',
    date: '2025-08-05',
    image:
      'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop',
    tags: ['会議', '対話', 'PROBE'],
    excerpt: '発言の偏りを抑えるとチームの創造性はどう変わる？PROBEで読み解く示唆。',
    content: '本文ダミー。ここにMarkdownやHTMLで記事本文を入れてください。',
  },
]

// --- お客様の声を Article にマップ（type: "voice"） ---
function mapVoiceToArticle(t: Testimonial): Article {
  return {
    slug: `voice-${t.id}`,
    title: `${t.company} ご担当者様の声`,
    type: 'voice',
    date: '2025-09-01',
    image: t.avatarUrl,
    tags: ['お客様の声', ...t.products],
    excerpt: t.quote,
    voice: {
      name: t.name,
      title: t.title,
      company: t.company,
      avatarUrl: t.avatarUrl,
      logoUrl: t.logoUrl,
      products: t.products,
      quote: t.quote,
    },
    content: t.quote,
  }
}
export const voiceArticles: Article[] = allTestimonials.map(mapVoiceToArticle)

// --- すべての“記事”（コラム＋お客様の声） ---
export const allArticles: Article[] = [...columnArticles, ...voiceArticles]

// タグ一覧
export const allArticleTags = Array.from(new Set(allArticles.flatMap((a) => a.tags))).sort()

// クライアントロゴ（Archiveで使用）
export const clientLogos: string[] = Array.from({ length: 18 }).map(
  (_, i) => `https://placehold.co/150x60/f0f0f0/aaaaaa?text=CLIENT+${i + 1}`,
)

// トップ表示用のおすすめ（例：最新3つ・コラムだけ）
export const featuredArticles = allArticles
  .filter((a) => a.type === 'column')
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3)
