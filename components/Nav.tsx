'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'
import LiveClock from './LiveClock'
import type { SiteConfig, NavItem, SocialLink } from '@/lib/types'

interface NavProps {
  site: SiteConfig
  nav: NavItem[]
  social: SocialLink[]
}

export default function Nav({ site, nav, social }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const prefersReduced = useReducedMotion()

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Close menu on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const centerLinks = nav.slice(0, 3)
  const rightLinks = nav.slice(3)

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-background/95 backdrop-blur-sm shadow-sm border-b border-foreground/5'
            : 'bg-transparent'
        )}
      >
        <nav
          aria-label="Main navigation"
          className="container-site flex items-center justify-between h-16 md:h-20"
        >
          {/* Left — location + clock */}
          <div className="hidden lg:flex items-center text-label text-muted w-64">
            <LiveClock timezone={site.timezone} location={site.location} />
          </div>

          {/* Mobile — logo */}
          <Link
            href="/"
            aria-label={`${site.name} — Home`}
            className="lg:hidden font-display font-bold text-xl tracking-tight"
          >
            {site.logoText}
          </Link>

          {/* Center — desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8" role="list">
            {centerLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-label transition-colors hover:text-foreground',
                    pathname === item.href ? 'text-foreground' : 'text-muted'
                  )}
                >
                  {item.label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right — desktop nav links */}
          <ul className="hidden lg:flex items-center gap-8 w-64 justify-end" role="list">
            {rightLinks.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'text-label transition-colors hover:text-foreground',
                    item.href === '/contact'
                      ? 'bg-foreground text-background px-4 py-2 rounded-full hover:bg-accent hover:text-foreground'
                      : pathname === item.href
                        ? 'text-foreground'
                        : 'text-muted'
                  )}
                >
                  {item.label.toUpperCase()}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile — hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="lg:hidden flex flex-col justify-center items-center w-11 h-11 gap-1.5 -mr-2"
          >
            <span
              className={cn(
                'block h-0.5 w-6 bg-foreground transition-all duration-300',
                open && 'rotate-45 translate-y-2'
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-6 bg-foreground transition-all duration-300',
                open && 'opacity-0'
              )}
            />
            <span
              className={cn(
                'block h-0.5 w-6 bg-foreground transition-all duration-300',
                open && '-rotate-45 -translate-y-2'
              )}
            />
          </button>
        </nav>
      </header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={prefersReduced ? { opacity: 0 } : { x: '100%' }}
            animate={prefersReduced ? { opacity: 1 } : { x: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { x: '100%' }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 bg-foreground text-background flex flex-col"
          >
            <div className="container-site flex flex-col h-full pt-24 pb-12">
              <ul className="flex flex-col gap-2 flex-1" role="list">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReduced ? 0 : 0.1 + i * 0.06 }}
                  >
                    <Link
                      href={item.href}
                      className="block text-3xl font-display font-bold py-3 border-b border-background/10 hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Social links in mobile menu */}
              <div className="flex gap-6 mt-8">
                {social.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-label text-background/60 hover:text-accent transition-colors"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
