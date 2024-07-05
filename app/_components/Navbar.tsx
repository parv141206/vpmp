"use client";
import Link from "next/link";
import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="sticky  top-0 bg-white/70 py-4 p-4  backdrop-blur-md border-b z-[99]">
      <div className="flex justify-between items-center font-bold">
        <div className="md:hidden p-3">VPMP Alumni Portal</div>
        <button
          className="md:hidden"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <CiMenuFries className="scale-125" />
        </button>
      </div>
      <ul
        className={`w-full  gap-5 flex md:flex-row flex-col ${
          isExpanded ? "flex" : "hidden md:flex"
        }  font-semibold justify-center items-center`}
      >
        <Link href="/">Home</Link>
        <Link href="#about-us">About Us</Link>
        <Link href="#alumni">Alumni</Link>
        <Link href="#apply">Apply Now</Link>
        <Link href="/admin">Admin</Link>
      </ul>
    </div>
  );
}
