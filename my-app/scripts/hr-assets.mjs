// probe-app の画像素材を /hr 用に webp 化して public/hr/probe/ へ書き出す。
// 使い方: node scripts/hr-assets.mjs <probe-app のパス>
import { mkdir, readdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC_ROOT = process.argv[2] ?? 'C:/Users/Tohma/Dev/probe-app/public'
const OUT_ROOT = path.resolve('public/hr/probe')

/** 写真: 横長・大きめ。カットアウト: 透過を保持して小さめ。 */
const JOBS = [
  { from: 'leader/hero-gaze.jpg', to: 'hero-gaze.webp', width: 1600, alpha: false },
  { from: 'leader/desk-notebook.jpg', to: 'desk-notebook.webp', width: 1400, alpha: false },
  { from: 'leader/team-table.jpg', to: 'team-table.webp', width: 1400, alpha: false },
  { from: 'leader/portrait-folder.jpg', to: 'portrait-folder.webp', width: 1400, alpha: false },
  { from: 'leader/logo-probe.png', to: 'logo-probe.webp', width: 480, alpha: true },
  { from: 'leader/accent-magpie.png', to: 'accent-magpie.webp', width: 512, alpha: true },
  { from: 'leader/accent-glasses.png', to: 'accent-glasses.webp', width: 512, alpha: true },
  { from: 'leader/accent-moon.png', to: 'accent-moon.webp', width: 512, alpha: true },
  { from: 'leader/accent-books.png', to: 'accent-books.webp', width: 512, alpha: true },
  { from: 'leader/accent-pen.png', to: 'accent-pen.webp', width: 512, alpha: true },
  { from: 'leader/accent-peony.png', to: 'accent-peony.webp', width: 512, alpha: true },
  { from: 'leader/accent-clock.png', to: 'accent-clock.webp', width: 512, alpha: true },
  { from: 'leader/accent-plant.png', to: 'accent-plant.webp', width: 512, alpha: true },
  { from: 'leader/accent-crumple.png', to: 'accent-crumple.webp', width: 512, alpha: true },
  { from: 'thinking-os/executor.png', to: 'os/executor.webp', width: 640, alpha: false },
  { from: 'thinking-os/strategist.png', to: 'os/strategist.webp', width: 640, alpha: false },
  { from: 'thinking-os/companion.png', to: 'os/companion.webp', width: 640, alpha: false },
  { from: 'thinking-os/newcomer.png', to: 'os/newcomer.webp', width: 640, alpha: false },
  { from: 'thinking-os/gal.png', to: 'os/gal.webp', width: 640, alpha: false },
]

await mkdir(path.join(OUT_ROOT, 'os'), { recursive: true })

for (const job of JOBS) {
  const src = path.join(SRC_ROOT, job.from)
  const out = path.join(OUT_ROOT, job.to)
  const image = sharp(src).resize({ width: job.width, withoutEnlargement: true })
  const info = await image
    .webp({ quality: job.alpha ? 88 : 82, alphaQuality: 90, effort: 6 })
    .toFile(out)
  console.log(
    `${job.to.padEnd(28)} ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} ${(info.size / 1024).toFixed(1)} KB`,
  )
}

const written = await readdir(OUT_ROOT, { recursive: true })
console.log(`\n${written.filter((f) => f.endsWith('.webp')).length} files -> ${OUT_ROOT}`)
