import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/layout/Header";
import Home from "@/pages/Home";
import DecorationDetail from "@/pages/DecorationDetail";
import Wishlist from "@/pages/Wishlist";
import Dashboard from "@/pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AdminLayout } from "@/components/admin/AdminLayout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminDecorations from "@/pages/admin/AdminDecorations";
import AdminBookings from "@/pages/admin/AdminBookings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <div>
                <Header />
                <main><Home /></main>
              </div>
            } />
            <Route path="/decoration/:id" element={
              <div>
                <Header />
                <main><DecorationDetail /></main>
              </div>
            } />
            <Route path="/wishlist" element={
              <div>
                <Header />
                <main><Wishlist /></main>
              </div>
            } />
            <Route path="/dashboard" element={
              <div>
                <Header />
                <main><Dashboard /></main>
              </div>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="decorations" element={<AdminDecorations />} />
              <Route path="bookings" element={<AdminBookings />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;