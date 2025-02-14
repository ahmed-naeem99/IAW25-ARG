"use client"; // Mark this as a Client Component

import React from "react";
import localFont from "next/font/local";
import { motion } from "framer-motion";
import { FaEnvelope } from "react-icons/fa";

// Load custom font
const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

const ContactUsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4"
    >
      <div className="text-center">
        <motion.h1
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-4xl sm:text-6xl font-bold mb-8 ${poseyFont.className}`}
        >
          Contact Us
        </motion.h1>
        <motion.p
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-lg sm:text-2xl mb-8"
        >
          Have any questions or feedback? We'd love to hear from you!
        </motion.p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-sky-800 p-6 rounded-lg shadow-lg max-w-md mx-auto text-center"
        >
          <p className="text-lg sm:text-xl font-semibold">Reach us at:</p>
          <div className="flex flex-col gap-4 mt-4">
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:abdelrahman@alqazzaz.com"
              className="flex items-center justify-center gap-2 text-xl text-sky-300 hover:text-sky-100 transition-all duration-300"
            >
              <FaEnvelope className="text-2xl" /> abdelrahman@alqazzaz.com
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:ahmednumber10@gmail.com"
              className="flex items-center justify-center gap-2 text-xl text-sky-300 hover:text-sky-100 transition-all duration-300"
            >
              <FaEnvelope className="text-2xl" /> ahmednumber10@gmail.com
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUsPage;
