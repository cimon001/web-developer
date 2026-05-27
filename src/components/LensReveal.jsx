import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import featureShoe from '../assets/feature_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const LensReveal = () => {
  const containerRef = useRef(null);
  const lensRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        }
      });

      // Expand the crystal clear lens from a tiny dot to covering the screen
      tl.fromTo(lensRef.current,
        { clipPath: 'circle(0% at 50% 50%)' },
        { clipPath: 'circle(150% at 50% 50%)', ease: 'power2.inOut' }
      );

      // Bring in the massive text
      tl.fromTo(textRef.current, 
        { opacity: 0, scale: 0.8, y: 100 },
        { opacity: 1, scale: 1, y: 0, ease: 'back.out(1.5)' },
        "-=0.4"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="lens-reveal-section" ref={containerRef}>
      
      {/* Heavily Blurred Background Image */}
      <img src={featureShoe} alt="Blurred Shoe" className="lens-bg-img lens-blur" />
      
      {/* Crystal Clear Image masked by the expanding circular lens */}
      <div className="lens-clear-wrapper" ref={lensRef}>
         <img src={featureShoe} alt="Clear Shoe" className="lens-bg-img lens-clear" />
         <div className="lens-dark-overlay"></div>
      </div>
      
      {/* Massive floating text */}
      <div className="lens-text-wrapper" ref={textRef}>
        <h2>ABSOLUTE<br/>PRECISION</h2>
        <p>Every millimeter calculated for maximum kinetic return.</p>
      </div>

    </section>
  );
};

export default LensReveal;
