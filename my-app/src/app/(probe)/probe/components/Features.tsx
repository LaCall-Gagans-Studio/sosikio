'use client'

import { motion } from 'framer-motion'
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Presentation,
  ShieldCheck,
} from 'lucide-react'

export default function Features() {
  const hopStepJump = [
    {
      label: 'HOP',
      color: 'bg-slate-300',
      title: 'ROIを意識した\nムダの削減',
      items: ['会議時間の短縮', '前回会議のダブリ・手戻り防止'],
    },
    {
      label: 'STEP',
      color: 'bg-pink-200',
      title: '詰問・報告\n↓\n対話への変容',
      items: [
        '会議の関係性が見えると、他者に気が向く',
        '聴けなかった上司が聴けるように',
        '話さなかった若手が話すように',
      ],
    },
    {
      label: 'JUMP',
      color: 'bg-[#d7145b]',
      title: '「良い」チームの\n言語化',
      items: [
        '理想とするチームとのコミュニケーションGAP理解',
        'ハイパフォーマンスチームの相互学習',
      ],
    },
  ]

  return (
    <section id="features" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section 1: Introduction (Slide 1) */}
        <motion.div
          className="text-center mb-32"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 leading-tight">
            音声だけでチームがわかる。
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium">
            対話の音声をクラウドにアップロードするだけ
          </p>
        </motion.div>

        <div className="flex flex-col gap-12">
          <img src="/probe/features1.png" alt="" />
          <img src="/probe/features2.png" alt="" />
          <img src="/probe/features3.png" alt="" />
          <img src="/probe/features4.png" alt="" />
          <img src="/probe/features5.png" alt="" />
        </div>
      </div>
    </section>
  )
}
