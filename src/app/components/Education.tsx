"use client";

import { motion } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { useState, useRef, useEffect } from "react";

const educationData = [
  {
    degree: "Master of Science in Computer Science",
    school: "Stanford University",
    year: "2020 - 2022",
    description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors.",
    courses: ["Advanced Machine Learning", "Deep Learning", "Natural Language Processing", "Computer Vision"],
    gpa: "3.9/4.0"
  },
  {
    degree: "Bachelor of Science in Software Engineering",
    school: "MIT",
    year: "2016 - 2020",
    description: "Focused on Software Development and Quality Assurance. Active member of the Computer Science Club.",
    courses: ["Software Engineering", "Database Systems", "Web Development", "Software Testing"],
    gpa: "3.8/4.0"
  },
  {
    degree: "Associate Degree in Information Technology",
    school: "Community College",
    year: "2014 - 2016",
    description: "Foundation in IT and basic programming concepts. Participated in various coding competitions.",
    courses: ["Introduction to Programming", "Networking", "Operating Systems", "Web Design"],
    gpa: "3.7/4.0"
  }
];

export default function Education() {
  const { scrollToSection } = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-20">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Education
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          My academic journey and qualifications
        </p>
      </motion.div>

      {/* Education Cards Carousel */}
      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Carousel Container */}
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
                <CardContainer className="w-full">
                  <CardBody className="bg-white relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-full rounded-xl p-6 border">
                    <CardItem
                      translateZ="50"
                      className="text-xl font-bold text-neutral-600 dark:text-white"
                    >
                      {edu.degree}
                    </CardItem>
                    <CardItem
                      translateZ="60"
                      className="text-neutral-500 text-sm mt-2 dark:text-neutral-300"
                    >
                      {edu.school}
                    </CardItem>
                    <CardItem
                      translateZ="40"
                      className="text-blue-600 text-sm mt-1"
                    >
                      {edu.year}
                    </CardItem>
                    <CardItem
                      translateZ="30"
                      className="text-neutral-500 text-sm mt-4 dark:text-neutral-300"
                    >
                      {edu.description}
                    </CardItem>
                    <CardItem
                      translateZ="20"
                      className="mt-4"
                    >
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.map((course) => (
                          <span
                            key={course}
                            className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </CardItem>
                    <CardItem
                      translateZ="10"
                      className="mt-4 text-right text-sm font-semibold text-blue-600"
                    >
                      GPA: {edu.gpa}
                    </CardItem>
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
                  ? 'bg-blue-600 scale-125' 
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
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
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
  );
} 