"use client";
import { useEffect, useState } from "react";
import TabelBukuKasBesar from "@/app/ui/direktur/tbl_bkb";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faMagnifyingGlass,
  faPrint,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { FormatNumber } from "@/app/component/format_number";
import { toast } from "react-toastify";

export default function page() {
  const [data, setData] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (startDate && endDate) {
      params.append("start_date", startDate);
      params.append("end_date", endDate);
    } else if (startDate || endDate) {
      toast.error("Tolong Isi Kedua Tanggal Input");
    }
    const apiUrl = `http://127.0.0.1:8000/api/bkb?${params.toString()}`;

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

  const handleSearch = (e: any) => {
    e.preventDefault();
    fetchData(); // Panggil fungsi fetching saat form disubmit
  };

  // --- useEffect untuk Fetching Data ---
  // Kode ini akan mengambil data awal saat komponen dimuat
  useEffect(() => {
    fetchData();
  }, []); // Array kosong berarti hanya berjalan sekali saat mount

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
      <div className="text-white mb-4 flex flex-col">
        <h1 className="font-bold text-2xl mb-3">Buku Kas Besar</h1>
        <div className="flex justify-between mb-5">
          <SearchByKeyword
            keyword={keyword}
            setKeyword={setKeyword}
            handleSearch={handleSearch}
          />
          <div className="flex gap-x-5">
            <SearchByDate
              startDate={startDate}
              setStartDate={setStartDate}
              endDate={endDate}
              setEndDate={setEndDate}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        <Link
          href={`/cetak_bkb?keyword=${keyword}&start_date=${startDate}&end_date=${endDate}`}
          className="h-fit"
          target="_blank"
        >
          <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
            <FontAwesomeIcon icon={faPrint} className="w-5" />
            <span className="ml-1">Cetak Transaksi</span>
          </button>
        </Link>
      </div>
      <div>
        <h1 className="font-bold text-xl mb-3 text-white">Data Transaksi</h1>
        {loading ? (
          <p>Memuat data...</p>
        ) : dataWithSaldo.length > 0 ? (
          <Table source="info" dataTh={dataTh} dataTd={dataTd} />
        ) : (
          <p>Tidak ada data ditemukan.</p>
        )}
      </div>
    </TabelBukuKasBesar>
  );
}

export function SearchByKeyword({
  keyword,
  setKeyword,
  handleSearch,
}: {
  keyword: any;
  setKeyword: any;
  handleSearch: any;
}) {
  return (
    <form onSubmit={handleSearch} className="flex space-x-3">
      <div className="flex flex-col">
        {/* <label className="mb-[2px]">Pilih Tanggal Mulai:</label> */}
        <input
          type="text"
          placeholder="Cari Data"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
        />
      </div>
      <button
        type="submit"
        className="flex items-center cursor-pointer self-end px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium"
      >
        <span className="mr-1">Cari</span>{" "}
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />
      </button>
    </form>
  );
}
export function SearchByDate({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSearch,
}: {
  startDate: any;
  setStartDate: any;
  endDate: any;
  setEndDate: any;
  handleSearch: any;
}) {
  return (
    <form onSubmit={handleSearch} className="flex space-x-3">
      <div className="flex gap-x-2">
        {/* <label className="mb-[2px]">Pilih Tanggal Mulai:</label> */}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
        />
      </div>
      <button
        type="submit"
        className="flex items-center cursor-pointer self-end px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium"
      >
        <span className="mr-1">Cari</span>{" "}
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />
      </button>
    </form>
  );
}
