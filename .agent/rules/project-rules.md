---
trigger: always_on
---

# Dashboard Project Rules

## Tech Stack

- **Framework**: React 19 + TypeScript ~6 + Vite 8
- **Routing**: `react-router` v8 (use `<Route>` / `<Routes>` from `"react-router"` — NOT `"react-router-dom"`)
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`) + `react-redux`
- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`) + `tailwind-merge` + `clsx`
- **UI Primitives**: shadcn/ui (Base UI: `@base-ui/react`) + `lucide-react` icons
- **Forms**: `react-hook-form`
- **Notifications**: `sonner`
- **Linter**: `oxlint` — run `npm run lint` to check

## Directory Conventions

```
src/
  feature/         # Page-level feature modules (auth, home, layout, profile, …)
  components/ui/   # Reusable shadcn/ui components
  hooks/           # Custom React hooks
  shared/          # Shared utilities, types, constants
  store/           # Redux store + slices
  lib/             # Generic helpers (cn, formatters, etc.)
```

- **Feature modules** own their own page component, sub-components, and any local hooks.
- **Shared/reusable** logic goes into `src/hooks/`, `src/shared/`, or `src/lib/`.
- **File naming**: use `kebab-case` for filenames; use `.page.tsx` suffix for page components.

## Coding Standards

- **Always use TypeScript** — no `any` types unless unavoidable; prefer explicit interfaces.
- **Use named exports** for components and utilities; use default exports only for page components.
- **Import paths**: prefer relative imports within a feature; prefer alias `@/` for cross-feature imports.
- **Class merging**: always use `cn()` from `src/lib/utils.ts` instead of raw `clsx` or `twMerge`.
- **Mandatory Color Theme Rule**: Always follow the centralized dark navy color theme defined in `src/index.css`.
  - **Never hardcode arbitrary light colors** or raw utility colors like `bg-white`, `text-slate-800`, `bg-slate-50`, `border-gray-200`, etc.
  - **Always reference CSS theme variables**:
    - Page Background: `var(--color-bg-primary-0)` (`#0B1728`)
    - Card & Table Background: `var(--color-bg-card)` (`#102035`) / hover `var(--color-bg-card-hover)` (`#142742`)
    - Surface / Header Background: `var(--color-bg-surface)` / `var(--color-bg-header)` (`#0B1728`)
    - Primary Text: `var(--color-text-primary-0)` (`#F8FAFC`)
    - Secondary Text: `var(--color-text-secondary)` (`#CBD5E1`)
    - Muted Text: `var(--color-text-muted)` (`#64748B`)
    - Borders: `var(--color-border-0)` (`#1C3352`), `var(--color-border-subtle)` (`#162A43`)
    - Accent Gold / Amber: `var(--color-accent-gold)` (`#F59E0B`)
    - Accent Green: `var(--color-accent-green)` (`#22C55E`)
    - Accent Red / Signout: `var(--color-accent-red)` (`#EF4444`)
- **Do NOT add inline layout `style={}` props** — use Tailwind utility classes for layout/flex/grid/padding/sizing, and use CSS variables for theme-bound colors.
- **Prefer functional components** with hooks; avoid class components entirely.

## Redux Patterns

- Create slices with `createSlice` from `@reduxjs/toolkit`.
- Use `useSelector` and `useDispatch` with typed variants (`RootState`, `AppDispatch`).
- Keep RTK Query endpoints in a dedicated `api.ts` file inside the feature folder.

## Routing Patterns

- All protected routes wrap inside a `<Layout>` route (see `src/App.tsx`).
- When adding a new page: create `src/feature/<name>/<name>.page.tsx`, then add a `<Route>` in `App.tsx`.

## Commit / PR Guidelines

- Write clear commit messages: `feat:`, `fix:`, `refactor:`, `chore:` prefixes.
- Do not commit commented-out production code; remove it before merging.

## Component Decomposition & DRY Rules

- **Every page feature gets a `components/` subfolder**: `src/feature/<name>/components/`.
- **Each distinct UI section = its own file** inside that `components/` folder.
  - Example: `hero-banner.tsx`, `stat-cards.tsx`, `recent-incidents.tsx`, `quick-actions.tsx`.
- **Page file stays thin**: the `.page.tsx` file only imports and composes components — no raw JSX blocks, no inline data arrays.
- **Data / constants stay co-located**: move mock data, static arrays, and type definitions into the component file that owns them (or into a dedicated `<feature>.data.ts` file if shared across components).
- **DRY principle**: never duplicate JSX, logic, or styles. Extract repeated patterns into a shared component or helper immediately.
- **Named exports only** for all components inside `components/`; default export is reserved for the page file.
- **Types**: define component prop interfaces at the top of the component file using explicit TypeScript interfaces.

### Folder Structure Example
```
src/feature/overview/
  overview.page.tsx          ← thin composer only
  components/
    hero-banner.tsx
    stat-cards.tsx
    recent-incidents.tsx
    quick-actions.tsx
```

