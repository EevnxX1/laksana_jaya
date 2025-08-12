"use client";
import TabelBukuKantor from "@/app/ui/admin/buku_kantor/tbl_bk";
import { Table } from "@/app/component/table";
import { useState, useEffect } from "react";
import { LinkImage } from "@/app/component/link_image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { FormatNumber } from "@/app/component/format_number";

// export default function page() {
//   return (
//     <TabelBukuKantor>
//       <TabelDataKantor />
//     </TabelBukuKantor>
//   );
// }

interface IsiTabelDataKantor {
  id: number;
  tanggal: string;
  uraian: string;
  debit: string;
}

export default function page() {
  const [Data, setData] = useState<IsiTabelDataKantor[]>([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    const apiUrl = `http://127.0.0.1:8000/api/bkk/detail_kantor?${params.toString()}`;

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

  return (
    <TabelBukuKantor>
      <div className="w-full flex flex-col gap-y-7">
        <div className="text-white">
          <h1 className="font-bold text-2xl mb-3">Buku Kantor</h1>
          <div className="flex justify-between">
            <SearchKeyword
              keyword={keyword}
              setKeyword={setKeyword}
              handleSearch={handleSearch}
            />
          </div>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-3 text-white">
            Data Transaksi Buku Kantor
          </h1>
          {loading ? (
            <p>Memuat data...</p>
          ) : Data.length > 0 ? (
            <Table source="info" dataTh={dataTh} dataTd={dataTd} />
          ) : (
            <p>Tidak ada data ditemukan.</p>
          )}
        </div>
        <div>
          <h1 className="font-bold text-xl mb-3 text-white">
            Nota Buku Kantor
          </h1>
          <div className="flex flex-wrap gap-y-5 gap-x-5">
            <LinkImageNotaKantor />
          </div>
        </div>
      </div>
    </TabelBukuKantor>
  );
}

export function SearchKeyword({
  keyword,
  setKeyword,
  handleSearch,
}: {
  keyword: any;
  setKeyword: any;
  handleSearch: any;
}) {
  return (
    <form onSubmit={handleSearch} className="flex space-x-5">
      <div className="flex flex-col">
        {/* <label className="mb-[2px]">Pilih Tanggal Mulai:</label> */}
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari Data"
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
