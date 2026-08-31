'use client'

import { Compass } from 'lucide-react'

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Compass className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-lg font-semibold tracking-tight text-foreground">
            Sanskriti<span className="text-accent"> AI</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground sm:flex">
          <a href="#destinations" className="transition-colors hover:text-foreground">
            Destinations
          </a>
          <a href="#journey" className="transition-colors hover:text-foreground">
            Plan Journey
          </a>
          <a href="#guide" className="transition-colors hover:text-foreground">
            Your Guide
          </a>
        </nav>

        <a
          href="#journey"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          Get Started
        </a>
      </div>
    </header>
  )
}
