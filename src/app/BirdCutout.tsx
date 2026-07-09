'use client'

import { useEffect, useRef } from 'react'

const LUMINANCE_LOW = 140
const LUMINANCE_HIGH = 195
const NEUTRAL_SPREAD_MAX = 14

export default function BirdCutout({
  src,
  className,
  style,
}: {
  src: string
  className?: string
  style?: React.CSSProperties
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = new window.Image()
    img.src = src
    img.onload = () => {
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.drawImage(img, 0, 0)

      const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = frame.data
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i]
        const g = data[i + 1]
        const b = data[i + 2]
        const spread = Math.max(r, g, b) - Math.min(r, g, b)
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b
        if (spread < NEUTRAL_SPREAD_MAX) {
          const t = Math.min(1, Math.max(0, (luminance - LUMINANCE_LOW) / (LUMINANCE_HIGH - LUMINANCE_LOW)))
          data[i + 3] = data[i + 3] * (1 - t)
        }
      }
      ctx.putImageData(frame, 0, 0)
    }
  }, [src])

  return <canvas ref={canvasRef} className={className} style={style} />
}
