import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MaskReveal = () => {
  const containerRef = useRef(null);
  const maskTextRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(maskTextRef.current, {
        scale: 150,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="mask-reveal-section" ref={containerRef}>
      <div className="mask-bg"></div>
      <div className="mask-text-container" ref={maskTextRef}>
        <h1 className="mask-x">X</h1>
      </div>
    </section>
  );
};

export default MaskReveal;
