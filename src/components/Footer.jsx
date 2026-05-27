import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="cta-footer" ref={footerRef}>
      <div className="cta-content" ref={contentRef}>
        <h2>STEP INTO <br/>THE FUTURE</h2>
        <button className="cta-btn">PRE-ORDER NOW</button>
      </div>
      
      <div style={{ position: 'absolute', bottom: '2rem', width: '100%', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem', letterSpacing: '2px' }}>
        © {new Date().getFullYear()} VELOCITYX. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;
