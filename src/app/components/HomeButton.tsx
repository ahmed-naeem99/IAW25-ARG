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
    if (session.status === "authenticated") {
      if (session.data?.user?.mission !== undefined && session.data.user.mission !== -1) {
        router.push(`/mission${session.data.user.mission}`);
      } else {
        router.push("/leaderboard");
      }
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 to-sky-700 text-white">
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
          className="text-2xl md:text-4xl font-light mb-12"
        >
          Ultimate Scavenger Hunt
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
          <button
            onClick={handleNavigation}
            className="btn bg-sky-800 text-white border-none hover:bg-sky-700 text-2xl font-light px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            ENTER
          </button>
        </motion.div>
      </div>

      {/* Content Section */}
      <div className="bg-white text-sky-900 py-16 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.h3
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold mb-8"
          >
            Welcome to the First Ever Islam Awareness Week Ultimate Scavenger Hunt!
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg mb-8"
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
              <h4 className="text-2xl font-semibold mb-4">✨ What to Expect:</h4>
              <ul className="list-disc list-inside text-lg">
                <li>A wide variety of puzzles, clues, ciphers, and challenges</li>
                <li>Excitement as you run around campus with friends and teammates</li>
                <li>Gift card prizes: $100 for 1st, $75 for 2nd, $50 for 3rd</li>
                <li>An inspiring story from Muslim history</li>
                <li>A challenge that’s not a piece of cake!</li>
              </ul>
            </div>
            <div>
              <h4 className="text-2xl font-semibold mb-4">Theme:</h4>
              <p className="text-lg">
                This year’s theme is <strong>A Journey With The Mongols</strong>. Discover how this pivotal moment in history unfolded in ways you could never imagine.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomeButton;