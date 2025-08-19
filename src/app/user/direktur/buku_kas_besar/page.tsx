"use client";
import React, { useEffect, useState } from "react";
import TabelBukuKasBesar from "@/app/ui/direktur/tbl_bkb";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPrint,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FormatNumber } from "@/app/component/format_number";
import { toast } from "react-toastify";
import { SearchKeyword } from "@/app/component/SearchKeyword";
import { SearchByDate } from "@/app/component/SearchDate";
import Image from "next/image";
import clsx from "clsx";

interface Bkb {
  id: number;
  tanggal: string;
  kd_transaksi: string;
  uraian: string;
  debit: number;
  kredit: number;
}

interface BkbWithSaldo extends Bkb {
  Saldo: number;
}

export default function Page() {
  const [data, setData] = useState<Bkb[]>([]);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
    }/api/bkb?${params.toString()}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setData(data); // Update state dengan data hasil pencarian
      setCurrentPage(1);
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
    "Tgl",
    "Kode Transaksi",
    "Keterangan",
    "Debit",
    "Kredit",
    "Saldo",
    "Action",
  ];

  // Hitung Saldo secara berurutan
  const dataWithSaldo = data.reduce((acc: BkbWithSaldo[], current, index) => {
    const debit = Number(current.debit) || 0;
    const kredit = Number(current.kredit) || 0;
    const prevSaldo = index > 0 ? acc[index - 1].Saldo : 0;
    let operate = kredit - debit;
    operate += prevSaldo;
    const Saldo = operate;
    acc.push({
      ...current,
      Saldo, // tambahkan field baru
    });
    return acc;
  }, []);

  // --- Pagination logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = dataWithSaldo.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(dataWithSaldo.length / itemsPerPage);

  const dataTd = currentItems.map((row, index) => [
    indexOfFirstItem + index + 1,
    row.tanggal,
    row.kd_transaksi,
    row.uraian,
    "Rp." + FormatNumber(row.debit),
    "Rp." + FormatNumber(row.kredit),
    "Rp." + FormatNumber(row.Saldo),
    <div key={row.id} className="flex justify-center">
      <Link
        href={`buku_kas_besar/ubah_data?id_bkb=${row.id}`}
        className={"text-green-800"}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
      </Link>
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <button
        onClick={() => {
          const konfirmasi = confirm("Yakin ingin hapus?");
          if (konfirmasi) {
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/bkb/hapus_data/${row.id}`,
              {
                method: "DELETE",
              }
            )
              .then((res) => {
                if (!res.ok) throw new Error("Gagal hapus");
                toast.success("Data Buku Kas Besar Berhasil Dihapus");

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
    <TabelBukuKasBesar>
      <div className="text-white mb-4 flex flex-col">
        <h1 className="font-bold text-2xl mb-3">Buku Kas Besar</h1>
        <div className="flex justify-between mb-5">
          <SearchKeyword
            keyword={keyword}
            setKeyword={setKeyword}
            handleSearch={handleSearch}
          />
          <div className="flex gap-x-5">
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
          href={`/cetak_bkb?keyword=${keyword}&start_date=${startDate}&end_date=${endDate}`}
          className="h-fit"
          target="_blank"
        >
          <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
            <FontAwesomeIcon icon={faPrint} className="w-5" />
            <span className="ml-1">Cetak Transaksi</span>
          </button>
        </Link>
      </div>
      <div>
        <h1 className="font-bold text-xl mb-3 text-white">Data Transaksi</h1>
        {loading ? (
          <p>Memuat data...</p>
        ) : dataWithSaldo.length > 0 ? (
          <Table source="info" dataTh={dataTh} dataTd={dataTd} />
        ) : (
          <p>Tidak ada data ditemukan.</p>
        )}
      </div>
      <div className="flex self-center items-center bg-white text-black rounded-xl w-fit m-auto mt-5">
        <button
          className="w-12 h-10 flex justify-center cursor-pointer items-center disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <Image
            src={"/assets/__.png"}
            alt="arrow left"
            width={50}
            height={50}
            className="w-3"
          ></Image>
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={clsx(
              "w-10 h-10 flex justify-center cursor-pointer items-center border border-[#C7C7C7]",
              currentPage === i + 1 ? "bg-blue-500 text-white" : ""
            )}
            onClick={() => setCurrentPage(i + 1)}
          >
            <p>{i + 1}</p>
          </button>
        ))}
        <button
          className="w-12 h-10 flex justify-center cursor-pointer items-center disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <Image
            src={"/assets/__.png"}
            alt="arrow left"
            width={50}
            height={50}
            className="w-3 rotate-180"
          ></Image>
        </button>
      </div>
    </TabelBukuKasBesar>
  );
}
