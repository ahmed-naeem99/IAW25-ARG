"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion"; // For animations

export default function RegisterForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [isUserValid, setIsUserValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    general: "",
  });

  const router = useRouter();

  const validateUsername = (username: string) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,36}$/;
    return usernameRegex.test(username);
  };

  const validatePasswords = (password: string, rePassword: string) => {
    return password === rePassword;
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleServerErrors = (result: any) => {
    switch (result.code) {
      case "EMAIL_EXISTS":
        setErrorMessages((prev) => ({
          ...prev,
          email: "Email already exists.",
        }));
        break;
      case "USERNAME_EXISTS":
        setErrorMessages((prev) => ({
          ...prev,
          username: "Username already exists.",
        }));
        break;
      default:
        setErrorMessages((prev) => ({
          ...prev,
          general: "An unknown error occurred.",
        }));
        break;
    }
  };

  const handleClientErrors = (
    isEmailValid: boolean,
    isUsernameValid: boolean,
    isPasswordValid: boolean
  ) => {
    if (!isEmailValid) {
      setErrorMessages((prev) => ({ ...prev, email: "Invalid email format." }));
    } else {
      setErrorMessages((prev) => ({ ...prev, email: "" }));
    }
    if (!isUsernameValid) {
      setErrorMessages((prev) => ({
        ...prev,
        username:
          "Invalid username format. Username must be 3-36 characters long and contain only letters, numbers, and underscores.",
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, username: "" }));
    }
    if (!isPasswordValid) {
      setErrorMessages((prev) => ({
        ...prev,
        password: "Passwords do not match.",
      }));
    } else {
      setErrorMessages((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSignUp = async () => {
    const isEmailValid = validateEmail(email);
    const isUsernameValid = validateUsername(username);
    const isPasswordValid = validatePasswords(password, rePassword);

    setIsEmailValid(isEmailValid);
    setIsUserValid(isUsernameValid);
    setIsPasswordValid(isPasswordValid);

    if (isEmailValid && isUsernameValid && isPasswordValid) {
      setErrorMessages({
        fullName: "",
        email: "",
        username: "",
        password: "",
        general: "",
      });
      // Proceed with sign-up logic
      console.log("Signing up...");
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          username,
          password,
          teamMembers: teamMembers || "1", // Default to 1 if teamMembers is not provided
        }),
      });
      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response data:", result);
      if (response.status === 200) {
        router.push("/login");
      } else {
        handleServerErrors(result);
      }
    } else {
      handleClientErrors(isEmailValid, isUsernameValid, isPasswordValid);
    }
  };

  return (
    <div className="grid place-items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex flex-1 flex-col justify-center pb-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center"
        >
          {/* Logo */}
          <div style={{ width: 250, height: 175, position: "relative" }}>
            <Image
              src="/4.png"
              alt="Islamic Awareness Week Logo"
              width={250}
              height={250}
              priority
            />
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="px-2 mt-12 text-center text-2xl font-bold leading-9 tracking-tight text-white"
          >
            Create a New Team Account
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-2 text-sm text-gray-400"
          >
            Register your team here. If you are solo, create a team name for yourself.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 sm:mx-auto sm:w-full max-w-xs flex flex-col"
        >
          <div className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-white"
              >
                Full Name
              </label>
              <div className="mt-2">
                <motion.input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="block px-3 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  whileFocus={{ scale: 1.02 }}
                />
                {errorMessages.fullName && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 pt-3 w-full max-w-xs"
                  >
                    {errorMessages.fullName}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Team Name Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Team Name
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

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <motion.input
                  id="email"
                  name="email"
                  type="text"
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block px-3 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  whileFocus={{ scale: 1.02 }}
                />
                {errorMessages.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 pt-3 w-full max-w-xs"
                  >
                    {errorMessages.email}
                  </motion.p>
                )}
              </div>
            </div>

            {/* Team Members Field */}
            <div>
              <label
                htmlFor="teamMembers"
                className="block text-sm font-medium leading-6 text-white"
              >
                Number of Team Members
              </label>
              <div className="mt-2">
                <motion.input
                  id="teamMembers"
                  name="teamMembers"
                  type="number"
                  min="1"
                  onChange={(e) => setTeamMembers(e.target.value)}
                  required
                  className="block px-3 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </div>

            {/* Password Fields */}
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <motion.input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
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
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Re-enter Password
                </label>
              </div>
              <div className="mt-2 pb-6">
                <motion.input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="password"
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                  className="block px-3 w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm sm:leading-6"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>
            </div>

            {/* Sign Up Button */}
            <div>
              <motion.button
                onClick={handleSignUp}
                disabled={
                  !fullName ||
                  !email ||
                  !username ||
                  !password ||
                  !rePassword ||
                  !teamMembers
                }
                className="disabled:opacity-40 flex w-full justify-center rounded-md bg-sky-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}