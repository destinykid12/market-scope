import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Mail,
  Lock,
  User,
  Phone,
  Building2,
  MapPin,
  Upload,
  Eye,
  EyeOff,
} from "lucide-react";
import { authService } from "@shared/services";

export default function SignUp() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    businessName: "",
    businessCategory: "",
    businessAddress: "",
    password: "",
    confirmPassword: "",
  });

  const businessCategories = [
    "Fashion & Clothing",
    "Food & Beverages",
    "Beauty & Cosmetics",
    "Home & Furniture",
    "Electronics & Gadgets",
    "Health & Wellness",
    "Education & Learning",
    "Business Services",
    "Real Estate",
    "Auto Services",
    "Other",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.includes("@")) newErrors.email = "Valid email required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required";
    if (!formData.businessCategory)
      newErrors.businessCategory = "Business category is required";
    if (!formData.businessAddress.trim())
      newErrors.businessAddress = "Business address is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!agreeTerms)
      newErrors.terms = "You must agree to the terms and privacy policy";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const { user, error } = await authService.signUp({
        email: formData.email,
        phone: formData.phone,
        full_name: formData.fullName,
        role: "business",
        password: formData.password,
      });

      if (error) {
        setErrors({ submit: error });
        return;
      }

      if (user) {
        localStorage.setItem("marketscope_user_id", user.id);
        localStorage.setItem("marketscope_user_role", user.role);
        navigate("/choose-role");
      }
    } catch (err) {
      setErrors({
        submit:
          err instanceof Error
            ? err.message
            : "Failed to create account. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-green-700 to-green-900 text-white font-bold text-2xl shadow-lg">
            M
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground text-lg">
            Join MarketScope today
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                id="fullName"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder-muted-foreground"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Username
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder-muted-foreground"
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email Address */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder-muted-foreground"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Phone Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+234 800 000 0000"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder-muted-foreground"
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Business Name */}
          <div>
            <label
              htmlFor="businessName"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Business Name
            </label>
            <div className="relative">
              <Building2
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                id="businessName"
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your Business Name"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder-muted-foreground"
              />
            </div>
            {errors.businessName && (
              <p className="text-red-500 text-xs mt-1">{errors.businessName}</p>
            )}
          </div>

          {/* Business Category */}
          <div>
            <label
              htmlFor="businessCategory"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Business Category
            </label>
            <select
              id="businessCategory"
              name="businessCategory"
              value={formData.businessCategory}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground"
            >
              <option value="">Select a category</option>
              {businessCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.businessCategory && (
              <p className="text-red-500 text-xs mt-1">
                {errors.businessCategory}
              </p>
            )}
          </div>

          {/* Business Address */}
          <div>
            <label
              htmlFor="businessAddress"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Business Address
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                id="businessAddress"
                type="text"
                name="businessAddress"
                value={formData.businessAddress}
                onChange={handleChange}
                placeholder="123 Main Street, Lagos"
                className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder-muted-foreground"
              />
            </div>
            {errors.businessAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.businessAddress}
              </p>
            )}
          </div>

          {/* CAC Registration Document */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              CAC Registration Document (Optional)
            </label>
            <button
              type="button"
              className="w-full px-4 py-3 border-2 border-dashed border-border rounded-lg text-foreground hover:border-primary transition-colors flex items-center justify-center gap-2"
            >
              <Upload size={20} />
              Upload CAC Document
            </button>
            <p className="text-xs text-muted-foreground mt-2">
              Upload for business verification and credibility badge
            </p>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full pl-10 pr-10 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-foreground mb-2"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={20}
              />
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full pl-10 pr-10 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-white text-foreground placeholder-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start gap-3">
            <input
              id="terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 mt-1 border border-border rounded focus:ring-2 focus:ring-primary cursor-pointer"
            />
            <label htmlFor="terms" className="text-sm text-muted-foreground">
              I agree to the{" "}
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Terms of Service
              </a>
              and{" "}
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.terms && (
            <p className="text-red-500 text-xs">{errors.terms}</p>
          )}

          {/* Submit Error */}
          {errors.submit && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.submit}
            </div>
          )}

          {/* Create Account Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-700 to-green-900 hover:from-green-800 hover:to-green-950 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-6"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Divider */}
          <div className="relative flex items-center mt-6">
            <div className="flex-grow border-t border-border"></div>
            <span className="px-3 text-sm text-muted-foreground">OR</span>
            <div className="flex-grow border-t border-border"></div>
          </div>

          {/* Sign In Link */}
          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?
            <Link
              to="/signin"
              className="text-primary font-semibold hover:underline ml-1"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
