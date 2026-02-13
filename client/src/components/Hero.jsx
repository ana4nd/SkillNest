import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="w-full mt-5 max-w-6xl mx-auto bg-white">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
        
        {/* LEFT CONTENT */}
        <div className="flex flex-col gap-6 justify-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
            Learn New Skills, <br />
            <span className="text-indigo-600">Build Your Future</span>
          </h1>

          <p className="text-gray-600 text-base leading-relaxed max-w-lg">
            Unlock the power of learning with our cutting-edge platform.
            Discover new opportunities and empower yourself with the
            knowledge and skills you need to succeed.
          </p>

          <div>
            <Link to="/courses">
              <button className="bg-indigo-600 text-white px-8 py-3 rounded-md font-medium hover:bg-indigo-700 transition">
                Explore Courses
              </button>
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src={assets.heroImage}
            alt="hero"
            className="w-full max-w-xl object-contain"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;
