import React, { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import Hero from './components/Hero';
import Loader from './components/Loader';
import Features from './components/Features';
import Technology from './components/Technology';
import Testimonials from './components/Testimonials';
import FillText from './components/FillText';
import Gallery from './components/Gallery';
import ShopNowBanner from './components/ShopNowBanner';
import VideoScroll from './components/VideoScroll';
import Anatomy from './components/Anatomy';
import StripedReveal from './components/StripedReveal';
import SpecsBento from './components/SpecsBento';
import Assembly from './components/Assembly';
import Showcase from './components/Showcase';
import Waterfall from './components/Waterfall';
import Portal from './components/Portal';
import Tunnel from './components/Tunnel';
import StackedCards from './components/StackedCards';
import ParallaxGrid from './components/ParallaxGrid';
import InvertSection from './components/InvertSection';
import TextExplosion from './components/TextExplosion';
import HorizontalStory from './components/HorizontalStory';
import MaskReveal from './components/MaskReveal';
import GlitchMarquee from './components/GlitchMarquee';
import EndlessZoom from './components/EndlessZoom';
import GravityChamber from './components/GravityChamber';
import TypewriterSection from './components/TypewriterSection';
import ColorBlast from './components/ColorBlast';
import LightWarp from './components/LightWarp';
import Footer from './components/Footer';

import './App.css';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when images load to fix overlap bugs
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1500);
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 3000);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return (
    <div className="app">
      <Loader />
      <Hero />
      <Features />
      <Technology />
      <Testimonials />
      <FillText />
      <Gallery />
      <ShopNowBanner />
      <VideoScroll />
      <Anatomy />
      <StripedReveal />
      <SpecsBento />
      <Assembly />
      <Showcase />
      <Waterfall />
      <Portal />
      <Tunnel />
      <StackedCards />
      <ParallaxGrid />
      <InvertSection />
      <TextExplosion />
      <HorizontalStory />
      <MaskReveal />
      <GlitchMarquee />
      <EndlessZoom />
      <GravityChamber />
      <TypewriterSection />
      <ColorBlast />
      <LightWarp />
      <Footer />
    </div>
  );
}

export default App;
