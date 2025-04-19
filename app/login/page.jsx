"use client";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import Image from "next/image";
import bg from "../../public/assets/bg1.gif";
import { redirect } from "next/navigation";

export default function Login() {
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) redirect("/");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      redirect("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Image src={bg} alt="bghome1" className="w-[550px] absolute " priority />
      <form
        onSubmit={handleLogin}
        className="p-6 rounded-xl backdrop-blur-md bg-black/65 border text-white border-white/30 shadow-md w-[30vw]"
      >
        <h2 className="text-2xl font-medium mb-4">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <p className="font-medium">Email:</p>
        <input
          type="email"
          placeholder="abc@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded outline-none"
          required
        />
        <p className="font-medium">Password:</p>
        <input
          type="password"
          placeholder="add strong password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-5 p-2 border rounded outline-none"
          required
        />
        <button className="w-full cursor-pointer font-medium bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Login
        </button>
        <p className="mt-5 mb-3 text-sm text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-600">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
