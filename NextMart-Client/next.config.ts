// Validate environment variables at build time — crashes early if .env is missing
import './src/libs/Env';
import withBundleAnalyzer from '@next/bundle-analyzer';
import createNextIntlPlugin from 'next-intl/plugin';
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const baseConfig: NextConfig = {
  // Remove the "X-Powered-By: Next.js" header (security hardening)
  poweredByHeader: false,

  // Enable React strict mode for better development warnings
  reactStrictMode: true,

  // Enable the React Compiler in production — auto-memoizes components
  // No more useMemo/useCallback boilerplate!
  // reactCompiler: process.env.NODE_ENV === 'production',

  // Log browser-to-terminal errors in development
  logging: {
    browserToTerminal: true,
  },

  devIndicators: {
    position: 'bottom-right',
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
  },
};

// Apply next-intl plugin
let config = withNextIntl(baseConfig);

// Conditionally enable bundle analysis (run: ANALYZE=true npm run build)
if (process.env.ANALYZE === 'true') {
  config = withBundleAnalyzer()(config) as typeof config;
}

export default config;
