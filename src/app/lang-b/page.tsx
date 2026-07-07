'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Fraunces } from 'next/font/google'

const fraunces = Fraunces({ subsets: ['latin'], style: ['normal', 'italic'] })

type JourneyId = 'moonshop' | 'prd-reviewer' | 'liveops'

const journeys: { id: JourneyId; name: string; outcome: string; body: string }[] = [
  { id: 'moonshop', name: 'Moonshop', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Moonshop.' },
  { id: 'prd-reviewer', name: 'PRD reviewer', outcome: 'Placeholder outcome', body: 'Placeholder journey content for PRD reviewer.' },
  { id: 'liveops', name: 'Liveops onboarding', outcome: 'Placeholder outcome', body: 'Placeholder journey content for Liveops onboarding.' },
]

const LINGER_MS = 450
const BLOB = [
  '60% 40% 55% 45% / 45% 55% 40% 60%',
  '45% 55% 60% 40% / 55% 45% 55% 45%',
  '55% 45% 45% 55% / 40% 60% 45% 55%',
]

export default function ExplorationB() {
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
    <div className={`${fraunces.className} min-h-screen bg-[#efe6d8] text-[#3a2f22]`}>
      <section className="flex h-screen flex-col items-center justify-center px-6 text-center">
        <p className="max-w-lg text-3xl leading-snug">Some things are easier to experience than explain.</p>
        <span className={`mt-8 transition-opacity duration-1000 ${showCue ? 'opacity-100' : 'opacity-0'}`}>↓</span>
      </section>

      {!activeJourney && (
        <div className="mx-auto max-w-3xl px-6 py-32">
          <p className="max-w-md text-xl leading-relaxed italic">Clarity comes from what you choose to leave out.</p>
          <p className="mt-8 ml-16 max-w-sm text-lg leading-relaxed text-[#3a2f22]/70">
            A current finds its own way through.
          </p>

          <div className="relative mt-24 flex h-96 items-center justify-center gap-8">
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
                  style={{ borderRadius: BLOB[i], transform: `translateY(${i % 2 === 0 ? '0px' : '30px'})` }}
                  className={`flex h-48 w-48 flex-col items-center justify-center border border-[#3a2f22]/20 bg-[#e4d8c4] p-6 text-center transition-all duration-500 ${
                    isFocused ? 'scale-110 bg-[#dcccae]' : 'scale-100'
                  }`}
                >
                  <p className="text-sm text-[#3a2f22]/60">{j.name}</p>
                  <p className={`mt-2 italic transition-opacity duration-500 ${isFocused ? 'opacity-100' : 'opacity-0'}`}>
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
          <button onClick={() => setActive(null)} className="text-sm text-[#3a2f22]/50">
            ← Back
          </button>
          <h1 className="mt-6 text-3xl">{activeJourney.name}</h1>
          <p className="mt-6 max-w-md leading-relaxed">{activeJourney.body}</p>
        </div>
      )}

      <nav className="fixed bottom-6 left-6 flex gap-3 text-xs text-[#3a2f22]/50">
        <Link href="/lang-a">A</Link>
        <Link href="/lang-b" className="underline">B</Link>
        <Link href="/lang-c">C</Link>
        <Link href="/lang-d">D</Link>
        <Link href="/lang-e">E</Link>
        <Link href="/lang-f">F</Link>
      </nav>
    </div>
  )
}
