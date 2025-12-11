import { useNavigate } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Linkedin,
  Twitter,
  Instagram,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "@/components/Logo";

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for reaching out! We'll get back to you soon.");
    setFormData({ fullName: "", email: "", message: "" });
  };

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
            <a
              href="/"
              className="text-gray-700 font-medium hover:text-gray-900"
            >
              Home
            </a>
            <a
              href="/about"
              className="text-gray-700 font-medium hover:text-gray-900"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-700 font-medium hover:text-gray-900"
            >
              Contact
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/home")}
              className="hidden md:inline-block px-6 py-2 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
            >
              Dashboard
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
              We'd Love to Hear From You
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Have questions, feedback, or partnership inquiries? Get in touch
              with the Market Scope team– we're here to help you grow your
              business.
            </p>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
            <MessageCircle size={80} className="text-gray-300" />
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200">
            <Globe className="text-green-700 mb-4" size={40} />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Follow Us</h3>
            <div className="flex gap-6">
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center hover:bg-green-200 transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200">
            <Mail size={32} className="text-green-700 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Email Us</h3>
            <p className="text-gray-700 font-semibold mb-2">
              support@marketscope.ng
            </p>
            <p className="text-gray-600">We usually reply within 24 hours.</p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200">
            <Phone size={32} className="text-green-700 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Call Us</h3>
            <p className="text-gray-700 font-semibold mb-2">
              +234 812 345 6789
            </p>
            <p className="text-gray-600">Mon-Fri, 9AM-5PM (WAT)</p>
          </div>

          <div className="p-8 rounded-2xl bg-gray-50 border border-gray-200">
            <MapPin size={32} className="text-green-700 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Visit Us</h3>
            <p className="text-gray-700 font-semibold mb-2">
              Jos, Plateau State, Nigeria
            </p>
            <p className="text-gray-600">
              Open for appointments and community events.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Send us a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Your full name"
                required
                className="w-full px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your.email@example.com"
                required
                className="w-full px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us how we can help..."
                rows={6}
                required
                className="w-full px-6 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-lg transition-colors text-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">
            Ready to grow your business
            <span className="text-green-700"> visibility?</span>
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Join thousands of Nigerian businesses on MarketScope
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="bg-green-700 hover:bg-green-800 text-white font-semibold px-8 py-4 rounded-lg transition-colors"
            >
              Host Your Business
            </button>
            <button
              onClick={() => navigate("/home")}
              className="px-8 py-4 border-2 border-green-700 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors"
            >
              Explore Businesses
            </button>
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
                  <a
                    href="/"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-4">About</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/about"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Contact Us
                  </a>
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
              <h4 className="font-bold text-white mb-4">Follow Us</h4>
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
            <p>© 2025 Market Scope. All rights reserved | Designed in Jos 🇳🇬</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
