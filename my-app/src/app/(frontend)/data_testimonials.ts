// data_testimonials.ts

// --- 型定義 ---
export interface Testimonial {
  id: number
  quote: string
  name: string
  title: string
  company: string
  logoUrl: string
  avatarUrl: string
  products: ('LOOK' | 'PROBE' | 'BOON')[]
}

// --- お客様の声データ ---
export const allTestimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      '今まで見えなかった若手社員の本音がデータで可視化され、具体的な育成プランに繋げることができました。離職率も改善傾向にあります。',
    name: '田中 健一',
    title: '人事部長',
    company: '株式会社テックリード',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=TechLead',
    avatarUrl:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=388&auto=format&fit=crop',
    products: ['LOOK'],
  },
  {
    id: 2,
    quote:
      'リモートワークで希薄になっていたチームの一体感が、会議の質を見直すことで見事に復活しました。PROBEのデータが共通言語になっています。',
    name: '佐藤 由美',
    title: '開発チーム マネージャー',
    company: 'クラウドクリエイト社',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=CloudCreate',
    avatarUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=387&auto=format&fit=crop',
    products: ['PROBE'],
  },
  {
    id: 3,
    quote:
      '長年の課題だった部門間の壁が、たった2日間のワークショップで崩れました。データという共通言語があったからこそだと思います。',
    name: '伊藤 雅彦',
    title: '常務取締役 事業本部長',
    company: 'グローバル・マニュファクチャリング',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=Global+MFG',
    avatarUrl:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=387&auto=format&fit=crop',
    products: ['LOOK', 'BOON'],
  },
  {
    id: 4,
    quote:
      'まさに組織の「ブースト」でした。議論が停滞していた新規事業計画が、具体的なロードマップにまで落とし込めて、今は実行フェーズです。',
    name: '渡辺 昭夫',
    title: '新規事業開発室 室長',
    company: 'イノベーション・パートナーズ',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=Innovation+Inc',
    avatarUrl:
      'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=871&auto=format&fit=crop',
    products: ['PROBE', 'BOON'],
  },
  // --- ここから10人分のダミーデータを追加 ---
  {
    id: 5,
    quote:
      '感覚で判断していたマネジメントが、LOOKのデータのおかげで根拠を持ってメンバーと対話できるように。1on1の質が格段に上がったと感じます。',
    name: '鈴木 恵子',
    title: '営業部 課長',
    company: '株式会社ネクストセールス',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=NextSales',
    avatarUrl:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=871&auto=format&fit=crop',
    products: ['LOOK'],
  },
  {
    id: 6,
    quote:
      '会議での発言の偏りがデータで示されたのは衝撃でした。PROBE導入後、意識的に全員に話を振るようになり、チームから新しいアイデアが生まれるように。',
    name: '高橋 誠',
    title: 'プロダクト開発部 リードエンジニア',
    company: 'デジタルソリューションズ',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=Digital+Solutions',
    avatarUrl:
      'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=387&auto=format&fit=crop',
    products: ['PROBE'],
  },
  {
    id: 7,
    quote:
      '経営層と現場の間にあった「見えない壁」がBOONのワークショップで取り払われました。お互いの立場を理解し、同じ目標に向かえている実感があります。',
    name: '中村 浩',
    title: '代表取締役社長',
    company: '中村工業株式会社',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=Nakamura+Kogyo',
    avatarUrl:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=580&auto=format&fit=crop',
    products: ['LOOK', 'BOON'],
  },
  {
    id: 8,
    quote:
      'LOOKでエンゲージメントスコアが低い部署を特定し、BOONで集中的に対話の場を設けた結果、3ヶ月でスコアが20%も向上しました。',
    name: '小林 あゆみ',
    title: 'CHRO（最高人事責任者）',
    company: 'ウェルネス・フーズHD',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=WellnessFoods',
    avatarUrl:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=461&auto=format&fit=crop',
    products: ['LOOK', 'BOON'],
  },
  {
    id: 9,
    quote:
      'リモート下の新人教育に課題を感じていましたが、PROBEでコミュニケーションの量を定量的に把握できるように。データに基づいたフォローで、新人の定着率が大幅に改善しました。',
    name: '山本 竜也',
    title: 'カスタマーサクセス部 部長',
    company: '株式会社サポートプラス',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=Support+',
    avatarUrl:
      'https://images.unsplash.com/photo-1627161683080-63795ce7a6e6?q=80&w=870&auto=format=fit',
    products: ['PROBE'],
  },
  {
    id: 10,
    quote:
      '正直、最初は半信半疑でした。しかし、BOONのファシリテーターの方の引き出し方が見事で、普段は発言しないメンバーから本質的な意見が次々と出てきたのは圧巻でした。',
    name: '加藤 久美子',
    title: 'マーケティング部 ブランドマネージャー',
    company: 'ライフスタイル・ラボ',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=Lifestyle+Lab',
    avatarUrl:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=464&auto=format=fit',
    products: ['BOON'],
  },
  {
    id: 11,
    quote:
      'LOOKで全社の組織健康診断を毎年実施しています。定点観測することで、組織の良い変化も悪い変化も数字で捉えることができ、経営の重要な羅針盤になっています。',
    name: '山田 修',
    title: '経営企画室',
    company: 'ミライエステート',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=Mirai+Estate',
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=387&auto=format=fit',
    products: ['LOOK'],
  },
  {
    id: 12,
    quote:
      'マネージャーに就任したばかりで不安でしたが、PROBEがチームの状態を客観的に教えてくれるので、自信を持ってメンバーと関われるようになりました。まるで組織の聴診器です。',
    name: '木村 沙織',
    title: 'EC事業部 マネージャー',
    company: 'ファッション・デリバージャパン',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=Fashion+Deliver',
    avatarUrl:
      'https://images.unsplash.com/photo-1619895862022-09114b41f16f?q=80&w=870&auto=format=fit',
    products: ['PROBE'],
  },
  {
    id: 13,
    quote:
      'M&A後の組織融合がテーマでしたが、BOONを通じて両社の文化の違いを乗り越え、新しい企業理念を全員で創り上げることができました。一体感が生まれ、最高のスタートが切れました。',
    name: '林 健太郎',
    title: '取締役副社長',
    company: 'シナジーテック・ホールディングス',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=SynergyTech',
    avatarUrl:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=387&auto=format=fit',
    products: ['LOOK', 'BOON'],
  },
  {
    id: 14,
    quote:
      'データと対話の両輪で組織を動かす、というSOSIKIOの思想に共感しています。LOOKで課題を見つけ、BOONで解決策を共創する。このサイクルが、私たちの組織文化になりつつあります。',
    name: '斉藤 真一',
    title: '工場長',
    company: 'アサヒ精密工業',
    logoUrl: 'https://placehold.co/120x40/cccccc/000000?text=Asahi+Seimitsu',
    avatarUrl:
      'https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=870&auto=format=fit',
    products: ['LOOK', 'BOON'],
  },
]
