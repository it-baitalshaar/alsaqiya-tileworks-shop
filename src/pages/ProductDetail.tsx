import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import tilesImage from "@/assets/ceramic-tiles.jpg";
import bathroomImage from "@/assets/ceramic-bathroom.jpg";
import flooringImage from "@/assets/ceramic-flooring.jpg";

const productData = {
  "1": {
    id: 1,
    name: "Premium Wall & Floor Tiles",
    category: "Wall & Floor Tiles",
    price: "AED 45/sqm",
    originalPrice: "AED 60/sqm",
    description: "High-quality ceramic tiles perfect for residential and commercial applications. These tiles feature exceptional durability, water resistance, and aesthetic appeal.",
    image: tilesImage,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    specifications: {
      "Material": "Premium Ceramic",
      "Size": "60x60 cm",
      "Thickness": "10mm",
      "Finish": "Matte/Glossy",
      "Water Absorption": "< 0.5%",
      "Slip Resistance": "R10",
      "Origin": "UAE"
    },
    features: [
      "Water resistant and easy to clean",
      "Suitable for high-traffic areas",
      "Available in multiple colors and patterns",
      "Anti-slip surface for safety",
      "Eco-friendly manufacturing process"
    ]
  },
  "2": {
    id: 2,
    name: "Luxury Bathroom Ceramics",
    category: "Bathroom Ceramics",
    price: "AED 350/piece",
    originalPrice: "AED 450/piece",
    description: "Complete sanitaryware collection featuring modern design and superior functionality for contemporary bathrooms.",
    image: bathroomImage,
    rating: 4.9,
    reviews: 89,
    inStock: true,
    specifications: {
      "Material": "Vitreous China",
      "Type": "Wall-hung/Floor-standing",
      "Dimensions": "Various sizes available",
      "Finish": "Glossy White",
      "Certification": "ISO 9001",
      "Warranty": "5 Years",
      "Origin": "UAE"
    },
    features: [
      "Water-saving dual flush system",
      "Easy installation and maintenance",
      "Scratch and stain resistant",
      "Antibacterial surface coating",
      "Modern ergonomic design"
    ]
  },
  "3": {
    id: 3,
    name: "Heavy-Duty Commercial Flooring",
    category: "Commercial Flooring",
    price: "AED 55/sqm",
    originalPrice: "AED 75/sqm",
    description: "Industrial-grade ceramic flooring designed for high-traffic commercial spaces with exceptional durability and safety features.",
    image: flooringImage,
    rating: 4.7,
    reviews: 156,
    inStock: true,
    specifications: {
      "Material": "Industrial Ceramic",
      "Size": "80x80 cm",
      "Thickness": "12mm",
      "Load Capacity": "High",
      "Slip Resistance": "R11",
      "Fire Rating": "A1",
      "Origin": "UAE"
    },
    features: [
      "Extreme durability for heavy loads",
      "Chemical and stain resistant",
      "Anti-slip surface for workplace safety",
      "Easy maintenance and cleaning",
      "Heat and frost resistant"
    ]
  }
};

const ProductDetail = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const product = categoryId ? productData[categoryId as keyof typeof productData] : null;

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Categories
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-lg bg-muted">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[500px] object-cover"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" className="text-lg px-4 py-2">
                    Out of Stock
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="secondary" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-ceramics-terra text-ceramics-terra"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-ceramics-terra">
                  {product.price}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  {product.originalPrice}
                </span>
              </div>
              <p className="text-muted-foreground">
                {product.description}
              </p>
            </div>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.inStock ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline" size="lg">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {product.inStock && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  ✅ In Stock • Free delivery on orders over AED 1000
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specifications" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
          </TabsList>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Technical Specifications
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-muted">
                      <span className="font-medium text-foreground">{key}:</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="features" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="h-2 w-2 rounded-full bg-ceramics-terra mt-2 mr-3 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;