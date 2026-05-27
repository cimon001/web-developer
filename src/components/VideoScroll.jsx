import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VideoScroll = () => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Horizontal scrub text
      gsap.to(text1Ref.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(text2Ref.current, {
        xPercent: 50,
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
    <section className="video-scroll-section" ref={containerRef}>
      <div className="vs-overlay"></div>
      
      <div className="vs-text-container">
        <div className="vs-row" ref={text1Ref}>
          <span className="outline">UNLIMITED</span> PUSH <span>BEYOND</span> <span className="outline">LIMITS</span>
        </div>
        <div className="vs-row right" ref={text2Ref} style={{ transform: 'translateX(-50%)' }}>
          <span>VELOCITY</span> <span className="outline">DEFINED</span> <span>MAXIMUM</span> <span className="outline">OUTPUT</span>
        </div>
      </div>
    </section>
  );
};

export default VideoScroll;
