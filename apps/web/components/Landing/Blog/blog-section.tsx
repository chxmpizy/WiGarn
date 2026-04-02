'use client';

import { Clock, User } from 'lucide-react';

const featuredPost = {
  title:
    'The Art of Dim Sum: A Journey Through Hong Kong&apos;s Best Tea Houses',
  excerpt:
    'From the bustling streets of Kowloon to hidden gems in the New Territories, we explore the traditions and tastes that make dim sum an unforgettable experience.',
  category: 'Travel & Food',
  author: {
    name: 'Sarah Chen',
    avatar: '👩‍🍳',
  },
  readTime: '8 min read',
  emoji: '🥟',
  gradient: 'from-rose-200 via-pink-100 to-orange-100',
};

const blogPosts = [
  {
    id: 1,
    title: 'Street Food Revolution: 5 Vendors Changing the Game',
    excerpt: 'These innovative vendors are redefining what street food can be.',
    category: 'Street Food',
    author: 'Marcus Lee',
    date: 'Mar 28, 2026',
    emoji: '🍢',
    gradient: 'from-amber-200 to-yellow-100',
  },
  {
    id: 2,
    title: 'Behind the Pass: A Day with Chef Elena Rossi',
    excerpt:
      'An intimate look at the routines and rituals of a Michelin-starred kitchen.',
    category: 'Fine Dining',
    author: 'James Wright',
    date: 'Mar 25, 2026',
    emoji: '👨‍🍳',
    gradient: 'from-violet-200 to-purple-100',
  },
  {
    id: 3,
    title: 'The Best Hidden Speakeasies for Late-Night Bites',
    excerpt: 'Discover secret spots serving incredible food after midnight.',
    category: 'Hidden Gems',
    author: 'Nina Patel',
    date: 'Mar 22, 2026',
    emoji: '🍸',
    gradient: 'from-emerald-200 to-teal-100',
  },
  {
    id: 4,
    title: 'Plant-Based Paradise: Vegan Spots That Convert Skeptics',
    excerpt:
      'Even the most devoted carnivores will love these plant-forward restaurants.',
    category: 'Vegan',
    author: 'Alex Kim',
    date: 'Mar 19, 2026',
    emoji: '🥗',
    gradient: 'from-lime-200 to-green-100',
  },
];

const popularPosts = [
  { title: 'Best Brunch Spots in Brooklyn', views: '12.4k' },
  { title: '10 Pasta Dishes to Try Before You Die', views: '9.8k' },
  { title: 'The Ultimate Guide to Ramen', views: '8.2k' },
  { title: 'Coffee Shop Tour: East Village', views: '7.1k' },
];

const tags = [
  'Italian',
  'Japanese',
  'Street Food',
  'Fine Dining',
  'Brunch',
  'Vegan',
  'Desserts',
  'Coffee',
  'Cocktails',
  'Hidden Gems',
];

export function BlogSection() {
  return (
    <section id="blog" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="text-espresso font-serif text-4xl font-bold sm:text-5xl">
            The Digest
          </h2>
          <p className="text-espresso/70 mt-2 text-lg">
            Food Stories & Reviews
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Featured Post */}
            <div className="group border-border bg-cream-light mb-10 cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-xl">
              <div
                className={`relative h-64 bg-gradient-to-br ${featuredPost.gradient} sm:h-80`}
              >
                <div className="flex h-full items-center justify-center">
                  <span className="text-9xl transition-transform duration-300 group-hover:scale-110">
                    {featuredPost.emoji}
                  </span>
                </div>
                <div className="bg-terracotta text-cream absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold">
                  {featuredPost.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-espresso group-hover:text-terracotta font-serif text-2xl font-bold transition-colors">
                  The Art of Dim Sum: A Journey Through Hong Kong&apos;s Best
                  Tea Houses
                </h3>
                <p className="text-espresso/70 mt-3">{featuredPost.excerpt}</p>
                <div className="mt-4 flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="bg-sage/20 flex h-8 w-8 items-center justify-center rounded-full">
                      <span>{featuredPost.author.avatar}</span>
                    </div>
                    <span className="text-espresso text-sm font-medium">
                      {featuredPost.author.name}
                    </span>
                  </div>
                  <span className="text-espresso/50 flex items-center text-sm">
                    <Clock className="mr-1 h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Article Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="group border-border bg-cream-light cursor-pointer overflow-hidden rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div
                    className={`relative h-40 bg-gradient-to-br ${post.gradient}`}
                  >
                    <div className="flex h-full items-center justify-center">
                      <span className="text-5xl transition-transform duration-300 group-hover:scale-110">
                        {post.emoji}
                      </span>
                    </div>
                    <div className="bg-espresso/80 text-cream absolute top-3 left-3 rounded-full px-2 py-0.5 text-xs font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-espresso group-hover:text-terracotta font-serif text-lg font-semibold transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-espresso/70 mt-2 line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="text-espresso/50 mt-3 flex items-center justify-between text-xs">
                      <span className="flex items-center">
                        <User className="mr-1 h-3 w-3" />
                        {post.author}
                      </span>
                      <span>{post.date}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Popular This Week */}
            <div className="border-border bg-cream-light rounded-2xl border p-6">
              <h3 className="text-espresso mb-4 font-serif text-lg font-semibold">
                Popular This Week
              </h3>
              <ul className="space-y-4">
                {popularPosts.map((post, index) => (
                  <li key={index} className="group cursor-pointer">
                    <div className="flex items-start gap-3">
                      <span className="bg-terracotta/10 text-terracotta flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        {index + 1}
                      </span>
                      <div>
                        <p className="text-espresso group-hover:text-terracotta text-sm font-medium transition-colors">
                          {post.title}
                        </p>
                        <p className="text-espresso/50 text-xs">
                          {post.views} views
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="border-border bg-cream-light rounded-2xl border p-6">
              <h3 className="text-espresso mb-4 font-serif text-lg font-semibold">
                Explore Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-border bg-cream text-espresso/70 hover:border-terracotta hover:text-terracotta cursor-pointer rounded-full border px-3 py-1 text-sm transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Reviewer */}
            <div className="border-border from-sage/20 to-terracotta/10 rounded-2xl border bg-gradient-to-br p-6">
              <h3 className="text-espresso mb-4 font-serif text-lg font-semibold">
                Featured Reviewer
              </h3>
              <div className="flex items-center gap-3">
                <div className="bg-cream flex h-14 w-14 items-center justify-center rounded-full text-2xl shadow-md">
                  👨‍🍳
                </div>
                <div>
                  <p className="text-espresso font-semibold">Marcus Lee</p>
                  <p className="text-espresso/60 text-sm">142 reviews</p>
                </div>
              </div>
              <p className="text-espresso/70 mt-4 text-sm italic">
                &ldquo;I believe every meal is an opportunity for discovery.
                Follow my journey through the city&apos;s hidden culinary
                treasures.&rdquo;
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
