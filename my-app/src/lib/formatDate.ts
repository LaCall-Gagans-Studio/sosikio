// src/lib/utils/formatDate.ts

/**
 * ISO 8601形式の文字列 (例: 2025-11-16T12:22:29.008Z) を
 * 日本の YYYY.MM.DD 形式にフォーマットします。
 * @param dateString - ISO 8601形式の日付文字列
 * @returns YYYY.MM.DD形式の文字列
 */
export function formatIsoDateToJa(dateString: string): string {
  // 無効な日付文字列が渡された場合の防御的な処理
  if (!dateString) {
    return '----.--.--'
  }

  try {
    const date = new Date(dateString)

    // Dateオブジェクトが無効な場合は、元の文字列を返すか代替文字列を返す
    if (isNaN(date.getTime())) {
      console.error('Invalid date string passed to formatIsoDateToJa:', dateString)
      return '----.--.--'
    }

    // toLocaleDateString を使用して YYYY/MM/DD 形式を取得し、スラッシュをドットに置換する
    const formatted = date
      .toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\//g, '.') // 例: 2025/11/16 を 2025.11.16 に変換

    return formatted
  } catch (e) {
    console.error('Error formatting date:', e)
    return '----.--.--'
  }
}
