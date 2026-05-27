import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import img1 from '../assets/gallery_shoe_blue.png';
import img2 from '../assets/feature_shoe.png';
import img3 from '../assets/gallery_shoe_purple.png';

gsap.registerPlugin(ScrollTrigger);

const StripedReveal = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // 3 full viewport heights of scrolling
          pin: true,
          scrub: 1,
        }
      });

      // Pause briefly on the first image
      tl.to({}, { duration: 0.2 });

      // Animate Image 2 in from the sides using horizontal strips
      tl.from('.strip-img-2', {
        xPercent: (i) => i % 2 === 0 ? -100 : 100,
        ease: 'power4.inOut',
        stagger: 0.05,
        duration: 1.5
      });

      // Pause to show Image 2 fully
      tl.to({}, { duration: 0.5 }); 

      // Animate Image 3 in from top/bottom using vertical strips
      tl.from('.strip-img-3', {
        yPercent: (i) => i % 2 === 0 ? -100 : 100,
        ease: 'power4.inOut',
        stagger: 0.05,
        duration: 1.5
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 10 Horizontal slices
  const horizontalClips = Array.from({ length: 10 }).map((_, i) => 
    `polygon(0 ${i * 10}%, 100% ${i * 10}%, 100% ${(i + 1) * 10}%, 0 ${(i + 1) * 10}%)`
  );

  // 10 Vertical slices
  const verticalClips = Array.from({ length: 10 }).map((_, i) => 
    `polygon(${i * 10}% 0, ${(i + 1) * 10}% 0, ${(i + 1) * 10}% 100%, ${i * 10}% 100%)`
  );

  return (
    <section className="striped-reveal-section" ref={containerRef}>
      
      {/* --- LAYER 1: BASE --- */}
      <div className="sr-layer sr-base">
        <img src={img1} alt="Base Shoe" className="sr-img" />
        <h2 className="sr-text">AERODYNAMIC</h2>
      </div>

      {/* --- LAYER 2: HORIZONTAL REVEAL --- */}
      {/* We use pointer-events none so it doesn't block interactions if any */}
      <div className="sr-layer" style={{ pointerEvents: 'none' }}>
        {horizontalClips.map((clip, i) => (
          <div key={`h-${i}`} className="sr-strip strip-img-2" style={{ clipPath: clip }}>
            <img src={img2} alt="Horizontal Strip" className="sr-img" />
            <div className="sr-overlay"></div>
          </div>
        ))}
        {/* The text also slices in with the strips */}
        {horizontalClips.map((clip, i) => (
          <div key={`ht-${i}`} className="sr-strip strip-img-2" style={{ clipPath: clip, zIndex: 10 }}>
            <h2 className="sr-text" style={{ color: 'var(--accent-color)' }}>PRECISION</h2>
          </div>
        ))}
      </div>

      {/* --- LAYER 3: VERTICAL REVEAL --- */}
      <div className="sr-layer" style={{ pointerEvents: 'none' }}>
        {verticalClips.map((clip, i) => (
          <div key={`v-${i}`} className="sr-strip strip-img-3" style={{ clipPath: clip }}>
            <img src={img3} alt="Vertical Strip" className="sr-img" />
            <div className="sr-overlay" style={{ background: 'rgba(0,0,0,0.4)' }}></div>
          </div>
        ))}
        {verticalClips.map((clip, i) => (
          <div key={`vt-${i}`} className="sr-strip strip-img-3" style={{ clipPath: clip, zIndex: 10 }}>
            <h2 className="sr-text" style={{ color: '#fff' }}>POWER</h2>
          </div>
        ))}
      </div>

    </section>
  );
};

export default StripedReveal;
