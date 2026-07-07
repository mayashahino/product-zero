'use client'

import { useState } from 'react'

type JourneyId = 'moonshop' | 'prd-reviewer' | 'liveops'

const journeys: {
  id: JourneyId
  name: string
  outcome: string
  principle: string
  body: string
}[] = [
  {
    id: 'moonshop',
    name: 'Moonshop',
    outcome: 'Placeholder outcome for Moonshop.',
    principle: 'Iteration beats assumption.',
    body: 'Placeholder journey content for Moonshop.',
  },
  {
    id: 'prd-reviewer',
    name: 'PRD reviewer',
    outcome: 'Placeholder outcome for PRD reviewer.',
    principle: 'Evidence over statements.',
    body: 'Placeholder journey content for PRD reviewer.',
  },
  {
    id: 'liveops',
    name: 'Liveops onboarding',
    outcome: 'Placeholder outcome for Liveops onboarding.',
    principle: 'Make complexity feel simple.',
    body: 'Placeholder journey content for Liveops onboarding.',
  },
]

const craft: { skill: string; source: string }[] = [
  { skill: 'Placeholder skill — prioritization', source: 'surfaced from Moonshop' },
  { skill: 'Placeholder skill — structured review', source: 'surfaced from PRD reviewer' },
  { skill: 'Placeholder skill — systems thinking', source: 'surfaced from Liveops onboarding' },
  { skill: 'Placeholder skill — stakeholder alignment', source: 'surfaced from Moonshop' },
  { skill: 'Placeholder skill — experiment design', source: 'surfaced from PRD reviewer' },
]

const experience: { period: string; role: string; company: string; note: string }[] = [
  { period: '2023 — Present', role: 'Placeholder senior role', company: 'Placeholder company', note: 'Placeholder achievement line.' },
  { period: '2021 — 2023', role: 'Placeholder role', company: 'Placeholder company', note: 'Placeholder achievement line.' },
  { period: '2019 — 2021', role: 'Placeholder junior role', company: 'Placeholder company', note: 'Placeholder achievement line.' },
]

function StateLabel({ n, name }: { n: string; name: string }) {
  return <p className="mb-6 text-xs tracking-wide text-neutral-400">{n} — {name} (scaffolding label, removed later)</p>
}

export default function Blueprint() {
  const [active, setActive] = useState<JourneyId | null>(null)
  const [visited, setVisited] = useState<JourneyId[]>([])

  function enter(id: JourneyId) {
    setActive(id)
    setVisited((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  const activeJourney = journeys.find((j) => j.id === active) ?? null

  return (
    <main className="bg-white text-neutral-900">
      {/* 01 — Opening */}
      <section className="flex h-screen flex-col justify-center border-b border-neutral-200 px-8">
        <StateLabel n="01" name="Opening" />
        <p className="max-w-xl text-3xl leading-snug">
          Some things are easier to experience than explain.
        </p>
        <span className="mt-8 text-neutral-400">↓ (scroll)</span>
      </section>

      {/* persistent strip — appears once past opening, no animation */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-neutral-300 bg-white px-8 py-3 text-sm">
        <div className="flex items-center gap-3">
          {activeJourney && (
            <button onClick={() => setActive(null)} className="underline">
              ← Return to Surface
            </button>
          )}
          <span className="text-neutral-500">
            {activeJourney ? `Surface / ${activeJourney.name}` : 'Surface'}
          </span>
        </div>
        <div className="flex gap-2 text-xs text-neutral-500">
          {journeys.map((j) => (
            <span key={j.id}>{j.name} {visited.includes(j.id) ? '(visited)' : '(unvisited)'}</span>
          ))}
        </div>
      </div>

      {/* 02 — Thesis (two layers, both always visible in blueprint mode) */}
      <section className="border-b border-neutral-200 px-8 py-24">
        <StateLabel n="02" name="Thesis — two layers" />
        <p className="max-w-xl text-xl leading-relaxed">
          Clarity comes from what you choose to leave out.
        </p>
        <p className="mt-4 max-w-xl text-base text-neutral-500">
          Placeholder grounding line — a plainer, more personal statement sits beneath the abstract
          one once the visitor lingers here. Not final copy.
        </p>
      </section>

      {/* 03 — Decision point / Journey (swappable state, no transition) */}
      {!activeJourney && (
        <section className="border-b border-neutral-200 px-8 py-24">
          <StateLabel n="03" name="Decision point — three journeys" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {journeys.map((j) => (
              <button
                key={j.id}
                onClick={() => enter(j.id)}
                className="border border-neutral-300 p-6 text-left"
              >
                <p className="text-sm text-neutral-500">
                  {j.name} {visited.includes(j.id) ? '(visited)' : ''}
                </p>
                <p className="mt-3">{j.outcome}</p>
              </button>
            ))}
          </div>
        </section>
      )}

      {activeJourney && (
        <section className="border-b border-neutral-200 px-8 py-24">
          <StateLabel n="04" name="Journey screen" />
          <h1 className="text-2xl">{activeJourney.name}</h1>

          <div className="mt-8 h-40 w-full max-w-md border border-neutral-300 p-4 text-sm text-neutral-400">
            Artifact placeholder
          </div>

          <p className="mt-8 max-w-md">{activeJourney.body}</p>

          <p className="mt-8 max-w-md text-sm text-neutral-500">
            Principle: {activeJourney.principle}
          </p>

          <div className="mt-12 flex gap-6 border-t border-neutral-200 pt-6 text-sm">
            <span className="text-neutral-400">Move to:</span>
            {journeys
              .filter((j) => j.id !== activeJourney.id)
              .map((j) => (
                <button key={j.id} onClick={() => enter(j.id)} className="underline">
                  {j.name}
                </button>
              ))}
          </div>
        </section>
      )}

      {/* 05 — Craft, assembled from evidence already seen */}
      <section className="border-b border-neutral-200 px-8 py-24">
        <StateLabel n="05" name="Craft — assembled from evidence" />
        <div className="max-w-xl space-y-4">
          {craft.map((c) => (
            <div key={c.skill} className="flex items-baseline justify-between border-b border-neutral-100 pb-3">
              <p>{c.skill}</p>
              <p className="text-xs text-neutral-400">{c.source}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 06 — Experience, plain chronological, no dot-timeline */}
      <section className="border-b border-neutral-200 px-8 py-24">
        <StateLabel n="06" name="Experience" />
        <div className="max-w-xl space-y-10">
          {experience.map((e) => (
            <div key={e.period}>
              <p className="text-sm text-neutral-400">{e.period}</p>
              <p className="mt-1">
                {e.role} — {e.company}
              </p>
              <p className="mt-1 text-sm text-neutral-500">{e.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 07 — Contact, a real action, not another ambiguous line */}
      <section className="px-8 py-24">
        <StateLabel n="07" name="Contact" />
        <p className="max-w-xl text-xl">Placeholder closing line — not final.</p>
        <div className="mt-8 flex gap-6 text-sm underline">
          <a href="mailto:placeholder@example.com">Send an email</a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </section>
    </main>
  )
}
