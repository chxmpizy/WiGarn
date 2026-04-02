'use client'
import { useState, useEffect, useRef } from 'react';
import { Navbar } from '@/components/Landing/Navbar';
import { Footer } from '@/components/Landing/Footer';
import { NewsletterSection } from '@/components/Landing/newsletter-section';
import { BlogSection } from '@/components/Landing/Blog/blog-section';
import { StoresSection } from '@/components/Landing/Stores/stores-section';
import { FeaturesSection } from '@/components/Landing/Features/feature-section';
import { TrendingSection } from '@/components/Landing/Trending';
import { HeroSection } from '@/components/Landing/hero-section';

export default function Home() {
  const [activeSection, setActiveSection] = useState('discover');

  const discoverRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);
  const storesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // Handle scroll-based active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'discover', ref: discoverRef },
        { id: 'blog', ref: blogRef },
        { id: 'stores', ref: storesRef },
        { id: 'about', ref: aboutRef },
      ];

      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        if (section.ref.current) {
          const { offsetTop, offsetHeight } = section.ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigate to section
  const handleNavigate = (sectionId: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement | null>> = {
      discover: discoverRef,
      blog: blogRef,
      stores: storesRef,
      about: aboutRef,
    };

    const targetRef = refs[sectionId];
    if (targetRef?.current) {
      const offset = 80; // Account for fixed navbar
      const top = targetRef.current.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  return (
    <div className="grain-overlay bg-cream min-h-screen">
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Discover Section (Landing) */}
      <div ref={discoverRef}>
        <HeroSection onNavigate={handleNavigate} />
        <FeaturesSection />
        <TrendingSection />
        <NewsletterSection />
      </div>

      {/* Blog Section */}
      <div ref={blogRef}>
        <BlogSection />
      </div>

      {/* Stores Section */}
      <div ref={storesRef}>
        <StoresSection />
      </div>

      {/* About/Footer Section */}
      <div ref={aboutRef}>
        <Footer />
      </div>
    </div>
  );
}
