"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useNavigation } from "../context/NavigationContext";

export default function QA() {
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
            QA Skills & Expertise
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Specialized in ensuring software quality through comprehensive testing methodologies and automation.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              title: "Test Automation",
              description: "Proficient in Selenium, Cypress, and Playwright for web automation testing",
              icon: "/icons/automation.png"
            },
            {
              title: "API Testing",
              description: "Expert in Postman, REST Assured, and API automation frameworks",
              icon: "/icons/api.png"
            },
            {
              title: "Performance Testing",
              description: "Experience with JMeter and LoadRunner for load and stress testing",
              icon: "/icons/performance.png"
            },
            {
              title: "Mobile Testing",
              description: "Skilled in mobile app testing using Appium and mobile-specific tools",
              icon: "/icons/mobile.png"
            },
            {
              title: "Test Management",
              description: "Proficient in JIRA, TestRail, and other test management tools",
              icon: "/icons/management.png"
            },
            {
              title: "CI/CD Integration",
              description: "Experience integrating tests with Jenkins, GitHub Actions, and other CI tools",
              icon: "/icons/cicd.png"
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

        {/* Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Testing Tools & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Selenium", icon: "/icons/selenium.png" },
              { name: "Postman", icon: "/icons/postman.png" },
              { name: "JMeter", icon: "/icons/jmeter.png" },
              { name: "TestRail", icon: "/icons/testrail.png" },
              { name: "JIRA", icon: "/icons/jira.png" },
              { name: "Git", icon: "/icons/git.png" },
              { name: "Jenkins", icon: "/icons/jenkins.png" },
              { name: "Cypress", icon: "/icons/cypress.png" }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center"
              >
                <Image
                  src={tool.icon}
                  alt={tool.name}
                  width={60}
                  height={60}
                  className="mb-2"
                />
                <span className="text-sm font-medium">{tool.name}</span>
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
}
