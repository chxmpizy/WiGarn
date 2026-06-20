'use client';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import RestaurantComp from '../components/restaurant/RestaurantComp';
// import   from '../libs/restaurant';

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />

      <RestaurantComp />
    </div>
  );
}
