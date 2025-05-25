"use client";

import { motion } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { ParticleBackground } from "./ParticleBackground";

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
  }
];

export default function Reviews() {
  const { scrollToSection } = useNavigation();

  return (
    <div className="min-h-screen relative py-20 bg-gradient-to-br from-gray-900/50 to-black/50">
      {/* Particle Background */}
      <ParticleBackground className="z-0" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Client Reviews
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            What my clients say about working with me
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <CardContainer key={index} className="w-full">
                <CardBody className="bg-white/20 backdrop-blur-md relative border border-white/20 w-full h-full rounded-xl p-6 hover:bg-white/30 transition-all duration-300">
                  <CardItem
                    translateZ="50"
                    className="text-xl font-bold text-white mb-2"
                  >
                    {review.name}
                  </CardItem>
                  <CardItem
                    translateZ="60"
                    className="text-gray-300 text-sm mb-4"
                  >
                    {review.role} at {review.company}
                  </CardItem>
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="flex items-center mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-gray-200 italic">"{review.comment}"</p>
                  </CardItem>
                  <CardItem
                    translateZ="50"
                    className="text-gray-300 text-sm mt-4"
                  >
                    {review.date}
                  </CardItem>
                  <CardItem
                    translateZ="40"
                    className="absolute -top-4 -right-4 w-16 h-16 rounded-full overflow-hidden border-2 border-white/30 shadow-lg"
                  >
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-full h-full object-cover"
                    />
                  </CardItem>
                </CardBody>
              </CardContainer>
            ))}
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