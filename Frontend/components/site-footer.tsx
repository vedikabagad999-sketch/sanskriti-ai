'use client'

import { Compass } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 py-10 text-center sm:flex-row sm:px-8 sm:text-left">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Compass className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="font-serif text-base font-semibold text-foreground">
            Sanskriti<span className="text-accent"> AI</span>
          </span>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          Travel across India with cultural understanding and respect. Built as a companion
          for curious, considerate travelers.
        </p>
      </div>
    </footer>
  )
}
