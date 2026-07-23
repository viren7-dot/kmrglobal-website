# KMR Global — Website

Production-ready static website for KMR Global (www.kmrglobal.co.uk), the UK-based distribution and wholesale partner for premium beauty and personal care brands. Positioned to attract new brands seeking UK distribution, alongside serving the retailer trade audience.

## Positioning

The site is deliberately dual-audience:

1. **For beauty brands** looking for a UK distribution partner — the primary business goal.
2. **For retailers, pharmacies, salons and trade** buying via wholesale account.

KMR is presented as the **official UK distributor for Dr Rashel, Speick and Raywell**, plus wholesaler for a curated portfolio of other premium brands. The design language and IA are informed by leading UK beauty distributors — FDD International, Phoenix Beauty and Aspects Beauty.

## Pages

| File | Purpose |
|---|---|
| `index.html` | Home — dual audience hero, three official distribution brands, retailer reach, testimonials |
| `for-brands.html` | Pitch to brands: UK market opportunity, service pillars, distribution vs. wholesale models, brand enquiry form |
| `portfolio.html` | Full portfolio — headline distribution brands (Dr Rashel, Speick, Raywell) plus wholesale brand categories |
| `wholesale.html` | Retailer trade pitch: benefits, process, testimonials |
| `services.html` | Full service list + FAQs |
| `about.html` | Company story, milestones, team |
| `contact.html` | Contact details + general message form |
| `inquiry.html` | Trade account application form |
| `brands.html` | Auto-redirect to `portfolio.html` (kept for any old inbound links) |
| `assets/styles.css` | Design system |
| `assets/main.js` | Mobile nav + form handling |

## Design system

- **Palette:** ivory (`#FAF7F2`), cream (`#F5EFE7`), blush (`#EFE3D9`), charcoal (`#1F1B18`), rose gold (`#B8846A`).
- **Type:** Playfair Display (headings, serif) + Inter (body, sans) via Google Fonts.
- **Layout:** generous whitespace, sticky translucent header, editorial split sections, tasteful hover states, mobile hamburger overlay.
- **Responsive:** mobile-first, tested at 375, 768, 1024, 1440.

## Imagery

Currently uses direct Unsplash photo URLs (auto-hotlinked) as placeholders:

- Hero: skincare products
- Distribution brand cards: skincare / natural care / haircare stock shots
- Feature/section imagery: beauty products, bottles, warehouse, fragrance

**Before launch, swap for real photography of:**
- Actual Dr Rashel, Speick, Raywell product ranges (with brand permission)
- Your Watford warehouse
- Team photos (currently rendered as elegant monogram avatars)
- A hero brand-shot or lifestyle image that represents KMR

Every image sits behind a CSS gradient fallback, so if an Unsplash URL ever fails the layout still looks intentional.

## Local preview

Open `index.html` in a browser. No build step.

Optional local server:
```bash
cd kmr-website
python3 -m http.server 8000
# open http://localhost:8000
```

## Deployment

**Netlify Drop** (fastest): drag the `kmr-website` folder onto https://app.netlify.com/drop — live URL in 30 seconds.

**Vercel:** `vercel deploy` from the folder.

**Cloudflare Pages / GitHub Pages:** push to a repo, connect, pick "static site."

**Existing WordPress at kmrglobal.co.uk:** cleanest path is to replace the current WordPress install with this static site under the same domain. Faster site, better SEO, easier to maintain.

## Form wiring

Both forms (`for-brands.html` brand enquiry + `inquiry.html` trade application + `contact.html` message form) show a client-side success confirmation. Before launch, wire them to a real endpoint:

- **Netlify Forms** (easiest): add the `netlify` attribute to each `<form>` tag.
- **Formspree / Basin / Getform**: point the `action` attribute at your endpoint.
- **Your own backend**: replace the submit handler in `assets/main.js` with a POST.

## Copy notes

Contact details (address, phone, email) and the team names/roles are pulled directly from your current site. Statistics (£27bn UK market, £280m weekly spend, 3.8% growth) are widely-cited market benchmarks — verify against your current KAM data before publishing. The "40+ brands," "200+ trade partners" and "10+ countries" figures are illustrative — replace with your real numbers.

## Browser support

Modern browsers (Chrome, Safari, Firefox, Edge — last two versions). Uses `backdrop-filter`, `aspect-ratio`, CSS custom properties, and `linear-gradient` background layering.
