import { GridSection } from '@/components/GridSection';
import { HeroSection } from '@/components/HeroSection';
import Navbar from '@/components/NavBar';
import NewsLetter from '@/components/NewsLetter';
import { AnimatedTestimonialsDemo } from '@/components/Testimonials';
import React from 'react';

const page = () => {
  return (
    <main>
      <HeroSection />
      <GridSection />
      <AnimatedTestimonialsDemo />
      <NewsLetter />
    </main>
  )
};

export default page;