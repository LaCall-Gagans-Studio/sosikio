import React from 'react'
import { Reveal } from './Reveal'
import { FIXED_SESSION, SELECTABLE_PERSONAS } from './os-data'

/**
 * 標準3体の一覧。切替パネルが「1体を深く」見せるのに対し、こちらは「3体を並べて」見せる。
 * サーバー側で出すので、検索エンジンにも全文が届く。
 */
export function OsRoster() {
  return (
    <Reveal>
      <div className="mt-12 border-t border-hr-rule-strong pt-10 lg:mt-16">
        <p className="hr-label" lang="en">
          ROSTER
        </p>
        <h3 className="hr-heading mt-2 text-hr-ink">標準3体の目標値</h3>
        <p className="hr-measure mt-4 text-[14px] leading-8 text-hr-muted">
          目標値は人格ごとに意図的に別方向へ設定されています。とくに戦略家は、3体で唯一ストレスの目標を基準線
          4.50 より高く置きます。緊張のない議論は、まだ検証されていないと判断するためです。
        </p>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left">
            <caption className="sr-only">
              Thinking OS 標準3人格の副題、指摘の焦点、目標値の一覧
            </caption>
            <thead>
              <tr className="border-b border-hr-rule-strong">
                <th className="hr-label pb-3 font-normal">人 格</th>
                <th className="hr-label pb-3 pl-5 font-normal">指摘するのは</th>
                <th className="hr-label pb-3 pl-5 text-right font-normal">活 力</th>
                <th className="hr-label pb-3 pl-5 text-right font-normal">ス ト レ ス</th>
                <th className="hr-label pb-3 pl-5 text-right font-normal">最 大 シ ェ ア</th>
                <th className="hr-label pb-3 pl-5 text-right font-normal">版</th>
              </tr>
            </thead>
            <tbody>
              {SELECTABLE_PERSONAS.map((p) => (
                <tr key={p.osId} className="border-b border-hr-rule align-top">
                  <th scope="row" className="py-4 pr-5 text-left font-normal">
                    <span className="flex items-baseline gap-2.5">
                      <span
                        aria-hidden
                        className="mt-1 block size-1.5 shrink-0"
                        style={{ background: p.accent }}
                      />
                      <span>
                        <span className="block text-[15px] font-bold text-hr-ink">{p.name}</span>
                        <span className="mt-1.5 block text-[12px] leading-6 text-hr-muted">
                          {p.tagline}
                        </span>
                      </span>
                    </span>
                  </th>
                  <td className="py-4 pl-5 text-[13px] leading-7 text-hr-ink">
                    「{p.titleFocus}」
                  </td>
                  <td className="hr-num py-4 pl-5 text-right text-[14px] text-hr-ink">
                    {p.ideal.vitality.toFixed(2)}
                  </td>
                  <td className="hr-num py-4 pl-5 text-right text-[14px] text-hr-ink">
                    {p.ideal.stress.toFixed(2)}
                    {p.osId === 'strategist-os' && (
                      <span className="hr-label mt-1 block whitespace-nowrap">基 準 線 超</span>
                    )}
                  </td>
                  <td className="hr-num py-4 pl-5 text-right text-[14px] text-hr-ink">
                    {Math.round(p.ideal.speakerMaxShare * 100)}%
                  </td>
                  <td className="hr-num py-4 pl-5 text-right text-[12px] text-hr-muted whitespace-nowrap">
                    v{p.version}
                  </td>
                </tr>
              ))}
              <tr>
                <th scope="row" className="py-4 pr-5 text-left">
                  <span className="hr-label">こ の 会 議 の 実 測</span>
                </th>
                <td className="pl-5" />
                <td className="hr-num py-4 pl-5 text-right text-[14px] text-hr-muted">
                  {FIXED_SESSION.vitality.toFixed(2)}
                </td>
                <td className="hr-num py-4 pl-5 text-right text-[14px] text-hr-muted">
                  {FIXED_SESSION.stress.toFixed(2)}
                </td>
                <td className="hr-num py-4 pl-5 text-right text-[14px] text-hr-muted">
                  {Math.round(FIXED_SESSION.speakerMaxShare * 100)}%
                </td>
                <td className="pl-5" />
              </tr>
            </tbody>
          </table>
        </div>

        {/* 各人格がこの会議に対して選んだ問い。全文をサーバー側で出す */}
        <div className="mt-12 grid gap-px border border-hr-rule bg-hr-rule sm:grid-cols-2 lg:grid-cols-4">
          {SELECTABLE_PERSONAS.map((p) => (
            <div key={p.osId} className="bg-hr-paper p-6">
              <p className="flex items-center gap-2.5">
                <span
                  aria-hidden
                  className="block size-1.5 shrink-0"
                  style={{ background: p.accent }}
                />
                <span className="text-[14px] font-bold text-hr-ink">{p.name}</span>
              </p>
              <p className="mt-4 text-[14px] leading-7 text-hr-ink">
                {p.reaction.leaderQuestion}
              </p>
            </div>
          ))}
          <div className="bg-hr-sunken p-6">
            <p className="hr-label">同 じ 会 議 ／ 同 じ 指 標</p>
            <p className="mt-4 text-[13px] leading-7 text-hr-muted">
              上の3つの問いは、すべて同一セッションから出力されたものです。変えたのは視点だけです。
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  )
}
