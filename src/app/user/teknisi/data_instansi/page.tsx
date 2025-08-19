"use client";
import TabelInstansi from "@/app/ui/teknisi/instansi/tbl_instansi";
import { Table } from "@/app/component/table";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { SearchKeyword } from "@/app/component/SearchKeyword";
import Image from "next/image";
import clsx from "clsx";

interface Instansi {
  id: number;
  instansi: string;
  post: string;
  alamat_instansi: string;
  no_telp: string;
  npwp: string;
}

export default function Page() {
  const [Data, setData] = useState<Instansi[]>([]);
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
    }/api/instansi?${params.toString()}`;

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

  const handleSearch = (e: React.FocusEvent) => {
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
    "Nama Instansi",
    "Post",
    "No Telp",
    "Alamat Instansi",
    "NPWP",
    "Action",
  ];

  // --- Pagination logic ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  const dataTd = currentItems.map((list, index) => [
    indexOfFirstItem + index + 1,
    list.instansi,
    list.post,
    list.no_telp,
    list.alamat_instansi,
    list.npwp,
    <div key={list.id} className="flex justify-center">
      <Link
        href={`data_instansi/ubah_data?id_instansi=${list.id}`}
        className={"text-green-800"}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
      </Link>
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <button
        onClick={() => {
          const konfirmasi = confirm(
            `Yakin Ingin Hapus Instansi ${list.post}?`
          );
          if (konfirmasi) {
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/instansi/hapus_data/${list.id}`,
              {
                method: "DELETE",
              }
            )
              .then((res) => {
                if (!res.ok) throw new Error("Gagal hapus");
                toast.success("Data Instansi Berhasil Dihapus");

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
    <TabelInstansi>
      <div className="text-white mb-5">
        <h1 className="font-bold text-2xl mb-3">DATA INSTANSI</h1>
        <div className="flex justify-between">
          <div className="flex gap-x-6">
            <SearchKeyword
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
            <Link
              href={`/cetak_instansi?keyword=${keyword}`}
              className="h-fit self-end"
              target="_blank"
            >
              <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
                <FontAwesomeIcon icon={faPrint} className="w-5" />
                <span className="ml-1">Cetak Instansi</span>
              </button>
            </Link>
          </div>
          <Link
            href="/user/teknisi/data_instansi/tambah_data"
            className="h-fit self-end"
          >
            <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
              <FontAwesomeIcon icon={faPrint} className="w-5" />
              <span className="ml-1">Tambah Instansi</span>
            </button>
          </Link>
        </div>
      </div>
      <div>
        {loading ? (
          <p>Memuat data...</p>
        ) : Data.length > 0 ? (
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
    </TabelInstansi>
  );
}
