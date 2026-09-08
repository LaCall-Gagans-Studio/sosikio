import React from 'react'
import { Reveal } from './Reveal'

/**
 * ヒーロー直下の規格帯。
 * 説明文を読ませる前に、測定の解像度を数字で示して信頼を先に取る。
 */
const SPECS = [
  { value: '500', suffix: '〜700', label: '1時間の会議から取り出す発言数', unit: '発言' },
  { value: '18', suffix: '', label: '声から検出する状況シグナル', unit: '種類' },
  { value: '5', suffix: '', label: '相手に応じて出し分ける開示レベル', unit: '段階' },
  { value: '0', suffix: '', label: '現場に追加で必要な機材・アプリ', unit: '点' },
]

export function SpecBand() {
  return (
    <section aria-label="測定の規格" className="border-b border-hr-rule bg-hr-sunken">
      <div className="hr-container py-10 lg:py-12">
        <Reveal>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {SPECS.map(({ value, suffix, label, unit }) => (
              <div key={label} className="border-l-2 border-hr-rule-strong pl-5">
                <dd className="flex items-baseline gap-1 text-hr-ink">
                  <span className="hr-stat">{value}</span>
                  {suffix && <span className="hr-num text-[15px] text-hr-muted">{suffix}</span>}
                  <span className="text-[12px] font-medium text-hr-muted">{unit}</span>
                </dd>
                <dt className="mt-2.5 text-[12px] leading-6 text-hr-muted">{label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  )
}
