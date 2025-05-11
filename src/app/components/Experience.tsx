"use client";

import { motion } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";

export default function Experience() {
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
            Experience & Education
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A journey through my professional experience and educational background.
          </p>
        </motion.div>

        {/* Work Experience */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Work Experience</h2>
          <div className="space-y-8">
            {[
              {
                title: "Senior Software Developer",
                company: "Tech Solutions Inc.",
                period: "2022 - Present",
                description: "Leading development of enterprise applications using React, Node.js, and cloud technologies.",
                achievements: [
                  "Architected and implemented microservices architecture",
                  "Led a team of 5 developers in agile environment",
                  "Reduced system response time by 40%"
                ]
              },
              {
                title: "Software Developer",
                company: "Digital Innovations",
                period: "2020 - 2022",
                description: "Full-stack development of web applications and RESTful APIs.",
                achievements: [
                  "Developed and maintained 10+ client projects",
                  "Implemented CI/CD pipelines",
                  "Mentored junior developers"
                ]
              },
              {
                title: "Junior Developer",
                company: "StartUp Labs",
                period: "2019 - 2020",
                description: "Frontend development and UI/UX implementation.",
                achievements: [
                  "Built responsive web interfaces",
                  "Collaborated with design team",
                  "Participated in code reviews"
                ]
              }
            ].map((job, index) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">{job.period}</span>
                </div>
                <p className="text-gray-600 mb-4">{job.description}</p>
                <ul className="list-disc list-inside space-y-2">
                  {job.achievements.map((achievement, i) => (
                    <li key={i} className="text-gray-600">{achievement}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Education</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                degree: "Master of Computer Science",
                school: "University of Technology",
                period: "2018 - 2020",
                description: "Specialized in Software Engineering and Artificial Intelligence",
                courses: [
                  "Advanced Algorithms",
                  "Machine Learning",
                  "Cloud Computing"
                ]
              },
              {
                degree: "Bachelor of Science in Computer Science",
                school: "State University",
                period: "2014 - 2018",
                description: "Focused on Software Development and Database Systems",
                courses: [
                  "Data Structures",
                  "Web Development",
                  "Database Design"
                ]
              }
            ].map((edu, index) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                <p className="text-gray-600 mb-1">{edu.school}</p>
                <p className="text-sm text-gray-500 mb-4">{edu.period}</p>
                <p className="text-gray-600 mb-4">{edu.description}</p>
                <div>
                  <h4 className="font-medium mb-2">Key Courses:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {edu.courses.map((course, i) => (
                      <li key={i} className="text-gray-600">{course}</li>
                    ))}
                  </ul>
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
            onClick={() => scrollToSection('developer')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            View Developer Skills
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 