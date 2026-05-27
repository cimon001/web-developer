import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import featureShoe from '../assets/feature_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const Showcase = () => {
  const containerRef = useRef(null);
  const textMaskRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Zoom into the image on scroll
      gsap.to('.showcase-image', {
        scale: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      // Scale up the text mask significantly to reveal more of the image
      gsap.to(textMaskRef.current, {
        scale: 20,
        opacity: 0,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top center',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="showcase-section" ref={containerRef}>
      <img className="showcase-image" src={featureShoe} alt="Shoe Texture" />
      <div className="showcase-mask" ref={textMaskRef}>
        <h1>UNLEASH</h1>
      </div>
    </section>
  );
};

export default Showcase;
