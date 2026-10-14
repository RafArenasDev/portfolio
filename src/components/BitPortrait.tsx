import { useEffect, useRef, useState } from 'react'
import avatar from '../assets/avatar.png'

// Matches the 300x340 dither lattice from scripts/banner/generate.py
// (github.com/RafArenasDev), ported from Python/Pillow to canvas.
const GRID_W = 300
const GRID_H = 340
const CELL = 1.3
const DOT_COLOR = 'rgba(56, 189, 248, 0.92)'

interface Crop {
  left: number
  top: number
  width: number
  height: number
}

function cropFor(img: HTMLImageElement): Crop {
  const width = img.width * 0.62
  const height = width * (GRID_H / GRID_W)
  return { left: (img.width - width) / 2, top: img.height * 0.03, width, height }
}

function clamp255(v: number) {
  return v < 0 ? 0 : v > 255 ? 255 : v
}

function autocontrast(gray: Float32Array) {
  let min = 255
  let max = 0
  for (const v of gray) {
    if (v < min) min = v
    if (v > max) max = v
  }
  const range = max - min || 1
  for (let i = 0; i < gray.length; i++) gray[i] = ((gray[i] - min) / range) * 255
}

function adjustContrast(gray: Float32Array, factor: number) {
  for (let i = 0; i < gray.length; i++) gray[i] = clamp255((gray[i] - 128) * factor + 128)
}

function adjustBrightness(gray: Float32Array, factor: number) {
  for (let i = 0; i < gray.length; i++) gray[i] = clamp255(gray[i] * factor)
}

/** Serpentine 1-bit Floyd-Steinberg diffusion — true means a lit pixel. */
function floydSteinbergSerpentine(gray: Float32Array, w: number, h: number): Uint8Array {
  const work = Float32Array.from(gray)
  const out = new Uint8Array(w * h)
  for (let y = 0; y < h; y++) {
    const leftToRight = y % 2 === 0
    const dir = leftToRight ? 1 : -1
    const xStart = leftToRight ? 0 : w - 1
    const xEnd = leftToRight ? w : -1
    for (let x = xStart; x !== xEnd; x += dir) {
      const i = y * w + x
      const old = work[i]
      const val = old >= 127.5 ? 255 : 0
      out[i] = val === 255 ? 1 : 0
      const err = old - val
      const nx = x + dir
      if (nx >= 0 && nx < w) work[y * w + nx] += (err * 7) / 16
      if (y + 1 < h) {
        const bx = x - dir
        if (bx >= 0 && bx < w) work[(y + 1) * w + bx] += (err * 3) / 16
        work[(y + 1) * w + x] += (err * 5) / 16
        if (nx >= 0 && nx < w) work[(y + 1) * w + nx] += (err * 1) / 16
      }
    }
  }
  return out
}

function ditherAvatar(img: HTMLImageElement, crop: Crop): { on: Uint8Array; count: number } {
  const sample = document.createElement('canvas')
  sample.width = GRID_W
  sample.height = GRID_H
  const ctx = sample.getContext('2d')
  if (!ctx) return { on: new Uint8Array(0), count: 0 }

  // composite over solid black first, like the dark-theme banner
  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, GRID_W, GRID_H)
  ctx.drawImage(img, crop.left, crop.top, crop.width, crop.height, 0, 0, GRID_W, GRID_H)

  const { data } = ctx.getImageData(0, 0, GRID_W, GRID_H)
  const gray = new Float32Array(GRID_W * GRID_H)
  const alpha = new Float32Array(GRID_W * GRID_H)
  for (let i = 0; i < GRID_W * GRID_H; i++) {
    const r = data[i * 4]
    const g = data[i * 4 + 1]
    const b = data[i * 4 + 2]
    gray[i] = 0.299 * r + 0.587 * g + 0.114 * b
    alpha[i] = data[i * 4 + 3] / 255
  }

  autocontrast(gray)
  adjustContrast(gray, 1.35)
  adjustBrightness(gray, 1.05)

  const bits = floydSteinbergSerpentine(gray, GRID_W, GRID_H)
  let count = 0
  const on = new Uint8Array(GRID_W * GRID_H)
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] && alpha[i] > 0.08) {
      on[i] = 1
      count++
    }
  }
  return { on, count }
}

/**
 * Real avatar rendered as a 1-bit Floyd-Steinberg (serpentine) dithered dot
 * portrait, porting scripts/banner/generate.py from github.com/RafArenasDev
 * to canvas — same "VISUAL.MAP" framing, same dithering math, same crop
 * used for the plain-image hover layer so neither ever changes size.
 */
export function BitPortrait({ className = '' }: { className?: string }) {
  const dotCanvasRef = useRef<HTMLCanvasElement>(null)
  const plainCanvasRef = useRef<HTMLCanvasElement>(null)
  const [count, setCount] = useState(0)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = avatar
    img.onload = () => {
      const crop = cropFor(img)
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = GRID_W * CELL
      const h = GRID_H * CELL

      const { on, count: lit } = ditherAvatar(img, crop)
      setCount(lit)

      const dotCanvas = dotCanvasRef.current
      const plainCanvas = plainCanvasRef.current
      if (!dotCanvas || !plainCanvas) return

      for (const canvas of [dotCanvas, plainCanvas]) {
        canvas.width = w * dpr
        canvas.height = h * dpr
        canvas.style.width = '100%'
        canvas.style.height = 'auto'
      }

      const dotCtx = dotCanvas.getContext('2d')
      if (dotCtx) {
        dotCtx.scale(dpr, dpr)
        dotCtx.fillStyle = '#05080e'
        dotCtx.fillRect(0, 0, w, h)
        dotCtx.fillStyle = DOT_COLOR
        for (let y = 0; y < GRID_H; y++) {
          for (let x = 0; x < GRID_W; x++) {
            if (!on[y * GRID_W + x]) continue
            dotCtx.fillRect(x * CELL, y * CELL, CELL * 1.05, CELL * 1.05)
          }
        }
      }

      const plainCtx = plainCanvas.getContext('2d')
      if (plainCtx) {
        plainCtx.scale(dpr, dpr)
        plainCtx.fillStyle = '#05080e'
        plainCtx.fillRect(0, 0, w, h)
        plainCtx.drawImage(img, crop.left, crop.top, crop.width, crop.height, 0, 0, w, h)
      }
    }
  }, [])

  return (
    <div
      className={`select-none ${className}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] font-bold tracking-wider text-(--color-accent-strong)">
        <span>VISUAL.MAP</span>
        <span className="font-normal text-(--color-text-faint)">
          {GRID_W}×{GRID_H} / 1-BIT
        </span>
      </div>
      <div
        role="img"
        aria-label="Rafael Arenas"
        className="relative w-full overflow-hidden rounded-sm border border-(--color-border)"
        style={{ aspectRatio: `${GRID_W} / ${GRID_H}` }}
      >
        <span className="absolute left-1 top-1 h-2.5 w-2.5 border-l border-t border-(--color-accent-strong) opacity-60" />
        <span className="absolute right-1 top-1 h-2.5 w-2.5 border-r border-t border-(--color-accent-strong) opacity-60" />
        <span className="absolute bottom-1 left-1 h-2.5 w-2.5 border-b border-l border-(--color-accent-strong) opacity-60" />
        <span className="absolute bottom-1 right-1 h-2.5 w-2.5 border-b border-r border-(--color-accent-strong) opacity-60" />

        <canvas
          ref={dotCanvasRef}
          aria-hidden={hovering}
          className="animate-portrait-drift absolute inset-0 h-full w-full transition-opacity duration-500"
          style={{ opacity: hovering ? 0 : 1 }}
        />
        <canvas
          ref={plainCanvasRef}
          aria-hidden={!hovering}
          className="absolute inset-0 h-full w-full transition-opacity duration-500"
          style={{ opacity: hovering ? 1 : 0 }}
        />
      </div>
      <p className="mt-1 font-mono text-[10px] text-(--color-text-faint)">
        PTS {String(count).padStart(5, '0')} · FS/SERPENTINE
      </p>
    </div>
  )
}
