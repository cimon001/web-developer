import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LightWarp = () => {
  const containerRef = useRef(null);
  const warpLinesRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          pin: true,
          scrub: 1,
        }
      });

      // Warp speed stretch effect
      tl.fromTo('.warp-line', 
        { scaleY: 1, opacity: 0.1 },
        { scaleY: 50, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.in' }
      );
      
      // Text reveals in the middle of warp
      tl.fromTo(textRef.current,
        { scale: 0, opacity: 0, rotationX: 90 },
        { scale: 1, opacity: 1, rotationX: 0, duration: 0.5, ease: 'back.out(2)' },
        "-=0.5"
      );
      
      // Text zooms past you
      tl.to(textRef.current, {
          scale: 20, opacity: 0, duration: 1, ease: 'power2.in'
      }, "+=0.2");

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="lightwarp-section" ref={containerRef}>
      <div className="warp-container" ref={warpLinesRef}>
        {/* Generate multiple lines for the warp effect */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="warp-line" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              background: i % 2 === 0 ? 'var(--accent-secondary)' : 'var(--accent-color)'
            }}
          ></div>
        ))}
      </div>
      <h1 className="warp-text" ref={textRef}>HYPERDRIVE</h1>
    </section>
  );
};

export default LightWarp;
