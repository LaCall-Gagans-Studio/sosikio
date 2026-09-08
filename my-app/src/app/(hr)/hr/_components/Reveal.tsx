'use client'

import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

/**
 * 紙は動かない（デザイン.md §8）。
 * 許すのはフェードと 8px の微小な上方向だけ。パララックスも弾みも使わない。
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = 'div',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'li' | 'section'
}) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  if (reduced) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.4, delay, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </MotionTag>
  )
}
