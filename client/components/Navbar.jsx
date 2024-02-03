"use client";
import React, { useState } from "react";
import logo from "@/public/EcoImpactlogo.png";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar = () => {
  const isLoggedIn = false;
  const [profileMenu, setProfileMenu] = useState(false);
  return (
    <nav className="flex justify-between mb-2 pt-2 items-center px-12">
      <Link href="/" className="flex items-center">
        <Image
          src={logo}
          alt="EcoImpact Logo"
          width={60}
          height={60}
          className="object-contain"
        />
        <div className="flex items-center">
          <span className="text-gray-200  max-sm:hidden font-semibold text-2xl tracking-wide">
            eco
          </span>
          <span className="text-green-500 max-sm:hidden font-semibold text-2xl tracking-wide">
            Impact
          </span>
        </div>
      </Link>
      {isLoggedIn ? (
        <div className="flex items-center gap-12">
          <Link href="/" className="nav_link">
            Home
          </Link>
          <Link href="/environmental/data" className="nav_link">
            Calculator
          </Link>
          <Link href="/challenges" className="nav_link">
            Challenges
          </Link>
          <Link href="/community" className="nav_link">
            Community
          </Link>
          <Link href="/tips" className="nav_link">
            Tips
          </Link>
        </div>
      ) : null}

      <div className="flex gap-4">
        <Link href="/" className="styled_btn">
          Sign In
        </Link>
        {isLoggedIn ? (
          <Image
            src={logo}
            alt="profile"
            className="rounded-[100px] border-2 border-white relative cursor-pointer profile"
            width={40}
            height={32}
            onClick={() => {
              setProfileMenu((prev) => !prev);
            }}
          />
        ) : (
          <Link href="/ " className="styled_btn">
            Sign Up
          </Link>
        )}
        {profileMenu ? (
          <motion.div
            className="flex flex-col absolute top-16 right-12 bg-gray-800 p-4 rounded-lg w-40 items-end gap-2 z-10"
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 8 }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <Link href="/profile" className="profile_link">
              Profile
            </Link>
            <Link href="/settings" className="profile_link">
              Settings
            </Link>
            <Link href="/logout" className="profile_link">
              Log Out
            </Link>
          </motion.div>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
