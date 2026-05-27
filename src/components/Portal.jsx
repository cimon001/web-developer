import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Portal = () => {
  const containerRef = useRef(null);
  const portalRef = useRef(null);
  const textRef = useRef(null);

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

      // Expand the circle to fill the screen
      tl.to(portalRef.current, {
        clipPath: 'circle(150% at 50% 50%)',
        ease: 'power2.inOut',
        duration: 1
      });

      // Scale the inner text
      tl.fromTo(textRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 },
        "-=0.5"
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="portal-section" ref={containerRef}>
      <div className="portal-content" ref={portalRef}>
        <div className="portal-inner" ref={textRef}>
          <h2>A NEW DIMENSION</h2>
          <p>BREAKING THE BOUNDARIES OF REALITY</p>
        </div>
      </div>
      <div className="portal-bg-text">ENTER THE VOID</div>
    </section>
  );
};

export default Portal;
