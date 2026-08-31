// -----------------------------------------------------------------------------
// Isolated API layer for Sanskriti AI.
//
// The real backend is a Node.js + Express service that exposes:
//   POST http://localhost:5000/generate-guide
//
// To connect the real backend later, set USE_MOCK to false (or wire up an
// environment variable) — the request/response contract is already in place.
// -----------------------------------------------------------------------------

export type GuideFormData = {
  fromState: string
  destinationState: string
  city: string
  purpose: string
  situation: string
}

export type GuideSource = {
  name: string
  description?: string
  url: string
}

export type GuideResponse = {
  success: boolean
  guide: string
  sources: GuideSource[]
}

const API_ENDPOINT = 'https://sanskriti-ai-rudv.onrender.com/generate-guide'

// Flip this to false once the Express backend is reachable.
const USE_MOCK = false

/**
 * Requests a personalized cultural guide from the backend.
 * Throws on network / server failure so the UI can render its error state.
 */
export async function generateGuide(data: GuideFormData): Promise<GuideResponse> {
  if (USE_MOCK) {
    return mockGenerateGuide(data)
  }

  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`)
  }

  const json = (await res.json()) as GuideResponse
  console.log("BACKEND RESPONSE:", json)
  if (!json.success) {
    throw new Error('The guide could not be generated.')
  }
  return json
}

// -----------------------------------------------------------------------------
// Mock implementation — for UI demonstration only. Remove once connected.
// -----------------------------------------------------------------------------

function mockGenerateGuide(data: GuideFormData): Promise<GuideResponse> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate an occasional failure only when the situation asks for it,
      // so the demo stays predictable.
      if (data.situation.trim().toLowerCase() === 'fail') {
        reject(new Error('Simulated backend failure'))
        return
      }
      resolve({
        success: true,
        guide: buildMockGuide(data),
        sources: buildMockSources(data),
      })
    }, 2200)
  })
}

function buildMockGuide(d: GuideFormData): string {
  const dest = d.destinationState || 'your destination'
  const city = d.city || dest
  const from = d.fromState || 'your home state'
  const purpose = (d.purpose || 'your visit').toLowerCase()

  return `
## 👋 Greetings & Communication
People in ${dest} value warmth and unhurried conversation. A gentle smile and a slight nod go a long way when meeting someone for the first time.
- Greet elders first and use respectful terms of address.
- A soft, friendly tone is preferred over loud or rushed speech.

## 🗣️ Useful Local Phrases
Learning even a few words signals genuine respect and is warmly received in ${city}.
- "Hello / Namaskar" — a universal, respectful greeting.
- "Thank you" in the local language earns instant goodwill.
- "How are you?" — asked sincerely, it opens most conversations.

## 👗 Dress & Appearance
Coming from ${from}, you'll find dressing modestly is appreciated across ${dest}, especially at religious and family gatherings.
- Cover shoulders and knees when visiting temples or homes.
- Light, breathable fabrics suit the local climate well.

## 🍛 Food & Dining Etiquette
Meals are central to ${dest}'s culture and often shared generously with guests.
- Wash your hands before and after eating.
- Accepting food when offered is seen as a sign of respect.
- Many households eat with the right hand — follow your host's lead.

## 🙏 Spiritual & Cultural Practices
Faith and ritual are woven into everyday life in ${dest}.
- Remove footwear before entering temples and many homes.
- Ask before photographing shrines, deities, or people at prayer.

## 🤝 Social Etiquette
Relationships in ${city} are built slowly and sincerely.
- Personal questions about family are friendly, not intrusive.
- Punctuality is valued for formal matters; social visits are relaxed.

## 🎉 Festivals & Traditions
${dest} celebrates its festivals with color, food, and community spirit.
- If invited to a celebration, a small gift or sweets are welcome.
- Join in respectfully and follow the lead of your hosts.

## 👀 Things You May Notice
A few everyday customs may feel new to a visitor from ${from}.
- The side-to-side head tilt often means "yes" or "understood".
- Bargaining is normal in local markets but always stays good-natured.

## ✅ Do's
- Do greet elders and hosts warmly and with patience.
- Do dress modestly at religious and family settings.
- Do accept hospitality graciously — it is offered with sincerity.

## ❌ Don'ts
- Don't point your feet toward people or sacred objects.
- Don't touch someone's head, or offer or take items with your left hand.
- Don't rush conversations or skip the customary pleasantries.

## ⚠️ Common Mistake Outsiders Make
Visitors sometimes assume customs are uniform across India. In ${dest}, local norms can differ noticeably from ${from} — observe first, then follow the lead of the people around you rather than applying habits from home.

## 🏠 Living & Local Tips
Settling into ${city} is easier with a few practical habits.
- Keep small change handy for autos, markets, and tea stalls.
- Neighbours are a trusted first source for reliable local advice.

## 💰 Affordable Stay / Rental Guidance
For a ${purpose} stay in ${city}, budget-friendly options are widely available.
- Explore areas slightly outside the city centre for better rental value.
- Verified hostels and guesthouses suit shorter or trial stays.
- Speak with local contacts before signing any long-term agreement.

## 🌟 Personalized Tip for This Traveler
Since you're travelling from ${from} to ${city} for ${purpose}, lean into curiosity over assumption. A sincere question about a local custom, asked with warmth, will open more doors than any guidebook — the people of ${dest} respond generously to respectful interest.
`.trim()
}

function buildMockSources(_d: GuideFormData): GuideSource[] {
  return [
    {
      name: 'Ministry of Culture, Government of India',
      description: 'Official portal on India’s cultural heritage and institutions.',
      url: 'https://www.indiaculture.gov.in/',
    },
    {
      name: 'Incredible India — Ministry of Tourism',
      description: 'Government tourism resource covering states, customs and travel.',
      url: 'https://www.incredibleindia.gov.in/',
    },
    {
      name: 'Indira Gandhi National Centre for the Arts',
      description: 'Research body documenting India’s arts and cultural traditions.',
      url: 'https://ignca.gov.in/',
    },
    {
      name: 'UNESCO — India',
      description: 'World Heritage and intangible cultural heritage listings for India.',
      url: 'https://www.unesco.org/en/countries/in',
    },
  ]
}
