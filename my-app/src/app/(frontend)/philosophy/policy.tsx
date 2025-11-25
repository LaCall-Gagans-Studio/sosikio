'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
}

const PolicyData = [
  {
    id: 1,
    main: (
      <>
        視座の違いが、
        <br />
        齟齬を生み出す
      </>
    ),
    sub: (
      <>
        経営者には「未来の構想」があり、
        <br />
        現場には「いまの現実」がある。
        <br />
        そのあいだに横たわる “認識のずれ” が、
        <br />
        組織の熱を奪い、変革を止めてしまう。
      </>
    ),
    offsetClass: 'lg:mr-[20vw]',
    color: 'bg-[#5bb5c3]',
  },
  {
    id: 2,
    main: <>働く熱を失う日本</>,
    sub: (
      <>
        仕事に対して “前向きに働けている” と<br />
        答える日本人は、世界平均の半分以下。
        <br />
        真面目に働きながらも、
        <br />
        心はどこか冷めている。
        <br />
        長時間労働、上意下達、
        <br />
        形だけの 1on1。現場の声が届かず、
        <br />
        上司は孤独に判断を迫られる。
        <br />
        その結果、組織の “働く熱” が<br />
        静かに失われている。
      </>
    ),
    offsetClass: 'lg:ml-[30vw]',
    color: 'bg-[#5bb5c3]',
  },
  {
    id: 3,
    main: (
      <>
        組織の変革の
        <br />
        キーは「率いる人」
      </>
    ),
    sub: (
      <>
        社長だけではない。ナンバー2のあの人も。
        <br />
        部長、課長、新しい組織のリーダー、
        <br />
        そして、現場のプロジェクトを率いる人も。
        <br />
        組織の文化は、「率いる人」の背中から生まれる。
        <br />
        けれどその背中は、いつも静かに孤独を背負う。
        <br />
        組織を率いる人が抱えるのは、孤独と恐怖。
        <br />
        退職届、陰口、信頼の断絶──。
        <br />
        人間関係のもつれの中で、疲弊するリーダーが増えている。
      </>
    ),
    offsetClass: 'lg:mr-[20vw]',
    color: 'bg-[#5bb5c3]',
  },
]

export const PolicySection = () => {
  return (
    <section
      id="policy-section"
      className="bg-[#f1f1f1] pt-8 overflow-x-clip font-zenKakuGothicAntique flex flex-col items-center space-y-16 lg:space-y-20 pb-24 sm:pb-28 md:pb-36 lg:pb-44"
    >
      {PolicyData.map((p) => (
        <div key={p.id} className={`w-full ${p.offsetClass}`}>
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="
              relative z-10 container mx-auto px-4 text-black
              flex flex-col lg:flex-row lg:items-center lg:justify-center
              
            "
          >
            {/* タイトル（モバイルは横書き、lg以降は縦書き） */}
            <h1
              className="
                text-3xl xs:text-4xl sm:text-5xl
                font-bold tracking-tight text-nowrap
                lg:[writing-mode:vertical-rl] lg:leading-none
              "
            >
              {p.main}
            </h1>

            {/* 本文 */}
            <p
              className="
                lg:ml-10
                mt-2 lg:mt-0
                text-sm xs:text-base sm:text-lg md:text-xl
                leading-relaxed sm:leading-8 md:leading-9
                max-w-[68ch]
              "
            >
              {p.sub}
            </p>
          </motion.div>
        </div>
      ))}
    </section>
  )
}
