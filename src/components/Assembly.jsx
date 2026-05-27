import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroShoe from '../assets/hero_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const Assembly = () => {
  const containerRef = useRef(null);
  const leftColRef = useRef(null);
  const rightColRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Dual scroll effect: Left goes up, right goes down relative to scroll
      gsap.to(leftColRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });

      gsap.to(rightColRef.current, {
        yPercent: 20,
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
    <section className="assembly-section" ref={containerRef}>
      <div className="assembly-header">
        <h2>PURE DYNAMICS</h2>
        <p>Every component is engineered for velocity.</p>
      </div>
      
      <div className="assembly-grid">
        <div className="assembly-col left" ref={leftColRef}>
          <div className="assembly-card">
            <img src={heroShoe} alt="Shoe Angled" style={{transform: 'rotate(-45deg) scale(1.2)'}} />
            <div className="card-overlay">
                <h4>AERODYNAMICS</h4>
            </div>
          </div>
          <div className="assembly-card">
            <img src={heroShoe} alt="Shoe Angled" style={{transform: 'rotate(135deg) scale(1.5)', filter: 'hue-rotate(90deg)'}} />
             <div className="card-overlay">
                <h4>PROPULSION</h4>
            </div>
          </div>
        </div>

        <div className="assembly-col right" ref={rightColRef}>
          <div className="assembly-card" style={{marginTop: '-20vh'}}>
            <img src={heroShoe} alt="Shoe Angled" style={{transform: 'rotate(45deg) scale(1.3)', filter: 'hue-rotate(180deg)'}} />
            <div className="card-overlay">
                <h4>STABILITY</h4>
            </div>
          </div>
          <div className="assembly-card">
            <img src={heroShoe} alt="Shoe Angled" style={{transform: 'rotate(-135deg) scale(1.1)', filter: 'hue-rotate(-90deg)'}} />
            <div className="card-overlay">
                <h4>AGILITY</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Assembly;
