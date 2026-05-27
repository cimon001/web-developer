import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Prevent scrolling during intro
    document.body.style.overflow = 'hidden';

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          document.body.style.overflow = '';
        }
      });

      // Phase 1: Kinetic Snap-In
      // Letters drop in extremely stretched (like elastic bands snapping into place)
      tl.fromTo('.kinetic-letter', 
        { scaleY: 20, opacity: 0, y: -200 },
        { 
          scaleY: 1, 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.8, 
          ease: 'elastic.out(1, 0.3)' 
        }
      );

      // Phase 2: The Black Hole Compression
      // Letters suck inwards tightly before the explosion
      tl.to('.kinetic-text-wrap', { 
        gap: '0px',
        duration: 0.8, 
        ease: 'power4.inOut' 
      });
      
      tl.to('.kinetic-letter', { 
        letterSpacing: '-6vw', // Extreme compression
        duration: 0.8, 
        ease: 'power4.inOut' 
      }, "<"); // Run at the same time

      // Phase 3: The Big Bang Zoom
      // The compressed word violently scales up infinitely and flies past the camera
      tl.to(textRef.current, {
        scale: 150, // Massive scale to fly through the text
        rotation: 45, // Add a slight dynamic spin
        opacity: 0,
        duration: 1.5,
        ease: 'power4.in'
      });

      // Phase 4: Reveal the Website
      tl.to(loaderRef.current, {
        opacity: 0,
        duration: 0.5,
      }, "-=0.5"); // Fade out the black background just before the text fully disappears

    }, loaderRef);

    return () => ctx.revert();
  }, []);

  if (isComplete) return null;

  const word = "VELOCITYX".split("");

  return (
    <div className="loader-wrapper" ref={loaderRef} style={{ background: '#020202', perspective: '1000px' }}>
      
      <div 
        className="kinetic-text-wrap" 
        ref={textRef} 
        style={{ 
          display: 'flex', 
          gap: '2vw', // Initial gap before compression
          justifyContent: 'center', 
          alignItems: 'center',
          transformStyle: 'preserve-3d'
        }}
      >
        {word.map((char, i) => (
          <span 
            key={i} 
            className="kinetic-letter" 
            style={{ 
              fontSize: '15vw', 
              fontWeight: 900, 
              color: char === 'X' ? 'var(--accent-color)' : '#fff',
              textTransform: 'uppercase',
              display: 'inline-block',
              transformOrigin: 'center center',
              lineHeight: 1
            }}
          >
            {char}
          </span>
        ))}
      </div>
      
    </div>
  );
};

export default Loader;
