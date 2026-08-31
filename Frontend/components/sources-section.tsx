'use client'

import { ExternalLink, ShieldCheck } from 'lucide-react'
import type { GuideSource } from '@/lib/api'

export function SourcesSection({ sources }: { sources: GuideSource[] }) {
  return (
    <section aria-labelledby="sources-heading" className="mt-8">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h3 id="sources-heading" className="font-serif text-xl font-semibold text-foreground">
              <span className="mr-1.5" aria-hidden="true">
                🔎
              </span>
              Verified Cultural Sources
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
              This guide draws on trusted cultural and governmental resources. Explore them
              to learn more.
            </p>
          </div>
        </div>

        {sources.length === 0 ? (
          <p className="mt-6 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center text-sm text-muted-foreground">
            Verified sources are not available for this guide.
          </p>
        ) : (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {sources.map((source, i) => (
              <li key={`${source.url}-${i}`}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start justify-between gap-3 rounded-2xl border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground group-hover:text-primary">
                      {source.name}
                    </span>
                    {source.description && (
                      <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                        {source.description}
                      </span>
                    )}
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary">
                      View Source
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </span>
                  </span>
                  <ExternalLink
                    className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
