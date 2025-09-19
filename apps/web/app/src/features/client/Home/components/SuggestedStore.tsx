'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
import StoreCard from '@src/shared/components/storeCard/StoreCard';

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
            <StoreCard
              key={idx}
              storeName={`Store ${idx + 1}`}
              storeSize={'medium'}
              rating={4.5}
            />
          ))}
      </div>
    </div>
  );
};

export default SuggestedStore;
