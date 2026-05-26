import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Single reusable blur placeholder — a 10×6 warm gray SVG encoded as base64.
// Swap individual entries in content.json if you want per-image LQIPs later.
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,' +
  Buffer.from(
    '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="6"><rect width="10" height="6" fill="#D9D4C5"/></svg>'
  ).toString('base64')
