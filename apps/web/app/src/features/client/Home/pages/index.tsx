import React from 'react';
import Hero from '../components/hero';
import FeatureSection from '../components/featureSection';
import Testimonials from '../components/testimonials';
import SuggestedStore from '../components/SuggestedStore';

const Home = () => {
  return (
    <div>
      <Hero />
      <FeatureSection />
      <SuggestedStore />
      <Testimonials />
    </div>
  );
};

export default Home;
