---
name: dashboard-project
description: >-
  Use this skill when working on the dashboard-layout project. It covers
  how to add new pages, create Redux slices, add shadcn/ui components,
  run the dev server and linter, and follow the project file conventions.
  Activate whenever the user asks to add a feature, fix a pattern, or understand
  how code is structured in this codebase.
---

# Dashboard Project Skill

This project is a React 19 + TypeScript + Vite dashboard built with Tailwind CSS v4,
shadcn/ui, Redux Toolkit, and react-router v8.

---

## 1. Running the Project

```bash
# Start dev server
npm run dev

# Type-check + production build
npm run build

# Lint with oxlint
npm run lint

# Preview production build
npm run preview
```

---

## 2. Adding a New Page / Route

1. Create the feature folder and page file:
   ```
   src/feature/<feature-name>/<feature-name>.page.tsx
   ```
2. Export the component as the **default export**.
3. Register the route in `src/App.tsx` inside the `<Layout>` route:
   ```tsx
   <Route path="/<path>" element={<YourPage />} />
   ```
4. Import the page at the top of `App.tsx`.

See [`references/page-template.md`](./references/page-template.md) for a ready-to-use template.

---

## 3. Creating a Redux Slice

1. Create `src/store/<feature>Slice.ts`.
2. Use `createSlice` + export the reducer and actions:
   ```ts
   import { createSlice, PayloadAction } from "@reduxjs/toolkit";
   ```
3. Register the reducer in `src/store/store.ts` under the `reducer` key.
4. Use typed hooks: `useSelector` with `RootState`, `useDispatch` with `AppDispatch`.

See [`references/slice-template.md`](./references/slice-template.md) for a ready-to-use template.

---

## 4. Adding a shadcn/ui Component

```bash
npx shadcn@latest add <component-name>
```

Components are placed in `src/components/ui/`. Import them with:
```ts
import { Button } from "@/components/ui/button";
```

---

## 5. Styling Rules

- Use **Tailwind CSS v4** utility classes.
- Merge classes with `cn()` from `src/lib/utils.ts`:
  ```ts
  import { cn } from "@/lib/utils";
  className={cn("base-class", conditional && "extra-class")}
  ```
- Do NOT use inline `style={{}}` props.

---

## 6. File & Naming Conventions

| Item             | Convention                        | Example                          |
|------------------|-----------------------------------|----------------------------------|
| Page component   | `<name>.page.tsx` (default export)| `home.page.tsx`                  |
| Feature folder   | kebab-case                        | `src/feature/user-settings/`     |
| Hook             | `use<Name>.ts`                    | `src/hooks/useAuth.ts`           |
| Redux slice      | `<name>Slice.ts`                  | `src/store/authSlice.ts`         |
| Shared type      | `<name>.types.ts`                 | `src/shared/user.types.ts`       |

---

## 7. Verification Steps

After making changes, always verify:

1. **No lint errors**: `npm run lint`
2. **Type checks pass**: `npm run build` (runs `tsc -b` first)
3. **Dev server works**: `npm run dev` — open http://localhost:5173
