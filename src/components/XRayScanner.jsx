import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import featureShoe from '../assets/feature_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const XRayScanner = () => {
  const containerRef = useRef(null);
  const scannerLineRef = useRef(null);
  const xrayImageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
        }
      });

      // Animate clip-path of the X-Ray image (revealing it from top to bottom)
      tl.fromTo(xrayImageRef.current, 
        { clipPath: 'inset(0% 0% 100% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' }
      );

      // Animate the glowing scanner line synchronously
      tl.fromTo(scannerLineRef.current,
        { top: '0%' },
        { top: '100%', ease: 'none' },
        0 
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="xray-section" ref={containerRef}>
      <div className="xray-container">
        {/* Base dark image */}
        <img src={featureShoe} alt="Normal Shoe" className="xray-base-img" />
        
        {/* X-Ray filtered image */}
        <img src={featureShoe} alt="X-Ray Shoe" className="xray-filtered-img" ref={xrayImageRef} />
        
        {/* Glowing Scanner Line */}
        <div className="xray-scanner-line" ref={scannerLineRef}></div>
        
        {/* Side HUD Text */}
        <div className="xray-text">
            <h2>DEEP SCAN</h2>
            <p>Analyzing Kinetic Foam Density & Bio-Lock structural integrity.</p>
        </div>
      </div>
    </section>
  );
};

export default XRayScanner;
