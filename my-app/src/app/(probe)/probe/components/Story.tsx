'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Noto_Serif_JP } from 'next/font/google'

const notoSerifJP = Noto_Serif_JP({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
})

const stories = [
  {
    id: '1on1-morahara',
    tab: '1on1モラハラ',
    title: '1on1モラハラ事例',
    panels: [
      { text: 'あああああああああ', img: '/probe/1-1.png' },
      { text: 'あああああああああああ', img: '/probe/1-2.png' },
      { text: 'あああああああああああ', img: '/probe/1-3.png' },
      { text: 'あああああああああああ', img: '/probe/1-4.png' },
    ],
    footer: '株式会社AAA「Probeを導入して上司との1on1が楽しくなりました。」',
  },
  {
    id: 'motivation-loss',
    tab: 'やる気を失う',
    title: 'やる気を失う事例',
    panels: [
      { text: 'やる気が出ない...', img: '/probe.png' },
      { text: '何のために働いてるんだろう', img: '/probe.png' },
      { text: 'Probeで可視化...', img: '/probe.png' },
      { text: '自分の課題に気づけた！', img: '/probe.png' },
    ],
    footer: '個人開発者BBB「自分のモチベーションの波を客観視できました。」',
  },
  {
    id: 'not-possible',
    tab: '「できない...」',
    title: '「できない...」事例',
    panels: [
      { text: 'こんなの無理だよ', img: '/probe.png' },
      { text: 'あきらめようかな', img: '/probe.png' },
      { text: 'チームで話し合おう', img: '/probe.png' },
      { text: 'みんなで解決！', img: '/probe.png' },
    ],
    footer: 'スタートアップCCC「チーム内での本音の共有が加速しました。」',
  },
  {
    id: 'waste',
    tab: 'これ無駄！',
    title: 'これ無駄！事例',
    panels: [
      { text: 'この会議、無駄...', img: '/probe.png' },
      { text: '誰も話してないし', img: '/probe.png' },
      { text: 'Probeで無駄を発見', img: '/probe.png' },
      { text: '有意義な時間に！', img: '/probe.png' },
    ],
    footer: '大手企業DDD「会議のROIが劇的に改善されました。」',
  },
]

export default function Story() {
  const [activeTab, setActiveTab] = useState(stories[0].id)
  const currentStory = stories.find((s) => s.id === activeTab) || stories[0]

  return (
    <section id="story" className={`py-24 bg-white overflow-hidden ${notoSerifJP.className}`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-6xl md:text-8xl font-black text-black leading-none tracking-tighter uppercase italic">
            MY <br />
            Probe STORY
          </h2>
        </motion.div>

        {/* Tab Navigation */}
        <div className="font-zenKakuGothicNew flex flex-wrap border-2 border-black rounded-t-xl overflow-hidden bg-white relative z-10 w-fit">
          {stories.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-4 py-3 md:px-8 md:py-4 text-xs md:text-sm font-bold border-r-2 last:border-r-0 border-black transition-all ${
                activeTab === s.id
                  ? 'bg-[#d7145b] text-white'
                  : 'bg-white text-black hover:bg-slate-50'
              }`}
            >
              {s.tab}
            </button>
          ))}
          {/* Decorative Character (Top Right) */}
          <div className="absolute -top-12 -right-16 hidden md:block">
            <img src="/probe.png" alt="Probe Character" className="w-32 h-auto rotate-12" />
          </div>
        </div>

        {/* Story Container (Manga Style) */}
        <div className="font-zenKakuGothicNew border-4 border-black p-8 md:p-12 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full relative z-10"
            >
              {currentStory.panels.map((panel, idx) => (
                <div
                  key={idx}
                  className="border-2 border-black bg-white relative group aspect-video flex items-center justify-center overflow-hidden"
                >
                  {/* Manga Panel Content */}
                  <div className="w-full aspect-video h-full flex items-center justify-center ">
                    <img
                      src={panel.img}
                      alt="Story panel"
                      className="max-w-full aspect-video max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Panel Number */}
                  <div
                    className={`absolute z-30 bottom-2 left-2 ${
                      idx === 0
                        ? 'md:left-auto md:right-2'
                        : idx === 1
                          ? ''
                          : idx === 2
                            ? 'md:bottom-auto md:top-2 md:left-auto md:right-2'
                            : 'md:bottom-auto md:top-2'
                    }`}
                  >
                    <div className=" opacity-15 text-gray-950 w-8 h-8 flex items-center justify-center text-xs font-black shadow-lg border-2">
                      {idx + 1}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer Info (With Hover Animation) */}
          <motion.div
            className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between border-2 border-black rounded-full px-6 py-3 md:px-10 md:py-4 bg-white gap-4 relative z-10 cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
          >
            <p className="text-xs md:text-sm font-bold text-slate-800 text-center md:text-left">
              {currentStory.footer}
            </p>
            <button
              onClick={() => {
                const currentIndex = stories.findIndex((s) => s.id === activeTab)
                const nextIndex = (currentIndex + 1) % stories.length
                setActiveTab(stories[nextIndex].id)
              }}
              className="w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center group hover:bg-[#d7145b] transition-all shrink-0"
            >
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
