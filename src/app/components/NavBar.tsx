"use client"; // Mark this as a Client Component
import React from "react";
import Link from "next/link";
import localFont from "next/font/local";
import { useSession } from "next-auth/react";
import Logout from "./logout";
import { motion } from "framer-motion"; // For animations
import Image from "next/image";

// Load custom font
const poseyFont = localFont({
  src: "../../../public/fonts/posey-textured.ttf",
});

const NavBar = () => {
  const { data: session } = useSession(); // Use useSession for client-side session

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="navbar dark:text-white dark:focus:text-white transition-colors rounded-3xl bg-gradient-to-b from-gray-900 to-gray-800"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden px-0 pr-3 sm:px-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 bg-sky-800 text-white"
          >
            <li>
              <a>Challenges</a>
              <ul className="p-2">
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    className="dark:focus:text-white dark:text-white"
                    href="/mission/1"
                  >
                    C1
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link className="dark:focus:text-white" href="/mission/2">
                    C2
                  </Link>
                </motion.li>
              </ul>
            </li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className="dark:focus:text-white" href="/leaderboard">
                Leaderboard
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className="dark:focus:text-white" href="/toolbox">
                Toolbox
              </Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link className="dark:focus:text-white" href="/faqs">
                FAQs
              </Link>
            </motion.li>
          </ul>
        </div>
        <Link
          href="/"
          className="btn btn-ghost text-lg sm:text-3xl px-0 sm:px-4 font-normal"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={poseyFont.className}
          >
            TMU MSA
          </motion.div>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Challenges</summary>
              <ul className="p-2 bg-sky-800">
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    className="dark:focus:text-white text-white"
                    href="/mission/1"
                  >
                    C1
                  </Link>
                </motion.li>
                <motion.li
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    className="dark:focus:text-white text-white"
                    href="/mission/2"
                  >
                    C2
                  </Link>
                </motion.li>
              </ul>
            </details>
          </li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              className="dark:focus:text-white dark:text-white"
              href="/leaderboard"
            >
              Leaderboard
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              className="dark:focus:text-white dark:text-white"
              href="/toolbox"
            >
              Toolbox
            </Link>
          </motion.li>
          <motion.li
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              className="dark:focus:text-white dark:text-white"
              href="/faqs"
            >
              FAQs
            </Link>
          </motion.li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end flex flex-row space-x-2 sm:space-x-4 items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <Image
                  src="https://i.imgur.com/AJ3InNO.png"
                  alt="Tailwind CSS Navbar component"
                  width={40}
                  height={40}
                  className="w-10 rounded-full"
                />
              </div>
            </div>
          </motion.div>
          <ul
            tabIndex={0}
            className="mt-24 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-sky-800"
          >
            {!session && (
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link className="text-white justify-between" href="/login">
                  Login
                </Link>
              </motion.li>
            )}
            {!!session && (
              <motion.li
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-white"
              >
                <Logout />
              </motion.li>
            )}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default NavBar;