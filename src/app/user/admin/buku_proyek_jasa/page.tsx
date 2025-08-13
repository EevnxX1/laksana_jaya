"use client";
import React, { useState, useEffect } from "react";
import TabelBukuProyekJasa from "@/app/ui/admin/buku_proyek_jasa/tbl_bpj";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faPrint,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { toast } from "react-toastify";
import { SearchKeyword } from "@/app/component/SearchKeyword";

interface BukuProyekBarang {
  id: number;
  post: string;
  nama_pekerjaan: string;
  instansi: string;
}

export default function Page() {
  const [data, setData] = useState<BukuProyekBarang[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/bp_jasa?${params.toString()}`;

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

  const dataTh = ["No", "POST", "Nama Pekerjaan", "Instansi", "Action"];

  const dataTd = data.map((row, index) => [
    index + 1,
    row.post,
    row.nama_pekerjaan,
    row.instansi,
    <div key={row.id} className="flex justify-center">
      <Link
        href={`buku_proyek_jasa/detail?id_bp=${row.id}`}
        className={"text-green-800"}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
      </Link>
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <button
        onClick={() => {
          const konfirmasi = confirm("Yakin ingin hapus?");
          if (konfirmasi) {
            fetch(`http://127.0.0.1:8000/api/bp_jasa/hapus_data/${row.id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) throw new Error("Gagal hapus");
                toast.success("Data Buku Proyek Jasa Berhasil Dihapus");

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
    <TabelBukuProyekJasa>
      <div className="text-white mb-5">
        <h1 className="font-bold text-2xl mb-3">BUKU PROYEK - JASA</h1>
        <div className="flex justify-between">
          <SearchKeyword
            keyword={keyword}
            setKeyword={setKeyword}
            handleSearch={handleSearch}
          />
          <div className="flex gap-x-5">
            <Link
              href={"buku_proyek_jasa/tambah_data"}
              className="h-fit self-end"
            >
              <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
                <FontAwesomeIcon icon={faPrint} className="w-5" />
                <span className="ml-1">Tambah Proyek</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-xl mb-3 text-white">
          Tabel Data Pengadaan Jasa
        </h1>
        {loading ? (
          <p>Memuat data...</p>
        ) : data.length > 0 ? (
          <Table source="info" dataTh={dataTh} dataTd={dataTd} />
        ) : (
          <p>Tidak ada data ditemukan.</p>
        )}
      </div>
    </TabelBukuProyekJasa>
  );
}
