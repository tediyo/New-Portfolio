"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { useRef, useState, useEffect } from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

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
    },{
      type: "work",
      title: "Software Developerrrrrrrrrrrrrrrrrrr",
      company: "Digital Innovations",
      period: "2020 - 2022",
      description: "Full-stack development of web applications and RESTful APIs.",
      achievements: [
        "Developed and maintained 10+ client projects",
        "Implemented CI/CD pipelines",
        "Mentored junior developers"

      ],
      color: "from-orange-500 to-orange-600",
      gradient: "from-orange-500/20 to-orange-600/20"
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
    <div className="min-h-screen bg-background py-12" ref={containerRef}>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold mb-3 text-primary">
            Experience & Education
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
            A journey through my professional experience and educational background.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div ref={ref} className="relative max-w-[1200px] mx-auto pb-12">
          {timelineItems.map((item, index) => (
            <div key={index}>
              {/* Add horizontal line before education items */}
              {item.type === "education" && index > 0 && (
                <div className="relative my-8">
                  <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent dark:via-yellow-500"></div>
                  <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-4">
                    <span className="text-primary dark:text-yellow-500 font-semibold text-base">Education</span>
                  </div>
                </div>
              )}
              
              <div className="flex justify-start pt-6 md:pt-20 md:gap-6">
                <div className="sticky flex flex-col md:flex-row z-40 items-center top-32 self-start max-w-xs lg:max-w-sm md:w-full">
                  <div className="h-8 absolute left-3 md:left-3 w-8 rounded-full bg-background flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-primary/20 dark:bg-yellow-500/20 border border-primary/30 dark:border-yellow-500/30 p-1.5" />
                  </div>
                  <h3 className="hidden md:block text-lg md:pl-16 md:text-3xl font-bold text-muted-foreground">
                    {item.title}
                  </h3>
                </div>

                <div className="relative pl-16 pr-4 md:pl-4 w-full">
                  <h3 className="md:hidden block text-xl mb-3 text-left font-bold text-muted-foreground">
                    {item.title}
                  </h3>
                  <CardContainer className="w-full">
                    <CardBody className="bg-background relative group/card hover:shadow-2xl hover:shadow-primary/[0.1] dark:hover:shadow-yellow-500/[0.1] border-border dark:border-yellow-500/30 w-full md:w-[500px] lg:w-[700px] h-auto min-h-[250px] rounded-xl p-6 border">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <CardItem
                            translateZ="50"
                            className="text-xl font-bold text-foreground mb-3"
                          >
                            {item.title}
                          </CardItem>
                          <CardItem
                            as="p"
                            translateZ="60"
                            className="text-muted-foreground text-base mt-2"
                          >
                            {item.company || item.school}
                          </CardItem>
                          <CardItem
                            translateZ="40"
                            className="text-muted-foreground mt-4 text-base"
                          >
                            {item.description}
                          </CardItem>
                        </div>
                        <div>
                          {item.achievements ? (
                            <CardItem
                              translateZ="30"
                              className="mt-6"
                            >
                              <ul className="list-disc list-inside space-y-2">
                                {item.achievements.map((achievement, i) => (
                                  <li key={i} className="text-muted-foreground text-base">{achievement}</li>
                                ))}
                              </ul>
                            </CardItem>
                          ) : (
                            <CardItem
                              translateZ="30"
                              className="mt-6"
                            >
                              <h4 className="font-medium mb-3 text-foreground text-lg">Key Courses:</h4>
                              <ul className="list-disc list-inside space-y-2">
                                {item.courses.map((course, i) => (
                                  <li key={i} className="text-muted-foreground text-base">{course}</li>
                                ))}
                              </ul>
                            </CardItem>
                          )}
                          <CardItem
                            translateZ="20"
                            className="text-sm text-muted-foreground mt-6"
                          >
                            {item.period}
                          </CardItem>
                        </div>
                      </div>
                    </CardBody>
                  </CardContainer>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-6 left-6 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-primary/20 dark:via-yellow-500/20 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-primary dark:from-yellow-500 via-primary/80 dark:via-yellow-500/80 to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mt-8"
        >
          <motion.button
            onClick={() => scrollToSection('developer')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-primary-foreground px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 text-sm"
          >
            View Developer Skills
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-muted text-muted-foreground px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 text-sm"
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 