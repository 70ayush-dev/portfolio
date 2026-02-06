import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "PHP / TYPO3 Developer",
    company: "NET2TYPO Web Services",
    location: "Bhavnagar, Gujarat, India",
    period: "October 2023 – Present",
    description: [
      "Architected 10+ custom TYPO3 extensions with complex backend modules and scheduler tasks",
      "Engineered data import pipelines processing 300k+ records, reducing execution time by 60%",
      "Implemented AI-powered automation using OpenAI GPT, improving efficiency by 40%",
      "Built AI Property Email Inquiry Assistant, automating customer responses",
      "Integrated REST APIs, Pusher messaging, and Chatwoot CRM serving 50k+ monthly users",
    ],
    tags: ["TYPO3", "PHP", "OpenAI", "REST APIs", "MySQL"],
  },
  {
    type: "work",
    title: "PHP Developer",
    company: "Apex Software House",
    location: "Gujarat, India",
    period: "January 2023 – March 2023",
    description: [
      "Contributed to scalable Drupal-based CMS projects with custom modules",
      "Utilized Git version control workflows for efficient team collaboration",
      "Enhanced core functionalities in agile environments",
    ],
    tags: ["Drupal", "PHP", "Git", "CMS"],
  },
  {
    type: "education",
    title: "Bachelor of Technology (B.Tech)",
    company: "Parul University",
    location: "Gujarat, India",
    period: "2018 – 2022",
    description: [
      "Computer Science and Engineering",
      "Focused on software development and system design",
    ],
    tags: ["Computer Science", "Engineering"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase">
            Career Path
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
            Experience & Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and academic background
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-400 to-pink-400" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="flex-1 md:text-right pl-8 md:pl-0 md:pr-8">
                  {index % 2 === 0 && (
                    <ExperienceCard exp={exp} />
                  )}
                </div>

                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-background border-4 border-primary flex items-center justify-center z-10">
                  {exp.type === "work" ? (
                    <Briefcase className="w-5 h-5 text-primary" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-primary" />
                  )}
                </div>

                <div className="flex-1 pl-8">
                  {index % 2 !== 0 && (
                    <ExperienceCard exp={exp} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ exp }: { exp: typeof experiences[0] }) {
  return (
    <Card className="p-6 bg-card/80 backdrop-blur-sm border-border/50 text-left hover-elevate overflow-visible">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Calendar className="w-4 h-4" />
        <span>{exp.period}</span>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-1">{exp.title}</h3>
      <div className="flex items-center gap-2 text-primary font-medium mb-1">
        {exp.company}
      </div>
      <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
        <MapPin className="w-3 h-3" />
        <span>{exp.location}</span>
      </div>
      <ul className="space-y-2 mb-4">
        {exp.description.map((item, i) => (
          <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-2">
        {exp.tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-xs">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
