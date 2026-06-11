# hr_material — SOSIKIO /hr 素材セット

HR EXPO ブース用の印刷データ（CMYK・大判 PDF）から、Web 用（RGB・背景透過・最適化済み）に
書き出した素材一式です。`public/hr/` 配下にそのまま置く想定で整理しています。

> 透過 PNG は背景が暗色でも明色でも使えるよう、白背景を境界連結で除去済み。
> 容量優先の箇所は同名 `.webp` を併用してください（`<picture>` か Next/Image）。

## 配置例
```
public/hr/
  characters/ char_kitai.* char_daijobu.* char_domino.*
  brand/      logo_sosikio.* tiger_stripe.svg tiger_stripe.png
  ui/         phone_survey.* voice_report.* graph_case1-3.* matrix_canwill.* speaker_lineart.*
  credibility/ training_scene.jpg book_taishoku_shizukani.jpg book_mutekika.jpg
```
（`reference/` と `tokens/` はリポジトリには入れず、開発時の参照用）

---

## characters/ — 3 つの離職ケース人物（全身・透過）
| ファイル | 人物 | キャラ設定（合図） |
|---|---|---|
| `char_kitai.*` | **期待の星くん** | 揺らぎなく高い数値を出し続けていた → ある日突然 |
| `char_daijobu.*` | **大丈夫さん** | 「大丈夫です」が口癖。本音とタテマエのギャップが開く |
| `char_domino.*` | **友達ドミノくん** | 転職した友達に影響され、毎日の緩やかな降下 |

人物は studio 撮影の切り抜き。明るい地・暗い地どちらにも乗ります（暗地ではごく薄い白フリンジが出る場合あり。気になる場合は `filter: drop-shadow` でなじませる）。

## brand/
| ファイル | 用途 |
|---|---|
| `logo_sosikio.*` | SOSIKIO ロゴ（"O" は CMYK 風グリッチリング）。ヘッダー/フッターに。**暗地では白版が別途必要** → CSS の `filter: invert()` ではなく、ロゴは原則明地に置く想定 |
| `tiger_stripe.svg` | 虎目（ハザード）ストライプのシームレスタイル。区切り帯に `background: url() repeat-x` |
| `tiger_stripe.png` | 同上ラスター版（1600×120） |

> ストライプは CSS だけでも再現可：`tokens.css` の `.hr-hazard` を使用。

## ui/ — 製品の見せ場
| ファイル | 中身 | 使いどころ |
|---|---|---|
| `phone_survey.*` | スマホUI「アンケート所要時間 100秒」主観サーベイ画面（透過） | 主観のコエ／顕在診断 セクション |
| `voice_report.*` | 「声の日報」を録音する人物（透過） | 感情のコエ／潜在診断 セクション |
| `graph_case1.*` | CASE1 期待の星くん グラフ（主観=黄／感情=マゼンタ） | ケース解説。**できれば下記の通り再実装推奨** |
| `graph_case2.*` | CASE2 大丈夫さん グラフ | 同上 |
| `graph_case3.*` | CASE3 友達ドミノくん グラフ | 同上 |
| `matrix_canwill.*` | コエカラ研修の CAN×WILL マトリクス図 | 研修（金間メソッド）セクションの参考図 |
| `speaker_lineart.*` | 「俺、辞めます！」白ラインアート（透過） | ヒーロー/締めのアクセント。暗地専用 |

> グラフ画像は印刷物の「概念図」をそのまま切り出したもの。LP では
> **Recharts などで 2 本線（主観=黄／感情=マゼンタ）を再描画 + framer-motion で
> 線を引くアニメ**にすると質感が上がります。元画像は色とカーブの参照に。

## credibility/ — 監修・第三者性
| ファイル | 中身 |
|---|---|
| `training_scene.jpg` | 研修/ワークショップ風景（コエカラ研修の世界観） |
| `book_taishoku_shizukani.jpg` | 金間大介『静かに退職する若者たち』書影 |
| `book_mutekika.jpg` | 金間大介『無敵化する若者たち』書影（**低解像度**。小サムネ限定 or 差し替え推奨） |

## reference/ — 原本レイアウト（開発参照のみ・本番非使用）
- `poster_left_main.jpg` … メイン3面（しくじるタイミング / 主観＋感情のコエ / 既存サーベイにプラグイン）
- `poster_right_kanama.jpg` … 金間大介メソッド面（他責思考 / CAN-WILL / コエカラ研修）
- `nobori_kitai|daijobu|domino.jpg` … STOP!離職 のぼり3種（マゼンタ系トンマナの原典）
- `a2_poster.jpg` … 黒×黄 STOP! ポスター（警告トンマナの原典）
- `deco_anata_nara.jpg` … 「あなたなら、どう引き止める？」黄パネル

## tokens/
- `tokens.css` … CSS 変数（カラー・フォント・ハザード/グリッチ ユーティリティ）
- `tokens.json` … 同値の JSON（Tailwind theme などに流用）
