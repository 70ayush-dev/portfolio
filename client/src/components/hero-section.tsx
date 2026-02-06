import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Linkedin, Mail, MapPin } from "lucide-react";
import { ParticleCanvas } from "./particle-canvas";

export function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector("#about");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="text-foreground">Hi, I'm </span>
            <span className="bg-gradient-to-r from-primary via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Ayush Singh
            </span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium text-muted-foreground mb-4"
          >
            Senior PHP & TYPO3 Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            Building scalable enterprise CMS solutions, custom extensions, and
            AI-powered automation systems with 2+ years of experience
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-2 text-muted-foreground mb-8"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Bhavnagar, Gujarat, India</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap items-center justify-center gap-4 mb-12 pointer-events-auto"
          >
            <Button
              size="lg"
              className="gap-2 rounded-full px-8"
              asChild
            >
              <a href="/resume.pdf" download="Ayush_Singh_Resume.pdf">
                <ArrowDown className="w-4 h-4" />
                Download Resume
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full px-8"
              onClick={() => {
                const element = document.querySelector("#contact");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              data-testid="button-get-in-touch"
            >
              <Mail className="w-4 h-4" />
              Get in Touch
            </Button>
            <Button
              size="lg"
              variant="ghost"
              className="gap-2 rounded-full px-8"
              asChild
            >
              <a
                href="https://linkedin.com/in/ayush-singhdev"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </Button>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{
              opacity: { delay: 0.8 },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            onClick={scrollToAbout}
            className="text-muted-foreground hover:text-foreground transition-colors pointer-events-auto"
            data-testid="button-scroll-down"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
