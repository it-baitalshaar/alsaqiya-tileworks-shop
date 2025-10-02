import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img 
              src="https://alsaqia-dev-store.leam.ae/_nuxt/img/alsaqia.adb177b.svg" 
              alt="Al Saqiya Logo" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-xl font-bold text-foreground">Al Saqiya</h1>
              <p className="text-xs text-muted-foreground">Premium Ceramics</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-ceramics-terra transition-colors">
              Home
            </a>
            <a href="/products" className="text-foreground hover:text-ceramics-terra transition-colors">
              Products
            </a>
            {/* <a href="#categories" className="text-foreground hover:text-ceramics-terra transition-colors">
              Categories
            </a> */}
            <a href="#about" className="text-foreground hover:text-ceramics-terra transition-colors">
              About
            </a>
            <a href="#contact" className="text-foreground hover:text-ceramics-terra transition-colors">
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;