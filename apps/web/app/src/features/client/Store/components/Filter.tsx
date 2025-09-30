'use client';
import React, { useState } from 'react';
import { Input } from '@ui/input';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@ui/button';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@ui/form';
import { Label } from '@ui/label';

const filterSizeSchema = z.object({
  size: z.enum(['Small', 'Medium', 'Large']),
});
const filterRatinghSchema = z.object({
  rating: z.enum(['0-1', '2-3', '4-5']),
});

const Filter = () => {
  const sizeForm = useForm<z.infer<typeof filterSizeSchema>>({
    resolver: zodResolver(filterSizeSchema),
  });
  const ratingForm = useForm<z.infer<typeof filterRatinghSchema>>({
    resolver: zodResolver(filterRatinghSchema),
  });
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
        {isFilter && (
          <div className="absolute mt-2 w-1/7 rounded-lg border-2 border-gray-200 bg-white shadow-lg">
            <div className="flex flex-col gap-3 px-4 py-2">
              <Form {...sizeForm}>
                <FormField
                  control={sizeForm.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Size</FormLabel>
                      {['Small', 'Medium', 'Large'].map((s) => {
                        return (
                          <FormControl key={s}>
                            <div className="flex items-center">
                              <Input
                                id={s}
                                type="radio"
                                value={s}
                                checked={field.value === s}
                                onChange={() => field.onChange(s)}
                                className="w-auto"
                              />
                              <Label htmlFor={s} className="ml-2 w-auto">
                                {s}
                              </Label>
                            </div>
                          </FormControl>
                        );
                      })}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
              <Form {...ratingForm}>
                <FormField
                  control={ratingForm.control}
                  name="rating"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">
                        Rating
                      </FormLabel>
                      {['4-5', '2-3', '0-1'].map((s) => {
                        return (
                          <FormControl key={s}>
                            <div className="flex items-center">
                              <Input
                                id={s}
                                type="radio"
                                value={s}
                                checked={field.value === s}
                                onChange={() => field.onChange(s)}
                                className="w-auto"
                              />
                              <Label
                                htmlFor={s}
                                className="ml-2 flex w-20 items-center"
                              >
                                {s}{' '}
                                <FontAwesomeIcon
                                  icon={faStar}
                                  name="star"
                                  className="w-10 text-xs text-yellow-500"
                                />
                              </Label>
                            </div>
                          </FormControl>
                        );
                      })}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Form>
            </div>
          </div>
        )}
      </div>
      <div className="border-primary flex h-10 w-60 items-center justify-center rounded-lg border-2 pr-1.5">
        <Input
          className="text-primary border-none outline-none"
          placeholder="Search..."
        />
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
