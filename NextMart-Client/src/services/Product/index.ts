/**
 * Product Service — Barrel
 *
 * No "use server" directive here. This file simply re-exports everything
 * from the two sub-modules so the rest of the codebase can import from
 * "@/services/Product" without knowing the internal structure.
 *
 * queries.ts   — plain async fetches, safe for Server + Client Components
 * mutations.ts — "use server" actions, for forms/buttons that mutate data
 */

export * from "./queries";
export * from "./mutations";
