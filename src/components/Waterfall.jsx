import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Waterfall = () => {
  const containerRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(col1Ref.current, {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to(col2Ref.current, {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
      gsap.to(col3Ref.current, {
        yPercent: -80,
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
    <section className="waterfall-section" ref={containerRef}>
      <div className="wf-col" ref={col1Ref}>
        <span>LIMITLESS</span><span>LIMITLESS</span><span>LIMITLESS</span><span>LIMITLESS</span><span>LIMITLESS</span>
      </div>
      <div className="wf-col" ref={col2Ref} style={{marginTop: '-50vh'}}>
        <span className="outline">MOMENTUM</span><span className="outline">MOMENTUM</span><span className="outline">MOMENTUM</span><span className="outline">MOMENTUM</span><span className="outline">MOMENTUM</span>
      </div>
      <div className="wf-col" ref={col3Ref}>
        <span>ENERGY</span><span>ENERGY</span><span>ENERGY</span><span>ENERGY</span><span>ENERGY</span>
      </div>
    </section>
  );
};

export default Waterfall;
