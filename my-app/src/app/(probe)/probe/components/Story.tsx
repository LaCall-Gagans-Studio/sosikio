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
    id: 'motivation-loss',
    tab: '未来のリーダーの離職',
    title: '未来のリーダーの離職',
    panels: [
      { text: 'やる気が出ない...', img: '/probe/2-1.png' },
      { text: '何のために働いてるんだろう', img: '/probe/2-2.png' },
      { text: 'Probeで可視化...', img: '/probe/2-3.png' },
      { text: '自分の課題に気づけた！', img: '/probe/2-4.png' },
    ],
    footer: '',
    url: '',
  },
  {
    id: '1on1-morahara',
    tab: '1on1がストレスに',
    title: '1on1がストレスに',
    panels: [
      {
        text: 'もっと熱くなれよ！',
        img: '/probe/1-1.png',
      },
      {
        text: '圧の1on1。',
        img: '/probe/1-2.png',
      },
      {
        text: '圧と疲弊が発覚。',
        img: '/probe/1-3.png',
      },
      {
        text: '適温の1on1',
        img: '/probe/1-4.png',
      },
    ],
    footer: '株式会社AAA「Probeを導入して上司との1on1が楽しくなりました。」',
    url: 'https://example.com/case/aaa',
  },
  {
    id: 'online-anxiety',
    tab: '「から回ってる？」',
    title: 'オンライン会議の空回り不安',
    panels: [
      {
        text: '画面の向こうの反応が薄い…。',
        img: '/probe/3-1.png',
      },
      {
        text: 'もしかして、一人でから回ってる…？',
        img: '/probe/3-2.png',
      },
      {
        text: '真剣に聞いていたことが判明！',
        img: '/probe/3-3.png',
      },
      {
        text: 'よかったー！伝わってたんだ！',
        img: '/probe/3-4.png',
      },
    ],
    footer:
      '中堅IT企業EEE「オンライン特有の不安が解消され、若手が自信を持って発言できるようになりました。」',
  },
  {
    id: 'waste',
    tab: 'これ無駄！',
    title: 'これ無駄！事例',
    panels: [
      {
        text: '全員が冷めていく無駄な時間',
        img: '/probe/4-1.png',
      },
      {
        text: '誰も聞いてない',
        img: '/probe/4-2.png',
      },
      {
        text: '課長の独演会90％',
        img: '/probe/4-3.png',
      },
      {
        text: 'よし、報告はチャット！',
        img: '/probe/4-4.png',
      },
    ],
    footer: '大手企業DDD「会議のROIが可視化され、本当の対話の場へと劇的に改善されました。」',
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
        <div className="font-zenKakuGothicNew flex overflow-x-auto border-2 border-black rounded-t-xl bg-white relative z-10 w-full custom-scrollbar">
          <style>{`
            .custom-scrollbar::-webkit-scrollbar {
              height: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: #fdf2f4;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #d7145b;
              border-radius: 10px;
            }
            /* Firefox */
            .custom-scrollbar {
              scrollbar-width: thin;
              scrollbar-color: #d7145b #fdf2f4;
            }
          `}</style>
          {stories.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              className={`px-4 py-3 md:px-8 md:py-4 text-xs md:text-sm font-bold border-r-2 last:border-r-0 border-black transition-all whitespace-nowrap shrink-0 ${
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
        <div className="font-zenKakuGothicNew border-4 border-black p-4 md:p-12 bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative min-h-[600px]">
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
                      className="max-w-full aspect-video max-h-full object-contain grayscale-75 group-hover:grayscale-0 group-active:grayscale-0 group-focus:grayscale-0 transition-all duration-500 scale-[0.9]"
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
                    <div className=" opacity-15 text-gray-950 w-6 h-6 flex items-center justify-center text-xs font-black shadow-lg border-2">
                      {idx + 1}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Footer Info (With Hover Animation) */}
          {currentStory.footer && (
            <motion.div
              className="mt-8 md:mt-12 flex flex-row items-center justify-between border-2 border-black rounded-full px-6 py-3 md:px-10 md:py-4 bg-white gap-4 relative z-10 cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
            >
              {currentStory.url ? (
                <a
                  href={currentStory.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grow hover:underline decoration-[#d7145b] decoration-2 underline-offset-4"
                >
                  <p className="text-xs md:text-sm font-bold text-slate-800 text-center md:text-left">
                    {currentStory.footer}
                  </p>
                </a>
              ) : (
                <div className="grow">
                  <p className="text-xs md:text-sm font-bold text-slate-800 text-center md:text-left">
                    {currentStory.footer}
                  </p>
                </div>
              )}

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = stories.findIndex((s) => s.id === activeTab)
                  const nextIndex = (currentIndex + 1) % stories.length
                  setActiveTab(stories[nextIndex].id)
                }}
                className="w-10 h-10 md:w-12 md:h-12 bg-black text-white rounded-full flex items-center justify-center group hover:bg-[#d7145b] transition-all shrink-0"
              >
                <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
