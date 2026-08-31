'use client'

import { Compass } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/8 text-primary">
        <Compass className="h-8 w-8" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-serif text-2xl font-semibold text-foreground">
        Your personalized cultural guide will appear here
      </h3>
      <p className="mt-2 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Fill in a few details about your trip above, and Sanskriti AI will craft a
        respectful, destination-specific guide — from greetings and food to festivals and
        local etiquette.
      </p>
    </div>
  )
}
