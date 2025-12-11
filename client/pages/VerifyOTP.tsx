import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, RefreshCw } from "lucide-react";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem("marketscope_email");
    if (!storedEmail) {
      navigate("/login");
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  useEffect(() => {
    if (resendCountdown > 0) {
      const timer = setTimeout(
        () => setResendCountdown(resendCountdown - 1),
        1000,
      );
      return () => clearTimeout(timer);
    }
  }, [resendCountdown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store auth token (in production, this comes from API)
      localStorage.setItem("marketscope_token", `token_${Date.now()}`);

      // Check if user already has a role, if yes go to home, else choose role
      const existingRole = localStorage.getItem("marketscope_role");
      const destination = existingRole ? "/home" : "/choose-role";
      navigate(destination);
    } catch (err) {
      setError("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    setResendCountdown(60);
    setOtp("");
    setError("");

    try {
      // Simulate resending OTP
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (err) {
      setError("Failed to resend OTP. Please try again.");
    }
  };

  const handleOtpChange = (value: string) => {
    // Only allow digits
    const filtered = value.replace(/\D/g, "").slice(0, 6);
    setOtp(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-primary hover:text-primary-600 font-semibold mb-8"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Verify Your Email
          </h1>
          <p className="text-muted-foreground text-lg">
            We sent a 6-digit code to
          </p>
          <p className="text-primary font-semibold">{email}</p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-sm font-semibold text-foreground mb-3"
            >
              Verification Code
            </label>
            <input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => handleOtpChange(e.target.value)}
              placeholder="000000"
              maxLength={6}
              className="w-full text-center text-3xl font-bold tracking-widest py-4 border-2 border-border rounded-xl focus:outline-none focus:border-primary bg-white text-foreground"
            />
            <p className="text-xs text-muted-foreground mt-2">
              Check your spam folder if you don't see the email
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || otp.length !== 6}
            className="w-full bg-accent hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>

        {/* Resend OTP */}
        <div className="text-center">
          {resendCountdown > 0 ? (
            <p className="text-muted-foreground text-sm">
              Resend code in{" "}
              <span className="font-semibold">{resendCountdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="text-primary hover:text-primary-600 font-semibold flex items-center justify-center gap-2 mx-auto"
            >
              <RefreshCw size={16} />
              Resend Code
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
