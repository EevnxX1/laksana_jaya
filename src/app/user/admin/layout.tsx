import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-screen h-screen bg-bgColor relative overflow-x-hidden pb-16">
      {/* background */}
      <div className="bg-red-500 blur-3xl rounded-full h-[300px] w-[300px] absolute -z-[0] -left-10 top-20"></div>
      <div className="bg-red-500 blur-3xl rounded-full h-[300px] w-[300px] absolute -z-[0] -right-14 bottom-32"></div>
      {/* background */}
      <nav className="flex justify-between px-[50px] py-[20px] mb-4">
        <div className="flex items-center space-x-8">
          <Image
            src={"/assets/bigLogo.png"}
            width={140}
            height={45}
            alt="logo"
            className="w-[140px] h-[45px] z-20"
          ></Image>
          <ul className="flex space-x-6 text-lg text-white z-20">
            <li>
              <Link href={"/user/admin"}>Home</Link>
            </li>
            <li>
              <Link href={"/user/admin/buku_kas_kecil"}>Buku Kas Kecil</Link>
            </li>
            <li>
              <input type="checkbox" id="navbar-down" className="peer hidden" />
              <label
                htmlFor="navbar-down"
                className="flex items-center cursor-pointer select-none"
              >
                Buku Proyek
                <Image
                  width={17}
                  height={17}
                  src={"/assets/dropdown.png"}
                  alt="dropdown"
                  className="w-[17px] h-[12px] ml-[6px]"
                ></Image>
              </label>
              <div className="hidden peer-checked:flex flex-col absolute z-50 bg-white text-black">
                <Link
                  href={"/user/admin/buku_kantor"}
                  className="px-5 py-2 hover:bg-black hover:text-white"
                >
                  Buku Kantor
                </Link>
                <Link
                  href={"/user/admin/buku_proyek"}
                  className="px-5 py-2 hover:bg-black hover:text-white"
                >
                  Buku Proyek Barang
                </Link>
                <Link
                  href={"/user/admin/buku_proyek_jasa"}
                  className="px-5 py-2 hover:bg-black hover:text-white"
                >
                  Buku Proyek Jasa
                </Link>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 z-20">
          <h1 className="font-bold text-white">Hello, Admin KU</h1>
          <Image
            src={"/assets/profile.png"}
            width={40}
            height={40}
            alt="profile"
            className="w-[40px]"
          ></Image>
        </div>
      </nav>
      {children}
    </section>
  );
}
