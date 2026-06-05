import { Env } from '@/libs/Env';
import { routing } from '@/libs/I18nRouting';

/**
 * Resolves the public base URL of the application.
 * Uses the configured NEXT_PUBLIC_BASE_API url or falls back to localhost.
 */
export const getBaseUrl = (): string => {
  if (Env.NEXT_PUBLIC_BASE_API) {
    // Extract origin from API URL (e.g. http://localhost:3001/api/v1 → http://localhost:3000)
    return typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  }
  return 'http://localhost:3000';
};

/**
 * Returns the public-facing app URL (for sitemap, metadata, og:url, etc.)
 */
export const getAppUrl = (): string => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  return 'http://localhost:3000';
};

/**
 * Builds a locale-aware path — only prefixes non-default locales.
 * @param url The base path starting with /
 * @param locale The active locale identifier
 */
export const getI18nPath = (url: string, locale: string): string => {
  if (locale === routing.defaultLocale) {
    return url;
  }
  return `/${locale}${url}`;
};
