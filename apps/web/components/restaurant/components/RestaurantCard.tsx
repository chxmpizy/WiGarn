'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@ui/card';
import { RestaurantType, ReviewType } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { StarRating } from './StarRating';
import axios from 'axios';

export const RestaurantCard = ({
  id,
  name,
  description = null,
  address = null,
  city = null,
  state = null,
  phone = null,
  website = null,
  image_url = '',
}: RestaurantType) => {
  const router = useRouter();
  const [reviewData, setReviewData] = useState<ReviewType[]>([]);

  const ratingAverage = () => {
    if (reviewData.length === 0) {
      return 0;
    }

    let sumRating = 0;

    for (const review of reviewData) {
      sumRating += review.rating;
    }
    const average = sumRating / reviewData.length;
    return Number(average.toFixed(1));
  };

  useEffect(() => {
    let ignore = false;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_DEV_URL}/reviews/restReview/${id}`)
      .then((response) => {
        if (!ignore) {
          setReviewData(response.data);
        }
      })
      .catch((error) => {
        console.error('error', error);
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  // Build location string from address components
  const locationString =
    [address, city, state].filter(Boolean).join(', ') || 'Location unavailable';

  return (
    <Card
      onClick={() => router.push(`/${id}`)}
      className="hover:border-primary/50 group border-muted-foreground/50 my-8 w-full cursor-pointer overflow-hidden rounded-xl duration-200"
    >
      <div className="relative h-48 w-full">
        {image_url ? (
          <Image
            src={image_url}
            alt={name}
            loading="lazy"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="bg-muted flex h-full w-full items-center justify-center">
            <span className="text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-foreground text-lg font-semibold">{name}</h3>

            {description && (
              <p className="text-muted-foreground mt-1 line-clamp-2 text-sm">
                {description}
              </p>
            )}

            <div className="text-muted-foreground mt-2 flex items-center gap-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center text-amber-400">
                  <StarRating value={ratingAverage() ?? 0} />
                </span>

                <span className="font-medium">{ratingAverage()}</span>
                <span className="text-muted-foreground">
                  ({reviewData.length})
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-muted-foreground mt-2 flex w-full flex-col gap-2 text-sm">
          <div>{locationString}</div>
          {phone && (
            <a href={`tel:${phone}`} className="text-primary hover:underline">
              {phone}
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Visit website
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
