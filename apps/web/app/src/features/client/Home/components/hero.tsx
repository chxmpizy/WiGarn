'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@ui/carousel';
import { Card, CardContent } from '@ui/card';
import { Button } from '@ui/button';
import { useTranslations } from 'next-intl';

const Hero = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const hr = useTranslations('Hero');
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="bg-background flex h-[calc(80vh)] items-center justify-around overflow-hidden text-black">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_30%,#a78bfa,transparent_25%),radial-gradient(circle_at_70%_70%,#f472b6,transparent_25%)] opacity-60 blur-3xl"></div>
      <div className="flex flex-col items-center justify-around px-2 text-2xl leading-12 font-bold">
        <h1>
          <span className="text-primary text-4xl">{hr('title')}</span>
          <br />
          {hr('hero_desc')}
        </h1>
        <div className="mt-10 flex w-full items-center justify-center gap-5">
          <Button className="bg-primary text-secondary hover:bg-primary_light cursor-pointer rounded-xl px-5 py-3 text-lg duration-300">
            {hr('button1')}
          </Button>
          <Button className="bg-secondary text-primary border-primary cursor-pointer rounded-xl border-2 px-5 py-3 text-lg duration-300 hover:bg-gray-100">
            {hr('button2')}
          </Button>
        </div>
      </div>
      <div>
        <Carousel className="w-full max-w-lg" setApi={setApi}>
          <CarouselContent>
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <CarouselItem key={idx}>
                  <div
                    className={`w-130 ${idx === 0 ? 'pl-0' : 'px-2'} ${idx === count - 1 ? 'pr-0' : 'px-2'}`}
                  >
                    <Card>
                      <CardContent
                        className={`h-70 w-full rounded-xl bg-[#1C6EA4]`}
                      >
                        Image {idx + 1}
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-5 flex items-center justify-center gap-7">
          {Array(count)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className={`h-3.5 w-3.5 rounded-full ${idx + 1 == current ? 'bg-blue-300' : 'bg-gray-300'}`}
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
