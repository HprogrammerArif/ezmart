import type { MetadataRoute } from 'next';
import { routing } from '@/libs/I18nRouting';
import { getAppUrl, getI18nPath } from '@/utils/Helpers';

/**
 * Auto-generates /sitemap.xml for SEO.
 * Includes all public routes with proper hreflang alternates for each locale.
 * Access at: http://localhost:3000/sitemap.xml
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getAppUrl();

  // Public routes that should be indexed
  const routes = ['', '/shop', '/collections', '/contact'];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : 0.7,
    // hreflang alternates for multi-language sitemaps
    alternates: {
      languages: Object.fromEntries(
        routing.locales
          .filter((locale) => locale !== routing.defaultLocale)
          .map((locale) => [locale, `${baseUrl}${getI18nPath(route, locale)}`]),
      ),
    },
  }));
}
