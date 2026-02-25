"use client";

import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-gray-900 p-10 rounded-2xl shadow-2xl border border-gray-800 text-center space-y-6">

        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.png" // optional
            alt="Cloudinary SaaS"
            width={80}
            height={80}
            className="rounded-xl"
          />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold">
          Welcome to <span className="text-blue-500">Cloudinary SaaS</span>
        </h1>

        <p className="text-gray-400 text-sm">
          Upload, compress, and manage your videos with ease.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4 pt-4">
          <Link
            href="/sign-in"
            className="w-full bg-blue-600 hover:bg-blue-700 transition px-6 py-3 rounded-lg font-medium"
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="w-full border border-gray-700 hover:border-blue-500 transition px-6 py-3 rounded-lg font-medium"
          >
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}