import { ICON_MAP, IconKey } from '@/lib/iconMap'
import { ShieldCheck } from 'lucide-react'

export const getIconComponent = (icon?: string | null) => {
  if (!icon) return ShieldCheck

  const key = icon as IconKey
  const Icon = ICON_MAP[key]

  // 万が一マッピングに無い値が来た時の保険
  if (!Icon) {
    console.warn('Unknown icon key:', icon)
    return ShieldCheck
  }

  return Icon
}
