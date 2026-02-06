import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Code2, Database, Cpu, Zap } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "2+ Years",
    description: "Professional Experience",
  },
  {
    icon: Database,
    title: "300k+",
    description: "Records Processed",
  },
  {
    icon: Cpu,
    title: "10+",
    description: "Custom Extensions",
  },
  {
    icon: Zap,
    title: "40%",
    description: "Efficiency Improvement",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">
              About Me
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              Crafting Digital Excellence
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Passionate about building robust, scalable solutions that make a difference
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-semibold mb-4">Professional Journey</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Senior PHP and TYPO3 Developer specializing in enterprise CMS solutions. 
                  I architect custom extensions, build high-performance data pipelines 
                  processing 300k+ records, and integrate AI-powered automation systems 
                  that transform business workflows.
                </p>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-border/50">
                <h3 className="text-xl font-semibold mb-4">My Approach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I believe in writing clean, maintainable code that scales. From REST APIs 
                  to AI integrations with OpenAI GPT, I focus on delivering solutions that 
                  not only meet requirements but exceed expectations, always keeping 
                  performance and user experience at the forefront.
                </p>
              </Card>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="p-6 text-center bg-gradient-to-br from-primary/5 to-purple-500/5 border-primary/10 hover-elevate">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground">{item.description}</div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
