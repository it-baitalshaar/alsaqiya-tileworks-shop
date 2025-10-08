import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTiles } from "@/hooks/useSanity";
import { urlForImage } from "@/lib/sanity";
import { Link } from "react-router-dom";

const TilesPage = () => {
  const { data: tiles, isLoading, error } = useTiles();

  // Basic client-side filters (can be expanded later)
  // For now, just show all tiles

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">Tiles</h1>
            <p className="text-muted-foreground">Explore our tiles collection.</p>
          </div>

          {/* Filters placeholder */}
          <div className="mb-8 p-4 border rounded-lg bg-card">
            <div className="text-sm text-muted-foreground">Filters coming next: size, color, material, usageArea, brand, finish.</div>
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
          ) : !tiles || tiles.length === 0 ? (
            <div className="text-muted-foreground">No tiles found.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tiles.map((item) => (
                <Card key={item._id} className="group hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Link to={`/product/${item._id}`}>
                        {item.mainImage ? (
                          <img
                            src={urlForImage(item.mainImage)}
                            alt={item.name}
                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-64 bg-muted flex items-center justify-center">
                            <span className="text-muted-foreground">No Image</span>
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <Badge variant="secondary" className="bg-white/90 text-foreground">Tile</Badge>
                        </div>
                      </Link>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.size || item.material || item.brand}</p>
                      <div className="mt-4">
                        <Link to={`/product/${item._id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TilesPage;


