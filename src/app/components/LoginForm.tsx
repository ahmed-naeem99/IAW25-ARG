"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { motion } from "framer-motion"; // For animations

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsUserValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    password: "",
    general: "",
  });

  const router = useRouter();

  const handleLogin = async () => {
    setErrorMessages({ username: "", password: "", general: "" });
    const isUsernameValid = validateUsername(username);
    setIsUserValid(isUsernameValid);

    if (isUsernameValid) {
      const response = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });
      console.log("signIn response:", response);

      if (!response?.error) {
        setErrorMessages({ username: "", password: "", general: "" });
        router.push("/mission1");
      } else {
        switch (response.error) {
          case "InvalidUsername":
            setErrorMessages((prev) => ({
              ...prev,
              username: "Invalid username format. Must be 3-36 characters long.",
            }));
            break;
          case "IncorrectPassword":
            setErrorMessages((prev) => ({
              ...prev,
              password: "Incorrect password. Please try again.",
            }));
            break;
          case "UserNotFound":
            setErrorMessages((prev) => ({
              ...prev,
              username: "Username not found.",
            }));
            break;
          default:
            setErrorMessages((prev) => ({
              ...prev,
              general: "An unknown error occurred.",
            }));
            break;
        }
      }
    } else {
      setErrorMessages((prev) => ({
        ...prev,
        username:
          "Invalid username format. Must be 3-36 characters long and contain only letters, numbers, and underscores.",
      }));
    }
  };

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;
    return usernameRegex.test(username);
  };

  return (
    <div className="grid place-items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex flex-1 flex-col justify-center pb-16 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src="/3.svg"
              alt="Islamic Awareness Week Logo"
              width={150}
              height={150}
            />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-center text-2xl font-medium leading-9 tracking-tight text-white"
          >
            Welcome to the Islamic Awareness Week Augmented Reality Quest
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm"
        >
          <div className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Team Username (Or your name if you are solo)
              </label>
              <div className="mt-2">
                <motion.input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="block px-3 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  whileFocus={{ scale: 1.02 }}
                />
                {errorMessages.username && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 pt-3 w-full max-w-xs"
                  >
                    {errorMessages.username}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <motion.input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block px-3 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  whileFocus={{ scale: 1.02 }}
                />
                {errorMessages.password && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 pt-3 w-full max-w-xs"
                  >
                    {errorMessages.password}
                  </motion.p>
                )}
              </div>
            </div>

            <div>
              <motion.button
                onClick={handleLogin}
                disabled={!username || !password}
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign in
              </motion.button>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-10 text-center text-sm text-gray-400"
          >
            Haven&apos;t made a team account?{" "}
            <motion.button
              onClick={() => router.push("register")}
              className="font-semibold leading-6 text-sky-600 hover:text-sky-500"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}