import React from "react";
import localFont from "next/font/local";

const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

export default function FAQs() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className={`${poseyFont.className} text-4xl md:text-5xl font-bold mb-8`}>
          Frequently Asked Questions
        </h1>
        <div className="space-y-6">
          <div>
            <h2 className={`${poseyFont.className} text-2xl font-semibold mb-2`}>
              What is the Islam Awareness Week Scavenger Hunt?
            </h2>
            <p className="font-sans text-lg font-light leading-relaxed">
              The Islam Awareness Week Scavenger Hunt is a fun and educational competition where participants solve puzzles, complete challenges, and learn about Muslim history.
            </p>
          </div>
          <div>
            <h2 className={`${poseyFont.className} text-2xl font-semibold mb-2`}>
              How do I participate?
            </h2>
            <p className="font-sans text-lg font-light leading-relaxed">
              You can participate individually or as a team. Register on the website and start solving the challenges!
            </p>
          </div>
          <div>
            <h2 className={`${poseyFont.className} text-2xl font-semibold mb-2`}>
              What are the prizes?
            </h2>
            <p className="font-sans text-lg font-light leading-relaxed">
              The top three participants or teams will win gift cards: $100 for 1st place, $75 for 2nd place, and $50 for 3rd place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}