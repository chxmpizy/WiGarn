import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@ui/card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SizeBadge from '@/app/src/shared/components/sizeBadge/SizeBadge';
import { Button } from '@ui/button';
import StarRating from '@src/shared/components/star/StarRating';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface StoreCardProps {
  storeName: string;
  storeSize: 'small' | 'medium' | 'large';
  rating: number;
}

const StoreCard = ({ storeName, storeSize, rating }: StoreCardProps) => {
  return (
    <div>
      <Card className="w-full border-2 border-gray-200 shadow-lg">
        <CardHeader className="px-2 py-2">
          <div className="my-1 flex h-50 w-full items-center justify-center rounded-lg bg-gray-300">
            <FontAwesomeIcon
              icon={faImage}
              className="text-4xl text-gray-400"
            />
          </div>
          <CardTitle className="mx-2 my-1">
            <h1 className="text-primary text-xl">{storeName}</h1>
          </CardTitle>
        </CardHeader>
        <CardContent className="px-4">
          <div className="flex items-center text-sm">
            <h1>Size :</h1>
            <SizeBadge size={storeSize} />
          </div>
          <div className="flex text-sm">
            <h1>Rating : </h1>
            <StarRating rating={rating} />
          </div>
        </CardContent>
        <CardFooter className="px-3.5 py-2">
          <Button className="text-primary border-primary hover:bg-primary cursor-pointer rounded-lg border-2 bg-white duration-200 hover:text-white">
            Shop
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default StoreCard;
