"use client";

import { motion } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { HoverEffect } from "./ui/card";
import { IconCloud } from "./ui/IconCloud";
import { FlickeringGrid } from "./magicui/flickering-grid";

const qaSkills = [
  {
    title: "Test Automation",
    description: "Proficient in Selenium, Cypress, and Playwright for web automation testing",
    link: "#qa",
    icon: "/icons/automation.png"
  },
  {
    title: "API Testing",
    description: "Expert in Postman, REST Assured, and API automation frameworks",
    link: "#qa",
    icon: "/icons/api.png"
  },
  {
    title: "Performance Testing",
    description: "Experience with JMeter and LoadRunner for load and stress testing",
    link: "#qa",
    icon: "/icons/performance.png"
  },
  {
    title: "Mobile Testing",
    description: "Skilled in mobile app testing using Appium and mobile-specific tools",
    link: "#qa",
    icon: "/icons/mobile.png"
  },
  {
    title: "Test Management",
    description: "Proficient in JIRA, TestRail, and other test management tools",
    link: "#qa",
    icon: "/icons/management.png"
  },
  {
    title: "CI/CD Integration",
    description: "Experience integrating tests with Jenkins, GitHub Actions, and other CI tools",
    link: "#qa",
    icon: "/icons/cicd.png"
  }
];

const devSkills = [
  {
    title: "Frontend Development",
    description: "React, Next.js, TypeScript, Tailwind CSS, and modern JavaScript",
    link: "#developer",
    icon: "/icons/frontend.png",
    color: "from-blue-500 to-blue-600",
      gradient: "from-blue-500/20 to-blue-600/20"
  },
  {
    title: "Backend Development",
    description: "Node.js, Express, Python, Django, and RESTful hhhhhhhhhhhhhhhhhhhhhh APIs",
    link: "#developer",
    icon: "/icons/backend.png"
  },
  {
    title: "Database Management",
    description: "MongoDB, PostgreSQL, MySQL, and Redis",
    link: "#developer",
    icon: "/icons/database.png"
  },
  {
    title: "DevOps & Cloud",
    description: "AWS, Docker, Kubernetes, and CI/CD pipelines",
    link: "#developer",
    icon: "/icons/devops.png"
  },
  {
    title: "Version Control",
    description: "Git, GitHub, GitLab, and collaborative development",
    link: "#developer",
    icon: "/icons/git.png"
  },
  {
    title: "Testing & Quality",
    description: "Jest, React Testing Library, and E2E testing",
    link: "#developer",
    icon: "/icons/testing.png"
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
  const { scrollToSection } = useNavigation();

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
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Comprehensive expertise in both Quality Assurance and Software Development
        </p>
      </motion.div>

      {/* Icon Cloud Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4 mb-16"
      >
        <div className="flex justify-center">
          <div className="relative w-[400px] h-[400px] rounded-lg border border-border bg-background/90 backdrop-blur-sm overflow-hidden">
            <FlickeringGrid
              className="absolute inset-0 z-0"
              squareSize={4}
              gridGap={6}
              color="hsl(var(--primary))"
              maxOpacity={0.4}
              flickerChance={0.1}
              height={400}
              width={400}
            />
            <div className="relative z-10 w-full h-full">
              <IconCloud images={skillCloudImages} />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="max-w-1xl mx-auto px-4 mb-8">
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={() => scrollToSection('qa')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            QA Skills
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('developer')}
            whileHover={{ scale: 10.05 }}
            whileTap={{ scale: 10.95 }}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Development Skills
          </motion.button>
        </div>
      </div>

      {/* QA Skills Section */}
      <motion.div
        id="qa"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">QA Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {qaSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full max-w-xl mx-auto"
            >
              <HoverEffect
                items={[{
                  title: skill.title,
                  description: skill.description,
                  link: skill.link,
                  icon: skill.icon
                }]}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Development Skills Section */}
      <motion.div
        id="developer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto px-4 mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-foreground">Development Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {devSkills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full max-w-xl mx-auto"
            >
              <HoverEffect
                items={[{
                  title: skill.title,
                  description: skill.description,
                  link: skill.link,
                  icon: skill.icon
                }]}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 