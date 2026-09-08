import React from 'react'
import Image from 'next/image'
import { Reveal } from './Reveal'

/**
 * 全セクション共通の扉。
 * 通し番号 ＋ eyebrow → title（ゴシック・体言止め）→ lead の3段。
 * 番号を振ることで、読み物ではなく資料としての順序が伝わる。
 */
export function SectionHead({
  no,
  eyebrow,
  id,
  title,
  lead,
  accent,
  align = 'left',
}: {
  no: string
  eyebrow: string
  id: string
  title: React.ReactNode
  lead?: React.ReactNode
  accent?: { src: string; alt?: string }
  align?: 'left' | 'center'
}) {
  const centered = align === 'center'

  return (
    <div className={`relative ${centered ? 'text-center' : ''}`}>
      {accent && (
        <Image
          src={accent.src}
          alt={accent.alt ?? ''}
          width={512}
          height={512}
          aria-hidden={accent.alt ? undefined : true}
          className="pointer-events-none absolute -top-4 right-0 h-16 w-16 object-contain opacity-90 sm:h-20 sm:w-20 lg:h-24 lg:w-24"
        />
      )}

      <Reveal>
        {/* カットアウトの画像は右上に置いているので、eyebrow も本文と同じだけ右を空ける */}
        <p
          className={`hr-eyebrow flex-wrap ${
            centered ? 'justify-center' : 'pr-20 sm:pr-24 lg:pr-0'
          }`}
        >
          <span className="hr-num not-italic">{no}</span>
          <span lang="en">{eyebrow}</span>
        </p>

        <h2
          id={id}
          /* 和文は全角1文字＝1em。ch は欧字基準なので使わない */
          className={`hr-title mt-5 text-hr-ink ${centered ? 'mx-auto max-w-[20em]' : 'max-w-[21em] pr-20 sm:pr-24 lg:pr-0'}`}
        >
          {title}
        </h2>

        {lead && (
          <div
            className={`hr-measure mt-5 text-[15px] leading-8 text-hr-muted ${centered ? 'mx-auto' : ''}`}
          >
            {lead}
          </div>
        )}
      </Reveal>
    </div>
  )
}
