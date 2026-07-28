# Phase 1 Plan: MishraShardendu22-Frontend-BlogWebsite

## 1. Design Token Adoption
* Adopt canonical dark-mode token set in `src/app.css`:
  * Enforce dark mode as default background (`#09090b` base, `#121318` card surface).
  * Primary Accent: `#6366f1` (indigo-500).
  * Hover Accent: `#4f46e5` (indigo-600).
  * Borders: `#27272a`.
  * Focus Ring: `#6366f1`.
* Article typography: optimize reading line length, heading rhythm, and code block formatting.

## 2. Component & Code Elevation
* Eliminate all 11 Biome linter warnings by strictly typing `ApiResponse<T>`, error handlers in `src/lib/api.ts` & `src/lib/auth.ts`, and refactoring cognitive complexity in `src/lib/auth.ts` and `src/lib/seo.ts`.
* Validate SEO metadata tags (OpenGraph, canonical URLs, structured JSON-LD data).

## 3. Verification Sequence
* Run `pnpm biome check apps/MishraShardendu22-Frontend-BlogWebsite` to verify 0 errors / 0 warnings.
* Run `pnpm test` to verify Vitest tests pass.
* Run `turbo run build` to verify Vite build passes cleanly.
