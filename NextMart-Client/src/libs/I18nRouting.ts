import { defineRouting } from 'next-intl/routing';
import { AppConfig } from '@/utils/AppConfig';

export const routing = defineRouting({
  locales: AppConfig.i18n.locales,
  defaultLocale: AppConfig.i18n.defaultLocale,
  localePrefix: AppConfig.i18n.localePrefix,
});
