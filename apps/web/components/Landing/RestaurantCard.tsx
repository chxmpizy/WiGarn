'use client';

import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@ui/card';
import { Badge } from '@ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@ui/avatar';

export type RestaurantCardProps = {
  id: string;
  name: string;
  description: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;
  country: string | null;
  phone: string | null;
  website: string | null;
  image_url: string | null;
  rating?: number;
  reviewsCount?: number;
  category?: string;
  distance?: string;
};

export const RestaurantCard = ({
  id,
  name,
  description = null,
  address = null,
  city = null,
  state = null,
  postal_code = null,
  country = null,
  phone = null,
  website = null,
  image_url = null,
  rating = 0,
  reviewsCount = 0,
  category = '',
  distance = '',
}: RestaurantCardProps) => {
  const roundedRating = Math.round((rating || 0) * 10) / 10;
  const stars = Math.round(rating || 0);

  // Build location string from address components
  const locationString =
    [address, city, state].filter(Boolean).join(', ') || 'Location unavailable';

  return (
    <Card className="hover:border-primary/50 group border-muted-foreground/50 mx-10 my-8 w-full max-w-sm overflow-hidden rounded-xl duration-200">
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
          <div className="flex h-full w-full items-center justify-center bg-[color:var(--muted,#ECEFE7)]">
            <span className="text-[color:var(--muted-foreground,#717E7A)]">
              No image
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[color:var(--foreground,#303B37)]">
              {name}
            </h3>

            {description && (
              <p className="mt-1 line-clamp-2 text-sm text-[color:var(--muted-foreground,#717E7A)]">
                {description}
              </p>
            )}

            <div className="mt-2 flex items-center gap-3 text-sm text-[color:var(--muted-foreground,#717E7A)]">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill={i < stars ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      className="inline-block"
                      aria-hidden
                    >
                      <path d="M12 .587l3.668 7.431L23.6 9.75l-5.6 5.457L19.335 24 12 19.897 4.665 24l1.335-8.793L.4 9.75l7.932-1.732z" />
                    </svg>
                  ))}
                </span>

                <span className="font-medium">{roundedRating}</span>
                <span className="text-[color:var(--muted-foreground,#717E7A)]">
                  ({reviewsCount})
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-[color:var(--muted-foreground,#717E7A)]">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              {image_url && <AvatarImage src={image_url} alt={name} />}
              <AvatarFallback>{name?.charAt(0) ?? 'R'}</AvatarFallback>
            </Avatar>
            <span>{category || 'Restaurant'}</span>
          </div>

          {distance && <div className="text-xs">{distance}</div>}
        </div>
      </CardContent>

      <CardFooter className="p-4">
        <div className="flex w-full flex-col gap-2 text-sm text-[color:var(--muted-foreground,#717E7A)]">
          <div>{locationString}</div>
          {phone && (
            <a
              href={`tel:${phone}`}
              className="text-[color:var(--primary,#51B18D)] hover:underline"
            >
              {phone}
            </a>
          )}
          {website && (
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[color:var(--primary,#51B18D)] hover:underline"
            >
              Visit website
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;
