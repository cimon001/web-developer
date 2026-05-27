import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import heroShoe from '../assets/hero_shoe.png';

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Initial Reveal
      const tl = gsap.timeline();
      tl.from(textRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power4.out',
      })
      .from(imageRef.current, {
        scale: 0.8,
        opacity: 0,
        rotation: 0,
        duration: 1.5,
        ease: 'power3.out',
      }, "-=0.5");

      // Parallax on Scroll
      gsap.to(imageRef.current, {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
      
      gsap.to(textRef.current, {
        yPercent: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={containerRef}>
      <nav className="hero-nav">
        <div className="hero-logo">VELOCITY<span>X</span></div>
        <div className="hero-links">
          <a href="#shop" className="nav-link">SHOP NOW</a>
          <a href="#about" className="nav-link">ABOUT</a>
          <a href="#tech" className="nav-link">TECHNOLOGY</a>
          <a href="#gallery" className="nav-link">GALLERY</a>
        </div>
        <div className="nav-actions">
          <button className="nav-cart-btn">CART (0)</button>
          <button className="nav-signup-btn">SIGN UP</button>
        </div>
      </nav>
      
      <div className="hero-text" ref={textRef}>
        <h1>DEFY<br/>GRAVITY</h1>
        <p>The next generation of kinetic footwear is here. Engineered for absolute speed and ultimate control.</p>
        
        <div className="hero-cta-wrap" style={{ marginTop: '3rem' }}>
           <button className="cta-btn primary-btn">PRE-ORDER NOW</button>
           <button className="cta-btn secondary-btn">WATCH THE FILM</button>
        </div>
      </div>

      <div className="hero-image-container">
        <img ref={imageRef} src={heroShoe} alt="Premium Running Shoe" className="hero-shoe" />
      </div>

      <div className="scroll-indicator">
        SCROLL TO EXPLORE
        <div className="scroll-line"></div>
      </div>
    </section>
  );
};

export default Hero;
