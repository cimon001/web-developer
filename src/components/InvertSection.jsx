import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InvertSection = () => {
  const containerRef = useRef(null);
  const scrollTextRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal scroll for massive black text
      gsap.to(scrollTextRef.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="invert-section" ref={containerRef}>
      <div className="invert-wrapper" ref={scrollTextRef}>
        <div className="invert-text">
          PURE. ABSOLUTE. UNTAMED.
        </div>
      </div>
      
      <div className="invert-cards">
        <div className="i-card">
            <h3>MINIMAL</h3>
            <p>Stripped down to the bare essentials for maximum output.</p>
        </div>
        <div className="i-card">
            <h3>RAW</h3>
            <p>Unfiltered performance directly connecting you to the ground.</p>
        </div>
      </div>
    </section>
  );
};

export default InvertSection;
