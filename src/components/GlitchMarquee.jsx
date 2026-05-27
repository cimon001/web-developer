import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GlitchMarquee = () => {
  const containerRef = useRef(null);
  const m1Ref = useRef(null);
  const m2Ref = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(m1Ref.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to(m2Ref.current, {
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
    <section className="glitch-marquee-section" ref={containerRef}>
      <div className="gm-row" ref={m1Ref}>
        <span>VELOCITYX</span><span>VELOCITYX</span><span>VELOCITYX</span><span>VELOCITYX</span>
      </div>
      <div className="gm-row outline-row" ref={m2Ref} style={{ marginLeft: '-50vw' }}>
        <span>BEYOND FAST</span><span>BEYOND FAST</span><span>BEYOND FAST</span><span>BEYOND FAST</span>
      </div>
    </section>
  );
};

export default GlitchMarquee;
