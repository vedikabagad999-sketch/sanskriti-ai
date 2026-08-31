'use client'

import { useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import type { GuideSection, GuideVariant } from '@/lib/guide'
import { cn } from '@/lib/utils'

type VariantStyle = {
  card: string
  iconWrap: string
  bulletDot: string
}

const VARIANT_STYLES: Record<GuideVariant, VariantStyle> = {
  default: {
    card: 'border-border bg-card',
    iconWrap: 'bg-primary/10 text-primary',
    bulletDot: 'text-primary',
  },
  positive: {
    card: 'border-success/25 bg-success/5',
    iconWrap: 'bg-success/12 text-success',
    bulletDot: 'text-success',
  },
  caution: {
    card: 'border-destructive/25 bg-destructive/5',
    iconWrap: 'bg-destructive/12 text-destructive',
    bulletDot: 'text-destructive',
  },
  warning: {
    card: 'border-warning/40 bg-warning/10',
    iconWrap: 'bg-warning/25 text-warning-foreground',
    bulletDot: 'text-warning-foreground',
  },
  highlight: {
    card: 'border-accent/30 bg-gradient-to-br from-accent/10 via-card to-primary/5 sm:col-span-2',
    iconWrap: 'bg-accent/15 text-accent',
    bulletDot: 'text-accent',
  },
}

export function GuideCard({
  section,
  index,
}: {
  section: GuideSection
  index: number
}) {
  const [isOpen, setIsOpen] = useState(false)

  const style = VARIANT_STYLES[section.variant]
  const Icon = section.icon

  return (
    <article
      className={cn(
        'group flex flex-col rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md animate-fade-up',
        style.card,
      )}
      style={{
        animationDelay: `${Math.min(index, 12) * 45}ms`,
      }}
    >
      {/* HEADER */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-3 p-5 text-left sm:p-6"
        aria-expanded={isOpen}
      >
        {/* ICON */}
        <span
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-105',
            style.iconWrap,
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>

        {/* TITLE */}
        <h3 className="min-w-0 flex-1 text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
          <span className="mr-1.5" aria-hidden="true">
            {section.emoji}
          </span>
          {section.title}
        </h3>

        {/* SMALL DROPDOWN ARROW */}
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </button>

      {/* CONTENT */}
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-border/60 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
            <div className="space-y-3">
              {section.blocks.map((block, i) =>
                block.type === 'paragraph' ? (
                  <p
                    key={i}
                    className="text-sm leading-relaxed text-muted-foreground"
                  >
                    {block.text}
                  </p>
                ) : (
                  <ul key={i} className="space-y-2">
                    {block.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-foreground/90"
                      >
                        <Check
                          className={cn(
                            'mt-0.5 h-4 w-4 shrink-0',
                            style.bulletDot,
                          )}
                          aria-hidden="true"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}