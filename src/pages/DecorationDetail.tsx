import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowLeft, Calendar, Phone, Mail, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-decoration.jpg";

// Mock data - will be replaced with Supabase data
const getDecorationById = (id: string) => {
  const decorations = {
    "1": {
      id: "1",
      title: "Elegant Wedding Arch",
      description: "Beautiful floral arch perfect for wedding ceremonies with burgundy and gold accents. This stunning piece features hand-crafted details and premium materials that will make your special day unforgettable. Includes setup and takedown service.",
      category: "wedding",
      images: [heroImage, heroImage, heroImage],
      status: "available" as const,
      addedBy: "admin",
      createdAt: "2024-01-15",
    },
    "2": {
      id: "2",
      title: "Corporate Event Setup", 
      description: "Professional table arrangements with sophisticated centerpieces for corporate functions",
      category: "corporate",
      images: [heroImage, heroImage, heroImage],
      status: "reserved" as const,
      addedBy: "admin",
      createdAt: "2024-01-16",
    },
    "3": {
      id: "3",
      title: "Birthday Party Decor",
      description: "Colorful and festive decorations perfect for birthday celebrations and parties",
      category: "birthday", 
      images: [heroImage, heroImage, heroImage],
      status: "full" as const,
      addedBy: "admin",
      createdAt: "2024-01-17",
    }
  };
  return decorations[id as keyof typeof decorations] || decorations["1"];
};

const DecorationDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    preferredDate: "",
    message: "",
  });

  const decoration = getDecorationById(id || "1"); // TODO: Fetch from Supabase using id

  const handleWishlistToggle = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted 
        ? `${decoration.title} removed from your wishlist`
        : `${decoration.title} added to your wishlist`,
    });
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (decoration.status === "full") {
      toast({
        title: "Booking Not Available",
        description: "This decoration is fully booked and cannot be reserved.",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement booking with Supabase
    toast({
      title: "Booking Request Submitted",
      description: "We'll contact you soon to confirm your booking details.",
    });
    
    // Reset form
    setBookingForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      preferredDate: "",
      message: "",
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "available": return "available";
      case "reserved": return "reserved";
      case "full": return "full";
      default: return "default";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "available": return "Available";
      case "reserved": return "Reserved";
      case "full": return "Fully Booked";
      default: return status;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "available": 
        return { text: "This decoration is available for booking!", variant: "default" as const };
      case "reserved": 
        return { text: "This decoration is reserved but you can still request booking.", variant: "warning" as const };
      case "full": 
        return { text: "This decoration is fully booked. Booking requests are disabled.", variant: "destructive" as const };
      default: 
        return { text: "", variant: "default" as const };
    }
  };

  const statusMessage = getStatusMessage(decoration.status);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Browse
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Images Section */}
          <div className="space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-lg">
              <img
                src={decoration.images[0]}
                alt={decoration.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {decoration.images.slice(1).map((image, index) => (
                <div key={index} className="aspect-square overflow-hidden rounded-md">
                  <img
                    src={image}
                    alt={`${decoration.title} ${index + 2}`}
                    className="h-full w-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <Badge variant={getStatusBadgeVariant(decoration.status)} className="mb-3">
                    {getStatusText(decoration.status)}
                  </Badge>
                  <h1 className="text-3xl font-bold mb-2">{decoration.title}</h1>
                  <p className="text-muted-foreground capitalize">
                    {decoration.category} • Added {new Date(decoration.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleWishlistToggle}
                  className="shrink-0"
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current text-primary" : ""}`} />
                </Button>
              </div>
              
              {statusMessage.text && (
                <div className={`p-4 rounded-lg border ${
                  statusMessage.variant === "warning" ? "bg-warning/10 border-warning text-warning-foreground" :
                  statusMessage.variant === "destructive" ? "bg-destructive/10 border-destructive text-destructive-foreground" :
                  "bg-success/10 border-success text-success-foreground"
                }`}>
                  {statusMessage.text}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {decoration.description}
              </p>
            </div>

            {/* Booking Form */}
            <Card>
              <CardHeader>
                <CardTitle>Request Booking</CardTitle>
              </CardHeader>
              <CardContent>
                {decoration.status === "full" ? (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      This decoration is fully booked and not available for new reservations.
                    </p>
                    <Button variant="outline" disabled>
                      Booking Disabled
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleBookingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingForm.email}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Preferred Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingForm.preferredDate}
                          onChange={(e) => setBookingForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Event Address</Label>
                      <Textarea
                        id="address"
                        value={bookingForm.address}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="Enter the full address where the decoration will be set up"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Additional Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={bookingForm.message}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Any special requirements or questions?"
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                      <Calendar className="mr-2 h-4 w-4" />
                      Submit Booking Request
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecorationDetail;