import { motion } from "framer-motion";
import { Code2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border/50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <div className="text-center md:text-left">
            <a
              href="#"
              className="text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent"
              data-testid="link-footer-logo"
            >
              Ayush Singh
            </a>
            <p className="text-sm text-muted-foreground mt-1">
              Senior PHP & TYPO3 Developer
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Code2 className="w-4 h-4 text-primary" />
            <span>&copy; {currentYear} Ayush Singh. All rights reserved.</span>
          </div>

          <div className="text-sm text-muted-foreground" data-testid="text-footer-tagline">
            Building the future, one line at a time
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
