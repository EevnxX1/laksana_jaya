// src/app/user/admin/buku_kas_kecil/cetak/page.tsx
"use client";
import { useState, useEffect } from "react";
import { FormatNumber } from "@/app/component/format_number";
import Image from "next/image";
import clsx from "clsx";

interface detailDataBukuProyek {
  id: number;
  nama_pekerjaan: string;
  instansi: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  nilai_pekerjaan: string;
}

interface TabelJasaNilai {
  id: number;
  tanggal: string;
  uraian: string;
  kb_kas: number;
  upah: number;
  material_kaskecil: number;
  material_kasbesar: number;
  non_material: number;
  dircost: number;
  debit: number;
  grand_total: number;
}

interface TbnbWithGrandTotal extends TabelJasaNilai {
  grandTotal: number;
}

export default function PrintPage() {
  const [BkkData, setBkkData] = useState<TabelJasaNilai[]>([]);
  const [JasaData, setJasaData] = useState<detailDataBukuProyek[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentId = params.get("id"); // ambil langsung

    const fetchDataAndPrint = async () => {
      setLoading(true);
      const apiUrlJasa = `${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa/detail/${currentId}`;
      const apiUrlBkk = `${process.env.NEXT_PUBLIC_API_URL}/api/bkk/detail_jasa/${currentId}`;
      try {
        const response1 = await fetch(apiUrlJasa);
        const response2 = await fetch(apiUrlBkk);
        const data1 = await response1.json();
        const data2 = await response2.json();
        setJasaData(data1);
        setBkkData(data2);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndPrint();
  }, []); // Re-fetch jika parameter berubah

  // console.log("Data Barang detail = ", BarangData);

  // Detail Jasa
  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [SubKegiatan, setSubKegiatan] = useState("");
  const [Tahun_anggaran, setTahun_anggaran] = useState("");
  const [NilaiPekerjaan, setNilaiPekerjaan] = useState("");

  useEffect(() => {
    const proyek = JasaData[0];
    if (proyek) {
      setNamaPekerjaan(proyek.nama_pekerjaan);
      setInstansi(proyek.instansi);
      setSubKegiatan(proyek.sub_kegiatan);
      setTahun_anggaran(proyek.tahun_anggaran);
      setNilaiPekerjaan(
        String("Rp. " + FormatNumber(Number(proyek.nilai_pekerjaan)))
      );
    }
  }, [JasaData]);
  // Detail Jasa

  // Detail Bkk Jasa
  const [TotKbKas, setTotKbKas] = useState("");
  const [TotUpah, setTotUpah] = useState("");
  const [TotMaCil, setTotMaCil] = useState("");
  const [TotMaSar, setTotMaSar] = useState("");
  const [TotNonMa, setTotNonMa] = useState("");
  const [TotDircost, setTotDircost] = useState("");
  const [TotDebit, setTotDebit] = useState("");
  const [GrandTot, setGrandTot] = useState("");

  // Hitung grand_total secara berurutan
  const dataWithGrandTotal = BkkData.reduce<TbnbWithGrandTotal[]>(
    (acc, current, index) => {
      const debit = Number(current.debit) || 0;
      const prevGrandTotal = index > 0 ? acc[index - 1].grand_total : 0;
      const grandTotal = prevGrandTotal + debit;
      acc.push({
        ...current,
        grandTotal, // tambahkan field baru
      });

      return acc;
    },
    []
  );

  useEffect(() => {
    if (dataWithGrandTotal.length > 0) {
      const lastGrandTotal =
        dataWithGrandTotal[dataWithGrandTotal.length - 1].grandTotal;
      setGrandTot(String(lastGrandTotal));
    }
  }, [dataWithGrandTotal]);

  useEffect(() => {
    let operasi1 = 0;
    let operasi2 = 0;
    let operasi3 = 0;
    let operasi4 = 0;
    let operasi5 = 0;
    let operasi6 = 0;
    let operasi7 = 0;
    for (let index = 0; index < BkkData.length; index++) {
      operasi1 += Number(BkkData[index].kb_kas); // pastikan dikonversi ke number
      operasi2 += Number(BkkData[index].upah); // pastikan dikonversi ke number
      operasi3 += Number(BkkData[index].material_kaskecil); // pastikan dikonversi ke number
      operasi4 += Number(BkkData[index].material_kasbesar); // pastikan dikonversi ke number
      operasi5 += Number(BkkData[index].non_material); // pastikan dikonversi ke number
      operasi6 += Number(BkkData[index].dircost); // pastikan dikonversi ke number
      operasi7 += Number(BkkData[index].debit); // pastikan dikonversi ke number
    }
    setTotKbKas(String(operasi1));
    setTotUpah(String(operasi2));
    setTotMaCil(String(operasi3));
    setTotMaSar(String(operasi4));
    setTotNonMa(String(operasi5));
    setTotDircost(String(operasi6));
    setTotDebit(String(operasi7));
  }, [BkkData]); // tambahkan dependency jika `data` berasal dari state
  // Detail Bkk Jasa

  // Gunakan useEffect ini untuk memunculkan dialog print setelah data dimuat
  useEffect(() => {
    // Pastikan data sudah ada dan tidak dalam proses loading
    if (namaPekerjaan && !loading) {
      window.print();
    }
  }, [namaPekerjaan, loading]);

  return (
    <section className="flex flex-col items-center gap-y-10">
      <div className="border-b-2 border-black/55">
        <Image src={"/assets/kop.png"} alt="kop" width={700} height={500} />
      </div>
      <h1 className="text-3xl font-bold">DETAIL PROYEK JASA</h1>
      <div className="w-full flex flex-col gap-y-8">
        <div className="self-start w-[600px] flex flex-col gap-y-3">
          <span className="flex justify-between w-full">
            <h1>Nama Pekerjaan</h1>
            <div className="w-[400px]">
              <p>: {namaPekerjaan}</p>
            </div>
          </span>
          <span className="flex justify-between w-full">
            <h1>Instansi</h1>
            <div className="w-[400px]">
              <p>: {Instansi}</p>
            </div>
          </span>
          <span className="flex justify-between w-full">
            <h1>Sub Kegiatan</h1>
            <div className="w-[400px]">
              <p>: {SubKegiatan}</p>
            </div>
          </span>
          <span className="flex justify-between w-full">
            <h1>Tahun Anggaran</h1>
            <div className="w-[400px]">
              <p>: {Tahun_anggaran}</p>
            </div>
          </span>
          <span className="flex justify-between w-full">
            <h1>Nilai Pekerjaan</h1>
            <div className="w-[400px]">
              <p>: {NilaiPekerjaan}</p>
            </div>
          </span>
        </div>
        <div className="px-1 rounded-lg">
          <h1>DATA DETAIL PEKERJAAN</h1>
          <table className="w-full text-center bg-white text-black">
            <thead>
              <tr className="shadow-xl/15">
                <th className="pb-2 whitespace-pre-wrap ">No</th>
                <th className="pb-2 whitespace-pre-wrap ">Tanggal</th>
                <th className="pb-2 whitespace-pre-wrap ">Uraian</th>
                <th className="pb-2 whitespace-pre-wrap ">Kb Kas</th>
                <th className="pb-2 whitespace-pre-wrap ">Upah</th>
                <th className="pb-2 whitespace-pre-wrap ">
                  Material <br /> Kas Kecil
                </th>
                <th className="pb-2 whitespace-pre-wrap ">
                  Material <br /> Kas Besar
                </th>
                <th className="pb-2 whitespace-pre-wrap ">
                  Non <br /> Material
                </th>
                <th className="pb-2 whitespace-pre-wrap ">Dircost</th>
                <th className="pb-2 whitespace-pre-wrap ">Jumlah</th>
                <th className="pb-2 whitespace-pre-wrap ">
                  Grand <br />
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              {dataWithGrandTotal.map((row, index) => (
                <tr key={row.id} className="border-b-1 border-gray-400">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">{row.tanggal}</td>
                  <td className="py-2">{row.uraian}</td>
                  <td className="py-2">Rp.{FormatNumber(row.kb_kas)}</td>
                  <td className="py-2">Rp.{FormatNumber(row.upah)}</td>
                  <td className="py-2">
                    Rp.{FormatNumber(row.material_kaskecil)}
                  </td>
                  <td className="py-2">
                    Rp.{FormatNumber(row.material_kasbesar)}
                  </td>
                  <td className="py-2">Rp.{FormatNumber(row.non_material)}</td>
                  <td className="py-2">Rp.{FormatNumber(row.dircost)}</td>
                  <td className="py-2">Rp.{FormatNumber(row.debit)}</td>
                  <td className="py-2">Rp.{FormatNumber(row.grandTotal)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={2} className={clsx("py-2 text-right font-bold")}>
                  Total
                </td>
                <td className="py-2 text-right">:</td>
                <td className="py-2">Rp.{FormatNumber(Number(TotKbKas))}</td>
                <td className="py-2">Rp.{FormatNumber(Number(TotUpah))}</td>
                <td className="py-2">Rp.{FormatNumber(Number(TotMaCil))}</td>
                <td className="py-2">Rp.{FormatNumber(Number(TotMaSar))}</td>
                <td className="py-2">Rp.{FormatNumber(Number(TotNonMa))}</td>
                <td className="py-2">Rp.{FormatNumber(Number(TotDircost))}</td>
                <td className="py-2">Rp.{FormatNumber(Number(TotDebit))}</td>
                <td className="py-2">Rp.{FormatNumber(Number(GrandTot))}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
