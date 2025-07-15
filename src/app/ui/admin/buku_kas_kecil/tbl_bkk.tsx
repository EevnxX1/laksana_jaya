"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

interface TabelUi {
  children: React.ReactNode;
}

export default function TabelBukuKasKecil({ children }: TabelUi) {
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8 flex flex-col gap-y-10">
      <div className="w-full">
        <div className="text-white mb-5">
          <h1 className="font-bold text-2xl mb-3">Buku Kas Kecil</h1>
          <div className="flex justify-between">
            <form action="" className="flex space-x-5">
              <div className="flex flex-col">
                {/* <label className="mb-[2px]">Pilih Tanggal Mulai:</label> */}
                <input
                  type="text"
                  name=""
                  placeholder="Cari Judul"
                  className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="flex items-center cursor-pointer self-end px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium"
              >
                <span className="mr-1">Cari</span>{" "}
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />
              </button>
            </form>
            <div className="flex gap-x-5">
              <a
                href="/user/direktur/buku_kas_besar/uang_masuk"
                className="h-fit self-end"
              >
                <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faPrint} className="w-5" />
                  <span className="ml-1">Uang Masuk</span>
                </button>
              </a>
              <a
                href="/user/direktur/buku_kas_besar/uang_keluar"
                className="h-fit self-end"
              >
                <button className="flex items-center cursor-pointer px-3 py-1 bg-[#FF3535] rounded-lg text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faPrint} className="w-5" />
                  <span className="ml-1">Uang Keluar</span>
                </button>
              </a>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-3 text-white">
            Data Transaksi Kas Kecil
          </h1>
          {children}
        </div>
      </div>
      <div className="w-full">
        <div className="text-white mb-5">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-xl">Tabel Data Transaksi</h1>
            <div className="flex gap-x-5">
              <form action="" className="flex space-x-5">
                <div className="flex gap-x-4">
                  {/* <label className="mb-[2px]">Pilih Tanggal Mulai:</label> */}
                  <input
                    type="date"
                    name=""
                    className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
                  />
                  <input
                    type="date"
                    name=""
                    className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center cursor-pointer self-end px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium"
                >
                  <span className="mr-1">Cari</span>{" "}
                  <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />
                </button>
              </form>
              <Link href={""} target="_blank" className="h-fit self-end">
                <button className="flex items-center cursor-pointer px-5 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faPrint} className="w-5" />
                  <span className="ml-1">Cetak Data</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div>{children}</div>
      </div>
      <div className="flex self-center items-center bg-white text-black rounded-xl">
        <Link href={""} className="w-12 h-10 flex justify-center items-center">
          <Image
            src={"/assets/__.png"}
            alt="arrow left"
            width={50}
            height={50}
            className="w-3"
          ></Image>
        </Link>
        <Link
          href={""}
          className="w-10 h-10 flex justify-center items-center border border-[#C7C7C7]"
        >
          <p>1</p>
        </Link>
        <Link
          href={""}
          className="w-10 h-10 flex justify-center items-center border border-[#C7C7C7]"
        >
          <p>2</p>
        </Link>
        <Link
          href={""}
          className="w-10 h-10 flex justify-center items-center border border-[#C7C7C7]"
        >
          <p>3</p>
        </Link>
        <Link href={""} className="w-12 h-10 flex justify-center items-center">
          <Image
            src={"/assets/__.png"}
            alt="arrow left"
            width={50}
            height={50}
            className="w-3 rotate-180"
          ></Image>
        </Link>
      </div>
    </section>
  );
}
