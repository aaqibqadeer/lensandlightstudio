# Lens & Light Studio — Photographer Portfolio

A high-performance, mobile-first portfolio website for a professional photographer. Built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Quick Start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint     # ESLint check
npm run type-check  # TypeScript check
```

## Updating Content (No Code Required)

**Everything** — text, images, pricing, testimonials, navigation, SEO meta, contact details, social links — lives in a single file:

```
data/content.json
```

### Changing text

Open `data/content.json` and edit any string value. Hot-reload in dev will reflect changes instantly; production requires a rebuild/redeploy.

### Swapping images

1. Drop your new image into `/public/images/` (or a subfolder)
2. Update the corresponding `"image"` or `"cover"` path in `content.json`

Example: to replace the hero image, change:
```json
"hero": {
  "image": "/images/hero.jpg",   ← update this path
  "imageAlt": "..."               ← update the alt text too
}
```

### Adding / removing a service

Add or remove an object from the `"services"` array in `content.json`. The Services page and homepage preview both update automatically — no layout will break regardless of how many services you have.

### Adding / removing a project

Add or remove an object from `"projects.items"`. To feature a project on the homepage, include its `id` in `"home.featuredProjectIds"`.

### Updating navigation labels

Edit the `"navigation"` array. Labels and hrefs are both configurable.

### Changing contact details

Edit the `"contact"` block — emails, phone numbers, address, and budget dropdown options are all there.

### Changing the color theme

Edit `"site.theme"` in `content.json`. The four variables map directly to CSS custom properties used throughout:

```json
"theme": {
  "background": "#F5F1E6",
  "foreground": "#0A0A0A",
  "accent":     "#F5E62B",
  "muted":      "#8A8578"
}
```

Note: theme colors in `content.json` are documentation — the actual CSS variables are defined in `app/globals.css`. Update both to stay in sync.

### Enabling/disabling the mobile booking bar

```json
"home": {
  "mobileBookingBar": {
    "enabled": true,    ← set to false to hide it
    "label": "Book a Session",
    "href": "/contact"
  }
}
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```
RESEND_API_KEY=re_...          # from resend.com
CONTACT_TO_EMAIL=you@email.com # where form submissions are sent
KV_REST_API_URL=...            # from Vercel KV dashboard
KV_REST_API_TOKEN=...          # from Vercel KV dashboard
```

The app works without these set — form submissions will return success but email won't be sent. All leads are also stored in Vercel KV as a backup.

## Deployment (Vercel)

1. Push to your GitHub repo
2. Import the project on [vercel.com](https://vercel.com)
3. Add the environment variables in the Vercel dashboard
4. Optionally link a Vercel KV store (Dashboard → Storage → Create Database)
5. Deploy

## File Structure

```
app/                    Next.js App Router pages & API
  layout.tsx            Root layout (Nav, Footer, fonts, Analytics)
  page.tsx              Home
  projects/page.tsx     Projects grid
  services/page.tsx     Services listings
  about/page.tsx        About page
  contact/page.tsx      Contact form + details
  api/contact/route.ts  Form handler (Resend + Vercel KV)
  sitemap.ts            Auto-generated sitemap.xml
  robots.ts             Auto-generated robots.txt

components/             Reusable React components
  Nav.tsx               Sticky nav + mobile hamburger drawer
  Footer.tsx            Site footer
  Hero.tsx              Full-viewport hero section
  ContactForm.tsx       Lead-gen form (React Hook Form + Zod)
  ContactCTA.tsx        Repeated CTA section on every page
  TestimonialsMarquee   Auto-scrolling testimonials
  ...

data/
  content.json          ← EDIT THIS to update the site

lib/
  types.ts              TypeScript types mirroring content.json
  getContent.ts         Typed data loader
  utils.ts              cn(), BLUR_DATA_URL helpers

public/images/          Placeholder images (replace with real photos)
```

## Replacing Placeholder Images

The site ships with tiny solid-color placeholder images. Replace them with real photographs:

1. Use any image editing tool to export optimized JPEGs/WebPs
2. Recommended dimensions:
   - Hero: 1920×1080px or wider
   - Project covers: 1200×900px
   - Service images: 1200×900px
   - About portrait: 900×1200px
   - Avatars: 200×200px
3. Drop files into `public/images/` (matching the existing paths in content.json)
4. `next/image` handles AVIF/WebP conversion and responsive srcsets automatically
