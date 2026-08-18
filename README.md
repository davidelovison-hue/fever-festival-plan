# Fever Festival Plan

Reusable festival ticketing prototype scaffold (same structure as Les Ardentes plan).

## Sample festival

**Awakenings Festival 2026** — swap branding in:

- `src/data/festivalConfig.ts` — media, overview info, tabs
- `src/data/festivalArtists.ts` — lineup carousel
- `src/lib/festivalEvent.ts` — event id, title, logo path
- `src/data/planCatalog.ts` — ticket / camping / merch catalog
- `public/` — logo (`festival-logo.png`), poster, hero video

## Commands

```bash
npm install
npm run dev      # http://localhost:5174
npm run build
npm run deploy   # GitHub Pages → fever-festival-plan
```

## Live URL

https://davidelovison-hue.github.io/fever-festival-plan/
