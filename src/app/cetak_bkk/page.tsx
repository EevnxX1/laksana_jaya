// src/app/user/admin/buku_kas_kecil/cetak/page.tsx
"use client";
import { useState, useEffect } from "react";
import { FormatNumber } from "@/app/component/format_number";
import Image from "next/image";
import { TablePrint } from "../component/table";

// Interface data harus sama dengan yang di page.tsx
interface BukuKasKecil {
  id: number;
  tanggal: string;
  uraian: string;
  instansi: string;
  pekerjaan: string;
  kredit: string;
  debit: string;
  kb_kas: string;
  identity: string;
  identity_uk: string;
}

interface BkkWithSaldo extends BukuKasKecil {
  Saldo: number;
  totalDebit: number;
}

export default function PrintPage() {
  const [bkkData, setBkkData] = useState<BukuKasKecil[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("keyword");
    const startDate = params.get("start_date");
    const endDate = params.get("end_date");

    const fetchDataAndPrint = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (keyword) params.append("keyword", keyword);
      if (startDate && endDate) {
        params.append("start_date", startDate);
        params.append("end_date", endDate);
      }
      const apiUrl = `${
        process.env.NEXT_PUBLIC_API_URL
      }/api/bkk?${params.toString()}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setBkkData(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndPrint();
  }, []); // Re-fetch jika parameter berubah

  // Gunakan useEffect ini untuk memunculkan dialog print setelah data dimuat
  useEffect(() => {
    // Pastikan data sudah ada dan tidak dalam proses loading
    if (bkkData.length > 0 && !loading) {
      window.print();
    }
  }, [bkkData, loading]);

  // Logika untuk menghitung saldo (sama seperti di page.tsx)
  const dataWithSaldo = bkkData.reduce<BkkWithSaldo[]>(
    (acc, current, index) => {
      const debit = Number(current.debit) || 0;
      const kredit = Number(current.kredit) || 0;
      const kb_kas = Number(current.kb_kas) || 0;
      const prevSaldo = index > 0 ? acc[index - 1].Saldo : 0;
      const totalDebit = debit + kb_kas;
      let operate = kredit - totalDebit;
      operate += prevSaldo;
      const Saldo = operate;
      acc.push({ ...current, totalDebit, Saldo });
      return acc;
    },
    []
  );

  const dataTh = [
    "No",
    "Tanggal",
    "Uraian",
    "Instansi",
    "Pekerjaan",
    "Debit",
    "Kredit",
    "Saldo",
  ];

  const dataTd = dataWithSaldo.map((row, index) => [
    index + 1,
    row.tanggal,
    row.uraian,
    row.instansi,
    row.pekerjaan,
    "Rp." + FormatNumber(row.totalDebit),
    "Rp." + FormatNumber(Number(row.kredit)),
    "Rp." + FormatNumber(row.Saldo),
  ]);

  return (
    <section className="flex flex-col items-center gap-y-10">
      <div className="border-b-2 border-black/55">
        <Image src={"/assets/kop.png"} alt="kop" width={700} height={500} />
      </div>
      <h1 className="text-3xl font-bold">BUKU KAS KECIL</h1>
      <TablePrint source="info" dataTh={dataTh} dataTd={dataTd} />
    </section>
  );
}
