import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Eye,
  MessageSquare,
  Plus,
  Edit2,
  Star,
  BarChart3,
  CheckCircle,
} from "lucide-react";
import { businessService, BusinessListing } from "@/services/businessService";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "analytics">(
    "overview",
  );
  const [business, setBusiness] = useState<BusinessListing | null>(null);

  useEffect(() => {
    const savedBusiness = businessService.getBusinessListing();
    setBusiness(savedBusiness);
  }, []);

  const stats = [
    {
      label: "Profile Views",
      value: business?.views || 0,
      icon: Eye,
      change: "+12%",
      color: "blue",
    },
    {
      label: "Customer Inquiries",
      value: business?.inquiries || 0,
      icon: MessageSquare,
      change: "+5%",
      color: "green",
    },
    {
      label: "Followers",
      value: business?.followers || 0,
      icon: Users,
      change: "+8%",
      color: "green",
    },
    {
      label: "Avg. Rating",
      value: business?.rating || 0,
      icon: Star,
      change: "Out of 5",
      color: "yellow",
    },
  ];

  return (
    <AppLayout headerTitle="Business Dashboard">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        {/* Business Status Header */}
        {business ? (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
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
              Create your business profile to get discovered by customers on
              MarketScope.
            </p>
            <a
              href="/profile"
              className="inline-block bg-gradient-to-r from-green-700 to-green-900 text-white font-semibold px-6 py-2 rounded-lg hover:from-green-800 hover:to-green-950 transition-all"
            >
              <Plus className="inline mr-2" size={18} />
              Create Business Profile
            </a>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {[
            { id: "overview", label: "Overview" },
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
                  const colorClasses: Record<string, string> = {
                    blue: "bg-blue-50 text-blue-600",
                    green: "bg-green-50 text-green-700",
                    yellow: "bg-yellow-50 text-yellow-600",
                  };
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-border p-6"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-muted-foreground">
                          {stat.label}
                        </span>
                        <div
                          className={`p-2 rounded-lg ${colorClasses[stat.color]}`}
                        >
                          <Icon size={20} />
                        </div>
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

              {/* Business Preview on Search */}
              <div>
                <h3 className="text-lg font-bold text-foreground mb-4">
                  How Your Business Appears to Customers
                </h3>
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow max-w-sm">
                  <div className="w-full h-48 overflow-hidden bg-gray-100">
                    {business.image ? (
                      <img
                        src={business.image}
                        alt={business.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                        No cover image
                      </div>
                    )}
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
                  <a
                    href="/profile"
                    className="p-4 bg-white rounded-lg border border-border hover:border-primary hover:shadow transition-all text-left"
                  >
                    <Edit2 className="text-primary mb-2" size={20} />
                    <h4 className="font-semibold text-foreground">
                      Edit Profile
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Update business details
                    </p>
                  </a>
                  <a
                    href="/profile"
                    className="p-4 bg-white rounded-lg border border-border hover:border-primary hover:shadow transition-all text-left"
                  >
                    <Plus className="text-primary mb-2" size={20} />
                    <h4 className="font-semibold text-foreground">
                      Manage Products
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Add products & services
                    </p>
                  </a>
                  <button
                    onClick={() => setActiveTab("analytics")}
                    className="p-4 bg-white rounded-lg border border-border hover:border-primary hover:shadow transition-all text-left"
                  >
                    <BarChart3 className="text-primary mb-2" size={20} />
                    <h4 className="font-semibold text-foreground">
                      View Analytics
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Track performance
                    </p>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Monthly Views Chart */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Monthly Profile Views
                  </h3>
                  <div className="h-64 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg flex flex-col items-end justify-end p-4">
                    <div className="w-full flex items-end justify-around h-full">
                      {[
                        { month: "Jan", views: 45 },
                        { month: "Feb", views: 52 },
                        { month: "Mar", views: 48 },
                        { month: "Apr", views: 61 },
                        { month: "May", views: 55 },
                        { month: "Jun", views: 67 },
                      ].map((data) => (
                        <div
                          key={data.month}
                          className="flex flex-col items-center"
                        >
                          <div
                            className="bg-blue-500 rounded-t w-8"
                            style={{ height: `${(data.views / 67) * 100}%` }}
                          ></div>
                          <span className="text-xs text-muted-foreground mt-2">
                            {data.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Customer Inquiries Chart */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    Customer Inquiries Trend
                  </h3>
                  <div className="h-64 bg-gradient-to-b from-green-50 to-green-100 rounded-lg flex flex-col items-end justify-end p-4">
                    <div className="w-full flex items-end justify-around h-full">
                      {[
                        { month: "Jan", inquiries: 5 },
                        { month: "Feb", inquiries: 8 },
                        { month: "Mar", inquiries: 6 },
                        { month: "Apr", inquiries: 12 },
                        { month: "May", inquiries: 10 },
                        { month: "Jun", inquiries: 18 },
                      ].map((data) => (
                        <div
                          key={data.month}
                          className="flex flex-col items-center"
                        >
                          <div
                            className="bg-green-500 rounded-t w-8"
                            style={{
                              height: `${(data.inquiries / 18) * 100}%`,
                            }}
                          ></div>
                          <span className="text-xs text-muted-foreground mt-2">
                            {data.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Follower Growth */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  Follower Growth
                </h3>
                <div className="h-64 bg-gradient-to-b from-green-50 to-green-100 rounded-lg flex flex-col items-end justify-end p-4">
                  <div className="w-full flex items-end justify-around h-full">
                    {[
                      { month: "Jan", followers: 12 },
                      { month: "Feb", followers: 18 },
                      { month: "Mar", followers: 25 },
                      { month: "Apr", followers: 32 },
                      { month: "May", followers: 41 },
                      { month: "Jun", followers: 52 },
                    ].map((data) => (
                      <div
                        key={data.month}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="bg-green-600 rounded-t w-8"
                          style={{
                            height: `${(data.followers / 52) * 100}%`,
                          }}
                        ></div>
                        <span className="text-xs text-muted-foreground mt-2">
                          {data.month}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Summary */}
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-6">
                  Performance Summary
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-muted-foreground mb-2">
                      Total Views
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {business?.views || 0}
                    </p>
                    <p className="text-xs text-blue-500 mt-1">Last 30 days</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-muted-foreground mb-2">
                      Total Inquiries
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {business?.inquiries || 0}
                    </p>
                    <p className="text-xs text-green-500 mt-1">Last 30 days</p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-muted-foreground mb-2">
                      Total Followers
                    </p>
                    <p className="text-3xl font-bold text-green-700">
                      {business?.followers || 0}
                    </p>
                    <p className="text-xs text-green-600 mt-1">All time</p>
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
