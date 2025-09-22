import React from 'react';
import Filter from '../components/Filter';

const Store = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-xl">Store</h1>
      <Filter />
    </div>
  );
};

export default Store;
