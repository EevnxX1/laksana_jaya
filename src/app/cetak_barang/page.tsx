// src/app/user/admin/buku_kas_kecil/cetak/page.tsx
"use client";
import { useState, useEffect } from "react";
import { FormatNumber } from "@/app/component/format_number";
import Image from "next/image";
import { Table } from "../component/table";

interface BpBarang {
  id: number;
  tanggal: string;
  post: string;
  nomor_sp: string;
  tgl_sp: string;
  instansi: string;
  pekerjaan: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  mulai_pekerjaan: string;
  selesai_pekerjaan: string;
  label_pekerjaan: string;
  nilai_pekerjaan: number;
}

interface BarangDpa {
  id: number;
  id_bpbarang: number;
  id_kdrekening: number;
  nama_barang: string;
  spesifikasi: string;
  vol: string;
  satuan: string;
  harga_satuan: number;
  harga_total: number;
}

interface kdrekening {
  id: number;
  id_bpbarang: number;
  no_rekening: string;
  ket: string;
}

interface Bkk {
  id: number;
  id_bpbarang: number;
  tanggal: string;
  uraian: string;
  harga_satuan: number;
  volume: string;
  satuan: string;
  instansi: string;
  pekerjaan: string;
  kredit: string;
  debit: string;
  identity: string;
  identity_uk: string;
  nota: string;
}

export default function PrintPage() {
  const [BkkData, setBkkData] = useState<Bkk[]>([]);
  const [BarangData, setBarangData] = useState<BpBarang[]>([]);
  const [RekeningData, setRekeningData] = useState<kdrekening[]>([]);
  const [BarangDpaData, setBarangDpaData] = useState<BarangDpa[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentId = params.get("id"); // ambil langsung

    const fetchDataAndPrint = async () => {
      setLoading(true);
      const apiUrlBarangDetail = `${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang/detail/${currentId}`;
      const apiUrlKdRekening = `${process.env.NEXT_PUBLIC_API_URL}/api/kdrekening/${currentId}`;
      const apiUrlBarangDpa = `${process.env.NEXT_PUBLIC_API_URL}/api/barangdpa/${currentId}`;
      const apiUrlBkk = `${process.env.NEXT_PUBLIC_API_URL}/api/bkk/detail_barang/${currentId}`;
      try {
        const response1 = await fetch(apiUrlBarangDetail);
        const response2 = await fetch(apiUrlKdRekening);
        const response3 = await fetch(apiUrlBarangDpa);
        const response4 = await fetch(apiUrlBkk);
        const data1 = await response1.json();
        const data2 = await response2.json();
        const data3 = await response3.json();
        const data4 = await response4.json();
        setBarangData(data1);
        setRekeningData(data2);
        setBarangDpaData(data3);
        setBkkData(data4);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }

    };

    fetchDataAndPrint();
  }, []); // Re-fetch jika parameter berubah

  console.log("Data Barang detail = ", BarangData);

  // Detail Barang
  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [SubKegiatan, setSubKegiatan] = useState("");
  const [MulaiPelaksanaan, setMulaiPelaksanaan] = useState("");
  const [SelesaiPelaksanaan, setSelesaiPelaksanaan] = useState("");
  const [NilaiPekerjaan, setNilaiPekerjaan] = useState("");
    const [Keuntungan, setKeuntungan] = useState("");

  
  useEffect(() => {
    const proyek = BarangData[0];
    if (proyek) {
      setNamaPekerjaan(proyek.pekerjaan);
      setInstansi(proyek.instansi);
      setSubKegiatan(proyek.sub_kegiatan);
      setMulaiPelaksanaan(proyek.mulai_pekerjaan);
      setSelesaiPelaksanaan(proyek.selesai_pekerjaan);
      setNilaiPekerjaan("Rp." + FormatNumber(Number(proyek.nilai_pekerjaan)));
    }
  }, [BarangData]);
  // Detail Barang


  // Rekening Dan Barang Dpa
  const [Total, setTotal] = useState("");

  useEffect(() => {
    let operasi = 0;
    for (let index = 0; index < BarangDpaData.length; index++) {
      operasi += Number(BarangDpaData[index].harga_total); // pastikan dikonversi ke number
    }
    setTotal(String(operasi));
    console.log(operasi);
  }, [BarangDpaData]);   
  // Rekening Dan Barang Dpa   

  // Data Barang Bkk
  const [TotalBkk, setTotalBkk] = useState("");

     useEffect(() => {
    let operasi = 0;
    for (let index = 0; index < BkkData.length; index++) {
      operasi += Number(BkkData[index].debit); // pastikan dikonversi ke number
    }
    setTotalBkk(FormatNumber(operasi));
    console.log(operasi);
  }, [BkkData]);
  // Data Barang Bkk   

  useEffect(() => {
    let operasi1 = 0;
    let operasi2 = 0;
    for (let index = 0; index < BarangDpaData.length; index++) {
      operasi1 += Number(BarangDpaData[index].harga_total); // pastikan dikonversi ke number
    }
    for (let index = 0; index < BkkData.length; index++) {
      operasi2 += Number(BkkData[index].debit); // pastikan dikonversi ke number
    }
    const totalNilai = operasi1 - operasi2;
    setKeuntungan(String("Rp." + FormatNumber(Number(totalNilai))));
  }, [BarangDpaData, BkkData]);

  // Gunakan useEffect ini untuk memunculkan dialog print setelah data dimuat
  useEffect(() => {
    // Pastikan data sudah ada dan tidak dalam proses loading
        if (namaPekerjaan && !loading) {
            window.print();
        }
  }, [namaPekerjaan, loading]);

  const dataTh = [
    "No",
    "Nama Barang",
    "Vol",
    "Satuan",
    "Harga Satuan",
    "Harga Total",
  ];

  const dataTd = BkkData.map((row, index) => [
    index + 1,
    row.uraian,
    row.volume,
    row.satuan,
    "Rp." + FormatNumber(Number(row.harga_satuan)),
    "Rp." + FormatNumber(Number(row.debit)),
  ]);

  return (
    <section className="flex flex-col items-center gap-y-10">
      <div className="border-b-2 border-black/55">
        <Image src={"/assets/kop.png"} alt="kop" width={700} height={500} />
      </div>
      <h1 className="text-3xl font-bold">DETAIL PROYEK BARANG</h1>
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
            <h1>Mulai Pelaksanaan</h1>
            <div className="w-[400px]">
            <p>: {MulaiPelaksanaan}</p>
            </div>
          </span>
          <span className="flex justify-between w-full">
            <h1>Selesai Pelaksanaan</h1>
            <div className="w-[400px]">
            <p>: {SelesaiPelaksanaan}</p>
            </div>
          </span>
          <span className="flex justify-between w-full">
            <h1>Nilai Pekerjaan</h1>
            <div className="w-[400px]">
            <p>: {NilaiPekerjaan}</p>
            </div>
          </span>
          <span className="flex justify-between w-full">
            <h1>Laba Rugi</h1>
            <div className="w-[400px]">
            <p>: {Keuntungan}</p>
            </div>
          </span>
        </div>
        <div className="border-1 border-gray-400 px-1 rounded-lg">
            <table className="w-full text-center bg-white text-black">
      <thead>
        <tr className="border-b-1 border-gray-400">
          <th className={"pb-2 py-2 w-[50px]"}>No</th>
          <th className={"pb-2 py-2"}>Nama Barang</th>
          <th className={"pb-2 py-2"}>Spesifikasi</th>
          <th className={"pb-2 py-2"}>Vol</th>
          <th className={"pb-2 py-2"}>Satuan</th>
          <th className={"pb-2 py-2"}>Harga Satuan</th>
          <th className={"pb-2 py-2"}>Harga Total</th>
        </tr>
      </thead>
      {RekeningData.map((kredit, ikredit) => (
        <tbody key={ikredit}>
          <tr className="border-b-1 border-gray-400">
            <th colSpan={7} className="text-start pl-1 py-2">
              <div className="flex gap-x-2">
                <span>{kredit.no_rekening}</span>
                <span>{kredit.ket}</span>
              </div>
            </th>
          </tr>
          {BarangDpaData.map((barang, ibarang) => [
            barang.id_kdrekening == kredit.id ? (
              <tr key={ibarang} className="border-b-1 border-gray-400">
                <td className={"py-4"}>{ibarang + 1}</td>
                <td className={"py-4"}>{barang.nama_barang}</td>
                <td className={"py-4"}>{barang.spesifikasi}</td>
                <td className={"py-4"}>{barang.vol}</td>
                <td className={"py-4"}>{barang.satuan}</td>
                <td className={"py-4"}>
                  Rp.{FormatNumber(Number(barang.harga_satuan))}
                </td>
                <td className={"py-4"}>
                  Rp.{FormatNumber(Number(barang.harga_total))}
                </td>
              </tr>
            ) : null,
          ])}
        </tbody>
      ))}
      <tfoot>
        <tr>
          <td colSpan={6} className={"py-2 text-right font-bold"}>
            Total Jumlah
          </td>
          <td className="py-2">Rp.{FormatNumber(Number(Total))}</td>
        </tr>
      </tfoot>
    </table>
        </div>
        <div className="border-1 border-gray-400 px-1 rounded-lg">
            <Table
                  dataTd={dataTd}
                  dataTh={dataTh}
                  source="total"
                  fieldNameRow="Total Jumlah"
                  classTotal=""
                  dataTotal={"Rp." + TotalBkk}
            ></Table>
        </div>
      </div>
    </section>
  );
}