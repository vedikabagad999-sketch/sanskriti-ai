'use client'

import { RotateCcw, TriangleAlert } from 'lucide-react'

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-destructive/25 bg-destructive/5 px-6 py-16 text-center animate-fade-in">
      <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <TriangleAlert className="h-8 w-8" aria-hidden="true" />
      </span>
      <h3 className="mt-6 font-serif text-2xl font-semibold text-foreground">
        Something went wrong while preparing your guide
      </h3>
      <p className="mt-2 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Please try again in a moment.
      </p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2"
      >
        <RotateCcw className="h-4 w-4" aria-hidden="true" />
        Try Again
      </button>
    </div>
  )
}
