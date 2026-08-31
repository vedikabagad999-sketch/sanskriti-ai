'use client'

import { useCallback, useRef, useState } from 'react'
import { generateGuide, type GuideFormData, type GuideResponse } from '@/lib/api'
import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { DestinationsSection } from '@/components/destinations-section'
import { JourneyForm } from '@/components/journey-form'
import { LoadingState } from '@/components/loading-state'
import { EmptyState } from '@/components/empty-state'
import { ErrorState } from '@/components/error-state'
import { GuideResult } from '@/components/guide-result'
import { SiteFooter } from '@/components/site-footer'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Page() {
  const [status, setStatus] = useState<Status>('idle')
  const [result, setResult] = useState<GuideResponse | null>(null)
  const [trip, setTrip] = useState<GuideFormData | null>(null)
  const lastRequest = useRef<GuideFormData | null>(null)
  const guideRef = useRef<HTMLDivElement>(null)

  const runGenerate = useCallback(async (data: GuideFormData) => {
    lastRequest.current = data
    setTrip(data)
    setStatus('loading')
    setResult(null)

    // Bring the guide area into view as generation begins.
    requestAnimationFrame(() => {
      guideRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })

    try {
      const response = await generateGuide(data)
      setResult(response)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }, [])

  const handleRetry = useCallback(() => {
    if (lastRequest.current) runGenerate(lastRequest.current)
  }, [runGenerate])

  const handleReset = useCallback(() => {
    setStatus('idle')
    setResult(null)
    setTrip(null)
    document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <HeroSection />
        <DestinationsSection />
        <JourneyForm onGenerate={runGenerate} isLoading={status === 'loading'} />

        <section id="guide" ref={guideRef} className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
            {status === 'idle' && <EmptyState />}
            {status === 'loading' && <LoadingState />}
            {status === 'error' && <ErrorState onRetry={handleRetry} />}
            {status === 'success' && result && (
              <GuideResult result={result} trip={trip} onReset={handleReset} />
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
