'use client';
import React from 'react';
import { Card, CardContent, CardFooter, CardTitle } from '@ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@ui/carousel';
import { Avatar, AvatarFallback } from '@ui/avatar';
import { useTranslations } from 'next-intl';

const Testimonials = () => {
  const [api, setApi] = React.useState<CarouselApi>();
  const tm = useTranslations('Testimonials');
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!api) {
      return;
    }
    const interval = setInterval(() => {
      if (!api.canScrollNext()) {
        // if at the end → jump back to start
        api.scrollTo(0);
      } else {
        // otherwise → move to next slide
        api.scrollNext();
        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);
      }
    }, 2000); // change every 3s

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
      return () => clearInterval(interval);
    });
  }, [api]);
  return (
    <div className="text-primary my-25 h-1/2 px-10">
      <div className="my-10">
        <h1 className="text-center text-5xl font-extrabold">{tm('title')}</h1>
      </div>
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>
          {Array(6)
            .fill(null)
            .map((_, idx) => (
              <CarouselItem key={idx}>
                <div className="w-dvw max-w-md px-3">
                  <Card className="flex flex-col gap-4 border-2 border-gray-200 px-4 py-2">
                    <CardContent>
                      <h1 className="text-lg leading-7">
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Adipisci, magnam veniam soluta recusandae odio ab
                        quis neque quas dolores, et ipsa quam, pariatur ex illo!
                        Ratione minima illo odit. Quod.
                      </h1>
                    </CardContent>
                    <CardFooter className="flex justify-start gap-2">
                      <Avatar className="mb-4 flex items-center">
                        <AvatarFallback className="bg-primary text-secondary h-10 w-10 rounded-full text-center text-sm">
                          CH
                        </AvatarFallback>
                        <CardTitle className="mx-2">Champ</CardTitle>
                      </Avatar>
                    </CardFooter>
                  </Card>
                </div>
              </CarouselItem>
            ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Testimonials;
