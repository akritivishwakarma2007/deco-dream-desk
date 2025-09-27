import { Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

export function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        {/* Admin Header */}
        <header className="fixed top-0 left-0 right-0 h-16 bg-background border-b z-50 flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <h1 className="text-xl font-bold text-primary">Decoration Admin</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <User className="h-4 w-4" />
              <span>Admin User</span>
            </div>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </header>

        <div className="flex w-full pt-16">
          <AdminSidebar />
          <main className="flex-1 p-6 bg-muted/30">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}