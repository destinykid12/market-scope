import { Link, useLocation } from "react-router-dom";
import { Home, Plus, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const MobileTabs = () => {
  const location = useLocation();

  const tabItems: TabItem[] = [
    { label: "Home", icon: <Home size={24} />, path: "/home" },
    { label: "Post", icon: <Plus size={24} />, path: "/post" },
    { label: "Messages", icon: <MessageSquare size={24} />, path: "/messages" },
    { label: "Profile", icon: <User size={24} />, path: "/profile" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="flex items-center justify-around">
        {tabItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full py-3 gap-1 transition-colors duration-200 text-xs font-medium",
                isActive
                  ? "text-primary bg-primary-50"
                  : "text-foreground hover:bg-secondary",
              )}
            >
              <div className="flex items-center justify-center">
                {item.icon}
              </div>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
