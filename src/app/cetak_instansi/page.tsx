// src/app/user/admin/buku_kas_kecil/cetak/page.tsx
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FormatNumber } from "@/app/component/format_number";
import Image from "next/image";
import { TablePrint } from "../component/table";

export default function PrintPage() {
  const searchParams = useSearchParams();
  const [InstansiData, setInstansiData] = useState<any[]>([]);
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
      const apiUrl = `http://127.0.0.1:8000/api/instansi?${params.toString()}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setInstansiData(data);
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
    if (InstansiData.length > 0 && !loading) {
      window.print();
    }
  }, [InstansiData, loading]);

  const dataTh = [
    "No",
    "Nama Instansi",
    "Post",
    "No Telp",
    "Alamat Instansi",
    "NPWP",
  ];

  const dataTd = InstansiData.map((row, index) => [
    index + 1,
    row.instansi,
    row.post,
    row.no_telp,
    row.alamat_instansi,
    row.npwp,
  ]);

  return (
    <section className="flex flex-col items-center gap-y-10">
      <div className="border-b-2 border-black/55">
        <Image src={"/assets/kop.png"} alt="kop" width={700} height={500} />
      </div>
      <h1 className="text-3xl font-bold">INSTANSI</h1>
      <TablePrint source="info" dataTh={dataTh} dataTd={dataTd} />
    </section>
  );
}
