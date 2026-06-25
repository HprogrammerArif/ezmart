/**
 * Product Query Services
 *
 * No "use server" directive here — these are plain async fetch functions
 * that can be called from BOTH Server Components and Client Components.
 * Only mutations (add/update/delete) that need `cookies()` or `revalidateTag()`
 * belong in index.ts with "use server".
 */

const BASE = process.env.NEXT_PUBLIC_BASE_API;

// ─── shared helper ────────────────────────────────────────────────────────────

const fetchProductEndpoint = async (endpoint: string, limit?: number) => {
  const query = limit ? `?limit=${limit}` : "";
  const res = await fetch(`${BASE}/product/${endpoint}${query}`, {
    next: { tags: ["PRODUCT"] },
  });
  if (!res.ok) return null;
  return res.json();
};

// ─── read-only queries ────────────────────────────────────────────────────────

export const getAllProducts = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined }
) => {
  const params = new URLSearchParams();
  if (query?.price) {
    params.append("minPrice", "0");
    params.append("maxPrice", query.price.toString());
  }
  if (query?.category) params.append("categories", query.category.toString());
  if (query?.brand) params.append("brands", query.brand.toString());
  if (query?.rating) params.append("ratings", query.rating.toString());

  const res = await fetch(
    `${BASE}/product?limit=${limit}&page=${page}&${params}`,
    { next: { tags: ["PRODUCT"] } }
  );
  if (!res.ok) return null;
  return res.json();
};

export const getSingleProduct = async (productId: string) => {
  const res = await fetch(`${BASE}/product/${productId}`, {
    next: { tags: ["PRODUCT"] },
  });
  if (!res.ok) return null;
  return res.json();
};

/** Best sellers — 3-tier fallback: orders → top-rated → newest */
export const getPopularProducts = (limit?: number) =>
  fetchProductEndpoint("popular", limit);

/** New arrivals — sorted by createdAt desc, always returns products */
export const getNewArrivalProducts = (limit?: number) =>
  fetchProductEndpoint("new-arrivals", limit);

/** Trending — order-based with same 3-tier fallback */
export const getTrendingProducts = (limit?: number) =>
  fetchProductEndpoint("trending", limit);

/** Flash sale products */
export const getFlashSaleProducts = (limit?: number) =>
  fetchProductEndpoint("flash-sale", limit);
