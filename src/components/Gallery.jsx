import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import blueShoe from '../assets/gallery_shoe_blue.png';
import purpleShoe from '../assets/gallery_shoe_purple.png';

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Calculate how far to move the wrapper
      const getScrollAmount = () => {
        let wrapperWidth = wrapperRef.current.scrollWidth;
        return -(wrapperWidth - window.innerWidth);
      };

      const tween = gsap.to(wrapperRef.current, {
        x: getScrollAmount,
        ease: 'none',
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculates on resize
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section className="gallery-section" ref={sectionRef}>
      <div className="gallery-wrapper" ref={wrapperRef}>
        
        <div className="gallery-item">
          <div className="gallery-card" style={{'--accent-secondary': '#00d2ff'}}>
            <img src={blueShoe} alt="Cobalt Edition" />
            <div className="gallery-info">
              <h3>Cobalt Edition</h3>
              <p>Limited Series</p>
            </div>
          </div>
        </div>

        <div className="gallery-item">
          <div className="gallery-card" style={{'--accent-secondary': '#8a2be2'}}>
            <img src={purpleShoe} alt="Nebula Edition" />
            <div className="gallery-info">
              <h3>Nebula Edition</h3>
              <p>Pro Series</p>
            </div>
          </div>
        </div>

        <div className="gallery-item">
          <div className="gallery-card" style={{'--accent-secondary': '#ff4a00'}}>
            <img src={blueShoe} alt="Magma Edition" style={{filter: 'hue-rotate(150deg) drop-shadow(0 20px 30px rgba(0,0,0,0.5))'}} />
            <div className="gallery-info">
              <h3>Magma Edition</h3>
              <p>Core Series</p>
            </div>
          </div>
        </div>

        <div className="gallery-item">
          <div className="gallery-card" style={{'--accent-secondary': '#00ff88'}}>
            <img src={purpleShoe} alt="Aura Edition" style={{filter: 'hue-rotate(-90deg) drop-shadow(0 20px 30px rgba(0,0,0,0.5))'}} />
            <div className="gallery-info">
              <h3>Aura Edition</h3>
              <p>Elite Series</p>
            </div>
          </div>
        </div>

        <div className="gallery-item">
          <div className="gallery-card" style={{'--accent-secondary': '#facc15'}}>
            <img src={blueShoe} alt="Volt Edition" style={{filter: 'hue-rotate(-120deg) saturate(2) drop-shadow(0 20px 30px rgba(0,0,0,0.5))'}} />
            <div className="gallery-info">
              <h3>Volt Edition</h3>
              <p>Speed Series</p>
            </div>
          </div>
        </div>

        <div className="gallery-item">
          <div className="gallery-card" style={{'--accent-secondary': '#ff007f'}}>
            <img src={purpleShoe} alt="Cyber Edition" style={{filter: 'hue-rotate(60deg) saturate(1.5) drop-shadow(0 20px 30px rgba(0,0,0,0.5))'}} />
            <div className="gallery-info">
              <h3>Cyber Edition</h3>
              <p>Future Series</p>
            </div>
          </div>
        </div>

        <div className="gallery-item">
          <div className="gallery-card" style={{'--accent-secondary': '#dc143c'}}>
            <img src={blueShoe} alt="Crimson Edition" style={{filter: 'hue-rotate(120deg) brightness(0.8) saturate(2) drop-shadow(0 20px 30px rgba(0,0,0,0.5))'}} />
            <div className="gallery-info">
              <h3>Crimson Edition</h3>
              <p>Stealth Series</p>
            </div>
          </div>
        </div>

        <div className="gallery-item">
          <div className="gallery-card" style={{'--accent-secondary': '#00ffff'}}>
            <img src={purpleShoe} alt="Glacier Edition" style={{filter: 'hue-rotate(-150deg) drop-shadow(0 20px 30px rgba(0,0,0,0.5))'}} />
            <div className="gallery-info">
              <h3>Glacier Edition</h3>
              <p>Arctic Series</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Gallery;
