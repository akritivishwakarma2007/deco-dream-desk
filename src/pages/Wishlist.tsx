import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import DecorationCard from "@/components/decorations/DecorationCard";
import { Heart, ShoppingBag } from "lucide-react";
import heroImage from "@/assets/hero-decoration.jpg";

// Mock wishlist data - will be replaced with Supabase data
const mockWishlist = [
  {
    id: "1",
    title: "Elegant Wedding Arch",
    description: "Beautiful floral arch perfect for wedding ceremonies with burgundy and gold accents",
    category: "wedding",
    images: [heroImage],
    status: "available" as const,
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
    id: "6",
    title: "Holiday Gala Decor",
    description: "Luxurious holiday-themed decorations with metallic accents and festive elements",
    category: "holiday",
    images: [heroImage],
    status: "available" as const,
  },
];

const Wishlist = () => {
  const [wishlistItems] = useState(mockWishlist); // TODO: Fetch from Supabase

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">My Wishlist</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Keep track of your favorite decorations and book them when you're ready.
          </p>
        </div>

        {wishlistItems.length > 0 ? (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-muted-foreground">
                {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in your wishlist
              </p>
              <Button asChild>
                <Link to="/">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Continue Browsing
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlistItems.map((decoration) => (
                <DecorationCard key={decoration.id} decoration={decoration} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Browse our beautiful decorations and add your favorites to your wishlist. 
              They'll appear here for easy access when you're ready to book.
            </p>
            <Button asChild size="lg">
              <Link to="/">
                <ShoppingBag className="mr-2 h-4 w-4" />
                Browse Decorations
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;