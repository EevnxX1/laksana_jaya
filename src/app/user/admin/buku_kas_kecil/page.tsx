"use client";
import React, { useState, useEffect } from "react";
import TabelBukuKasKecil from "@/app/ui/admin/buku_kas_kecil/tbl_bkk";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface BukuKasKecil {
  id: number;
  identity: string;
  identity_uk: string;
  tanggal: string;
  uraian: string;
  instansi: string;
  pekerjaan: string;
  debit: string;
  kredit: string;
}

export default function page() {
  const [data, setData] = useState<BukuKasKecil[]>([]);
  const [total, setTotal] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let kredit = 0;
    let debit = 0;
    for (let index = 0; index < data.length; index++) {
      kredit += Number(data[index].kredit); // pastikan dikonversi ke number
      debit += Number(data[index].debit); // pastikan dikonversi ke number
    }
    const totalSaldo = kredit - debit;
    setTotal(String(totalSaldo));
    console.log(totalSaldo);
  });

  const dataTh = [
    "",
    "No",
    "Tanggal",
    "Uraian",
    "Instansi",
    "Pekerjaan",
    "Debit",
    "Kredit",
    "Action",
  ];

  const dataTd = data.map((row, index) => [
    <div className="flex justify-center px-2">
      <input type="checkbox" className="w-4 h-4" />
    </div>,
    index + 1,
    row.tanggal,
    row.uraian,
    row.instansi,
    row.pekerjaan,
    row.debit,
    row.kredit,
    <div className="flex justify-center">
      <Link href={""} className={"text-green-800"}>
        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
      </Link>
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <button
        onClick={() => {
          const konfirmasi = confirm("Yakin ingin hapus?");
          if (konfirmasi) {
            fetch(`http://127.0.0.1:8000/api/bkk/${row.id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) throw new Error("Gagal hapus");
                toast.success("Data Buku Kas Kecil Berhasil Dihapus");

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
    <TabelBukuKasKecil>
      <Table
        source="total"
        fieldNameRow="Saldo"
        dataTotal={"Rp." + total}
        dataTh={dataTh}
        dataTd={dataTd}
      />
    </TabelBukuKasKecil>
  );
}
