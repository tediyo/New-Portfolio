"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useNavigation } from "../context/NavigationContext";
import { CardSpotlight } from "./ui/card-spotlight";
import { cn } from "@/lib/utils";

const qaProjects = [
  {
    title: "E-commerce Platform Testing",
    description: "Comprehensive test automation suite for a large-scale e-commerce platform using Selenium and TestNG",
    image: "/projects/qa-ecommerce.png",
    technologies: ["Selenium", "TestNG", "Java", "Jenkins"],
    link: "#"
  },
  {
    title: "API Testing Framework",
    description: "Built a robust API testing framework using REST Assured and integrated it with CI/CD pipeline",
    image: "/projects/qa-api.png",
    technologies: ["REST Assured", "Postman", "Java", "GitHub Actions"],
    link: "#"
  },
  {
    title: "Mobile App Testing",
    description: "End-to-end testing of a cross-platform mobile application using Appium and TestNG",
    image: "/projects/qa-mobile.png",
    technologies: ["Appium", "TestNG", "Java", "Android Studio"],
    link: "#"
  }
];

const devProjects = [
  {
    title: "Task Management App",
    description: "Full-stack task management application with real-time updates and team collaboration features",
    image: "/projects/dev-task.png",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    link: "#"
  },
  {
    title: "E-commerce Platform",
    description: "Modern e-commerce platform with payment integration and inventory management",
    image: "/projects/dev-ecommerce.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Stripe"],
    link: "#"
  },
  {
    title: "Portfolio Website",
    description: "Interactive portfolio website with modern animations and responsive design",
    image: "/projects/dev-portfolio.png",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    link: "#"
  }
];

export default function Projects() {
  const { scrollToSection } = useNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Featured Projects
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Showcasing my work in both Quality Assurance and Software Development
        </p>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex justify-center gap-4">
          <motion.button
            onClick={() => scrollToSection('qa-projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            QA Projects
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('dev-projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Developer Projects
          </motion.button>
        </div>
      </div>

      {/* QA Projects Section */}
      <div id="qa-projects" className="scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              QA Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Showcasing my expertise in test automation and quality assurance
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {qaProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CardSpotlight className="h-full">
                  <div className="bg-black rounded-2xl overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Developer Projects Section */}
      <div id="dev-projects" className="scroll-mt-20 mt-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Developer Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Showcasing my full-stack development skills and modern web applications
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {devProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <CardSpotlight className="h-full">
                  <div className="bg-black rounded-2xl overflow-hidden h-full">
                    <div className="relative h-48">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-gray-400 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 