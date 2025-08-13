"use client";
import TabelBukuKantor from "@/app/ui/admin/buku_kantor/tbl_bk";
import { Table } from "@/app/component/table";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { LinkImageNotaKantor } from "@/app/component/LinkImageNotaKantor";
import { toast } from "react-toastify";
import { FormatNumber } from "@/app/component/format_number";
import { SearchKeyword } from "@/app/component/SearchKeyword";

interface IsiTabelDataKantor {
  id: number;
  tanggal: string;
  uraian: string;
  debit: string;
}

export default function Page() {
  const [Data, setData] = useState<IsiTabelDataKantor[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/bkk/detail_kantor?${params.toString()}`;

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

  const dataTh = ["No", "Tanggal", "Uraian", "Jumlah", "Action"];
  const dataTd = Data.map((list, index) => [
    index + 1,
    list.tanggal,
    list.uraian,
    "Rp. " + FormatNumber(Number(list.debit)),
    <div key={list.id} className="flex justify-center">
      <Link
        href={`buku_kas_kecil/ubah_data/buku_kantor?id_bp=${list.id}`}
        className={"text-green-800"}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
      </Link>
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <button
        onClick={() => {
          const konfirmasi = confirm("Yakin ingin hapus?");
          if (konfirmasi) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/${list.id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) throw new Error("Gagal hapus");
                toast.success("Data Buku Kantor Berhasil Dihapus");

                // Hapus data dari state agar tabel update
                setData((prev) => prev.filter((item) => item.id !== list.id));
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
    <TabelBukuKantor>
      <div className="w-full flex flex-col gap-y-7">
        <div className="text-white">
          <h1 className="font-bold text-2xl mb-3">Buku Kantor</h1>
          <div className="flex justify-between">
            <SearchKeyword
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-3 text-white">
            Data Transaksi Buku Kantor
          </h1>
          {loading ? (
            <p>Memuat data...</p>
          ) : Data.length > 0 ? (
            <Table source="info" dataTh={dataTh} dataTd={dataTd} />
          ) : (
            <p>Tidak ada data ditemukan.</p>
          )}
        </div>
        <div>
          <h1 className="font-bold text-xl mb-3 text-white">
            Nota Buku Kantor
          </h1>
          <div className="flex flex-wrap gap-y-5 gap-x-5">
            <LinkImageNotaKantor />
          </div>
        </div>
      </div>
    </TabelBukuKantor>
  );
}
