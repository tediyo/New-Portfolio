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
          <a href="#contact" className="hover:text-blue-600 font-medium">Education</a>
          <a href="#contact" className="hover:text-blue-600 font-medium">Experiance</a>
          <a href="#contact" className="hover:text-blue-600 font-medium">Contact</a>
          

        </nav>
      </header>

      {/* Main Content */}
      {/*  */}
      {/* Main Content */}
<main className="flex flex-col items-center px-4 py-20">
  {/* Profile and Intro Section */}
  <div className="flex items-center justify-start w-full max-w-5xl gap-6">
    {/* Profile Photo aligned left */}
    <div className="w-60 h-60 relative mb-16">
  <Image
    src="/Images/Profile.png"
    alt="Tewodros Berhanu"
    width={240}
    height={240}
    className="rounded-full border-4 border-blue-500 object-cover mb-16"
  />
</div>


    {/* Intro Text */}
    <div className="mb-6">
      <h2 className="text-3xl font-semibold mb-2">Hey, I'm John Doe 👋</h2>
      <p className="text-gray-600 max-w-md">
        A passionate Software Developer & QA Enthusiast. I love building clean interfaces and testing them to perfection.
      </p>

      {/* Buttons */}
      <div className="mt-4 flex gap-4">
      <a href="/QA">
  <button className="bg-blue-600 text-Green px-6 py-2 rounded-full hover:bg-blue-700 transition">
    QA
  </button>
</a>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-full hover:bg-gray-900 transition">
          DEVELOPER
        </button>
      </div>
    </div>
  </div>
</main>

    </div>
  );
}
