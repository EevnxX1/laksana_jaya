import Image from "next/image";
import React from "react";
import Link from "next/link";

interface formLogin {
  children: React.ReactNode;
}

export default function Login({ children }: formLogin) {
  return (
    <section className="flex items-center justify-center space-x-24 w-full h-screen bg-bgColor relative overflow-hidden">
      {/* background */}
      <div className="bg-red-500 blur-3xl rounded-full h-[300px] w-[300px] absolute z-0 left-0 -bottom-16"></div>
      <div className="bg-red-500 blur-3xl rounded-full h-[300px] w-[300px] absolute z-0 right-0 -top-24"></div>
      {/* background */}
      <div className="flex flex-col space-y-3 text-white z-10">
        <Image
          src={"/assets/logo.png"}
          alt="Logo"
          width={40}
          height={40}
          className="w-[40px]"
        ></Image>
        <p className="text-4xl">
          Selamat datang <br /> di{" "}
          <span className="font-bold">CV LAKSAMANA JAYA</span>
        </p>
        <a
          href=""
          className="w-[260px] py-[7px] block bg-white text-black text-center rounded-full"
        >
          start together for build a trust
        </a>
      </div>
      <div className="flex flex-col justify-center border border-gray-400 rounded-2xl items-center h-[80%] px-[50px] z-10 backdrop-blur-2xl">
        <div className="flex flex-col items-center text-white">
          <h1 className="text-4xl font-bold mb-1">Login</h1>
          <p>with your account</p>
        </div>
        <div className="mt-[25px]">{children}</div>
      </div>
    </section>
  );
}
