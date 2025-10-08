import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Grid3X3, Wrench } from "lucide-react";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Browse Products</h1>
            <p className="text-muted-foreground">Choose a category to explore.</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="group hover:shadow-xl transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Grid3X3 className="w-12 h-12 mb-4 text-ceramics-terra" />
                <h2 className="text-xl font-semibold mb-2">Tiles</h2>
                <p className="text-sm text-muted-foreground mb-6">Wall and floor tiles in various sizes and finishes.</p>
                <Link to="/products/tiles">
                  <Button>View Tiles</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="group hover:shadow-xl transition-all">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <Wrench className="w-12 h-12 mb-4 text-ceramics-terra" />
                <h2 className="text-xl font-semibold mb-2">Mixers</h2>
                <p className="text-sm text-muted-foreground mb-6">Kitchen, bathroom, shower, and basin mixers.</p>
                <Link to="/products/mixers">
                  <Button>View Mixers</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductsPage;
