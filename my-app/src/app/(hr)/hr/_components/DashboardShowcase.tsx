import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'
import { ChartReading } from './ChartReading'
import { ProbeMatrix } from './ProbeMatrix'
import { TimelineChart } from './TimelineChart'

/** probe 本体の画面はラベルに全角スペースを入れている。実物感のためそのまま踏襲する */
const KPI = [
  { label: '解 析 済 み', value: '4', unit: '回分', note: '直近90日' },
  {
    label: '最 新 の 判 定',
    value: 'イキイキ',
    unit: '',
    note: '第12回 開発定例',
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

export function DashboardShowcase() {
  return (
    <section
      id="dashboard"
      aria-labelledby="dashboard-title"
      className="scroll-mt-20 border-b border-hr-rule py-16 sm:py-20 lg:py-24"
    >
      <div className="hr-container">
        <SectionHead
          no="01"
          eyebrow="Output"
          id="dashboard-title"
          title="会議のあと、何がわかるのか"
          accent={{ src: '/hr/probe/accent-peony.webp' }}
          lead="録音を上げると、発言者ごとの活力・ストレスと、次の1on1で確認すべき論点が届きます。日常的に見るのは最上段の判定だけです。"
        />

        <Reveal>
          <div className="mt-10 grid gap-px border border-hr-rule bg-hr-rule sm:grid-cols-3 lg:mt-14">
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
              1点が1発話です。右上ほど良好。平均では見えない個人の偏りが分かります。
            </p>
            <div className="mt-7">
              <ProbeMatrix />
            </div>
            <ChartReading
              findings={[
                '会議平均は良好でも、1名が「危険」、1名が「ぬるま湯」に固まっています。どちらも発話数が少なく、平均だけでは気づけません。',
              ]}
              action="この2名を次回1on1の対象にします。ストレスが高い側から着手します。"
            />
          </Reveal>

          <Reveal className="hr-panel" delay={0.06}>
            <p className="hr-label" lang="en">
              KEY METRICS
            </p>
            <h3 className="hr-heading mt-2 text-hr-ink">主要指標</h3>
            <p className="mt-3 text-[13px] leading-7 text-hr-muted">
              基準値は 4.50。活力は高いほど、ストレスは低いほど良好です。
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
                    <td className="hr-num py-3.5 text-right text-[13px] text-hr-muted">{delta}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>

        <Reveal className="hr-panel mt-6">
          <p className="hr-label" lang="en">
            VITALITY / STRESS
          </p>
          <h3 className="hr-heading mt-2 text-hr-ink">セッション中の推移</h3>
          <p className="mt-3 text-[13px] leading-7 text-hr-muted">
            どの議題の時間帯で状態が落ちたかを特定できます。
          </p>
          <div className="mt-7 overflow-x-auto">
            <div className="min-w-[680px]">
              <TimelineChart />
            </div>
          </div>
          <ChartReading
            findings={[
              '論点整理の後半で活力が最も低下し、意思決定に入ると回復しています。負荷は議題そのものではなく、論点が定まらない時間に出ています。',
            ]}
            action="論点整理を事前配布に切り替え、会議は意思決定から始めます。"
          />
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-col gap-4 border-t border-hr-rule-strong pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-hr-faint">
              ※ 表示イメージです。氏名・数値はすべて架空のものです。
            </p>
            <a href="#lead-form" className="hr-btn hr-btn-primary shrink-0">
              資料を請求する（無料）
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
