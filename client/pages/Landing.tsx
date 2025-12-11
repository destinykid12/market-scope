import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Star,
  MapPin,
  CheckCircle,
  Shirt,
  UtensilsCrossed,
  Sparkles,
  Home,
  Briefcase,
  BookOpen,
  Wrench,
  Heart,
  Scissors,
  Car,
  Building2,
} from "lucide-react";
import { Logo } from "@/components/Logo";

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  shirt: Shirt,
  utensils: UtensilsCrossed,
  sparkles: Sparkles,
  home: Home,
  briefcase: Briefcase,
  bookOpen: BookOpen,
  wrench: Wrench,
  heart: Heart,
  scissors: Scissors,
  car: Car,
  building: Building2,
};

export default function Landing() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("marketscope_token");

  const testimonials = [
    {
      name: "Zainab Okonkwo",
      business: "Zainab's Fabrics",
      quote: "MarketScope helped me reach 10x more customers in just 3 months!",
      location: "Lagos",
      image:
        "https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg",
    },
    {
      name: "Chisom Nwosu",
      business: "Golden Spice Kitchen",
      quote: "Finally, a platform made for Nigerian businesses like mine.",
      location: "Abuja",
      image:
        "https://images.pexels.com/photos/19537356/pexels-photo-19537356.jpeg",
    },
    {
      name: "Amara Hassan",
      business: "Beauty by Ade",
      quote: "The OTP login is so simple. My grandmother can use it!",
      location: "Ibadan",
      image:
        "https://images.pexels.com/photos/19537356/pexels-photo-19537356.jpeg",
    },
  ];

  const goodsCategories = [
    {
      label: "Cloth & Fashion",
      image:
        "https://images.pexels.com/photos/3624350/pexels-photo-3624350.jpeg",
    },
    {
      label: "Food & Drinks",
      image:
        "https://images.pexels.com/photos/2097090/pexels-photo-2097090.jpeg",
    },
    {
      label: "Beauty & Cosmetics",
      image:
        "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
    },
    {
      label: "Home & Furniture",
      image:
        "https://images.pexels.com/photos/2457842/pexels-photo-2457842.jpeg",
    },
    {
      label: "Business & Services",
      image:
        "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg",
    },
    {
      label: "Education & Learning",
      image:
        "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg",
    },
  ];

  const servicesCategories = [
    { iconKey: "wrench", label: "Repair & Service" },
    { iconKey: "heart", label: "Health & Wellness" },
    { iconKey: "scissors", label: "Salon & Spa" },
    { iconKey: "car", label: "Auto Services" },
    { iconKey: "building", label: "Real Estate" },
    { iconKey: "briefcase", label: "Business Services" },
  ];

  const businesses = [
    {
      logo: "LOGO",
      name: "Stylish Fashion Kitchens",
      description: "Premium kitchens and more",
      location: "Jos",
      image:
        "https://images.pexels.com/photos/7621009/pexels-photo-7621009.jpeg",
    },
    {
      logo: "LOGO",
      name: "Delish Food & Restaurant",
      description: "Best local and continental dishes",
      location: "Jos",
      image:
        "https://images.pexels.com/photos/2781540/pexels-photo-2781540.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Logo size={40} />
            <h1 className="text-xl font-bold text-gray-900">MarketScope</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => navigate("/")}
              className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate("/about")}
              className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              About
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="text-gray-700 font-medium hover:text-gray-900 transition-colors"
            >
              Contact
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(isAuthenticated ? "/home" : "/signup")}
              className="hidden md:inline-block px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
            >
              {isAuthenticated ? "Dashboard" : "Register Your Business"}
            </button>
            <div className="md:hidden">
              <button
                onClick={() => navigate("/signin")}
                className="px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover and Connect with Local Businesses
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Access trusted local businesses selling quality products and
              services. From fashion to food, find everything you need from
              artisans and entrepreneurs right here in Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/explore")}
                className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Explore Businesses
                <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-8 py-4 border-2 border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors"
              >
                Register Your Business
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.pexels.com/photos/13727138/pexels-photo-13727138.jpeg"
              alt="Nigerian market vendor"
              className="rounded-2xl h-48 object-cover hover:shadow-lg transition-shadow"
            />
            <img
              src="https://images.pexels.com/photos/2781540/pexels-photo-2781540.jpeg"
              alt="Food and cuisine"
              className="rounded-2xl h-48 object-cover hover:shadow-lg transition-shadow"
            />
            <img
              src="https://images.pexels.com/photos/7621009/pexels-photo-7621009.jpeg"
              alt="Fashion and shopping"
              className="rounded-2xl h-48 object-cover hover:shadow-lg transition-shadow"
            />
            <img
              src="https://images.pexels.com/photos/10493094/pexels-photo-10493094.jpeg"
              alt="Retail shopping"
              className="rounded-2xl h-48 object-cover hover:shadow-lg transition-shadow"
            />
          </div>
        </div>
      </section>

      {/* How Market Scope Works */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
          How Market Scope Works
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
          Simple steps to help you discover amazing businesses or get your
          business discovered
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 text-white">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-20 mb-4 text-2xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-3">Account Setup</h3>
            <p className="text-white text-opacity-90">
              Create your account with just your phone number using quick OTP
              verification
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 text-white">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-20 mb-4 text-2xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-3">Choose your Role</h3>
            <p className="text-white text-opacity-90">
              Are you a customer looking for products or a business wanting to
              sell?
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 text-white">
            <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white bg-opacity-20 mb-4 text-2xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-3">Start your Journey</h3>
            <p className="text-white text-opacity-90">
              Explore businesses or list your products and services to reach
              more customers
            </p>
          </div>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">
          Explore by Category
        </h2>
        <p className="text-gray-600 mb-12 text-lg">
          Browse through our diverse range of categories
        </p>

        {/* Goods Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Goods</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {goodsCategories.map((category, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl h-48 cursor-pointer group"
              >
                <img
                  src={category.image}
                  alt={category.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end">
                  <div className="p-6 w-full">
                    <h4 className="text-lg font-semibold text-white">
                      {category.label}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {servicesCategories.map((service, index) => {
              const IconComponent = iconMap[service.iconKey];
              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl bg-gradient-to-br from-green-600 to-green-700 text-white cursor-pointer hover:shadow-lg transition-shadow"
                >
                  {IconComponent && (
                    <IconComponent size={40} className="mb-4" />
                  )}
                  <h4 className="text-lg font-semibold">{service.label}</h4>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Businesses People Love */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
          Businesses People Love in Jos
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {businesses.map((business, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-2xl h-64"
            >
              <img
                src={business.image}
                alt={business.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent flex flex-col justify-end p-8 text-white">
                <div className="mb-4 inline-block px-4 py-2 bg-white bg-opacity-20 rounded-lg font-bold text-lg w-fit">
                  {business.logo}
                </div>
                <h3 className="text-2xl font-bold mb-2">{business.name}</h3>
                <p className="text-white text-opacity-90 mb-4">
                  {business.description}
                </p>
                <div className="flex items-center gap-2 text-white text-opacity-90">
                  <MapPin size={18} />
                  {business.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Host Your Business */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Host Your Business and Reach More Customers in Jos.
              </h2>
              <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                Turn your passion into profit. List your business on MarketScope
                and connect with thousands of customers looking for exactly what
                you offer.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate("/home")}
                  className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  Go to Dashboard
                  <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 border-2 border-green-700 text-green-700 font-semibold rounded-lg hover:bg-white transition-colors">
                  Learn More
                </button>
              </div>
            </div>
            <img
              src="https://images.pexels.com/photos/19537356/pexels-photo-19537356.jpeg"
              alt="Business entrepreneur"
              className="rounded-2xl h-80 w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* About Market Scope */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 mb-12">
          About Market Scope
        </h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Market Scope is a digital platform built to empower Nigerian
              artisans, entrepreneurs, and service providers by connecting them
              with customers nationwide.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              We believe that every great business — from the local tailor to
              the neighborhood baker — deserves a spotlight. Our platform breaks
              down geographic barriers and provides equal opportunities for all.
            </p>
          </div>
          <div className="bg-gray-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Our Mission
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <CheckCircle
                  className="text-green-700 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-600">
                  Empower local businesses to reach a wider audience
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle
                  className="text-green-700 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-600">
                  Make shopping local convenient and accessible to all
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle
                  className="text-green-700 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-600">
                  Create economic opportunities across Nigeria
                </span>
              </li>
              <li className="flex gap-3">
                <CheckCircle
                  className="text-green-700 flex-shrink-0"
                  size={20}
                />
                <span className="text-gray-600">
                  Build a community of trust and quality
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What People Are Saying */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
            What People Are Saying
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
            Hear from real business owners and customers who are thriving on
            MarketScope
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.business}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic text-lg">
                  "{testimonial.quote}"
                </p>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin size={14} />
                  {testimonial.location}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Logo size={40} />
                <h3 className="font-bold text-white">MarketScope</h3>
              </div>
              <p className="text-sm text-gray-400">
                Connecting Nigerian businesses with customers nationwide.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/")}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/home")}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Explore
                  </button>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    How it Works
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => navigate("/about")}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    About us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("/contact")}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Contact us
                  </button>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">Follow us</h4>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  f
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  𝕏
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  in
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              © 2024 Market Scope. All rights reserved | Designed by NEXT | Tech
              by INIT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
