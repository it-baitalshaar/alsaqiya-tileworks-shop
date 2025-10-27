import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Our Showroom",
    details: "Musaffah Industrial - M38, Abu Dhabi, UAE",
    secondary: "Open for product viewing"
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+971 4 123 4567",
    secondary: "Mon - Sat 8 AM - 6 PM"
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
    details: "Saturday - Thursday",
    secondary: "7:30 AM - 6:00 PM"
  }
];

const Contact = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+971527249586"; // Remove spaces and special characters
    const message = "Hello! I'm interested in your ceramic tiles and would like to know more about your products.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section className="py-20 bg-muted/30">
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

        <div className="max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            {contactInfo.map((info, index) => (
              <Card key={index} className="bg-card border-border hover:shadow-md transition-shadow h-full">
                <CardContent className="p-6 h-full">
                  <div className="flex flex-col items-center text-center space-y-4 h-full">
                    <div className="flex-shrink-0 w-16 h-16 bg-ceramics-terra/10 rounded-lg flex items-center justify-center">
                      <info.icon className="h-8 w-8 text-ceramics-terra" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h3 className="font-semibold text-foreground mb-2 text-lg">{info.title}</h3>
                      <p className="text-foreground mb-2 font-medium">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.secondary}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Card */}
          <Card className="bg-gradient-to-br from-ceramics-terra to-ceramics-earth text-white">
            <CardContent className="p-8 text-center">
              <h3 className="font-bold text-2xl mb-4">Need Immediate Assistance?</h3>
              <p className="text-lg opacity-90 mb-6">
                Call our hotline for inquiries 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="tel:+97141234567"
                  className="inline-flex items-center justify-center px-6 py-3 bg-white/10 border border-white/30 text-white rounded-lg hover:bg-white hover:text-ceramics-terra transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now: +971 58 196 52 42
                </a>
                <button 
                  onClick={handleWhatsAppClick}
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 border border-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp Chat
                </button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Floating WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
          <span className="absolute right-16 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Chat on WhatsApp
          </span>
        </button>
      </div>
    </section>
  );
};

export default Contact;