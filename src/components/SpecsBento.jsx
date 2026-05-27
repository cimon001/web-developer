import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpecsBento = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="specs-section container" ref={containerRef}>
      <div className="bento-grid">
        
        <div className="bento-card large" ref={el => cardsRef.current[0] = el}>
          <h3>240g</h3>
          <p>Featherweight design for ultimate agility.</p>
        </div>

        <div className="bento-card" ref={el => cardsRef.current[1] = el}>
          <h3>8mm</h3>
          <p>Heel-to-toe drop.</p>
        </div>

        <div className="bento-card" ref={el => cardsRef.current[2] = el}>
          <h3>3D</h3>
          <p>Molded heel counter.</p>
        </div>

        <div className="bento-card wide" ref={el => cardsRef.current[3] = el} style={{background: 'var(--accent-color)', color: '#000'}}>
          <h3 style={{color: '#000'}}>100%</h3>
          <p style={{color: '#222'}}>Recycled materials used in the upper mesh.</p>
        </div>

      </div>
    </section>
  );
};

export default SpecsBento;
