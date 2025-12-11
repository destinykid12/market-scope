import { Link, useLocation } from "react-router-dom";
import { Home, Plus, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export const SidebarMenu = () => {
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { label: "Home", icon: <Home size={24} />, path: "/home" },
    { label: "Post", icon: <Plus size={24} />, path: "/post" },
    { label: "Messages", icon: <MessageSquare size={24} />, path: "/messages" },
    { label: "Profile", icon: <User size={24} />, path: "/profile" },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-20 border-r border-border bg-white sticky top-0 h-screen">
      <div className="flex-1 flex flex-col items-center gap-8 py-8">
        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary-600 transition-colors"
        >
          M
        </Link>

        {/* Menu Items */}
        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/" && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary text-white"
                    : "text-foreground hover:bg-primary-50",
                )}
                title={item.label}
              >
                {item.icon}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom user section */}
      <div className="flex flex-col items-center gap-4 pb-8">
        <Link
          to="/profile"
          className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-100 text-primary hover:bg-primary-200 transition-colors"
        >
          <User size={24} />
        </Link>
      </div>
    </aside>
  );
};
