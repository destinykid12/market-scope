import { Link } from "react-router-dom";
import { Bell, Menu } from "lucide-react";

interface HeaderProps {
  title?: string;
  showSearch?: boolean;
}

export const Header = ({ title, showSearch = false }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border">
      <div className="flex items-center justify-between px-4 py-3 lg:px-6 lg:py-4">
        {/* Logo on mobile, title on desktop */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white font-bold text-lg hover:bg-primary-600 transition-colors"
          >
            M
          </Link>
          {title && (
            <h1 className="hidden lg:block text-xl font-bold text-foreground">
              {title}
            </h1>
          )}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {showSearch && (
            <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground hover:bg-secondary hover:opacity-70 transition-opacity">
              <span className="text-sm">Search...</span>
            </button>
          )}
          <button className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
            <Bell size={20} className="text-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full"></span>
          </button>
          <button className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
            <Menu size={20} className="text-foreground" />
          </button>
        </div>
      </div>
    </header>
  );
};
