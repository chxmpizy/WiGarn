'use client';
import Navbar from '@/components/Landing/Navbar';
import HeroSection from '@/components/Landing/HeroSection';
import { RestaurantCard } from '@/components/Landing/RestaurantCard';
import { restaurants } from '../libs/restaurant';

export default function Home() {
  return (
    <div className="">
      <Navbar />
      <HeroSection />
      <div className="grid grid-cols-3 justify-around gap-10">
        {restaurants.map((rest, idx) => (
          <div key={idx}>
            <RestaurantCard
              id={rest.id}
              name={rest.name}
              image_url={rest.image_url}
              rating={rest.rating}
              reviewsCount={rest.reviews}
              category={rest.cuisine}
              address={rest.address}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
