import { createEnv } from '@t3-oss/env-nextjs';
import * as z from 'zod';

/**
 * Strict runtime & build-time environment variable validation.
 * Imported at the top of next.config.ts so it crashes at BUILD TIME
 * (not runtime) if any required variable is missing.
 *
 * Usage: import { Env } from '@/libs/Env'; then use Env.NEXT_PUBLIC_BASE_API
 * NEVER call process.env directly in your code — use this typed object.
 *
 * RULES (@t3-oss/env-nextjs):
 *  - `server` keys must NOT have NEXT_PUBLIC_ prefix (server-only, never sent to browser)
 *  - `client` keys MUST have NEXT_PUBLIC_ prefix (safe to expose to browser)
 *  - `runtimeEnv` key names must match EXACTLY the schema key names (no remapping)
 */
export const Env = createEnv({
  server: {
    NODE_ENV: z.enum(['test', 'development', 'production']).optional(),
  },
  client: {
    NEXT_PUBLIC_BASE_API: z.string().optional(),
    NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY: z.string().optional(),
    // Note: recaptcha server key is in .env as NEXT_PUBLIC_ so it lives here.
    // In a production app, never expose server-side secrets with NEXT_PUBLIC_.
    NEXT_PUBLIC_RECAPTCHA_SERVER_KEY: z.string().optional(),
  },
  // runtimeEnv key names must match the schema keys above exactly
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_BASE_API: process.env.NEXT_PUBLIC_BASE_API,
    NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY,
    NEXT_PUBLIC_RECAPTCHA_SERVER_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY,
  },
});
