'use client';

import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@ui/button';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'discover', label: 'Discover' },
    { id: 'blog', label: 'Blog' },
    { id: 'stores', label: 'Stores' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-cream/95 shadow-sm backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Logo */}
          <button
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <div className="bg-terracotta text-cream flex h-8 w-8 items-center justify-center rounded-lg">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-5 w-5"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 3v18M8 7c0-2 1-4 4-4s4 2 4 4M6 12h12" />
                <path d="M17 17l3 3M7 17l-3 3" />
              </svg>
            </div>
            <span className="text-espresso font-serif text-xl font-bold tracking-tight">
              FORK & INK
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative py-1 text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'text-terracotta'
                    : 'text-espresso/70 hover:text-espresso'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="bg-terracotta absolute -bottom-1 left-0 h-0.5 w-full" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden items-center gap-4 md:flex">
            <button className="text-espresso/70 hover:text-espresso transition-colors">
              <Search className="h-5 w-5" />
            </button>
            <Button className="bg-terracotta text-cream hover:bg-terracotta/90">
              Write a Review
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-espresso md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="border-border bg-cream border-t pb-4 md:hidden">
            <div className="space-y-1 px-2 pt-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-base font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-terracotta/10 text-terracotta'
                      : 'text-espresso/70 hover:bg-muted'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-4 flex flex-col gap-2 px-3">
                <Button
                  variant="outline"
                  className="border-border w-full justify-start"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button className="bg-terracotta text-cream hover:bg-terracotta/90 w-full">
                  Write a Review
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
