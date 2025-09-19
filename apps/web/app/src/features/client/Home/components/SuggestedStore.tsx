'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@ui/card';
import SizeBadge from '@/app/src/shared/components/sizeBadge/SizeBadge';
import { Button } from '@ui/button';
import StarRating from '@src/shared/components/star/StarRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from 'next-intl';

const SuggestedStore = () => {
  const sg = useTranslations('Suggested_Stores');
  return (
    <div>
      <div className="mt-20 mb-10">
        <h1 className="text-primary text-center text-5xl font-extrabold">
          {sg('title')}
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-10 px-15">
        {Array(6)
          .fill(null)
          .map((_, idx) => (
            <Card
              key={idx}
              className="w-full border-2 border-gray-200 shadow-lg"
            >
              <CardHeader className="px-2 py-2">
                <div className="my-1 flex h-50 w-full items-center justify-center rounded-lg bg-gray-300">
                  <FontAwesomeIcon
                    icon={faImage}
                    className="text-4xl text-gray-400"
                  />
                </div>
                <CardTitle className="mx-2 my-1">
                  <h1 className="text-primary text-xl">Store {idx + 1}</h1>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4">
                <div className="flex gap-2">
                  <h1>Store Size : </h1>
                  <SizeBadge size={'medium'} />
                </div>
                <div className="flex">
                  <h1 className="">Rating :</h1>
                  <StarRating rating={4.5} />
                </div>
              </CardContent>
              <CardFooter className="px-3.5 py-2">
                <Button className="text-primary border-primary hover:bg-primary cursor-pointer rounded-lg border-2 bg-white duration-200 hover:text-white">
                  Shop
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default SuggestedStore;
