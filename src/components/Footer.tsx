import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10  rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">            
                  <img 
              src="https://alsaqia-dev-store.leam.ae/_nuxt/img/alsaqia.adb177b.svg" 
              alt="Al Saqiya Logo" 
              className="h-12 w-auto"
            /></span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Al Saqiya Trading</h3>
                <p className="text-xs text-primary-foreground/70">Premium Ceramics</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Your trusted partner for premium ceramic solutions. Quality products, 
              competitive prices, and exceptional service since 2003.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-ceramics-terra cursor-pointer transition-colors">
                <Facebook className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-ceramics-terra cursor-pointer transition-colors">
                <Instagram className="h-4 w-4" />
              </div>
              <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-ceramics-terra cursor-pointer transition-colors">
                <Linkedin className="h-4 w-4" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#home" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">Home</a></li>
              <li><a href="#products" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">Products</a></li>
              <li><a href="#categories" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">Categories</a></li>
              <li><a href="#about" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">About Us</a></li>
              <li><a href="#contact" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Product Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Product Categories</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">Wall & Floor Tiles</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">Bathroom Ceramics</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">Commercial Flooring</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">Outdoor Ceramics</a></li>
              <li><a href="#" className="text-primary-foreground/80 hover:text-ceramics-terra transition-colors">Specialty Products</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Contact Information</h4>
            <div className="space-y-4 text-sm">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-ceramics-terra mt-1 flex-shrink-0" />
                <div>
                  <p className="text-primary-foreground/80">123 Business District</p>
                  <p className="text-primary-foreground/80">Dubai, UAE</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-ceramics-terra flex-shrink-0" />
                <p className="text-primary-foreground/80">+971 4 123 4567</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-ceramics-terra flex-shrink-0" />
                <p className="text-primary-foreground/80">info@alsaqiyatrading.com</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-ceramics-terra/20 text-ceramics-terra border-ceramics-terra/30">
              Open Mon-Sat 8AM-6PM
            </Badge>
          </div>
        </div>
      </div>

      <Separator className="bg-primary-foreground/20" />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Al Saqiya Trading. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-primary-foreground/60 hover:text-ceramics-terra transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-ceramics-terra transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/60 hover:text-ceramics-terra transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;