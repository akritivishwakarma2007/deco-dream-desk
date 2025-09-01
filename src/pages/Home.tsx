import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DecorationCard from "@/components/decorations/DecorationCard";
import { Search, Filter } from "lucide-react";
import heroImage from "@/assets/hero-decoration.jpg";

// Mock data - will be replaced with Supabase data
const mockDecorations = [
  {
    id: "1",
    title: "Elegant Wedding Arch",
    description: "Beautiful floral arch perfect for wedding ceremonies with burgundy and gold accents",
    category: "wedding",
    images: [heroImage],
    status: "available" as const,
  },
  {
    id: "2", 
    title: "Corporate Event Setup",
    description: "Professional table arrangements with sophisticated centerpieces for corporate functions",
    category: "corporate",
    images: [heroImage],
    status: "reserved" as const,
  },
  {
    id: "3",
    title: "Birthday Party Decor",
    description: "Colorful and festive decorations perfect for birthday celebrations and parties",
    category: "birthday",
    images: [heroImage],
    status: "full" as const,
  },
  {
    id: "4",
    title: "Garden Party Setup",
    description: "Rustic outdoor decorations with natural elements and warm lighting",
    category: "outdoor",
    images: [heroImage],
    status: "available" as const,
  },
  {
    id: "5",
    title: "Anniversary Celebration",
    description: "Romantic decoration setup with candles, flowers, and elegant drapery",
    category: "anniversary",
    images: [heroImage],
    status: "reserved" as const,
  },
  {
    id: "6",
    title: "Holiday Gala Decor",
    description: "Luxurious holiday-themed decorations with metallic accents and festive elements",
    category: "holiday",
    images: [heroImage],
    status: "available" as const,
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const filteredDecorations = mockDecorations.filter((decoration) => {
    const matchesSearch = decoration.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         decoration.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || decoration.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || decoration.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Transform Your Special Moments
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 animate-slide-up">
            Discover stunning decorations for weddings, parties, and corporate events
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="lg" variant="hero" asChild>
              <Link to="#browse">Browse Decorations</Link>
            </Button>
            <Button size="lg" variant="premium" asChild>
              <Link to="/wishlist">View Wishlist</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Browse Section */}
      <section id="browse" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Browse Our Decorations
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find the perfect decorations for your event. Filter by category and availability to discover exactly what you need.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-4xl mx-auto">
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
          </div>

          {/* Decorations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDecorations.map((decoration) => (
              <DecorationCard key={decoration.id} decoration={decoration} />
            ))}
          </div>

          {filteredDecorations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No decorations found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;