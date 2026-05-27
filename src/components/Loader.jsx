import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import heroShoe from '../assets/hero_shoe.png';

const Loader = () => {
  const loaderRef = useRef(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setIsComplete(true);
          document.body.style.overflow = '';
        }
      });

      // 1. Subliminal Flashes Phase
      // We flash extreme, highly contrasting frames rapidly to build intense tension
      const flashes = gsap.utils.toArray('.flash-frame');
      gsap.set(flashes, { autoAlpha: 0 });

      // Pause for a split second on black
      tl.to({}, { duration: 1.2 }); // Increased initial pause

      tl.set(flashes[0], { autoAlpha: 1 })
        .to({}, { duration: 0.15 })
        .set(flashes[0], { autoAlpha: 0 });

      tl.set(flashes[1], { autoAlpha: 1 })
        .to({}, { duration: 0.15 })
        .set(flashes[1], { autoAlpha: 0 });

      tl.set(flashes[2], { autoAlpha: 1 })
        .to({}, { duration: 0.15 })
        .set(flashes[2], { autoAlpha: 0 });

      tl.set(flashes[3], { autoAlpha: 1 })
        .to({}, { duration: 0.15 })
        .set(flashes[3], { autoAlpha: 0 });

      // 2. The Calm Before The Tear
      // Flashes are gone. Screen is black with the word VELOCITYX perfectly centered.
      // Hold this frame for suspense for a longer time
      tl.to({}, { duration: 2.5 }); 
      
      // 3. The Glitch Pre-Tear
      // The screen is composed of 5 horizontal slices. We randomly glitch them horizontally.
      const slices = gsap.utils.toArray('.slice-panel');
      
      tl.to(slices, {
        x: () => (Math.random() - 0.5) * 80,
        duration: 0.08,
        yoyo: true,
        repeat: 7,
        ease: 'none'
      });

      // Ensure they snap back to center perfectly before the final rip
      tl.set(slices, { x: 0 });

      // Pause for dramatic tension right before the rip
      tl.to({}, { duration: 1.0 });

      // 4. The Massive Screen Tear (The Rip Reveal)
      // Even slices slide aggressively left, Odd slices slide aggressively right
      tl.to(slices, {
        xPercent: (i) => i % 2 === 0 ? -100 : 100, 
        opacity: 0.8, // Slightly fade them out as they tear away
        duration: 2.2, // Slower, more majestic rip
        ease: 'power4.inOut',
        stagger: 0.15 // Larger stagger makes it look like tearing slowly from top to bottom
      });

      // 5. Cleanup loader wrapper
      tl.to(loaderRef.current, { autoAlpha: 0, duration: 0.1 });

    }, loaderRef);

    return () => ctx.revert();
  }, []);

  if (isComplete) return null;

  // CSS Clip-paths to perfectly slice the screen horizontally into 5 pieces
  const sliceHeights = [
    'polygon(0 0, 100% 0, 100% 20%, 0 20%)',
    'polygon(0 20%, 100% 20%, 100% 40%, 0 40%)',
    'polygon(0 40%, 100% 40%, 100% 60%, 0 60%)',
    'polygon(0 60%, 100% 60%, 100% 80%, 0 80%)',
    'polygon(0 80%, 100% 80%, 100% 100%, 0 100%)'
  ];

  return (
    <div className="loader-wrapper" ref={loaderRef}>
      
      {/* === SUBLIMINAL FLASH FRAMES === */}
      <div className="flash-frame" style={{ background: '#000', color: '#fff' }}>
        <h1 className="flash-text">FASTER</h1>
      </div>
      <div className="flash-frame" style={{ background: '#fff', color: '#000' }}>
        <h1 className="flash-text" style={{ fontStyle: 'italic' }}>LIGHTER</h1>
      </div>
      <div className="flash-frame" style={{ background: 'var(--accent-color)', color: '#000' }}>
        <h1 className="flash-text">STRONGER</h1>
      </div>
      <div className="flash-frame" style={{ background: '#000' }}>
        <img src={heroShoe} alt="Flash Shoe" style={{ width: '100vw', height: '100vh', objectFit: 'cover', opacity: 0.5, filter: 'invert(1)' }} />
      </div>

      {/* === THE SLICE REVEAL PANELS === */}
      {/* 5 identical full-screen panels layered on top of each other. 
          Each one is clipped to only show a 20% horizontal strip. */}
      {sliceHeights.map((clipPath, index) => (
        <div 
          key={index} 
          className="slice-panel" 
          style={{ clipPath: clipPath }}
        >
          {/* The content inside each panel is identical and perfectly aligned */}
          <div className="slice-content">
            <h1 className="slice-brand">VELOCITY<span style={{ color: 'var(--accent-color)' }}>X</span></h1>
          </div>
        </div>
      ))}

    </div>
  );
};

export default Loader;
