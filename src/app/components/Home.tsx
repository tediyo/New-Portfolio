// components/Home.js
"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { useState, useEffect } from "react";
import { EvervaultProvider, Card } from "@evervault/react";
import { SkillCard } from "./CardPattern";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/theme-toggle";

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
      description: "Skilled Software Engineer with 6+ years of experience in both frontend development and QA testing, delivering reliable and scalable solutions across fintech, e-commerce, ERP, and ride-hailing sectors. Proficient in modern web technologies and testing tools, with a strong focus on code quality, performance, and user experience. Adept at bridging the gap between development and QA to ensure smooth, high-impact product delivery.",
      color: "from-blue-500 to-blue-600",
      gradient: "from-blue-500/20 to-blue-600/20"
    },
    {
      title: "Technical Skills",
      icon: "⚡",
      description: <><span className="font-bold text-yellow-400">Languages</span>: Java, JavaScript, TypeScript, CSS3, Sass \n Frameworks & Libraries: React.js, Vue.js, Next.js, React Native, Tailwind CSS, Bootstrap\nDatabases: MySQL, PostgreSQL, MongoDB (basic knowledge)/nVersion Control: Git, GitHub, GitLab\nCloud Platforms: AWS (S3, EC2, Amplify), local cloud services\n CI/CD & Deployment: Vercel, Netlify\n Tools: VS Code, Figma, Postman, Git Bash, Chrome DevTools, Android Studio</>,
      color: "from-purple-500 to-purple-600",
      gradient: "from-purple-500/20 to-purple-600/20"
    },
    {
      title: "QA Expertise",
      icon: "🔍",
      description: "• Testing Types: Functional Testing, UI/UX Testing, Performance Testing, Regression Testing, API TestingAutomation Tools: Selenium, Appium, Playwright, Postman, Newman, JMeter Test Management & Reporting: Jira, TestRail, Bugzilla Cross-Browser & Device Testing: BrowserStack, Sauce Labs, Manual Testing on Multiple DevicesAPI Testing: Postman, Newman",
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
          <nav className="hidden md:flex items-center space-x-6">
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
            <ThemeToggle />
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
                 <span className="text-yellow-400">Tewodros Berhanu</span> 👋
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground text-base sm:text-lg mb-6"
              >
                <span className="font-bold text-yellow-400">Software Developer | Software QA Tester</span>.<br />
                I love building clean interfaces and testing them to perfection.
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
                <motion.a
                  href="/resume.pdf"
                  download
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-secondary text-secondary-foreground px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Resume
                </motion.a>
              </motion.div>

              {/* Social Links */}
              {/* <motion.div 
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
              </motion.div> */}
            </div>
          </motion.div>

          {/* Who Am I Card Section */}
          <motion.div 
            className="w-full max-w-6xl px-4 sm:px-0 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-8 sm:p-12"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 opacity-50"></div>
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              
              {/* Content */}
              <div className="relative z-10">
                <motion.div 
                  className="flex items-center justify-center mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                    👨‍💻
                  </div>
                </motion.div>
                
                <motion.h3 
                  className="text-2xl sm:text-3xl font-bold text-center mb-6 text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  Who Am I?
                </motion.h3>
                
                <motion.div 
                  className="text-center max-w-4xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    I am <span className="font-bold text-primary">Tewodros Berhanu</span>, a passionate and versatile professional who bridges the gap between development and quality assurance. With expertise in both software development and comprehensive testing methodologies, I bring a unique perspective to every project.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <StatsCard3D color="from-blue-500 to-blue-600" gradient="from-blue-500/20 to-blue-600/20">
                        <div className="text-center p-4">
                          <div className="text-3xl mb-2">🚀</div>
                          <h4 className="font-semibold text-primary mb-2">Developer</h4>
                          <p className="text-sm text-muted-foreground">Building robust, scalable applications with modern technologies</p>
                        </div>
                      </StatsCard3D>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <StatsCard3D color="from-green-500 to-green-600" gradient="from-green-500/20 to-green-600/20">
                        <div className="text-center p-4">
                          <div className="text-3xl mb-2">🔍</div>
                          <h4 className="font-semibold text-secondary mb-2">QA Engineer</h4>
                          <p className="text-sm text-muted-foreground">Ensuring quality through comprehensive testing strategies</p>
                        </div>
                      </StatsCard3D>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.2 }}
                    >
                      <StatsCard3D color="from-yellow-500 to-yellow-600" gradient="from-yellow-500/20 to-yellow-600/20">
                        <div className="text-center p-4">
                          <div className="text-3xl mb-2">💡</div>
                          <h4 className="font-semibold text-yellow-600 mb-2">Problem Solver</h4>
                          <p className="text-sm text-muted-foreground">Turning complex challenges into elegant solutions</p>
                        </div>
                      </StatsCard3D>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="w-full max-w-6xl px-4 sm:px-0 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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

          {/* About Cards Section */}
          <motion.div 
            className="w-full max-w-6xl px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-primary">
              About Me
            </h3> */}
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
          </motion.div>

          {/* Skills Preview */}
          <motion.div 
            className="mt-16 sm:mt-20 w-full max-w-6xl px-4 sm:px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            {/* <h3 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-primary">
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
            </div> */}
          </motion.div>
        </main>
      </div>
    </EvervaultProvider>
  );
}
