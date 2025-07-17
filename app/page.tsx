import { GridSection } from '@/components/GridSection';
import { HeroSection } from '@/components/HeroSection';
import Navbar from '@/components/NavBar';
import React from 'react';

const page = () => {
  return (
    <main>
      <HeroSection />
      <GridSection />
    </main>
  )
};

export default page;