'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@ui/carousel';
import { Card, CardContent } from '@ui/card';

const Hero = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
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
    <div className="bg-background flex h-screen items-center justify-around overflow-hidden text-black">
      <div className="px-2 text-2xl leading-12 font-bold">
        <h1>
          <span className="text-4xl text-[#154D71]">
            Every Scrap Store. Just One Website.
          </span>
          <br />
          Create your own spare parts store online — no physical shop needed.
        </h1>
      </div>
      <div>
        <Carousel className="w-full max-w-lg" setApi={setApi}>
          <CarouselContent>
            {Array(5)
              .fill(0)
              .map((_, idx) => (
                <CarouselItem key={idx}>
                  <div className="w-130 px-2">
                    <Card>
                      <CardContent className="h-70 w-full rounded-xl bg-[#1C6EA4]">
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
