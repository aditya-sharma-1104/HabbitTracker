import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface ConfettiProps {
  trigger: boolean;
  onComplete?: () => void;
}

export const ConfettiEffect = ({ trigger, onComplete }: ConfettiProps) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    size: number;
    delay: number;
  }>>([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: ['#00ffff', '#8a2be2', '#00bfff', '#ffd700', '#ff69b4'][Math.floor(Math.random() * 5)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.5
      }));
      
      setParticles(newParticles);
      
      // Clear particles after animation
      setTimeout(() => {
        setParticles([]);
        onComplete?.();
      }, 3000);
    }
  }, [trigger, onComplete]);

  if (!trigger || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: particle.x,
            top: particle.y,
            boxShadow: `0 0 10px ${particle.color}`,
          }}
          initial={{ 
            scale: 0, 
            opacity: 1, 
            y: particle.y 
          }}
          animate={{ 
            scale: [0, 1, 0], 
            opacity: [1, 1, 0],
            y: particle.y + 200,
            x: particle.x + (Math.random() - 0.5) * 200
          }}
          transition={{ 
            duration: 2.5, 
            delay: particle.delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

interface LevelUpEffectProps {
  show: boolean;
  level: number;
  onComplete?: () => void;
}

export const LevelUpEffect = ({ show, level, onComplete }: LevelUpEffectProps) => {
  useEffect(() => {
    if (show) {
      setTimeout(() => onComplete?.(), 3000);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 1] }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-8xl font-bold gradient-text mb-4"
        >
          LEVEL UP!
        </motion.div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-4xl font-bold text-gaming-gold"
        >
          Level {level}
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-4 text-gaming-cyan text-xl"
        >
          New abilities unlocked!
        </motion.div>
      </motion.div>
    </div>
  );
};
