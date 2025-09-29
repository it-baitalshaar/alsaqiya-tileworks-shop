import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useSanity";
import { urlForImage } from "@/lib/sanity";

const FeaturedProducts = () => {
  const { data: products, isLoading, error } = useProducts();

  // Show only first 6 products as featured
  const featuredProducts = products?.slice(0, 6) || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Loading our featured collection...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="h-48 bg-muted rounded-t-lg"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-5 bg-muted rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !products || products.length === 0) {
    return null; // Don't show section if no products
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Featured Collection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium ceramic products, 
            chosen for their exceptional quality and design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product._id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Link to={`/product/${product._id}`}>
                    {product.mainImage ? (
                      <img
                        src={urlForImage(product.mainImage)}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                      />
                    ) : (
                      <div className="w-full h-48 bg-muted flex items-center justify-center cursor-pointer">
                        <span className="text-muted-foreground">No Image</span>
                      </div>
                    )}
                    
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant="secondary"
                        className="bg-white/90 text-foreground hover:bg-white text-xs"
                      >
                        Ceramic
                      </Badge>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-ceramics-terra transition-colors line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Premium Ceramic Product
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold text-ceramics-terra">
                        Contact for Price
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2 pt-2">
                      <Link to={`/product/${product._id}`} className="flex-1">
                        <Button 
                          size="sm" 
                          className="w-full"
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Link to="/products">
            <Button variant="hero" size="lg" className="group">
              View All Products
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
