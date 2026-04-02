'use client';

import { useState } from 'react';
import { Star, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@ui/button';

const trendingRestaurants = [
  {
    id: 1,
    name: 'Sakura Izakaya',
    cuisine: 'Japanese',
    rating: 4.8,
    location: 'West Village',
    emoji: '🍣',
    gradient: 'from-rose-200 to-orange-100',
    review:
      '"The omakase here changed my life. Every piece of nigiri is a work of art."',
  },
  {
    id: 2,
    name: 'Pasta Fresca',
    cuisine: 'Italian',
    rating: 4.6,
    location: 'Little Italy',
    emoji: '🍝',
    gradient: 'from-amber-200 to-yellow-100',
    review:
      '"Handmade pasta that rivals anything I had in Rome. The carbonara is divine."',
  },
  {
    id: 3,
    name: 'Spice Route',
    cuisine: 'Thai',
    rating: 4.7,
    location: 'East Village',
    emoji: '🍜',
    gradient: 'from-emerald-200 to-teal-100',
    review:
      '"Authentic Thai flavors with a modern twist. The pad thai is perfectly balanced."',
  },
  {
    id: 4,
    name: 'Le Petit Bistro',
    cuisine: 'French',
    rating: 4.5,
    location: 'Upper East Side',
    emoji: '🥐',
    gradient: 'from-violet-200 to-pink-100',
    review:
      '"Transport yourself to Paris. The duck confit is impossibly tender."',
  },
  {
    id: 5,
    name: 'Taco Loco',
    cuisine: 'Mexican',
    rating: 4.9,
    location: 'Brooklyn',
    emoji: '🌮',
    gradient: 'from-lime-200 to-green-100',
    review:
      '"Best tacos outside of Mexico City. The al pastor is worth the trip."',
  },
];

export function TrendingSection() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const scrollContainer = (direction: 'left' | 'right') => {
    const container = document.getElementById('trending-scroll');
    if (container) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-espresso font-serif text-3xl font-bold sm:text-4xl">
              Trending This Week
            </h2>
            <p className="text-espresso/70 mt-2">
              The spots everyone&apos;s talking about
            </p>
          </div>
          <div className="hidden gap-2 sm:flex">
            <Button
              variant="outline"
              size="icon"
              className="border-border rounded-full"
              onClick={() => scrollContainer('left')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-border rounded-full"
              onClick={() => scrollContainer('right')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div
          id="trending-scroll"
          className="scrollbar-hide -mx-4 flex gap-6 overflow-x-auto px-4 py-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {trendingRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group relative w-72 flex-shrink-0 cursor-pointer"
              onMouseEnter={() => setHoveredId(restaurant.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="border-border bg-cream-light overflow-hidden rounded-2xl border transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                {/* Image Placeholder */}
                <div
                  className={`relative h-48 bg-gradient-to-br ${restaurant.gradient}`}
                >
                  <div className="flex h-full items-center justify-center">
                    <span className="text-7xl transition-transform duration-300 group-hover:scale-110">
                      {restaurant.emoji}
                    </span>
                  </div>
                  {/* Hover Overlay with Review */}
                  <div
                    className={`bg-espresso/80 absolute inset-0 flex items-center justify-center p-4 transition-opacity duration-300 ${
                      hoveredId === restaurant.id ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <p className="text-cream text-center font-serif text-sm italic">
                      {restaurant.review}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="bg-sage/20 text-sage rounded-full px-2 py-0.5 text-xs font-medium">
                      {restaurant.cuisine}
                    </span>
                    <div className="text-terracotta flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-semibold">
                        {restaurant.rating}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-espresso mt-2 font-serif text-lg font-semibold">
                    {restaurant.name}
                  </h3>
                  <p className="text-espresso/60 mt-1 flex items-center text-sm">
                    <MapPin className="mr-1 h-3 w-3" />
                    {restaurant.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
