import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/libs/I18nRouting';
import { AppConfig } from '@/utils/AppConfig';
import { getAppUrl } from '@/utils/Helpers';

const inter = Inter({
  subsets: ["latin"],
  display: 'swap', // Prevents invisible text during font load (CLS fix)
});

const appUrl = getAppUrl();

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  applicationName: AppConfig.name,
  title: {
    default: AppConfig.name,
    template: `%s | ${AppConfig.name}`,
  },
  description: AppConfig.tagline,
  // OpenGraph for social sharing
  openGraph: {
    type: 'website',
    siteName: AppConfig.name,
    images: [
      {
        url: '/assets/og-image.png',
        width: 1200,
        height: 630,
        alt: `${AppConfig.name} — ${AppConfig.tagline}`,
      },
    ],
  },
  // Twitter card
  twitter: {
    card: 'summary_large_image',
    images: ['/assets/og-image.png'],
  },
  // hreflang alternates for multi-language SEO
  alternates: {
    canonical: appUrl,
    languages: Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        locale === routing.defaultLocale ? appUrl : `${appUrl}/${locale}`,
      ]),
    ),
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/** Pre-render all locale variants at build time for maximum performance */
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Show 404 if an unknown locale hits the server (e.g. /xx/products)
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Required for static i18n rendering (next-intl best practice)
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Toaster richColors position="top-center" />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

