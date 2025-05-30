"use client";

import { motion } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useState, useRef, useEffect } from "react";
import { WarpBackground } from "@/components/magicui/warp-background";
import Image from "next/image";

const educationData = [
  {
    degree: "Master of Science in Computer Science",
    school: "Stanford University",
    year: "2020 - 2022",
    description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.",
    courses: ["Advanced Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"],
    gpa: "3.9/4.0",
    certificate: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1000&auto=format&fit=crop"
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    school: "MIT",
    year: "2016 - 2020",
    description: "Focused on Software Development and Quality Assurance. Active member of the Computer Science Club.",
    courses: ["Software Engineering", "Database Systems", "Web Development", "Software Testing"],
    gpa: "3.8/4.0",
    certificate: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1000&auto=format&fit=crop"
  },
  {
    degree: "Associate Degree in Information Technology",
    school: "Community College",
    year: "2014 - 2016",
    description: "Foundation in IT and basic programming concepts. Participated in various coding competitions.",
    courses: ["Introduction to Programming", "Networking", "Operating Systems", "Web Design"],
    gpa: "3.7/4.0",
    certificate: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function Education() {
  const { scrollToSection } = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: currentIndex * carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  return (
    <WarpBackground>
      <div className="min-h-screen py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-500 to-yellow-400 bg-clip-text text-transparent">
            Education
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            My academic journey and qualifications
          </p>
        </motion.div>

        {/* Education Cards Carousel */}
        <div className="max-w-5xl mx-auto px-4 relative">
          <div 
            ref={carouselRef}
            className="overflow-hidden relative"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex transition-transform duration-300 ease-in-out">
              {educationData.map((edu, index) => (
                <div 
                  key={edu.degree} 
                  className="w-full flex-shrink-0 px-4"
                  style={{ minWidth: '100%' }}
                >
                  <CardContainer className="w-full max-w-2xl mx-auto">
                    <CardBody className="bg-transparent backdrop-blur-[0px] relative group/card dark:hover:shadow-2xl dark:hover:shadow-yellow-500/[0.1] dark:bg-black/40 border-yellow-500/20 w-full h-full rounded-xl p-6 border">
                      <div className="flex flex-col lg:flex-row gap-6">
                        {/* Education Info */}
                        <div className="flex-1">
                          <CardItem
                            translateZ="100"
                            className="text-xl font-bold text-gray-800 dark:text-white"
                          >
                            {edu.degree}
                          </CardItem>
                          <CardItem
                            translateZ="80"
                            className="text-gray-600 dark:text-gray-300 text-sm mt-2"
                          >
                            {edu.school}
                          </CardItem>
                          <CardItem
                            translateZ="60"
                            className="text-yellow-500 dark:text-yellow-400 text-sm mt-1"
                          >
                            {edu.year}
                          </CardItem>
                          <CardItem
                            translateZ="40"
                            className="text-gray-600 dark:text-gray-300 text-sm mt-4"
                          >
                            {edu.description}
                          </CardItem>
                          <CardItem
                            translateZ="30"
                            className="mt-4"
                          >
                            <div className="flex flex-wrap gap-2">
                              {edu.courses.map((course) => (
                                <span
                                  key={course}
                                  className="px-3 py-1 bg-yellow-500/10 text-yellow-500 dark:text-yellow-400 rounded-full text-sm hover:bg-yellow-500/20 transition-colors duration-300"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </CardItem>
                          <CardItem
                            translateZ="20"
                            className="mt-4 text-right text-sm font-semibold text-yellow-500 dark:text-yellow-400"
                          >
                            GPA: {edu.gpa}
                          </CardItem>
                        </div>

                        {/* Certificate Display */}
                        <CardItem
                          translateZ="50"
                          className="relative w-full lg:w-64 aspect-[3/4] rounded-xl overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl backdrop-blur-sm border border-yellow-500/20 transform transition-all duration-500 group-hover:scale-105"></div>
                          <div className="relative h-full w-full rounded-xl overflow-hidden">
                            <Image
                              src={edu.certificate}
                              alt={`${edu.degree} Certificate`}
                              fill
                              className="object-cover transition-transform duration-500 hover:scale-110"
                              sizes="(max-width: 768px) 100vw, 256px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-sm text-yellow-300">View Certificate</p>
                            </div>
                          </div>
                          <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                        </CardItem>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/0 to-yellow-500/0 group-hover/card:from-yellow-500/5 group-hover/card:via-yellow-500/10 group-hover/card:to-yellow-500/5 transition-all duration-500 rounded-xl"></div>
                    </CardBody>
                  </CardContainer>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Dot Indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {educationData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-yellow-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Section Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center gap-4 mt-16"
          >
            <motion.button
              onClick={() => scrollToSection('experience')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
            >
              View Experience
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
    </WarpBackground>
  );
} 