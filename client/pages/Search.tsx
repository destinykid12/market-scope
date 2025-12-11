import { Search, ChevronDown, Star, MapPin } from "lucide-react";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockBusinesses, categories } from "@/services/mockData";
import { businessService } from "@/services/businessService";

export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [selectedMainCategory, setSelectedMainCategory] =
    useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null,
  );
  const [relevanceFilter, setRelevanceFilter] = useState("relevance");
  const [ratingFilter, setRatingFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [displayCount, setDisplayCount] = useState(6);

  const subCategories = {
    goods: [
      "All",
      "Fashion",
      "Food & Drinks",
      "Electronics",
      "Groceries",
      "Accessories",
    ],
    services: [
      "All",
      "Repair & Service",
      "Health & Wellness",
      "Salon & Spa",
      "Auto Services",
      "Real Estate",
    ],
  };

  // Get user's business listing from dashboard
  const userBusiness = businessService.getBusinessListing();

  // Add product images to businesses
  let allBusinesses = mockBusinesses;
  if (userBusiness) {
    // Add user's business to the list
    allBusinesses = [
      {
        id: userBusiness.id,
        name: userBusiness.name,
        category: userBusiness.category,
        location: userBusiness.location,
        rating: userBusiness.rating,
        reviews: userBusiness.reviews,
        verified: userBusiness.verified,
        description: userBusiness.description,
        image: userBusiness.image || "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
        owner: userBusiness.owner,
        phone: userBusiness.phone,
        email: userBusiness.email,
      },
      ...mockBusinesses,
    ];
  }

  const businessesWithImages = allBusinesses.map((business, index) => ({
    ...business,
    productImage:
      (business as any).productImage ||
      business.image ||
      [
        "https://images.pexels.com/photos/7621009/pexels-photo-7621009.jpeg",
        "https://images.pexels.com/photos/2781540/pexels-photo-2781540.jpeg",
        "https://images.pexels.com/photos/10493094/pexels-photo-10493094.jpeg",
        "https://images.pexels.com/photos/13727138/pexels-photo-13727138.jpeg",
        "https://images.pexels.com/photos/7621009/pexels-photo-7621009.jpeg",
        "https://images.pexels.com/photos/2781540/pexels-photo-2781540.jpeg",
      ][index % 6],
  }));

  const displayedBusinesses = businessesWithImages.slice(0, displayCount);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-700 text-white font-bold text-lg">
              M
            </div>
            <h1 className="text-xl font-bold text-green-900">MarketScope</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <a
              href="/"
              className="text-gray-700 font-medium hover:text-gray-900"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-700 font-medium hover:text-gray-900"
            >
              About
            </a>
            <a
              href="#"
              className="text-gray-700 font-medium hover:text-gray-900"
            >
              Contact
            </a>
          </nav>
          <button
            onClick={() => navigate("/business-dashboard")}
            className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
          >
            Host Your Business
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for businesses, products or services..."
              className="w-full pl-12 pr-4 py-3 bg-gray-100 rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-green-600 text-gray-900 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Category and Filter Chips */}
        <div className="flex items-center gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Categories:</span>
            <button
              onClick={() => setSelectedMainCategory("all")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedMainCategory === "all"
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 border border-gray-300"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedMainCategory("goods")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedMainCategory === "goods"
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 border border-gray-300"
              }`}
            >
              Goods
            </button>
            <button
              onClick={() => setSelectedMainCategory("services")}
              className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedMainCategory === "services"
                  ? "bg-green-700 text-white"
                  : "bg-gray-100 text-gray-700 border border-gray-300"
              }`}
            >
              Services
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <select
              value={relevanceFilter}
              onChange={(e) => setRelevanceFilter(e.target.value)}
              className="px-3 py-2 bg-green-700 text-white rounded-full text-sm font-medium border-0 cursor-pointer hover:bg-green-800"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="popular">Popular</option>
            </select>

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium border-0 cursor-pointer hover:bg-gray-300"
            >
              <option value="all">Rating</option>
              <option value="5">5 Stars</option>
              <option value="4">4+ Stars</option>
              <option value="3">3+ Stars</option>
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="px-3 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium border-0 cursor-pointer hover:bg-gray-300"
            >
              <option value="all">Location</option>
              <option value="jos">Jos</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            <button
              onClick={() => setSelectedMainCategory("goods")}
              className={`py-4 font-medium transition-colors border-b-2 ${
                selectedMainCategory === "goods"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Goods
            </button>
            <button
              onClick={() => setSelectedMainCategory("services")}
              className={`py-4 font-medium transition-colors border-b-2 ${
                selectedMainCategory === "services"
                  ? "border-gray-900 text-gray-900"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Services
            </button>
          </div>
        </div>

        {/* Subcategories */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-700 font-medium">Categories:</span>
            {(selectedMainCategory === "goods"
              ? subCategories.goods
              : subCategories.services
            ).map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedSubCategory(cat === "All" ? null : cat)
                }
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  (selectedSubCategory === null && cat === "All") ||
                  selectedSubCategory === cat
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 border border-gray-300 hover:border-green-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {displayedBusinesses.map((business) => (
            <div
              key={business.id}
              className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer"
            >
              {/* Product Image */}
              <div className="w-full h-48 overflow-hidden bg-gray-100">
                <img
                  src={(business as any).productImage}
                  alt={business.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {business.name}
                </h3>
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
                <button
                  onClick={() => navigate(`/business/${business.id}`)}
                  className="text-sm font-medium text-gray-900 hover:text-green-700 transition-colors bg-transparent border-none p-0 cursor-pointer"
                >
                  View Profile →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {displayCount < businessesWithImages.length && (
          <div className="text-center mb-16">
            <button
              onClick={() => setDisplayCount(displayCount + 6)}
              className="text-gray-900 font-semibold hover:text-green-700 transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-700 text-white font-bold">
                  M
                </div>
                <h3 className="font-bold text-gray-900">MarketScope</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">Connecting Jos ...</p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  f
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  𝕏
                </a>
                <a href="#" className="text-gray-700 hover:text-gray-900">
                  in
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/" className="text-gray-600 hover:text-gray-900">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Explore Businesses
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Host Your Business
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-900">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-900 mb-4">Contact Info</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-gray-600">
                  <MapPin size={16} />
                  Jos, Plateau State, Nigeria
                </li>
                <li className="text-gray-600">📧 support@marketscope.ng</li>
                <li className="text-gray-600">📞 +234 812 345 6789</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 pt-8 text-center text-sm text-gray-600">
            <p>
              © 2025 Market Scope. All rights reserved. | Designed in Jos 🇳🇬
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
