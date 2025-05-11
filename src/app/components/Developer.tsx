"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useNavigation } from "../context/NavigationContext";

const devSkills = [
  {
    category: "Frontend",
    skills: [
      { name: "React", level: 90, icon: "⚛️" },
      { name: "Next.js", level: 85, icon: "▲" },
      { name: "TypeScript", level: 80, icon: "📘" },
      { name: "Tailwind CSS", level: 95, icon: "🎨" },
    ]
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "Express", level: 80, icon: "🚂" },
      { name: "MongoDB", level: 75, icon: "🍃" },
      { name: "PostgreSQL", level: 70, icon: "🐘" },
    ]
  },
  {
    category: "Tools & Others",
    skills: [
      { name: "Git", level: 90, icon: "📦" },
      { name: "Docker", level: 75, icon: "🐳" },
      { name: "AWS", level: 70, icon: "☁️" },
      { name: "CI/CD", level: 80, icon: "🔄" },
    ]
  }
];

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB",
    image: "/projects/ecommerce.png",
    technologies: ["Next.js", "Node.js", "MongoDB", "Tailwind CSS"],
    link: "#"
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates",
    image: "/projects/taskmanager.png",
    technologies: ["React", "Firebase", "Material-UI"],
    link: "#"
  },
  {
    title: "Portfolio Website",
    description: "A modern portfolio website with interactive animations",
    image: "/projects/portfolio.png",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS"],
    link: "#"
  }
];

const Developer = () => {
  const { scrollToSection } = useNavigation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-20">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Developer Skills & Projects
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Full-stack developer with expertise in modern web technologies and frameworks.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Frontend Development",
              description: "React, Next.js, TypeScript, Tailwind CSS, and modern JavaScript",
              icon: "/icons/frontend.png"
            },
            {
              title: "Backend Development",
              description: "Node.js, Express, Python, Django, and RESTful APIs",
              icon: "/icons/backend.png"
            },
            {
              title: "Database Management",
              description: "MongoDB, PostgreSQL, MySQL, and Redis",
              icon: "/icons/database.png"
            },
            {
              title: "DevOps & Cloud",
              description: "AWS, Docker, Kubernetes, and CI/CD pipelines",
              icon: "/icons/devops.png"
            },
            {
              title: "Version Control",
              description: "Git, GitHub, GitLab, and collaborative development",
              icon: "/icons/git.png"
            },
            {
              title: "Testing & Quality",
              description: "Jest, React Testing Library, and E2E testing",
              icon: "/icons/testing.png"
            }
          ].map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Image
                  src={skill.icon}
                  alt={skill.title}
                  width={40}
                  height={40}
                  className="mr-4"
                />
                <h3 className="text-xl font-semibold">{skill.title}</h3>
              </div>
              <p className="text-gray-600">{skill.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "E-commerce Platform",
                description: "A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB",
                image: "/projects/ecommerce.png",
                tags: ["Next.js", "Node.js", "MongoDB", "Stripe"]
              },
              {
                title: "Task Management App",
                description: "A collaborative task management application with real-time updates",
                image: "/projects/taskmanager.png",
                tags: ["React", "Firebase", "Material-UI"]
              },
              {
                title: "Portfolio Website",
                description: "A modern portfolio website showcasing projects and skills",
                image: "/projects/portfolio.png",
                tags: ["Next.js", "Tailwind CSS", "Framer Motion"]
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4"
        >
          <motion.button
            onClick={() => scrollToSection('qa')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            View QA Skills
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('experience')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            View Experience
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Developer; 