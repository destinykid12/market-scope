import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  TrendingUp,
  Lightbulb,
  Users,
  Shield,
  Target,
  Rocket,
  Globe,
  Users2,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Logo } from "@/components/Logo";

export default function About() {
  const navigate = useNavigate();

  const values = [
    {
      icon: <Shield size={32} />,
      title: "Trust",
      description: "Building reliable connections between SMEs and customers",
    },
    {
      icon: <Users size={32} />,
      title: "Empowerment",
      description: "Helping local businesses reach their full potentials.",
    },
    {
      icon: <Lightbulb size={32} />,
      title: "Innovation",
      description: "Using smart technology to make discovery simple.",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Community",
      description: "Supporting Jos' entrepreneurial ecosystem.",
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

      {/* Mission & Vision Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <Target className="text-green-700 mb-4" size={40} />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 text-lg">
              "To give SMEs in Jos and across Nigeria the digital visibility
              they need to reach more customers and grow sustainably."
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
            <Rocket className="text-green-700 mb-4" size={40} />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700 text-lg">
              "To become Nigeria's most trusted platform for connecting local
              businesses to the global world."
            </p>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-4">
          Our Values
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto text-lg">
          These core principles guide everything we do at MarketScope
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl bg-gray-50 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="text-green-700 mb-4">{value.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 text-lg">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Our Story</h2>
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                In 2024, our founder realized a critical gap in the Nigerian
                digital economy. While multinational platforms dominated the
                space, small and medium-sized enterprises in Jos and across
                Nigeria struggled to find customers beyond their immediate
                neighborhoods.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                MarketScope was born from a simple belief: every local
                business—from the neighborhood tailor to the community baker—
                deserves a digital presence. We built a platform that breaks
                down geographic barriers and provides equal opportunities for
                all entrepreneurs to thrive.
              </p>
            </div>
            <img
              src="https://images.pexels.com/photos/19537356/pexels-photo-19537356.jpeg"
              alt="Business entrepreneur"
              className="rounded-2xl h-96 w-full object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join the MarketScope Community
          </h2>
          <p className="text-white text-opacity-90 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a customer looking for quality local products or a
            business ready to grow, we're here to help you succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/signup")}
              className="bg-white text-green-700 font-semibold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Start Your Business Journey
            </button>
            <button
              onClick={() => navigate("/contact")}
              className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors"
            >
              Get in Touch
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
