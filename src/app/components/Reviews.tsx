"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { ParticleBackground } from "./ParticleBackground";
import { useState } from "react";
import { useTheme } from "next-themes";

const reviews = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "Tech Solutions Inc.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    comment: "Tewodros is an exceptional developer and QA engineer. His attention to detail and problem-solving skills helped us deliver a high-quality product ahead of schedule. His expertise in both development and testing made him an invaluable asset to our team.",
    date: "January 2024"
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "Innovate Labs",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    comment: "Working with Tewodros was a pleasure. His comprehensive understanding of both frontend and backend development, combined with his QA expertise, ensured our application was robust and bug-free. He consistently delivered high-quality work.",
    date: "December 2023"
  },
  {
    name: "Emily Rodriguez",
    role: "Project Lead",
    company: "Digital Dynamics",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 5,
    comment: "Tewodros's ability to identify and fix potential issues before they become problems is remarkable. His testing strategies and automation skills significantly improved our development process. A true professional in every sense.",
    date: "November 2023"
  },
  {
    name: "David Wilson",
    role: "Senior Developer",
    company: "CloudTech Solutions",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    comment: "Tewodros's expertise in cloud architecture and microservices was instrumental in scaling our platform. His ability to write clean, maintainable code while implementing complex features is truly impressive. A great team player and mentor.",
    date: "October 2023"
  },
  {
    name: "Lisa Anderson",
    role: "UX Director",
    company: "Creative Minds",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    rating: 5,
    comment: "Working with Tewodros on our design system implementation was a fantastic experience. His attention to detail and understanding of both design principles and technical implementation made the collaboration seamless and productive.",
    date: "September 2023"
  },
  {
    name: "James Martinez",
    role: "Startup Founder",
    company: "TechVentures",
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    rating: 5,
    comment: "Tewodros helped us build our MVP from the ground up. His technical expertise, combined with his business acumen, made him an invaluable partner in our journey. He consistently delivered beyond our expectations.",
    date: "August 2023"
  }
];

export default function Reviews() {
  const { scrollToSection } = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();

  const nextReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 >= reviews.length ? 0 : prevIndex + 1
    );
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 1 < 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  // Get the three reviews to display (current, next, and previous)
  const getVisibleReviews = () => {
    const prevIndex = currentIndex - 1 < 0 ? reviews.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex + 1 >= reviews.length ? 0 : currentIndex + 1;
    return [
      reviews[prevIndex],
      reviews[currentIndex],
      reviews[nextIndex]
    ];
  };

  return (
    <div className="min-h-screen relative py-20 bg-background overflow-hidden">
      {/* Particle Background Container */}
      <div className="absolute inset-0">
        <ParticleBackground className="w-full h-full" theme={theme as 'light' | 'dark'} />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent pointer-events-none select-none text-shadow-[0px_0px_10px_white]">
            Client Reviews
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto opacity-50 text-shadow-[0px_0px_10px_rgba(255,255,255,0.5)] pointer-events-none select-none">
            What my clients say about working with me
          </p>
        </motion.div>

        {/* Reviews Grid with Navigation */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={prevReview}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 bg-gray-100/10 hover:bg-gray-100/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white p-3 rounded-full backdrop-blur-[0px] transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextReview}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 bg-gray-100/10 hover:bg-gray-100/20 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-white p-3 rounded-full backdrop-blur-[0px] transition-all duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Reviews Grid */}
            <div className="grid bg-transparent backdrop-blur-[0px] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="wait">
                {getVisibleReviews().map((review, index) => (
                  <motion.div
                    key={review.name}
                    initial={{ opacity: 0, x: index === 0 ? -100 : index === 2 ? 100 : 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: index === 0 ? -100 : index === 2 ? 100 : 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <CardContainer className="w-full">
                      <CardBody className="bg-transparent backdrop-blur-[0px] relative border-2 border-yellow-500/30 dark:border-yellow-500/30 w-full h-[400px] rounded-xl p-6 hover:bg-gray-100/5 dark:hover:bg-black/5 transition-all duration-300">
                        <CardItem
                          translateZ="50"
                          className="text-xl font-bold text-gray-800 dark:text-white mb-2"
                        >
                          {review.name}
                        </CardItem>
                        <CardItem
                          translateZ="60"
                          className="text-gray-600 dark:text-gray-300 text-sm mb-4"
                        >
                          {review.role} at {review.company}
                        </CardItem>
                        <CardItem translateZ="100" className="w-full mt-4">
                          <div className="flex items-center mb-4">
                            {[...Array(review.rating)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-xl">★</span>
                            ))}
                          </div>
                          <p className="text-gray-700 dark:text-gray-200 italic line-clamp-4">"{review.comment}"</p>
                        </CardItem>
                        <CardItem
                          translateZ="50"
                          className="text-gray-600 dark:text-gray-300 text-sm mt-4 absolute bottom-6"
                        >
                          {review.date}
                        </CardItem>
                        <CardItem
                          translateZ="40"
                          className="absolute -top-4 -right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-yellow-500/30 shadow-lg"
                        >
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />
                        </CardItem>
                      </CardBody>
                    </CardContainer>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center gap-4 mt-16"
        >
          <motion.button
            onClick={() => scrollToSection('skills')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            View Skills
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