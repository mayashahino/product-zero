'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

type JourneyId = 'moonshop' | 'prd-reviewer' | 'liveops'

const journeys: { id: JourneyId; name: string; outcome: string; body: string }[] = [
  { id: 'moonshop', name: 'Moonshop', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Moonshop.' },
  { id: 'prd-reviewer', name: 'PRD reviewer', outcome: 'Placeholder outcome', body: 'Placeholder journey content for PRD reviewer.' },
  { id: 'liveops', name: 'Liveops onboarding', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Liveops onboarding.' },
]

// The fog lifts as you go deeper — not per element, but across the whole scene at once.
const CLEAR_RANGE = 1000

export default function ExplorationD() {
  const [scrollY, setScrollY] = useState(0)
  const [active, setActive] = useState<JourneyId | null>(null)
  const [revealed, setRevealed] = useState<JourneyId | null>(null)

  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const t = Math.min(1, scrollY / CLEAR_RANGE)
  const blur = (1 - t) * 9
  const dim = 0.4 + t * 0.6

  const activeJourney = journeys.find((j) => j.id === active) ?? null

  return (
    <div className="min-h-screen bg-[#e9e7e2] text-[#232320]">
      <div style={{ filter: `blur(${blur}px)`, opacity: dim }}>
        <section className="flex h-screen flex-col items-center justify-center px-6 text-center">
          <p className="max-w-lg font-serif text-3xl leading-snug">
            Some things are easier to experience than explain.
          </p>
          <span className="mt-8 text-[#232320]/40">↓</span>
        </section>

        {!activeJourney && (
          <div className="mx-auto max-w-2xl px-6 py-32">
            <p className="max-w-md font-serif text-xl leading-relaxed">
              Clarity comes from what you choose to leave out.
            </p>

            <div className="mt-24 space-y-10">
              {journeys.map((j) => {
                const isRevealed = revealed === j.id
                return (
                  <button
                    key={j.id}
                    onMouseEnter={() => setRevealed(j.id)}
                    onMouseLeave={() => setRevealed(null)}
                    onFocus={() => setRevealed(j.id)}
                    onBlur={() => setRevealed(null)}
                    onClick={() => setActive(j.id)}
                    className="block w-full border-b border-[#232320]/15 pb-6 text-left"
                  >
                    <p className="text-sm text-[#232320]/50">{j.name}</p>
                    <p
                      className={`mt-2 font-serif italic transition-opacity duration-700 ${
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
            <button onClick={() => setActive(null)} className="text-sm text-[#232320]/40">
              ← Back
            </button>
            <h1 className="mt-6 font-serif text-3xl">{activeJourney.name}</h1>
            <p className="mt-6 max-w-md leading-relaxed">{activeJourney.body}</p>
          </div>
        )}
      </div>

      <nav className="fixed bottom-6 left-6 flex gap-3 text-xs text-[#232320]/40">
        <Link href="/lang-a">A</Link>
        <Link href="/lang-b">B</Link>
        <Link href="/lang-c">C</Link>
        <Link href="/lang-d" className="underline">D</Link>
        <Link href="/lang-e">E</Link>
        <Link href="/lang-f">F</Link>
      </nav>
    </div>
  )
}
