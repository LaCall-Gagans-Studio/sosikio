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
