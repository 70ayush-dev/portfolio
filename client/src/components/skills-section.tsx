import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code, Database, Globe, Wrench, Cloud, Bot } from "lucide-react";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    icon: Code,
    color: "from-violet-500 to-purple-500",
    skills: ["PHP", "TYPO3 (v11–v13)", "Laravel", "Drupal", "Extbase", "Fluid"],
  },
  {
    title: "CMS & Platforms",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    skills: ["TYPO3 Extensions", "Backend Modules", "TCA", "Joomla", "PrestaShop", "Shopify"],
  },
  {
    title: "APIs & Integration",
    icon: Cloud,
    color: "from-emerald-500 to-teal-500",
    skills: ["REST APIs", "OpenAI GPT", "Google Cloud Storage", "Pusher", "Nylas", "Chatwoot", "Geolocation"],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-orange-500 to-amber-500",
    skills: ["MySQL", "Query Optimization", "Performance Tuning", "Large-scale Data Processing"],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "from-rose-500 to-pink-500",
    skills: ["Git", "Scheduler Tasks", "Cloud Storage", "Email Automation"],
  },
  {
    title: "AI & Automation",
    icon: Bot,
    color: "from-indigo-500 to-violet-500",
    skills: ["AI-Powered Workflows", "OpenAI GPT Integration", "CRM Automation", "Content Generation"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 bg-muted/30 relative">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">
            Technical Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Skills & Technologies
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building modern enterprise solutions
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Card className="p-6 h-full bg-card/80 backdrop-blur-sm border-border/50 overflow-visible hover-elevate">
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-xs font-medium"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
