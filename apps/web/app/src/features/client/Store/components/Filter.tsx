'use client';
import React, { useState } from 'react';
import { Input } from '@ui/input';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@ui/button';

const Filter = () => {
  const [isFilter, setIsFilter] = useState(false);
  return (
    <div className="mr-5 flex w-full justify-between">
      <div>
        <div
          className="bg-primary flex h-10 w-30 cursor-pointer items-center justify-between rounded-lg px-3 text-white"
          onClick={() => setIsFilter(!isFilter)}
        >
          <h1>Filter</h1>
          <FontAwesomeIcon icon={isFilter ? faChevronUp : faChevronDown} />
        </div>
        {isFilter && <div className="absolute h-1/2 w-1/5 bg-red-500"></div>}
      </div>
      <div className="border-primary flex h-10 w-60 items-center justify-center rounded-lg border-2 pr-1.5">
        <Input className="border-none outline-none" placeholder="Search..." />
        <Button className="flex w-2 cursor-pointer items-center justify-center">
          <FontAwesomeIcon
            icon={faSearch}
            className="bg-primary rounded-md text-white"
          />
        </Button>
      </div>
    </div>
  );
};

export default Filter;
