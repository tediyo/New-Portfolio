// components/Home.js
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";

export default function Home() {
  const { scrollToSection } = useNavigation();

  return (
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
        className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-white/80 backdrop-blur-md sticky top-0 z-50"
      >
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">Tewodros</h1>
        <nav className="space-x-6">
          {[
            { name: 'About', id: 'home' },
            { name: 'Projects', id: 'developer' },
            { name: 'Education', id: 'experience' },
            { name: 'Experience', id: 'experience' },
            { name: 'Contact', id: 'contact' }
          ].map((item) => (
            <motion.button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="hover:text-blue-600 font-medium relative group"
              whileHover={{ scale: 1.05 }}
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </motion.button>
          ))}
        </nav>
      </motion.header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-4 py-20">
        {/* Profile and Intro Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-start w-full max-w-5xl gap-6"
        >
          {/* Profile Photo with animated border */}
          <motion.div 
            className="w-60 h-60 relative mb-16"
            whileHover={{ scale: 1.05 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-blue-300 animate-spin-slow"></div>
            <Image
              src="/Images/Profile.png"
              alt="Tewodros Berhanu"
              width={240}
              height={240}
              className="rounded-full border-4 border-white object-cover relative z-10"
            />
          </motion.div>

          {/* Intro Text */}
          <div className="mb-6">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
            >
              Hey, I'm Tewodros 👋
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 max-w-md text-lg"
            >
              A passionate Software Developer & QA Enthusiast. I love building clean interfaces and testing them to perfection.
            </motion.p>

            {/* Interactive Buttons */}
            <motion.div 
              className="mt-6 flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button 
                onClick={() => scrollToSection('qa')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
              >
                QA
              </motion.button>
              <motion.button 
                onClick={() => scrollToSection('developer')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-gray-800 to-gray-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
              >
                DEVELOPER
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-20 w-full max-w-5xl"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">My Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['React', 'Next.js', 'TypeScript', 'Node.js'].map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              >
                <h4 className="font-semibold text-center">{skill}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
