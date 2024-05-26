"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { notify } from "@/components/Notification";

const SignUpBox = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { signup } = useAuth();

  const router = useRouter();

  const handleSignUp = (e) => {
    e.preventDefault();
    signup(email, password, username, firstName, lastName);
    router.replace("/auth/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80%] max-w-md ">
      <form
        onSubmit={handleSignUp}
        className="bg-gray-900 p-4 m-4 rounded-lg shadow-lg shadow-black border border-cyan-950 opacity-60"
      >
        <h2 className="text-white text-2xl font-semibold mb-4">Sign up</h2>
        <span className="flex space-x-4">
          <input
            type="text"
            className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-red-900"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-red-900"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </span>
        <input
          required
          type="text"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-red-900"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="email"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-red-900"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-red-900"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-sky-800 hover:bg-sky-700 text-white py-2 px-4 rounded focus:outline-none focus:bg-blue-600"
        >
          Sign Up
        </button>
        <div className="flex justify-between space-x-4 m2-4 my-2">
          <Link
            href="/auth/signin"
            className="text-blue-400 underline hover:text-blue-600"
          >
            Already have an account, Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpBox;
