"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { useRef, useState, useEffect } from "react";

export default function Experience() {
  const { scrollToSection } = useNavigation();
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const timelineItems = [
    {
      type: "work",
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
      type: "education",
      title: "Master of Computer Science",
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
      type: "work",
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
      type: "education",
      title: "Bachelor of Science in Computer Science",
      school: "State University",
      period: "2014 - 2018",
      description: "Focused on Software Development and Database Systems",
      courses: [
        "Data Structures",
        "Web Development",
        "Database Design"
      ]
    },
    {
      type: "work",
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
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-20" ref={containerRef}>
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

        {/* Timeline Container */}
        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          {timelineItems.map((item, index) => (
            <div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full bg-blue-100 border border-blue-300 p-2" />
                </div>
                <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-gray-500">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-gray-500">
                  {item.title}
                </h3>
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-gray-600">{item.company || item.school}</p>
                    </div>
                    <span className="text-sm text-gray-500">{item.period}</span>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  {item.achievements ? (
                    <ul className="list-disc list-inside space-y-2">
                      {item.achievements.map((achievement, i) => (
                        <li key={i} className="text-gray-600">{achievement}</li>
                      ))}
                    </ul>
                  ) : (
                    <div>
                      <h4 className="font-medium mb-2">Key Courses:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {item.courses.map((course, i) => (
                          <li key={i} className="text-gray-600">{course}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-blue-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-500 via-blue-400 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mt-16"
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