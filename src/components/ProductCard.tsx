import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { urlForImage } from "@/lib/sanity";
import { Link } from "react-router-dom";

interface Product {
  _id: string;
  _type: string;
  name: string;
  mainImage: any;
  brand?: string;
  color?: string;
  size?: string;
  productCode?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link to={`/product/${product._id}`}>
      <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full cursor-pointer">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative overflow-hidden bg-muted h-64">
            {product.mainImage ? (
              <img
                src={urlForImage(product.mainImage)}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}

            {/* Badge */}
            <div className="absolute top-2 left-2">
              <Badge variant="secondary" className="capitalize">
                {product._type}
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            <h3 className="font-semibold text-foreground truncate mb-1">
              {product.name}
            </h3>

            {product.brand && (
              <p className="text-xs text-muted-foreground mb-2">
                {product.brand}
              </p>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex flex-col gap-1">
                {product.productCode && (
                  <span className="text-xs font-medium text-primary">
                    Code: {product.productCode}
                  </span>
                )}
                {product.color && (
                  <span className="text-xs text-muted-foreground">
                    Color: {product.color}
                  </span>
                )}
                {product.size && (
                  <span className="text-xs text-muted-foreground">
                    Size: {product.size}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;