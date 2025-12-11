import { AppLayout } from "@/components/layout/AppLayout";
import { useState, useEffect } from "react";
import {
  User,
  LogOut,
  Settings,
  Heart,
  Plus,
  Edit2,
  Upload,
  Star,
  Mail,
  Phone,
  Lock,
  Bell,
  Camera,
  Trash2,
  Check,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { businessService, BusinessListing } from "@/services/businessService";

export default function ProfilePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"account" | "business">(
    "business",
  );
  const [business, setBusiness] = useState<BusinessListing | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<BusinessListing>>({});
  const [products, setProducts] = useState<
    Array<{ id: string; name: string; image: string }>
  >([]);
  const [productForm, setProductForm] = useState({ name: "", image: "" });
  const [showProductForm, setShowProductForm] = useState(false);

  // Account Settings State
  const [profileInfo, setProfileInfo] = useState({
    name: localStorage.getItem("marketscope_business_name") || "",
    photo: null as string | null,
  });
  const [accountSettings, setAccountSettings] = useState({
    email: localStorage.getItem("marketscope_email") || "",
    phone: localStorage.getItem("marketscope_phone") || "",
  });
  const [passwordSettings, setPasswordSettings] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotions: false,
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

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
      setProducts(
        savedBusiness.productImages?.map((img, idx) => ({
          id: `${idx}`,
          name: `Product ${idx + 1}`,
          image: img,
        })) || [],
      );
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
    const updated = {
      ...formData,
      productImages: products.map((p) => p.image),
    };
    const saved = businessService.saveBusinessListing(updated);
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

  const addProduct = () => {
    if (productForm.name.trim()) {
      setProducts([
        ...products,
        {
          id: `${Date.now()}`,
          name: productForm.name,
          image:
            productForm.image ||
            "https://images.pexels.com/photos/2781540/pexels-photo-2781540.jpeg",
        },
      ]);
      setProductForm({ name: "", image: "" });
      setShowProductForm(false);
    }
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Account Settings Handlers
  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileInfo({
          ...profileInfo,
          photo: event.target?.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    localStorage.setItem("marketscope_business_name", profileInfo.name);
    alert("Profile updated successfully!");
    setEditingProfile(false);
  };

  const handleSaveAccountSettings = () => {
    localStorage.setItem("marketscope_email", accountSettings.email);
    localStorage.setItem("marketscope_phone", accountSettings.phone);
    alert("Email and phone updated successfully!");
  };

  const handleChangePassword = () => {
    if (
      !passwordSettings.currentPassword ||
      !passwordSettings.newPassword ||
      !passwordSettings.confirmPassword
    ) {
      alert("Please fill in all password fields");
      return;
    }
    if (passwordSettings.newPassword !== passwordSettings.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    // In a real app, you would validate the current password and update on the backend
    alert("Password changed successfully!");
    setPasswordSettings({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordForm(false);
  };

  const handleSaveNotifications = () => {
    alert("Notification preferences updated!");
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (confirmed) {
      localStorage.removeItem("marketscope_token");
      localStorage.removeItem("marketscope_email");
      localStorage.removeItem("marketscope_role");
      localStorage.removeItem("marketscope_business_name");
      localStorage.removeItem("marketscope_phone");
      navigate("/signin");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("marketscope_token");
    localStorage.removeItem("marketscope_email");
    localStorage.removeItem("marketscope_role");
    navigate("/signin");
  };

  return (
    <AppLayout headerTitle="Profile">
      <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          {[
            { id: "business", label: "Business Profile" },
            { id: "account", label: "Account Settings" },
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

        {/* Business Profile Tab */}
        {activeTab === "business" && (
          <div className="space-y-8">
            {isEditing ? (
              <div className="bg-white rounded-xl border border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">
                  Edit Business Profile
                </h3>
                <form className="space-y-6">
                  {/* Basic Info */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      Basic Information
                    </h4>
                    <div className="space-y-4">
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
                            placeholder="e.g., Lagos, Abuja"
                            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Address
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
                          Description
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
                    </div>
                  </div>

                  {/* Cover Image */}
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-4">
                      Cover Image
                    </h4>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      {formData.image ? (
                        <div className="mb-4">
                          <img
                            src={formData.image as string}
                            alt="Cover"
                            className="max-h-48 mx-auto rounded-lg"
                          />
                        </div>
                      ) : null}
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

                  {/* Save Button */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleSaveBusiness}
                      className="flex-1 bg-gradient-to-r from-green-700 to-green-600 text-white font-semibold py-3 rounded-lg hover:from-green-800 hover:to-green-700 transition-all"
                    >
                      Save Profile
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
              </div>
            ) : business ? (
              <div className="space-y-8">
                {/* Profile Summary */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <div className="flex items-start justify-between mb-6">
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

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
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

                  {business.image && (
                    <div className="mb-6">
                      <p className="text-sm text-muted-foreground mb-2">
                        Cover Image
                      </p>
                      <img
                        src={business.image}
                        alt={business.name}
                        className="rounded-lg max-h-64 w-full object-cover"
                      />
                    </div>
                  )}

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Description
                    </p>
                    <p className="text-foreground">{business.description}</p>
                  </div>
                </div>

                {/* Products & Services Gallery */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-foreground">
                      Products & Services
                    </h3>
                    <button
                      onClick={() => setShowProductForm(!showProductForm)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-700 to-green-600 text-white rounded-lg hover:from-green-800 hover:to-green-700 transition-all"
                    >
                      <Plus size={18} />
                      Add Product
                    </button>
                  </div>

                  {showProductForm && (
                    <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Product Name
                          </label>
                          <input
                            type="text"
                            value={productForm.name}
                            onChange={(e) =>
                              setProductForm({
                                ...productForm,
                                name: e.target.value,
                              })
                            }
                            placeholder="e.g., Premium Fabric Roll, Wedding Catering"
                            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                          />
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={addProduct}
                            className="flex-1 bg-gradient-to-r from-green-700 to-green-600 text-white font-semibold py-2 rounded-lg hover:from-green-800 hover:to-green-700 transition-all"
                          >
                            Add
                          </button>
                          <button
                            onClick={() => setShowProductForm(false)}
                            className="flex-1 border border-border text-foreground font-semibold py-2 rounded-lg hover:bg-muted transition-all"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {products.length > 0 ? (
                    <div className="grid md:grid-cols-3 gap-4">
                      {products.map((product) => (
                        <div
                          key={product.id}
                          className="relative rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow group"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <button
                              onClick={() => removeProduct(product.id)}
                              className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="p-3 bg-white">
                            <p className="font-semibold text-foreground text-sm">
                              {product.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-border">
                      <p className="text-muted-foreground">
                        No products added yet
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  No business profile yet
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-green-700 to-green-600 text-white font-semibold px-6 py-2 rounded-lg hover:from-green-800 hover:to-green-700 transition-all"
                >
                  Create Profile
                </button>
              </div>
            )}
          </div>
        )}

        {/* Account Settings Tab */}
        {activeTab === "account" && (
          <div className="max-w-3xl space-y-6">
            {/* Profile Information Section */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  Profile Information
                </h3>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="text-green-700 hover:text-green-800 font-semibold text-sm"
                >
                  {editingProfile ? "Cancel" : "Edit"}
                </button>
              </div>

              {editingProfile ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Profile Photo
                    </label>
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                        {profileInfo.photo ? (
                          <img
                            src={profileInfo.photo}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="text-green-700" size={40} />
                        )}
                      </div>
                      <label className="px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100 transition-colors font-medium">
                        <Camera size={18} className="inline mr-2" />
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleProfilePhotoChange}
                        />
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileInfo.name}
                      onChange={(e) =>
                        setProfileInfo({
                          ...profileInfo,
                          name: e.target.value,
                        })
                      }
                      placeholder="Your full name"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition-colors"
                  >
                    Save Profile
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center overflow-hidden">
                    {profileInfo.photo ? (
                      <img
                        src={profileInfo.photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="text-green-700" size={40} />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="text-lg font-semibold text-foreground">
                      {profileInfo.name || "Not set"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Email & Phone Section */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Email & Phone
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <Mail size={16} className="inline mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={accountSettings.email}
                    onChange={(e) =>
                      setAccountSettings({
                        ...accountSettings,
                        email: e.target.value,
                      })
                    }
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    <Phone size={16} className="inline mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={accountSettings.phone}
                    onChange={(e) =>
                      setAccountSettings({
                        ...accountSettings,
                        phone: e.target.value,
                      })
                    }
                    placeholder="+234 800 000 0000"
                    className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <button
                  onClick={handleSaveAccountSettings}
                  className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Password & Security Section */}
            <div className="bg-white rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  Password & Security
                </h3>
                <button
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                  className="text-green-700 hover:text-green-800 font-semibold text-sm"
                >
                  {showPasswordForm ? "Cancel" : "Change Password"}
                </button>
              </div>

              {showPasswordForm ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      value={passwordSettings.currentPassword}
                      onChange={(e) =>
                        setPasswordSettings({
                          ...passwordSettings,
                          currentPassword: e.target.value,
                        })
                      }
                      placeholder="Enter current password"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordSettings.newPassword}
                      onChange={(e) =>
                        setPasswordSettings({
                          ...passwordSettings,
                          newPassword: e.target.value,
                        })
                      }
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      value={passwordSettings.confirmPassword}
                      onChange={(e) =>
                        setPasswordSettings({
                          ...passwordSettings,
                          confirmPassword: e.target.value,
                        })
                      }
                      placeholder="Confirm new password"
                      className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                  </div>

                  <button
                    onClick={handleChangePassword}
                    className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition-colors"
                  >
                    Update Password
                  </button>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Keep your account secure by using a strong password. Change
                  your password regularly.
                </p>
              )}
            </div>

            {/* Notification Preferences Section */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h3 className="text-xl font-bold text-foreground mb-6">
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">
                      Email Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications:
                          !notificationSettings.emailNotifications,
                      })
                    }
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      notificationSettings.emailNotifications
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {notificationSettings.emailNotifications ? "On" : "Off"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">
                      SMS Notifications
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via SMS
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotificationSettings({
                        ...notificationSettings,
                        smsNotifications:
                          !notificationSettings.smsNotifications,
                      })
                    }
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      notificationSettings.smsNotifications
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {notificationSettings.smsNotifications ? "On" : "Off"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">
                      Order Updates
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Get notified about orders
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotificationSettings({
                        ...notificationSettings,
                        orderUpdates: !notificationSettings.orderUpdates,
                      })
                    }
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      notificationSettings.orderUpdates
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {notificationSettings.orderUpdates ? "On" : "Off"}
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-foreground">
                      Promotional Offers
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Receive promotional emails
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setNotificationSettings({
                        ...notificationSettings,
                        promotions: !notificationSettings.promotions,
                      })
                    }
                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                      notificationSettings.promotions
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {notificationSettings.promotions ? "On" : "Off"}
                  </button>
                </div>

                <button
                  onClick={handleSaveNotifications}
                  className="w-full bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition-colors mt-4"
                >
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Danger Zone - Delete Account */}
            <div className="bg-red-50 rounded-xl border border-red-200 p-6">
              <h3 className="text-xl font-bold text-red-700 mb-4">
                Danger Zone
              </h3>
              <p className="text-red-600 mb-6">
                Deleting your account is permanent and cannot be undone. All
                your data will be removed.
              </p>
              <button
                onClick={handleDeleteAccount}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                <Trash2 size={20} />
                Delete Account
              </button>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
            >
              <LogOut size={20} />
              Log Out
            </button>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
