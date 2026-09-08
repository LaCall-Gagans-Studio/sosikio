import React from 'react'

/**
 * Probe マトリクス（4象限散布図）。
 * デザイン.md §5.2 に従い、象限は塗らずヘアラインの十字と隅ラベルだけで表す。
 * 横軸はストレスを左高・右低にとる（probe 本体の並びに合わせる）。
 *
 * 点は決定的な擬似乱数で生成する。SSR と CSR で同じ絵になる必要があるため乱数は使わない。
 */

const W = 620
const H = 520
const PAD = 46

/* 話者ごとの重心。象限をまたいで散らすことで、平均値だけでは見えない
   「同じ会議の中の温度差」が図から読めるようにする */
const SPEAKERS = [
  { key: 'S1', color: 'var(--color-hr-sp-1)', n: 46, vit: 0.74, str: 0.27, spread: 0.16 },
  { key: 'S2', color: 'var(--color-hr-sp-2)', n: 38, vit: 0.58, str: 0.45, spread: 0.18 },
  { key: 'S3', color: 'var(--color-hr-sp-3)', n: 26, vit: 0.38, str: 0.6, spread: 0.17 },
  { key: 'S4', color: 'var(--color-hr-sp-4)', n: 18, vit: 0.29, str: 0.24, spread: 0.15 },
]

/** 線形合同法。seed を固定して毎回同じ散布を得る */
function makeRng(seed: number) {
  let s = seed
  return () => {
    s = (s * 1103515245 + 12345) % 2147483648
    return s / 2147483648
  }
}

interface Pt {
  x: number
  y: number
  color: string
  o: number
}

const POINTS: Pt[] = (() => {
  const rng = makeRng(20260908)
  const out: Pt[] = []
  for (const sp of SPEAKERS) {
    for (let i = 0; i < sp.n; i++) {
      // 一様乱数3つの和で正規分布に近づける。中心に寄りつつ裾も出る
      const jv = rng() + rng() + rng() - 1.5
      const js = rng() + rng() + rng() - 1.5
      const vit = Math.min(0.97, Math.max(0.03, sp.vit + jv * sp.spread * 1.15))
      const str = Math.min(0.97, Math.max(0.03, sp.str + js * sp.spread * 1.15))
      out.push({
        // ストレスが高いほど左。1 - str で x を作る
        x: PAD + (1 - str) * (W - PAD * 2),
        y: PAD + (1 - vit) * (H - PAD * 2),
        color: sp.color,
        o: 0.36 + rng() * 0.34,
      })
    }
  }
  return out
})()

/** 実測の平均（FIXED_SESSION と同じ会議） */
const MEAN = { vit: 0.56, str: 0.38 }
/** 伴走者 OS の理想値に相当する位置。GAP の向きを示すための輪 */
const TARGET = { vit: 0.71, str: 0.28 }

const toX = (str: number) => PAD + (1 - str) * (W - PAD * 2)
const toY = (vit: number) => PAD + (1 - vit) * (H - PAD * 2)

const meanX = toX(MEAN.str)
const meanY = toY(MEAN.vit)
const targetX = toX(TARGET.str)
const targetY = toY(TARGET.vit)

export function ProbeMatrix() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="Probe マトリクス。全発話をストレスと活力の2軸に散布した4象限図。分布の中心はイキイキとぬるま湯の境界付近にあり、理想値は右上（高活力・低ストレス）方向に離れている。"
      className="block h-auto w-full"
    >
      {/* 十字はヘアラインのみ。象限は塗らない */}
      <line
        x1={PAD}
        y1={H / 2}
        x2={W - PAD}
        y2={H / 2}
        stroke="var(--color-hr-rule-strong)"
        strokeWidth={1}
      />
      <line
        x1={W / 2}
        y1={PAD}
        x2={W / 2}
        y2={H - PAD}
        stroke="var(--color-hr-rule-strong)"
        strokeWidth={1}
      />

      {/* 隅ラベル。凡例ボックスは作らず、その象限の色で直接置く */}
      <text x={PAD} y={28} fill="var(--color-hr-q-burn)" className="hr-chart-label">
        モエスギ
      </text>
      <text
        x={W - PAD}
        y={28}
        textAnchor="end"
        fill="var(--color-hr-q-vital)"
        className="hr-chart-label"
      >
        イキイキ
      </text>
      <text x={PAD} y={H - 14} fill="var(--color-hr-q-risk)" className="hr-chart-label">
        危険
      </text>
      <text
        x={W - PAD}
        y={H - 14}
        textAnchor="end"
        fill="var(--color-hr-q-tepid)"
        className="hr-chart-label"
      >
        ぬるま湯
      </text>

      {POINTS.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={2.8} fill={p.color} opacity={p.o} />
      ))}

      {/* GAP の向きと大きさ。実測平均 → 理想値 */}
      <line
        x1={meanX}
        y1={meanY}
        x2={targetX}
        y2={targetY}
        stroke="var(--color-hr-rule-strong)"
        strokeWidth={1}
        strokeDasharray="5 4"
      />
      <circle
        cx={targetX}
        cy={targetY}
        r={7}
        fill="none"
        stroke="var(--color-hr-ink)"
        strokeWidth={1.75}
      />
      <text
        x={targetX + 13}
        y={targetY - 8}
        fill="var(--color-hr-muted)"
        className="hr-chart-label"
      >
        理想値
      </text>

      {/* 全体重心は★ではなく細い十字＋小さな点 */}
      <line
        x1={meanX - 11}
        y1={meanY}
        x2={meanX + 11}
        y2={meanY}
        stroke="var(--color-hr-accent)"
        strokeWidth={1.5}
      />
      <line
        x1={meanX}
        y1={meanY - 11}
        x2={meanX}
        y2={meanY + 11}
        stroke="var(--color-hr-accent)"
        strokeWidth={1.5}
      />
      <circle cx={meanX} cy={meanY} r={3.5} fill="var(--color-hr-accent)" />
      <text
        x={meanX - 13}
        y={meanY + 20}
        textAnchor="end"
        fill="var(--color-hr-accent)"
        className="hr-chart-label"
      >
        基準点
      </text>

      {/* 読み方を図に焼き込む */}
      <text x={PAD} y={H - 32} fill="var(--color-hr-faint)" className="hr-chart-label">
        ← 高ストレス
      </text>
      <text
        x={W - PAD}
        y={H - 32}
        textAnchor="end"
        fill="var(--color-hr-faint)"
        className="hr-chart-label"
      >
        低ストレス →
      </text>
      <text
        transform={`translate(16 ${H / 2}) rotate(-90)`}
        textAnchor="middle"
        fill="var(--color-hr-faint)"
        className="hr-chart-label"
      >
        活 力（上ほど高い）
      </text>
    </svg>
  )
}
