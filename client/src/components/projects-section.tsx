import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Database, Mail, BarChart3, MessageSquare } from "lucide-react";

const projects = [
  {
    title: "AI-Powered CRM Automation",
    description: "Developed GPT-based workflow system automating 70% of routine CRM tasks, processing 1000+ daily customer interactions with intelligent response generation.",
    icon: Bot,
    gradient: "from-violet-500 to-purple-600",
    tags: ["OpenAI GPT", "PHP", "REST API", "CRM"],
    metrics: "70% automation rate",
  },
  {
    title: "AI Property Inquiry Assistant",
    description: "Built intelligent email assistant for Bonafinca Real Estate generating contextual responses, reducing manual inquiry handling by 60%.",
    icon: Mail,
    gradient: "from-blue-500 to-cyan-600",
    tags: ["AI", "Email Automation", "Real Estate", "TYPO3"],
    metrics: "60% reduction in manual handling",
  },
  {
    title: "Enterprise Data Migration",
    description: "Created robust ETL pipelines importing 300k+ CSV/XML records with validation, error handling, and rollback mechanisms for enterprise clients.",
    icon: Database,
    gradient: "from-emerald-500 to-teal-600",
    tags: ["ETL", "MySQL", "Data Processing", "PHP"],
    metrics: "300k+ records processed",
  },
  {
    title: "Newsletter Platform",
    description: "Developed TYPO3 newsletter system with analytics, automated campaigns, and A/B testing capabilities, improving open rates by 45%.",
    icon: BarChart3,
    gradient: "from-orange-500 to-amber-600",
    tags: ["TYPO3", "Analytics", "A/B Testing", "Email"],
    metrics: "45% improved open rates",
  },
  {
    title: "Real-time Messaging System",
    description: "Implemented Pusher-based live notifications for enterprise dashboards, reducing response time by 50% with real-time updates.",
    icon: MessageSquare,
    gradient: "from-rose-500 to-pink-600",
    tags: ["Pusher", "WebSockets", "Real-time", "Dashboard"],
    metrics: "50% faster response time",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-muted/30 relative">
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
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Key Projects & Achievements
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Impactful solutions that delivered measurable results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={index === 0 ? "md:col-span-2 lg:col-span-1" : ""}
            >
              <Card className="p-6 h-full bg-card/80 backdrop-blur-sm border-border/50 group hover-elevate overflow-visible">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform`}>
                  <project.icon className="w-7 h-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  {project.metrics}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs"
                    >
                      {tag}
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
