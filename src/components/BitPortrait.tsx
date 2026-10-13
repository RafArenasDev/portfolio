import { useEffect, useRef, useState } from 'react'
import avatar from '../assets/avatar.png'

const COLS = 132

interface DitherResult {
  cols: number
  rows: number
  on: Uint8Array
}

function floydSteinbergDither(img: HTMLImageElement, cols: number): DitherResult {
  const rows = Math.round((img.height / img.width) * cols)
  const sample = document.createElement('canvas')
  sample.width = cols
  sample.height = rows
  const ctx = sample.getContext('2d')
  if (!ctx) return { cols, rows, on: new Uint8Array(0) }
  ctx.drawImage(img, 0, 0, cols, rows)
  const { data } = ctx.getImageData(0, 0, cols, rows)

  const lum = new Float32Array(cols * rows)
  for (let i = 0; i < cols * rows; i++) {
    const r = data[i * 4]
    const g = data[i * 4 + 1]
    const b = data[i * 4 + 2]
    const a = data[i * 4 + 3] / 255
    const luminance = 0.299 * r + 0.587 * g + 0.114 * b
    // transparent pixels (illustration cutout) bias toward "blank"
    lum[i] = luminance * a + 255 * (1 - a)
  }

  const on = new Uint8Array(cols * rows)
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x
      const old = lum[i]
      const isDark = old < 150
      on[i] = isDark ? 1 : 0
      const err = old - (isDark ? 0 : 255)
      if (x + 1 < cols) lum[i + 1] += (err * 7) / 16
      if (y + 1 < rows) {
        if (x > 0) lum[i - 1 + cols] += (err * 3) / 16
        lum[i + cols] += (err * 5) / 16
        if (x + 1 < cols) lum[i + 1 + cols] += (err * 1) / 16
      }
    }
  }

  return { cols, rows, on }
}

/**
 * Real avatar rendered as a 1-bit Floyd-Steinberg dithered dot portrait
 * (matching the "VISUAL.MAP" look on github.com/RafArenasDev), with an
 * autoplay crossfade to the plain image every few seconds and an instant
 * reveal on hover.
 */
export function BitPortrait({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dims, setDims] = useState<{ cols: number; rows: number } | null>(null)
  const [mode, setMode] = useState<'bits' | 'plain'>('bits')
  const hovered = useRef(false)

  useEffect(() => {
    const img = new Image()
    img.src = avatar
    img.onload = () => {
      const { cols, rows, on } = floydSteinbergDither(img, COLS)
      setDims({ cols, rows })

      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cell = 4
      canvas.width = cols * cell * dpr
      canvas.height = rows * cell * dpr
      canvas.style.width = '100%'
      canvas.style.height = 'auto'
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.scale(dpr, dpr)
      ctx.fillStyle = '#05080e'
      ctx.fillRect(0, 0, cols * cell, rows * cell)

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (!on[y * cols + x]) continue
          const jitter = 0.65 + Math.random() * 0.35
          const r = cell * 0.42 * jitter
          ctx.fillStyle = `rgba(56, 189, 248, ${0.75 + Math.random() * 0.25})`
          ctx.beginPath()
          ctx.arc(x * cell + cell / 2, y * cell + cell / 2, r, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      if (!hovered.current) setMode((m) => (m === 'bits' ? 'plain' : 'bits'))
    }, 6500)
    return () => window.clearInterval(id)
  }, [])

  return (
    <div
      className={`select-none ${className}`}
      onMouseEnter={() => {
        hovered.current = true
        setMode('plain')
      }}
      onMouseLeave={() => {
        hovered.current = false
        setMode('bits')
      }}
    >
      <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] text-(--color-text-faint)">
        <span>VISUAL.MAP</span>
        <span>
          {dims ? `${dims.cols}x${dims.rows}` : '…'} / 1-BIT
        </span>
      </div>
      <div role="img" aria-label="Rafael Arenas" className="relative w-full" style={{ aspectRatio: '560 / 448' }}>
        <canvas
          ref={canvasRef}
          aria-hidden={mode !== 'bits'}
          className="absolute inset-0 h-full w-full rounded-md transition-opacity duration-700"
          style={{ opacity: mode === 'bits' ? 1 : 0 }}
        />
        <img
          src={avatar}
          alt=""
          aria-hidden={mode !== 'plain'}
          className="absolute inset-0 h-full w-full rounded-md object-contain transition-opacity duration-700"
          style={{ opacity: mode === 'plain' ? 1 : 0 }}
        />
      </div>
    </div>
  )
}
