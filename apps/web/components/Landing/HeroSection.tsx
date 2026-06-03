import React from 'react';
import { Button } from '@ui/button';
import Image from 'next/image';
import heroImage from '../../public/heroImage.jpeg';
import { useRouter } from 'next/navigation';

const HeroSection = () => {
  const route = useRouter();
  return (
    <section className="border-border flex h-[90vh] items-center justify-center border-b">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2 md:py-20">
        <div className="flex flex-col justify-center">
          <p className="text-primary-dark text-sm">
            Honest reviews. Real places.
          </p>
          <h1 className="text-foreground mt-3 text-4xl leading-tight md:text-5xl">
            Find your next favorite spot.
          </h1>
          <p className="text-muted-foreground mt-4 max-w-md">
            A simple, community-driven guide to restaurants worth your time.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              className="cursor-pointer"
              onClick={() => route.push('/auth/signin')}
            >
              Let's Review!!
            </Button>
          </div>
        </div>

        <div className="border-border relative overflow-hidden rounded-3xl border">
          <Image
            src={heroImage}
            alt="A bright restaurant table with fresh dishes"
            width={1600}
            height={900}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
