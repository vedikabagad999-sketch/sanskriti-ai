import type { LucideIcon } from 'lucide-react'

import {
  Hand,
  Languages,
  Shirt,
  UtensilsCrossed,
  Flower2,
  Handshake,
  PartyPopper,
  Eye,
  CircleCheckBig,
  CircleX,
  TriangleAlert,
  House,
  Wallet,
  Sparkles,
  Compass,
} from 'lucide-react'

export type GuideVariant =
  | 'default'
  | 'positive'
  | 'caution'
  | 'warning'
  | 'highlight'

export type SectionConfig = {
  id: string
  title: string
  emoji: string
  icon: LucideIcon
  variant: GuideVariant
  keywords: string[]
}

/* -------------------------------------------------------------------------- */
/* 14 cultural guide sections                                                 */
/* -------------------------------------------------------------------------- */

export const SECTION_CONFIG: SectionConfig[] = [
  {
    id: 'greetings',
    title: 'Greetings & Communication',
    emoji: '👋',
    icon: Hand,
    variant: 'default',
    keywords: ['greeting', 'communication'],
  },
  {
    id: 'phrases',
    title: 'Useful Local Phrases',
    emoji: '🗣️',
    icon: Languages,
    variant: 'default',
    keywords: ['phrase', 'language', 'words'],
  },
  {
    id: 'dress',
    title: 'Dress & Appearance',
    emoji: '👗',
    icon: Shirt,
    variant: 'default',
    keywords: ['dress', 'appearance', 'clothing', 'attire'],
  },
  {
    id: 'food',
    title: 'Food & Dining Etiquette',
    emoji: '🍛',
    icon: UtensilsCrossed,
    variant: 'default',
    keywords: ['food', 'dining', 'eat', 'meal'],
  },
  {
    id: 'spiritual',
    title: 'Spiritual & Cultural Practices',
    emoji: '🙏',
    icon: Flower2,
    variant: 'default',
    keywords: [
      'spiritual',
      'religious',
      'temple',
      'worship',
      'cultural practice',
    ],
  },
  {
    id: 'social',
    title: 'Social Etiquette',
    emoji: '🤝',
    icon: Handshake,
    variant: 'default',
    keywords: ['social', 'etiquette', 'manners'],
  },
  {
    id: 'festivals',
    title: 'Festivals & Traditions',
    emoji: '🎉',
    icon: PartyPopper,
    variant: 'default',
    keywords: ['festival', 'tradition', 'celebration'],
  },
  {
    id: 'notice',
    title: 'Things You May Notice',
    emoji: '👀',
    icon: Eye,
    variant: 'default',
    keywords: ['notice', 'observe', 'may see'],
  },
  {
    id: 'dos',
    title: "Do's",
    emoji: '✅',
    icon: CircleCheckBig,
    variant: 'positive',
    keywords: ['dos', "do's"],
  },
  {
    id: 'donts',
    title: "Don'ts",
    emoji: '❌',
    icon: CircleX,
    variant: 'caution',
    keywords: ['donts', "don'ts", 'dont', "don't", 'avoid'],
  },
  {
    id: 'mistake',
    title: 'Common Mistake Outsiders Make',
    emoji: '⚠️',
    icon: TriangleAlert,
    variant: 'warning',
    keywords: ['mistake', 'outsider', 'common error'],
  },
  {
    id: 'living',
    title: 'Living & Local Tips',
    emoji: '🏠',
    icon: House,
    variant: 'default',
    keywords: ['living', 'local tips', 'daily life'],
  },
  {
    id: 'stay',
    title: 'Affordable Stay / Rental Guidance',
    emoji: '💰',
    icon: Wallet,
    variant: 'default',
    keywords: [
      'stay',
      'rental',
      'affordable',
      'accommodation',
      'rent',
    ],
  },
  {
    id: 'personal',
    title: 'Personalized Tip for This Traveler',
    emoji: '🌟',
    icon: Sparkles,
    variant: 'highlight',
    keywords: [
      'personalized',
      'personalised',
      'tip for',
      'this traveler',
      'this traveller',
    ],
  },
]

const FALLBACK: SectionConfig = {
  id: 'other',
  title: 'Cultural Note',
  emoji: '📍',
  icon: Compass,
  variant: 'default',
  keywords: [],
}

export type GuideBlock =
  | {
      type: 'paragraph'
      text: string
    }
  | {
      type: 'list'
      items: string[]
    }

export type GuideSection = {
  id: string
  title: string
  emoji: string
  icon: LucideIcon
  variant: GuideVariant
  blocks: GuideBlock[]
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function normalize(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function stripEmoji(value: string): string {
  return value
    .replace(
      /[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{2000}-\u{206F}\uFE0F]/gu,
      '',
    )
    .replace(/^[\s#*•:.-]+|[\s#*•:.-]+$/g, '')
    .trim()
}

function matchConfig(rawTitle: string): SectionConfig {
  const cleanTitle = stripEmoji(rawTitle)
  const normalizedTitle = normalize(cleanTitle)

  for (const config of SECTION_CONFIG) {
    if (
      normalizedTitle.includes(
        normalize(config.title),
      )
    ) {
      return config
    }

    if (
      config.keywords.some((keyword) =>
        normalizedTitle.includes(normalize(keyword)),
      )
    ) {
      return config
    }
  }

  return {
    ...FALLBACK,
    title: cleanTitle || 'Cultural Note',
  }
}

/* -------------------------------------------------------------------------- */
/* Convert markdown body into paragraphs and bullet lists                     */
/* -------------------------------------------------------------------------- */

function linesToBlocks(lines: string[]): GuideBlock[] {
  const blocks: GuideBlock[] = []

  let listBuffer: string[] = []

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({
        type: 'list',
        items: listBuffer,
      })

      listBuffer = []
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushList()
      continue
    }

    const bullet = line.match(/^[-*•]\s+(.+)$/)

    if (bullet) {
      listBuffer.push(bullet[1].trim())
    } else {
      flushList()

      blocks.push({
        type: 'paragraph',
        text: line.replace(/\*\*/g, ''),
      })
    }
  }

  flushList()

  return blocks
}

/* -------------------------------------------------------------------------- */
/* Parse backend markdown guide                                               */
/* -------------------------------------------------------------------------- */

export function parseGuide(guide: string): GuideSection[] {
  if (!guide || !guide.trim()) {
    return []
  }

  const lines = guide.split(/\r?\n/)

  const rawSections: {
    title: string
    body: string[]
  }[] = []

  let current: {
    title: string
    body: string[]
  } | null = null

  for (const line of lines) {
    /*
     * IMPORTANT:
     * Backend headings look like:
     *
     * ## 👋 Greetings & Communication
     *
     * So we must match # directly.
     */
    const heading = line.match(/^\s*#{1,3}\s+(.+?)\s*$/)

    if (heading) {
      if (current) {
        rawSections.push(current)
      }

      current = {
        title: heading[1].trim(),
        body: [],
      }
    } else if (current) {
      current.body.push(line)
    }
  }

  if (current) {
    rawSections.push(current)
  }

  return rawSections.map((section) => {
    const config = matchConfig(section.title)

    return {
      id: config.id,
      title: config.title,
      emoji: config.emoji,
      icon: config.icon,
      variant: config.variant,
      blocks: linesToBlocks(section.body),
    }
  })
}