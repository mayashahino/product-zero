'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type JourneyId = 'moonshop' | 'prd-reviewer' | 'liveops'

const journeys: { id: JourneyId; name: string; outcome: string; body: string; rotate: string; z: string }[] = [
  { id: 'moonshop', name: 'Moonshop', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Moonshop.', rotate: '-rotate-3', z: 'z-30' },
  { id: 'prd-reviewer', name: 'PRD reviewer', outcome: 'Placeholder outcome', body: 'Placeholder journey content for PRD reviewer.', rotate: 'rotate-2', z: 'z-20' },
  { id: 'liveops', name: 'Liveops onboarding', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Liveops onboarding.', rotate: '-rotate-1', z: 'z-10' },
]

const LINGER_MS = 450

export default function ExplorationA() {
  const [showCue, setShowCue] = useState(false)
  const [active, setActive] = useState<JourneyId | null>(null)
  const [focused, setFocused] = useState<JourneyId | null>(null)
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

  function start(id: JourneyId) {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setFocused(id), LINGER_MS)
  }
  function end() {
    if (timer.current) clearTimeout(timer.current)
    setFocused(null)
  }

  const activeJourney = journeys.find((j) => j.id === active) ?? null

  return (
    <div className="min-h-screen bg-[#0d0d0c] text-[#f2ede4]">
      <section className="relative flex h-screen flex-col items-center justify-center px-6 text-center">
        <p className="pointer-events-none absolute max-w-2xl font-serif text-6xl text-[#f2ede4]/10 blur-2xl select-none">
          Some things are easier to experience than explain.
        </p>
        <p className="relative max-w-lg font-serif text-3xl leading-snug">
          Some things are easier to experience than explain.
        </p>
        <span className={`mt-8 text-[#f2ede4]/40 transition-opacity duration-1000 ${showCue ? 'opacity-100' : 'opacity-0'}`}>
          ↓
        </span>
      </section>

      {!activeJourney && (
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="max-w-md font-serif text-xl leading-relaxed text-[#f2ede4]/80">
            Clarity comes from what you choose to leave out.
          </p>

          <div className="relative mt-32 flex h-72 items-center justify-center">
            {journeys.map((j, i) => {
              const isFocused = focused === j.id
              return (
                <button
                  key={j.id}
                  onMouseEnter={() => start(j.id)}
                  onMouseLeave={end}
                  onFocus={() => start(j.id)}
                  onBlur={end}
                  onClick={() => setActive(j.id)}
                  style={{ transform: `translateX(${i * 40 - 40}px)` }}
                  className={`absolute w-64 border border-[#f2ede4]/20 bg-[#151513] p-6 text-left transition-all duration-500 ${j.rotate} ${
                    isFocused ? 'z-40 rotate-0 scale-110 opacity-100 blur-none' : `${j.z} opacity-70 blur-[1px]`
                  }`}
                >
                  <p className="text-sm text-[#f2ede4]/50">{j.name}</p>
                  <p
                    className={`mt-2 font-serif italic transition-opacity duration-500 ${
                      isFocused ? 'opacity-100' : 'opacity-0'
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
          <button onClick={() => setActive(null)} className="text-sm text-[#f2ede4]/40">
            ← Back
          </button>
          <h1 className="mt-6 font-serif text-3xl">{activeJourney.name}</h1>
          <p className="mt-6 max-w-md leading-relaxed text-[#f2ede4]/80">{activeJourney.body}</p>
        </div>
      )}

      <nav className="fixed bottom-6 left-6 flex gap-3 text-xs text-[#f2ede4]/40">
        <Link href="/lang-a" className="underline">A</Link>
        <Link href="/lang-b">B</Link>
        <Link href="/lang-c">C</Link>
        <Link href="/lang-d">D</Link>
        <Link href="/lang-e">E</Link>
        <Link href="/lang-f">F</Link>
      </nav>
    </div>
  )
}
