import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Code, Database, Globe, Wrench, Cloud, Bot } from "lucide-react";
import {
  SiPhp, SiTypo3, SiLaravel, SiDrupal, SiShopify, SiMysql,
  SiGit, SiGooglecloud, SiOpenai, SiPrestashop, SiJoomla,
  SiHtml5
} from "react-icons/si";

const skillCategories = [
  {
    title: "Languages & Frameworks",
    icon: Code,
    color: "from-violet-500 to-purple-500",
    skills: [
      { name: "PHP", icon: SiPhp },
      { name: "TYPO3 (v11–v13)", icon: SiTypo3 },
      { name: "Laravel", icon: SiLaravel },
      { name: "Drupal", icon: SiDrupal },
      { name: "Extbase", icon: SiTypo3 },
      { name: "Fluid", icon: SiHtml5 }
    ],
  },
  {
    title: "CMS & Platforms",
    icon: Globe,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "TYPO3 Extensions", icon: SiTypo3 },
      { name: "Joomla", icon: SiJoomla },
      { name: "PrestaShop", icon: SiPrestashop },
      { name: "Shopify", icon: SiShopify }
    ],
  },
  {
    title: "APIs & Integration",
    icon: Cloud,
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "REST APIs", icon: Cloud },
      { name: "OpenAI GPT", icon: SiOpenai },
      { name: "Google Cloud", icon: SiGooglecloud },
      { name: "Nylas", icon: Cloud },
      { name: "Chatwoot", icon: Bot },
      { name: "Geolocation", icon: Globe }
    ],
  },
  {
    title: "Database",
    icon: Database,
    color: "from-orange-500 to-amber-500",
    skills: [
      { name: "MySQL", icon: SiMysql },
      { name: "Query Optimization", icon: Database },
      { name: "Big Data Processing", icon: Database }
    ],
  },
  {
    title: "Tools & DevOps",
    icon: Wrench,
    color: "from-rose-500 to-pink-500",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "Cloud Storage", icon: Cloud },
      { name: "Email Automation", icon: Wrench }
    ],
  },
  {
    title: "AI & Automation",
    icon: Bot,
    color: "from-indigo-500 to-violet-500",
    skills: [
      { name: "AI Workflows", icon: SiOpenai },
      { name: "GPT Integration", icon: SiOpenai },
      { name: "CRM Automation", icon: Bot }
    ],
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
                      key={skill.name}
                      variant="secondary"
                      className="text-xs font-medium gap-1.5 py-1"
                    >
                      <skill.icon className="w-3.5 h-3.5" />
                      {skill.name}
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
