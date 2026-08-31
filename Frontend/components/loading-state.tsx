'use client'

import { Compass } from 'lucide-react'

const STEPS = [
  'Reading your journey details',
  'Gathering regional cultural insights',
  'Cross-checking verified sources',
  'Composing your personalized guide',
]

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm animate-fade-in">
      <div className="relative flex h-20 w-20 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-primary [animation-duration:1.4s]" />
        <span className="absolute inset-2 rounded-full border border-accent/30" />
        <Compass className="h-8 w-8 text-primary [animation:spin_6s_linear_infinite]" aria-hidden="true" />
      </div>

      <h3 className="mt-7 font-serif text-2xl font-semibold text-foreground">
        <span aria-hidden="true">✨ </span>Sanskriti AI is preparing your guide…
      </h3>
      <p className="mt-2 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Bringing together cultural insights for your journey.
      </p>

      <ul className="mt-8 space-y-2.5 text-left">
        {STEPS.map((step, i) => (
          <li
            key={step}
            className="flex items-center gap-3 text-sm text-muted-foreground animate-fade-up"
            style={{ animationDelay: `${i * 300}ms` }}
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            </span>
            {step}
          </li>
        ))}
      </ul>
    </div>
  )
}
