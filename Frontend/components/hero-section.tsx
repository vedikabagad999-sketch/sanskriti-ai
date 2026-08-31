'use client'

import { ArrowDown, MapPin, Sparkles } from 'lucide-react'

const FLOATING = [
  { label: 'Kerala', sub: 'Backwaters', className: 'left-4 top-10 sm:left-6' },
  { label: 'Rajasthan', sub: 'Desert forts', className: 'right-4 top-24 sm:right-6' },
  { label: 'Mizoram', sub: 'Green highlands', className: 'bottom-8 left-8 sm:left-14' },
]

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft cultural pattern backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, oklch(0.42 0.072 158 / 0.14) 1px, transparent 0)',
          backgroundSize: '28px 28px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 0%, black, transparent)',
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:gap-10 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Your Cultural Travel Companion
          </span>

          <h1 className="mt-6 text-balance font-serif text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Welcome to <span className="text-primary">Sanskriti AI</span>
          </h1>

          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            Travel across India with confidence. Understand local culture, connect with
            people, and experience every destination respectfully.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#journey"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:shadow-md hover:brightness-110"
            >
              Start Your Journey
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="#destinations"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Explore Destinations
            </a>
          </div>

          <dl className="mt-10 flex gap-8 border-t border-border/70 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">States</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold text-foreground">28+</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Guide Sections</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold text-foreground">14</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wider text-muted-foreground">Verified</dt>
              <dd className="mt-1 font-serif text-2xl font-semibold text-foreground">Sources</dd>
            </div>
          </dl>
        </div>

        {/* Visual composition */}
        <div className="relative animate-fade-in">
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-xl">
            <img
              src="/images/hero-india.png"
              alt="A traveler walking through a sunlit Indian temple courtyard"
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/25 via-transparent to-transparent" />
          </div>

          {/* Floating destination chips */}
          {FLOATING.map((f) => (
            <div
              key={f.label}
              className={`absolute ${f.className} flex items-center gap-2.5 rounded-2xl border border-border bg-card/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm`}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <MapPin className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-sm font-semibold text-foreground">{f.label}</span>
                <span className="block text-xs text-muted-foreground">{f.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
