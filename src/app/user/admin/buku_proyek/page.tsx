"use client";
import { useState, useEffect } from "react";
import TabelBukuProyek from "@/app/ui/admin/buku_proyek/tbl_bp";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { toast } from "react-toastify";

interface BukuProyekBarang {
  id: number;
  post: string;
  pekerjaan: string;
  instansi: string;
}

export default function page() {
  const [data, setData] = useState<BukuProyekBarang[]>([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bp_barang") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  const dataTh = ["No", "POST", "Nama Pekerjaan", "Instansi", "Action"];

  const dataTd = data.map((row, index) => [
    index + 1,
    row.post,
    row.pekerjaan,
    row.instansi,
    <div className="flex justify-center">
      <Link
        href={`buku_proyek/detail?id_bp=${row.id}`}
        className={"text-green-800"}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
      </Link>
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <button
        onClick={() => {
          const konfirmasi = confirm("Yakin ingin hapus?");
          if (konfirmasi) {
            fetch(`http://127.0.0.1:8000/api/bp_barang/hapus_data/${row.id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) throw new Error("Gagal hapus");
                toast.success("Data Buku Proyek Barang Berhasil Dihapus");

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
    <TabelBukuProyek>
      <Table source="info" dataTh={dataTh} dataTd={dataTd} />
    </TabelBukuProyek>
  );
}
