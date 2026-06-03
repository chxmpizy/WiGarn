import type { StaticImageData } from 'next/image';
import r1 from '../public/r1.jpg';
import r2 from '../public/r2.jpg';
import r3 from '../public/r3.jpg';
import r4 from '../public/r4.jpg';
import r5 from '../public/r5.jpg';
import r6 from '../public/r6.jpg';
export type Restaurant = {
  id: string;
  name: string;
  image_url: StaticImageData | string;
  rating: number;
  reviews: number;
  cuisine: string;
  distance: string;
  open: boolean;
  price: string;
  address: string;
  hours: string;
};

export const restaurants: Restaurant[] = [
  {
    id: 'shoyu-house',
    name: 'Shoyu House',
    image_url: r1,
    rating: 4.7,
    reviews: 312,
    cuisine: 'Ramen',
    distance: '0.4 mi',
    open: true,
    price: '$$',
    address: '128 Pine St',
    hours: '11:30 – 22:00',
  },
  {
    id: 'forno-vera',
    name: 'Forno Vera',
    image_url: r2,
    rating: 4.5,
    reviews: 248,
    cuisine: 'Pizza',
    distance: '0.7 mi',
    open: true,
    price: '$$',
    address: '42 Oak Ave',
    hours: '12:00 – 23:00',
  },
  {
    id: 'greenleaf',
    name: 'Greenleaf Kitchen',
    image_url: r3,
    rating: 4.6,
    reviews: 184,
    cuisine: 'Salads',
    distance: '0.3 mi',
    open: true,
    price: '$$',
    address: '9 Cedar Ln',
    hours: '10:00 – 21:00',
  },
  {
    id: 'nori-bar',
    name: 'Nori Bar',
    image_url: r4,
    rating: 4.8,
    reviews: 421,
    cuisine: 'Sushi',
    distance: '1.1 mi',
    open: false,
    price: '$$$',
    address: '200 Maple Rd',
    hours: '17:00 – 23:00',
  },
  {
    id: 'ember-cafe',
    name: 'Ember Café',
    image_url: r5,
    rating: 4.4,
    reviews: 96,
    cuisine: 'Café',
    distance: '0.5 mi',
    open: true,
    price: '$',
    address: '77 Elm St',
    hours: '07:00 – 18:00',
  },
  {
    id: 'casa-lima',
    name: 'Casa Lima',
    image_url: r6,
    rating: 4.6,
    reviews: 273,
    cuisine: 'Mexican',
    distance: '0.9 mi',
    open: true,
    price: '$$',
    address: '55 Birch Way',
    hours: '11:00 – 22:00',
  },
];

export const getRestaurant = (id: string) =>
  restaurants.find((r) => r.id === id);
