"use client";
import React, { useState, useEffect } from "react";
import { TabelBukuKasKecilDirektur } from "@/app/ui/admin/buku_kas_kecil/tbl_bkk";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { FormatNumber } from "@/app/component/format_number";
import Link from "next/link";
import { SearchKeyword } from "@/app/component/SearchKeyword";

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
  kb_kas: number;
}

interface BkkWithTotalDebit extends BukuKasKecil {
  totalDebit: number;
  Saldo: number;
}

export default function Page() {
  const [data, setData] = useState<BukuKasKecil[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL
    }/api/bkk?${params.toString()}`;

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

  // Hitung Saldo secara berurutan
  const dataWithSaldo = data.reduce(
    (acc: BkkWithTotalDebit[], current, index) => {
      const debit = Number(current.debit) || 0;
      const kredit = Number(current.kredit) || 0;
      const kb_kas = Number(current.kb_kas) || 0;
      const prevSaldo = index > 0 ? acc[index - 1].Saldo : 0;
      const totalDebit = debit + kb_kas;
      let operate = kredit - totalDebit;
      operate += prevSaldo;
      const Saldo = operate;
      acc.push({
        ...current,
        totalDebit,
        Saldo, // tambahkan field baru
      });
      return acc;
    },
    []
  );

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
    <TabelBukuKasKecilDirektur>
      <div className="w-full">
        <div className="text-white mb-5">
          <h1 className="font-bold text-2xl mb-3">Buku Kas Kecil</h1>
          <div className="flex gap-x-5">
            <SearchKeyword
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
            <Link
              href={`/cetak_bkk?keyword=${keyword}`}
              className="h-fit self-end"
              target="_blank"
            >
              <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
                <FontAwesomeIcon icon={faPrint} className="w-5" />
                <span className="ml-1">Cetak Data</span>
              </button>
            </Link>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-3 text-white">
            Data Transaksi Kas Kecil
          </h1>
          {loading ? (
            <p>Memuat data...</p>
          ) : dataWithSaldo.length > 0 ? (
            <Table source="info" dataTh={dataTh} dataTd={dataTd} />
          ) : (
            <p>Tidak ada data ditemukan.</p>
          )}
        </div>
      </div>
    </TabelBukuKasKecilDirektur>
  );
}
