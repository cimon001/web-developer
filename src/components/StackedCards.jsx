import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StackedCards = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (index === cardsRef.current.length - 1) return; // Skip the last one
        
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          endTrigger: containerRef.current,
          end: 'bottom bottom',
          pin: true,
          pinSpacing: false,
          id: `card-${index}`,
        });

        // Scale down and darken as the next card comes up
        gsap.to(card, {
          scale: 0.9,
          opacity: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current[index + 1],
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="stacked-section" ref={containerRef}>
      <div className="stacked-card" ref={el => cardsRef.current[0] = el} style={{background: '#111'}}>
        <h2 className="stacked-title">PRECISION</h2>
        <p>Micro-engineered to the nanometer.</p>
      </div>
      <div className="stacked-card" ref={el => cardsRef.current[1] = el} style={{background: '#222', color: 'var(--accent-secondary)'}}>
        <h2 className="stacked-title">CONTROL</h2>
        <p>Unrivaled grip on any surface.</p>
      </div>
      <div className="stacked-card" ref={el => cardsRef.current[2] = el} style={{background: 'var(--accent-color)', color: '#000'}}>
        <h2 className="stacked-title">DOMINANCE</h2>
        <p>Leave the competition behind.</p>
      </div>
    </section>
  );
};

export default StackedCards;
