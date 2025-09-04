"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSchool } from "react-icons/fa";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data, event) => {
    setMsg("");
    setLoading(true);

    const formEl = event.target; // native <form>
    const formData = new FormData(formEl);

    try {
      const res = await fetch("/api/schools/add", {
        method: "POST",
        body: formData,
      });
      const json = await res.json();

      if (res.ok) {
        setMsg("✅ School added successfully");
        reset();
      } else {
        setMsg("❌ " + (json.error ?? "Failed to add school"));
      }
    } catch (err) {
      setMsg("❌ " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <FaSchool className="text-indigo-600 text-5xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Add New School
          </h1>
          <p className="text-gray-600 mt-2 text-sm md:text-base">
            Fill in the details below to add a new school to our directory
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          encType="multipart/form-data"
        >
          {/* Name */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              School Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-2 w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3"
              placeholder="Enter school name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("address", { required: "Address is required" })}
              className="mt-2 w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3"
              placeholder="Enter address"
              rows="3"
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("city", { required: "City is required" })}
              className="mt-2 w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3"
              placeholder="Enter city"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              State <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("state", { required: "State is required" })}
              className="mt-2 w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3"
              placeholder="Enter state"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              {...register("contact", {
                required: "Contact is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Enter valid 10-digit number",
                },
              })}
              className="mt-2 w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3"
              placeholder="9876543210"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm mt-1">{errors.contact.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email_id", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter valid email",
                },
              })}
              className="mt-2 w-full rounded-xl border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 px-4 py-3"
              placeholder="school@example.com"
            />
            {errors.email_id && (
              <p className="text-red-500 text-sm mt-1">{errors.email_id.message}</p>
            )}
          </div>

          {/* Image */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              School Image <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="mt-2 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold
                         file:bg-indigo-50 file:text-indigo-700
                         hover:file:bg-indigo-100"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
            )}
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition text-lg"
            >
              {loading ? "Saving..." : "Add School"}
            </button>
          </div>
        </form>

        {/* Message */}
        {msg && (
          <p className="mt-6 text-center font-medium text-gray-700">{msg}</p>
        )}
      </div>
    </div>
  );
}
