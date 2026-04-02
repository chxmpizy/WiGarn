import { Sparkles, MapPin, Users } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Curated Reviews',
    description:
      'Every review is handpicked for authenticity. No sponsored content, just honest opinions from real food lovers.',
  },
  {
    icon: MapPin,
    title: 'Local Gems',
    description:
      'Discover hidden spots that locals love. From hole-in-the-wall eateries to neighborhood favorites.',
  },
  {
    icon: Users,
    title: 'Community Picks',
    description:
      'See what&apos;s trending in your area. Our community votes on the best dishes and restaurants.',
  },
];

export function FeaturesSection() {
  return (
    <section className="bg-cream-light py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group border-border bg-cream rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="bg-terracotta/10 text-terracotta group-hover:bg-terracotta group-hover:text-cream mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-espresso mb-2 font-serif text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="text-espresso/70">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
