"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

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

      if (!response?.error) {
        setErrorMessages({ username: "", password: "", general: "" });
        router.push("/");
        router.refresh();
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

  console.log("Image source:", "/3.svg");

  return (
    <div className="grid place-items-center">
      <div className="flex flex-1 flex-col justify-center pb-16 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center">
          {/* Debugging: Use both Image and img tags */}
          <div style={{ width: 150, height: 150, position: "relative" }}>
            <Image
              src="/3.svg"
              alt="Islamic Awareness Week Logo"
              width={150}
              height={150}
              onError={(e) => console.error("Image failed to load", e)}
            />
          </div>
          <img
            src="/3.svg"
            alt="Islamic Awareness Week Logo Fallback"
            width={150}
            height={150}
          />
          <h2 className="mt-6 text-center text-2xl font-medium leading-9 tracking-tight text-sky-950 dark:text-white">
            Welcome to the Islamic Awareness Week Augmented Reality Quest
          </h2>
        </div>

        {/* Rest of the form */}
      </div>
    </div>
  );
}