import React from 'react';
import StoreCard from '@src/shared/components/storeCard/StoreCard';

const Stores = () => {
  return (
    <div className="grid w-auto grid-cols-5 gap-4">
      {Array(20)
        .fill(null)
        .map((_, idx) => (
          <div key={idx}>
            <StoreCard
              storeName={`test ${idx + 1}`}
              storeSize="small"
              rating={5}
            />
          </div>
        ))}
    </div>
  );
};

export default Stores;
