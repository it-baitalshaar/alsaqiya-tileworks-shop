import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Heart, Share2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useSanity";
import { urlForImage } from "@/lib/sanity";

const Products = () => {
  const { data: products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Our Products
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Loading our premium ceramic collection...
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="h-64 bg-muted rounded-t-lg"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                    <div className="h-6 bg-muted rounded w-1/3"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Error loading products: {error.message}
          </p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            No products available at the moment.
          </p>
          {/* Debug info */}
          <div className="mt-8 p-4 bg-muted rounded-lg text-left max-w-md mx-auto">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p className="text-sm">Products count: {products?.length || 0}</p>
            <p className="text-sm">Error: {error?.message || 'None'}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Premium Collection
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our extensive range of premium ceramic products, 
            carefully selected for quality and durability.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product._id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <Link to={`/product/${product._id}`}>
                    {product.mainImage ? (
                      <img
                        src={urlForImage(product.mainImage)}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                        onError={(e) => {
                          console.log('Image failed to load:', product.mainImage);
                          console.log('Generated URL:', urlForImage(product.mainImage));
                          e.currentTarget.style.display = 'none';
                          // e.currentTarget.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className="w-full h-64 bg-muted flex items-center justify-center cursor-pointer" style={{display: product.mainImage ? 'none' : 'flex'}}>
                      <span className="text-muted-foreground">No Image</span>
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <Badge 
                        variant="secondary"
                        className="bg-white/90 text-foreground hover:bg-white"
                      >
                        Ceramic
                      </Badge>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </div>
                
                <div className="p-6">
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
                      <span className="text-xl font-bold text-ceramics-terra">
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
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Stock Status */}
                    <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                      <p className="text-xs text-green-700 dark:text-green-300">
                        ✅ Available • Contact for pricing
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Products Button */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" className="group">
            View All Products
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
