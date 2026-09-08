/**
 * Thinking OS 人格パッケージの表示用データ。
 *
 * 出典は probe-app/src/lib/thinking-os/packages/*.ts。
 * 名前・副題・指摘の焦点・理想値・語り口・Reaction カードは実装からの転記で、
 * LP のために創作した文言は含まない。probe-app 側を更新したらここも合わせる。
 */

export type OsCategory = 'default' | 'extra'

export interface OsIdeal {
  /** 活力 WE（1〜10・基準線 4.5・高いほど良い） */
  vitality: number
  /** ストレス BO（1〜10・基準線 4.5・低いほど良い） */
  stress: number
  /** 最大話者の発話シェア（0〜1・低いほどフラット） */
  speakerMaxShare: number
}

export interface OsPersona {
  osId: string
  name: string
  initial: string
  tagline: string
  category: OsCategory
  version: string
  /** 人格の識別色。アバター枠と GAP 行の点だけに使う */
  accent: string
  avatar: string
  principleCount: number
  reactionCount: number
  /** 会話で名指す対象 */
  titleFocus: string
  overview: string
  /** 口調の実物 */
  voiceSample: string
  ideal: OsIdeal
  /** 理想値の置き方の説明（人格差の根拠） */
  idealNote: string
  /** 固定セッション（発言の偏り／リーダーが話しすぎ）に対して選ばれるカード */
  reaction: {
    id: string
    title: string
    leaderQuestion: string
    actionCandidate: string
    avoid: string
  }
}

/** 各人格が同じ会議を読むことを示すための、固定した実測値。 */
export const FIXED_SESSION = {
  vitality: 4.82,
  stress: 3.91,
  speakerMaxShare: 0.48,
  signals: ['発言の偏り', 'リーダーが話しすぎ'],
} as const

export const PERSONAS: OsPersona[] = [
  {
    osId: 'executor-os',
    name: '実行家',
    initial: '実',
    tagline: '決めた一手を、担当と期限まで削り込む',
    category: 'default',
    version: '0.3.0',
    accent: '#b5561d',
    avatar: '/hr/probe/os/executor.webp',
    principleCount: 7,
    reactionCount: 17,
    titleFocus: '何が決まっていないか',
    overview:
      '会議の価値を「次に何が動くか」だけで測る。議論の深さや納得感より、対象・期限・担当が言葉になったかを見る。速度は負荷を足して出すものではなく、荷物を降ろして出すものだと考える。',
    voiceSample:
      '動いてない。議論は残ってる。出口が空いてる。今週の成果は議事録だけ、でいいのか。',
    ideal: { vitality: 5.0, stress: 3.6, speakerMaxShare: 0.3 },
    idealNote: '焦りが雑な仕事を生むという前提から、ストレスは基準線 4.5 を明確に下回る水準に置く。',
    reaction: {
      id: 'EX-010',
      title: '担当になる人が、今日一度も段取りを話していない',
      leaderQuestion: 'この一手を実際に動かす人は、今日どこで話したか？',
      actionCandidate: '次回の冒頭で、シェアが最も低かった1名に着手の段取りを1つ確認する。',
      avoid: '誰が優秀かの順位付け。話していない人を消極的だと決めつけること。',
    },
  },
  {
    osId: 'strategist-os',
    name: '戦略家',
    initial: '戦',
    tagline: '心地よい合意を、前提から疑う',
    category: 'default',
    version: '0.3.0',
    accent: '#2f4858',
    avatar: '/hr/probe/os/strategist.webp',
    principleCount: 8,
    reactionCount: 17,
    titleFocus: '何が検証されていないか',
    overview:
      '会議を「仮説を反証する場」として扱う。全員がすぐ同意した案は、優れているのではなくまだ検証されていないだけだと見る。一定の緊張は判断を鋭くする材料として許容し、無風のまま決まった会議を最も強く警戒する。',
    voiceSample:
      'このコンセンサス、ファクトが足りてない。反対ゼロは支持じゃなく、反証のカバレッジがゼロ、というシグナル。崩れるアサンプション、1つ置けるか。',
    ideal: { vitality: 4.8, stress: 4.9, speakerMaxShare: 0.4 },
    idealNote:
      '緊張のない議論は検証されていないという前提から、既定3体で唯一ストレス目標を基準線 4.5 より上に置く。',
    reaction: {
      id: 'ST-006',
      title: '長く話したのは、論点を持っていたからか、立場があったからか',
      leaderQuestion: '今日の説明のうち、反論の余地を残して話した部分はどこか？',
      actionCandidate: '次回、冒頭の説明を1つ事前共有に回し、その時間を反論の受付にあてる。',
      avoid: 'リーダーの姿勢や独裁性を断定すること。発話量そのものを問題として扱うこと。',
    },
  },
  {
    osId: 'companion-os',
    name: '伴走者',
    initial: '伴',
    tagline: '人の体力を、成果より先に見る',
    category: 'default',
    version: '0.3.0',
    accent: '#2f6b4f',
    avatar: '/hr/probe/os/companion.webp',
    principleCount: 8,
    reactionCount: 17,
    titleFocus: '誰の状態が先に削られているか',
    overview:
      '人の状態を成果より先に置く。会議で削られた気力はその会議では表に出ず、次の会議に現れると見る。沈黙・前置き・声量の偏りを、性格ではなく場の条件を映す情報として扱う。',
    voiceSample:
      '今日は回ってます。削られてるのは、来週のあの人の声です。発話がほとんど無かった側、気になってます。',
    ideal: { vitality: 5.8, stress: 3.2, speakerMaxShare: 0.26 },
    idealNote:
      '次も同じ人が話せる状態を残すことを重視し、既定3体で最も高い活力・最も低いストレス・最もフラットなシェアを置く。',
    reaction: {
      id: 'CO-003',
      title: '今日、観察を置く場所が無かった人がいる',
      leaderQuestion: '今日いちばん言葉が少なかった人から、事実を1つ聞けるか？',
      actionCandidate:
        '次回の冒頭で、シェアが最も低かった1名に「今週いちばん気になったこと」を1つ聞く。',
      avoid: '誰が優秀かの順位付け。話していない人を消極的だと決めつけること。',
    },
  },
  {
    osId: 'newcomer-os',
    name: '新入社員',
    initial: '新',
    tagline: '若手が言えなかった一言を、代わりに置く',
    category: 'extra',
    version: '0.1.1',
    accent: '#5b57a6',
    avatar: '/hr/probe/os/newcomer.webp',
    principleCount: 8,
    reactionCount: 18,
    titleFocus: '若手が言えなかった一言',
    overview:
      '会議でいちばん立場の弱い側から場を見る。若手が黙ったのは意見が無いからではなく、出す入口が無かったからだと見る。推察は必ず推察として出し、本人に確かめる方法を添える。',
    voiceSample:
      'ここは推察です。意見が無かったんじゃなく、置く場所が無かった側に見えます。私が同じ立場なら、切れ目を待っているうちに次へ進んでいました。',
    ideal: { vitality: 5.4, stress: 3.4, speakerMaxShare: 0.22 },
    idealNote:
      'いちばん話さなかった人に発話が回ることを最優先するため、全人格の中で最も低い占有上限を置く。',
    reaction: {
      id: 'NC-005',
      title: '質問を挟む切れ目が、最後まで来なかった',
      leaderQuestion: '今日、質問を受ける時間はどこに置かれていたか？',
      actionCandidate: '次回、説明の途中に1回だけ「ここまでで分からない言葉はあるか」を挟む。',
      avoid: 'リーダーの姿勢や独裁性を断定すること。発話量そのものを問題として扱うこと。',
    },
  },
]

/** LP 上で切り替えて詳細まで見せるのは、標準提供の3体だけ */
export const SELECTABLE_PERSONAS = PERSONAS.filter((p) => p.category === 'default')

/**
 * 標準3体に加えて選択できる人格。名前と着眼点だけを一覧で示す。
 * 区分を分けず、すべて提供中の選択肢として並べる。
 */
export const ADDITIONAL_PERSONAS: { name: string; focus: string }[] = [
  ...PERSONAS.filter((p) => p.category === 'extra').map((p) => ({
    name: p.name,
    focus: p.titleFocus,
  })),
  { name: 'Z世代', focus: '納得できないまま進んだ決定はどれか' },
  { name: '現場リーダー', focus: '手が止まっている工程はどこか' },
  { name: '品質責任者', focus: '確認が省略された箇所はどこか' },
  { name: '安全管理者', focus: '危険の指摘が言いにくくなっていないか' },
  { name: 'カスタマーサクセス', focus: '顧客の言葉が議論に入っているか' },
]

export type GapVerdict = '範囲内' | '注意' | 'ズレ大'

/** GAP ＝ 実測 − 目標。判定は絶対値のしきい値で決める。 */
export function gapVerdict(gap: number, kind: 'score' | 'share'): GapVerdict {
  const abs = Math.abs(gap)
  const [ok, warn] = kind === 'share' ? [0.05, 0.12] : [0.3, 0.8]
  if (abs <= ok) return '範囲内'
  if (abs <= warn) return '注意'
  return 'ズレ大'
}

/** 符号を省略しない（デザイン.md §3.4） */
export function signed(value: number, digits: number): string {
  const sign = value > 0 ? '+' : value < 0 ? '−' : '±'
  return `${sign}${Math.abs(value).toFixed(digits)}`
}
