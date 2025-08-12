// src/app/user/admin/buku_kas_kecil/cetak/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FormatNumber } from "@/app/component/format_number";
import Image from "next/image";
import { TablePrint } from "../component/table";

export default function PrintPage() {
  const searchParams = useSearchParams();
  const [bkbData, setBkbData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Ambil parameter dari URL
  const keyword = searchParams.get("keyword") || "";
  const startDate = searchParams.get("start_date") || "";
  const endDate = searchParams.get("end_date") || "";

  useEffect(() => {
    const fetchDataAndPrint = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);
      if (startDate && endDate) {
        params.append("start_date", startDate);
        params.append("end_date", endDate);
      }
      const apiUrl = `http://127.0.0.1:8000/api/bkb?${params.toString()}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setBkbData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndPrint();
  }, [keyword, startDate, endDate]); // Re-fetch jika parameter berubah

  // Gunakan useEffect ini untuk memunculkan dialog print setelah data dimuat
  useEffect(() => {
    // Pastikan data sudah ada dan tidak dalam proses loading
    if (bkbData.length > 0 && !loading) {
      window.print();
    }
  }, [bkbData, loading]);

  // Logika untuk menghitung saldo (sama seperti di page.tsx)
  const dataWithSaldo = bkbData.reduce((acc: any[], current, index) => {
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

  const dataTh = [
    "No",
    "Tgl",
    "Kode Transaksi",
    "Keterangan",
    "Debit",
    "Kredit",
    "Saldo",
  ];

  const dataTd = dataWithSaldo.map((row, index) => [
    index + 1,
    row.tanggal,
    row.kd_transaksi,
    row.uraian,
    "Rp." + FormatNumber(row.debit),
    "Rp." + FormatNumber(row.kredit),
    "Rp." + FormatNumber(row.Saldo),
  ]);

  return (
    <section className="flex flex-col items-center gap-y-10">
      <div className="border-b-2 border-black/55">
        <Image src={"/assets/kop.png"} alt="kop" width={700} height={500} />
      </div>
      <h1 className="text-3xl font-bold">BUKU KAS BESAR</h1>
      <TablePrint source="info" dataTh={dataTh} dataTd={dataTd} />
    </section>
  );
}
