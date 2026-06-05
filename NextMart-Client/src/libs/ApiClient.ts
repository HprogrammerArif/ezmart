import { cookies } from 'next/headers';
import { Env } from '@/libs/Env';

export type ApiRequestOptions = RequestInit & {
  params?: Record<string, string>;
};

/**
 * Custom error class with HTTP status code and server data.
 */
export class ApiError extends Error {
  public status: number;
  public data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = 'ApiError';
  }
}

/**
 * Reads the auth token from Next.js server-side cookies.
 * Returns undefined when called outside a request context (e.g. during static builds).
 */
async function getAuthToken(): Promise<string | undefined> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
  } catch {
    return undefined;
  }
}

/**
 * Core HTTP fetch wrapper — auto-attaches the base URL, JSON Content-Type,
 * and the auth Bearer token from cookies.
 */
export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const baseUrl = Env.NEXT_PUBLIC_BASE_API ?? 'http://localhost:3001/api/v1';

  let url = `${baseUrl}${path.startsWith('/') ? '' : '/'}${path}`;
  if (options.params) {
    url += `?${new URLSearchParams(options.params).toString()}`;
  }

  const headers = new Headers(options.headers);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const token = await getAuthToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = null;
    }
    throw new ApiError(response.status, `API error ${response.status}`, errorData);
  }

  const contentType = response.headers.get('Content-Type');
  if (contentType?.includes('application/json')) {
    return (await response.json()) as T;
  }
  return (await response.text()) as unknown as T;
}

/**
 * Typed HTTP client with helper methods for GET, POST, PUT, PATCH, DELETE.
 * 
 * Usage (in Server Components):
 *   const products = await ApiClient.get<IProduct[]>('/products');
 * 
 * Usage (in Client Components):
 *   const product = await ApiClient.post<IProduct>('/products', { name: 'Jersey' });
 */
export const ApiClient = {
  async get<T>(path: string, options?: ApiRequestOptions): Promise<T> {
    return apiRequest<T>(path, { ...options, method: 'GET' });
  },

  async post<T>(path: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    return apiRequest<T>(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body),
    });
  },

  async put<T>(path: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    return apiRequest<T>(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body),
    });
  },

  async patch<T>(path: string, body: unknown, options?: ApiRequestOptions): Promise<T> {
    return apiRequest<T>(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  },

  async delete<T>(path: string, options?: ApiRequestOptions): Promise<T> {
    return apiRequest<T>(path, { ...options, method: 'DELETE' });
  },
};
