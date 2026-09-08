import React from 'react'
import Image from 'next/image'
import { ArrowRight, Check } from 'lucide-react'
import { Reveal } from './Reveal'

/* 初見の人に効くのは内部仕様の数ではなく、導入のハードルの低さ */
const META = [
  { label: '必 要 な も の', value: '録音', unit: 'データのみ' },
  { label: '専 用 機 材', value: '不要', unit: '' },
  { label: '運 用 開 始', value: '次の定例', unit: 'から' },
]

/* 散文で説明せず、要点を3行で示す。LP の第一画面は読ませる場所ではない */
const POINTS = [
  '会議の録音から、発言者ごとの活力とストレスを定量化',
  '次の1on1で確認すべき論点を、具体的な問いとして提示',
  '既存の定例に相乗りするだけで、現場に新たな負担なし',
]

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-hr-rule-strong">
      <div className="grid lg:grid-cols-2">
        {/* 写真は左。モノクロ写真とクリーム地のカットアウトの組み合わせが probe の語彙 */}
        <div className="relative min-h-[220px] sm:min-h-[340px] lg:min-h-[620px]">
          <Image
            src="/hr/probe/hero-gaze.webp"
            alt="ノートパソコンに向かって静かに考え込む人のモノクロ写真"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="relative flex flex-col justify-end px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20">
          <Image
            src="/hr/probe/accent-magpie.webp"
            alt=""
            aria-hidden
            width={512}
            height={617}
            /* 狭い画面では見出しの1行目に翼がかかるので、小さくして上に逃がす */
            className="pointer-events-none absolute right-4 top-1 h-16 w-16 object-contain sm:top-6 sm:h-28 sm:w-28 lg:right-8 lg:h-32 lg:w-32"
          />

          <Reveal>
            <p className="flex flex-wrap items-center gap-2">
              <span className="hr-badge hr-badge-accent">会議音声解析</span>
              <span className="hr-badge">組織開発・離職予兆</span>
            </p>

            {/* 和文は全角1文字＝1em。ch だと欧字基準になり半分の幅しか取れない */}
            <h1 id="hero-title" className="hr-statement mt-6 max-w-[12.5em] text-hr-ink">
              <span className="hr-phrase">会議を録音するだけで、</span>
              <span className="hr-phrase">組織のコンディションを</span>
              <span className="hr-phrase">可視化する。</span>
            </h1>

            <p className="hr-measure mt-6 text-[15px] leading-8 text-hr-muted">
              probe（プローブ）は、日常の定例・1on1の音声から組織状態を測定する組織開発プラットフォームです。
            </p>

            <ul className="mt-6 space-y-2.5">
              {POINTS.map((p) => (
                <li key={p} className="flex gap-3 text-[14px] leading-7 text-hr-ink">
                  <Check
                    size={16}
                    strokeWidth={2}
                    aria-hidden
                    className="mt-1.5 shrink-0"
                    style={{ color: 'var(--color-hr-accent)' }}
                  />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <dl className="mt-9 grid grid-cols-3 border-t border-hr-rule pt-5">
              {META.map(({ label, value, unit }) => (
                <div key={label}>
                  <dt className="hr-label">{label}</dt>
                  <dd className="hr-display mt-1.5 text-[22px] leading-none text-hr-ink">
                    {value}
                    {unit && <span className="ml-1 text-[11px] text-hr-muted">{unit}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#lead-form" className="hr-btn hr-btn-primary">
                資料を請求する（無料）
                <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </a>
              <a href="#about" className="hr-btn hr-btn-ghost">
                サービス概要を見る
              </a>
            </div>
            <p className="mt-4 text-[12px] text-hr-faint">
              フォーム送信後、担当より2営業日以内にご連絡します。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
