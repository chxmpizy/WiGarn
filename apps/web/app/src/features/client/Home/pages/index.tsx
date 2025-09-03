import React from 'react';
import Navbar from '@src/shared/components/Navbar';
import Hero from '../components/hero';
import FeatureSection from '../components/featureSection';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <FeatureSection />
    </div>
  );
};

export default Home;
