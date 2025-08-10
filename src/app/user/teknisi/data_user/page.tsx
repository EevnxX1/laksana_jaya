"use client";
import TabelUser from "@/app/ui/teknisi/user/tbl_user";
import { Table } from "@/app/component/table";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function page() {
  return (
    <TabelUser>
      <TabelDataUser />
    </TabelUser>
  );
}

export function TabelDataUser() {
  const [Data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/user/all") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  const dataTh = ["No", "Nama", "Alamat", "No Hp", "Role", "Action"];
  const dataTd = Data.map((list, index) => [
    index + 1,
    list.name,
    list.alamat,
    list.no_hp,
    list.role,
    <div className="flex justify-center">
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
            fetch(`http://127.0.0.1:8000/api/deleted/${list.id}`, {
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
  return <Table dataTd={dataTd} dataTh={dataTh} source="info" />;
}
