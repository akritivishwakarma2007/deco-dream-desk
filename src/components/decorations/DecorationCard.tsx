import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-card hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={decoration.images[0] || "/placeholder.svg"}
          alt={decoration.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge variant={getStatusBadgeVariant(decoration.status)}>
            {getStatusText(decoration.status)}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-white/80 hover:bg-white text-primary"
          onClick={handleWishlistToggle}
        >
          <Heart className={`h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
        </Button>
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
        <p className="text-sm text-muted-foreground line-clamp-2">
          {decoration.description}
        </p>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Link to={`/decoration/${decoration.id}`} className="w-full">
          <Button className="w-full" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default DecorationCard;