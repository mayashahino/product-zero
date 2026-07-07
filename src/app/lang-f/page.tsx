'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

type JourneyId = 'moonshop' | 'prd-reviewer' | 'liveops'

const journeys: { id: JourneyId; name: string; outcome: string; body: string }[] = [
  { id: 'moonshop', name: 'Moonshop', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Moonshop.' },
  { id: 'prd-reviewer', name: 'PRD reviewer', outcome: 'Placeholder outcome', body: 'Placeholder journey content for PRD reviewer.' },
  { id: 'liveops', name: 'Liveops onboarding', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Liveops onboarding.' },
]

const LINGER_MS = 450
const SETTLE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function ExplorationF() {
  const [showCue, setShowCue] = useState(false)
  const [active, setActive] = useState<JourneyId | null>(null)
  const [visited, setVisited] = useState<JourneyId[]>([])
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

  function start(id: JourneyId) {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setRevealed(id), LINGER_MS)
  }
  function end() {
    if (timer.current) clearTimeout(timer.current)
    setRevealed(null)
  }
  function enter(id: JourneyId) {
    setActive(id)
    setVisited((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const activeJourney = journeys.find((j) => j.id === active) ?? null

  return (
    <div className="min-h-screen bg-[#efe9dd] text-[#2b2620]">
      <section className="flex h-screen flex-col items-center justify-center px-6 text-center">
        <p className="max-w-lg font-serif text-3xl leading-snug">
          Some things are easier to experience than explain.
        </p>
        <span
          className={`mt-8 text-[#2b2620]/40 transition-opacity duration-1000 ${
            showCue ? 'opacity-100' : 'opacity-0'
          }`}
        >
          ↓
        </span>
      </section>

      {!activeJourney && (
        <div className="mx-auto max-w-2xl px-6 py-32">
          <div className="flex h-3 w-full overflow-hidden rounded-sm border border-[#2b2620]/20">
            {journeys.map((j) => (
              <div
                key={j.id}
                className="flex-1 border-r border-[#2b2620]/10 transition-colors duration-700 last:border-r-0"
                style={{ background: visited.includes(j.id) ? '#2b2620' : 'transparent' }}
              />
            ))}
          </div>
          <p className="mt-3 text-xs text-[#2b2620]/40">
            {visited.length} of {journeys.length} layers exposed
          </p>

          <p className="mt-16 max-w-md font-serif text-xl leading-relaxed">
            Clarity comes from what you choose to leave out.
          </p>

          <div className="mt-16 space-y-3">
            {journeys.map((j) => {
              const isRevealed = revealed === j.id
              return (
                <button
                  key={j.id}
                  onMouseEnter={() => start(j.id)}
                  onMouseLeave={end}
                  onFocus={() => start(j.id)}
                  onBlur={end}
                  onClick={() => enter(j.id)}
                  className="block w-full border-b border-[#2b2620]/15 py-6 pl-6 text-left"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-[#2b2620]/50">{j.name}</p>
                    {visited.includes(j.id) && <span className="h-1.5 w-1.5 rounded-full bg-[#2b2620]" />}
                  </div>
                  <p
                    style={{ transitionTimingFunction: SETTLE, transitionDuration: '900ms' }}
                    className={`mt-2 font-serif italic transition-all ${
                      isRevealed ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
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
          <button onClick={() => setActive(null)} className="text-sm text-[#2b2620]/40">
            ← Back
          </button>
          <h1 className="mt-6 font-serif text-3xl">{activeJourney.name}</h1>
          <p className="mt-6 max-w-md leading-relaxed">{activeJourney.body}</p>
        </div>
      )}

      <nav className="fixed bottom-6 left-6 flex gap-3 text-xs text-[#2b2620]/40">
        <Link href="/lang-a">A</Link>
        <Link href="/lang-b">B</Link>
        <Link href="/lang-c">C</Link>
        <Link href="/lang-d">D</Link>
        <Link href="/lang-e">E</Link>
        <Link href="/lang-f" className="underline">F</Link>
      </nav>
    </div>
  )
}
