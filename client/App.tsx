import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Landing & Auth Pages
import Landing from "./pages/Landing";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Main Pages
import Index from "./pages/Index";
import BusinessDetail from "./pages/BusinessDetail";
import Post from "./pages/Post";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";

// Pages
import ExploreBusiness from "./pages/ExploreBusiness";

// Not Found
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page (Public) */}
          <Route path="/" element={<Landing />} />

          {/* Auth Routes */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          {/* Public Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/explore" element={<ExploreBusiness />} />

          {/* Main App Routes */}
          <Route path="/home" element={<Index />} />
          <Route path="/business/:id" element={<BusinessDetail />} />
          <Route path="/post" element={<Post />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />

          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
