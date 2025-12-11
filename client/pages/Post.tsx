import { AppLayout } from "@/components/layout/AppLayout";
import { Plus, AlertCircle } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PostPage() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("marketscope_role");

  useEffect(() => {
    // Redirect customers to home if they try to access this
    if (userRole === "customer") {
      navigate("/");
    }
  }, [userRole, navigate]);

  return (
    <AppLayout headerTitle="Create Post">
      <div className="max-w-2xl mx-auto px-4 py-8 lg:py-12">
        {/* Info Box */}
        <div className="bg-primary-50 border border-primary-200 rounded-xl p-6 mb-8 flex gap-4">
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle className="text-primary" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">Coming Soon</h3>
            <p className="text-sm text-muted-foreground">
              The post creation feature is being prepared. This allows you to
              showcase your products and services to potential customers.
            </p>
          </div>
        </div>

        {/* Placeholder Card */}
        <div className="bg-white rounded-xl border-2 border-dashed border-border p-12 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary-50 mx-auto mb-4">
            <Plus className="text-primary" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Showcase Your Business
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Create engaging posts about your products and services to reach more
            customers and grow your business.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
