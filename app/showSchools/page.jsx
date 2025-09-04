"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const params = useSearchParams();

  useEffect(() => {
    fetch("/api/schools/get")
      .then((res) => res.json())
      .then((data) => setSchools(data));

    // Pre-fill from query string
    const query = params.get("query");
    if (query) setSearch(query);
  }, [params]);

  const filteredSchools = schools.filter((school) =>
    school.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
          Schools Directory
        </h1>
        <p className="text-gray-600 text-lg">
          Discover and explore schools in your city
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search schools..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-gray-300 py-3 pl-12 pr-4 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredSchools.map((school) => (
          <div
            key={school.id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
          >
            <img
              src={school.image || "/default-school.jpg"}
              alt={school.name}
              className="h-52 w-full object-cover"
            />
            <div className="p-5">
              <h2 className="font-semibold text-lg text-gray-800 mb-1">
                {school.name}
              </h2>
              <p className="text-gray-600 text-sm mb-2">{school.address}</p>

              <span className="inline-block bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                {school.city}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSchools.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No schools found matching your search.
        </p>
      )}
    </div>
  );
}
