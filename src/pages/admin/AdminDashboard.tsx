import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Package, 
  Calendar, 
  Users, 
  Heart,
  TrendingUp,
  AlertCircle
} from "lucide-react";

// Mock data for admin dashboard
const stats = {
  totalDecorations: 24,
  totalBookings: 156,
  totalUsers: 89,
  totalWishlists: 234,
  availableDecorations: 18,
  reservedDecorations: 4,
  fullDecorations: 2,
  pendingBookings: 12,
  confirmedBookings: 134,
  cancelledBookings: 10
};

const recentBookings = [
  {
    id: "1",
    user: "Sarah Johnson",
    decoration: "Elegant Wedding Arch",
    date: "2024-01-15",
    status: "pending"
  },
  {
    id: "2", 
    user: "Mike Chen",
    decoration: "Corporate Event Setup",
    date: "2024-01-20",
    status: "confirmed"
  },
  {
    id: "3",
    user: "Emma Davis",
    decoration: "Birthday Party Decor",
    date: "2024-01-18",
    status: "pending"
  }
];

const AdminDashboard = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="reserved">Pending</Badge>;
      case "confirmed":
        return <Badge variant="available">Confirmed</Badge>;
      case "cancelled":
        return <Badge variant="full">Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your decoration platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Decorations</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDecorations}</div>
            <p className="text-xs text-muted-foreground">
              {stats.availableDecorations} available, {stats.reservedDecorations} reserved
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">
              {stats.pendingBookings} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wishlist Items</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalWishlists}</div>
            <p className="text-xs text-muted-foreground">
              Across all users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recent Bookings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{booking.user}</p>
                    <p className="text-sm text-muted-foreground">{booking.decoration}</p>
                    <p className="text-xs text-muted-foreground">Date: {booking.date}</p>
                  </div>
                  {getStatusBadge(booking.status)}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div>
                  <p className="font-medium text-primary">Pending Approvals</p>
                  <p className="text-sm text-muted-foreground">12 bookings need review</p>
                </div>
                <Badge variant="reserved">{stats.pendingBookings}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Fully Booked Items</p>
                  <p className="text-sm text-muted-foreground">Items at capacity</p>
                </div>
                <Badge variant="full">{stats.fullDecorations}</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div>
                  <p className="font-medium">Available Items</p>
                  <p className="text-sm text-muted-foreground">Ready for booking</p>
                </div>
                <Badge variant="available">{stats.availableDecorations}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;