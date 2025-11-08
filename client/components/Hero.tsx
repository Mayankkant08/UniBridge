"use client";

import { FiArrowRight } from "react-icons/fi";

export default function Hero() {
  return (
    <section className="pt-28 pb-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        {/* Tagline */}
        <div className="inline-flex items-center space-x-2 bg-[#736bff]/10 px-4 py-2 rounded-full mb-8">
          <span className="bg-[#736bff] text-white text-xs font-semibold px-2 py-1 rounded-full">
            NEW
          </span>
          <span className="text-[#736bff] text-sm font-medium">
            Streamline Campus Life with UniBridge
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Bridging Every Part of Campus{" "}
            <br className="hidden sm:block" />
            <span className="text-5xl text-[#736bff]">Life Seamlessly</span>
        </h1>
        <p className="text- text-gray-600 mb-10 leading-relaxed">
        UniBridge connects people, processes, and progress — empowering institutions 
        to work smarter and grow together.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-14">
          <button className="text-sm bg-[#736bff] text-white px-3 py-2 rounded-lg hover:bg-[#5f57e6] transition-all hover:shadow-xl hover:shadow-[#736bff]/30 flex items-center space-x-2 group">
            <span className="font-semibold">Get Started Free</span>
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="text-sm border-2 border-gray-200 text-gray-900 px-3 py-1 rounded-lg hover:border-[#736bff] hover:text-[#736bff] transition-all">
            Explore Dashboard
          </button>
        </div>

        {/* Image */}
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-0 pointer-events-none"></div>
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
            <img
              src="/HeroPic.png"
              alt="UniBridge Dashboard Preview"
              className="w-full h-auto scale-90 md:scale-95 mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
