import { useEffect, useRef, useState } from 'react'
import photo from '../assets/photo.jpg'

const CHARS = [' ', '.', ':', '-', '=', '+', '*', '#', '%', '█']
const COLS = 64
const CHAR_ASPECT = 0.55

interface Cell {
  ch: string
  color: string
}

/**
 * Real photo rendered as ASCII/block-character art (neofetch-style), with
 * autoplay crossfade to the plain photo every few seconds, and an instant
 * reveal on hover.
 */
export function BitPortrait({ className = '' }: { className?: string }) {
  const [grid, setGrid] = useState<Cell[][] | null>(null)
  const [mode, setMode] = useState<'bits' | 'plain'>('bits')
  const hovered = useRef(false)

  useEffect(() => {
    const img = new Image()
    img.src = photo
    img.onload = () => {
      const rows = Math.round((img.height / img.width) * COLS * CHAR_ASPECT)
      const sample = document.createElement('canvas')
      sample.width = COLS
      sample.height = rows
      const ctx = sample.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, COLS, rows)
      const { data } = ctx.getImageData(0, 0, COLS, rows)

      const next: Cell[][] = []
      for (let y = 0; y < rows; y++) {
        const row: Cell[] = []
        for (let x = 0; x < COLS; x++) {
          const idx = (y * COLS + x) * 4
          const r = data[idx]
          const g = data[idx + 1]
          const b = data[idx + 2]
          const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
          const level = Math.min(CHARS.length - 1, Math.floor((1 - luminance) * CHARS.length))
          const brightness = Math.min(1, (1 - luminance) * 1.2 + 0.15)
          const blueChannel = Math.round(170 + brightness * 70)
          row.push({
            ch: CHARS[level],
            color: `rgba(56, 189, ${blueChannel}, ${0.35 + brightness * 0.65})`,
          })
        }
        next.push(row)
      }
      setGrid(next)
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
      role="img"
      aria-label="Rafael Arenas"
      className={`relative w-full select-none ${className}`}
      style={{ aspectRatio: '480 / 425' }}
      onMouseEnter={() => {
        hovered.current = true
        setMode('plain')
      }}
      onMouseLeave={() => {
        hovered.current = false
        setMode('bits')
      }}
    >
      <div
        aria-hidden={mode !== 'bits'}
        className="absolute inset-0 overflow-hidden whitespace-pre font-mono leading-[1.05] transition-opacity duration-700"
        style={{ fontSize: '6.5px', opacity: mode === 'bits' ? 1 : 0 }}
      >
        {grid?.map((row, y) => (
          <div key={y} className="flex">
            {row.map((cell, x) => (
              <span key={x} style={{ color: cell.color }}>
                {cell.ch}
              </span>
            ))}
          </div>
        ))}
      </div>
      <img
        src={photo}
        alt=""
        aria-hidden={mode !== 'plain'}
        className="absolute inset-0 h-full w-full object-cover grayscale transition-opacity duration-700"
        style={{ opacity: mode === 'plain' ? 1 : 0 }}
      />
    </div>
  )
}
