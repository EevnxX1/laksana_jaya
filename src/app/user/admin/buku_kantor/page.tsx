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
import Image from "next/image";
import clsx from "clsx";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const dataTh = ["No", "Tanggal", "Uraian", "Jumlah", "Action"];

  // --- Pagination logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const dataTd = currentItems.map((list, index) => [
    indexOfFirstItem + index + 1,
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
        <div className="flex self-center items-center bg-white text-black rounded-xl w-fit m-auto">
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
        <div className="mt-5">
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
