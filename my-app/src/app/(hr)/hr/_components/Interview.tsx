import React from 'react'
import { ArrowRight } from 'lucide-react'
import { SectionHead } from './SectionHead'
import { Reveal } from './Reveal'

const VIDEO_SRC = '/probe/' + encodeURIComponent('probe_完成版.mp4')

export function Interview() {
  return (
    <section
      id="interview"
      aria-labelledby="interview-title"
      className="scroll-mt-20 border-b border-hr-rule bg-hr-sunken py-16 sm:py-20 lg:py-24"
    >
      <div className="hr-container">
        <SectionHead
          no="03"
          eyebrow="Interview"
          id="interview-title"
          title="インタビュー動画で、probe の考え方を見る"
          accent={{ src: '/hr/probe/accent-books.webp' }}
          lead="制作中のインタビュー映像です。会議音声から組織状態を読む、という発想の背景をご覧いただけます。"
        />

        <Reveal>
          <div className="mt-10 border border-hr-rule-strong bg-hr-ink lg:mt-14">
            <video
              controls
              playsInline
              preload="none"
              poster="/hr/probe/team-table.webp"
              className="aspect-video w-full bg-hr-ink object-contain"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              お使いのブラウザは動画再生に対応していません。
            </video>
          </div>
          <p className="mt-4 text-[12px] leading-6 text-hr-faint">
            再生ボタンを押すと読み込みが始まります。内容は今後更新される場合があります。
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-10 flex flex-col gap-4 border-t border-hr-rule-strong pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="hr-heading text-hr-ink">資料では、解析項目とレポート見本も確認できます。</p>
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
