import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Tunnel = () => {
  const containerRef = useRef(null);
  const wordsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: true,
        }
      });

      wordsRef.current.forEach((word, index) => {
        tl.fromTo(word,
          { scale: 0, opacity: 0, zIndex: index },
          { scale: 15, opacity: 1, duration: 1, ease: 'power2.in' },
          index * 0.5
        );
        tl.to(word, { opacity: 0, duration: 0.2 }, "+=0");
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="tunnel-section" ref={containerRef}>
      <div className="tunnel-word" ref={el => wordsRef.current[0] = el}>SPEED</div>
      <div className="tunnel-word" ref={el => wordsRef.current[1] = el} style={{color: 'var(--accent-secondary)'}}>POWER</div>
      <div className="tunnel-word" ref={el => wordsRef.current[2] = el} style={{color: 'var(--accent-color)'}}>AGILITY</div>
      <div className="tunnel-word" ref={el => wordsRef.current[3] = el}>VELOCITY</div>
    </section>
  );
};

export default Tunnel;
