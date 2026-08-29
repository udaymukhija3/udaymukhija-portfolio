# Uday Mukhija Portfolio

An editorial portfolio for backend-heavy product systems, data engineering, and applied ML work.

The site is organized around one engineering thesis: calm interfaces should be supported by explicit state, access, retry, and failure contracts. The homepage leads with three product experiences: Gathr, VibeGrid, and Murmur. The full archive and case studies keep implementation evidence available without making it the first thing a visitor has to parse.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verify

```bash
npm run typecheck
npm run build
git diff --check
```

## Content and media rules

- Project claims live in `src/data/projects.ts`.
- Real product media lives in `public/images/projects`.
- Gathr and VibeGrid use captured product assets from their current repositories.
- Murmur uses a native DOM fragment based on its current product UI, not a fabricated screenshot.
- Projects without media use labeled system portraits derived from their documented architecture.

`public/llms.txt` is the fast, plain-text project and route index.

## Routes

- `/`: selected work, archive preview, about, and contact
- `/projects`: filterable project archive
- `/projects/[slug]`: experience-first case study with technical proof in disclosure
- `/experience`: work history
- `/resume`: resume page and external document link
