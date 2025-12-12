import { supabase } from "./supabase";
import type { Database } from "./database.types";

type ReviewRow = Database["public"]["Tables"]["reviews"]["Row"];
type ReviewInsert = Database["public"]["Tables"]["reviews"]["Insert"];
type ReviewUpdate = Database["public"]["Tables"]["reviews"]["Update"];

export interface Review extends ReviewRow {
  author_name?: string;
}

class ReviewService {
  /**
   * Get all reviews for a business
   */
  async getBusinessReviews(businessId: string) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, users(full_name)")
        .eq("business_id", businessId)
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return { data: data || [], error: null };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to fetch reviews",
      };
    }
  }

  /**
   * Get single review by ID
   */
  async getReviewById(id: string) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, users(full_name)")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to fetch review",
      };
    }
  }

  /**
   * Create a new review
   */
  async createReview(review: ReviewInsert) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .insert([review])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update business rating
      await this.updateBusinessRating(review.business_id);

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to create review",
      };
    }
  }

  /**
   * Update a review
   */
  async updateReview(id: string, updates: ReviewUpdate) {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Update business rating
      if (data && updates.rating) {
        await this.updateBusinessRating(data.business_id);
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to update review",
      };
    }
  }

  /**
   * Delete a review
   */
  async deleteReview(id: string) {
    try {
      // Get review first to update business rating
      const { data: review } = await this.getReviewById(id);

      const { error } = await supabase.from("reviews").delete().eq("id", id);

      if (error) {
        throw error;
      }

      // Update business rating
      if (review) {
        await this.updateBusinessRating(review.business_id);
      }

      return { error: null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to delete review",
      };
    }
  }

  /**
   * Update business rating based on all its reviews
   */
  private async updateBusinessRating(businessId: string) {
    try {
      const { data: reviews, error: fetchError } = await supabase
        .from("reviews")
        .select("rating")
        .eq("business_id", businessId);

      if (fetchError) {
        throw fetchError;
      }

      const avgRating =
        reviews && reviews.length > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
          : 0;

      await supabase
        .from("businesses")
        .update({
          rating: parseFloat(avgRating.toFixed(2)),
          reviews_count: reviews?.length || 0,
        })
        .eq("id", businessId);
    } catch (err) {
      console.error("Failed to update business rating:", err);
    }
  }

  /**
   * Get average rating for a business
   */
  async getBusinessAverageRating(businessId: string) {
    try {
      const { data: reviews, error } = await supabase
        .from("reviews")
        .select("rating")
        .eq("business_id", businessId);

      if (error) {
        throw error;
      }

      if (!reviews || reviews.length === 0) {
        return { average: 0, count: 0, error: null };
      }

      const average =
        reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

      return {
        average: parseFloat(average.toFixed(2)),
        count: reviews.length,
        error: null,
      };
    } catch (err) {
      return {
        average: 0,
        count: 0,
        error: err instanceof Error ? err.message : "Failed to fetch rating",
      };
    }
  }

  /**
   * Check if user has already reviewed a business
   */
  async hasUserReviewedBusiness(
    userId: string,
    businessId: string
  ): Promise<{ hasReviewed: boolean; error?: string }> {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select("id")
        .eq("user_id", userId)
        .eq("business_id", businessId)
        .single();

      return { hasReviewed: !error && !!data };
    } catch (err) {
      return {
        hasReviewed: false,
        error: err instanceof Error ? err.message : "Failed to check review status",
      };
    }
  }
}

export const reviewService = new ReviewService();
