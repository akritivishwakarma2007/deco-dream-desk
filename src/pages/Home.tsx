import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select";
import DecorationCard from "@/components/decorations/DecorationCard";
import { Search, Filter } from "lucide-react";
import heroImage from "@/assets/hero-decoration.jpg";
import "../styles.css";
import "../components/Home.css";

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
      <section className="hero-section">
        <div 
          className="hero-background"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content">
          <h1 className="hero-title">
            Transform Your Special Moments
          </h1>
          <p className="hero-subtitle">
            Discover stunning decorations for weddings, parties, and corporate events
          </p>
          <div className="hero-buttons">
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
      <section id="browse" className="browse-section">
        <div className="container">
          <div className="browse-header">
            <h2 className="browse-title">
              Browse Our Decorations
            </h2>
            <p className="browse-description">
              Find the perfect decorations for your event. Filter by category and availability to discover exactly what you need.
            </p>
          </div>

          {/* Filters */}
          <div className="filters-container">
            <div className="input-icon" style={{ flex: 1 }}>
              <Search className="icon" />
              <Input
                placeholder="Search decorations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <Filter style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
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
              <SelectTrigger>
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
          <div className="decorations-grid">
            {filteredDecorations.map((decoration) => (
              <DecorationCard key={decoration.id} decoration={decoration} />
            ))}
          </div>

          {filteredDecorations.length === 0 && (
            <div className="no-results">
              <p className="no-results-text">
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