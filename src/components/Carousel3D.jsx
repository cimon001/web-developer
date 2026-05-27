import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import blueShoe from '../assets/gallery_shoe_blue.png';
import purpleShoe from '../assets/gallery_shoe_purple.png';
import heroShoe from '../assets/hero_shoe.png';
import featureShoe from '../assets/feature_shoe.png';

gsap.registerPlugin(ScrollTrigger);

const Carousel3D = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // The carousel rotates a full 360 degrees as you scroll
      gsap.to(carouselRef.current, {
        rotationY: -360,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // Pinned for a long scroll distance
          pin: true,
          scrub: 1,
        }
      });
      
      // Massive scale-up entrance when it comes into view
      gsap.from(carouselRef.current, {
          scale: 0,
          rotationX: 45,
          opacity: 0,
          scrollTrigger: {
              trigger: containerRef.current,
              start: 'top bottom',
              end: 'top center',
              scrub: 1
          }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // 6 items to create a perfect hexagon cylinder in 3D space
  const shoes = [heroShoe, blueShoe, featureShoe, purpleShoe, heroShoe, blueShoe];

  return (
    <section className="carousel-3d-section" ref={containerRef}>
      <h2 className="c3d-title">360° PERSPECTIVE</h2>
      
      <div className="c3d-scene">
        <div className="c3d-carousel" ref={carouselRef}>
          {shoes.map((shoe, i) => {
            const angle = (360 / shoes.length) * i;
            return (
              <div 
                key={i} 
                className="c3d-item"
                // TranslateZ pushes the cards outwards in 3D space to form the cylinder
                style={{ transform: `rotateY(${angle}deg) translateZ(450px)` }}
              >
                <img src={shoe} alt={`3D Shoe ${i}`} />
                <div className="c3d-shadow"></div>
              </div>
            );
          })}
        </div>
      </div>
      
    </section>
  );
};

export default Carousel3D;
