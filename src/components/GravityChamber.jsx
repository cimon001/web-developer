import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import blueShoe from '../assets/gallery_shoe_blue.png';
import purpleShoe from '../assets/gallery_shoe_purple.png';

gsap.registerPlugin(ScrollTrigger);

const GravityChamber = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Set initial random scattered positions
      gsap.set(itemsRef.current, {
        x: () => (Math.random() - 0.5) * 2000,
        y: () => (Math.random() - 0.5) * 2000,
        rotation: () => (Math.random() - 0.5) * 360,
        scale: () => Math.random() * 2 + 0.5,
      });

      // Animate them snapping back to their original CSS Grid positions
      gsap.to(itemsRef.current, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: 1,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="gravity-chamber-section" ref={containerRef}>
      <h2 className="gc-title">GRAVITY SNAP</h2>
      <div className="gc-grid">
        {['DESIGN', 'AERO', 'BOOST', 'FLEX'].map((word, i) => (
          <div key={i} className="gc-item gc-text" ref={el => itemsRef.current[i] = el}>
            {word}
          </div>
        ))}
        <div className="gc-item gc-img" ref={el => itemsRef.current[4] = el}>
          <img src={blueShoe} alt="Shoe" />
        </div>
        <div className="gc-item gc-img" ref={el => itemsRef.current[5] = el}>
          <img src={purpleShoe} alt="Shoe" />
        </div>
      </div>
    </section>
  );
};

export default GravityChamber;
