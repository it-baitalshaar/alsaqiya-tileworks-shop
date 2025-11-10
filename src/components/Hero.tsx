import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-ceramics.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Star className="h-5 w-5 fill-current" />
                <span className="text-sm font-medium">Premium Quality Ceramics</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Transform Your Space with
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}Premium Ceramics
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Discover our extensive collection of high-quality ceramic tiles, sanitaryware, and architectural ceramics. 
                Trusted by professionals worldwide for over two decades.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button variant="hero" size="lg" className="group">
                  Explore Products
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              {/* <Button variant="outline" size="lg">
                <a href="/" target="_blank" rel="noopener noreferrer">
                  Download Catalog
                </a>
              </Button> */}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-foreground">500+</div>
                <div className="text-sm text-muted-foreground">Product Lines</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">20+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">1000+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent rounded-3xl"></div>
            <img
              src={heroImage}
              alt="Premium ceramics showroom"
              className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-card p-6 rounded-2xl shadow-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                  <Star className="h-6 w-6 text-white fill-current" />
                </div>
                <div>
                  <div className="font-semibold text-foreground">Premium Quality</div>
                  <div className="text-sm text-muted-foreground">Certified Products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;