import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Filter
} from "lucide-react";
import heroImage from "@/assets/hero-decoration.jpg";

// Mock data - same as from Home page
const mockDecorations = [
  {
    id: "1",
    title: "Elegant Wedding Arch",
    description: "Beautiful floral arch perfect for wedding ceremonies with burgundy and gold accents",
    category: "wedding",
    images: [heroImage],
    status: "available" as const,
    bookings: 5,
    wishlists: 12,
    createdAt: "2024-01-10"
  },
  {
    id: "2", 
    title: "Corporate Event Setup",
    description: "Professional table arrangements with sophisticated centerpieces for corporate functions",
    category: "corporate",
    images: [heroImage],
    status: "reserved" as const,
    bookings: 8,
    wishlists: 6,
    createdAt: "2024-01-08"
  },
  {
    id: "3",
    title: "Birthday Party Decor",
    description: "Colorful and festive decorations perfect for birthday celebrations and parties",
    category: "birthday",
    images: [heroImage],
    status: "full" as const,
    bookings: 15,
    wishlists: 20,
    createdAt: "2024-01-05"
  },
  {
    id: "4",
    title: "Garden Party Setup",
    description: "Rustic outdoor decorations with natural elements and warm lighting",
    category: "outdoor",
    images: [heroImage],
    status: "available" as const,
    bookings: 3,
    wishlists: 8,
    createdAt: "2024-01-12"
  }
];

const AdminDecorations = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");

  const filteredDecorations = mockDecorations.filter((decoration) => {
    const matchesSearch = decoration.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         decoration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || decoration.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || decoration.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="available">Available</Badge>;
      case "reserved":
        return <Badge variant="reserved">Reserved</Badge>;
      case "full":
        return <Badge variant="full">Fully Booked</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Decorations</h1>
          <p className="text-muted-foreground">Add, edit, and manage decoration items</p>
        </div>
        <Button asChild>
          <Link to="/admin/decorations/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Decoration
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search decorations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full md:w-48">
            <Filter className="h-4 w-4" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="wedding">Wedding</SelectItem>
            <SelectItem value="corporate">Corporate</SelectItem>
            <SelectItem value="birthday">Birthday</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
            <SelectItem value="anniversary">Anniversary</SelectItem>
            <SelectItem value="holiday">Holiday</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="available">Available</SelectItem>
            <SelectItem value="reserved">Reserved</SelectItem>
            <SelectItem value="full">Fully Booked</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex gap-2">
          <Button 
            variant={viewMode === "table" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("table")}
          >
            Table
          </Button>
          <Button 
            variant={viewMode === "grid" ? "default" : "outline"} 
            size="sm"
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
        </div>
      </div>

      {/* Content */}
      {viewMode === "table" ? (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Decoration</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Bookings</TableHead>
                <TableHead>Wishlists</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDecorations.map((decoration) => (
                <TableRow key={decoration.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img 
                        src={decoration.images[0]} 
                        alt={decoration.title}
                        className="w-12 h-12 object-cover rounded-md"
                      />
                      <div>
                        <p className="font-medium">{decoration.title}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {decoration.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{decoration.category}</TableCell>
                  <TableCell>{getStatusBadge(decoration.status)}</TableCell>
                  <TableCell>{decoration.bookings}</TableCell>
                  <TableCell>{decoration.wishlists}</TableCell>
                  <TableCell>{decoration.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/decoration/${decoration.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDecorations.map((decoration) => (
            <Card key={decoration.id} className="overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={decoration.images[0]}
                  alt={decoration.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute top-3 left-3">
                  {getStatusBadge(decoration.status)}
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-2">
                  <span className="text-sm text-muted-foreground capitalize">
                    {decoration.category}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-2 line-clamp-1">
                  {decoration.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {decoration.description}
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Bookings: {decoration.bookings}</span>
                  <span>Wishlists: {decoration.wishlists}</span>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to={`/decoration/${decoration.id}`}>
                    <Eye className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {filteredDecorations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No decorations found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDecorations;