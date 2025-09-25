import React from 'react';
import { Input } from '@ui/input';

const Filter = () => {
  return (
    <div className="mr-5 w-1/5">
      <Input
        placeholder="Search..."
        className="border-primary rounded-2xl border-2"
      />
    </div>
  );
};

export default Filter;
