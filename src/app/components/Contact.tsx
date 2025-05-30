"use client";

import { motion } from "framer-motion";
import { useNavigation } from "../context/NavigationContext";
import { PinContainer } from "./Pin";
import { Vortex } from "./Vortex";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import emailjs from '@emailjs/browser';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const { scrollToSection } = useNavigation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'tewodrosberhanu19@gmail.com',
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      toast.success('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: <FaLinkedin className="text-yellow-500 dark:text-yellow-400" />,
      link: "https://linkedin.com/in/yourprofile",
      color: "from-yellow-500/20 to-yellow-600/20 dark:from-yellow-500/20 dark:to-yellow-600/20",
      hoverColor: "from-yellow-500/30 to-yellow-600/30 dark:from-yellow-500/30 dark:to-yellow-600/30",
      description: "Connect with me on LinkedIn"
    },
    {
      name: "GitHub",
      icon: <FaGithub className="text-yellow-500 dark:text-yellow-400" />,
      link: "https://github.com/yourusername",
      color: "from-yellow-500/20 to-yellow-600/20 dark:from-yellow-500/20 dark:to-yellow-600/20",
      hoverColor: "from-yellow-500/30 to-yellow-600/30 dark:from-yellow-500/30 dark:to-yellow-600/30",
      description: "Check out my projects"
    },
    {
      name: "Twitter",
      icon: <FaTwitter className="text-yellow-500 dark:text-yellow-400" />,
      link: "https://twitter.com/yourhandle",
      color: "from-yellow-500/20 to-yellow-600/20 dark:from-yellow-500/20 dark:to-yellow-600/20",
      hoverColor: "from-yellow-500/30 to-yellow-600/30 dark:from-yellow-500/30 dark:to-yellow-600/30",
      description: "Follow me on Twitter"
    },
    {
      name: "Instagram",
      icon: <FaInstagram className="text-yellow-500 dark:text-yellow-400" />,
      link: "https://instagram.com/yourprofile",
      color: "from-yellow-500/20 to-yellow-600/20 dark:from-yellow-500/20 dark:to-yellow-600/20",
      hoverColor: "from-yellow-500/30 to-yellow-600/30 dark:from-yellow-500/30 dark:to-yellow-600/30",
      description: "See my photos"
    }
  ];

  return (
    <Vortex
      className="min-h-screen py-20"
      containerClassName="bg-background"
      particleCount={500}
      baseHue={220}
      baseSpeed={0.3}
      rangeSpeed={0.5}
      baseRadius={1}
      rangeRadius={2}
      backgroundColor="transparent"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-500 dark:to-yellow-600 bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Let's connect and discuss how we can work together on your next project.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-transparent backdrop-blur-[0px] p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-yellow-500/20 dark:border-yellow-500/20 h-[600px] flex flex-col"
          >
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-yellow-500/20 dark:border-yellow-500/20 rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-transparent border border-yellow-500/20 dark:border-yellow-500/20 rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="message" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-transparent border border-yellow-500/20 dark:border-yellow-500/20 rounded-lg focus:ring-2 focus:ring-yellow-500/50 focus:border-transparent text-gray-800 dark:text-white placeholder-gray-400 resize-none"
                  placeholder="Your message"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full bg-gradient-to-r from-yellow-500/80 to-yellow-600/80 dark:from-yellow-500/80 dark:to-yellow-600/80 text-white py-4 rounded-lg hover:shadow-lg transition-all duration-300 ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="bg-white/50 dark:bg-transparent bbackdrop-blur-[0px] p-2 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-500/30 dark:border-yellow-500/30">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 dark:bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-500 dark:text-yellow-400 text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-300">your.email@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 dark:bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-500 dark:text-yellow-400 text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Phone</h3>
                    <p className="text-gray-600 dark:text-gray-300">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 dark:bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <span className="text-yellow-500 dark:text-yellow-400 text-xl">📍</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">Location</h3>
                    <p className="text-gray-600 dark:text-gray-300">Addis Ababa, Ethiopia</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Cards with 3D Pin Effect */}
            <div className="bg-transparent backdrop-blur-[0px] p-2 rounded-xl border border-yellow-500/20 dark:border-yellow-500/20">
              <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Connect With Me</h2>
              <div className="grid grid-cols-4 gap-0">
                {socialLinks.map((social) => (
                  <PinContainer
                    key={social.name}
                    title={social.name}
                    href={social.link}
                    containerClassName="w-full h-64"
                  >
                    <div className={`bg-transparent backdrop-blur-[0px] p-1.5 rounded-lg border border-yellow-500/20 dark:border-yellow-500/20 transition-all duration-300 hover:border-yellow-500/40 hover:shadow-lg group`}>
                      <div className="flex flex-col items-center text-center gap-0.5">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 dark:from-yellow-500/20 dark:to-yellow-600/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          {social.icon}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 dark:text-white text-[10px] mb-0.5">{social.name}</h3>
                          <p className="text-[8px] text-gray-600 dark:text-gray-300 line-clamp-1">{social.description}</p>
                        </div>
                        <div className="w-full h-0.5 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 group-hover:from-yellow-500/40 group-hover:to-yellow-600/40 transition-all duration-300"></div>
                      </div>
                    </div>
                  </PinContainer>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white/50 dark:bg-transparent backdrop-blur-lg p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border-2 border-yellow-500/30 dark:border-yellow-500/30">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Location</h2>
              <div className="relative w-full h-[300px] rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3719046000003!2d38.7467993!3d9.0321867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x162b1f9d4a0d3dc1%3A0x1f9450f9602a7cf3!2sAddis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus&markers=color:red%7Clabel:A%7C9.0321867,38.7467993"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
                <div className="absolute top-4 right-4 bg-yellow-500/20 dark:bg-yellow-500/20 backdrop-blur-[0px] px-3 py-1 rounded-full shadow-md text-sm font-medium text-gray-800 dark:text-white border border-yellow-500/30 dark:border-yellow-500/30">
                  📍 Addis Ababa
                </div>
              </div>
            </div>
          </motion.div>
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
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 dark:from-yellow-500 dark:to-yellow-600 text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            View Developer Skills
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('experience')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-600 text-gray-800 dark:text-white px-8 py-3 rounded-full hover:shadow-lg transition-all duration-300"
          >
            View Experience
          </motion.button>
        </motion.div>
      </div>
    </Vortex>
  );
} 