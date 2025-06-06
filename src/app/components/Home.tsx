// components/Home.js
"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { useState, useEffect } from "react";
import { EvervaultProvider, Card } from "@evervault/react";
import { SkillCard } from "./CardPattern";

// Add this new component before the Home component
const StatsCounter = ({ end, duration = 2 }: { end: number, duration?: number }) => {
  const [count, setCount] = useState(1);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      setCount(Math.max(1, Math.floor(progress * end)));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  const progress = (count / end) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg className="w-24 h-24 -rotate-90">
        {/* Background circle */}
        <circle
          className="text-muted"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="48"
          cy="48"
        />
        {/* Progress circle */}
        <circle
          className="text-primary"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="48"
          cy="48"
        />
      </svg>
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute text-2xl font-bold text-primary"
      >
        {count}+
      </motion.span>
    </div>
  );
};

// Add springConfig before the StatsCard3D component
const springConfig = { damping: 15, stiffness: 150 };

// Add this new component after the StatsCounter component and before the Home component
const StatsCard3D = ({ children, color, gradient }: { children: React.ReactNode, color: string, gradient: string }) => {
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
          className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-border"
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
            className="text-foreground"
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

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
      description: "Experienced Full-Stack Developer with 3+ years of expertise in building scalable web applications. Specialized in React, Node.js, and TypeScript. Passionate about creating efficient, user-friendly solutions and maintaining high code quality standards. Proven track record in delivering projects on time while ensuring optimal performance and security.",
      color: "from-blue-500 to-blue-600",
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Technical Skills",
      icon: "⚡",
      description: "Frontend: React, Next.js, TypeScript, Tailwind CSS, Redux\nBackend: Node.js, Express, MongoDB, PostgreSQL\nTesting: Jest, React Testing Library, Cypress\nDevOps: Docker, AWS, CI/CD, Git\nTools: VS Code, Postman, Jira, Figma",
      color: "from-purple-500 to-purple-600",
      gradient: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "QA Expertise",
      icon: "🔍",
      description: "• Comprehensive test planning and strategy development\n• Automated testing using Jest and Cypress\n• API testing with Postman and REST Assured\n• Performance testing with JMeter\n• Bug tracking and quality metrics analysis\n• Continuous Integration testing implementation",
      color: "from-green-500 to-green-600",
      gradient: "from-green-500/20 to-green-600/20"
    },
    {
      title: "Soft Skills",
      icon: "🤝",
      description: "• Strong problem-solving and analytical thinking\n• Excellent communication and team collaboration\n• Agile methodology and project management\n• Time management and deadline-oriented\n• Continuous learning and adaptability\n• Client relationship management",
      color: "from-orange-500 to-orange-600",
      gradient: "from-orange-500/20 to-orange-600/20"
    }
  ];

  // Update the stats array to include colors and gradients
  const stats = [
    {
      title: "Private Companies",
      count: 15,
      icon: "🏢",
      description: "Successfully delivered projects",
      color: "from-green-500 to-blue-600",
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Happy Clients",
      count: 10,
      icon: "👥",
      description: "Satisfied customers",
      color: "from-yellow-500 to-red-600",
      gradient: "from-purple-500/20 to-purple-600/20"
    }
  ];

  // Card hover effect
  const CardHoverEffect = ({ children, color, gradient }: { children: React.ReactNode, color: string, gradient: string }) => {
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
            className="bg-background p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden border border-border"
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
              className="text-foreground"
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  const navigation = [
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Skills", id: "skills" },
    { name: "Education", id: "education" },
    { name: "Experience", id: "experience" },
    { name: "Reviews", id: "reviews" },
    { name: "Contact", id: "contact" }
  ];

  return (
    <EvervaultProvider teamId="YOUR_TEAM_ID" appId="YOUR_APP_ID">
      <div className="min-h-screen bg-background text-foreground">
        {/* Animated Background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 blur-[100px]"></div>
        </div>

        {/* Top Bar */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="w-full flex justify-between items-center px-4 sm:px-6 py-4 shadow-md bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-border"
        >
          <h1 className="text-xl font-bold text-primary">Tewodros</h1>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <motion.button
                  onClick={() => scrollToSection(item.id)}
                  className="hover:text-primary font-medium relative group"
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </motion.button>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent"
          >
            <svg
              className="w-6 h-6 text-foreground"
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
          className="md:hidden overflow-hidden bg-background shadow-lg border-b border-border"
        >
          <div className="flex flex-col space-y-2 p-4">
            {navigation.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  scrollToSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-accent rounded-lg font-medium text-foreground"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item.name}
              </motion.button>
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
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-spin-slow blur-sm"></div>
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-spin-slow"></div>
                
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
                    className="rounded-full border-4 border-background object-cover relative z-10"
                  />
                </motion.div>

                {/* Decorative elements */}
                <motion.div
                  style={{
                    transform: "translateZ(10px)",
                  }}
                  className="absolute -inset-4 rounded-full border-2 border-primary/50"
                />
                <motion.div
                  style={{
                    transform: "translateZ(5px)",
                  }}
                  className="absolute -inset-8 rounded-full border border-primary/30"
                />
              </motion.div>
            </motion.div>

            {/* Intro Text */}
            <div className="text-center md:text-left max-w-xl mt-8 md:mt-0">
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl sm:text-5xl font-bold mb-4 text-primary"
              >
                Hey, I'm Tewodros 👋
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-base sm:text-lg mb-6"
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
                  className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
                >
                  View Skills
                </motion.button>
                <motion.button 
                  onClick={() => scrollToSection('projects')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-secondary text-secondary-foreground px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
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
                    className="w-10 h-10 rounded-full bg-accent flex items-center justify-center hover:bg-accent/80 transition-colors"
                  >
                    <span className="text-accent-foreground">{social[0]}</span>
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
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-primary">
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
                      <h4 className="text-xl font-semibold text-foreground">{card.title}</h4>
                    </div>
                    <motion.div 
                      className="text-muted-foreground whitespace-pre-line leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {card.description}
                    </motion.div>
                  </CardHoverEffect>
                </motion.div>
              ))}
            </div>

            {/* Stats Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <StatsCard3D color={stat.color} gradient={stat.gradient}>
                    <div className="flex flex-col items-center text-center">
                      <motion.span 
                        className="text-4xl mb-4"
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
                        {stat.icon}
                      </motion.span>
                      <h3 className="text-lg font-semibold text-foreground mb-2">{stat.title}</h3>
                      <StatsCounter end={stat.count} />
                      <p className="text-muted-foreground mt-2">{stat.description}</p>
                    </div>
                  </StatsCard3D>
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
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-primary">
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
                    <h4 className="font-semibold text-lg text-foreground">{skill.name}</h4>
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
