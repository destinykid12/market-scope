import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  MessageCircle,
  Shield,
  Store,
} from "lucide-react";
import { getBusinessById, getBusinessReviews } from "@/services/mockData";

export default function BusinessDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const business = id ? getBusinessById(id) : null;
  const reviews = business ? getBusinessReviews(business.id) : [];

  if (!business) {
    return (
      <AppLayout>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate("/home")}
            className="flex items-center gap-2 text-primary hover:text-primary-600 font-semibold mb-4"
          >
            <ArrowLeft size={20} />
            Back to Dashboard
          </button>
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground">
              Business Not Found
            </h2>
            <p className="text-muted-foreground mt-2">
              The business you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-green-600">
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
            onClick={() => navigate("/explore")}
            className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
          >
            Back
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-8 lg:py-12">
        {/* Vendor Profile Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
          {/* Banner Image */}
          <div className="w-full h-64 bg-gradient-to-r from-green-700 to-green-900 flex items-center justify-center">
            <Store className="text-white opacity-20" size={80} />
          </div>

          {/* Profile Content */}
          <div className="px-8 py-8">
            {/* Vendor Header */}
            <div className="flex items-start justify-between gap-6 mb-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-4xl font-bold text-gray-900">
                    {business.name}
                  </h1>
                  {business.verified && (
                    <Shield className="text-green-700" size={28} />
                  )}
                </div>
                <p className="text-xl text-gray-600 mb-4">
                  {business.category}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={
                          i < Math.floor(business.rating)
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {business.rating}
                  </span>
                  <span className="text-gray-600">
                    ({business.reviews} reviews)
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 text-lg mb-6">
                  <MapPin size={20} />
                  <span>{business.location}</span>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-6">
                Contact Information
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                    <Phone size={20} className="text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold text-gray-900">
                      {business.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-green-100">
                    <Mail size={20} className="text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold text-gray-900">
                      {business.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {business.description}
              </p>
            </div>

            {/* Contact Business Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <a
                href={`tel:${business.phone}`}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                Call Now
              </a>
              <button
                onClick={() => navigate("/messages")}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={20} />
                Chat
              </button>
            </div>

            {/* Reviews Section */}
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Reviews ({business.reviews})
              </h3>

              {reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="pb-6 border-b border-gray-200 last:border-0"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="font-semibold text-gray-900 text-lg">
                            {review.author}
                          </p>
                          <p className="text-sm text-gray-600">{review.date}</p>
                        </div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={
                                i < review.rating
                                  ? "fill-yellow-500 text-yellow-500"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 mb-4">
                    No reviews yet. Be the first to review!
                  </p>
                  <button className="text-green-700 hover:text-green-800 font-semibold">
                    Write a Review
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
