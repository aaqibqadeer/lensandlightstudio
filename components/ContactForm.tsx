'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { cn } from '@/lib/utils'
import type { ContactPageData, ContactInfo, SocialLink } from '@/lib/types'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  budget: z.string().min(1, 'Please select a budget range'),
  description: z.string().optional(),
  _honey: z.string().max(0),
})

type FormValues = z.infer<typeof schema>

interface ContactFormProps {
  data: ContactPageData
  contact: ContactInfo
  social: SocialLink[]
  compact?: boolean
}

export default function ContactForm({ data, contact, social, compact = false }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { _honey: '' },
  })

  async function onSubmit(values: FormValues) {
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const instagramLink = social.find((s) => s.platform === 'Instagram')

  if (status === 'success') {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-6 text-2xl" aria-hidden="true">
          ✓
        </div>
        <p className="font-display font-bold text-2xl mb-3">{data.successMessage}</p>
        <p className="text-muted mb-6">{data.successSubMessage}</p>
        {instagramLink && (
          <a
            href={instagramLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-foreground text-background text-label px-6 py-3 rounded-full hover:bg-accent hover:text-foreground transition-colors"
          >
            Follow on Instagram →
          </a>
        )}
      </div>
    )
  }

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full bg-transparent border-b border-foreground/20 py-3 text-base placeholder:text-muted/60 focus:outline-none focus:border-foreground transition-colors',
      hasError && 'border-red-500 focus:border-red-500'
    )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      aria-label="Contact form"
    >
      {/* Honeypot — hidden from real users */}
      <div aria-hidden="true" className="absolute -left-[9999px] overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('_honey')}
        />
      </div>

      <div className={cn('grid gap-6', compact ? 'grid-cols-1' : 'sm:grid-cols-2')}>
        {/* Name */}
        <div>
          <label htmlFor="contact-name" className="text-label text-muted block mb-2">
            {data.fields.name} *
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            inputMode="text"
            placeholder="Jane Smith"
            className={inputClass(!!errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className="text-label text-muted block mb-2">
            {data.fields.email} *
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="jane@example.com"
            className={inputClass(!!errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="contact-budget" className="text-label text-muted block mb-2">
            {data.fields.budget} *
          </label>
          <select
            id="contact-budget"
            className={cn(inputClass(!!errors.budget), 'cursor-pointer appearance-none bg-background')}
            aria-describedby={errors.budget ? 'budget-error' : undefined}
            aria-invalid={!!errors.budget}
            defaultValue=""
            {...register('budget')}
          >
            <option value="" disabled>
              Select a range
            </option>
            {contact.budgetOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.budget && (
            <p id="budget-error" role="alert" className="text-xs text-red-500 mt-1">
              {errors.budget.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label htmlFor="contact-description" className="text-label text-muted block mb-2">
          {data.fields.description}
        </label>
        <textarea
          id="contact-description"
          rows={4}
          placeholder="Tell me about your project, timeline, and any specific ideas you have in mind..."
          className={cn(inputClass(false), 'resize-none border border-foreground/20 rounded-lg px-4 border-b')}
          {...register('description')}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="mt-4 text-sm text-red-500">
          Something went wrong. Please try again or email{' '}
          <a href={`mailto:${contact.generalEmail}`} className="underline">
            {contact.generalEmail}
          </a>
          .
        </p>
      )}

      <div className="mt-8">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center gap-3 bg-foreground text-background text-label px-8 py-4 rounded-full hover:bg-accent hover:text-foreground transition-colors disabled:opacity-50 min-h-[48px] w-full sm:w-auto justify-center"
        >
          {status === 'loading' ? (
            <>
              <span
                className="w-4 h-4 border-2 border-background/40 border-t-background rounded-full animate-spin"
                aria-hidden="true"
              />
              Sending…
            </>
          ) : (
            data.fields.submit
          )}
        </button>
      </div>
    </form>
  )
}
