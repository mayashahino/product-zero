'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { IBM_Plex_Mono } from 'next/font/google'

const mono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '500'] })

type JourneyId = 'moonshop' | 'prd-reviewer' | 'liveops'

const journeys: { id: JourneyId; index: string; name: string; outcome: string; body: string }[] = [
  { id: 'moonshop', index: '01', name: 'Moonshop', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Moonshop.' },
  { id: 'prd-reviewer', index: '02', name: 'PRD reviewer', outcome: 'Placeholder outcome', body: 'Placeholder journey content for PRD reviewer.' },
  { id: 'liveops', index: '03', name: 'Liveops onboarding', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Liveops onboarding.' },
]

const LINGER_MS = 450

export default function ExplorationC() {
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
    <div className={`${mono.className} min-h-screen bg-white text-black`}>
      <section className="relative flex h-screen flex-col items-center justify-center px-6 text-center">
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-black/10" />
        <p className="max-w-lg text-2xl leading-snug">Some things are easier to experience than explain.</p>
        <span className={`mt-8 transition-opacity duration-1000 ${showCue ? 'opacity-100' : 'opacity-0'}`}>↓</span>
      </section>

      {!activeJourney && (
        <div className="relative mx-auto max-w-3xl px-6 py-32">
          <div className="absolute top-0 bottom-0 left-1/2 w-px bg-black/10" />

          <div className="grid grid-cols-2 gap-12">
            <p className="text-right text-lg">Clarity comes from what you choose to leave out.</p>
            <p className="text-left text-lg text-black/40">Clarity comes from what you choose to leave out.</p>
          </div>

          <div className="mt-32 divide-y divide-black/10 border-y border-black/10">
            {journeys.map((j) => {
              const isFocused = focused === j.id
              return (
                <button
                  key={j.id}
                  onMouseEnter={() => start(j.id)}
                  onMouseLeave={end}
                  onFocus={() => start(j.id)}
                  onBlur={end}
                  onClick={() => setActive(j.id)}
                  className="flex w-full items-center justify-between py-6 text-left transition-colors hover:bg-black/[0.02]"
                >
                  <span className="flex items-center gap-6">
                    <span className="text-black/30">{j.index}</span>
                    <span>{j.name}</span>
                  </span>
                  <span className={`transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}>
                    {j.outcome}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {activeJourney && (
        <div className="mx-auto max-w-2xl px-6 py-32">
          <button onClick={() => setActive(null)} className="text-sm text-black/40">
            ← Back
          </button>
          <h1 className="mt-6 text-2xl">{activeJourney.name}</h1>
          <p className="mt-6 max-w-md leading-relaxed">{activeJourney.body}</p>
        </div>
      )}

      <nav className="fixed bottom-6 left-6 flex gap-3 text-xs text-black/40">
        <Link href="/lang-a">A</Link>
        <Link href="/lang-b">B</Link>
        <Link href="/lang-c" className="underline">C</Link>
        <Link href="/lang-d">D</Link>
        <Link href="/lang-e">E</Link>
        <Link href="/lang-f">F</Link>
      </nav>
    </div>
  )
}
