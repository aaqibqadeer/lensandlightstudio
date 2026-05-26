import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  budget: z.string().min(1),
  description: z.string().max(5000).optional(),
  _honey: z.string().max(0, 'Bot detected'),
})

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = schema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', issues: result.error.flatten() },
      { status: 422 }
    )
  }

  const { name, email, budget, description } = result.data

  // Backup to Vercel KV if configured
  const kvUrl = process.env.KV_REST_API_URL
  const kvToken = process.env.KV_REST_API_TOKEN
  if (kvUrl && kvToken) {
    try {
      const key = `contact:${Date.now()}`
      const value = JSON.stringify({ name, email, budget, description, receivedAt: new Date().toISOString() })
      await fetch(`${kvUrl}/set/${encodeURIComponent(key)}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${kvToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ value, ex: 60 * 60 * 24 * 90 }),
      })
    } catch (err) {
      console.error('[contact] KV backup failed:', err)
    }
  }

  // Send email via Resend
  const resendKey = process.env.RESEND_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  if (resendKey && toEmail) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(resendKey)
      await resend.emails.send({
        from: 'Contact Form <noreply@alexmorganphoto.com>',
        to: [toEmail],
        reply_to: email,
        subject: `New enquiry from ${name} — Budget: ${budget}`,
        text: `Name: ${name}\nEmail: ${email}\nBudget: ${budget}\n\n${description ?? '(no message)'}`,
      })
    } catch (err) {
      console.error('[contact] Resend failed:', err)
      // Still return success — KV backup already saved (if configured)
    }
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
