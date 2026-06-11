'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal'

/* ---- 概念図用ダミーデータ（0=低, 100=高） ---- */
type CaseDef = {
  no: 1 | 2 | 3
  name: string
  sign: string
  subjective: number[] // 主観のコエ（黄）
  emotion: number[] // 感情のコエ（マゼンタ）
}

const CASES: CaseDef[] = [
  {
    no: 1,
    name: '期待の星くん',
    sign: '揺らぎなく高い数値を出し続けていたことが合図。',
    subjective: [84, 86, 83, 87, 85, 88, 84, 86, 87, 85, 86, 84, 30],
    emotion: [82, 84, 81, 85, 83, 86, 82, 84, 85, 83, 80, 72, 24],
  },
  {
    no: 2,
    name: '大丈夫さん',
    sign: '本音とタテマエのギャップが開き始めた頃が合図。',
    subjective: [80, 78, 82, 76, 79, 81, 77, 80, 78, 81, 79, 77, 75],
    emotion: [78, 75, 70, 72, 64, 60, 54, 50, 42, 38, 32, 26, 18],
  },
  {
    no: 3,
    name: '友達ドミノくん',
    sign: '毎日の測定だから見える、緩やかな降下が合図。',
    subjective: [82, 80, 76, 78, 72, 70, 66, 62, 60, 54, 50, 44, 38],
    emotion: [78, 74, 72, 68, 66, 60, 58, 52, 48, 44, 38, 32, 26],
  },
]

/* ---- 描画領域 ---- */
const W = 600
const H = 300
const PAD = { top: 28, right: 64, bottom: 34, left: 40 }
const PLOT_W = W - PAD.left - PAD.right
const PLOT_H = H - PAD.top - PAD.bottom

function toPoints(values: number[]): Array<[number, number]> {
  return values.map((v, i) => [
    PAD.left + (i / (values.length - 1)) * PLOT_W,
    PAD.top + (1 - v / 100) * PLOT_H,
  ])
}

function toPath(points: Array<[number, number]>): string {
  return points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

function CaseGraph({ def, index }: { def: CaseDef; index: number }) {
  const reduced = useReducedMotion()

  const subjPts = toPoints(def.subjective)
  const emoPts = toPoints(def.emotion)
  // 退職連絡ライン＝最終測定点の位置
  const alertX = subjPts[subjPts.length - 1][0]

  const lineAnim = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { pathLength: 0 },
          whileInView: { pathLength: 1 },
          viewport: { once: true, margin: '-10%' },
          transition: { duration: 1.6, delay, ease: 'easeInOut' as const },
        }

  return (
    <Reveal delay={index * 0.1}>
      <figure className="rounded-[14px] bg-[#1c1c1e] p-5 ring-1 ring-white/5 sm:p-7">
        <figcaption className="flex flex-wrap items-center gap-3">
          <span className="hr-latin rounded-sm bg-[#ed008c] px-2.5 py-1 text-xs font-bold tracking-widest text-white">
            CASE {def.no}
          </span>
          <span className="hr-impact text-lg font-black text-white">{def.name}</span>
        </figcaption>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label={`${def.name}のコエの健康値の推移（概念図）。${def.sign}`}
          className="mt-4 w-full"
        >
          {/* グラフ面 */}
          <rect
            x={PAD.left}
            y={PAD.top}
            width={PLOT_W}
            height={PLOT_H}
            fill="#2A2A2E"
            rx="4"
          />
          {/* 水平グリッド */}
          {[0.25, 0.5, 0.75].map((r) => (
            <line
              key={r}
              x1={PAD.left}
              x2={PAD.left + PLOT_W}
              y1={PAD.top + PLOT_H * r}
              y2={PAD.top + PLOT_H * r}
              stroke="#ffffff"
              strokeOpacity="0.12"
              strokeWidth="1"
            />
          ))}

          {/* 軸ラベル */}
          <text x={PAD.left - 8} y={PAD.top + 10} textAnchor="end" fontSize="13" fill="#fff">
            高
          </text>
          <text
            x={PAD.left - 8}
            y={PAD.top + PLOT_H}
            textAnchor="end"
            fontSize="13"
            fill="#fff"
            fillOpacity="0.7"
          >
            低
          </text>
          <text
            x={PAD.left + PLOT_W / 2}
            y={H - 10}
            textAnchor="middle"
            fontSize="12"
            fill="#fff"
            fillOpacity="0.55"
          >
            時間 →
          </text>

          {/* 主観のコエ（黄） */}
          <motion.path
            d={toPath(subjPts)}
            fill="none"
            stroke="#F2D600"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            {...lineAnim(0.1)}
          />
          {/* 感情のコエ（マゼンタ） */}
          <motion.path
            d={toPath(emoPts)}
            fill="none"
            stroke="#ED008C"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
            {...lineAnim(0.45)}
          />

          {/* 測定点 */}
          {subjPts.map(([x, y], i) => (
            <motion.circle
              key={`s${i}`}
              cx={x}
              cy={y}
              r="3.2"
              fill="#F2D600"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: reduced ? 0 : 0.1 + (i / subjPts.length) * 1.6 }}
            />
          ))}
          {emoPts.map(([x, y], i) => (
            <motion.circle
              key={`e${i}`}
              cx={x}
              cy={y}
              r="3.2"
              fill="#ED008C"
              initial={reduced ? false : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ delay: reduced ? 0 : 0.45 + (i / emoPts.length) * 1.6 }}
            />
          ))}

          {/* 退職連絡ライン（最後にスナップ） */}
          <motion.g
            initial={reduced ? false : { opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ delay: reduced ? 0 : 2.15, duration: 0.25, ease: 'easeOut' }}
          >
            <line
              x1={alertX}
              x2={alertX}
              y1={PAD.top - 6}
              y2={PAD.top + PLOT_H}
              stroke="#ED008C"
              strokeWidth="2"
              strokeDasharray="6 5"
            />
            <rect x={alertX - 34} y={PAD.top - 24} width="68" height="20" rx="3" fill="#ED008C" />
            <text
              x={alertX}
              y={PAD.top - 10}
              textAnchor="middle"
              fontSize="11"
              fontWeight="bold"
              fill="#fff"
            >
              退職連絡
            </text>
          </motion.g>
        </svg>

        {/* 凡例 */}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-white/75">
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-[3px] w-5 rounded bg-[#F2D600]" />
            主観のコエ
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="h-[3px] w-5 rounded bg-[#ED008C]" />
            感情のコエ
          </span>
        </div>

        <p className="mt-4 text-sm font-bold leading-relaxed text-white">
          <span className="mr-1.5 text-[#fff200]">合図：</span>
          {def.sign}
        </p>
      </figure>
    </Reveal>
  )
}

/** ケース別グラフ（SVG 再実装・概念図） */
export function CaseGraphs() {
  return (
    <section aria-labelledby="case-graphs-title" className="bg-[#141210] py-20 sm:py-28">
      <div className="hr-container">
        <Reveal>
          <h2
            id="case-graphs-title"
            className="hr-impact text-center font-black leading-tight text-white"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}
          >
            <span className="text-[#fff200]">しくじる原因</span>は、タイミングだった。
          </h2>
          <p className="mt-4 text-center text-sm text-white/70 sm:text-base">
            「コエの健康値」を毎日重ねると、3 つのケースそれぞれに“合図”が見えてくる。
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-6">
          {CASES.map((c, i) => (
            <CaseGraph key={c.no} def={c} index={i} />
          ))}
        </div>

        <p className="mt-8 text-center text-[11px] leading-relaxed text-white/45">
          本図表は、想定例に基づく概念図です。実際の効果や個社の性能を保証するものではございません。
        </p>
      </div>
    </section>
  )
}
