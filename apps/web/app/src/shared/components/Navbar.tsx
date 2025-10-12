'use client';
import React, { useEffect } from 'react';
import { Avatar, AvatarFallback } from '@ui/avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Input } from '@ui/input';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const nbPath = useLocale();
  const nb = useTranslations('Navbar');
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    // cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div
      className={`z-9 flex h-18 items-center justify-between overflow-hidden px-12 py-2 duration-300 ${isScrolled ? 'fixed mx-[calc(100%-95%)] mt-1 w-[calc(90%)] rounded-lg backdrop-blur-xl' : 'w-full bg-none backdrop-blur-none'} text-primary`}
    >
      <h1 className="flex w-40 items-center justify-center text-2xl font-bold">
        <Image
          src={'/RanAhRai.svg'}
          width={90}
          height={90}
          alt="RanAhRai Logo"
        />
      </h1>
      <nav className="flex items-center gap-15 font-semibold">
        <motion.div
          initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
          whileHover={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
          }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-xl"
        >
          <Link href="/" className="px-2 py-2">
            {nb('home')}
          </Link>
        </motion.div>
        <motion.div
          initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
          whileHover={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
          }}
          transition={{ duration: 0.3 }}
          className="text-xl"
        >
          <Link href="/store" className="px-2 py-1">
            {nb('store')}
          </Link>
        </motion.div>
        <motion.div
          initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
          whileHover={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
          }}
          transition={{ duration: 0.3 }}
          className="text-xl"
        >
          <Link href="/category" className="px-2 py-1">
            {nb('category')}
          </Link>
        </motion.div>
        <div
          className={`text-medium border-primary text-secondary flex items-center justify-center rounded-2xl border-2 bg-none px-2 py-1 font-medium duration-300`}
        >
          <Input
            className={`text-primary placeholder:text-primary w-30 border-none duration-300 outline-none`}
            placeholder={`${nbPath === 'en' ? 'Search' : 'ค้นหา'}`}
          />
          <FontAwesomeIcon
            className={`text-primary hover:bg-primary hover:text-secondary h w-11 cursor-pointer rounded-2xl px-1 py-1.5 duration-300`}
            icon={faSearch}
          />
        </div>
      </nav>
      <div className="flex items-center gap-11">
        <div className="relative">
          <FontAwesomeIcon
            width={30}
            className="cursor-pointer text-lg"
            icon={faCartShopping}
          />
          <div className="absolute bottom-3.5 left-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-400">
            <span className="text-secondary top-0 right-0 px-1.5 text-xs">
              3
            </span>
          </div>
        </div>
        <div className={`text-primary flex gap-2`}>
          <Link
            href="/th"
            className={`rounded-full px-1.5 duration-300 ${
              nbPath === 'th' ? 'bg-primary text-secondary' : ''
            }`}
          >
            TH
          </Link>
          |
          <Link
            href="/en"
            className={`rounded-full px-1.5 duration-300 ${
              nbPath === 'en' ? 'bg-primary text-secondary' : ''
            }`}
          >
            EN
          </Link>
        </div>
        <div
          className={`bg-primary text-secondary flex h-10 w-10 items-center justify-center rounded-full text-center font-bold duration-300`}
        >
          <Avatar>
            <AvatarFallback>AR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
