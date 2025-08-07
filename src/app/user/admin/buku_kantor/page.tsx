"use client";
import TabelBukuKantor from "@/app/ui/admin/buku_kantor/tbl_bk";
import { Table } from "@/app/component/table";
import { useState, useEffect } from "react";
import { LinkImage } from "@/app/component/link_image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { FormatNumber } from "@/app/component/format_number";

export default function page() {
  return (
    <TabelBukuKantor>
      <TabelDataKantor />
    </TabelBukuKantor>
  );
}

interface IsiTabelDataKantor {
  id: number;
  tanggal: string;
  uraian: string;
  debit: string;
}

export function TabelDataKantor() {
  const [Data, setData] = useState<IsiTabelDataKantor[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk/detail_kantor") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  const dataTh = ["No", "Tanggal", "Uraian", "Jumlah", "Action"];
  const dataTd = Data.map((list, index) => [
    index + 1,
    list.tanggal,
    list.uraian,
    "Rp. " + FormatNumber(Number(list.debit)),
    <div className="flex justify-center">
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
            fetch(`http://127.0.0.1:8000/api/bkk/${list.id}`, {
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
  return <Table dataTd={dataTd} dataTh={dataTh} source="info" />;
}

interface TabelBarangNotaBelanja {
  id: number;
  nota: string;
  uraian: string;
}

export function LinkImageNotaKantor() {
  const [data, setData] = useState<TabelBarangNotaBelanja[]>([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/detail_kantor`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      {data.map((list, index) =>
        list.nota !== "-" ? (
          <LinkImage
            key={index}
            text={list.uraian}
            href=""
            srcImage={list.nota}
          />
        ) : null
      )}
    </>
  );
}
