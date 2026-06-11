import React from 'react'

/** 黄×黒の虎目（ハザード）ストライプ区切り帯 */
export function HazardDivider({ height = 18 }: { height?: number }) {
  return <div aria-hidden="true" className="hr-hazard w-full" style={{ height }} />
}
