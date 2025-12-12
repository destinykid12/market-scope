import { supabase } from "./supabase";
import type { Database } from "./database.types";

type UserRole = "customer" | "business";

export interface AuthUser {
  id: string;
  email: string;
  phone: string;
  full_name: string;
  role: UserRole;
  avatar_url: string | null;
  is_verified: boolean;
}

export interface SignUpData {
  email: string;
  phone: string;
  full_name: string;
  role: UserRole;
  password: string;
}

export interface SignInData {
  phone: string;
  password: string;
}

class AuthService {
  /**
   * Send OTP to phone number
   */
  async sendOTP(phone: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        phone,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err instanceof Error ? err.message : "Failed to send OTP",
      };
    }
  }

  /**
   * Verify OTP and create/get user
   */
  async verifyOTP(
    phone: string,
    token: string,
    userData?: {
      full_name: string;
      role: UserRole;
      email: string;
    }
  ): Promise<{ user?: AuthUser; error?: string }> {
    try {
      // Verify the OTP token with Supabase Auth
      const { data, error } = await supabase.auth.verifyOtp({
        phone,
        token,
        type: "sms",
      });

      if (error) {
        return { error: error.message };
      }

      if (!data.user) {
        return { error: "Failed to verify OTP" };
      }

      // Check if user exists in our users table
      const { data: existingUser, error: fetchError } = await supabase
        .from("users")
        .select("*")
        .eq("phone", phone)
        .single();

      if (fetchError && fetchError.code !== "PGRST116") {
        // PGRST116 = not found, which is fine
        return { error: "Failed to fetch user" };
      }

      if (existingUser) {
        // User exists, return existing user data
        return {
          user: {
            id: existingUser.id,
            email: existingUser.email,
            phone: existingUser.phone,
            full_name: existingUser.full_name,
            role: existingUser.role,
            avatar_url: existingUser.avatar_url,
            is_verified: existingUser.is_verified,
          },
        };
      }

      // Create new user if userData is provided
      if (!userData) {
        return { error: "User data required for new registration" };
      }

      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert([
          {
            email: userData.email,
            phone,
            full_name: userData.full_name,
            role: userData.role,
            is_verified: true,
          },
        ])
        .select()
        .single();

      if (createError) {
        return { error: createError.message };
      }

      return {
        user: {
          id: newUser.id,
          email: newUser.email,
          phone: newUser.phone,
          full_name: newUser.full_name,
          role: newUser.role,
          avatar_url: newUser.avatar_url,
          is_verified: newUser.is_verified,
        },
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to verify OTP",
      };
    }
  }

  /**
   * Sign up with email and password
   */
  async signUp(data: SignUpData): Promise<{ user?: AuthUser; error?: string }> {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp(
        {
          email: data.email,
          password: data.password,
        }
      );

      if (authError) {
        return { error: authError.message };
      }

      if (!authData.user) {
        return { error: "Failed to create auth user" };
      }

      // Create user profile in users table
      const { data: newUser, error: createError } = await supabase
        .from("users")
        .insert([
          {
            email: data.email,
            phone: data.phone,
            full_name: data.full_name,
            role: data.role,
            is_verified: false,
          },
        ])
        .select()
        .single();

      if (createError) {
        return { error: createError.message };
      }

      return {
        user: {
          id: newUser.id,
          email: newUser.email,
          phone: newUser.phone,
          full_name: newUser.full_name,
          role: newUser.role,
          avatar_url: newUser.avatar_url,
          is_verified: newUser.is_verified,
        },
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to sign up",
      };
    }
  }

  /**
   * Sign in with email and password
   */
  async signIn(data: SignInData): Promise<{ user?: AuthUser; error?: string }> {
    try {
      // First, find the user by phone to get their email
      const { data: userData, error: fetchError } = await supabase
        .from("users")
        .select("email")
        .eq("phone", data.phone)
        .single();

      if (fetchError) {
        return { error: "User not found" };
      }

      // Sign in with email and password
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: userData.email,
          password: data.password,
        });

      if (authError) {
        return { error: authError.message };
      }

      // Get full user profile
      const { data: user, error: getError } = await supabase
        .from("users")
        .select("*")
        .eq("email", userData.email)
        .single();

      if (getError) {
        return { error: "Failed to fetch user profile" };
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          full_name: user.full_name,
          role: user.role,
          avatar_url: user.avatar_url,
          is_verified: user.is_verified,
        },
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to sign in",
      };
    }
  }

  /**
   * Get current user
   */
  async getCurrentUser(): Promise<AuthUser | null> {
    try {
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user) {
        return null;
      }

      const { data: user } = await supabase
        .from("users")
        .select("*")
        .eq("email", data.user.email)
        .single();

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        email: user.email,
        phone: user.phone,
        full_name: user.full_name,
        role: user.role,
        avatar_url: user.avatar_url,
        is_verified: user.is_verified,
      };
    } catch (err) {
      return null;
    }
  }

  /**
   * Sign out
   */
  async signOut(): Promise<{ error?: string }> {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        return { error: error.message };
      }
      return {};
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to sign out",
      };
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(
    userId: string,
    updates: Partial<AuthUser>
  ): Promise<{ user?: AuthUser; error?: string }> {
    try {
      const { data: user, error } = await supabase
        .from("users")
        .update(updates)
        .eq("id", userId)
        .select()
        .single();

      if (error) {
        return { error: error.message };
      }

      return {
        user: {
          id: user.id,
          email: user.email,
          phone: user.phone,
          full_name: user.full_name,
          role: user.role,
          avatar_url: user.avatar_url,
          is_verified: user.is_verified,
        },
      };
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Failed to update profile",
      };
    }
  }

  /**
   * Check if phone number is registered
   */
  async isPhoneRegistered(phone: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id")
        .eq("phone", phone)
        .single();

      return !error && !!data;
    } catch {
      return false;
    }
  }
}

export const authService = new AuthService();
