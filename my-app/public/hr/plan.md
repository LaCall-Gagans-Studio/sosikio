# plan.md — SOSIKIO LP `sosikio.jp/hr` 実装プラン

> Cursor 用の実装指示書。既存の Next.js 15 / React 19 / TypeScript / Tailwind v4 / Payload 3.60
> プロジェクトに、HR EXPO 連動の LP を **1 ルート** 追加する。
> 素材は同梱の `hr_material/` を `public/hr/` に配置して参照する。

---

## 0. ゴールと前提

- **追加するページ**: `sosikio.jp/hr`（App Router の単一セグメント）
- **目的**: HR EXPO 来場者・検索流入に対し、「離職の“予兆”をコエで可視化する」という SOSIKIO の価値を 30 秒で伝え、**資料請求／デモ依頼**に繋げる。
- **既存スタック（package.json 確認済み・新規 npm 追加は最小限に）**:
  - `next@15.4.8` / `react@19.1.0` / `typescript`
  - `tailwindcss@^4`（`@theme` で design token を流し込む）
  - `framer-motion@^12`（スクロール演出・線アニメの主役）
  - `lucide-react`（アイコン）
  - `react-countup`（数値カウント）
  - `three` / `@react-three?` → three は素のみ。**必須ではない**。重い 3D は不要。
  - `matter-js`（任意の遊び＝ドミノ演出。なくても良い）
  - `payload@3.60`（フォーム送信先 / CMS）
- **新規追加して良いもの**: グラフを綺麗に再実装したい場合のみ。まず **素の SVG + framer-motion** で実装し、どうしても必要なら `recharts` を検討（既存に無いので原則は SVG 自作で済ませる）。

---

## 1. トンマナ（最重要）

印刷物は **2 つの世界観** を併せ持つ。LP では役割を分けて使う。

### A. 警告トーン（ベース）＝ 黒 × 蛍光イエロー
- リッチブラック `#141210` 地に、蛍光イエロー `#FFF200` の極太見出し。
- 区切りに **虎目（ハザード）ストライプ**（黄×黒の斜線）。「現場の危険＝離職」を象徴。
- ヒーロー / 問題提起 / 解決の主要面はこの世界観。

### B. STOP トーン（アクセント）＝ 白／マゼンタ
- マゼンタ `#ED008C` ＝「STOP! 離職」「感情のコエ」「キャラのラベル」。
- 信頼性セクションだけ `--hr-paper #F4F4F2` の明地で“息継ぎ”を作る。

### カラートークン（`hr_material/tokens/tokens.css` をそのまま読み込む）
| 変数 | 値 | 用途 |
|---|---|---|
| `--hr-yellow` | `#FFF200` | 見出し・ハイライト |
| `--hr-magenta` | `#ED008C` | STOP/感情/離職アラート |
| `--hr-ink` | `#141210` | 背景主役 |
| `--hr-ink-2/3` | `#1C1C1E`/`#2A2A2E` | パネル・グラフ面 |
| `--hr-paper` | `#F4F4F2` | 明セクション地 |
| 主観の線 | `#F2D600`（黄） | グラフ：主観のコエ |
| 感情の線 | `#ED008C`（マゼンタ） | グラフ：感情のコエ |

### タイポグラフィ（Google Fonts を `next/font` で）
- 日本語見出し（極太）: **Zen Kaku Gothic New (700–900)**（フォールバック Noto Sans JP 900）
- 本文: **Noto Sans JP (400/500/700)**
- 英字インパクト（"STOP!" "SOSIKIO" 風）: **Anton**（または Archivo Black）
- 「辞めた！」筆文字を出すなら: **Yuji Syuku**（多用しない。1 箇所アクセント）
- 巨大見出しは `font-size: clamp(2.4rem, 8vw, 6rem)` 系で可変に。

### モチーフ部品
- **ハザードストライプ**: `tokens.css` の `.hr-hazard`（CSS だけで再現）か `brand/tiger_stripe.svg` を `repeat-x`。セクション境界の細帯（高さ 14–24px）に使う。
- **SOSIKIO の "O" グリッチリング**: `.hr-glitch-ring`（conic-gradient）。ロゴ周りやローダーのアクセント。
- **稲妻**: `speaker_lineart.png` に同梱。締めのアクセントに。

---

## 2. コピー（確定文言）

### ヒーロー
- 大見出し: **「辞表は、ある日突然じゃない。」**
- サブ: **離職の“予兆”を、コエで可視化する。**
- 補足ラベル: `「コエの健康診断」 ※特許出願中`
- CTA: 第一「資料を請求する」/ 第二「デモを見る」

### 問題提起（3 ケース）
- リード: **その“辞める”、本当に突然でしたか？**
- 3 キャラ（ラベルはマゼンタ）:
  - **期待の星くん** —「部長みたいになりたいっす」と言ってたリーダー候補も、辞めた。
  - **大丈夫さん** —「大丈夫です」が口癖の優等生が、急に辞めた。
  - **友達ドミノくん** — 転職した友達に影響を受けて、辞めた。

### 解決＝コエの健康診断（2 軸）
- 見出し: **「主観のコエ」×「感情のコエ」で、予兆を可視化。**
- 主観のコエ／顕在診断: 金間大介教授監修のサーベイ＋退勤時に「心の状態」を選択。本人の主観的なエンゲージメントを可視化。（**所要 100 秒** ← react-countup で）
- 感情のコエ／潜在診断: 声の日報を録音するだけ。音声から元気度・ストレスを自動測定。本人も気づかない深層を毎日検知。

### ケース別グラフ（合図）
- CASE1 期待の星くん: 揺らぎなく高い数値を出し続けていたことが合図。
- CASE2 大丈夫さん: 本音とタテマエのギャップが開き始めた頃が合図。
- CASE3 友達ドミノくん: 毎日の測定だから見える、緩やかな降下が合図。

### プラグインで最大化
- 見出し: **既存サーベイに、プラグインで最大化。**
- 本文: 既存サーベイ・既存研修・1on1 — 捨てなくていい。SOSIKIO は毎日の「コエ」を重ねるだけ。サーベイの価値が上がります。

### 監修・信頼性（金間メソッド／コエカラ研修）
- **金沢大学教授・若者研究の第一人者 金間大介 教授 監修。**
- 著書『静かに退職する若者たち』『無敵化する若者たち』
- コエカラ研修: **注目すべきは「共感」より『行動』。** 上司と若手、両方の行動を変える。
  - 価値観の違いを認め、受け入れ、行動に注目したフィードバックを重ねることが大切。

### 締め CTA
- 見出し: **あなたなら、どう引き止める？**（黄パネル）
- ボタン: 「資料を請求する」

### 必須ディスクレーマー（フッター近く・小さく）
> 本図表は、想定例に基づく概念図です。実際の効果や個社の性能を保証するものではございません。

---

## 3. ページ構成（セクション順）

```
app/hr/page.tsx        ← サーバーコンポーネント（メタ＋セクション組み立て）
app/hr/_components/     ← 以下を分割
  HeroAlert.tsx
  CaseIntro.tsx         （3キャラカード）
  TwoVoices.tsx         （主観×感情）
  CaseGraphs.tsx        （CASE1-3 グラフ）
  PluginMax.tsx
  KanamaMethod.tsx      （監修＋コエカラ研修＋書影）
  ClosingCTA.tsx
  LeadForm.tsx          （資料請求）
  HazardDivider.tsx     （区切り帯）
  Reveal.tsx            （framer-motion 共通ラッパー）
```

| # | セクション | 地 | 主要素材 | 演出 |
|---|---|---|---|---|
| 1 | **Hero** | 黒×黄 | `brand/logo_sosikio`, `characters/char_kitai` or `ui/speaker_lineart`, ハザード帯 | 見出しマスク・リビール／稲妻フリッカ／ストライプ微速スクロール |
| 2 | **Case Intro** | 黒 | `characters/char_kitai|daijobu|domino` | 3 カードを stagger で迫り上げ、hover で lift。ラベルはマゼンタタブ |
| 3 | **Two Voices** | 黒×黄 | `ui/phone_survey`, `ui/voice_report` | 「100秒」を react-countup、2 つの診断を左右で対比 |
| 4 | **Case Graphs** | 黒（ink-2 面） | `ui/graph_case1-3`（参考）→ **SVG 再実装推奨** | 線を左→右に描画、マゼンタの「退職連絡」縦線を最後にスナップ |
| 5 | **Plugin Max** | 黒×黄 | 吹き出し（CSS）| 既存ツールのチップが SOSIKIO に“重なる”積層アニメ |
| 6 | **Kanama Method** | 明（paper） | `credibility/book_*`, `ui/matrix_canwill`, `credibility/training_scene` | 書影フェード、CAN×WILL マトリクスを順に点灯 |
| 7 | **Closing CTA** | 黄ベタ | テキストのみ | 「あなたなら、どう引き止める？」大見出し＋ボタン |
| 8 | **Lead Form / Footer** | 黒 | ロゴ | フォーム送信。ディスクレーマー |

各セクション間に `HazardDivider`（黄×黒斜線の細帯）を挟む。

---

## 4. グラフの作り方（質を上げる肝）

`ui/graph_case*.png` は印刷物の**概念図**そのまま。色とカーブの参照に使い、本番は SVG で再描画する：

- 2 系列: **主観のコエ＝黄 `#F2D600`**／**感情のコエ＝マゼンタ `#ED008C`**、各 12〜14 点。
- カーブ形状（参照）:
  - CASE1: 両線とも高位で並走 → 末端で主観も急落（“突然”）。
  - CASE2: 主観は高め維持、感情だけ先に下降 → ギャップ拡大。
  - CASE3: 両線が **緩やかに右肩下がり**（ドミノ）。
- 末尾に **マゼンタ破線の縦ライン＋「退職連絡」タグ**。
- アニメ: `framer-motion` で `path` の `pathLength` を 0→1。`whileInView` ＋ `viewport={{ once: true }}`。
- 軸ラベルは最小限（高／低、横は時間）。データはダミー定数で良い（あくまで概念図）。

---

## 5. 実装メモ（Next/Payload 固有）

- **画像**: `next/image` を使用。`public/hr/...` を参照。透過 PNG は `unoptimized` 不要、`.webp` があるものは Next が自動最適化。人物は `priority` をヒーローのみ。
- **フォント**: `next/font/google` で `Zen_Kaku_Gothic_New`, `Noto_Sans_JP`, `Anton`, `Yuji_Syuku` を読み込み CSS 変数化。`display: 'swap'`。
- **資料請求フォーム（LeadForm）**:
  - 送信先は **Payload のコレクション**を新設して REST で受ける形が素直。
    - 例: `collections/HrLeads.ts`（fields: 会社名 / 氏名 / メール / 電話 / 興味＝[SOSIKIO, コエカラ研修] / 備考 / source='hr-lp'）。`access.create: () => true`。
    - 送信は `POST /api/hr-leads`（Payload 標準 REST）。CSRF/honeypot を入れる。
    - 通知メールが要るなら `nodemailer`（`@types/nodemailer` 導入済み）で Payload `afterChange` フック。
  - フォームは **`<form>` のネイティブ送信は使わず**、`onSubmit` で `fetch`（Payload admin と競合させない）。バリデーションは zod 無しでも最小手書きで可。
- **計測**: `@microsoft/clarity` が依存にあるので、`/hr` でも初期化されるか確認。CTA クリックにイベントを 1 つ仕込む。
- **ルート干渉**: `/hr` は Payload admin（`/admin`）と無関係。`app/hr/page.tsx` で完結。

---

## 6. アニメーション指針（framer-motion）

- 共通 `Reveal`: `initial={{opacity:0, y:24}} whileInView={{opacity:1, y:0}} viewport={{once:true, margin:"-10%"}} transition={{duration:.6, ease:[.22,.61,.36,1]}}`。
- ヒーロー見出し: 行ごとに `clip-path` リビール（黄→白の順で）。
- 稲妻: `speaker_lineart` の上に小さな稲妻 SVG を `repeat` で 0.1s フリッカ（控えめに）。
- 数値: `react-countup` を `enableScrollSpy`。
- **`prefers-reduced-motion`**: `useReducedMotion()` で全演出を即時表示にフォールバック（必須）。

---

## 7. レスポンシブ / アクセシビリティ / SEO

- **モバイル優先**。ヒーロー見出しは `clamp()`、3 キャラは縦積み（横スクロールにしない）。
- コントラスト: 黄地に黒文字／黒地に黄・白・マゼンタは AA を満たす。マゼンタ文字を黒地で本文に使うのは避け、見出し・ラベル限定。
- 画像 `alt`: 人物＝「期待の星くん（離職ケースの人物イメージ）」等、説明的に。装飾画像は `alt=""`。
- ランドマーク: `header/main/section(aria-labelledby)/footer`、見出し階層 h1→h2。フォームは `label` 必須・`:focus-visible` リング。
- メタ（`app/hr/page.tsx` の `metadata`）:
  - `title`: 「離職の予兆をコエで可視化｜SOSIKIO（コエの健康診断）」
  - `description`: 「辞表は、ある日突然じゃない。主観のコエ×感情のコエで離職の予兆を毎日可視化。金間大介教授監修・特許出願中。」
  - OGP 画像: ヒーローを 1200×630 で書き出し `public/hr/og.png`（後日でも可）。`lang="ja"`。
- `※特許出願中` `想定例に基づく概念図` の注記を**必ず**残す（薬機・景表的な配慮）。

---

## 8. 実装チェックリスト

- [ ] `hr_material/` を `public/hr/` に配置（reference/tokens は除外可）
- [ ] `tokens.css` を `@theme` or グローバル CSS に取り込み
- [ ] `next/font` で 4 フォント設定
- [ ] 8 セクション＋`HazardDivider`＋`Reveal` を実装
- [ ] CASE グラフを SVG で再実装（線描画アニメ）
- [ ] `LeadForm` → Payload `HrLeads` コレクション作成・REST 送信・完了表示
- [ ] `prefers-reduced-motion` 対応
- [ ] メタ／OGP／`lang=ja`
- [ ] Lighthouse（モバイル）で LCP 改善（ヒーロー画像 `priority`、webp 利用）
- [ ] ディスクレーマー文言の最終確認

---

## 9. 参考（原本レイアウト）

`hr_material/reference/` に原本の縮小版を同梱。トンマナ・コピーの一次ソースとして参照：
- `poster_left_main.jpg`（しくじるタイミング／主観＋感情のコエ／プラグイン）
- `poster_right_kanama.jpg`（金間メソッド／CAN-WILL／コエカラ研修）
- `nobori_*.jpg`（STOP!離職 のぼり）/ `a2_poster.jpg` / `deco_anata_nara.jpg`
