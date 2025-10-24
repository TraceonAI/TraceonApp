'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

export default function RouteProgressBar() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loading bar when route changes
    setIsLoading(true);
    
    // Hide it after a short delay (simulating page load)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[9999] h-1"
          style={{
            background: 'linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            boxShadow: '0 0 10px rgba(124, 58, 237, 0.5)',
          }}
          initial={{ scaleX: 0, transformOrigin: 'left' }}
          animate={{ 
            scaleX: [0, 0.3, 0.6, 0.8, 1],
          }}
          exit={{ 
            scaleX: 1,
            opacity: 0,
            transition: { duration: 0.2 }
          }}
          transition={{
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      )}
    </AnimatePresence>
  );
}
