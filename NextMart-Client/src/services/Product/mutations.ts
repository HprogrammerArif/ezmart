"use server";
/**
 * Product Mutation Actions
 *
 * "use server" is required here because these functions use `cookies()` and
 * `revalidateTag()` which are server-only APIs. This file is intentionally
 * separate from queries.ts so Client Components can safely import queries
 * without hitting the "use server" restriction.
 */
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const addProduct = async (productData: FormData): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product`,
      {
        method: "POST",
        body: productData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateProduct = async (
  productData: FormData,
  productId: string
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/product/${productId}`,
      {
        method: "PATCH",
        body: productData,
        headers: {
          Authorization: (await cookies()).get("accessToken")!.value,
        },
      }
    );
    revalidateTag("PRODUCT");
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
