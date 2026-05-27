import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ColorBlast = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: true,
        }
      });

      // Rapidly shift colors on scroll
      tl.to(containerRef.current, { backgroundColor: '#fff', color: '#000', duration: 1 })
        .to(containerRef.current, { backgroundColor: 'var(--accent-color)', color: '#000', duration: 1 })
        .to(containerRef.current, { backgroundColor: 'var(--accent-secondary)', color: '#000', duration: 1 })
        .to(containerRef.current, { backgroundColor: '#050505', color: '#fff', duration: 1 });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="color-blast-section" ref={containerRef}>
      <div className="cb-content">
        <h1>ADAPT OR <br/>BE LEFT BEHIND.</h1>
      </div>
    </section>
  );
};

export default ColorBlast;
