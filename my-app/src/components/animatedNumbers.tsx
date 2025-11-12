// components/AnimatedNumber.tsx
'use client'
import CountUp from 'react-countup'

export default function AnimatedNumbers({
  value,
  suffix = '',
  duration = 2,
  className = 'text-5xl md:text-8xl my-1 font-extrabold',
}: {
  value: number
  suffix?: string
  duration?: number
  className?: string
}) {
  return (
    <span className={className}>
      <CountUp
        end={value}
        duration={duration}
        suffix={suffix}
        enableScrollSpy // ビューポートに入ったら開始
        scrollSpyOnce // 一度きり
        preserveValue // 再レンダーでも値を保持
      />
    </span>
  )
}
