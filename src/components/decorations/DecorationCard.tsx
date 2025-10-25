import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/Button";
import { Badge } from "@/components/Badge";
import { Heart, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import "../Card.css";
import "../styles.css";

interface Decoration {
  id: string;
  title: string;
  description: string;
  category: string;
  images: string[];
  status: "available" | "reserved" | "full";
}

interface DecorationCardProps {
  decoration: Decoration;
}

const DecorationCard = ({ decoration }: DecorationCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const handleWishlistToggle = () => {
    // TODO: Implement wishlist functionality with Supabase
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted 
        ? `${decoration.title} removed from your wishlist`
        : `${decoration.title} added to your wishlist`,
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "available":
        return "available";
      case "reserved":
        return "reserved";
      case "full":
        return "full";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available";
      case "reserved":
        return "Reserved";
      case "full":
        return "Fully Booked";
      default:
        return status;
    }
  };

  return (
    <div className="card">
      <div className="card-image-container">
        <img
          src={decoration.images[0] || "/placeholder.svg"}
          alt={decoration.title}
          className="card-image"
        />
        <div className="card-badge">
          <Badge variant={getStatusBadgeVariant(decoration.status)}>
            {getStatusText(decoration.status)}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="card-wishlist-btn"
          onClick={handleWishlistToggle}
        >
          <Heart style={{ 
            width: '1rem', 
            height: '1rem',
            fill: isWishlisted ? 'currentColor' : 'none'
          }} />
        </Button>
      </div>
      
      <div className="card-content">
        <div className="card-category">
          {decoration.category}
        </div>
        <h3 className="card-title">
          {decoration.title}
        </h3>
        <p className="card-description">
          {decoration.description}
        </p>
      </div>
      
      <div className="card-footer">
        <Link to={`/decoration/${decoration.id}`} style={{ width: '100%' }}>
          <Button className="w-full" variant="outline">
            <Eye style={{ marginRight: '0.5rem', width: '1rem', height: '1rem' }} />
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default DecorationCard;