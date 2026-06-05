'use client';

import { AppConfig } from '@/utils/AppConfig';

/**
 * Global error boundary — catches all unhandled errors during server-side rendering.
 * Without this, Next.js shows a generic crash page. This shows a branded fallback UI.
 * 
 * This must be a Client Component with both `error` and `reset` props.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-white flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-black text-6xl text-[#111111] mb-4 uppercase tracking-tight">
            Oops!
          </h1>
          <h2 className="font-bold text-xl text-gray-600 mb-2">
            Something went wrong
          </h2>
          <p className="text-gray-400 text-sm mb-2 max-w-md">
            {error.message || 'An unexpected error occurred. Our team has been notified.'}
          </p>
          {error.digest && (
            <p className="text-xs text-gray-300 mb-8 font-mono">
              Error ID: {error.digest}
            </p>
          )}
          <div className="flex gap-4">
            <button
              onClick={reset}
              className="h-12 px-8 bg-[#111111] text-white font-bold uppercase tracking-widest text-sm rounded-md hover:bg-black transition-colors"
            >
              Try Again
            </button>
            <a
              href="/"
              className="h-12 px-8 border-2 border-[#111111] text-[#111111] font-bold uppercase tracking-widest text-sm rounded-md hover:bg-gray-50 transition-colors flex items-center"
            >
              Go Home
            </a>
          </div>
          <p className="mt-12 text-xs text-gray-300">
            © {new Date().getFullYear()} {AppConfig.name}
          </p>
        </div>
      </body>
    </html>
  );
}
