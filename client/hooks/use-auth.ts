import { useEffect, useState, useCallback } from "react";
import { authService, type AuthUser } from "@shared/services";

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load user on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const signUp = useCallback(
    async (email: string, phone: string, fullName: string, role: "customer" | "business", password: string) => {
      try {
        setError(null);
        setIsLoading(true);
        const { user: newUser, error: signUpError } = await authService.signUp({
          email,
          phone,
          full_name: fullName,
          role,
          password,
        });

        if (signUpError) {
          setError(signUpError);
          return { user: null, error: signUpError };
        }

        if (newUser) {
          setUser(newUser);
        }

        return { user: newUser, error: null };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Sign up failed";
        setError(errorMsg);
        return { user: null, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signIn = useCallback(
    async (phone: string, password: string) => {
      try {
        setError(null);
        setIsLoading(true);
        const { user: signedInUser, error: signInError } = await authService.signIn({
          phone,
          password,
        });

        if (signInError) {
          setError(signInError);
          return { user: null, error: signInError };
        }

        if (signedInUser) {
          setUser(signedInUser);
        }

        return { user: signedInUser, error: null };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Sign in failed";
        setError(errorMsg);
        return { user: null, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const sendOTP = useCallback(async (phone: string) => {
    try {
      setError(null);
      const { success, error: otpError } = await authService.sendOTP(phone);

      if (!success && otpError) {
        setError(otpError);
        return { success: false, error: otpError };
      }

      return { success: true, error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Failed to send OTP";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    }
  }, []);

  const verifyOTP = useCallback(
    async (phone: string, token: string, userData?: { full_name: string; role: "customer" | "business"; email: string }) => {
      try {
        setError(null);
        setIsLoading(true);
        const { user: verifiedUser, error: verifyError } = await authService.verifyOTP(phone, token, userData);

        if (verifyError) {
          setError(verifyError);
          return { user: null, error: verifyError };
        }

        if (verifiedUser) {
          setUser(verifiedUser);
        }

        return { user: verifiedUser, error: null };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "OTP verification failed";
        setError(errorMsg);
        return { user: null, error: errorMsg };
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const signOut = useCallback(async () => {
    try {
      setError(null);
      const { error: signOutError } = await authService.signOut();

      if (signOutError) {
        setError(signOutError);
        return { error: signOutError };
      }

      setUser(null);
      return { error: null };
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Sign out failed";
      setError(errorMsg);
      return { error: errorMsg };
    }
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<AuthUser>) => {
      if (!user) {
        setError("No user logged in");
        return { user: null, error: "No user logged in" };
      }

      try {
        setError(null);
        const { user: updatedUser, error: updateError } = await authService.updateProfile(user.id, updates);

        if (updateError) {
          setError(updateError);
          return { user: null, error: updateError };
        }

        if (updatedUser) {
          setUser(updatedUser);
        }

        return { user: updatedUser, error: null };
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Profile update failed";
        setError(errorMsg);
        return { user: null, error: errorMsg };
      }
    },
    [user]
  );

  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    signUp,
    signIn,
    sendOTP,
    verifyOTP,
    signOut,
    updateProfile,
  };
}
