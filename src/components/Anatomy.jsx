import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroShoe from '../assets/hero_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const Anatomy = () => {
  const containerRef = useRef(null);
  const shoeRef = useRef(null);
  const labelsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 3x height to make it a long scroll
          pin: true,
          scrub: 1,
        }
      });

      // Scale the shoe up slightly
      tl.to(shoeRef.current, { scale: 1.1, duration: 1 }, 0);

      // Fade in/out labels sequentially
      labelsRef.current.forEach((label, index) => {
        const startTime = index * 0.5;
        tl.fromTo(label, 
          { opacity: 0, x: label.classList.contains('right') ? 50 : -50 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
          startTime
        );
        // Keep it visible for a bit
        tl.to(label, { opacity: 0, x: label.classList.contains('right') ? 50 : -50, duration: 0.5, ease: 'power2.in' }, startTime + 1);
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="anatomy-section" ref={containerRef}>
      <h2 className="anatomy-title">ANATOMY OF SPEED</h2>
      <div className="anatomy-center">
        <img src={heroShoe} alt="Shoe Anatomy" ref={shoeRef} className="anatomy-shoe" />
        
        <div className="anatomy-label top-left" ref={el => labelsRef.current[0] = el}>
          <h4>AERO-KNIT UPPER</h4>
          <p>Breathable, adaptive mesh.</p>
        </div>
        
        <div className="anatomy-label bottom-left" ref={el => labelsRef.current[1] = el}>
          <h4>CARBON PLATE</h4>
          <p>Explosive energy return.</p>
        </div>

        <div className="anatomy-label top-right right" ref={el => labelsRef.current[2] = el}>
          <h4>LOCK-IN LACES</h4>
          <p>Dynamic tension system.</p>
        </div>

        <div className="anatomy-label bottom-right right" ref={el => labelsRef.current[3] = el}>
          <h4>ZERO-G FOAM</h4>
          <p>Ultra-lightweight cushioning.</p>
        </div>
      </div>
    </section>
  );
};

export default Anatomy;
