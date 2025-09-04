"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      router.push(`/showSchools?query=${encodeURIComponent(search)}`);
    } else {
      router.push("/showSchools");
    }
  };

  return (
    <main className="relative bg-white min-h-[85vh] flex items-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 py-16">
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h2 className="text-5xl font-extrabold leading-tight">
            Find the Best <span className="text-orange-500">Schools</span>{" "}
            Around You
          </h2>
          <p className="text-gray-600 text-lg max-w-md">
            Discover top-rated schools, explore details, and make the smarter
            choice for your child’s education.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white shadow rounded-full px-4 py-2 max-w-sm mx-auto md:mx-0"
          >
            <input
              type="text"
              placeholder="Search schools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-grow outline-none px-2"
            />
            <button type="submit">
              <FaSearch className="text-indigo-600" />
            </button>
          </form>
        </div>

        {/* Right Content */}
        <div className="relative md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <div className="relative w-[350px] h-[350px]">
            <img
              src="/image2.png"
              alt="Main"
              className="w-48 h-48 object-cover rounded-full absolute top-0 left-16 shadow-lg"
            />
            <img
              src="/image.jpg"
              alt="Child1"
              className="w-28 h-28 object-cover rounded-full absolute bottom-0 left-0 shadow-lg"
            />
            <img
              src="/image3.jpg"
              alt="Child2"
              className="w-34 h-34 object-cover rounded-full absolute bottom-0 right-0 shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Decorative Curve */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-b-[100px] -z-10"></div>
    </main>
  );
}
