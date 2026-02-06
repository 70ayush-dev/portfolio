import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, ExternalLink } from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "ayush8000342870@gmail.com",
    href: "mailto:ayush8000342870@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-7016441774",
    href: "tel:+917016441774",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bhavnagar, Gujarat, India",
    href: null,
  },
];

const socialLinks = [
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://linkedin.com/in/ayush-singhdev",
  },
];

export function ContactSection() {
  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Let's Work Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to discuss opportunities? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full bg-gradient-to-br from-primary/10 via-purple-500/5 to-transparent border-primary/20">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  {contactInfo.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <a
                            href={item.href}
                            className="text-foreground font-medium hover:text-primary transition-colors"
                            data-testid={`link-contact-${item.label.toLowerCase()}`}
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-foreground font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full bg-card/80 backdrop-blur-sm border-border/50">
                <h3 className="text-2xl font-bold mb-6">Connect with Me</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities 
                  to be part of your vision. Feel free to reach out through any of the channels 
                  or connect with me on social platforms.
                </p>
                <div className="flex flex-wrap gap-3">
                  {socialLinks.map((link) => (
                    <Button
                      key={link.label}
                      variant="outline"
                      className="gap-2"
                      asChild
                    >
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-testid={`link-social-${link.label.toLowerCase()}`}
                      >
                        <link.icon className="w-4 h-4" />
                        {link.label}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-border/50">
                  <Button
                    size="lg"
                    className="w-full gap-2"
                    asChild
                  >
                    <a
                      href="mailto:ayush8000342870@gmail.com"
                      data-testid="button-send-email"
                    >
                      <Mail className="w-4 h-4" />
                      Send Me an Email
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
