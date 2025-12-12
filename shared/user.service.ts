import { supabase } from "./supabase";
import type { Database } from "./database.types";

type UserRow = Database["public"]["Tables"]["users"]["Row"];
type UserUpdate = Database["public"]["Tables"]["users"]["Update"];

export interface User extends UserRow {}

class UserService {
  /**
   * Get user by ID
   */
  async getUserById(id: string) {
    try {
      const { data, error } = await supabase
        .from("users")
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
        error: err instanceof Error ? err.message : "Failed to fetch user",
      };
    }
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to fetch user",
      };
    }
  }

  /**
   * Get user by phone
   */
  async getUserByPhone(phone: string) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("phone", phone)
        .single();

      if (error) {
        throw error;
      }

      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: err instanceof Error ? err.message : "Failed to fetch user",
      };
    }
  }

  /**
   * Update user profile
   */
  async updateUser(id: string, updates: UserUpdate) {
    try {
      const { data, error } = await supabase
        .from("users")
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
        error: err instanceof Error ? err.message : "Failed to update user",
      };
    }
  }

  /**
   * Get users by role
   */
  async getUsersByRole(role: "customer" | "business") {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("role", role);

      if (error) {
        throw error;
      }

      return { data: data || [], error: null };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to fetch users",
      };
    }
  }

  /**
   * Search users
   */
  async searchUsers(query: string) {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`);

      if (error) {
        throw error;
      }

      return { data: data || [], error: null };
    } catch (err) {
      return {
        data: [],
        error: err instanceof Error ? err.message : "Failed to search users",
      };
    }
  }

  /**
   * Delete user account
   */
  async deleteUser(id: string) {
    try {
      const { error } = await supabase.from("users").delete().eq("id", id);

      if (error) {
        throw error;
      }

      return { error: null };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to delete user",
      };
    }
  }

  /**
   * Verify user email/phone
   */
  async verifyUser(id: string) {
    try {
      const { data, error } = await supabase
        .from("users")
        .update({ is_verified: true, verification_code: null })
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
        error: err instanceof Error ? err.message : "Failed to verify user",
      };
    }
  }
}

export const userService = new UserService();
