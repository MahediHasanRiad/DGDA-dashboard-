# New Page Template

Copy-paste this to create a new feature page.

## File: `src/feature/<name>/<name>.page.tsx`

```tsx
import type { FC } from "react";

const YourPage: FC = () => {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Page Title</h1>
    </main>
  );
};

export default YourPage;
```

## Register in `src/App.tsx`

```tsx
import YourPage from "./feature/<name>/<name>.page";

// Inside <Routes> > <Route element={<Layout />}>:
<Route path="/<path>" element={<YourPage />} />
```
