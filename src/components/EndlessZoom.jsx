import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import heroShoe from '../assets/hero_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const EndlessZoom = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 150, // Massive zoom until it engulfs the screen
        ease: 'power2.in',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 300vh scroll
          pin: true,
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="endless-zoom-section" ref={containerRef}>
      <div className="ez-overlay-text">INTO THE FABRIC</div>
      <div className="ez-image-container">
        <img src={heroShoe} alt="Shoe Zoom" ref={imageRef} className="ez-image" />
      </div>
    </section>
  );
};

export default EndlessZoom;
