import React from 'react';
import Filter from '../components/Filter';
import Stores from '../components/Stores';

const Store = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-3xl">Store</h1>
      <div className="flex justify-between px-6">
        <Filter />
        <Stores />
      </div>
    </div>
  );
};

export default Store;
