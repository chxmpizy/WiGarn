import React from 'react';
import Filter from '../components/Filter';
import Stores from '../components/Stores';

const Store = () => {
  return (
    <div className="flex h-full items-center justify-center gap-4">
      <div className="flex flex-col justify-between gap-4 px-6">
        <Filter />
        <Stores />
      </div>
    </div>
  );
};

export default Store;
