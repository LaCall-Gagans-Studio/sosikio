// 記事カテゴリの定義（管理画面の選択肢と、サイトの表示ラベルの両方で使う）
// value は DB の enum と対応する。表示名を変えるときは label だけを変える。
// value を増やすときは本番 DB の enum（enum_articles_category / enum__articles_v_version_category）にも追加する。
export const ARTICLE_CATEGORIES = [
  { label: 'コラム', value: 'column' },
  { label: 'イベント', value: 'exhibition' },
  { label: 'リリース', value: 'product_info' },
  { label: 'お知らせ', value: 'notice' },
  { label: 'メディア', value: 'media' },
] as const

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number]['value']

export function articleCategoryLabel(category?: ArticleCategory): string {
  return ARTICLE_CATEGORIES.find((c) => c.value === category)?.label ?? 'コラム'
}

// バッジの色。solid は記事一覧・記事詳細、soft はトップの「最新情報」で使う。
const CATEGORY_BADGE_STYLES: Record<ArticleCategory, { solid: string; soft: string }> = {
  column: {
    solid: 'bg-cyan-500/90 text-slate-950',
    soft: 'border-cyan-200 text-cyan-800 bg-cyan-100',
  },
  exhibition: {
    solid: 'bg-amber-400 text-slate-950',
    soft: 'border-amber-200 text-amber-800 bg-amber-100',
  },
  product_info: {
    solid: 'bg-violet-600 text-white',
    soft: 'border-violet-200 text-violet-800 bg-violet-100',
  },
  notice: {
    solid: 'bg-emerald-600 text-white',
    soft: 'border-emerald-200 text-emerald-800 bg-emerald-100',
  },
  media: {
    solid: 'bg-slate-700 text-white',
    soft: 'border-slate-300 text-slate-800 bg-slate-200',
  },
}

export function articleCategoryBadgeStyle(
  category: ArticleCategory | undefined,
  variant: 'solid' | 'soft',
): string {
  return CATEGORY_BADGE_STYLES[category ?? 'column'][variant]
}
