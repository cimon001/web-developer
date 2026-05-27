import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="testimonials-section" ref={containerRef}>
      <div className="marquee-container">
        <div className="marquee-content" ref={marqueeRef}>
          <span>"REVOLUTIONARY"</span>
          <span className="dot">•</span>
          <span>"FEELS LIKE FLYING"</span>
          <span className="dot">•</span>
          <span>"UNMATCHED PERFORMANCE"</span>
          <span className="dot">•</span>
          <span>"THE FUTURE OF RUNNING"</span>
          <span className="dot">•</span>
          <span>"REVOLUTIONARY"</span>
          <span className="dot">•</span>
          <span>"FEELS LIKE FLYING"</span>
          <span className="dot">•</span>
          <span>"UNMATCHED PERFORMANCE"</span>
          <span className="dot">•</span>
          <span>"THE FUTURE OF RUNNING"</span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
