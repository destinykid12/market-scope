export interface BusinessListing {
  id: string;
  name: string;
  category: string;
  location: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  image: string;
  productImages: string[];
  rating: number;
  reviews: number;
  verified: boolean;
  owner: string;
  ownerId: string;
  createdAt: string;
  views: number;
  inquiries: number;
  followers: number;
}

const BUSINESS_STORAGE_KEY = "marketscope_business_listing";

export const businessService = {
  // Get current user's business listing
  getBusinessListing: (): BusinessListing | null => {
    const stored = localStorage.getItem(BUSINESS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  // Save or update business listing
  saveBusinessListing: (
    business: Partial<BusinessListing>,
  ): BusinessListing => {
    const existing = businessService.getBusinessListing();
    const id = existing?.id || `business_${Date.now()}`;
    const createdAt = existing?.createdAt || new Date().toISOString();

    const updated: BusinessListing = {
      id,
      name: business.name || "",
      category: business.category || "",
      location: business.location || "",
      description: business.description || "",
      phone: business.phone || "",
      email: business.email || "",
      address: business.address || "",
      image: business.image || "",
      productImages: business.productImages || [],
      rating: business.rating || 0,
      reviews: business.reviews || 0,
      verified: business.verified || false,
      owner: business.owner || "",
      ownerId: business.ownerId || "current_user",
      createdAt,
      views: existing?.views || 0,
      inquiries: existing?.inquiries || 0,
      followers: existing?.followers || 0,
    };

    localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },

  // Update business stats
  updateBusinessStats: (stats: {
    views?: number;
    inquiries?: number;
    followers?: number;
  }): void => {
    const business = businessService.getBusinessListing();
    if (business) {
      const updated = {
        ...business,
        views: stats.views !== undefined ? stats.views : business.views,
        inquiries:
          stats.inquiries !== undefined ? stats.inquiries : business.inquiries,
        followers:
          stats.followers !== undefined ? stats.followers : business.followers,
      };
      localStorage.setItem(BUSINESS_STORAGE_KEY, JSON.stringify(updated));
    }
  },

  // Delete business listing
  deleteBusinessListing: (): void => {
    localStorage.removeItem(BUSINESS_STORAGE_KEY);
  },

  // Get all businesses (from local storage + mock data)
  getAllBusinesses: (): BusinessListing[] => {
    const userBusiness = businessService.getBusinessListing();
    return userBusiness ? [userBusiness] : [];
  },
};
