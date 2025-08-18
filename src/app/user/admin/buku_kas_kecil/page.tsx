"use client";
import React, { useState, useEffect } from "react";
import TabelBukuKasKecil from "@/app/ui/admin/buku_kas_kecil/tbl_bkk";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { toast } from "react-toastify";
import { FormatNumber } from "@/app/component/format_number";
import { SearchKeyword } from "@/app/component/SearchKeyword";
import { SearchByDate } from "@/app/component/SearchDate";

interface BukuKasKecil {
  id: number;
  identity: string;
  identity_uk: string;
  tanggal: string;
  uraian: string;
  instansi: string;
  pekerjaan: string;
  debit: string;
  kredit: string;
  kb_kas: number;
}

interface BkkWithSaldo extends BukuKasKecil {
  Saldo: number;
  totalDebit: number;
}

export default function Page() {
  const [data, setData] = useState<BukuKasKecil[]>([]);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (startDate && endDate) {
      params.append("start_date", startDate);
      params.append("end_date", endDate);
    } else if (startDate || endDate) {
      toast.error("Tolong Isi Kedua Tanggal Input");
    }
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/bkk?${params.toString()}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data); // Update state dengan data hasil pencarian
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(); // Panggil fungsi fetching saat form disubmit
  };

  // --- useEffect untuk Fetching Data ---
  // Kode ini akan mengambil data awal saat komponen dimuat
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    fetchData();
  }, []); // Array kosong berarti hanya berjalan sekali saat mount
  /* eslint-enable react-hooks/exhaustive-deps */

  const dataTh = [
    "No",
    "Tanggal",
    "Uraian",
    "Instansi",
    "Pekerjaan",
    "Debit",
    "Kredit",
    "Saldo",
    "Action",
  ];

  // Hitung Saldo secara berurutan
  const dataWithSaldo = data.reduce<BkkWithSaldo[]>((acc, current, index) => {
    const debit = Number(current.debit) || 0;
    const kredit = Number(current.kredit) || 0;
    const kb_kas = Number(current.kb_kas) || 0;
    const prevSaldo = index > 0 ? acc[index - 1].Saldo : 0;
    const totalDebit = debit + kb_kas;
    let operate = kredit - totalDebit;
    operate += prevSaldo;
    const Saldo = operate;
    acc.push({
      ...current,
      totalDebit,
      Saldo, // tambahkan field baru
    });
    return acc;
  }, []);

  const dataTd = dataWithSaldo.map((row, index) => [
    index + 1,
    row.tanggal,
    row.uraian,
    row.instansi,
    row.pekerjaan,
    "Rp." + FormatNumber(row.totalDebit),
    "Rp." + FormatNumber(Number(row.kredit)),
    "Rp." + FormatNumber(row.Saldo),
    <div key={row.id} className="flex justify-center">
      {row.identity == "uang_keluar" ? (
        row.identity_uk == "buku_kantor" ? (
          <Link
            href={`buku_kas_kecil/ubah_data/buku_kantor?id_bp=${row.id}`}
            className={"text-green-800"}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
          </Link>
        ) : row.identity_uk == "buku_barang" ? (
          <Link
            href={`buku_kas_kecil/ubah_data/proyek_barang?id_bp=${row.id}`}
            className={"text-green-800"}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
          </Link>
        ) : row.identity_uk == "buku_jasa" ? (
          <Link
            href={`buku_kas_kecil/ubah_data/proyek_jasa?id_bp=${row.id}`}
            className={"text-green-800"}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
          </Link>
        ) : null
      ) : (
        <Link
          href={`buku_kas_kecil/ubah_data/uang_masuk?id_bp=${row.id}`}
          className={"text-green-800"}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
        </Link>
      )}
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <button
        onClick={() => {
          const konfirmasi = confirm("Yakin ingin hapus?");
          if (konfirmasi) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/${row.id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) throw new Error("Gagal hapus");
                toast.success("Data Buku Kas Kecil Berhasil Dihapus");

                // Hapus data dari state agar tabel update
                setData((prev) => prev.filter((item) => item.id !== row.id));
              })
              .catch(() => {
                toast.error("Terjadi kesalahan saat menghapus");
              });
          }
        }}
        className={"text-red-800 cursor-pointer"}
      >
        <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
      </button>
    </div>,
  ]);

  return (
    <TabelBukuKasKecil>
      <div className="w-full">
        <div className="text-white mb-7">
          <h1 className="font-bold text-2xl mb-3">Buku Kas Kecil</h1>
          <div className="flex justify-between">
            <SearchKeyword
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
            <div className="flex gap-x-5 order-1">
              <Link
                href="/user/admin/buku_kas_kecil/uang_masuk"
                className="h-fit self-end"
              >
                <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
                  <FontAwesomeIcon icon={faPrint} className="w-5" />
                  <span className="ml-1">Uang Masuk</span>
                </button>
              </Link>
              <div className="group">
                <label htmlFor="dropdown-link">
                  <div className="select-none flex items-center gap-x-2 cursor-pointer px-3 py-1 bg-[#FF3535] rounded-lg text-gray-700 font-medium">
                    <FontAwesomeIcon icon={faPrint} className="w-5" />
                    <span className="">Uang Keluar</span>
                    <Image
                      src={"/assets/dropdown.png"}
                      alt=""
                      width={20}
                      height={20}
                      className="group-hover:rotate-[-90deg] transition duration-75"
                    ></Image>
                  </div>
                </label>
                <div className="rotate-x-[90deg] translate-y-[-50px] group-hover:rotate-x-0 group-hover:translate-y-0 transition duration-75 flex flex-col absolute z-50">
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
          <div className="mb-5 flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold text-xl mb-3 text-white">
                Data Transaksi Kas Kecil
              </h1>
              <div>
                <SearchByDate
                  startDate={startDate}
                  setStartDate={setStartDate}
                  endDate={endDate}
                  setEndDate={setEndDate}
                  handleSearch={handleSearch}
                />
              </div>
            </div>
            <Link
              href={`/cetak_bkk?keyword=${keyword}&start_date=${startDate}&end_date=${endDate}`}
              className="h-fit self-end"
              target="_blank"
            >
              <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
                <FontAwesomeIcon icon={faPrint} className="w-5" />
                <span className="ml-1">Cetak Transaksi</span>
              </button>
            </Link>
          </div>
          {/* 2. Kondisional render untuk loading atau data */}
          {loading ? (
            <p>Memuat data...</p>
          ) : dataWithSaldo.length > 0 ? (
            <Table source="info" dataTh={dataTh} dataTd={dataTd} />
          ) : (
            <p>Tidak ada data ditemukan.</p>
          )}
        </div>
      </div>
    </TabelBukuKasKecil>
  );
}
