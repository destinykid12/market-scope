import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, MapPin, Filter } from "lucide-react";
import { businessService } from "@shared/services";

export default function ExploreBusiness() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [businesses, setBusinesses] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const { data: cats } = await businessService.getCategories();
        const { data: locs } = await businessService.getLocations();
        const { data: biz } = await businessService.getBusinesses();

        setCategories(["All", ...cats.map((c) => c.name)]);
        setLocations(["All", ...locs]);
        setBusinesses(biz);
      } catch (err) {
        console.error("Failed to load data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filteredBusinesses = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch =
        !searchQuery ||
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (business.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || business.category === selectedCategory;

      const matchesLocation =
        selectedLocation === "All" || business.location === selectedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [searchQuery, selectedCategory, selectedLocation, businesses]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => navigate("/")}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-700 text-white font-bold text-lg">
                M
              </div>
              <h1 className="text-xl font-bold text-green-900">MarketScope</h1>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="/"
                className="text-gray-700 font-medium hover:text-green-700 transition-colors"
              >
                Home
              </a>
              <a href="/explore" className="text-green-700 font-medium">
                Explore
              </a>
              <a
                href="/about"
                className="text-gray-700 font-medium hover:text-green-700 transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="text-gray-700 font-medium hover:text-green-700 transition-colors"
              >
                Contact
              </a>
            </nav>
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
            >
              Host Your Business
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-2">
            Explore Businesses
          </h1>
          <p className="text-gray-600 mb-6">
            Discover authentic Nigerian businesses and entrepreneurs
          </p>
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600"
              size={20}
            />
            <input
              type="text"
              placeholder="Search for businesses, products or services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-colors"
            />
          </div>
        </div>

        {/* Filters */}
        {!isLoading && (
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6 flex-wrap">
              {/* Categories */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-gray-700">
                  Categories:
                </span>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? "bg-green-700 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm font-semibold text-gray-700">
                  Location:
                </span>
                <div className="flex flex-wrap gap-2">
                  {locations.map((location) => (
                    <button
                      key={location}
                      onClick={() => setSelectedLocation(location)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        selectedLocation === location
                          ? "bg-gray-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            {filteredBusinesses.length} businesses found
          </p>
        </div>

        {/* Business Grid */}
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading businesses...</p>
          </div>
        ) : filteredBusinesses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((business) => (
              <div
                key={business.id}
                className="bg-white rounded-xl border border-green-200 overflow-hidden hover:shadow-xl hover:border-green-400 transition-all cursor-pointer group"
              >
                {/* Business Image */}
                <div className="w-full h-48 overflow-hidden bg-gray-100">
                  <img
                    src={
                      business.image_url ||
                      "https://via.placeholder.com/300x200"
                    }
                    alt={business.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Business Info */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-1">
                    {business.name}
                  </h3>
                  <p className="text-sm text-green-700 font-medium mb-3">
                    {business.category}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                    "{business.description}"
                  </p>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={
                            i < Math.floor(business.rating)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-sm font-semibold text-gray-900">
                      {business.rating}
                    </span>
                    <span className="text-sm text-gray-600">
                      ({business.reviews_count} reviews)
                    </span>
                  </div>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                    <MapPin size={16} />
                    <span>{business.location}</span>
                  </div>

                  {/* View Profile Button */}
                  <button
                    onClick={() => navigate(`/business/${business.id}`)}
                    className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    View Profile →
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No businesses found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedLocation("All");
              }}
              className="text-green-700 hover:text-green-800 font-semibold"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
