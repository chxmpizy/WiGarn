import Image from 'next/image';

const footerLinks = {
  discover: [
    { label: 'Popular Restaurants', href: '#' },
    { label: 'New Openings', href: '#' },
    { label: 'Near Me', href: '#' },
    { label: 'Top Rated', href: '#' },
  ],
  company: [
    { label: 'About Us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Contact', href: '#' },
  ],
  resources: [
    { label: 'Blog', href: '#' },
    { label: 'Help Center', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'Guidelines', href: '#' },
  ],
};

const socialLinks = [
  { icon: '/instragram.svg', href: '#', label: 'Instagram' },
  { icon: '/twitter.svg', href: '#', label: 'Twitter' },
  { icon: '/facebook.svg', href: '#', label: 'Facebook' },
  //   { icon: lucideReact.Youtube, href: '#', label: 'YouTube' },
];

export function Footer() {
  return (
    <footer className="bg-espresso text-cream py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <div className="bg-terracotta flex h-10 w-10 items-center justify-center rounded-lg">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-cream h-6 w-6"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3v18M8 7c0-2 1-4 4-4s4 2 4 4M6 12h12" />
                  <path d="M17 17l3 3M7 17l-3 3" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold">FORK & INK</span>
            </div>
            <p className="text-cream/70 mt-4 max-w-sm">
              Your guide to extraordinary culinary experiences. Discover, taste,
              and share the best food in your city.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="bg-cream/10 text-cream/70 hover:bg-terracotta hover:text-cream flex h-10 w-10 items-center justify-center rounded-full transition-all"
                  aria-label={social.label}
                >
                  <Image
                    src={social.icon}
                    alt={social.label}
                    width={40}
                    height={40}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold">Discover</h4>
            <ul className="space-y-3">
              {footerLinks.discover.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/70 hover:text-terracotta transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/70 hover:text-terracotta transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/70 hover:text-terracotta transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-cream/10 mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
          <p className="text-cream/50 text-sm">
            © 2026 Fork & Ink. All rights reserved.
          </p>
          <div className="text-cream/50 flex gap-6 text-sm">
            <a href="#" className="hover:text-cream transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-cream transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
