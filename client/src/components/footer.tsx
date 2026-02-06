import { motion } from "framer-motion";
import { Code2, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "https://github.com/70ayush-dev", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/ayush-singhdev", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ayush8000342870@gmail.com", label: "Email" },
  ];

  return (
    <footer className="py-12 border-t border-border/50 bg-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left space-y-2">
            <a
              href="#"
              className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
            >
              Ayush Singh
            </a>
            <p className="text-sm text-muted-foreground">
              Building the future, one line at a time
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <Button
                key={link.label}
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                asChild
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              </Button>
            ))}
          </div>

          <div className="text-sm text-muted-foreground text-center md:text-right space-y-1">
            <div className="flex items-center justify-center md:justify-end gap-2">
              <Code2 className="w-4 h-4 text-primary" />
              <span>&copy; 2026 Ayush Singh. All rights reserved.</span>
            </div>
            <p className="text-xs opacity-70">Designed by Ayush Singh</p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
