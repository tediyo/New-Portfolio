"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface Skill {
  title: string;
  description: string;
  icon: React.ReactNode;
  link?: string;
  color?: string;
  gradient?: string;
}

interface SkillModalProps {
  isOpen: boolean;
  onClose: () => void;
  qaSkills: Skill[];
  devSkills: Skill[];
}

export default function SkillModal({ isOpen, onClose, qaSkills, devSkills }: SkillModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-background border border-border rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border sticky top-0 bg-background z-10">
              <h2 className="text-3xl font-bold text-foreground">Professional Skills</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* QA Skills Section */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold mb-6 text-center text-foreground">QA Expertise</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {qaSkills.map((skill, index) => (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <div className="text-primary">
                            {skill.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {skill.title}
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Development Skills Section */}
              <div>
                <h3 className="text-2xl font-bold mb-6 text-center text-foreground">Development Skills</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {devSkills.map((skill, index) => (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-6 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                          <div className="text-primary">
                            {skill.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            {skill.title}
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
