"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [NameUser, setNameUser] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchDataWithAuth = async () => {
      // 1. Ambil token dari localStorage
      const token = localStorage.getItem("token");

      // 2. Periksa apakah token ada
      if (!token) {
        toast.error(
          "Anda Belum Melakukan Login, Silahkan Login Terlebih Dahulu!"
        );
        router.push("/");
        return; // Hentikan proses jika tidak ada token
      }

      try {
        // 3. Tambahkan Authorization header ke permintaan fetch
        const response = await fetch("http://127.0.0.1:8000/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        // Tangani jika respons tidak ok (misal 401 Unauthorized)
        if (response.status == 201 || response.status == 200) {
          console.log("Data berhasil terautentikasi");
          const userName = localStorage.getItem("user_name");
          if (userName) {
            setNameUser(userName);
          }
        } else {
          toast.error(
            "Anda Belum Melakukan Login, Silahkan Login Terlebih Dahulu!"
          );
          router.push("/");
        }
      } catch (err) {
        console.error("Gagal ambil data:", err);
      }
    };

    fetchDataWithAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const konfirmasi = confirm("Yakin ingin Logout dari sini?");
    const token = localStorage.getItem("token");
    if (konfirmasi) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (res.status === 201 || res.status === 200) {
          toast.success("Anda Berhasil Logout");
          localStorage.removeItem("token"); // Hapus dari localStorag
          localStorage.removeItem("role"); // Hapus dari localStorag
          localStorage.removeItem("user_name"); // Hapus dari localStorag
          router.push("/");
        } else {
          toast.error("Gagal melakukan Logout");
        }
      } catch (error) {
        console.error(error);
        toast.error("Terjadi error saat Logout");
      }
    }
  };
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
              <Link href={"/user/teknisi"}>Home</Link>
            </li>
            <li>
              <Link href={"/user/teknisi/data_user"}>Data User</Link>
            </li>
            <li>
              <Link href={"/user/teknisi/data_instansi"}>Data Instansi</Link>
            </li>
            <li>
              <form onSubmit={handleSubmit}>
                <button type="submit" className="cursor-pointer">
                  Log Out
                </button>
              </form>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4 z-20">
          <h1 className="font-bold text-white">Hello, Teknisi</h1>
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
