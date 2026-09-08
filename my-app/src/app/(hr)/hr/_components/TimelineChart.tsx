import React from 'react'

/**
 * 注釈付きタイムライン。
 * 上段=活力 / 下段=ストレスの2段組で、x 軸は下に1本だけ置く（デザイン.md §5.2）。
 * 生値の点は話者色で薄く、平滑線はインク。イベントは accent の短い縦ヘアライン。
 */

const W = 1200
const H = 400
const PAD_X = 44
const PAD_TOP = 26
const PANEL_H = 150
const PANEL_GAP = 34
const AXIS_Y = PAD_TOP + PANEL_H * 2 + PANEL_GAP

/** 0〜1 に正規化した 24 点。会議の起伏を手で置いた概念値 */
const VITALITY = [
  0.34, 0.38, 0.42, 0.4, 0.47, 0.52, 0.5, 0.55, 0.61, 0.58, 0.54, 0.5, 0.46, 0.49, 0.56, 0.63, 0.68,
  0.72, 0.7, 0.74, 0.79, 0.83, 0.8, 0.77,
]
const STRESS = [
  0.52, 0.5, 0.47, 0.51, 0.44, 0.4, 0.43, 0.38, 0.35, 0.39, 0.45, 0.5, 0.56, 0.53, 0.47, 0.42, 0.38,
  0.34, 0.37, 0.33, 0.3, 0.28, 0.31, 0.33,
]

/** 局面ラベル。絵文字は使わず文字だけ */
const PHASES = [
  { at: 0, label: '共有' },
  { at: 8, label: '論点整理' },
  { at: 14, label: '意思決定' },
  { at: 20, label: 'クロージング' },
]

/** 指標が動いたイベント */
const EVENTS = [12, 17]

const stepX = (W - PAD_X * 2) / (VITALITY.length - 1)
const xAt = (i: number) => PAD_X + i * stepX

function panelY(top: number, v: number) {
  return top + (1 - v) * PANEL_H
}

/** 生値の点をずらして「密度が見える」ようにする決定的なゆらぎ */
function jitter(i: number, salt: number) {
  return (Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453) % 1
}

function line(values: number[], top: number) {
  return values.map((v, i) => `${i === 0 ? 'M' : 'L'}${xAt(i)} ${panelY(top, v)}`).join(' ')
}

const VIT_TOP = PAD_TOP
const STR_TOP = PAD_TOP + PANEL_H + PANEL_GAP

const SPEAKER_COLORS = [
  'var(--color-hr-sp-1)',
  'var(--color-hr-sp-2)',
  'var(--color-hr-sp-3)',
  'var(--color-hr-sp-4)',
]

export function TimelineChart() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      role="img"
      aria-label="活力とストレスの時系列。活力は序盤の低位から終盤にかけて上昇し、ストレスは中盤に一度高まったあと下降している。中盤と終盤の2箇所に指標の変動イベントがある。"
      className="block h-auto w-full"
    >
      {/* 局面ラベルは上端に、ヘアラインの縦線で区切る */}
      {PHASES.map(({ at, label }) => (
        <g key={label}>
          <line
            x1={xAt(at)}
            y1={PAD_TOP - 12}
            x2={xAt(at)}
            y2={AXIS_Y}
            stroke="var(--color-hr-rule)"
            strokeWidth={1}
          />
          <text
            x={xAt(at) + 6}
            y={PAD_TOP - 14}
            fill="var(--color-hr-faint)"
            className="hr-chart-label"
          >
            {label}
          </text>
        </g>
      ))}

      {[VIT_TOP, STR_TOP].map((top, panel) => {
        const values = panel === 0 ? VITALITY : STRESS
        return (
          <g key={top}>
            {/* 基準線 4.5 相当。破線＋端にラベル */}
            <line
              x1={PAD_X}
              y1={panelY(top, 0.45)}
              x2={W - PAD_X}
              y2={panelY(top, 0.45)}
              stroke="var(--color-hr-rule-strong)"
              strokeWidth={1}
              strokeDasharray="2 6"
            />
            <text
              x={W - PAD_X + 6}
              y={panelY(top, 0.45) + 3}
              fill="var(--color-hr-faint)"
              className="hr-chart-axis"
            >
              4.50
            </text>

            {/* 生値。話者色・不透明度 0.42 で重なりに密度を出す */}
            {values.map((v, i) =>
              SPEAKER_COLORS.map((c, s) => (
                <circle
                  key={`${i}-${s}`}
                  cx={xAt(i) + jitter(i, s) * stepX * 0.5}
                  cy={panelY(top, Math.min(0.97, Math.max(0.03, v + jitter(i, s + 9) * 0.22)))}
                  r={2.2}
                  fill={c}
                  opacity={0.42}
                />
              )),
            )}

            {/* 平滑線 */}
            <path
              d={line(values, top)}
              fill="none"
              stroke="var(--color-hr-ink)"
              strokeWidth={1.75}
              strokeLinejoin="round"
            />

            {/* 系列名は凡例ではなく端に直接置く */}
            <text x={PAD_X} y={top - 4} fill="var(--color-hr-muted)" className="hr-chart-label">
              {panel === 0 ? '活 力（上ほど高い）' : 'ス ト レ ス（上ほど高い）'}
            </text>
          </g>
        )
      })}

      {/* イベントは ▲ ではなく短い縦のヘアライン */}
      {EVENTS.map((i) => (
        <line
          key={i}
          x1={xAt(i)}
          y1={AXIS_Y - 8}
          x2={xAt(i)}
          y2={AXIS_Y + 8}
          stroke="var(--color-hr-accent)"
          strokeWidth={1.4}
        />
      ))}

      {/* 共通の x 軸は1本だけ */}
      <line
        x1={PAD_X}
        y1={AXIS_Y}
        x2={W - PAD_X}
        y2={AXIS_Y}
        stroke="var(--color-hr-rule-strong)"
        strokeWidth={1}
      />
      {[0, 6, 12, 18, 23].map((i) => (
        <text
          key={i}
          x={xAt(i)}
          y={AXIS_Y + 20}
          textAnchor="middle"
          className="hr-chart-axis"
        >
          {`${String(Math.floor((i * 61) / 23)).padStart(2, '0')}:00`}
        </text>
      ))}
    </svg>
  )
}
