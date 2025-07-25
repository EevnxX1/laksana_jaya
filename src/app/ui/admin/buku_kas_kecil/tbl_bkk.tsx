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
              <Link
                href="/user/admin/buku_kas_kecil/uang_masuk"
                className="h-fit self-end"
              >
                <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faPrint} className="w-5" />
                  <span className="ml-1">Uang Masuk</span>
                </button>
              </Link>
              <div>
                <input
                  type="checkbox"
                  id="dropdown-link"
                  className="peer hidden"
                />
                <label htmlFor="dropdown-link">
                  <div className="select-none flex items-center gap-x-2 cursor-pointer px-3 py-1 bg-[#FF3535] rounded-lg text-gray-700 font-medium">
                    <FontAwesomeIcon icon={faPrint} className="w-5" />
                    <span className="">Uang Keluar</span>
                    <Image
                      src={"/assets/dropdown.png"}
                      alt=""
                      width={20}
                      height={20}
                    ></Image>
                  </div>
                </label>
                <div className="hidden peer-checked:flex flex-col absolute z-50">
                  <Link
                    href={"buku_kas_kecil/uang_keluar/buku_kantor"}
                    className="px-6 py-2 bg-black/90 hover:bg-green-400"
                  >
                    Buku Kantor
                  </Link>
                  <Link
                    href={"buku_kas_kecil/uang_keluar/proyek_barang"}
                    className="px-6 py-2 bg-black/90 hover:bg-green-400"
                  >
                    Proyek Barang
                  </Link>
                  <Link
                    href={"buku_kas_kecil/uang_keluar/proyek_jasa"}
                    className="px-6 py-2 bg-black/90 hover:bg-green-400"
                  >
                    Proyek Jasa
                  </Link>
                </div>
              </div>
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
