import { ReactNode } from "react";
import { SidebarMenu } from "./SidebarMenu";
import { MobileTabs } from "./MobileTabs";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  headerTitle?: string;
  showSearch?: boolean;
}

export const AppLayout = ({
  children,
  headerTitle,
  showSearch = false,
}: AppLayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <SidebarMenu />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <Header title={headerTitle} showSearch={showSearch} />

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto pb-20 lg:pb-0">{children}</main>

        {/* Mobile Bottom Tabs */}
        <MobileTabs />
      </div>
    </div>
  );
};
