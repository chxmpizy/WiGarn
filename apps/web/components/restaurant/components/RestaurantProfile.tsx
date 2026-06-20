'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RestaurantType, ReviewType } from '@/lib/types';
import Image from 'next/image';
import { StarRating } from './StarRating';
import Link from 'next/link';
import { Button } from '@ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar';
import { IconMapPin, IconPencilPlus, IconArrowLeft } from '@tabler/icons-react';
import { Utensils } from 'lucide-react';
import { ReviewCard } from '@/components/Post/ReviewCard';

interface RestaurantProfileProps {
  id: number;
}

export const RestaurantProfile = ({ id }: RestaurantProfileProps) => {
  const [restData, setRestData] = useState<RestaurantType | null>(null);
  const [reviewData, setReviewData] = useState<ReviewType[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);

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

  const fetchRestaurantById = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DEV_URL}/restaurants/${id}`,
      );
      setRestData(response.data);
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviewByRestaurantId = async (id: number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DEV_URL}/reviews/restReview/${id}`,
      );
      setReviewData(response.data);
    } catch (error) {
      console.error('error', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurantById(id);
    fetchReviewByRestaurantId(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading restaurant details...</p>
      </div>
    );
  }

  if (!restData) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">Restaurant not found</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <div className="relative h-120 w-full overflow-hidden">
        {restData.image_url ? (
          <Image
            src={restData.image_url as string}
            alt={restData.name ?? 'Restaurant image'}
            fill
            priority
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="bg-secondary h-full w-full" />
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent" />

        {/* Back Button */}
        <Link
          href="/"
          className="text-foreground absolute top-25 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium hover:bg-white"
        >
          <IconArrowLeft size={18} />
          Back
        </Link>

        {/* Restaurant Info Overlay */}
        <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
          <p className="text-xs font-medium tracking-wider uppercase opacity-90">
            {restData.category}
          </p>
          <h1 className="mt-2 font-serif text-4xl font-bold">
            {restData.name}
          </h1>
          <div className="mt-3 flex items-center gap-3">
            <StarRating value={ratingAverage() ?? 0} />
            <span className="font-semibold">{ratingAverage().toFixed(1)}</span>
            <span className="opacity-90">({reviewData.length} reviews)</span>
          </div>
        </div>
      </div>

      {/* Info Bar */}
      <div className="border-border border-b bg-white px-6 py-4">
        <div className="mx-auto flex max-w-full items-center">
          <div className="flex flex-wrap items-center gap-6">
            {restData.address && (
              <div className="text-muted-foreground flex items-center gap-5 text-sm">
                <div className="flex gap-2">
                  <Utensils size={18} className="text-primary" />
                  <span>{restData.category}</span>
                </div>
                <div className="flex gap-2">
                  <IconMapPin size={18} className="text-primary" />
                  <span>{restData.address}</span>
                </div>
              </div>
            )}

            {/* <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <IconClock size={18} className="text-primary" />
              <span>11:30 – 22:00</span>
            </div>

            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <IconCurrencyDollar size={18} className="text-primary" />
              <span>$$</span>
            </div> */}
            {/* <div className="text-muted-foreground text-sm">Open now</div> */}
          </div>

          {/* <div className="flex items-center justify-between"> */}
          <Button
            onClick={() => setOpen(true)}
            className="bg-primary hover:bg-primary-dark fixed right-10 bottom-10 gap-2 rounded-full text-white"
          >
            <IconPencilPlus size={18} />
            Write a Review
          </Button>
          {/* </div> */}
          <ReviewCard
            open={open}
            onClose={() => setOpen(false)}
            restaurantName={restData.name}
            restaurant_id={restData.id}
            onSubmitted={() => fetchReviewByRestaurantId(id)}
          />
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mx-auto max-w-full px-4 py-8">
        <Tabs defaultValue="overview" className="flex w-full flex-col">
          <TabsList className="border-border border-b bg-transparent p-0">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:border-primary border-t-0 border-r-0 border-b-2 border-l-0"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="data-[state=active]:border-primary border-t-0 border-r-0 border-b-2 border-l-0"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger
              value="photos"
              className="data-[state=active]:border-primary border-t-0 border-r-0 border-b-2 border-l-0"
            >
              Photos
            </TabsTrigger>
            <TabsTrigger
              value="menu"
              className="data-[state=active]:border-primary border-t-0 border-r-0 border-b-2 border-l-0"
            >
              Menu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="prose max-w-none">
              <h2 className="font-serif text-2xl">About</h2>
              <p className="text-muted-foreground mt-4">
                {restData.description || 'No description available'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="font-serif text-2xl">
                  {reviewData.length} reviews
                </h2>

                {/* <p className="text-muted-foreground px-3 py-2 text-sm font-semibold">
                  Most recent
                </p> */}
              </div>

              <div className="space-y-6">
                {reviewData.map((review, idx) => (
                  <div
                    key={idx}
                    className="border-muted-foreground/20 flex gap-4 border-b pb-5"
                  >
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarImage
                        src={review.user?.image_url || undefined}
                        alt={review.user?.name ?? 'User avatar'}
                      />
                      <AvatarFallback className="h-10 w-10 text-sm font-medium">
                        {review.user?.name?.charAt(0).toUpperCase() ?? '?'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-3">
                      <div>
                        <p>{review.user?.name}</p>
                        <div className="flex gap-2">
                          <StarRating value={review.rating ?? 0} />
                          <p className="text-muted-foreground/80">
                            ({review.rating})
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground/80">
                        {review.review_des}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <p className="text-muted-foreground">Photos coming soon</p>
          </TabsContent>

          <TabsContent value="menu" className="mt-6">
            <p className="text-muted-foreground">Menu coming soon</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
