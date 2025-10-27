import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMixers } from "@/hooks/useSanity";
import { urlForImage } from "@/lib/sanity";
import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";

const MixersPage = () => {
  const { data: mixers, isLoading, error } = useMixers();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Mixers</h1>
            <p className="text-muted-foreground">Explore our mixers collection.</p>
          </div>

          {/* Filters placeholder */}
          <div className="mb-8 p-4 border rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Filters coming next: type, color, material, brand, country.</div>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="h-64 bg-muted rounded-t-lg"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-red-500">Error: {error.message}</div>
          ) : !mixers || mixers.length === 0 ? (
            <div className="text-muted-foreground">No mixers found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mixers.map((item) => (
                <ProductCard key={item._id} product={item} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MixersPage;


