import { useNavigate } from "react-router-dom";
import { Briefcase, Users, ArrowRight } from "lucide-react";
import { useState } from "react";

export default function ChooseRole() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<
    "business" | "customer" | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!selectedRole) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Store role
      localStorage.setItem("marketscope_role", selectedRole);

      // Navigate to appropriate dashboard or home
      const destination = selectedRole === "business" ? "/home" : "/home";
      navigate(destination);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Content */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            What's Your Role?
          </h1>
          <p className="text-muted-foreground text-lg">
            Choose how you want to use MarketScope
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Business Card */}
          <button
            onClick={() => setSelectedRole("business")}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
              selectedRole === "business"
                ? "border-primary bg-primary-50"
                : "border-border bg-white hover:border-primary hover:shadow-lg"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-4 rounded-xl ${
                  selectedRole === "business"
                    ? "bg-primary text-white"
                    : "bg-primary-50 text-primary"
                }`}
              >
                <Briefcase size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  I'm a Business
                </h3>
                <p className="text-muted-foreground text-sm">
                  Showcase your products and services, connect with customers,
                  and grow your business
                </p>
              </div>
            </div>
          </button>

          {/* Customer Card */}
          <button
            onClick={() => setSelectedRole("customer")}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
              selectedRole === "customer"
                ? "border-primary bg-primary-50"
                : "border-border bg-white hover:border-primary hover:shadow-lg"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-4 rounded-xl ${
                  selectedRole === "customer"
                    ? "bg-primary text-white"
                    : "bg-primary-50 text-primary"
                }`}
              >
                <Users size={28} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  I'm a Customer
                </h3>
                <p className="text-muted-foreground text-sm">
                  Discover local businesses, browse products, and support
                  Nigerian entrepreneurs
                </p>
              </div>
            </div>
          </button>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!selectedRole || isLoading}
          className="w-full bg-accent hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          {isLoading ? (
            "Getting Started..."
          ) : (
            <>
              Continue
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
