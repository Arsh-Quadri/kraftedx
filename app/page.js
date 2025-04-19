"use client";
import BackgroundBalls from "@/components/BackgroundBalls";
import { useAuth } from "@/context/AuthContext";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import logo from "../public/assets/kx-logo.webp";

export default function Home() {
  const logo = "/assets/kx-logo.webp";
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <BackgroundBalls />
      <div className="flex justify-between items-center py-5 px-10">
        <Image src={logo} alt="logo" className="" width={200} height={50} />
        <div
          className="px-4 py-2 backdrop-blur-md bg-black/20 border text-white border-white/30 rounded-md w-fit cursor-pointer hover:bg-black/50"
          onClick={() => signOut(auth)}
        >
          Logout
        </div>
      </div>
      <div className="w-full flex flex-col justify-center items-center h-[80vh] text-white">
        <p className="text-gray-200 text-lg">
          in a world where work is often related with chaos and stress
        </p>
        <h1 className="text-[65px]">creative teams deserve delight!</h1>
      </div>
    </main>
  );
}
