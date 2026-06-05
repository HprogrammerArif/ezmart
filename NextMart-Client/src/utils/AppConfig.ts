import type { LocalePrefixMode } from 'next-intl/routing';

/** Locale prefix strategy:
 * 'as-needed' = only prefix non-default locales (e.g. /bn/products — English stays as /products)
 * 'always'    = always prefix (/en/products, /bn/products)
 */
const localePrefix: LocalePrefixMode = 'as-needed';

/** Central configuration — all app-level constants live here.
 *  `as const` ensures every string value is inferred as a literal type (e.g. 'en')
 *  instead of the broad `string` type — required by next-intl's defineRouting().
 */
export const AppConfig = {
  name: 'NextMart',
  tagline: 'Your Premier Online Football Shop',
  logo: '/assets/logo.png',
  // 'general' = original NextMart layout, 'sports' = FootyStyleHub clone layout
  storeMode: 'sports' as 'general' | 'sports',
  i18n: {
    locales: ['en', 'bn'] as const,
    defaultLocale: 'en' as const, // ← literal type 'en', not string
    localePrefix,
  },
} as const; // ← freezes the entire object so all values are literal types

