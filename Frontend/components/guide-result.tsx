'use client'

import { useMemo } from 'react'
import { MapPin, RotateCcw } from 'lucide-react'
import type { GuideFormData, GuideResponse } from '@/lib/api'
import { parseGuide } from '@/lib/guide'
import { GuideCard } from '@/components/guide-card'
import { SourcesSection } from '@/components/sources-section'

type Props = {
  result: GuideResponse
  trip: GuideFormData | null
  onReset: () => void
}

export function GuideResult({ result, trip, onReset }: Props) {
  const sections = useMemo(() => parseGuide(result.guide), [result.guide])

  return (
    <div className="animate-fade-in">
      <div className="flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Ready for your trip
          </span>
          <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Your Sanskriti Guide
          </h2>
          {trip && (
            <p className="mt-2 inline-flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              {trip.fromState} <span aria-hidden="true">→</span> {trip.city}, {trip.destinationState}
              <span className="mx-1 text-border">•</span>
              {trip.purpose}
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:self-auto"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Generate Another
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map((section, i) => (
          <GuideCard key={`${section.id}-${i}`} section={section} index={i} />
        ))}
      </div>

            <SourcesSection sources={result.sources} />

      <p className="mt-8 rounded-2xl border border-border bg-muted/40 px-5 py-4 text-center text-xs leading-relaxed text-muted-foreground">
        Cultural practices can vary across communities, families, generations and
        individuals. Use this guide as a starting point for respectful understanding, not as
        a rulebook for every person.
      </p>
    </div>
  )
}
