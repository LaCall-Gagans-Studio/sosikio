// src/app/(frontend)/data_philosophy.ts

export type Staff = {
  id: string
  name: string
  role: string
  bio?: string
  avatar: string
  links?: { label: string; href: string }[]
}

export type TimelineItem = {
  year: string
  title: string
  detail?: string
}

export type Office = {
  label: string
  address: string
  note?: string
  mapEmbedUrl?: string // Google Maps 埋め込み用URL（任意）
}

export const VISION = {
  tagline: '日常に、組織が変わる歓びを',
  lead: '変化はイベントではなく日常の連続に宿ります。データと対話を往復させ、"分かった気" を越えて、具体的な一歩をチームで積み重ねる。そのはずみ車づくりこそ、私たちの事業の中心です。',
}

// ※ 代表名を架空名に変更
export const REPRESENTATIVE = {
  name: '斎藤 凛',
  title: '代表 / ファシリテーター',
  avatar: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=640&auto=format&fit=crop',
  greeting:
    'ご覧いただきありがとうございます。私たちは、現場の熱と経営の構想が“ちゃんと出会う場”を増やしたい。その思いから、サーベイ（LOOK）と会議の可視化（PROBE）、対話の設計（BOON）を一つの循環に統合しました。組織が変わる歓びを、もっと日常に。ご一緒できることを楽しみにしています。',
}

// ※ BOONIST を8名の架空名で用意
export const STAFFS: Staff[] = [
  {
    id: 'boonist-1',
    name: '朝日 巧',
    role: 'ファシリテーター / 編集',
    avatar:
      'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=512&auto=format&fit=crop',
    bio: '対話設計と場づくり。現場の言葉を発見して編むのが得意です。',
  },
  {
    id: 'boonist-2',
    name: '木下 仁',
    role: 'アナリスト',
    avatar: 'https://images.unsplash.com/photo-1544006659-f0b21884ce1d?w=512&auto=format&fit=crop',
    bio: '会議行動の解析や発言の偏り可視化を担当。',
  },
  {
    id: 'boonist-3',
    name: '水野 ほのか',
    role: 'プロジェクトマネージャー',
    avatar: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=512&auto=format&fit=crop',
    bio: '部門横断の伴走と実行計画の具体化が持ち味。',
  },
  {
    id: 'boonist-4',
    name: '高原 颯',
    role: 'リサーチ / デザイン',
    avatar:
      'https://images.unsplash.com/photo-1541534401786-2077eed87a72?w=512&auto=format&fit=crop',
    bio: '調査設計からデータの読み解き、プロトタイプまで。',
  },
  {
    id: 'boonist-5',
    name: '相沢 茜',
    role: 'ファシリテーター',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=512&auto=format&fit=crop',
    bio: '越境学習の設計と合意形成の支援が専門。',
  },
  {
    id: 'boonist-6',
    name: '成瀬 海斗',
    role: 'データエンジニア',
    avatar: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=512&auto=format&fit=crop',
    bio: 'サーベイ/音声データの基盤整備と可視化ダッシュボードを担当。',
  },
  {
    id: 'boonist-7',
    name: '白石 優',
    role: 'コミュニティマネージャー',
    avatar:
      'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=512&auto=format&fit=crop',
    bio: '実践者コミュニティ運営とナレッジ編集を推進。',
  },
  {
    id: 'boonist-8',
    name: '久遠 まどか',
    role: 'UXライター / 設計',
    avatar: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=512&auto=format&fit=crop',
    bio: 'プロダクトと言葉の一貫性を設計。実装チームと密に連携。',
  },
]

export const TIMELINE: TimelineItem[] = [
  { year: '2022', title: 'プロジェクトSOSIKIO 構想開始' },
  { year: '2023', title: 'LOOK α版を複数社で実証', detail: '100秒サーベイと簡易可視化を提供' },
  {
    year: '2024',
    title: 'PROBE / BOON 提供開始',
    detail: '会議可視化と対話ファシリテーションを循環化',
  },
  { year: '2025', title: '総合パッケージへ統合', detail: 'データ→対話→行動の運用を定着支援' },
]

export const RELATED = {
  name: '北菱電興株式会社',
  description:
    '社会・産業インフラ領域での長年の実績を持つ技術商社。連携領域：現場改善DX/センシング/運用基盤など。',
  url: 'https://www.hokuryodenko.co.jp/',
}

// ── 追加の型 ─────────────────────────────────────────────
export type CompanyOffice = {
  label: string // 拠点名（本社/富山支店…）
  address: string
  tel?: string
  fax?: string
  mapEmbedUrl?: string // 任意
}

export type RelatedCompany = {
  name: string
  logoUrl: string // 会社ロゴ（/public 配下推奨）
  url: string
  description?: string
  established?: string
  capital?: string
  motto?: string // 社是
  employees?: string
  businesses?: string[] // 事業領域の見出しだけ抽出
  offices: CompanyOffice[]
}

// ── 鳥取（自社拠点）は今回は非表示にするため OFFICES は空か削除 ──
export const OFFICES: Office[] = [] // ← 今回は使わない（鳥取は関係なし）

// ── 関連会社（北菱電興） ─────────────────────────────────
export const RELATED_COMPANY: RelatedCompany = {
  name: '北菱電興株式会社',
  logoUrl: '/mats/logo/hokuryodenko.png', // ★ロゴをpublic配下に置いてください
  url: 'https://www.hokuryodenko.co.jp/',
  description:
    '社会・産業インフラに強みを持つ技術商社。FA/空調・設備、情報通信・映像、社会・環境システム、施設、開発など多領域で実績。',
  established: '1947年1月20日',
  capital: '1億円',
  motto: '創意工夫',
  employees: '366名（2025年9月現在）',
  businesses: [
    'FAシステム',
    '三菱冷熱住設・ビルシステム',
    '情報通信・映像システム／半導体・デバイス',
    '社会／環境システム事業',
    '施設事業',
    '開発事業部',
  ],
  offices: [
    {
      label: '本社',
      address: '〒920-0362 石川県金沢市古府3-12',
      tel: '076-269-8500',
      fax: '076-269-8501',
    },
    {
      label: '富山支店（2025年4月 新築移転）',
      address: '〒930-0151 富山県富山市古沢780-1（呉羽南部企業団地内）',
      tel: '076-436-2410',
      fax: '076-436-2420',
    },
    {
      label: '福井支店（2020年4月 移転）',
      address: '〒910-0001 福井県福井市大願寺2丁目9-1 福井開発ビル3階',
      tel: '0776-43-6898',
      fax: '0776-43-6897',
    },
    {
      label: '開発センター',
      address: '〒924-0004 石川県白山市旭丘3-11',
      tel: '076-275-8191',
      fax: '076-275-8190',
    },
    {
      label: 'いなほ工場',
      address: '〒920-0378 石川県金沢市いなほ1-6',
      tel: '076-256-3410',
      fax: '076-256-3412',
    },
    {
      label: '東京営業所（施設事業｜2024年3月 移転）',
      address: '〒176-0012 東京都練馬区豊玉北5-17-12 練馬駅前ビル6階',
      tel: '03-5848-2462',
      fax: '03-5848-2467',
    },
    {
      label: '滋賀営業所（2022年12月 移転）',
      address: '〒520-0046 滋賀県大津市長等2丁目1-21 田中興産ビル2階',
      tel: '077-526-8717',
      fax: '077-526-8727',
    },
  ],
}
