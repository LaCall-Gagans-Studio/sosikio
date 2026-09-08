import React from 'react'

/**
 * 図の直後に必ず置く「読み方」。
 * グラフだけ見せても解釈は読者に伝わらないため、
 * 何が読み取れるか（事実）と、何をするか（打ち手）を分けて言い切る。
 */
export function ChartReading({
  findings,
  action,
}: {
  findings: string[]
  action: string
}) {
  return (
    <div className="mt-7 border-t border-hr-rule-strong pt-6">
      <p className="hr-label">こ の 図 か ら 読 み 取 れ る こ と</p>
      <ol className="mt-4 space-y-3">
        {findings.map((f, i) => (
          <li key={f} className="flex gap-3 text-[14px] leading-7 text-hr-ink">
            <span className="hr-num mt-0.5 shrink-0 text-[12px] text-hr-faint">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span>{f}</span>
          </li>
        ))}
      </ol>

      <div
        className="mt-5 border-l-2 bg-hr-sunken px-5 py-4"
        style={{ borderColor: 'var(--color-hr-accent)' }}
      >
        <p className="hr-label" style={{ color: 'var(--color-hr-accent)' }}>
          こ の あ と 取 る 打 ち 手
        </p>
        <p className="mt-2 text-[14px] leading-7 text-hr-ink">{action}</p>
      </div>
    </div>
  )
}
