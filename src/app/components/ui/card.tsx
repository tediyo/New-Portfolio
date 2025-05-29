import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { CardSpotlight } from "./card-spotlight";

// Add springConfig for 3D effect
const springConfig = { damping: 15, stiffness: 150 };

// Add 3D Card Wrapper component
const Card3DWrapper = ({ children }: { children: React.ReactNode }) => {
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
          className="absolute inset-0 bg-primary/20 opacity-0 blur-xl rounded-2xl"
        />
        
        {/* Card content */}
        <motion.div
          animate={{
            scale: isHovered ? 1.02 : 1,
            y: isHovered ? -5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="relative"
        >
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    icon: string;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "w-full",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          href={item?.link}
          key={item?.link}
          className="relative group block h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-accent/50 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card3DWrapper>
            <Card>
              <div className="flex items-center gap-5">
                <div className="relative w-14 h-14">
                  <Image
                    src={item.icon}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <CardTitle>{item.title}</CardTitle>
              </div>
              <CardDescription>{item.description}</CardDescription>
            </Card>
          </Card3DWrapper>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <CardSpotlight className="h-full">
      <div
        className={cn(
          "rounded-2xl h-full w-full p-5 overflow-hidden bg-background border border-border relative z-20",
          className
        )}
      >
        <div className="relative z-50">
          <div className="p-3">{children}</div>
        </div>
      </div>
    </CardSpotlight>
  );
};

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-foreground font-bold tracking-wide text-lg", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        "mt-4 text-muted-foreground tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </p>
  );
}; 