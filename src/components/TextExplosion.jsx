import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TextExplosion = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const letters = textRef.current.querySelectorAll('.explosion-letter');
      
      gsap.to(letters, {
        x: () => (Math.random() - 0.5) * 2000,
        y: () => (Math.random() - 0.5) * 2000,
        rotationZ: () => (Math.random() - 0.5) * 720,
        rotationX: () => (Math.random() - 0.5) * 360,
        opacity: 0,
        scale: () => Math.random() * 5 + 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=150%',
          pin: true,
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const word = "SHATTER";
  
  return (
    <section className="explosion-section" ref={containerRef}>
      <h1 className="explosion-text" ref={textRef}>
        {word.split('').map((letter, index) => (
          <span key={index} className="explosion-letter">{letter}</span>
        ))}
      </h1>
      <p className="explosion-subtext">THE STATUS QUO</p>
    </section>
  );
};

export default TextExplosion;
