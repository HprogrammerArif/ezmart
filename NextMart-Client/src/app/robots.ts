import type { MetadataRoute } from 'next';
import { getAppUrl } from '@/utils/Helpers';

/**
 * Auto-generates /robots.txt — tells search engines what to index.
 * Access at: http://localhost:3000/robots.txt
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/user/', '/api/'],
      },
    ],
    sitemap: `${getAppUrl()}/sitemap.xml`,
  };
}
