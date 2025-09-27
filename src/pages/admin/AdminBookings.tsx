import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Download, Eye, CheckCircle, XCircle, Clock } from "lucide-react";

// Mock booking data
const mockBookings = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+1234567890"
    },
    decoration: {
      id: "1",
      title: "Elegant Wedding Arch",
      category: "wedding"
    },
    details: {
      name: "Sarah Johnson",
      email: "sarah@example.com", 
      phone: "+1234567890",
      address: "123 Main St, City, State 12345",
      date: "2024-02-15"
    },
    status: "pending",
    createdAt: "2024-01-10T10:30:00Z"
  },
  {
    id: "2",
    user: {
      name: "Mike Chen",
      email: "mike@example.com",
      phone: "+1987654321"
    },
    decoration: {
      id: "2",
      title: "Corporate Event Setup",
      category: "corporate"
    },
    details: {
      name: "Mike Chen",
      email: "mike@example.com",
      phone: "+1987654321", 
      address: "456 Business Ave, Downtown 67890",
      date: "2024-02-20"
    },
    status: "confirmed",
    createdAt: "2024-01-08T14:15:00Z"
  },
  {
    id: "3",
    user: {
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1122334455"
    },
    decoration: {
      id: "3",
      title: "Birthday Party Decor",
      category: "birthday"
    },
    details: {
      name: "Emma Davis",
      email: "emma@example.com",
      phone: "+1122334455",
      address: "789 Party Lane, Suburb 54321",
      date: "2024-02-18"
    },
    status: "cancelled",
    createdAt: "2024-01-05T09:45:00Z"
  }
];

const AdminBookings = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = 
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.decoration.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "all" || booking.status === selectedStatus;
    const matchesCategory = selectedCategory === "all" || booking.decoration.category === selectedCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="reserved"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "confirmed":
        return <Badge variant="available"><CheckCircle className="h-3 w-3 mr-1" />Confirmed</Badge>;
      case "cancelled":
        return <Badge variant="full"><XCircle className="h-3 w-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = (bookingId: string, newStatus: string) => {
    // TODO: Implement with Supabase
    console.log(`Updating booking ${bookingId} to ${newStatus}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bookings Management</h1>
          <p className="text-muted-foreground">View and manage all decoration bookings</p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">
                {mockBookings.filter(b => b.status === 'pending').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <p className="text-sm text-muted-foreground">Confirmed</p>
              <p className="text-2xl font-bold">
                {mockBookings.filter(b => b.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-muted-foreground">Cancelled</p>
              <p className="text-2xl font-bold">
                {mockBookings.filter(b => b.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-2xl font-bold">{mockBookings.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by user, email, or decoration..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="wedding">Wedding</SelectItem>
            <SelectItem value="corporate">Corporate</SelectItem>
            <SelectItem value="birthday">Birthday</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Decoration</TableHead>
              <TableHead>Event Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.user.name}</p>
                    <p className="text-sm text-muted-foreground">{booking.user.email}</p>
                    <p className="text-sm text-muted-foreground">{booking.user.phone}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.decoration.title}</p>
                    <p className="text-sm text-muted-foreground capitalize">{booking.decoration.category}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{booking.details.date}</p>
                    <p className="text-sm text-muted-foreground">{booking.details.address}</p>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(booking.status)}</TableCell>
                <TableCell>{formatDate(booking.createdAt)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    {booking.status === 'pending' && (
                      <>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No bookings found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;