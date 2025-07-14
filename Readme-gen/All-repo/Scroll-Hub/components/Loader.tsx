'use client';

import React from 'react';
import { Rocket } from 'lucide-react';

const CosmicLoader: React.FC = () => {
  // Generate an array of star objects with predefined properties instead of using random inline styles
  const stars = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    top: `${Math.floor(Math.random() * 100)}%`,
    left: `${Math.floor(Math.random() * 100)}%`,
    size: Math.random() > 0.7 ? 2 : 1,
    delay: `${Math.floor(Math.random() * 2000)}ms`,
  }));

  return (
    <div>
      <Rocket size={64} className="text-purple-400 animate-bounce" />
      {stars.map((star) => (
        <div
          key={star.id}
          className={`absolute bg-white/60 rounded-full opacity-0 animate-[fadeInOut_2s_infinite_alternate]`}
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
};

// Add the custom animation to your tailwind.config.js:
// extend: {
//   keyframes: {
//     fadeInOut: {
//       '0%': { opacity: 0.2 },
//       '100%': { opacity: 1 },
//     },
//   },
//   animation: {
//     'bounce': 'bounce 2s cubic-bezier(0.45, 0, 0.55, 1) infinite',
//   },
// }

export default CosmicLoader;