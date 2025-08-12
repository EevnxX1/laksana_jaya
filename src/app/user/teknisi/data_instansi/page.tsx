"use client";
import TabelInstansi from "@/app/ui/teknisi/instansi/tbl_instansi";
import { Table } from "@/app/component/table";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
  faMagnifyingGlass,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function page() {
  const [Data, setData] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    const apiUrl = `http://127.0.0.1:8000/api/instansi?${params.toString()}`;

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

  const handleSearch = (e: any) => {
    e.preventDefault();
    fetchData(); // Panggil fungsi fetching saat form disubmit
  };

  // --- useEffect untuk Fetching Data ---
  // Kode ini akan mengambil data awal saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []); // Array kosong berarti hanya berjalan sekali saat mount

  const dataTh = [
    "No",
    "Nama Instansi",
    "Post",
    "No Telp",
    "Alamat Instansi",
    "NPWP",
    "Action",
  ];
  const dataTd = Data.map((list, index) => [
    index + 1,
    list.instansi,
    list.post,
    list.no_telp,
    list.alamat_instansi,
    list.npwp,
    <div className="flex justify-center">
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
            fetch(`http://127.0.0.1:8000/api/instansi/hapus_data/${list.id}`, {
              method: "DELETE",
            })
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
            <SearchByKeyword
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
    </TabelInstansi>
  );
}

export function SearchByKeyword({
  keyword,
  setKeyword,
  handleSearch,
}: {
  keyword: any;
  setKeyword: any;
  handleSearch: any;
}) {
  return (
    <form onSubmit={handleSearch} className="flex space-x-3">
      <div className="flex flex-col">
        {/* <label className="mb-[2px]">Pilih Tanggal Mulai:</label> */}
        <input
          type="text"
          placeholder="Cari Data"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
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
  );
}
