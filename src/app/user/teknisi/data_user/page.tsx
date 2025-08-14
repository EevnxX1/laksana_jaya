"use client";
import TabelUser from "@/app/ui/teknisi/user/tbl_user";
import { Table } from "@/app/component/table";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { SearchKeyword } from "@/app/component/SearchKeyword";

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  alamat: string;
  no_hp: string;
  role: string;
}

export default function Page() {
  const [Data, setData] = useState<Users[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/user/all?${params.toString()}`;

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

  const dataTh = ["No", "Nama", "Alamat", "No Hp", "Role", "Action"];
  const dataTd = Data.map((list, index) => [
    index + 1,
    list.name,
    list.alamat,
    list.no_hp,
    list.role,
    <div key={list.id} className="flex justify-center">
      <Link
        href={`data_user/ubah_data?id_user=${list.id}`}
        className={"text-green-800"}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
      </Link>
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <button
        onClick={() => {
          const konfirmasi = confirm(`Yakin Ingin Hapus Akun ${list.name}?`);
          if (konfirmasi) {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/deleted/${list.id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) throw new Error("Gagal hapus");
                toast.success("Data User Berhasil Dihapus");

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
    <TabelUser>
      <div className="text-white mb-5">
        <h1 className="font-bold text-2xl mb-3">DATA USER</h1>
        <div className="flex justify-between">
          <SearchKeyword
            keyword={keyword}
            setKeyword={setKeyword}
            handleSearch={handleSearch}
          />
          <Link
            href="/user/teknisi/data_user/tambah_data"
            className="h-fit self-end"
          >
            <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
              <FontAwesomeIcon icon={faUserPlus} className="w-5" />
              <span className="ml-1">Tambah User</span>
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
    </TabelUser>
  );
}
