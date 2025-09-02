"use client";
import React from "react";
import { Button } from "@ui/button";
import { Avatar, AvatarFallback } from "@ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Input } from "@ui/input";
import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <div className="w-full h-18 bg-[#154D71] flex justify-between items-center px-5 py-2">
      <h1 className="text-2xl font-bold">RanAhLite</h1>
      <nav className="flex gap-8 items-center font-semibold">
        <motion.div
          initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
          }}
          transition={{ duration: 0.3 }}
          className="text-xl cursor-pointer"
        >
          <Link href="#" className="px-2 py-2">
            Home
          </Link>
        </motion.div>
        <motion.div
          initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
          }}
          transition={{ duration: 0.3 }}
          className="text-xl"
        >
          <Link href="#" className="px-2 py-1">
            Store
          </Link>
        </motion.div>
        <motion.div
          initial={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
          whileHover={{
            backgroundColor: "rgba(255, 255, 255, 0.2)",
            borderRadius: "8px",
          }}
          transition={{ duration: 0.3 }}
          className="text-xl"
        >
          <Link href="#" className="px-2 py-1">
            Contact
          </Link>
        </motion.div>
        <div className="text-medium flex justify-center items-center border-2 rounded-2xl px-2 py-1 border-[#FFFFFF]">
          <Input className="outline-none" placeholder="Search..." />
          <FontAwesomeIcon
            onClick={() => {
              console.log("search");
            }}
            className="w-5 h-5 cursor-pointer text-[#FFFFFF] px-1"
            icon={faSearch}
          />
        </div>
      </nav>

      <div className="bg-[#FFFFFF] text-[#154D71] w-10 h-10 text-center rounded-full items-center flex justify-center">
        <Avatar>
          <AvatarFallback>AR</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
