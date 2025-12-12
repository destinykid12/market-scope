import { supabase } from "./supabase";
import type { Database } from "./database.types";

type ProductRow = Database["public"]["Tables"]["products"]["Row"];
type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];

export interface Product extends ProductRow {}

class ProductService {
  /**
   * Get all products for a business
   */
  async getBusinessProducts(businessId: string) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("business_id", businessId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return { data: data || [], error: null };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to fetch products",
      };
    }
  }

  /**
   * Get single product by ID
   */
  async getProductById(id: string) {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to fetch product",
      };
    }
  }

  /**
   * Create a new product
   */
  async createProduct(product: ProductInsert) {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert([product])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to create product",
      };
    }
  }

  /**
   * Update a product
   */
  async updateProduct(id: string, updates: ProductUpdate) {
    try {
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to update product",
      };
    }
  }

  /**
   * Delete a product
   */
  async deleteProduct(id: string) {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to delete product",
      };
    }
  }

  /**
   * Bulk create products
   */
  async createBulkProducts(products: ProductInsert[]) {
    try {
      const { data, error } = await supabase
        .from("products")
        .insert(products)
        .select();

      if (error) {
        throw error;
      }

      return { data: data || [], error: null };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to create products",
      };
    }
  }

  /**
   * Bulk delete products
   */
  async deleteBulkProducts(productIds: string[]) {
    try {
      const { error } = await supabase
        .from("products")
        .delete()
        .in("id", productIds);

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to delete products",
      };
    }
  }
}

export const productService = new ProductService();
