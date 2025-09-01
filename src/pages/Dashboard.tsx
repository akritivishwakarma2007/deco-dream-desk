import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Heart, Calendar, Eye, Edit } from "lucide-react";
import heroImage from "@/assets/hero-decoration.jpg";

// Mock user data - will be replaced with Supabase data
const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  role: "user",
  joinedDate: "2024-01-15",
};

const mockWishlist = [
  {
    id: "1",
    title: "Elegant Wedding Arch",
    category: "wedding",
    image: heroImage,
    status: "available" as const,
  },
  {
    id: "4",
    title: "Garden Party Setup",
    category: "outdoor",
    image: heroImage,
    status: "available" as const,
  },
];

const mockBookings = [
  {
    id: "b1",
    decorId: "1",
    decorTitle: "Elegant Wedding Arch",
    decorImage: heroImage,
    date: "2024-02-14",
    status: "confirmed",
    details: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "123 Main St, City, State 12345",
    },
    createdAt: "2024-01-20",
  },
  {
    id: "b2",
    decorId: "4",
    decorTitle: "Garden Party Setup",
    decorImage: heroImage,
    date: "2024-03-15",
    status: "pending",
    details: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+1 (555) 123-4567",
      address: "456 Garden Ave, City, State 12345",
    },
    createdAt: "2024-01-25",
  },
];

const Dashboard = () => {
  const [user] = useState(mockUser); // TODO: Fetch from Supabase
  const [wishlist] = useState(mockWishlist); // TODO: Fetch from Supabase
  const [bookings] = useState(mockBookings); // TODO: Fetch from Supabase

  const getBookingStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge variant="success">Confirmed</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Manage your profile, wishlist, and bookings all in one place.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist ({wishlist.length})</TabsTrigger>
            <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Name</label>
                    <p className="text-lg">{user.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Email</label>
                    <p className="text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Role</label>
                    <p className="text-lg capitalize">{user.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Joined</label>
                    <p className="text-lg">{new Date(user.joinedDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{wishlist.length}</p>
                  <p className="text-muted-foreground">Wishlist Items</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{bookings.length}</p>
                  <p className="text-muted-foreground">Total Bookings</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Badge variant="success" className="h-8 w-8 rounded-full p-0 mx-auto mb-2 flex items-center justify-center">
                    ✓
                  </Badge>
                  <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'confirmed').length}</p>
                  <p className="text-muted-foreground">Confirmed</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="wishlist" className="space-y-6">
            {wishlist.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlist.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Badge variant="available">Available</Badge>
                      </div>
                      <h3 className="font-semibold mb-2">{item.title}</h3>
                      <p className="text-sm text-muted-foreground capitalize mb-4">
                        {item.category}
                      </p>
                      <Button asChild className="w-full">
                        <Link to={`/decoration/${item.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No items in wishlist</h3>
                  <p className="text-muted-foreground mb-4">
                    Start browsing decorations to add items to your wishlist.
                  </p>
                  <Button asChild>
                    <Link to="/">Browse Decorations</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="bookings" className="space-y-6">
            {bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full md:w-32 aspect-square overflow-hidden rounded-lg shrink-0">
                          <img
                            src={booking.decorImage}
                            alt={booking.decorTitle}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{booking.decorTitle}</h3>
                              <p className="text-muted-foreground">
                                Booking ID: {booking.id}
                              </p>
                            </div>
                            {getBookingStatusBadge(booking.status)}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium">Event Date</p>
                              <p className="text-muted-foreground">
                                {new Date(booking.date).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="font-medium">Contact</p>
                              <p className="text-muted-foreground">{booking.details.phone}</p>
                            </div>
                            <div className="md:col-span-2">
                              <p className="font-medium">Address</p>
                              <p className="text-muted-foreground">{booking.details.address}</p>
                            </div>
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/decoration/${booking.decorId}`}>
                                <Eye className="mr-2 h-3 w-3" />
                                View Decoration
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start browsing decorations to make your first booking.
                  </p>
                  <Button asChild>
                    <Link to="/">Browse Decorations</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;