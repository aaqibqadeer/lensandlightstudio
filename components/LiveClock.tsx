'use client'
import { useEffect, useState } from 'react'

interface LiveClockProps {
  timezone: string
  location: string
}

export default function LiveClock({ timezone, location }: LiveClockProps) {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    function update() {
      const t = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(new Date())
      setTime(t)
    }
    update()
    const id = setInterval(update, 60_000)
    return () => clearInterval(id)
  }, [timezone])

  if (!time) return null

  return (
    <time dateTime={new Date().toISOString()} aria-label={`Current time in ${location}: ${time}`}>
      {location} ({time})
    </time>
  )
}
