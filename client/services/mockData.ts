export interface Business {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviews: number;
  verified: boolean;
  description: string;
  image: string;
  owner: string;
  phone: string;
  email: string;
}

export interface Review {
  id: string;
  businessId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

// Mock Businesses
export const mockBusinesses: Business[] = [
  {
    id: "1",
    name: "Zainab's Premium Fabrics",
    category: "Fashion & Textiles",
    location: "Lagos",
    rating: 4.8,
    reviews: 124,
    verified: true,
    description:
      "High-quality fabrics and traditional wears. We offer custom tailoring services.",
    image: "https://images.pexels.com/photos/33079751/pexels-photo-33079751.jpeg",
    owner: "Zainab Okonkwo",
    phone: "+234 801 234 5678",
    email: "zainab@fabrics.ng",
  },
  {
    id: "2",
    name: "Golden Spice Kitchen",
    category: "Food & Catering",
    location: "Abuja",
    rating: 4.9,
    reviews: 256,
    verified: true,
    description:
      "Traditional Nigerian meals delivered fresh. Catering for events available.",
    image: "https://images.pexels.com/photos/5718062/pexels-photo-5718062.jpeg",
    owner: "Chisom Nwosu",
    phone: "+234 802 345 6789",
    email: "chisom@goldaspice.ng",
  },
  {
    id: "3",
    name: "Beauty by Ade",
    category: "Beauty & Cosmetics",
    location: "Ibadan",
    rating: 4.7,
    reviews: 89,
    verified: true,
    description:
      "Skincare products and beauty treatments. Natural ingredients only.",
    image: "https://images.pexels.com/photos/22364778/pexels-photo-22364778.jpeg",
    owner: "Ade Oluwaseun",
    phone: "+234 803 456 7890",
    email: "ade@beautybyade.ng",
  },
  {
    id: "4",
    name: "Tech Solutions NG",
    category: "Technology & Services",
    location: "Lagos",
    rating: 4.6,
    reviews: 45,
    verified: true,
    description: "Web development, mobile apps, and IT consultation services.",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg",
    owner: "Emeka Uche",
    phone: "+234 804 567 8901",
    email: "emeka@techsolutions.ng",
  },
  {
    id: "5",
    name: "Crafts & Art Studio",
    category: "Arts & Crafts",
    location: "Benin City",
    rating: 4.5,
    reviews: 67,
    verified: true,
    description: "Hand-made crafts, traditional art, and custom designs.",
    image: "https://images.pexels.com/photos/20208728/pexels-photo-20208728.jpeg",
    owner: "Ngozi Obi",
    phone: "+234 805 678 9012",
    email: "ngozi@craftsart.ng",
  },
  {
    id: "6",
    name: "Home Renovation Experts",
    category: "Construction & Renovation",
    location: "Enugu",
    rating: 4.4,
    reviews: 78,
    verified: true,
    description:
      "Professional home renovation and construction services. Quality guaranteed.",
    image: "https://images.pexels.com/photos/5691639/pexels-photo-5691639.jpeg",
    owner: "Chinedu Eze",
    phone: "+234 806 789 0123",
    email: "chinedu@homerenov.ng",
  },
  {
    id: "7",
    name: "Fashion Hub Lagos",
    category: "Fashion & Textiles",
    location: "Lagos",
    rating: 4.3,
    reviews: 156,
    verified: true,
    description:
      "Latest fashion trends, affordable prices, and quality assurance.",
    image: "https://images.pexels.com/photos/30020992/pexels-photo-30020992.jpeg",
    owner: "Bola Akinsanya",
    phone: "+234 807 890 1234",
    email: "bola@fashionhub.ng",
  },
  {
    id: "8",
    name: "Herbal Health Solutions",
    category: "Health & Wellness",
    location: "Oyo",
    rating: 4.6,
    reviews: 93,
    verified: true,
    description:
      "Natural herbal remedies and wellness products for better health.",
    image: "https://images.pexels.com/photos/606506/pexels-photo-606506.jpeg",
    owner: "Iya Folake",
    phone: "+234 808 901 2345",
    email: "iya@herbalsolutions.ng",
  },
  {
    id: "9",
    name: "Expert Plumbing Services",
    category: "Home Services",
    location: "Port Harcourt",
    rating: 4.7,
    reviews: 102,
    verified: true,
    description:
      "24/7 emergency plumbing services. Professional and affordable.",
    image: "https://images.pexels.com/photos/20518579/pexels-photo-20518579.jpeg",
    owner: "Ikechukwu Nwankwo",
    phone: "+234 809 012 3456",
    email: "ikechukwu@plumbing.ng",
  },
  {
    id: "10",
    name: "Photography Memories",
    category: "Photography & Events",
    location: "Lagos",
    rating: 4.8,
    reviews: 178,
    verified: true,
    description:
      "Professional photography for weddings, events, and portraits.",
    image: "https://images.pexels.com/photos/21782637/pexels-photo-21782637.jpeg",
    owner: "Tunde Adeyemi",
    phone: "+234 810 123 4567",
    email: "tunde@photomemories.ng",
  },
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: "1",
    businessId: "1",
    author: "Amara Hassan",
    rating: 5,
    comment: "Best fabrics in Lagos! The quality is excellent.",
    date: "2024-01-15",
  },
  {
    id: "2",
    businessId: "1",
    author: "Chidi Obi",
    rating: 4,
    comment: "Great service but a bit pricey.",
    date: "2024-01-10",
  },
  {
    id: "3",
    businessId: "2",
    author: "Blessing Adeyemi",
    rating: 5,
    comment: "The food was delicious! Catering was perfect for my event.",
    date: "2024-01-08",
  },
  {
    id: "4",
    businessId: "3",
    author: "Sola Adegoke",
    rating: 4,
    comment: "Beautiful products and great customer service.",
    date: "2024-01-05",
  },
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "user1",
    senderName: "You",
    recipientId: "1",
    content: "Hi, do you have any sizes available?",
    timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
    read: true,
  },
  {
    id: "2",
    senderId: "1",
    senderName: "Zainab's Premium Fabrics",
    recipientId: "user1",
    content: "Yes! We have all sizes available. What would you like?",
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    read: true,
  },
  {
    id: "3",
    senderId: "user1",
    senderName: "You",
    recipientId: "2",
    content: "Can you do custom catering for 100 people?",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    read: true,
  },
];

// Mock Conversations
export const mockConversations = [
  {
    id: "1",
    businessName: "Zainab's Premium Fabrics",
    lastMessage: "Yes! We have all sizes available. What would you like?",
    timestamp: new Date(Date.now() - 2 * 60000).toISOString(),
    unreadCount: 0,
    image: "https://images.pexels.com/photos/33079751/pexels-photo-33079751.jpeg",
  },
  {
    id: "2",
    businessName: "Golden Spice Kitchen",
    lastMessage: "Can you do custom catering for 100 people?",
    timestamp: new Date(Date.now() - 30 * 60000).toISOString(),
    unreadCount: 0,
    image: "https://images.pexels.com/photos/5718062/pexels-photo-5718062.jpeg",
  },
  {
    id: "3",
    businessName: "Beauty by Ade",
    lastMessage: "When can you deliver the skincare package?",
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    unreadCount: 1,
    image: "https://images.pexels.com/photos/22364778/pexels-photo-22364778.jpeg",
  },
];

// Categories
export const categories = [
  { id: "1", name: "Fashion & Textiles", icon: "👗", count: 234 },
  { id: "2", name: "Food & Catering", icon: "🍜", count: 567 },
  { id: "3", name: "Beauty & Cosmetics", icon: "💄", count: 189 },
  { id: "4", name: "Technology & Services", icon: "💻", count: 123 },
  { id: "5", name: "Arts & Crafts", icon: "🎨", count: 342 },
  { id: "6", name: "Home Services", icon: "🔧", count: 456 },
];

// Search function
export const searchBusinesses = (query: string): Business[] => {
  if (!query.trim()) return mockBusinesses;

  const lowerQuery = query.toLowerCase();

  return mockBusinesses.filter(
    (business) =>
      business.name.toLowerCase().includes(lowerQuery) ||
      business.category.toLowerCase().includes(lowerQuery) ||
      business.description.toLowerCase().includes(lowerQuery) ||
      business.location.toLowerCase().includes(lowerQuery),
  );
};

// Filter by category
export const filterByCategory = (categoryName: string): Business[] => {
  return mockBusinesses.filter((b) =>
    b.category.toLowerCase().includes(categoryName.toLowerCase()),
  );
};

// Filter by location
export const filterByLocation = (location: string): Business[] => {
  return mockBusinesses.filter((b) =>
    b.location.toLowerCase().includes(location.toLowerCase()),
  );
};

// Get business by ID
export const getBusinessById = (id: string): Business | undefined => {
  return mockBusinesses.find((b) => b.id === id);
};

// Get reviews for a business
export const getBusinessReviews = (businessId: string): Review[] => {
  return mockReviews.filter((r) => r.businessId === businessId);
};
