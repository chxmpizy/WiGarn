'use client';
import React, { useEffect } from 'react';
import { Avatar, AvatarFallback } from '@ui/avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { Input } from '@ui/input';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
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
      className={`flex h-18 w-full items-center justify-between px-5 py-2 duration-300 ${isScrolled ? 'fixed bg-white text-[#154D71]' : 'absolute bg-[#154D71] text-white'}`}
    >
      <h1 className="text-2xl font-bold">RanAhLite</h1>
      <nav className="flex items-center gap-8 font-semibold">
        <motion.div
          initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
          whileHover={{
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '8px',
          }}
          transition={{ duration: 0.3 }}
          className="cursor-pointer text-xl"
        >
          <Link href="#" className="px-2 py-2">
            Home
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
          <Link href="#" className="px-2 py-1">
            Store
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
          <Link href="#" className="px-2 py-1">
            Contact
          </Link>
        </motion.div>
        <div
          className={`text-medium flex items-center justify-center rounded-2xl border-2 duration-300 ${isScrolled ? 'border-[#154D71] bg-[#FFFFFF] text-[#FFFFFF]' : 'border-[#FFFFFF] bg-[#154D71] text-[#154D71]'} px-2 py-1 font-medium`}
        >
          <Input
            className={`w-30 border-none duration-300 outline-none ${isScrolled ? 'text-[#154D71] placeholder:text-[#154D71]' : 'text-[#FFFFFF] placeholder:text-[#FFFFFF]'}`}
            placeholder="Search..."
          />
          <FontAwesomeIcon
            onClick={() => {
              console.log('search');
            }}
            className={`w-11 cursor-pointer rounded-2xl px-1 py-1.5 duration-300 ${isScrolled ? 'text-[#154D71] hover:bg-[#154D71] hover:text-[#FFFFFF]' : 'text-[#FFFFFF] hover:bg-white hover:text-[#154D71]'} h`}
            icon={faSearch}
          />
        </div>
      </nav>
      <div className="flex items-center gap-11">
        <div className="relative">
          <FontAwesomeIcon
            width={30}
            className="cursor-pointer"
            icon={faCartShopping}
          />
          <div className="absolute bottom-3.5 left-2.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-400">
            <span className="top-0 right-0 px-1.5 text-xs text-white">3</span>
          </div>
        </div>
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full duration-300 ${isScrolled ? 'bg-[#154D71] text-[#FFFFFF]' : 'bg-[#FFFFFF] text-[#154D71]'} text-center font-bold`}
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
