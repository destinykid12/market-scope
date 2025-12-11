import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call - in production, this would send OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store email for OTP verification
      localStorage.setItem("marketscope_email", email);

      // Navigate to OTP verification
      navigate("/verify-otp");
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary text-white font-bold text-2xl shadow-lg">
            M
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome to MarketScope
          </h1>
          <p className="text-muted-foreground text-lg">
            Discover Nigerian businesses and connect with customers
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-primary"
                size={20}
              />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
              />
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            {isLoading ? (
              <>
                <span>Sending OTP...</span>
              </>
            ) : (
              <>
                Continue
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {/* Info */}
        <div className="text-center text-sm text-muted-foreground">
          <p>We'll send a one-time password to your email</p>
          <p className="mt-2">No password needed, just a quick OTP</p>
        </div>
      </div>
    </div>
  );
}
