import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import blueShoe from '../assets/gallery_shoe_blue.png';
import purpleShoe from '../assets/gallery_shoe_purple.png';
import heroShoe from '../assets/hero_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const ParallaxGrid = () => {
  const containerRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Column 1 goes UP fast
      gsap.to(col1Ref.current, {
        yPercent: -80,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Column 2 goes DOWN slowly
      gsap.to(col2Ref.current, {
        yPercent: 40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Column 3 goes UP super fast
      gsap.to(col3Ref.current, {
        yPercent: -120,
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
    <section className="parallax-grid-section" ref={containerRef}>
      <h2 className="grid-bg-text">GRAVITY DEFIED</h2>
      <div className="pg-col" ref={col1Ref}>
        <img src={blueShoe} alt="Shoe" />
        <img src={purpleShoe} alt="Shoe" style={{filter: 'hue-rotate(90deg)'}} />
        <img src={heroShoe} alt="Shoe" style={{transform: 'scale(0.8)'}} />
        <img src={blueShoe} alt="Shoe" style={{filter: 'hue-rotate(180deg)'}} />
      </div>
      
      <div className="pg-col offset" ref={col2Ref}>
        <img src={heroShoe} alt="Shoe" style={{transform: 'rotate(180deg)'}} />
        <img src={blueShoe} alt="Shoe" style={{filter: 'hue-rotate(270deg)'}} />
        <img src={purpleShoe} alt="Shoe" />
        <img src={heroShoe} alt="Shoe" style={{transform: 'rotate(-45deg)'}} />
      </div>

      <div className="pg-col" ref={col3Ref}>
        <img src={purpleShoe} alt="Shoe" style={{filter: 'hue-rotate(-45deg)'}} />
        <img src={heroShoe} alt="Shoe" style={{transform: 'scale(1.2)'}} />
        <img src={blueShoe} alt="Shoe" style={{filter: 'hue-rotate(45deg)'}} />
        <img src={purpleShoe} alt="Shoe" style={{filter: 'hue-rotate(135deg)'}} />
      </div>
    </section>
  );
};

export default ParallaxGrid;
