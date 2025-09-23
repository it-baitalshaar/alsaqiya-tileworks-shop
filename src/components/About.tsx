import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Globe, Shield, Users } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Premium Quality",
    description: "ISO certified products meeting international quality standards"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Serving customers across the Middle East and North Africa"
  },
  {
    icon: Shield,
    title: "Trusted Partner",
    description: "20+ years of excellence in ceramic trading and distribution"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Professional consultation and technical support services"
  }
];

const About = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary">
                About Al Saqiya Trading
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Your Trusted Partner in 
                <span className="text-ceramics-terra"> Premium Ceramics</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                Since our establishment, Al Saqiya Trading has been at the forefront of ceramic 
                distribution in the region. We specialize in importing and supplying premium 
                ceramic products from leading manufacturers worldwide.
              </p>
              <p className="text-muted-foreground">
                Our commitment to quality, competitive pricing, and exceptional customer service 
                has made us the preferred choice for architects, contractors, and retail customers 
                across the region.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Why Choose Us?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-ceramics-terra/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-ceramics-terra" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="hero" size="lg">
              Learn More About Us
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-ceramics-terra to-ceramics-earth text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-90">Product Lines Available</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-ceramics-clay to-ceramics-stone">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2 text-foreground">20+</div>
                <div className="text-sm text-muted-foreground">Years of Experience</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">1000+</div>
                <div className="text-sm opacity-90">Satisfied Customers</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-accent to-accent/80 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold mb-2">50+</div>
                <div className="text-sm opacity-90">Partner Brands</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;