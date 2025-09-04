"use client";

import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaSchool, FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 bg-white shadow z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <h1 className="text-2xl font-bold text-orange-500 flex items-center gap-2">
          🏫 NextSchool</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8 text-gray-700 font-medium">
          <Link href="/" className=" text-orange-500 font-semibold ">Home</Link>
          <Link href="/addSchools">Add Schools</Link>
          <Link href="/showSchools">Show Schools</Link>

        </nav>

        {/* Socials */}
        <div className="hidden md:flex text-xl space-x-4 text-indigo-600">
          <a
            href="https://github.com/ArjunLakshakar/schools-portal"
            target="_blank"
          >
            <FaGithub className="cursor-pointer hover:text-indigo-800" />
          </a>
          <a
            href="https://www.linkedin.com/in/arjun-lakshakar-31686b309/"
            target="_blank"
          >
            <FaLinkedinIn className="cursor-pointer hover:text-indigo-800" />
          </a>
        </div>


        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow px-6 py-4 space-y-3 flex gap-6" onClick={() => setIsOpen(false)}>
          <Link href="/">Home</Link>
          <Link href="/addSchools">Add Schools</Link>
          <Link href="/showSchools">Schools</Link>

        </div>
      )}
    </header>
  );
}
