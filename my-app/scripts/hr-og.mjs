/**
 * /hr の OGP 画像（1200×630）を書き出す。
 * 使い方: node scripts/hr-og.mjs
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve('public/hr/probe')
const OUT_PUBLIC = path.resolve('public/hr/og.png')
const OUT_OG = path.resolve('src/app/(hr)/hr/opengraph-image.png')
const OUT_TW = path.resolve('src/app/(hr)/hr/twitter-image.png')

const W = 1200
const H = 630
const PHOTO_W = 560

const photo = await sharp(path.join(ROOT, 'hero-gaze.webp'))
  .resize(PHOTO_W, H, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 86 })
  .toBuffer()

const logo = await sharp(path.join(ROOT, 'logo-probe.webp'))
  .resize({ width: 280, withoutEnlargement: true })
  .png()
  .toBuffer()

const logoMeta = await sharp(logo).metadata()
const logoW = logoMeta.width ?? 280
const logoH = logoMeta.height ?? 48

const panel = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#F7F6F3"/>
  <rect x="${PHOTO_W}" y="0" width="1" height="${H}" fill="#B9B4AB"/>
  <rect x="${PHOTO_W + 56}" y="236" width="36" height="2" fill="#C91E5E"/>
</svg>`)

const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W - PHOTO_W}" height="${H}">
  <style>
    .en { font-family: 'Yu Gothic UI', 'Meiryo', sans-serif; font-size: 13px; letter-spacing: 0.18em; fill: #9C978E; }
    .h  { font-family: 'Yu Mincho', 'Yu Mincho Demibold', 'Hiragino Mincho ProN', serif; font-size: 36px; font-weight: 600; fill: #171614; }
    .l  { font-family: 'Yu Gothic UI', 'Meiryo', sans-serif; font-size: 16px; fill: #6B6862; }
    .k  { font-family: 'Yu Gothic UI', 'Meiryo', sans-serif; font-size: 13px; fill: #171614; }
  </style>
  <text x="56" y="64" class="en">THINKING OS  /  BY SOSIKIO</text>
  <text x="56" y="292" class="h">会議を録音するだけで、</text>
  <text x="56" y="340" class="h">組織のコンディションを</text>
  <text x="56" y="388" class="h">可視化する。</text>
  <text x="56" y="450" class="l">定例・1on1の音声から、活力とストレスを数値化。</text>
  <text x="56" y="476" class="l">次の面談で誰に何を聞けばいいかまで届きます。</text>
  <text x="56" y="572" class="k">録音データのみ  ·  専用機材不要  ·  次の定例から</text>
</svg>`)

const image = sharp({
  create: { width: W, height: H, channels: 3, background: '#F7F6F3' },
})
  .composite([
    { input: panel, left: 0, top: 0 },
    { input: photo, left: 0, top: 0 },
    { input: logo, left: PHOTO_W + 56, top: 88 },
    { input: await sharp(text).png().toBuffer(), left: PHOTO_W, top: 0 },
  ])
  .png({ compressionLevel: 9 })

const buf = await image.toBuffer()
await writeFile(OUT_PUBLIC, buf)
await writeFile(OUT_OG, buf)
await writeFile(OUT_TW, buf)
const info = await sharp(buf).metadata()
console.log(`og.png  ${info.width}x${info.height}  ${(buf.length / 1024).toFixed(1)} KB`)
console.log(OUT_PUBLIC)
console.log(OUT_OG)
console.log(OUT_TW)
