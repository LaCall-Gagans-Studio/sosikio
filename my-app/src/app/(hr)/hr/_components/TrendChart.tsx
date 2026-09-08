import React from 'react'

/**
 * セッション推移。
 * 「施策を打つ前は横ばい、打った後に改善した」という1本の物語を読ませる図。
 * そのため施策実施回に縦線を引き、前後を区間ラベルで名指す。
 */

const W = 900
const H = 320
/* 右は系列名を線の端に直接置くぶんだけ広くとる */
const PAD_L = 60
const PAD_R = 150
const PAD_TOP = 46
const PAD_BOTTOM = 58

interface Point {
  date: string
  we: number
  bo: number
  /** 検知結果を受けて打ち手を実施した回 */
  action?: boolean
}

/** 施策前は横ばい、施策後に改善。読み取りやすさを優先して整形した表示用データ */
const DATA: Point[] = [
  { date: '4/09', we: 3.9, bo: 5.2 },
  { date: '4/23', we: 4.0, bo: 5.05 },
  { date: '5/14', we: 4.1, bo: 4.9, action: true },
  { date: '5/28', we: 4.45, bo: 4.5 },
  { date: '6/11', we: 4.68, bo: 4.15 },
  { date: '6/25', we: 4.82, bo: 3.91 },
]

const ACTION_INDEX = DATA.findIndex((d) => d.action)

const MIN = 3.0
const MAX = 6.0

const stepX = (W - PAD_L - PAD_R) / (DATA.length - 1)
const xAt = (i: number) => PAD_L + i * stepX
const yAt = (v: number) => PAD_TOP + (1 - (v - MIN) / (MAX - MIN)) * (H - PAD_TOP - PAD_BOTTOM)

function path(key: 'we' | 'bo') {
  return DATA.map((d, i) => `${i === 0 ? 'M' : 'L'}${xAt(i)} ${yAt(d[key])}`).join(' ')
}

const SERIES = [
  { key: 'we' as const, label: '活力（WE）', color: 'var(--color-hr-ink)' },
  { key: 'bo' as const, label: 'ストレス（BO）', color: 'var(--color-hr-sp-4)' },
]

export function TrendChart() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="6回の定例セッションの推移。3回目に打ち手を実施している。実施前の2回は活力が 3.9 から 4.1 とほぼ横ばいだが、実施後は 4.1 から 4.82 へ上昇し、ストレスも 4.9 から 3.91 へ低下している。"
      className="block h-auto w-full"
    >
      {/* 施策の前後を区間として名指す。ここが読みどころだと明示する */}
      <line
        x1={xAt(ACTION_INDEX)}
        y1={PAD_TOP - 26}
        x2={xAt(ACTION_INDEX)}
        y2={H - PAD_BOTTOM}
        stroke="var(--color-hr-accent)"
        strokeWidth={1.4}
      />
      <text
        x={xAt(ACTION_INDEX) + 7}
        y={PAD_TOP - 30}
        fill="var(--color-hr-accent)"
        className="hr-chart-label"
      >
        打ち手を実施
      </text>
      <text
        x={PAD_L}
        y={PAD_TOP - 12}
        fill="var(--color-hr-faint)"
        className="hr-chart-label"
      >
        実施前 ─ ほぼ横ばい
      </text>
      <text
        x={xAt(ACTION_INDEX) + 7}
        y={PAD_TOP - 12}
        fill="var(--color-hr-faint)"
        className="hr-chart-label"
      >
        実施後 ─ 改善が継続
      </text>
      {/* 基準線 4.5。破線＋左端にラベル（右端は系列名の場所） */}
      <line
        x1={PAD_L}
        y1={yAt(4.5)}
        x2={W - PAD_R}
        y2={yAt(4.5)}
        stroke="var(--color-hr-rule-strong)"
        strokeWidth={1}
        strokeDasharray="2 6"
      />
      <text x={PAD_L - 8} y={yAt(4.5) + 3} textAnchor="end" className="hr-chart-axis">
        4.50
      </text>

      {SERIES.map(({ key, label, color }) => {
        const lastIndex = DATA.length - 1
        return (
          <g key={key}>
            <path
              d={path(key)}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinejoin="round"
            />
            {DATA.map((d, i) => (
              <circle
                key={i}
                cx={xAt(i)}
                cy={yAt(d[key])}
                r={3.5}
                fill={color}
                stroke="var(--color-hr-raised)"
                strokeWidth={1.2}
              />
            ))}
            {/* 凡例ボックスは作らず、系列の端に直接ラベルと変化量を置く */}
            <text
              x={xAt(lastIndex) + 12}
              y={yAt(DATA[lastIndex][key]) - 2}
              fill={color}
              className="hr-chart-label"
            >
              {label}
            </text>
            <text
              x={xAt(lastIndex) + 12}
              y={yAt(DATA[lastIndex][key]) + 13}
              fill="var(--color-hr-faint)"
              className="hr-chart-axis"
            >
              {`${DATA[0][key].toFixed(2)} → ${DATA[lastIndex][key].toFixed(2)}`}
            </text>
          </g>
        )
      })}

      {/* 軸 */}
      <line
        x1={PAD_L}
        y1={H - PAD_BOTTOM}
        x2={W - PAD_R}
        y2={H - PAD_BOTTOM}
        stroke="var(--color-hr-rule-strong)"
        strokeWidth={1}
      />
      {DATA.map((d, i) => (
        <text
          key={d.date}
          x={xAt(i)}
          y={H - PAD_BOTTOM + 18}
          textAnchor="middle"
          className="hr-chart-axis"
        >
          {d.date}
        </text>
      ))}
    </svg>
  )
}
