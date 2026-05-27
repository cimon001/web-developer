import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FillText = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animate each line's overlay to reveal from left to right on scroll
      const lines = gsap.utils.toArray('.ft-overlay');
      
      lines.forEach((line, index) => {
        gsap.fromTo(line, 
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          { 
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', 
            ease: 'none',
            scrollTrigger: {
              trigger: line.parentNode, // trigger on the specific line's wrapper
              start: 'top 80%', 
              end: 'bottom 40%', 
              scrub: 1
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const lines = [
    "NOT JUST A SHOE.",
    "IT'S A MOVEMENT.",
    "EXPLORE THE LINEUP."
  ];

  return (
    <section className="fill-text-section" ref={containerRef}>
      <div className="ft-container">
        {lines.map((text, i) => (
          <div key={i} className="ft-line-wrapper">
            <h2 className="ft-text ft-stroke">{text}</h2>
            <h2 className="ft-text ft-overlay">{text}</h2>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FillText;
