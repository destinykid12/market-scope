import { supabase } from "./supabase";
import type { Database } from "./database.types";

type BusinessRow = Database["public"]["Tables"]["businesses"]["Row"];
type BusinessInsert = Database["public"]["Tables"]["businesses"]["Insert"];
type BusinessUpdate = Database["public"]["Tables"]["businesses"]["Update"];

export interface Business extends BusinessRow {}

export interface BusinessFilters {
  category?: string;
  location?: string;
  searchQuery?: string;
  limit?: number;
  offset?: number;
}

class BusinessService {
  /**
   * Get all businesses with optional filters
   */
  async getBusinesses(filters?: BusinessFilters) {
    try {
      let query = supabase.from("businesses").select("*");

      if (filters?.category && filters.category !== "All") {
        query = query.eq("category", filters.category);
      }

      if (filters?.location && filters.location !== "All") {
        query = query.eq("location", filters.location);
      }

      if (filters?.searchQuery) {
        const search = filters.searchQuery.toLowerCase();
        query = query.or(
          `name.ilike.%${search}%,description.ilike.%${search}%,category.ilike.%${search}%`,
        );
      }

      if (filters?.limit) {
        query = query.limit(filters.limit);
      }

      if (filters?.offset) {
        query = query.range(
          filters.offset,
          filters.offset + (filters.limit || 10) - 1,
        );
      } else {
        query = query.order("created_at", { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return { data: data || [], error: null };
    } catch (err) {
      return {
        data: [],
        error:
          err instanceof Error ? err.message : "Failed to fetch businesses",
      };
    }
  }

  /**
   * Get single business by ID
   */
  async getBusinessById(id: string) {
    try {
      const { data, error } = await supabase
        .from("businesses")
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
        error: err instanceof Error ? err.message : "Failed to fetch business",
      };
    }
  }

  /**
   * Get business by user ID
   */
  async getBusinessByUserId(userId: string) {
    try {
      const { data, error } = await supabase
        .from("businesses")
        .select("*")
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        throw error;
      }

      return { data: error ? null : data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to fetch business",
      };
    }
  }

  /**
   * Create new business
   */
  async createBusiness(
    userId: string,
    business: Omit<BusinessInsert, "user_id">,
  ) {
    try {
      const { data, error } = await supabase
        .from("businesses")
        .insert([{ ...business, user_id: userId }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to create business",
      };
    }
  }

  /**
   * Update business
   */
  async updateBusiness(id: string, updates: BusinessUpdate) {
    try {
      const { data, error } = await supabase
        .from("businesses")
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
        error: err instanceof Error ? err.message : "Failed to update business",
      };
    }
  }

  /**
   * Update business stats
   */
  async updateBusinessStats(
    id: string,
    stats: { views?: number; inquiries?: number; followers?: number },
  ) {
    try {
      const { data, error } = await supabase
        .from("businesses")
        .update(stats)
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
        error: err instanceof Error ? err.message : "Failed to update stats",
      };
    }
  }

  /**
   * Delete business
   */
  async deleteBusiness(id: string) {
    try {
      const { error } = await supabase.from("businesses").delete().eq("id", id);

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to delete business",
      };
    }
  }

  /**
   * Get unique categories with counts
   */
  async getCategories() {
    try {
      const { data, error } = await supabase
        .from("categories")
        .select("*")
        .order("name");

      if (error) {
        throw error;
      }

      return { data: data || [], error: null };
    } catch (err) {
      return {
        data: [],
        error:
          err instanceof Error ? err.message : "Failed to fetch categories",
      };
    }
  }

  /**
   * Get unique locations
   */
  async getLocations() {
    try {
      const { data, error } = await supabase
        .from("businesses")
        .select("location")
        .neq("location", null);

      if (error) {
        throw error;
      }

      const locations = Array.from(
        new Set((data || []).map((b) => b.location).filter(Boolean)),
      );

      return { data: locations, error: null };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to fetch locations",
      };
    }
  }

  /**
   * Follow a business
   */
  async followBusiness(userId: string, businessId: string) {
    try {
      const { data, error } = await supabase
        .from("business_followers")
        .insert([{ user_id: userId, business_id: businessId }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Increment followers count
      await this.updateBusinessStats(businessId, {
        followers:
          (await this.getBusinessById(businessId)).data?.followers || 0 + 1,
      });

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to follow business",
      };
    }
  }

  /**
   * Unfollow a business
   */
  async unfollowBusiness(userId: string, businessId: string) {
    try {
      const { error } = await supabase
        .from("business_followers")
        .delete()
        .eq("user_id", userId)
        .eq("business_id", businessId);

      if (error) {
        throw error;
      }

      // Decrement followers count
      const business = (await this.getBusinessById(businessId)).data;
      if (business) {
        await this.updateBusinessStats(businessId, {
          followers: Math.max(0, business.followers - 1),
        });
      }

      return { error: null };
    } catch (err) {
      return {
        error:
          err instanceof Error ? err.message : "Failed to unfollow business",
      };
    }
  }

  /**
   * Check if user follows business
   */
  async isFollowingBusiness(userId: string, businessId: string) {
    try {
      const { data, error } = await supabase
        .from("business_followers")
        .select("id")
        .eq("user_id", userId)
        .eq("business_id", businessId)
        .single();

      return { isFollowing: !error && !!data, error: null };
    } catch (err) {
      return {
        isFollowing: false,
        error:
          err instanceof Error
            ? err.message
            : "Failed to check following status",
      };
    }
  }
}

export const businessService = new BusinessService();
