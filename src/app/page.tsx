import { ChevronDown, ClipboardCheck, Link2, Mail, Rocket, Workflow } from 'lucide-react'

const caseStudies = [
  {
    id: 'moonshop',
    tag: 'EXPERIMENTATION',
    title: 'Moonshop',
    description: 'Placeholder outcome for Moonshop — reduced a multi-week bet into a testable two-week loop.',
    bg: 'bg-violet-50',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
    labelColor: 'text-violet-600',
    Icon: Rocket,
  },
  {
    id: 'prd-reviewer',
    tag: 'AI TOOLING',
    title: 'PRD Reviewer',
    description: 'Placeholder outcome for PRD reviewer — an AI-powered review layer that shortened cycle time.',
    bg: 'bg-indigo-50',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    labelColor: 'text-indigo-600',
    Icon: ClipboardCheck,
  },
  {
    id: 'liveops',
    tag: 'SYSTEMS',
    title: 'Liveops Onboarding',
    description: 'Placeholder outcome for Liveops onboarding — turned a tangled process into one legible path.',
    bg: 'bg-emerald-50',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    labelColor: 'text-emerald-600',
    Icon: Workflow,
  },
] as const

const coreDisciplines = ['Product Strategy', 'Product Discovery', 'AI Product Management']
const methods = ['Prompt Engineering', 'UX Thinking', 'Process Design', 'Experimentation', 'PRDs']

const principles = [
  {
    quote: 'Evidence over statements.',
    body: 'Every claim should be supported by a real project, artifact, decision, or lesson — not asserted on its own.',
  },
  {
    quote: 'Show thinking, don’t claim it.',
    body: 'I design the experience to let people reach conclusions themselves, rather than telling them what to conclude.',
  },
  {
    quote: 'Iteration beats assumption.',
    body: 'The best solutions emerge through continuous refinement, not first attempts.',
  },
  {
    quote: 'Make complexity feel simple.',
    body: 'The goal isn’t to hide complexity — it’s to organize it so people understand it effortlessly.',
  },
]

const experience = [
  {
    period: '2024 — Present',
    role: 'Placeholder senior role',
    company: 'Placeholder company',
    summary: 'Placeholder summary of scope and ownership.',
    achievements: ['Placeholder achievement line', 'Placeholder achievement line', 'Placeholder achievement line'],
  },
  {
    period: '2021 — 2024',
    role: 'Placeholder role',
    company: 'Placeholder company',
    summary: 'Placeholder summary of scope and ownership.',
    achievements: ['Placeholder achievement line', 'Placeholder achievement line'],
  },
  {
    period: '2019 — 2021',
    role: 'Placeholder junior role',
    company: 'Placeholder company',
    summary: 'Placeholder summary of scope and ownership.',
    achievements: ['Placeholder achievement line', 'Placeholder achievement line'],
  },
]

export default function Home() {
  return (
    <main className="bg-[#faf9f5] text-neutral-900">
      <header className="sticky top-0 z-10 border-b border-neutral-200 bg-[#faf9f5]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-8 py-5">
          <span className="font-serif text-lg font-bold">Maya</span>
          <nav className="flex gap-8 text-sm text-neutral-500">
            <a href="#about" className="hover:text-neutral-900">About</a>
            <a href="#work" className="hover:text-neutral-900">Work</a>
            <a href="#thinking" className="hover:text-neutral-900">Thinking</a>
            <a href="#experience" className="hover:text-neutral-900">Experience</a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-8 pt-20 pb-24">
        <span className="inline-block rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-xs font-medium tracking-wide text-indigo-600">
          PRODUCT MANAGER
        </span>
        <h1 className="mt-8 font-serif text-6xl leading-[1.1]">
          Building better products by creating{' '}
          <span className="italic text-indigo-600">better systems.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-neutral-500">
          I help teams turn ambiguity into structured execution through product thinking, evidence, and
          intentional design.
        </p>
        <div className="mt-8 flex gap-4">
          <a
            href="#work"
            className="flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
          >
            View Case Studies →
          </a>
          <a
            href="#contact"
            className="rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-900"
          >
            Contact Me
          </a>
        </div>
        <div className="mt-16 grid max-w-md grid-cols-3 gap-8 border-t border-neutral-200 pt-8">
          <div>
            <p className="font-serif text-3xl text-indigo-600">5+</p>
            <p className="text-sm text-neutral-500">Years in product</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-indigo-600">12+</p>
            <p className="text-sm text-neutral-500">Products shipped</p>
          </div>
          <div>
            <p className="font-serif text-3xl text-indigo-600">3×</p>
            <p className="text-sm text-neutral-500">Avg. velocity gain</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="border-t border-neutral-200 bg-white px-8 py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-indigo-600">ABOUT</p>
            <h2 className="mt-4 font-serif text-4xl leading-snug">
              Simplifying complexity, one system at a time.
            </h2>
          </div>
          <div className="space-y-4 text-neutral-500">
            <p>
              I&rsquo;m a product manager who spends most of my time turning ambiguous problems into
              structured, testable decisions.
            </p>
            <p>
              I believe the best interfaces are the ones you stop noticing. That means designing for
              evidence over claims, and letting teams make better decisions with less friction.
            </p>
            <p>
              With a background spanning platform, AI, and growth-stage product work, I bring structure to
              problems that don&rsquo;t yet have a shape.
            </p>
            <a href="#" className="inline-block font-medium text-neutral-900 underline">
              Read my full bio →
            </a>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section id="work" className="border-t border-neutral-200 px-8 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium tracking-wide text-indigo-600">FEATURED WORK</p>
          <h2 className="mt-4 font-serif text-5xl">Case Studies</h2>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {caseStudies.map((cs) => (
              <div key={cs.id} className={`rounded-2xl ${cs.bg}`}>
                <div className="p-8">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cs.iconBg}`}>
                    <cs.Icon className={`h-6 w-6 ${cs.iconColor}`} />
                  </div>
                  <p className={`mt-4 text-xs font-medium tracking-wide ${cs.labelColor}`}>{cs.tag}</p>
                  <h3 className="mt-2 font-serif text-2xl">{cs.title}</h3>
                  <p className="mt-3 text-neutral-500">{cs.description}</p>
                </div>
                <button className="flex w-full items-center justify-between rounded-b-2xl border-t border-neutral-200 bg-white px-8 py-4 text-sm">
                  View details
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Craft */}
      <section className="border-t border-neutral-200 bg-white px-8 py-24">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium tracking-wide text-indigo-600">EXPERTISE</p>
            <h2 className="mt-4 font-serif text-4xl">Skills &amp; Craft</h2>
            <p className="mt-4 text-neutral-500">
              The disciplines I practice and the tools I reach for when untangling hard problems.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide text-neutral-400">CORE DISCIPLINES</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {coreDisciplines.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm text-indigo-700"
                >
                  {s}
                </span>
              ))}
            </div>
            <p className="mt-8 text-xs font-medium tracking-wide text-neutral-400">METHODS &amp; PRACTICES</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {methods.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-neutral-200 bg-neutral-100 px-4 py-2 text-sm text-neutral-700"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section id="thinking" className="border-t border-neutral-200 px-8 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium tracking-wide text-indigo-600">PRODUCT THINKING</p>
          <h2 className="mt-4 font-serif text-5xl">Principles I build by</h2>

          <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.quote} className="rounded-2xl border border-neutral-200 bg-white p-8">
                <p className="text-sm text-neutral-400">{String(i + 1).padStart(2, '0')}</p>
                <p className="mt-4 font-serif text-2xl italic">&ldquo;{p.quote}&rdquo;</p>
                <p className="mt-4 text-neutral-500">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-t border-neutral-200 bg-white px-8 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium tracking-wide text-indigo-600">EXPERIENCE</p>
              <h2 className="mt-4 font-serif text-4xl leading-snug">Where I&rsquo;ve worked</h2>
            </div>
            <p className="self-end text-neutral-500">
              Five years across early-stage startups and growth-phase teams, building products at the
              intersection of process, data, and AI.
            </p>
          </div>

          <div className="relative mt-16">
            <div className="pointer-events-none absolute top-0 bottom-0 left-[152px] w-px bg-neutral-200" />
            {experience.map((e) => (
              <div
                key={e.period}
                className="grid grid-cols-[140px_24px_1fr] gap-6 border-t border-neutral-200 py-10 first:border-t-0"
              >
                <p className="pt-1 text-xs tracking-wide text-neutral-400">{e.period}</p>
                <div className="flex justify-center">
                  <span className="mt-1 h-3 w-3 flex-none rounded-full border-2 border-indigo-200 bg-indigo-600" />
                </div>
                <div>
                  <p className="font-serif text-xl">
                    {e.role} <span className="font-sans text-base text-neutral-400">· {e.company}</span>
                  </p>
                  <p className="mt-2 text-neutral-500">{e.summary}</p>
                  <ul className="mt-4 space-y-2 text-neutral-600">
                    {e.achievements.map((a, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-indigo-600" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="border-t border-neutral-200 px-8 py-24 text-right">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs font-medium tracking-wide text-indigo-600">LET&rsquo;S TALK</p>
          <h2 className="mt-4 font-serif text-5xl">Ready to build something better?</h2>
          <p className="mt-6 ml-auto max-w-xl text-neutral-500">
            Whether you&rsquo;re working on a hard product challenge or just want to talk shop — I&rsquo;d
            love to help your team operate at a higher level.
          </p>
          <div className="mt-8 flex justify-end gap-4">
            <a
              href="mailto:placeholder@example.com"
              className="flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white"
            >
              <Mail className="h-4 w-4" /> Send an Email
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-neutral-300 px-6 py-3 text-sm font-medium"
            >
              <Link2 className="h-4 w-4" /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-neutral-200 bg-white px-8 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <span className="font-serif font-bold">Maya</span>
          <span className="text-xs tracking-wide text-neutral-400">Product Manager · 2026</span>
        </div>
      </footer>
    </main>
  )
}
