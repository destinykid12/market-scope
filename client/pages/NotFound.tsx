import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <AppLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center px-4">
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <p className="text-2xl font-semibold text-foreground mb-2">
            Page Not Found
          </p>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-accent hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            <Home size={20} />
            Return to Home
          </Link>
        </div>
      </div>
    </AppLayout>
  );
};

export default NotFound;
