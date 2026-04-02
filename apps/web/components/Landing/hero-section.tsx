'use client';

import { useState, useEffect } from 'react';
import { Star, MapPin } from 'lucide-react';
import { Button } from '@ui/button';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const words = ['Taste.', 'Discover.', 'Review.'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <section className="grain-overlay bg-cream relative min-h-screen overflow-hidden pt-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-espresso font-serif text-5xl leading-tight font-bold sm:text-6xl lg:text-7xl">
              <span
                className={`text-terracotta inline-block transition-all duration-300 ${
                  isAnimating
                    ? '-translate-y-4 opacity-0'
                    : 'translate-y-0 opacity-100'
                }`}
              >
                {words[currentWordIndex]}
              </span>
              <br />
              <span className="text-balance">Your Next Culinary</span>
              <br />
              <span className="text-balance">Adventure</span>
            </h1>
            <p className="text-espresso/70 mt-6 max-w-lg text-lg">
              Find the best local food experiences, from hidden street food gems
              to fine dining destinations. Join our community of food lovers.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="bg-terracotta text-cream hover:bg-terracotta/90"
                onClick={() => onNavigate('stores')}
              >
                Explore Restaurants
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-espresso/20 text-espresso hover:bg-espresso/5 bg-transparent"
                onClick={() => onNavigate('blog')}
              >
                Read the Blog
              </Button>
            </div>
          </div>

          {/* Right Content - Decorative + Featured Card */}
          <div className="relative flex items-center justify-center lg:justify-end">
            {/* Decorative Food Illustration */}
            <div className="from-terracotta/20 to-sage/20 absolute -top-20 -right-20 h-72 w-72 rounded-full bg-gradient-to-br blur-3xl" />
            <div className="from-sage/30 to-terracotta/10 absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-gradient-to-tr blur-2xl" />

            {/* Large Decorative Element */}
            <div className="relative z-10 hidden lg:block">
              <div className="from-terracotta/30 via-terracotta/20 absolute top-8 -left-8 h-64 w-64 rounded-3xl bg-gradient-to-br to-transparent" />
              <div className="from-sage/40 via-sage/20 to-cream relative h-80 w-80 overflow-hidden rounded-3xl bg-gradient-to-br shadow-2xl">
                <div className="flex h-full flex-col items-center justify-center p-8">
                  <span className="text-8xl">🍜</span>
                  <p className="text-espresso/80 mt-4 text-center font-serif text-xl">
                    Explore flavors from around the world
                  </p>
                </div>
              </div>
            </div>

            {/* Featured Today Card */}
            <div className="border-border bg-cream-light absolute -bottom-4 left-0 z-20 w-72 rounded-2xl border p-4 shadow-xl lg:right-48 lg:left-auto">
              <div className="text-terracotta mb-2 text-xs font-semibold tracking-wider uppercase">
                Featured Today
              </div>
              <div className="flex gap-3">
                <div className="from-terracotta/30 to-sage/20 flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br">
                  <span className="text-3xl">🍝</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-espresso truncate font-serif text-base font-semibold">
                    Trattoria Milano
                  </h3>
                  <p className="text-espresso/60 text-sm">Italian · $$</p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="text-terracotta flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < 4 ? 'fill-current' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="text-espresso/50 flex items-center text-xs">
                      <MapPin className="mr-0.5 h-3 w-3" />
                      SoHo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2">
          <span className="text-espresso/50 text-xs font-medium tracking-wider uppercase">
            Scroll to explore
          </span>
          <div className="border-espresso/20 h-12 w-6 rounded-full border-2 p-1">
            <div className="bg-terracotta h-2 w-2 animate-bounce rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
