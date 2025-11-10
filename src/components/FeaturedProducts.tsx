import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Grid3X3, Wrench, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Featured Collections
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Our Collections
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quickly jump into our main categories: Tiles and Mixers.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Grid3X3 className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Tiles</h3>
              <p className="text-sm text-muted-foreground mb-6">Wall and floor tiles in various sizes and finishes.</p>
              <Link to="/products/tiles">
                <Button>
                  Explore Tiles
                </Button>
              </Link>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <Wrench className="w-12 h-12 mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Mixers</h3>
              <p className="text-sm text-muted-foreground mb-6">Kitchen, bathroom, shower, and basin mixers.</p>
              <Link to="/products/mixers">
                <Button>
                  Explore Mixers
                </Button>
              </Link>
            </CardContent>
          </Card>
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
