// data_products.ts (英語のタイポグラフィ用フィールドを追加)

import {
  BarChart2,
  Headphones,
  TrendingUp,
  Users,
  Target,
  Briefcase,
  BrainCircuit,
  PlayCircle,
  Zap,
  Layers,
} from 'lucide-react'

// --- 型定義 (拡張) ---
export type ProductId = 'LOOK' | 'PROBE' | 'BOON'

export interface FeatureDetail {
  icon: React.ElementType // アイコンはデータに残しますが、UIでは非表示にします
  title_jp: string // [変更] title -> title_jp
  title_en: string // [追加] 英語タイトル
  description: string
  image: string
}

export interface PointDetail {
  title: string
  description: string
  image: string
}

export interface Plan {
  id: string
  name: string
  description: string
  price: string
  priceValue: number
  isRecommended: boolean
  features: string[]
}

export interface ProcessStep {
  icon: React.ElementType // アイコンはデータに残しますが、UIでは非表示にします
  title_jp: string // [変更] title -> title_jp
  title_en: string // [追加] 英語ステップ名
  description: string
}

export interface AboutContent {
  main: {
    heading_jp: string // [変更] heading -> heading_jp
    heading_en: string // [追加] 英語見出し
    text: string
  }
  process: {
    title_jp: string // [変更] title -> title_jp
    title_en: string // [追加] 英語セクション名
    steps: ProcessStep[]
  }
  features: {
    title_jp: string // [変更] title -> title_jp
    title_en: string // [追加] 英語セクション名
    items: FeatureDetail[]
  }
  cta: {
    title_jp: string // [変更] title -> title_jp
    title_en: string // [追加]
    description: string
    buttonText: string
  }
}

export interface Product {
  id: ProductId
  name: string
  tagline: string
  tagline_en: string // [追加] 英語タグライン
  logo: string
  logo_long: string
  catchphrase: string
  description: string
  image: string
  mainColor: string
  bgColor: string
  bgColor_light: string
  borderColor: string
  gradient: string
  about: AboutContent
}

// --- 製品データ (英語フィールドを追記) ---
export const products: Product[] = [
  {
    id: 'LOOK',
    name: 'SOSIKIO.LOOK',
    tagline: '組織を、ミル',
    tagline_en: 'LOOK', // [追加]
    catchphrase: '100秒サーベイで、組織の"今"を可視化',
    logo: 'logo_Look.png',
    logo_long: 'logo_Look_long.png',
    description:
      '金沢大学監修の学術ベース26設問で、現場のリアルな声を定量化。経営と現場の「視座の違い」をデータで埋め、課題の優先順位を明確にします。',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
    mainColor: 'text-[#5bb5c3]',
    bgColor: 'bg-sky-50',
    bgColor_light: 'bg-[#5bb5c3]',
    borderColor: 'border-[#5bb5c3]',
    gradient: 'bg-gradient-to-r from-[#5bb5c3] to-blue-600',
    about: {
      main: {
        heading_jp: '視座の違いが、すれ違いを生む。', // [変更]
        heading_en: 'DIFFERENT VIEWS, SAME GOAL.', // [追加]
        text: '経営と現場、それぞれの視座の違いを認識せずコミュニケーションを続ければ、一体感は失われます。まずは客観的なデータで「お互いの現在地」を正しく知ることが、変革の第一歩です。',
      },
      process: {
        title_jp: 'LOOK 導入プロセス', // [変更]
        title_en: 'PROCESS', // [追加]
        steps: [
          {
            icon: Layers,
            title_jp: '設計', // [変更]
            title_en: 'Design', // [追加]
            description:
              '貴社の課題に合わせ、豊富な設問テンプレートや独自設問を組合せ、柔軟にサーベイを設計します。',
          },
          {
            icon: TrendingUp,
            title_jp: '測定', // [変更]
            title_en: 'Measure', // [追加]
            description:
              '従業員はPC・スマホから100秒で回答。回答データはリアルタイムで集計され、組織の"今"を常に可視化します。',
          },
          {
            icon: Zap,
            title_jp: '実行と改善', // [変更]
            title_en: 'Action & Iterate', // [追加]
            description:
              '分析結果を基に対話し改善策を策定。効果を次のサーベイで測定し、継続的な改善サイクルを回します。',
          },
        ],
      },
      features: {
        title_jp: 'LOOKの主な機能', // [変更]
        title_en: 'FEATURES', // [追加]
        items: [
          {
            icon: BarChart2,
            title_jp: '課題の優先順位づけ', // [変更]
            title_en: 'AI Prioritization', // [追加]
            description:
              'AIが回答データを分析し、「従業員推奨度への影響度」と「評価値」の2軸で課題を整理。取り組むべきことが一目でわかり、効果的なアクションプランの策定を支援します。',
            image: '/mats/look_about_main.webp',
          },
          {
            icon: Users,
            title_jp: '属性別クロス分析', // [変更]
            title_en: 'Cross Analysis', // [追加]
            description:
              '部署、役職、勤続年数など、様々な属性でフィルタリングが可能。特定のチームや層が抱えるユニークな課題をピンポイントで発見できます。',
            image:
              'https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=2070&auto=format&fit=crop',
          },
        ],
      },
      cta: {
        title_jp: 'まずは組織の現状把握から', // [変更]
        title_en: 'READY TO LOOK?', // [追加]
        description:
          '簡単なセットアップですぐに利用可能。あなたの組織の「今」をデータで見てみませんか？',
        buttonText: '資料請求してみる',
      },
    },
  },
  {
    id: 'PROBE',
    name: 'SOSIKIO.PROBE',
    tagline: '組織を、キク',
    tagline_en: 'PROBE', // [追加]
    logo: 'logo_Probe.png',
    logo_long: 'logo_Probe_long.png',
    catchphrase: '会議を聞けば、チームがわかる。',
    description:
      '声色分析AIが会議の音声を解析し、チームの健全性を可視化。離職や意欲低下の隠れたサインを早期に捉え、データに基づいた的確な介入を可能にします。',
    image:
      'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop',
    mainColor: 'text-[#d81e5c]',
    bgColor: 'bg-rose-100',
    bgColor_light: 'bg-[#d81e5c]',
    borderColor: 'border-[#d81e5c]',
    gradient: 'bg-gradient-to-r from-[#d81e5c] to-rose-800',
    about: {
      main: {
        heading_jp: '聴こえない声が、未来のリスクになる。', // [変更]
        heading_en: 'SILENCE IS A RISK.', // [追加]
        text: '会議中の沈黙や声のトーンは、チームのコンディションを映す鏡です。Probeは「声」から組織の健全性を可視化。主観に頼らないデータで未来のリスクを早期発見し、意味のある組織施策の立案を支援します。',
      },
      process: {
        title_jp: 'PROBE 導入プロセス', // [変更]
        title_en: 'PROCESS', // [追加]
        steps: [
          {
            icon: PlayCircle,
            title_jp: '音声収録・アップロード', // [変更]
            title_en: 'Record & Upload', // [追加]
            description:
              '日々の会議を録音し、音声データをそのままアップロード。特別な準備やツールは不要です。',
          },
          {
            icon: BrainCircuit,
            title_jp: 'AI自動解析', // [変更]
            title_en: 'AI Analysis', // [追加]
            description:
              '音声データから声のトーンやピッチをAIが解析。チームが4つのゾーンのどこに近いか傾向を明らかにします。',
          },
          {
            icon: Headphones,
            title_jp: '組織課題フィードバック', // [変更]
            title_en: 'Feedback', // [追加]
            description:
              'クラウド上で自動集約・可視化されたレポートを確認。客観的なインサイトをマネジメントに活用します。',
          },
        ],
      },
      features: {
        title_jp: 'PROBEの主な機能', // [変更]
        title_en: 'FEATURES', // [追加]
        items: [
          {
            icon: Headphones,
            title_jp: 'チーム状態の可視化', // [変更]
            title_en: 'Team Vitals', // [追加]
            description:
              '声色分析AIによる感情解析で、チームの状態を客観的に可視化。離職やモチベーション低下の現場要因に直結するインサイトを得られます。',
            image: '/mats/listen_about_main.webp',
          },
          {
            icon: Target,
            title_jp: '非言語情報の定量化', // [変更]
            title_en: 'Non-Verbal Data', // [追加]
            description:
              'AIが発話のトーンやスピードなど、言葉以外の感情表現を定量化。主観に頼らない客観的なデータで、チームのコンディションを把握できます。',
            image:
              'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
          },
        ],
      },
      cta: {
        title_jp: '聴こえない“気配”に耳をすませる。', // [変更]
        title_en: 'READY TO HEAR?', // [追加]
        description:
          'チームを守る、新しい「会議の見方」がここにあります。データに基づいた改善で、チームのパフォーマンスを最大化しましょう。',
        buttonText: '資料請求してみる',
      },
    },
  },
  {
    id: 'BOON',
    name: 'SOSIKIO.BOON',
    tagline: '組織を、アゲル',
    tagline_en: 'BOON', // [追加]
    logo: 'logo_Boon.png',
    logo_long: 'logo_Boon_long.png',
    catchphrase: 'データを行動へ変える、プロ人材伴走ワークショップ',
    description:
      'LOOK/PROBEの分析結果を基に、外部のプロ人材「ブーニスト」が対話の場を設計。現場と経営が一体となった改善アクションを導き、研修で終わらない確かな組織変革を実現します。',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2070&auto=format&fit=crop',
    mainColor: 'text-[#f4822a]',
    bgColor: 'bg-orange-50',
    bgColor_light: 'bg-[#f4822a]',
    borderColor: 'border-[#f4822a]',
    gradient: 'bg-gradient-to-r from-[#f4822a] to-orange-600',
    about: {
      main: {
        heading_jp: '「分かった」で終わらせない、プロによる対話。', // [変更]
        heading_en: 'DATA IS JUST THE START.', // [追加]
        text: 'データは行動に移してこそ価値があります。組織開発のプロが第三者の視点からファシリテーションを行い、本質的な対話を通じてデータを行動へと昇華。一方的なコンサルティングとは違う、現場に寄り添う伴走支援が強みです。',
      },
      process: {
        title_jp: 'BOON 実施プロセス', // [変更]
        title_en: 'PROCESS', // [追加]
        steps: [
          {
            icon: BarChart2,
            title_jp: '事前分析・設計', // [変更]
            title_en: 'Analyze & Design', // [追加]
            description:
              'LOOK/PROBEのデータを基に課題を特定し、貴社に最適化されたプログラムを設計します。',
          },
          {
            icon: Users,
            title_jp: '伴走ワークショップ', // [変更]
            title_en: 'Workshop', // [追加]
            description:
              'プロのファシリテーター「ブーニスト」が、本音の対話を引き出し、具体的なアクションプラン策定までを導きます。',
          },
          {
            icon: TrendingUp,
            title_jp: '実行・定着支援', // [変更]
            title_en: 'Follow-up', // [追加]
            description:
              'ワークショップ後の3ヶ月間、アクションの実行状況をトラッキングし、変革の定着まで伴走します。',
          },
        ],
      },
      features: {
        title_jp: 'BOONの提供価値', // [変更]
        title_en: 'VALUE', // [追加]
        items: [
          {
            icon: Briefcase,
            title_jp: '現場のリアルな課題解決', // [変更]
            title_en: 'Real-World Solution', // [追加]
            description:
              '机上の空論ではない、現場が日々直面しているリアルな組織課題をテーマに議論します。だからこそ、ワークショップで生まれた熱量が、翌日からの行動に繋がります。',
            image: '/mats/boon_about_main.webp',
          },
          {
            icon: TrendingUp,
            title_jp: '納得感のあるアクションプラン', // [変更]
            title_en: 'Actionable Plan', // [追加]
            description:
              '外部のプロ人材が上司と部下の「通訳」となり、本音の対話を促進。全員が納得できる具体的なアクションプランを共に創り上げます。',
            image:
              'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop',
          },
        ],
      },
      cta: {
        title_jp: '「分かった」で終わらせない', // [変更]
        title_en: 'READY TO ACT?', // [追加]
        description:
          'データは行動に移してこそ価値がある。私たちと一緒に、本質的な組織変革の第一歩を踏み出しませんか？',
        buttonText: '資料請求してみる',
      },
    },
  },
]
