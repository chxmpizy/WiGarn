'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@ui/button';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail('');
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="bg-terracotta py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="text-center md:text-left">
            <h2 className="text-cream font-serif text-3xl font-bold">
              Get Weekly Flavor Inspiration
            </h2>
            <p className="text-cream/80 mt-2">
              Join 10,000+ food lovers. New reviews, hidden gems, and recipes
              every Thursday.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-3">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="border-cream/30 bg-cream/10 text-cream placeholder:text-cream/50 focus:border-cream w-full rounded-xl border-2 px-4 py-3 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              className="bg-cream text-terracotta hover:bg-cream/90"
              disabled={isSubmitted}
            >
              {isSubmitted ? (
                'Subscribed!'
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
