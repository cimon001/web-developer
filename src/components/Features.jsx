import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import featureImage from '../assets/feature_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  const containerRef = useRef(null);
  const rowsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      rowsRef.current.forEach((row) => {
        const text = row.querySelector('.feature-text');
        const img = row.querySelector('.feature-image img');

        gsap.from(text, {
          x: row.classList.contains('reverse') ? 100 : -100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        });

        gsap.to(img, {
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: row,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="features container" ref={containerRef}>
      <div className="feature-row" ref={el => rowsRef.current[0] = el}>
        <div className="feature-text">
          <h2>Engineered for <br/>Zero Gravity</h2>
          <p>
            Experience the pinnacle of footwear engineering. Our proprietary nano-woven 
            fabric adapts to your micro-movements, providing a lock-in fit that feels 
            like a second skin while maintaining maximum breathability in extreme conditions.
          </p>
        </div>
        <div className="feature-image">
          <img src={featureImage} alt="Shoe Texture Close up" />
        </div>
      </div>

      <div className="feature-row reverse" ref={el => rowsRef.current[1] = el}>
        <div className="feature-text">
          <h2>Kinetic Energy <br/>Return</h2>
          <p>
            The ultra-responsive aerodynamic sole is constructed from a hyper-dense 
            composite material. It captures the impact of your stride and releases it 
            as explosive forward momentum, propelling you further with less effort.
          </p>
        </div>
        <div className="feature-image">
          <img src={featureImage} alt="Shoe Sole Details" style={{transform: 'scale(1.1) rotate(180deg)'}} />
        </div>
      </div>
    </section>
  );
};

export default Features;
