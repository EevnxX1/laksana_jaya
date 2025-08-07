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
import { FormatNumber } from "@/app/component/format_number";

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
    "No",
    "Tanggal",
    "Uraian",
    "Instansi",
    "Pekerjaan",
    "Debit",
    "Kredit",
    "Saldo",
    "Action",
  ];

  // Hitung Saldo secara berurutan
  const dataWithSaldo = data.reduce((acc: any[], current, index) => {
    const debit = Number(current.debit) || 0;
    const kredit = Number(current.kredit) || 0;
    const prevSaldo = index > 0 ? acc[index - 1].Saldo : 0;
    let operate = kredit - debit;
    operate += prevSaldo;
    const Saldo = operate;
    acc.push({
      ...current,
      Saldo, // tambahkan field baru
    });
    return acc;
  }, []);

  const dataTd = dataWithSaldo.map((row, index) => [
    index + 1,
    row.tanggal,
    row.uraian,
    row.instansi,
    row.pekerjaan,
    "Rp." + FormatNumber(row.debit),
    "Rp." + FormatNumber(row.kredit),
    "Rp." + FormatNumber(row.Saldo),
    <div className="flex justify-center">
      {row.identity == "uang_keluar" ? (
        row.identity_uk == "buku_kantor" ? (
          <Link
            href={`buku_kas_kecil/ubah_data/buku_kantor?id_bp=${row.id}`}
            className={"text-green-800"}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
          </Link>
        ) : row.identity_uk == "buku_barang" ? (
          <Link
            href={`buku_kas_kecil/ubah_data/proyek_barang?id_bp=${row.id}`}
            className={"text-green-800"}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
          </Link>
        ) : row.identity_uk == "buku_jasa" ? (
          <Link
            href={`buku_kas_kecil/ubah_data/proyek_jasa?id_bp=${row.id}`}
            className={"text-green-800"}
          >
            <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
          </Link>
        ) : null
      ) : (
        <Link
          href={`buku_kas_kecil/ubah_data/uang_masuk?id_bp=${row.id}`}
          className={"text-green-800"}
        >
          <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
        </Link>
      )}
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
      <Table source="info" dataTh={dataTh} dataTd={dataTd} />
    </TabelBukuKasKecil>
  );
}
