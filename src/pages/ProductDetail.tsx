import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, Star, ShoppingCart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProduct } from "@/hooks/useSanity";
import { urlForImage } from "@/lib/sanity";
import { shareProduct, generateProductShareData } from "@/lib/shareUtils";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data: product, isLoading, error } = useProduct(productId || '');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleShare = async () => {
    if (product) {
      const shareData = generateProductShareData(product);
      await shareProduct(shareData);
    }
  };

  // Determine back URL based on product type
  const getBackUrl = () => {
    if (!product) return '/products';
    
    if (product._type === 'tiles') {
      return '/products/tiles';
    } else if (product._type === 'mixer') {
      return '/products/mixers';
    }
    
    return '/products';
  };

  const handleBack = () => {
    navigate(getBackUrl());
  };

  // WhatsApp helper function
  const generateWhatsAppMessage = (includeImage: boolean = false) => {
    if (!product) return '';

    // Build product details
    let details = `*Product Inquiry*\n\n`;
    details += `*Product Name:* ${product.name}\n`;
    
    if (product.brand) details += `*Brand:* ${product.brand}\n`;
    if (product.color) details += `*Color:* ${product.color}\n`;
    if (product.size) details += `*Size:* ${product.size}\n`;
    if (product.material) details += `*Material:* ${product.material}\n`;
    if (product.finish) details += `*Finish:* ${product.finish}\n`;
    if (product.type) details += `*Type:* ${String(product.type).replace('_', ' ')}\n`;
    
    // Add product link with proper formatting for WhatsApp to make it clickable
    const productUrl = window.location.href;
    details += `\n*Product Link:*\n${productUrl}\n`;
    
    details += `\nHello! I'm interested in this product. Could you please provide me with more information?`;

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(details);
    
    // WhatsApp Business API link (replace +971501234567 with your actual WhatsApp number)
    const whatsappNumber = '+971581965242'; // Change this to your actual WhatsApp number
    
    if (includeImage && product.mainImage) {
      // Try to include image - but this may not work in all cases
      const imageUrl = urlForImage(product.mainImage);
      return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    }
    
    return `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
  };

  const handleWhatsAppContact = (includeImage: boolean = false) => {
    const whatsappUrl = generateWhatsAppMessage(includeImage);
    window.open(whatsappUrl, '_blank');
  };

  // Get all images for the product
  const getAllImages = () => {
    if (!product) return [];
    const images = [];
    
    // Add main image first
    if (product.mainImage) {
      images.push(product.mainImage);
    }
    
    // Add gallery images
    if (product.gallery && Array.isArray(product.gallery)) {
      images.push(...product.gallery);
    }
    
    return images;
  };

  const allImages = getAllImages();
  console.log("this is allImages", allImages);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="h-[500px] bg-muted rounded-lg animate-pulse"></div>
            </div>
            <div className="space-y-6">
              <div className="h-8 bg-muted rounded animate-pulse"></div>
              <div className="h-6 bg-muted rounded animate-pulse w-3/4"></div>
              <div className="h-12 bg-muted rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Error Loading Product</h1>
          <p className="text-muted-foreground mb-8">{error.message}</p>
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

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
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
        <button
          onClick={handleBack}
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {product ? `Back to ${product._type === 'tiles' ? 'Tiles' : product._type === 'mixer' ? 'Mixers' : 'Products'}` : 'Back to Products'}
        </button>
      
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative overflow-hidden rounded-lg bg-muted">
              {allImages.length > 0 ? (
                <img
                  src={urlForImage(allImages[currentImageIndex])}
                  alt={product.name}
                  className="w-full h-[500px] object-cover"
                />
              ) : (
                <div className="w-full h-[500px] bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-lg">No Image Available</span>
                </div>
              )}
              
              {/* Navigation arrows for multiple images */}
              {allImages.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev === 0 ? allImages.length - 1 : prev - 1
                    )}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={() => setCurrentImageIndex((prev) => 
                      prev === allImages.length - 1 ? 0 : prev + 1
                    )}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>

            {/* Image Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      index === currentImageIndex 
                        ? 'border-ceramics-terra' 
                        : 'border-transparent hover:border-muted-foreground'
                    }`}
                  >
                    <img
                      src={urlForImage(image)}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product._type && (
                <Badge variant="secondary" className="mb-2 capitalize">
                  {product._type}
                </Badge>
              )}
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {product.name}
              </h1>
              {product.brand && (
                <p className="text-sm text-muted-foreground">Brand: {product.brand}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-ceramics-terra">
                  Contact for Price
                </span>
              </div>
              {product.description && (
                <p className="text-muted-foreground">{product.description}</p>
              )}
            </div>

            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="flex-1"
                onClick={() => handleWhatsAppContact(true)}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Contact for Quote
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={handleShare}
              >
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {product.stockStatus && (
              <div className={`${product.stockStatus === 'in_stock' ? 'bg-green-50 dark:bg-green-900/20' : product.stockStatus === 'limited_stock' ? 'bg-yellow-50 dark:bg-yellow-900/20' : 'bg-red-50 dark:bg-red-900/20'} p-4 rounded-lg`}>
                <p className={`text-sm ${product.stockStatus === 'in_stock' ? 'text-green-700 dark:text-green-300' : product.stockStatus === 'limited_stock' ? 'text-yellow-700 dark:text-yellow-300' : 'text-red-700 dark:text-red-300'}`}>
                  {product.stockStatus === 'in_stock' && '✅ In Stock'}
                  {product.stockStatus === 'limited_stock' && '⚠️ Limited Stock'}
                  {product.stockStatus === 'out_of_stock' && '⛔ Out of Stock'}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.size && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Size: </span>
                  <span className="text-foreground">{product.size}</span>
                </div>
              )}
              {product.material && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Material: </span>
                  <span className="text-foreground">{product.material}</span>
                </div>
              )}
              {product.finish && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Finish: </span>
                  <span className="text-foreground">{product.finish}</span>
                </div>
              )}
              {product.color && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Color: </span>
                  <span className="text-foreground">{product.color}</span>
                </div>
              )}
              {product.country && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Country: </span>
                  <span className="text-foreground">{product.country}</span>
                </div>
              )}
              {product.type && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Type: </span>
                  <span className="text-foreground capitalize">{String(product.type).replace('_', ' ')}</span>
                </div>
              )}
              {product.usageArea && Array.isArray(product.usageArea) && product.usageArea.length > 0 && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Usage Area: </span>
                  <span className="text-foreground capitalize">{product.usageArea.join(', ')}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <Card className="mt-12">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-foreground mb-4">
              Get More Information
            </h3>
            <p className="text-muted-foreground mb-4">
              For detailed specifications, pricing, and availability information, 
              please contact our sales team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="hero" size="lg" onClick={() => handleWhatsAppContact(true)}>
                Contact Sales Team
              </Button>
              <Button variant="outline" size="lg" onClick={() => handleWhatsAppContact(true)}>
                Request Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;