'use client'

import React from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { Reveal } from './Reveal'

/* CAN×WILL マトリクス（参考図を SVG で再構成・順に点灯） */
function CanWillMatrix() {
  const reduced = useReducedMotion()

  const step = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0 },
          whileInView: { opacity: 1 },
          viewport: { once: true, margin: '-10%' },
          transition: { duration: 0.45, delay },
        }

  return (
    <svg
      viewBox="0 0 440 360"
      role="img"
      aria-label="CAN（行動・スキル・能力）と WILL（やる気・意欲）のマトリクス。気持ちより先に、まず行動を支援するルートが有効。"
      className="w-full max-w-[440px]"
    >
      {/* 軸 */}
      <motion.g {...step(0.1)}>
        <line x1="220" y1="30" x2="220" y2="330" stroke="#141210" strokeWidth="2.5" />
        <line x1="40" y1="180" x2="400" y2="180" stroke="#141210" strokeWidth="2.5" />
        <text x="232" y="26" fontSize="17" fontWeight="900" fill="#141210">
          CAN
        </text>
        <text x="232" y="44" fontSize="10" fill="#141210" fillOpacity="0.65">
          行動・スキル・能力
        </text>
        <text x="404" y="172" fontSize="17" fontWeight="900" fill="#141210" textAnchor="end">
          WILL
        </text>
        <text x="404" y="188" fontSize="10" fill="#141210" fillOpacity="0.65" textAnchor="end">
          やる気・意欲
        </text>
        <text x="212" y="44" fontSize="11" fill="#141210" textAnchor="end">
          高
        </text>
        <text x="212" y="326" fontSize="11" fill="#141210" textAnchor="end">
          低
        </text>
        <text x="46" y="172" fontSize="11" fill="#141210">
          低
        </text>
      </motion.g>

      {/* 現在地（左下）と目標（右上） */}
      <motion.g {...step(0.5)}>
        <circle cx="110" cy="280" r="20" fill="#141210" />
        <text x="110" y="285" fontSize="10" fill="#fff" textAnchor="middle" fontWeight="bold">
          いま
        </text>
      </motion.g>
      <motion.g {...step(0.7)}>
        <circle cx="340" cy="80" r="20" fill="#141210" />
        <text x="340" y="85" fontSize="10" fill="#fff200" textAnchor="middle" fontWeight="bold">
          目標
        </text>
      </motion.g>

      {/* A ルート（NG・マゼンタ破線）: まず WILL を上げようとしがち */}
      <motion.g {...step(1.0)}>
        <path
          d="M130,280 L320,280"
          fill="none"
          stroke="#ED008C"
          strokeWidth="3.5"
          strokeDasharray="8 7"
        />
        <path
          d="M340,260 L340,110"
          fill="none"
          stroke="#ED008C"
          strokeWidth="3.5"
          strokeDasharray="8 7"
          markerEnd="url(#arrowMagenta)"
        />
        <text x="226" y="270" fontSize="22" fontWeight="900" fill="#ED008C" textAnchor="middle">
          ×
        </text>
        <circle cx="300" cy="312" r="11" fill="#ED008C" />
        <text x="300" y="316" fontSize="11" fontWeight="900" fill="#fff" textAnchor="middle">
          A
        </text>
        <text x="318" y="316" fontSize="11" fill="#141210">
          このルートを考えがち。でも実はNG！
        </text>
      </motion.g>

      {/* B ルート（推奨・黄実線）: まず CAN＝行動支援 */}
      <motion.g {...step(1.5)}>
        <path
          d="M110,258 L110,80 L310,80"
          fill="none"
          stroke="#F2D600"
          strokeWidth="5"
          strokeLinejoin="round"
          markerEnd="url(#arrowYellow)"
        />
        <circle cx="76" cy="56" r="11" fill="#F2D600" />
        <text x="76" y="60" fontSize="11" fontWeight="900" fill="#141210" textAnchor="middle">
          B
        </text>
        <text x="92" y="60" fontSize="11" fontWeight="bold" fill="#141210">
          まずはこのルートで行動支援を！
        </text>
      </motion.g>

      <defs>
        <marker
          id="arrowYellow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#F2D600" />
        </marker>
        <marker
          id="arrowMagenta"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill="#ED008C" />
        </marker>
      </defs>
    </svg>
  )
}

/** 監修・信頼性（金間メソッド／コエカラ研修）— 明トーンで息継ぎ */
export function KanamaMethod() {
  return (
    <section aria-labelledby="kanama-title" className="bg-[#F4F4F2] py-20 text-[#141210] sm:py-28">
      <div className="hr-container">
        <Reveal>
          <p className="text-center text-sm font-bold tracking-[0.2em] text-[#ed008c]">
            コエカラ研修
          </p>
          <h2
            id="kanama-title"
            className="hr-impact mt-3 text-center font-black leading-tight"
            style={{ fontSize: 'clamp(1.6rem, 5vw, 3rem)' }}
          >
            注目すべきは「共感」より
            <span className="text-[#ed008c]">『行動』</span>。
          </h2>
          <p className="hr-impact mt-4 text-center text-base font-bold sm:text-xl">
            上司と若手、両方の行動を変える。
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-10">
          {/* 監修者・書影 */}
          <Reveal>
            <div className="rounded-[14px] bg-white p-7 shadow-[0_8px_32px_rgba(20,18,16,0.08)] sm:p-9">
              <p className="text-sm font-bold tracking-wider text-[#141210]/60">
                金沢大学教授・若者研究の第一人者
              </p>
              <p className="hr-impact mt-2 text-2xl font-black sm:text-3xl">
                金間 大介 <span className="text-lg font-bold">教授</span> 監修
              </p>

              <div className="mt-7 flex items-start gap-6">
                <div className="flex shrink-0 gap-3">
                  <Image
                    src="/hr/credibility/book_taishoku_shizukani.jpg"
                    alt="金間大介 著『静かに退職する若者たち』書影"
                    width={520}
                    height={727}
                    className="w-24 rounded shadow-md sm:w-28"
                    sizes="112px"
                  />
                  <Image
                    src="/hr/credibility/book_mutekika.jpg"
                    alt="金間大介 著『無敵化する若者たち』書影"
                    width={189}
                    height={272}
                    className="w-24 self-end rounded shadow-md sm:w-28"
                    sizes="112px"
                  />
                </div>
                <div className="text-sm leading-relaxed text-[#141210]/80">
                  <p className="font-bold text-[#141210]">人気著書</p>
                  <ul className="mt-2 space-y-1.5">
                    <li>『静かに退職する若者たち』</li>
                    <li>『無敵化する若者たち』</li>
                  </ul>
                </div>
              </div>

              <div className="mt-7 overflow-hidden rounded-lg">
                <Image
                  src="/hr/credibility/training_scene.jpg"
                  alt="コエカラ研修のワークショップ風景"
                  width={1400}
                  height={931}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 90vw, 480px"
                />
              </div>
            </div>
          </Reveal>

          {/* CAN×WILL マトリクス */}
          <Reveal delay={0.15}>
            <div className="rounded-[14px] bg-white p-7 shadow-[0_8px_32px_rgba(20,18,16,0.08)] sm:p-9">
              <h3 className="hr-impact text-lg font-black sm:text-xl">
                気持ちと行動の関係図
                <span className="ml-2 align-middle text-xs font-medium text-[#141210]/50">
                  （『無敵化する若者たち』より引用）
                </span>
              </h3>
              <div className="mt-5 flex justify-center">
                <CanWillMatrix />
              </div>
              <p className="mt-6 border-l-4 border-[#ed008c] pl-4 text-[15px] font-medium leading-relaxed text-[#141210]/85">
                価値観の違いを認め、受け入れ、行動に注目したフィードバックを重ねることが大切。
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
