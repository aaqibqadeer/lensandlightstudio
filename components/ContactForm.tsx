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
  theme?: 'light' | 'dark'
}

export default function ContactForm({
  data,
  contact,
  social,
  compact = false,
  theme = 'light',
}: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const isDark = theme === 'dark'

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
        <div
          className={cn(
            'w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl',
            isDark ? 'bg-background text-foreground' : 'bg-foreground text-background'
          )}
          aria-hidden="true"
        >
          ✓
        </div>
        <p className={cn('font-display font-bold text-2xl mb-3', isDark && 'text-background')}>
          {data.successMessage}
        </p>
        <p className={cn('mb-6', isDark ? 'text-background/70' : 'text-muted')}>
          {data.successSubMessage}
        </p>
        {instagramLink && (
          <a
            href={instagramLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex items-center gap-2 text-label px-6 py-3 rounded-full transition-colors',
              isDark
                ? 'bg-background text-foreground hover:bg-background/80'
                : 'bg-foreground text-background hover:bg-foreground/80'
            )}
          >
            Follow on Instagram →
          </a>
        )}
      </div>
    )
  }

  // Per-theme palette
  const borderClass = isDark ? 'border-background/30' : 'border-foreground/20'
  const focusBorderClass = isDark ? 'focus:border-background' : 'focus:border-foreground'
  const inputTextClass = isDark ? 'text-background' : 'text-foreground'
  const placeholderClass = isDark ? 'placeholder:text-background/40' : 'placeholder:text-muted/60'
  const labelClass = isDark ? 'text-background/60' : 'text-muted'

  const inputClass = (hasError: boolean) =>
    cn(
      'w-full bg-transparent border-b py-3 text-base focus:outline-none transition-colors',
      borderClass,
      focusBorderClass,
      inputTextClass,
      placeholderClass,
      hasError && 'border-red-400 focus:border-red-400'
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Contact form">
      {/* Honeypot */}
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
          <label htmlFor="contact-name" className={cn('text-label block mb-2', labelClass)}>
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
            <p id="name-error" role="alert" className="text-xs text-red-400 mt-1">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className={cn('text-label block mb-2', labelClass)}>
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
            <p id="email-error" role="alert" className="text-xs text-red-400 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label htmlFor="contact-budget" className={cn('text-label block mb-2', labelClass)}>
            {data.fields.budget} *
          </label>
          <select
            id="contact-budget"
            className={cn(
              inputClass(!!errors.budget),
              'cursor-pointer appearance-none',
              isDark ? '[&>option]:bg-foreground [&>option]:text-background' : '[&>option]:bg-background'
            )}
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
            <p id="budget-error" role="alert" className="text-xs text-red-400 mt-1">
              {errors.budget.message}
            </p>
          )}
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <label htmlFor="contact-description" className={cn('text-label block mb-2', labelClass)}>
          {data.fields.description}
        </label>
        <textarea
          id="contact-description"
          rows={4}
          placeholder="Tell me about your project, timeline, and any specific ideas you have in mind..."
          className={cn(
            'w-full bg-transparent border rounded-lg px-4 py-3 text-base focus:outline-none transition-colors resize-none',
            borderClass,
            focusBorderClass,
            inputTextClass,
            placeholderClass
          )}
          {...register('description')}
        />
      </div>

      {status === 'error' && (
        <p role="alert" className={cn('mt-4 text-sm', isDark ? 'text-red-300' : 'text-red-500')}>
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
          className={cn(
            'inline-flex items-center gap-3 text-label px-8 py-4 rounded-full transition-colors disabled:opacity-50 min-h-[48px] w-full sm:w-auto justify-center border',
            isDark
              ? 'bg-background text-foreground border-background hover:bg-transparent hover:text-background'
              : 'bg-foreground text-background border-foreground hover:bg-transparent hover:text-foreground'
          )}
        >
          {status === 'loading' ? (
            <>
              <span
                className={cn(
                  'w-4 h-4 border-2 rounded-full animate-spin',
                  isDark ? 'border-foreground/40 border-t-foreground' : 'border-background/40 border-t-background'
                )}
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
