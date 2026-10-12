## Cursor Cloud specific instructions

Single Vite + React SPA (AGRITOP PRO product catalog). No backend, database, or test runner. Install and run commands are in the README and `package.json` scripts. Use npm (`package-lock.json`). Ignore the leftover `bun.lockb`.

- `npm run dev` serves the app at http://localhost:8080 (Vite listens on `::`, port 8080).
- `npm run lint` is the lint command. It exits non-zero today because of existing ESLint findings (`no-explicit-any`, empty interfaces, and a `require()` in `tailwind.config.ts`). That is not an environment failure.
- There is no `test` script.
- Home catalog, navbar categories, and `/category/:id` fetch `https://agritop.pro/api-agritop.php`. That host currently returns an HTML domain-parking page, so those views show a load error. Product pages `/product/1`–`/product/16` use static data in `src/data/products.ts`. The quote form on those pages is client-only: submit shows a success toast after about 1.5s and does not call an API.
