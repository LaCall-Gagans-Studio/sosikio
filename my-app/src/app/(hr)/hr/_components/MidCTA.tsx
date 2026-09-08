import React from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'

/**
 * ページ中盤の再接触点。
 * 最下部のフォームまで到達しない読者を、ここで一度受け止める。
 */
export function MidCTA() {
  return (
    <section aria-labelledby="midcta-title" className="border-b border-hr-rule bg-hr-raised">
      <div className="hr-container py-14 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-16">
          <Reveal>
            <p className="hr-label">サ ー ビ ス 概 要 資 料 ・ 無 料</p>
            <h2 id="midcta-title" className="hr-heading mt-3 text-hr-ink">
              解析項目・レポート見本・費用感まで、1冊にまとめています
            </h2>

            <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-2.5">
              {[
                '全解析項目と算出ロジックの一覧',
                '開示レベル別のレポート見本',
                '導入スケジュールと費用の目安',
              ].map((t) => (
                <li key={t} className="flex items-baseline gap-2.5 text-[13px] text-hr-muted">
                  <span
                    aria-hidden
                    className="block size-1.5 shrink-0"
                    style={{ background: 'var(--color-hr-accent)' }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="flex flex-col gap-3 lg:items-end">
              <a href="#lead-form" className="hr-btn hr-btn-primary">
                資料を請求する（無料）
                <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </a>
              <p className="text-[12px] text-hr-faint">入力は30秒・2営業日以内にご連絡します</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
