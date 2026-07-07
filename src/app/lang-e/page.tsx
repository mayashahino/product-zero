'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type JourneyId = 'moonshop' | 'prd-reviewer' | 'liveops'

const journeys: { id: JourneyId; name: string; outcome: string; body: string }[] = [
  { id: 'moonshop', name: 'Moonshop', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Moonshop.' },
  { id: 'prd-reviewer', name: 'PRD reviewer', outcome: 'Placeholder outcome', body: 'Placeholder journey content for PRD reviewer.' },
  { id: 'liveops', name: 'Liveops onboarding', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Liveops onboarding.' },
]

const LINGER_MS = 350

export default function ExplorationE() {
  const [showCue, setShowCue] = useState(false)
  const [active, setActive] = useState<JourneyId | null>(null)
  const [origin, setOrigin] = useState<number | null>(null)
  const [revealed, setRevealed] = useState<JourneyId | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (showCue) return
    const onIntent = () => setShowCue(true)
    window.addEventListener('scroll', onIntent, { once: true })
    window.addEventListener('mousemove', onIntent, { once: true })
    return () => {
      window.removeEventListener('scroll', onIntent)
      window.removeEventListener('mousemove', onIntent)
    }
  }, [showCue])

  function start(i: number, id: JourneyId) {
    setOrigin(i)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setRevealed(id), LINGER_MS)
  }
  function end() {
    if (timer.current) clearTimeout(timer.current)
    setOrigin(null)
    setRevealed(null)
  }

  const activeJourney = journeys.find((j) => j.id === active) ?? null

  return (
    <div className="min-h-screen bg-[#f4f6f5] text-[#1c2622]">
      <section className="flex h-screen flex-col items-center justify-center px-6 text-center">
        <p className="max-w-lg font-serif text-3xl leading-snug">
          Some things are easier to experience than explain.
        </p>
        <span
          className={`mt-8 text-[#1c2622]/40 transition-opacity duration-1000 ${
            showCue ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ↓
        </span>
      </section>

      {!activeJourney && (
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="max-w-md font-serif text-xl leading-relaxed">
            Clarity comes from what you choose to leave out.
          </p>

          <div className="mt-24 flex justify-between gap-6">
            {journeys.map((j, i) => {
              const distance = origin === null ? 0 : Math.abs(i - origin)
              const isOrigin = origin === i
              const delay = distance * 90
              const lift = origin === null ? 0 : Math.max(0, 10 - distance * 5)
              const isRevealed = revealed === j.id
              return (
                <button
                  key={j.id}
                  onMouseEnter={() => start(i, j.id)}
                  onMouseLeave={end}
                  onFocus={() => start(i, j.id)}
                  onBlur={end}
                  onClick={() => setActive(j.id)}
                  style={{ transitionDelay: `${delay}ms`, transform: `translateY(-${lift}px)` }}
                  className={`flex-1 border-b-2 p-6 text-left transition-all duration-500 ${
                    isOrigin
                      ? 'border-[#1c2622]'
                      : distance === 1
                        ? 'border-[#1c2622]/40'
                        : 'border-[#1c2622]/15'
                  }`}
                >
                  <p className="text-sm text-[#1c2622]/50">{j.name}</p>
                  <p
                    className={`mt-2 font-serif italic transition-opacity duration-500 ${
                      isRevealed ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    {j.outcome}
                  </p>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {activeJourney && (
        <div className="mx-auto max-w-2xl px-6 py-32">
          <button onClick={() => setActive(null)} className="text-sm text-[#1c2622]/40">
            ← Back
          </button>
          <h1 className="mt-6 font-serif text-3xl">{activeJourney.name}</h1>
          <p className="mt-6 max-w-md leading-relaxed">{activeJourney.body}</p>
        </div>
      )}

      <nav className="fixed bottom-6 left-6 flex gap-3 text-xs text-[#1c2622]/40">
        <Link href="/lang-a">A</Link>
        <Link href="/lang-b">B</Link>
        <Link href="/lang-c">C</Link>
        <Link href="/lang-d">D</Link>
        <Link href="/lang-e" className="underline">E</Link>
        <Link href="/lang-f">F</Link>
      </nav>
    </div>
  )
}
