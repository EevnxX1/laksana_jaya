"use client";
import { useEffect, useState } from "react";
import TabelBukuKasBesar from "@/app/ui/direktur/tbl_bkb";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FormatNumber } from "@/app/component/format_number";
import { toast } from "react-toastify";

export default function page() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkb") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  const dataTh = [
    "No",
    "Tgl",
    "Kode Transaksi",
    "Keterangan",
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
    row.kd_transaksi,
    row.uraian,
    "Rp." + FormatNumber(row.debit),
    "Rp." + FormatNumber(row.kredit),
    "Rp." + FormatNumber(row.Saldo),
    <div className="flex justify-center">
      <Link
        href={`buku_kas_besar/ubah_data?id_bkb=${row.id}`}
        className={"text-green-800"}
      >
        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
      </Link>
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <button
        onClick={() => {
          const konfirmasi = confirm("Yakin ingin hapus?");
          if (konfirmasi) {
            fetch(`http://127.0.0.1:8000/api/bkb/hapus_data/${row.id}`, {
              method: "DELETE",
            })
              .then((res) => {
                if (!res.ok) throw new Error("Gagal hapus");
                toast.success("Data Buku Kas Besar Berhasil Dihapus");

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
    <TabelBukuKasBesar>
      <Table source="info" dataTh={dataTh} dataTd={dataTd} />
    </TabelBukuKasBesar>
  );
}
