"use client";
import Tooltip from "@/components/Tooltip";
import { AuthContext, useAuth } from "@/contexts/AuthContext";
import { useLoading } from "@/contexts/LoadingContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";

const LoginBox = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const { loading, setLoading } = useLoading();
  const router = useRouter();

  const handleSignIn = (e) => {
    e.preventDefault();
    setLoading(true);
    login(identifier, password);
    setLoading(false);
    router.replace('/')
  };

  return (
    <div className="flex flex-col items-center justify-center h-[60%] max-w-md">
      <form
        onSubmit={handleSignIn}
        className="bg-gray-900 p-4 m-4 rounded-lg shadow-md border border-cyan-950 opacity-60"
      >
        <h2 className="text-white text-2xl font-semibold mb-4">Sign in</h2>
        <input
          required
          type="text"
          className="w-full px-4 py-2 mb-4 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:bg-red-900"
          placeholder="Email / Username"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
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
          id="sign-in-btn"
          type="submit"
          disabled={loading}
          className="flex justify-center  w-full bg-sky-800 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:bg-red-600"
        >
          {loading ? (
            <RotatingLines
              visible={loading}
              height="30"
              width="30"
              color="green"
              strokeWidth="5"
              animationDuration="0.75"
            />
          ) : (
            "Sign In"
          )}
        </button>
        <div className="flex justify-between m2-4 my-2">
          <Link
            href="/auth/signup"
            className="text-blue-400 underline hover:text-blue-600"
          >
          Don&apos;t have an account, Sign up!
          </Link>
      <Tooltip text="This feature is not yet implemented">
          <Link href="#" className="text-blue-500 hover:text-blue-600">
            Forgot password
          </Link>
      </Tooltip>
        </div>
      </form>
    </div>
  );
};

export default LoginBox;
