import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import techImage from '../assets/feature_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const Technology = () => {
  const containerRef = useRef(null);
  const textElementsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Pin the image while scrolling through the text
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.tech-image-wrapper',
        scrub: true,
      });

      // Fade in/out text as they enter center of screen
      textElementsRef.current.forEach((el, index) => {
        gsap.fromTo(el, 
          { opacity: 0.2, filter: 'blur(5px)' },
          {
            opacity: 1,
            filter: 'blur(0px)',
            scrollTrigger: {
              trigger: el,
              start: 'top 60%',
              end: 'top 40%',
              scrub: true,
            }
          }
        );
        gsap.to(el, {
            opacity: 0.2,
            filter: 'blur(5px)',
            scrollTrigger: {
                trigger: el,
                start: 'top 20%',
                end: 'top 0%',
                scrub: true,
            }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="technology-section" ref={containerRef}>
      <div className="tech-image-wrapper">
        <img src={techImage} alt="Shoe Technology" />
        <div className="tech-overlay"></div>
      </div>
      
      <div className="tech-content">
        <div className="tech-block" ref={el => textElementsRef.current[0] = el}>
          <h3>01 / THE CORE</h3>
          <p>Carbon infused base plate providing uncompromising stability under extreme loads.</p>
        </div>
        <div className="tech-block" ref={el => textElementsRef.current[1] = el}>
          <h3>02 / AERO MESH</h3>
          <p>Laser-cut ventilation matrix ensuring optimal thermal regulation.</p>
        </div>
        <div className="tech-block" ref={el => textElementsRef.current[2] = el}>
          <h3>03 / KINETIC FOAM</h3>
          <p>Our proprietary midsole foam returns 98% of absorbed energy directly into your stride.</p>
        </div>
        <div className="tech-block" ref={el => textElementsRef.current[3] = el}>
          <h3>04 / BIO-LOCK FIT</h3>
          <p>An intelligent lacing system that adapts dynamically to your foot's expansion during activity.</p>
        </div>
      </div>
    </section>
  );
};

export default Technology;
