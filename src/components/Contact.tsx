import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Showroom",
    details: "123 Business District, Dubai, UAE",
    secondary: "Open for product viewing"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+971 4 123 4567",
    secondary: "Mon-Sat 8AM-6PM"
  },
  {
    icon: Mail,
    title: "Email Us",
    details: "info@alsaqiyatrading.com",
    secondary: "We reply within 24 hours"
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Sunday - Thursday",
    secondary: "8:00 AM - 6:00 PM"
  }
];

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Get In Touch
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contact our expert team for personalized consultation and competitive pricing 
            on premium ceramic solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl text-foreground">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Name *</label>
                    <Input placeholder="Your full name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email *</label>
                    <Input type="email" placeholder="your.email@example.com" />
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone</label>
                    <Input placeholder="+971 XX XXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Company</label>
                    <Input placeholder="Your company name" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Subject *</label>
                  <Input placeholder="What can we help you with?" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message *</label>
                  <Textarea 
                    placeholder="Tell us about your project requirements..."
                    className="min-h-[120px]"
                  />
                </div>
                
                <Button variant="hero" size="lg" className="w-full">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-ceramics-terra/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-6 w-6 text-ceramics-terra" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{info.title}</h3>
                      <p className="text-foreground mb-1">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.secondary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* CTA Card */}
            <Card className="bg-gradient-to-br from-ceramics-terra to-ceramics-earth text-white">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-lg mb-2">Need Immediate Assistance?</h3>
                <p className="text-sm opacity-90 mb-4">
                  Call our hotline for urgent inquiries and technical support
                </p>
                <Button variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-ceramics-terra">
                  Call Now: +971 4 123 4567
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;