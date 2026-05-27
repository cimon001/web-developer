import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import blueShoe from '../assets/gallery_shoe_blue.png';
import purpleShoe from '../assets/gallery_shoe_purple.png';

gsap.registerPlugin(ScrollTrigger);

const HorizontalStory = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let scrollAmount = sliderRef.current.scrollWidth - window.innerWidth;

      gsap.to(sliderRef.current, {
        x: -scrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 3x height to scroll slowly
          pin: true,
          scrub: 1,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="horizontal-story-section" ref={containerRef}>
      <div className="hs-slider" ref={sliderRef}>
        
        <div className="hs-panel" style={{ background: '#050505' }}>
          <div className="hs-content">
            <h2>THE INCEPTION</h2>
            <p>It started with a vision to break every rule of modern design.</p>
          </div>
        </div>

        <div className="hs-panel" style={{ background: '#111' }}>
          <div className="hs-image-wrap">
             <img src={blueShoe} alt="Story Image" />
          </div>
          <div className="hs-content">
            <h2>PROTOTYPE 01</h2>
            <p>Testing the limits of aerodynamic resistance.</p>
          </div>
        </div>

        <div className="hs-panel" style={{ background: 'var(--accent-color)', color: '#000' }}>
          <div className="hs-content">
            <h2 style={{color: '#000'}}>EVOLUTION</h2>
            <p>Refining the core. Enhancing the kinetic return.</p>
          </div>
        </div>

        <div className="hs-panel" style={{ background: '#000' }}>
          <div className="hs-image-wrap">
             <img src={purpleShoe} alt="Story Image" />
          </div>
          <div className="hs-content">
            <h2>THE FINAL FORM</h2>
            <p>Perfection achieved. Ready for the asphalt.</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HorizontalStory;
