'use client'

import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

type JourneyId = 'moonshop' | 'prd-reviewer' | 'liveops'

const journeys: { id: JourneyId; name: string; outcome: string; body: string; align: string }[] = [
  {
    id: 'moonshop',
    name: 'Moonshop',
    outcome: 'Placeholder outcome',
    body: 'Placeholder journey content for Moonshop.',
    align: 'items-start pl-[12%] text-left',
  },
  {
    id: 'prd-reviewer',
    name: 'PRD reviewer',
    outcome: 'Placeholder outcome',
    body: 'Placeholder journey content for PRD reviewer.',
    align: 'items-end pr-[12%] text-right',
  },
  {
    id: 'liveops',
    name: 'Liveops onboarding',
    outcome: 'Placeholder outcome',
    body: 'Placeholder journey content for Liveops onboarding.',
    align: 'items-center text-center',
  },
]

const ZONES = [
  { key: 'opening', vh: 100 },
  { key: 'thesis', vh: 140 },
  { key: 'moonshop', vh: 170 },
  { key: 'prd-reviewer', vh: 170 },
  { key: 'liveops', vh: 170 },
  { key: 'closing', vh: 100 },
] as const

const TOTAL_VH = ZONES.reduce((s, z) => s + z.vh, 0)

function ranges() {
  let cum = 0
  return ZONES.map((z) => {
    const start = cum
    cum += z.vh
    return { ...z, start: start / TOTAL_VH, end: cum / TOTAL_VH }
  })
}

function zoneOpacity(p: number, start: number, end: number) {
  const center = (start + end) / 2
  const half = (end - start) / 2
  const dist = Math.abs(p - center)
  return Math.max(0, Math.min(1, 1 - dist / half))
}

const LINGER_MS = 450

export default function Descent() {
  const [progress, setProgress] = useState(0)
  const [revealed, setRevealed] = useState<JourneyId | null>(null)
  const [active, setActive] = useState<JourneyId | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    })
    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)
    lenis.on('scroll', ({ scroll, limit }: { scroll: number; limit: number }) => {
      setProgress(limit > 0 ? scroll / limit : 0)
    })
    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  function start(id: JourneyId) {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setRevealed(id), LINGER_MS)
  }
  function end() {
    if (timer.current) clearTimeout(timer.current)
    setRevealed(null)
  }

  const zoned = ranges()
  const [opening, thesis, ...rest] = zoned

  return (
    <div className="relative bg-[#0b0b0c] text-[#ece7dc]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          style={{ transform: `translateY(${progress * -120}px) scale(${1 + progress * 0.2})` }}
          className="absolute top-[8%] -left-[15%] h-[70vh] w-[70vh] rounded-full bg-[#1b2b33] opacity-60 blur-[120px]"
        />
        <div
          style={{ transform: `translateY(${progress * -260}px)` }}
          className="absolute top-[42%] -right-[10%] h-[60vh] w-[60vh] rounded-full bg-[#2c2015] opacity-50 blur-[140px]"
        />
        <div
          style={{ transform: `translateY(${progress * -420}px)` }}
          className="absolute top-[72%] left-[15%] h-[55vh] w-[55vh] rounded-full bg-[#182016] opacity-45 blur-[130px]"
        />
      </div>

      <section style={{ height: `${opening.vh}vh` }} className="relative z-10">
        <div
          style={{ opacity: zoneOpacity(progress, opening.start, opening.end) }}
          className="sticky top-0 flex h-screen flex-col justify-center pr-[20%] pl-[10%]"
        >
          <p className="max-w-2xl font-serif text-5xl leading-snug">
            Some things are easier to experience than explain.
          </p>
          <div className="animate-bob mt-14 flex items-center gap-3 text-[#ece7dc]/70">
            <span className="text-2xl">↓</span>
            <span className="text-sm tracking-wide uppercase">Scroll to begin</span>
          </div>
        </div>
      </section>

      <section style={{ height: `${thesis.vh}vh` }} className="relative z-10">
        <div
          style={{ opacity: zoneOpacity(progress, thesis.start, thesis.end) }}
          className="sticky top-0 flex h-screen flex-col items-end justify-center pr-[12%] pl-[30%] text-right"
        >
          <p className="max-w-md font-serif text-3xl leading-relaxed text-[#ece7dc]/90 italic">
            Clarity comes from what you choose to leave out.
          </p>
        </div>
      </section>

      {journeys.map((j, i) => {
        const z = rest[i]
        const isRevealed = revealed === j.id
        const isActive = active === j.id
        return (
          <section key={j.id} style={{ height: `${z.vh}vh` }} className="relative z-10">
            <div
              style={{ opacity: zoneOpacity(progress, z.start, z.end) }}
              className={`sticky top-0 flex h-screen flex-col justify-center px-[10%] ${j.align}`}
              onMouseEnter={() => start(j.id)}
              onMouseLeave={end}
              onFocus={() => start(j.id)}
              onBlur={end}
            >
              <p className="text-sm text-[#ece7dc]/30">{String(i + 1).padStart(2, '0')}</p>
              <button onClick={() => setActive(isActive ? null : j.id)} className="mt-4 text-left">
                <p className="font-serif text-4xl">{j.name}</p>
              </button>
              <p
                className={`mt-6 max-w-md font-serif text-xl text-[#ece7dc]/70 italic transition-opacity duration-700 ${
                  isRevealed ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {j.outcome}
              </p>
              <div
                className={`mt-6 max-w-md overflow-hidden transition-all duration-700 ${
                  isActive ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-[#ece7dc]/60">{j.body}</p>
                <button onClick={() => setActive(null)} className="mt-4 text-sm text-[#ece7dc]/40">
                  ← return
                </button>
              </div>
            </div>
          </section>
        )
      })}

      <section style={{ height: `${zoned[zoned.length - 1].vh}vh` }} className="relative z-10">
        <div
          style={{ opacity: zoneOpacity(progress, zoned[zoned.length - 1].start, zoned[zoned.length - 1].end) }}
          className="sticky top-0 flex h-screen flex-col items-center justify-center text-center"
        >
          <p className="max-w-md font-serif text-2xl text-[#ece7dc]/60 italic">
            Clarity comes from what you choose to leave out.
          </p>
        </div>
      </section>
    </div>
  )
}
