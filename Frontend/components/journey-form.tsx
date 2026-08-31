'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Sparkles } from 'lucide-react'
import type { GuideFormData } from '@/lib/api'
import { INDIAN_STATES, PURPOSES, citiesForState } from '@/lib/sanskriti-data'

type Props = {
  onGenerate: (data: GuideFormData) => void
  isLoading: boolean
}

type Errors = Partial<Record<keyof GuideFormData, string>>

const EMPTY: GuideFormData = {
  fromState: '',
  destinationState: '',
  city: '',
  purpose: '',
  situation: '',
}

export function JourneyForm({ onGenerate, isLoading }: Props) {
  const [form, setForm] = useState<GuideFormData>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})

  const cityOptions = useMemo(
    () => (form.destinationState ? citiesForState(form.destinationState) : []),
    [form.destinationState],
  )

  function update<K extends keyof GuideFormData>(key: K, value: string) {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      // Reset dependent city when destination changes.
      if (key === 'destinationState') next.city = ''
      return next
    })
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  function validate(): boolean {
    const next: Errors = {}
    if (!form.fromState) next.fromState = 'Please select your home state.'
    if (!form.destinationState) next.destinationState = 'Please select where you are travelling to.'
    if (!form.city) next.city = 'Please select the city you are visiting.'
    if (!form.purpose) next.purpose = 'Please select the purpose of your visit.'
    if (!form.situation.trim()) next.situation = 'A short note helps us personalize your guide.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (isLoading) return
    if (validate()) onGenerate(form)
  }

  return (
    <section id="journey" className="scroll-mt-20 bg-secondary/50">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Plan Your Trip
          </span>
          <h2 className="mt-3 text-balance font-serif text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Let&apos;s prepare you for your journey <span aria-hidden="true">✈️</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Tell us a little about your trip. Sanskriti AI will create a personalized
            cultural guide for you.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              id="fromState"
              label="Where are you travelling from?"
              placeholder="Select your state"
              value={form.fromState}
              options={INDIAN_STATES}
              error={errors.fromState}
              onChange={(v) => update('fromState', v)}
            />
            <SelectField
              id="destinationState"
              label="Where are you travelling to?"
              placeholder="Select destination state"
              value={form.destinationState}
              options={INDIAN_STATES}
              error={errors.destinationState}
              onChange={(v) => update('destinationState', v)}
            />
            <SelectField
              id="city"
              label="Which city are you visiting?"
              placeholder={form.destinationState ? 'Select city' : 'Select a destination first'}
              value={form.city}
              options={cityOptions}
              disabled={!form.destinationState}
              error={errors.city}
              onChange={(v) => update('city', v)}
            />
            <SelectField
              id="purpose"
              label="What is the purpose of your visit?"
              placeholder="Select your purpose"
              value={form.purpose}
              options={PURPOSES}
              error={errors.purpose}
              onChange={(v) => update('purpose', v)}
            />
          </div>

          <div className="mt-5">
            <label htmlFor="situation" className="mb-1.5 block text-sm font-medium text-foreground">
              Tell us about your situation
            </label>
            <textarea
              id="situation"
              rows={4}
              value={form.situation}
              placeholder="e.g. Relocating for a new job and will be staying for a year. I'd like to understand daily etiquette and how to connect with neighbours."
              onChange={(e) => update('situation', e.target.value)}
              aria-invalid={!!errors.situation}
              aria-describedby={errors.situation ? 'situation-error' : undefined}
              className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/70 transition-shadow focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            {errors.situation && (
              <p id="situation-error" className="mt-1.5 text-xs text-destructive">
                {errors.situation}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-sm transition-all hover:brightness-110 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/40 focus:ring-offset-2 focus:ring-offset-card disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            {isLoading ? 'Preparing your guide…' : 'Generate My Sanskriti Guide'}
          </button>
        </form>
      </div>
    </section>
  )
}

type SelectFieldProps = {
  id: string
  label: string
  placeholder: string
  value: string
  options: string[]
  error?: string
  disabled?: boolean
  onChange: (value: string) => void
}

function SelectField({
  id,
  label,
  placeholder,
  value,
  options,
  error,
  disabled,
  onChange,
}: SelectFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-foreground">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-xl border border-input bg-background px-4 py-3 pr-10 text-sm text-foreground transition-shadow focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-60 [&:invalid]:text-muted-foreground/70"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
