import React from 'react';
import { RestaurantProfile } from '@/components/restaurant/components/RestaurantProfile';
import Navbar from '@/components/Navbar';

interface PageProps {
  params: Promise<{ id: string }>;
}

const page = async ({ params }: PageProps) => {
  const resolvedParams = await params;
  const restaurantId = Number(resolvedParams.id);

  return (
    <div>
      <Navbar />
      <RestaurantProfile id={restaurantId} />
    </div>
  );
};

export default page;
