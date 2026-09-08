import React from 'react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { ChartReading } from './ChartReading'
import { ProbeMatrix } from './ProbeMatrix'
import { TimelineChart } from './TimelineChart'
import { TrendChart } from './TrendChart'

/** probe 本体の画面はラベルに全角スペースを入れている。実物感のためそのまま踏襲する */
const KPI = [
  { label: '解 析 済 み', value: '4', unit: '回分', note: '直近90日' },
  {
    label: '最 新 の 判 定',
    value: 'イキイキ',
    unit: '',
    note: '第12回 開発定例',
    /* 判定はマトリクスの象限色をそのまま使う。紅はCTAだけに残す */
    tone: 'var(--color-hr-q-vital)',
  },
  { label: 'ア ラ ー ト', value: '1', unit: '件', note: '要注目の兆候があります' },
]

const METRICS = [
  { name: '活力（ワークエンゲージメント）', value: '4.82', base: '基準 4.50', delta: '+0.32' },
  { name: 'ストレス（バーンアウト）', value: '3.91', base: '基準 4.50', delta: '−0.59' },
  { name: '話す量のかたより', value: '0.38', base: '前回 0.44', delta: '−0.06' },
  { name: '発言が入れ替わった回数', value: '61', base: '回', delta: '+9' },
]

const SKILLS = [
  { name: '俯瞰力', value: 0.72 },
  { name: '成長キャリア開発行動', value: 0.55 },
  { name: 'メタ認知力', value: 0.64 },
  { name: '主体的仕事行動', value: 0.48 },
  { name: '自己効力感', value: 0.6 },
]

export function DashboardShowcase() {
  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-title"
      className="scroll-mt-20 border-b border-hr-rule py-20 sm:py-28 lg:py-32"
    >
      <div className="hr-container">
        <SectionHead
          no="05"
          eyebrow="Output"
          id="dashboard-title"
          title="解析後に提供されるレポート画面"
          accent={{ src: '/hr/probe/accent-peony.webp' }}
          lead={
            <>
              日常的に確認するのは最上段の判定のみです。詳細指標は必要に応じて参照する構成としています。
            </>
          }
        />

        {/* KPI ストリップ。色は「最新の判定」1枚だけに出す */}
        <Reveal>
          <div className="mt-14 grid gap-px border border-hr-rule bg-hr-rule sm:grid-cols-3 lg:mt-20">
            {KPI.map(({ label, value, unit, note, tone }) => (
              <div key={label} className="bg-hr-raised px-6 py-7">
                <p className="hr-label flex items-center gap-2">
                  {tone && (
                    <span aria-hidden className="block size-1.5" style={{ background: tone }} />
                  )}
                  {label}
                </p>
                <p className="mt-3 flex items-baseline gap-2">
                  <span
                    className={`${/^[0-9.]+$/.test(value) ? 'hr-num' : 'hr-display'} text-3xl leading-none`}
                    style={tone ? { color: tone } : undefined}
                  >
                    {value}
                  </span>
                  {unit && <span className="text-[12px] text-hr-muted">{unit}</span>}
                </p>
                <p className="mt-3 text-[12px] text-hr-muted">{note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,.95fr)]">
          <Reveal className="hr-panel">
            <p className="hr-label" lang="en">
              PROBE MATRIX
            </p>
            <h3 className="hr-heading mt-2 text-hr-ink">発話単位の分布</h3>
            <p className="mt-3 text-[13px] leading-7 text-hr-muted">
              1点が1発話に対応します。右上に分布するほど良好な状態を示します。
            </p>
            <div className="mt-7">
              <ProbeMatrix />
            </div>
            <p className="mt-5 text-[12px] leading-6 text-hr-faint">
              十字が実測平均、輪が目標値です。点の色は発言者を区別しています。
            </p>

            <ChartReading
              findings={[
                '会議全体の平均は基準を上回っており、単独で見れば良好な部類に入ります。',
                'ただし発言者ごとに分けると、1名が左下の「危険」に、1名が右下の「ぬるま湯」に固まっています。',
                'この2名はいずれも発話数が少なく、平均値だけを見ていると存在に気づけません。',
              ]}
              action="この2名を次回1on1の対象に設定します。ストレスが高い「危険」側から先に着手します。"
            />
          </Reveal>

          <div className="grid gap-6">
            <Reveal className="hr-panel" delay={0.06}>
              <p className="hr-label" lang="en">
                KEY METRICS
              </p>
              <h3 className="hr-heading mt-2 text-hr-ink">主要指標</h3>
              <p className="mt-3 text-[13px] leading-7 text-hr-muted">
                基準値は 4.50 です。活力は高いほど、ストレスは低いほど良好と判定します。
              </p>
              <table className="mt-6 w-full text-left">
                <thead>
                  <tr className="border-b border-hr-rule-strong">
                    <th className="hr-label pb-2 font-normal">指 標</th>
                    <th className="hr-label pb-2 text-right font-normal">実 測</th>
                    <th className="hr-label pb-2 text-right font-normal">前 回 比</th>
                  </tr>
                </thead>
                <tbody>
                  {METRICS.map(({ name, value, base, delta }) => (
                    <tr key={name} className="border-b border-hr-rule last:border-b-0">
                      <td className="py-3.5 pr-3 text-[13px] text-hr-ink">
                        {name}
                        <span className="hr-num ml-2 text-[11px] text-hr-faint">{base}</span>
                      </td>
                      <td className="hr-num py-3.5 text-right text-[17px] text-hr-ink">{value}</td>
                      <td className="hr-num py-3.5 text-right text-[13px] text-hr-muted">
                        {delta}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>

            <Reveal className="hr-panel" delay={0.12}>
              <p className="hr-label" lang="en">
                SKILL PROFILE
              </p>
              <h3 className="hr-heading mt-2 text-hr-ink">チーム特性</h3>
              <p className="mt-3 text-[13px] leading-7 text-hr-muted">
                全社平均を基準とした、当該チームの相対的な傾向です。
              </p>
              <ul className="mt-6 space-y-4">
                {SKILLS.map(({ name, value }) => (
                  <li key={name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="text-[13px] text-hr-ink">{name}</span>
                      <span className="hr-num text-[12px] text-hr-muted">
                        {(value * 10).toFixed(2)}
                      </span>
                    </div>
                    {/* 塗りではなく濃度。バーは 1px の下罫線の上に置く */}
                    <div className="mt-2 h-px w-full bg-hr-rule">
                      <div
                        className="h-px bg-hr-ink"
                        style={{ width: `${value * 100}%` }}
                        aria-hidden
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-[12px] leading-6 text-hr-faint">
                優劣を示す指標ではありません。当該チームで強く発現している特性を把握するためのものです。
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal className="hr-panel mt-6">
          <p className="hr-label" lang="en">
            VITALITY / STRESS
          </p>
          <h3 className="hr-heading mt-2 text-hr-ink">セッション中の推移</h3>
          <p className="mt-3 text-[13px] leading-7 text-hr-muted">
            60分間の変動を時系列で表示します。どの議題で状態が悪化したかを特定でき、進行方法の改善につなげられます。
          </p>
          <div className="mt-7 overflow-x-auto">
            <div className="min-w-[680px]">
              <TimelineChart />
            </div>
          </div>

          <ChartReading
            findings={[
              '開始30分すぎ、論点整理の後半で活力が最も低下し、ストレスが最も高くなっています。',
              '意思決定フェーズに入ると両指標とも回復し、終盤は開始時を上回る水準に戻ります。',
              '負荷がかかっているのは議題そのものではなく、論点が定まらないまま議論が続く時間帯です。',
            ]}
            action="論点整理を事前配布に切り替え、会議は意思決定から開始します。次回、同じ時間帯で改善しているかを確認します。"
          />
        </Reveal>

        {/* 継続利用の価値。単発では意味がないことを図で示す */}
        <Reveal className="hr-panel mt-6">
          <p className="hr-label" lang="en">
            SESSION TREND
          </p>
          <h3 className="hr-heading mt-2 text-hr-ink">セッション間の推移</h3>
          <p className="mt-3 text-[13px] leading-7 text-hr-muted">
            定例ごとにデータが蓄積されます。打ち手を実施した回に印を付けることで、施策の効果をそのまま検証できます。
          </p>
          <div className="mt-7 overflow-x-auto">
            <div className="min-w-[680px]">
              <TrendChart />
            </div>
          </div>

          <ChartReading
            findings={[
              '打ち手を実施するまでの2回は、活力が 3.90 から 4.10 とほぼ横ばいで推移しています。',
              '実施後は 4.10 から 4.82 まで改善が続き、ストレスも 4.90 から 3.91 へ低下しました。',
              '基準線 4.50 を上回ったのは実施から2回後です。効果の発現には1か月程度を要しています。',
            ]}
            action="効果が確認できたため、同じ打ち手を他チームへ展開します。以降は基準線を下回った時点で介入します。"
          />
        </Reveal>

        <Reveal>
          <p className="mt-8 text-[12px] text-hr-faint">
            ※ 表示イメージです。氏名・数値はすべて架空のものです。
          </p>
        </Reveal>
      </div>
    </section>
  )
}
