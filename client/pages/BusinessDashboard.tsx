import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Eye,
  MessageSquare,
  Plus,
  Edit2,
  Trash2,
  Upload,
  Star,
  CheckCircle,
} from "lucide-react";
import { businessService, BusinessListing } from "@/services/businessService";

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "profile" | "products" | "analytics"
  >("overview");
  const [business, setBusiness] = useState<BusinessListing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<BusinessListing>>({});

  const categories = [
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
  ];

  useEffect(() => {
    const savedBusiness = businessService.getBusinessListing();
    setBusiness(savedBusiness);
    if (savedBusiness) {
      setFormData(savedBusiness);
    } else {
      setFormData({
        name: "",
        category: "",
        location: "",
        description: "",
        phone: "",
        email: "",
        address: "",
        image: "",
        productImages: [],
        owner: localStorage.getItem("marketscope_business_name") || "",
      });
    }
  }, []);

  const handleSaveBusiness = () => {
    if (!formData.name || !formData.category || !formData.location) {
      alert("Please fill in required fields");
      return;
    }
    const saved = businessService.saveBusinessListing(formData);
    setBusiness(saved);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const stats = [
    {
      label: "Profile Views",
      value: business?.views || 0,
      icon: Eye,
      change: "+12%",
    },
    {
      label: "Customer Inquiries",
      value: business?.inquiries || 0,
      icon: MessageSquare,
      change: "+5%",
    },
    {
      label: "Followers",
      value: business?.followers || 0,
      icon: Users,
      change: "+8%",
    },
    {
      label: "Avg. Rating",
      value: business?.rating || 0,
      icon: Star,
      change: "Out of 5",
    },
  ];

  return (
    <AppLayout headerTitle="Business Dashboard">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        {/* Business Status Header */}
        {business ? (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-green-100 rounded-xl border border-green-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {business.name}
                </h2>
                <p className="text-muted-foreground">
                  {business.category} • {business.location}
                </p>
              </div>
              <div className="text-right">
                <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold flex items-center gap-2">
                  <CheckCircle size={16} />
                  Active
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome to Your Business Dashboard
            </h2>
            <p className="text-muted-foreground mb-4">
              Create your business listing to get discovered by customers on
              MarketScope.
            </p>
            <button
              onClick={() => {
                setActiveTab("profile");
                setIsEditing(true);
              }}
              className="bg-gradient-to-r from-green-700 to-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:from-green-800 hover:to-green-700 transition-all"
            >
              <Plus className="inline mr-2" size={18} />
              Create Business Listing
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {[
            { id: "overview", label: "Overview" },
            { id: "profile", label: "Business Profile" },
            { id: "products", label: "Products & Services" },
            { id: "analytics", label: "Analytics" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Overview Tab */}
          {activeTab === "overview" && business && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-border p-6"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </span>
                        <Icon className="text-primary" size={20} />
                      </div>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-xs text-green-600 mt-2">
                        {stat.change}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Business Preview */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  How Your Business Appears on Search
                </h3>
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow max-w-sm">
                  <div className="w-full h-48 overflow-hidden bg-gray-100">
                    <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                      {business.image ? (
                        <img
                          src={business.image}
                          alt={business.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        "No image"
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">
                      {business.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {business.category}
                    </p>
                    <p className="text-sm text-gray-700 mb-4 italic">
                      "{business.description}"
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <Star size={16} className="fill-black text-black" />
                      <span className="font-bold text-gray-900">
                        {business.rating}
                      </span>
                      <span className="text-sm text-gray-600">
                        ({business.reviews} reviews)
                      </span>
                    </div>
                    <button className="text-sm font-medium text-gray-900 hover:text-green-700 transition-colors">
                      View Profile →
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      setActiveTab("profile");
                      setIsEditing(true);
                    }}
                    className="p-4 bg-white rounded-lg border border-border hover:border-primary hover:shadow transition-all text-left"
                  >
                    <Edit2 className="text-primary mb-2" size={20} />
                    <h4 className="font-semibold text-foreground">
                      Edit Profile
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Update business details
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="p-4 bg-white rounded-lg border border-border hover:border-primary hover:shadow transition-all text-left"
                  >
                    <Plus className="text-primary mb-2" size={20} />
                    <h4 className="font-semibold text-foreground">
                      Add Products
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Showcase what you offer
                    </p>
                  </button>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className="p-4 bg-white rounded-lg border border-border hover:border-primary hover:shadow transition-all text-left"
                  >
                    <TrendingUp className="text-primary mb-2" size={20} />
                    <h4 className="font-semibold text-foreground">
                      View Analytics
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Track your performance
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Business Profile Tab */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-xl border border-border p-6">
              {isEditing ? (
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Business Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ""}
                      onChange={handleInputChange}
                      placeholder="Your Business Name"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Category *
                      </label>
                      <select
                        name="category"
                        value={formData.category || ""}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Location *
                      </label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location || ""}
                        onChange={handleInputChange}
                        placeholder="e.g., Lagos, Abuja, Ibadan"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Business Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address || ""}
                      onChange={handleInputChange}
                      placeholder="123 Main Street, Your City"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Business Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description || ""}
                      onChange={handleInputChange}
                      placeholder="Describe your business, what you offer, and what makes you unique..."
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ""}
                        onChange={handleInputChange}
                        placeholder="+234 800 000 0000"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                        placeholder="business@example.com"
                        className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Business Cover Image
                    </label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Drag and drop your image or click to browse
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              setFormData((prev) => ({
                                ...prev,
                                image: event.target?.result as string,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleSaveBusiness}
                      className="flex-1 bg-gradient-to-r from-green-700 to-green-900 text-white font-semibold py-3 rounded-lg hover:from-green-800 hover:to-green-950 transition-all"
                    >
                      Save Business Profile
                    </button>
                    {business && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="flex-1 border border-border text-foreground font-semibold py-3 rounded-lg hover:bg-muted transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              ) : business ? (
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-foreground mb-2">
                        {business.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {business.category} • {business.location}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all"
                    >
                      <Edit2 size={18} />
                      Edit
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Address
                      </p>
                      <p className="text-foreground">{business.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Phone
                      </p>
                      <p className="text-foreground">{business.phone}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Email
                      </p>
                      <p className="text-foreground">{business.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Rating
                      </p>
                      <p className="text-foreground flex items-center gap-2">
                        <Star size={16} className="fill-current" />
                        {business.rating} ({business.reviews} reviews)
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Description
                    </p>
                    <p className="text-foreground">{business.description}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground mb-4">
                    No business listing yet
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-green-700 to-green-900 text-white font-semibold px-6 py-2 rounded-lg hover:from-green-800 hover:to-green-950 transition-all"
                  >
                    Create Business Listing
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="text-center py-12">
                <Plus
                  className="mx-auto text-muted-foreground mb-4"
                  size={40}
                />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  No Products Added Yet
                </h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  Add photos and details of your products or services to
                  showcase what you offer.
                </p>
                <button className="bg-gradient-to-r from-green-700 to-green-900 text-white font-semibold px-6 py-2 rounded-lg hover:from-green-800 hover:to-green-950 transition-all">
                  Add Product/Service
                </button>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Monthly Views
                  </h3>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    Chart will appear here
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Customer Inquiries
                  </h3>
                  <div className="h-48 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
                    Chart will appear here
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Performance Summary
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <span className="text-foreground font-medium">
                      Total Views
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      {business?.views || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="text-foreground font-medium">
                      Customer Inquiries
                    </span>
                    <span className="text-2xl font-bold text-green-600">
                      {business?.inquiries || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="text-foreground font-medium">
                      Business Followers
                    </span>
                    <span className="text-2xl font-bold text-green-700">
                      {business?.followers || 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
