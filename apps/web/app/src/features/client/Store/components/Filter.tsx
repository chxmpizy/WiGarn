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
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormDescription,
  FormMessage,
} from '@ui/form';
import { Label } from '@ui/label';

const filterSchema = z.object({ size: z.enum(['Small', 'Medium', 'Large']) });

const Filter = () => {
  const form = useForm<z.infer<typeof filterSchema>>({
    resolver: zodResolver(filterSchema),
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
          <div className="absolute mt-2 h-1/2 w-1/5 rounded-lg border-2 border-gray-200 bg-white shadow-lg">
            <div>
              <Form {...form}>
                <FormField
                  control={form.control}
                  name="size"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Size</FormLabel>
                      {['Small', 'Medium', 'Large'].map((s) => {
                        return (
                          <FormControl key={s}>
                            <div>
                              <Label htmlFor={s}>{s}</Label>
                              <Input
                                id={s}
                                type="radio"
                                value={s}
                                checked={field.value === s}
                                onChange={() => field.onChange(s)}
                              />
                            </div>
                          </FormControl>
                        );
                      })}
                      <FormDescription>This is a Size Select</FormDescription>
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
