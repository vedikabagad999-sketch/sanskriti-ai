'use client'

import { DESTINATIONS } from '@/lib/sanskriti-data'

export function DestinationsSection() {
  return (
    <section id="destinations" className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
      <div className="max-w-2xl">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          Cultural Inspiration
        </span>
        <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Every state tells a different story
        </h2>
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          India is not one culture but many, living side by side. Explore a few of the
          places Sanskriti AI can prepare you for — each with its own customs, rhythm, and
          way of welcoming a guest.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {DESTINATIONS.map((d, i) => (
          <article
            key={d.state}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={d.image || '/placeholder.svg'}
                alt={`A scenic view representing ${d.state}`}
                className="aspect-[5/4] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/10 to-transparent" />
              <h3 className="absolute bottom-3 left-4 font-serif text-xl font-semibold text-primary-foreground">
                {d.state}
              </h3>
            </div>
            <p className="px-4 py-4 text-sm leading-relaxed text-muted-foreground">
              {d.descriptor}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}
