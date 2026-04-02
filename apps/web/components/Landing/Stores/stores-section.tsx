'use client';

import { useState, useMemo } from 'react';
import { Search, Star, Heart, MapPin } from 'lucide-react';
import { Button } from '@ui/button';

const filters = [
  'All',
  'Thai',
  'Japanese',
  'Italian',
  'Vegan',
  'Desserts',
  'Street Food',
];

const restaurants = [
  {
    id: 1,
    name: 'Sakura Garden',
    cuisine: 'Japanese',
    neighborhood: 'West Village',
    rating: 4.8,
    reviewCount: 234,
    priceRange: '$$$',
    isOpen: true,
    review: 'The freshest sushi in town',
    emoji: '🍣',
    gradient: 'from-rose-200 to-pink-100',
  },
  {
    id: 2,
    name: 'Bangkok Street',
    cuisine: 'Thai',
    neighborhood: 'East Village',
    rating: 4.6,
    reviewCount: 189,
    priceRange: '$$',
    isOpen: true,
    review: 'Authentic flavors, cozy atmosphere',
    emoji: '🍜',
    gradient: 'from-amber-200 to-orange-100',
  },
  {
    id: 3,
    name: 'Nonna&apos;s Kitchen',
    cuisine: 'Italian',
    neighborhood: 'Little Italy',
    rating: 4.9,
    reviewCount: 412,
    priceRange: '$$$',
    isOpen: false,
    review: 'Like eating at grandma&apos;s house',
    emoji: '🍝',
    gradient: 'from-yellow-200 to-amber-100',
  },
  {
    id: 4,
    name: 'Green Leaf Cafe',
    cuisine: 'Vegan',
    neighborhood: 'Brooklyn Heights',
    rating: 4.5,
    reviewCount: 156,
    priceRange: '$$',
    isOpen: true,
    review: 'Creative plant-based dishes',
    emoji: '🥗',
    gradient: 'from-emerald-200 to-green-100',
  },
  {
    id: 5,
    name: 'Sugar & Spice',
    cuisine: 'Desserts',
    neighborhood: 'SoHo',
    rating: 4.7,
    reviewCount: 298,
    priceRange: '$$',
    isOpen: true,
    review: 'Heavenly pastries and cakes',
    emoji: '🧁',
    gradient: 'from-pink-200 to-rose-100',
  },
  {
    id: 6,
    name: 'Taco Libre',
    cuisine: 'Street Food',
    neighborhood: 'Lower East Side',
    rating: 4.4,
    reviewCount: 167,
    priceRange: '$',
    isOpen: true,
    review: 'Best street tacos in the city',
    emoji: '🌮',
    gradient: 'from-lime-200 to-yellow-100',
  },
  {
    id: 7,
    name: 'Pho Paradise',
    cuisine: 'Thai',
    neighborhood: 'Chinatown',
    rating: 4.6,
    reviewCount: 203,
    priceRange: '$',
    isOpen: false,
    review: 'Soul-warming bowls of perfection',
    emoji: '🍲',
    gradient: 'from-orange-200 to-red-100',
  },
  {
    id: 8,
    name: 'Osaka Express',
    cuisine: 'Japanese',
    neighborhood: 'Midtown',
    rating: 4.3,
    reviewCount: 145,
    priceRange: '$$',
    isOpen: true,
    review: 'Quick but quality Japanese',
    emoji: '🍱',
    gradient: 'from-red-200 to-rose-100',
  },
  {
    id: 9,
    name: 'La Dolce Vita',
    cuisine: 'Italian',
    neighborhood: 'Upper West Side',
    rating: 4.7,
    reviewCount: 289,
    priceRange: '$$$$',
    isOpen: true,
    review: 'Fine dining at its finest',
    emoji: '🍷',
    gradient: 'from-violet-200 to-purple-100',
  },
];

export function StoresSection() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((restaurant) => {
      const matchesFilter =
        activeFilter === 'All' || restaurant.cuisine === activeFilter;
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.neighborhood
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  const displayedRestaurants = filteredRestaurants.slice(0, visibleCount);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id],
    );
  };

  return (
    <section id="stores" className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-espresso font-serif text-4xl font-bold sm:text-5xl">
            Find Your Next Favorite Spot
          </h2>
          <p className="text-espresso/70 mt-2 text-lg">
            Explore curated restaurants and eateries
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative mx-auto max-w-xl">
            <Search className="text-espresso/40 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines, or neighborhoods..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              className={`bg-cream text-espresso placeholder:text-espresso/40 w-full rounded-xl border-2 py-3 pr-4 pl-12 transition-all duration-300 focus:outline-none ${
                isSearchFocused
                  ? 'border-terracotta shadow-lg'
                  : 'border-border'
              }`}
            />
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setVisibleCount(6);
                }}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-terracotta text-cream shadow-md'
                    : 'border-border bg-cream text-espresso/70 hover:border-terracotta hover:text-terracotta border'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayedRestaurants.map((restaurant) => (
            <div
              key={restaurant.id}
              className="group border-border bg-cream cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <div
                className={`relative h-44 bg-gradient-to-br ${restaurant.gradient}`}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="text-6xl transition-transform duration-300 group-hover:scale-110">
                    {restaurant.emoji}
                  </span>
                </div>
                {/* Cuisine Badge */}
                <div className="bg-cream/90 text-espresso absolute top-3 left-3 rounded-full px-2 py-0.5 text-xs font-medium">
                  {restaurant.cuisine}
                </div>
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(restaurant.id);
                  }}
                  className={`absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 ${
                    favorites.includes(restaurant.id)
                      ? 'bg-terracotta text-cream'
                      : 'bg-cream/90 text-espresso/60 hover:bg-terracotta hover:text-cream'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(restaurant.id) ? 'fill-current' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-espresso font-serif text-lg font-semibold">
                      {restaurant.name.replace(/&apos;/g, "'")}
                    </h3>
                    <p className="text-espresso/60 mt-0.5 flex items-center text-sm">
                      <MapPin className="mr-1 h-3 w-3" />
                      {restaurant.neighborhood}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      restaurant.isOpen
                        ? 'bg-sage/20 text-sage'
                        : 'bg-muted text-espresso/50'
                    }`}
                  >
                    {restaurant.isOpen ? 'Open Now' : 'Closed'}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-terracotta flex items-center">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm font-semibold">
                        {restaurant.rating}
                      </span>
                    </div>
                    <span className="text-espresso/50 text-xs">
                      ({restaurant.reviewCount} reviews)
                    </span>
                  </div>
                  <span className="text-espresso/70 text-sm font-medium">
                    {restaurant.priceRange}
                  </span>
                </div>

                <p className="text-espresso/60 mt-3 truncate text-sm italic">
                  &ldquo;{restaurant.review.replace(/&apos;/g, "'")}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < filteredRestaurants.length && (
          <div className="mt-10 text-center">
            <Button
              variant="outline"
              size="lg"
              className="border-terracotta text-terracotta hover:bg-terracotta hover:text-cream"
              onClick={() => setVisibleCount((prev) => prev + 6)}
            >
              Load More Restaurants
            </Button>
          </div>
        )}

        {filteredRestaurants.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-espresso/60 text-lg">
              No restaurants found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
