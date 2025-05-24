// components/Home.js
"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { useState } from "react";
import { EvervaultProvider, Card } from "@evervault/react";
import { SkillCard } from "./CardPattern";

export default function Home() {
  const { scrollToSection } = useNavigation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsMenuOpen, setIsProjectsMenuOpen] = useState(false);

  // Add motion values for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Transform mouse movement to rotation values
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  // Add spring physics for smoother movement
  const springConfig = { damping: 15, stiffness: 150 };
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  // Handle mouse movement
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  // Reset position when mouse leaves
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // About cards data
  const aboutCards = [
    {
      title: "Professional Summary",
      icon: "👨‍💻",
      description: "Full-stack developer with expertise in modern web technologies and a passion for creating efficient, scalable solutions.",
      color: "from-blue-500 to-blue-600",
      gradient: "from-blue-500/20 to-blue-600/20",
      cardNumber: "4242 4242 4242 4242"
    },
    {
      title: "Technical Skills",
      icon: "⚡",
      description: "Proficient in React, Node.js, TypeScript, and modern testing frameworks. Strong focus on clean code and best practices.",
      color: "from-purple-500 to-purple-600",
      gradient: "from-purple-500/20 to-purple-600/20",
      cardNumber: "5555 5555 5555 5555"
    },
    {
      title: "QA Expertise",
      icon: "🔍",
      description: "Experienced in automated testing, quality assurance, and ensuring robust software delivery through comprehensive testing strategies.",
      color: "from-green-500 to-green-600",
      gradient: "from-green-500/20 to-green-600/20",
      cardNumber: "3782 8224 6310 0055"
    },
    {
      title: "Soft Skills",
      icon: "🤝",
      description: "Excellent communication, problem-solving abilities, and a collaborative approach to team projects.",
      color: "from-orange-500 to-orange-600",
      gradient: "from-orange-500/20 to-orange-600/20",
      cardNumber: "6011 6011 6011 6011"
    }
  ];

  // Card hover effect
  const CardHoverEffect = ({ children, color, gradient, cardNumber }: { children: React.ReactNode, color: string, gradient: string, cardNumber: string }) => {
    const [isHovered, setIsHovered] = useState(false);
    const cardX = useMotionValue(0);
    const cardY = useMotionValue(0);

    const cardRotateX = useTransform(cardY, [-100, 100], [15, -15]);
    const cardRotateY = useTransform(cardX, [-100, 100], [-15, 15]);

    const cardSpringRotateX = useSpring(cardRotateX, springConfig);
    const cardSpringRotateY = useSpring(cardRotateY, springConfig);

    const handleCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      cardX.set(event.clientX - centerX);
      cardY.set(event.clientY - centerY);
    };

    const handleCardMouseLeave = () => {
      cardX.set(0);
      cardY.set(0);
      setIsHovered(false);
    };

    return (
      <motion.div
        onMouseMove={handleCardMouseMove}
        onMouseLeave={handleCardMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        style={{
          perspective: 1000,
          transformStyle: "preserve-3d",
        }}
        className="relative group"
      >
        <motion.div
          style={{
            rotateX: cardSpringRotateX,
            rotateY: cardSpringRotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative"
        >
          {/* Glow effect */}
          <motion.div
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
            className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 blur-xl rounded-2xl`}
          />
          
          {/* Card content */}
          <motion.div
            animate={{
              scale: isHovered ? 1.02 : 1,
              y: isHovered ? -5 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
          >
            {/* Background gradient */}
            <motion.div
              animate={{
                opacity: isHovered ? 0.1 : 0.05,
              }}
              transition={{ duration: 0.3 }}
              className={`absolute inset-0 bg-gradient-to-br ${gradient}`}
            />
            
            {/* Content wrapper with 3D effect */}
            <motion.div
              style={{
                transform: "translateZ(20px)",
              }}
            >
              {children}
            </motion.div>

            {/* Evervault Card */}
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0,
                y: isHovered ? 0 : 20,
              }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Card
                number={cardNumber}
                expiry="12/25"
                cvc="123"
                theme={{
                  background: "transparent",
                  textColor: "#1F2937",
                  fontFamily: "system-ui",
                  fontSize: "16px",
                  cardNumberColor: "#1F2937",
                  cardExpiryColor: "#1F2937",
                  cardCvcColor: "#1F2937",
                  cardBackground: "rgba(255, 255, 255, 0.1)",
                  cardBorder: "1px solid rgba(255, 255, 255, 0.2)",
                  cardShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <EvervaultProvider teamId="YOUR_TEAM_ID" appId="YOUR_APP_ID">
      <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 text-gray-900">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
        </div>

        {/* Top Bar */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="w-full flex justify-between items-center px-4 sm:px-6 py-4 shadow-md bg-white/80 backdrop-blur-md sticky top-0 z-50"
        >
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Tewodros</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {[
              { name: 'About', id: 'home' },
              { 
                name: 'Projects',
                id: 'projects',
                submenu: [
                  { name: 'QA Projects', id: 'qa-projects' },
                  { name: 'DEV Projects', id: 'dev-projects' }
                ]
              },
              { name: 'Skills', id: 'skills' },
              { name: 'Experience', id: 'experience' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <div key={item.name} className="relative group">
                {item.submenu ? (
                  <>
                    <motion.button
                      onClick={() => setIsProjectsMenuOpen(!isProjectsMenuOpen)}
                      className="hover:text-blue-600 font-medium relative group flex items-center"
                      whileHover={{ scale: 1.05 }}
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 ml-1 transition-transform ${isProjectsMenuOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.button>
                    {isProjectsMenuOpen && (
                      <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                        {item.submenu.map((subItem) => (
                          <button
                            key={subItem.name}
                            onClick={() => {
                              scrollToSection(subItem.id);
                              setIsProjectsMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-blue-600"
                          >
                            {subItem.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <motion.button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-blue-600 font-medium relative group"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </motion.button>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </motion.header>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden bg-white shadow-lg"
        >
          <div className="flex flex-col space-y-2 p-4">
            {[
              { name: 'About', id: 'home' },
              { 
                name: 'Projects',
                id: 'projects',
                submenu: [
                  { name: 'QA Projects', id: 'qa-projects' },
                  { name: 'DEV Projects', id: 'dev-projects' }
                ]
              },
              { name: 'Skills', id: 'skills' },
              { name: 'Experience', id: 'experience' },
              { name: 'Contact', id: 'contact' }
            ].map((item) => (
              <div key={item.name}>
                {item.submenu ? (
                  <>
                    <motion.button
                      onClick={() => setIsProjectsMenuOpen(!isProjectsMenuOpen)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg font-medium flex items-center justify-between"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {item.name}
                      <svg
                        className={`w-4 h-4 transition-transform ${isProjectsMenuOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </motion.button>
                    {isProjectsMenuOpen && (
                      <div className="pl-4 space-y-1">
                        {item.submenu.map((subItem) => (
                          <motion.button
                            key={subItem.name}
                            onClick={() => {
                              scrollToSection(subItem.id);
                              setIsProjectsMenuOpen(false);
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg font-medium"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {subItem.name}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <motion.button
                    onClick={() => {
                      scrollToSection(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.name}
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Main Content */}
        <main className="flex flex-col items-center px-4 sm:px-6 py-12 sm:py-20">
          {/* Profile and Intro Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-center justify-center w-full max-w-6xl gap-8 sm:gap-12 mb-12 sm:mb-20"
          >
            {/* Profile Photo with 3D effect */}
            <motion.div 
              className="relative perspective-1000 w-[250px] sm:w-[300px]"
              style={{
                perspective: 1000,
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <motion.div
                style={{
                  rotateX: springRotateX,
                  rotateY: springRotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative"
              >
                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 animate-spin-slow blur-sm"></div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 animate-spin-slow"></div>
                
                {/* Profile image with 3D effect */}
                <motion.div
                  style={{
                    transform: "translateZ(20px)",
                  }}
                  className="relative"
                >
                  <Image
                    src="/Images/Profile.png"
                    alt="Tewodros Berhanu"
                    width={300}
                    height={300}
                    className="rounded-full border-4 border-white object-cover relative z-10"
                  />
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  style={{
                    transform: "translateZ(10px)",
                  }}
                  className="absolute -inset-4 rounded-full border-2 border-blue-200/50"
                />
                <motion.div
                  style={{
                    transform: "translateZ(5px)",
                  }}
                  className="absolute -inset-8 rounded-full border border-blue-100/30"
                />
              </motion.div>
            </motion.div>

            {/* Intro Text */}
            <div className="text-center md:text-left max-w-xl mt-8 md:mt-0">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
              >
                Hey, I'm Tewodros 👋
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-600 text-base sm:text-lg mb-6"
              >
                A passionate Software Developer & QA Enthusiast. I love building clean interfaces and testing them to perfection.
              </motion.p>

              {/* Interactive Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <motion.button 
                  onClick={() => scrollToSection('skills')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  View Skills
                </motion.button>
                <motion.button 
                  onClick={() => scrollToSection('projects')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-gradient-to-r from-gray-800 to-gray-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  View Projects
                </motion.button>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                className="flex gap-4 mt-8 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {['GitHub', 'LinkedIn', 'Twitter'].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition-colors"
                  >
                    <span className="text-gray-600 hover:text-blue-600">{social[0]}</span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* About Cards Section */}
          <motion.div 
            className="w-full max-w-6xl px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              About Me
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {aboutCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <CardHoverEffect 
                    color={card.color} 
                    gradient={card.gradient}
                    cardNumber={card.cardNumber}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.span 
                        className="text-4xl"
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        {card.icon}
                      </motion.span>
                      <h4 className="text-xl font-semibold">{card.title}</h4>
                    </div>
                    <motion.p 
                      className="text-gray-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {card.description}
                    </motion.p>
                  </CardHoverEffect>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills Preview */}
          <motion.div 
            className="mt-16 sm:mt-20 w-full max-w-6xl px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              Core Skills
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { name: 'Frontend', icon: '🌐' },
                { name: 'Backend', icon: '⚙️' },
                { name: 'Testing', icon: '🔍' },
                { name: 'DevOps', icon: '🚀' }
              ].map((skill) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="h-[300px]"
                >
                  <SkillCard
                    text={skill.icon}
                    className="w-full h-full"
                  />
                  <div className="mt-4 text-center">
                    <h4 className="font-semibold text-lg">{skill.name}</h4>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>
      </div>
    </EvervaultProvider>
  );
}
