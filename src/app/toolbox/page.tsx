import React from "react";
import localFont from "next/font/local";

// Load custom font
const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

export default function Toolbox() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-8">
        {/* Title */}
        <h1 className={`${poseyFont.className} text-5xl md:text-6xl font-bold text-center mb-8`}>
          Use this for help
        </h1>

        {/* Embedded Slides */}
        <div className="aspect-w-16 aspect-h-9 w-full max-w-6xl mx-auto">
          <iframe
            src="https://docs.google.com/presentation/d/1Cb-amO1lWNJkYqPNd6E-tbELLAaETtE3aRagHAoIr_4/edit?usp=sharing"
            frameBorder="0"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-2xl"
          ></iframe>
        </div>
      </div>
    </div>
  );
}