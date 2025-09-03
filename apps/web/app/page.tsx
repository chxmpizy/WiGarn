import React from 'react';
import Home from './src/features/client/Home/pages';
import Navbar from '@src/shared/components/Navbar';

const page = () => {
  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
};

export default page;
