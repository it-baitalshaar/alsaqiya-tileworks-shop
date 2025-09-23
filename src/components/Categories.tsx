import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import tilesImage from "@/assets/ceramic-tiles.jpg";
import bathroomImage from "@/assets/ceramic-bathroom.jpg";
import flooringImage from "@/assets/ceramic-flooring.jpg";

const categories = [
  {
    id: 1,
    name: "Wall & Floor Tiles",
    description: "Premium ceramic tiles for residential and commercial spaces",
    image: tilesImage,
    products: "250+ Products",
    tag: "Popular"
  },
  {
    id: 2,
    name: "Bathroom Ceramics",
    description: "Complete sanitaryware solutions for modern bathrooms",
    image: bathroomImage,
    products: "180+ Products",
    tag: "New"
  },
  {
    id: 3,
    name: "Commercial Flooring",
    description: "Heavy-duty ceramic solutions for commercial applications",
    image: flooringImage,
    products: "120+ Products",
    tag: "Featured"
  }
];

const Categories = () => {
  return (
    <section id="categories" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Product Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Explore Our Product Range
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From residential to commercial applications, we offer comprehensive ceramic solutions 
            for every project requirement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} to={`/product/${category.id}`}>
              <Card className="group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-card to-card/80">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge 
                      variant={category.tag === "Popular" ? "default" : category.tag === "New" ? "destructive" : "secondary"}
                      className="bg-white/90 text-foreground hover:bg-white"
                    >
                      {category.tag}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-ceramics-terra transition-colors">
                      {category.name}
                    </h3>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-ceramics-terra group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-ceramics-terra">
                      {category.products}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      View Collection →
                    </span>
                  </div>
                </div>
              </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;