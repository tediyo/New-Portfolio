// components/Home.js
"use client";

import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Top Bar */}
      <header className="w-full flex justify-between items-center px-6 py-4 shadow-md bg-gray-100">
        <h1 className="text-xl font-bold">Tewodros</h1>
        <nav className="space-x-6">
          <a href="#about" className="hover:text-blue-600 font-medium">About</a>
          <a href="#projects" className="hover:text-blue-600 font-medium">Projects</a>
          <a href="#contact" className="hover:text-blue-600 font-medium">Contact</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-4 py-20">
        {/* Profile Photo */}
        <div className="w-40 h-40 relative mb-6">
          <Image
            src="/profile.jpg" // replace with your actual image path
            alt="Tewodros Berhanu"
            layout="fill"
            objectFit="cover"
            className="rounded-full border-4 border-blue-500"
          />
        </div>

        {/* Intro */}
        <h2 className="text-3xl font-semibold mb-2">Hey, I'm Tewodros 👋</h2>
        <p className="text-gray-600 max-w-md">
          A passionate Software Developer & QA Enthusiast. I love building clean interfaces and testing them to perfection.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
            QA
          </button>
          <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition">
            DEVELOPER
          </button>
        </div>
      </main>
    </div>
  );
}
