import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TypewriterSection = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const words = textRef.current.querySelectorAll('.tw-word');
      
      gsap.to(words, {
        opacity: 1,
        stagger: 0.1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const paragraph = "Every single detail of this masterpiece was meticulously crafted in our secret labs. We didn't just build a shoe. We engineered a machine designed to defy the very laws of physics and push the human body beyond its absolute limits. This is not evolution. This is a revolution.";

  return (
    <section className="typewriter-section" ref={containerRef}>
      <div className="tw-container">
        <h1 className="tw-text" ref={textRef}>
          {paragraph.split(' ').map((word, i) => (
            <span key={i} className="tw-word">{word} </span>
          ))}
        </h1>
      </div>
    </section>
  );
};

export default TypewriterSection;
