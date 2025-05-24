"use client";

import { motion } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { HoverEffect } from "./ui/card";
import { IconCloud } from "./ui/IconCloud";

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
    icon: "/icons/frontend.png"
  },
  {
    title: "Backend Development",
    description: "Node.js, Express, Python, Django, and RESTful APIs",
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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Professional Skills
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
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
          <div className="relative w-[400px] h-[400px] rounded-lg border bg-white/50 backdrop-blur-sm">
            <IconCloud images={skillCloudImages} />
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={() => scrollToSection('qa')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            QA Skills
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('developer')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Developer Skills
          </motion.button>
        </div>
      </div>

      {/* QA Section */}
      <div id="qa" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              QA Skills & Expertise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Specialized in ensuring software quality through comprehensive testing methodologies and automation.
            </p>
          </motion.div>
          <HoverEffect items={qaSkills} />
        </div>
      </div>

      {/* Developer Section */}
      <div id="developer" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Developer Skills & Expertise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Full-stack developer with expertise in modern web technologies and frameworks.
            </p>
          </motion.div>
          <HoverEffect items={devSkills} />
        </div>
      </div>
    </div>
  );
} 