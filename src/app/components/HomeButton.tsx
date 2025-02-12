"use client"; // Client component to handle browser events
import React from "react";
import { useRouter } from "next/navigation";
import localFont from "next/font/local";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion"; // For animations

// Load custom font
const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

const HomeButton = () => {
  const router = useRouter();
  const session = useSession() as any;

  const handleNavigation = () => {
    // Ensure session status is up-to-date
  if (session.status === "loading") {
    console.log("Session is loading...");
    return; // Prevent navigation until session state stabilizes
  }

    console.log("Session Status (Production):", session.status);
    console.log("User Data (Production):", session.data?.user);
  
    if (session.status === "authenticated") {
      console.log("Authenticated user:", session.data?.user);
      if (session.data?.user?.mission !== undefined && session.data.user.mission !== -1) {
        console.log(`Navigating to mission${session.data.user.mission}`);
        router.replace(`/mission${session.data.user.mission}`);
      } else {
        console.log("Navigating to mission1");
        router.replace("/mission1");
      }
    } else {
      console.log("User not authenticated, redirecting to login");
      router.replace("/login");
    }
    
  };

  return (
    <div className="max-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-screen text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className={`${poseyFont.className} text-6xl md:text-8xl font-bold mb-8`}
        >
          Islam Awareness Week
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`${poseyFont.className} text-2xl md:text-4xl font-light mb-12`}
        >
          Ultimate Scavenger Hunt
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="flex justify-center"
        >
          <button
            onClick={handleNavigation}
            className={`${poseyFont.className} btn bg-gray-700 text-white border-none hover:bg-gray-600 text-2xl font-light px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center h-16 relative overflow-hidden`}
          >
            <span className="relative z-10">ENTER</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-700 opacity-0 hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            />
          </button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="bg-gray-900 text-white py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`${poseyFont.className} text-3xl font-bold mb-8`}
          >
            Welcome to the First Ever Islam Awareness Week Ultimate Scavenger Hunt!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-sans text-lg font-light mb-8 leading-relaxed"
          >
            This competition will test your wits, creativity, critical thinking, and speed. Participate individually or as a team and embark on a journey to solve mysteries, complete challenges, and learn about an amazing episode in Muslim history.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div>
              <h4 className={`${poseyFont.className} text-2xl font-semibold mb-4`}>✨ What to Expect:</h4>
              <ul className="font-sans text-lg font-light list-disc list-inside leading-relaxed">
                <li>A wide variety of puzzles, clues, ciphers, and challenges</li>
                <li>Excitement as you run around campus with friends and teammates</li>
                <li>Gift card prizes: $100 for 1st, $75 for 2nd, $50 for 3rd</li>
                <li>An inspiring story from Muslim history</li>
                <li>A challenge that’s not a piece of cake!</li>
              </ul>
            </div>
            <div>
              <h4 className={`${poseyFont.className} text-2xl font-semibold mb-4`}>Theme:</h4>
              <p className="font-sans text-lg font-light leading-relaxed">
                This year’s theme is <strong>A Journey With The Mongols</strong>. Discover how this pivotal moment in history unfolded in ways you could never imagine.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="w-full h-full bg-gradient-to-r from-sky-900 to-gray-900 opacity-30"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};

export default HomeButton;