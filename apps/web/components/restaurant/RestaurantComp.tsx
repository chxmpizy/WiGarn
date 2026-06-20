import { useEffect, useState } from 'react';
import RestaurantCard from './components/RestaurantCard';
import axios from 'axios';
import { RestaurantType } from '@/lib/types';

export default function RestaurantComp() {
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRestaurant = async () => {
    try {
      const result = await axios.get(
        `${process.env.NEXT_PUBLIC_API_DEV_URL}/restaurants`,
      );
      return result.data;
    } catch (error) {
      console.error('error : ', error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchRestaurant();
      setRestaurants(data);
      setIsLoading(false);
    };

    loadData();
  }, []);

  if (isLoading)
    return (
      <div className="text-muted-foreground p-8 text-center">
        Loading yummy food...
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        ร้านอาหารแนะนำใน WiGarn
      </h1>

      {/* 💡 ใช้คำสั่ง .slice(0, 6) ล็อกให้แสดงผลแค่ 6 ร้านตามต้องการได้เลย */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {restaurants.slice(0, 6).map((rest) => (
          <RestaurantCard
            key={rest.id}
            id={rest.id}
            name={rest.name}
            image_url={rest.image_url || '/placeholder-food.jpg'}
            category={rest.description || 'General Food'}
            address={rest.address || rest.city || 'Bangkok'}
            description={rest.description}
            city={rest.city}
            state={rest.state}
            postal_code={rest.postal_code}
            country={rest.country}
            phone={rest.phone}
            website={rest.website}
          />
        ))}
      </div>
    </div>
  );
}
