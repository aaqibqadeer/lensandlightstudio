'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface StickyBookingBarProps {
  label: string
  href: string
}

export default function StickyBookingBar({ label, href }: StickyBookingBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-background/95 backdrop-blur-sm border-t border-foreground/10 safe-bottom">
      <Link
        href={href}
        className="flex items-center justify-center w-full bg-foreground text-background text-label py-4 rounded-full hover:bg-accent hover:text-foreground transition-colors min-h-[48px]"
      >
        {label}
      </Link>
    </div>
  )
}
