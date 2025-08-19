"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { IconCloud } from "./ui/IconCloud";
import SkillModal from "./ui/SkillModal";
import { 
  TestTube, 
  Globe, 
  Gauge, 
  Smartphone, 
  ClipboardList, 
  GitBranch,
  Code,
  Database,
  Cloud,
  GitCommit,
  Bug
} from "lucide-react";

interface Skill {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  color?: string;
  gradient?: string;
}

const qaSkills: Skill[] = [
  {
    title: "Test Automation",
    description: "Proficient in Selenium, Cypress, and Playwright for web automation testing",
    link: "#qa",
    icon: <TestTube className="w-6 h-6" />
  },
  {
    title: "API Testing",
    description: "Expert in Postman, REST Assured, and API automation frameworks",
    link: "#qa",
    icon: <Globe className="w-6 h-6" />
  },
  {
    title: "Performance Testing",
    description: "Experience with JMeter and LoadRunner for load and stress testing",
    link: "#qa",
    icon: <Gauge className="w-6 h-6" />
  },
  {
    title: "Mobile Testing",
    description: "Skilled in mobile app testing using Appium and mobile-specific tools",
    link: "#qa",
    icon: <Smartphone className="w-6 h-6" />
  },
  {
    title: "Test Management",
    description: "Proficient in JIRA, TestRail, and other test management tools",
    link: "#qa",
    icon: <ClipboardList className="w-6 h-6" />
  },
  {
    title: "CI/CD Integration",
    description: "Experience integrating tests with Jenkins, GitHub Actions, and other CI tools",
    link: "#qa",
    icon: <GitBranch className="w-6 h-6" />
  }
];

const devSkills: Skill[] = [
  {
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, Tailwind CSS, and modern JavaScript",
    link: "#developer",
    icon: <Code className="w-6 h-6" />,
    color: "from-blue-500 to-blue-600",
    gradient: "from-blue-500/20 to-blue-600/20"
  },
  {
    title: "Backend Development",
    description: "Node.js, Express, Python, Django, and RESTful APIs",
    link: "#developer",
    icon: <Database className="w-6 h-6" />
  },
  {
    title: "Database Management",
    description: "MongoDB, PostgreSQL, MySQL, and Redis",
    link: "#developer",
    icon: <Database className="w-6 h-6" />
  },
  {
    title: "DevOps & Cloud",
    description: "AWS, Docker, Kubernetes, and CI/CD pipelines",
    link: "#developer",
    icon: <Cloud className="w-6 h-6" />
  },
  {
    title: "Version Control",
    description: "Git, GitHub, GitLab, and collaborative development",
    link: "#developer",
    icon: <GitCommit className="w-6 h-6" />
  },
  {
    title: "Testing & Quality",
    description: "Jest, React Testing Library, and E2E testing",
    link: "#developer",
    icon: <Bug className="w-6 h-6" />
  }
];

// Skill cloud images with tech stack icons
const skillCloudImages = [
  // Frontend Development
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
  
  // Backend Development
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  
  // Database
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  
  // Testing & QA
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jest/jest-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cypress/cypress-original.svg",
  "https://playwright.dev/img/playwright-logo.svg",
  "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
  "https://www.vectorlogo.zone/logos/appiumio/appiumio-icon.svg",
  "https://www.vectorlogo.zone/logos/newman/newman-icon.svg",
  "https://www.vectorlogo.zone/logos/saucelabs/saucelabs-icon.svg",
  "https://www.vectorlogo.zone/logos/browserstack/browserstack-icon.svg",
  
  // DevOps & Cloud
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
  
  // Tools & Others
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/webpack/webpack-original.svg",
  
  // Additional Tech Stack
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg",
  "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/materialui/materialui-original.svg"
];

export default function Skills() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSkillsModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <h1 className="text-5xl font-bold mb-6 text-primary">
          Professional Skills
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
          Comprehensive expertise in both Quality Assurance and Software Development
        </p>
        
        {/* Skills Button */}
        <motion.button
          onClick={openSkillsModal}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-primary-foreground px-12 py-4 rounded-full hover:shadow-lg transition-all duration-300 text-lg font-semibold"
        >
          View All Skills
        </motion.button>
      </motion.div>

      {/* Icon Cloud Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 mb-16"
      >
        <div className="flex justify-center">
          <div className="relative w-[400px] h-[400px] rounded-lg border border-border bg-background/90 backdrop-blur-sm overflow-hidden">
            <div className="relative z-10 w-full h-full">
              <IconCloud images={skillCloudImages} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Skills Modal */}
      <SkillModal
        isOpen={isModalOpen}
        onClose={closeModal}
        qaSkills={qaSkills}
        devSkills={devSkills}
      />
    </div>
  );
} 