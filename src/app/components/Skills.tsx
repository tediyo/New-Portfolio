"use client";

import { motion } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { HoverEffect } from "./ui/card";

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