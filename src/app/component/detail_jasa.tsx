"use client";
import { useState, useEffect } from "react";
import { FormatNumber } from "./format_number";
import { InputTblDetail } from "@/app/component/input_tbl_detail";
import clsx from "clsx";
import { LinkImage } from "@/app/component/link_image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

interface detailDataBukuProyek {
  id: number;
  nama_pekerjaan: string;
  instansi: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  nilai_pekerjaan: string;
}

export function JudulPage({ id }: { id: string }) {
  const [data, setData] = useState<detailDataBukuProyek[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const proyek = data[0];
    if (proyek) {
      setNamaPekerjaan(proyek.nama_pekerjaan);
    }
  }, [data]);

  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  return <>{namaPekerjaan}</>;
}

// INPUT
export function InputTabelProyekDetail({ id }: { id: string }) {
  const [data, setData] = useState<detailDataBukuProyek[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const proyek = data[0];
    if (proyek) {
      setNamaPekerjaan(proyek.nama_pekerjaan);
      setInstansi(proyek.instansi);
      setSubKegiatan(proyek.sub_kegiatan);
      setTahun_anggaran(proyek.tahun_anggaran);
      setNilaiPekerjaan(
        String("Rp. " + FormatNumber(Number(proyek.nilai_pekerjaan)))
      );
    }
  }, [data]);

  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [SubKegiatan, setSubKegiatan] = useState("");
  const [Tahun_anggaran, setTahun_anggaran] = useState("");
  const [NilaiPekerjaan, setNilaiPekerjaan] = useState("");
  return (
    <form action="" className="flex flex-col gap-y-2">
      <InputTblDetail
        value={namaPekerjaan}
        onChange={(e) => setNamaPekerjaan(e.target.value)}
      >
        Nama Pekerjaan
      </InputTblDetail>
      <InputTblDetail
        value={Instansi}
        onChange={(e) => setInstansi(e.target.value)}
      >
        Instansi
      </InputTblDetail>
      <InputTblDetail
        value={SubKegiatan}
        onChange={(e) => setSubKegiatan(e.target.value)}
      >
        Sub Kegiatan
      </InputTblDetail>
      <InputTblDetail
        value={Tahun_anggaran}
        onChange={(e) => setTahun_anggaran(e.target.value)}
      >
        Tahun Anggaran
      </InputTblDetail>
      <InputTblDetail
        value={NilaiPekerjaan}
        onChange={(e) => setNilaiPekerjaan(e.target.value)}
        readOnly
      >
        Nilai Pekerjaan
      </InputTblDetail>
    </form>
  );
}

interface TabelBarangNilaiBelanja {
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

interface TbnbWithGrandTotal extends TabelBarangNilaiBelanja {
  grandTotal: number;
}

export function TabelProyekDetail2({ id }: { id: string }) {
  const [data, setData] = useState<TabelBarangNilaiBelanja[]>([]);
  const [TotKbKas, setTotKbKas] = useState("");
  const [TotUpah, setTotUpah] = useState("");
  const [TotMaCil, setTotMaCil] = useState("");
  const [TotMaSar, setTotMaSar] = useState("");
  const [TotNonMa, setTotNonMa] = useState("");
  const [TotDircost, setTotDircost] = useState("");
  const [TotDebit, setTotDebit] = useState("");
  const [GrandTot, setGrandTot] = useState("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/detail_jasa/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  // Hitung grand_total secara berurutan
  const dataWithGrandTotal = data.reduce<TbnbWithGrandTotal[]>(
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
    for (let index = 0; index < data.length; index++) {
      operasi1 += Number(data[index].kb_kas); // pastikan dikonversi ke number
      operasi2 += Number(data[index].upah); // pastikan dikonversi ke number
      operasi3 += Number(data[index].material_kaskecil); // pastikan dikonversi ke number
      operasi4 += Number(data[index].material_kasbesar); // pastikan dikonversi ke number
      operasi5 += Number(data[index].non_material); // pastikan dikonversi ke number
      operasi6 += Number(data[index].dircost); // pastikan dikonversi ke number
      operasi7 += Number(data[index].debit); // pastikan dikonversi ke number
    }
    setTotKbKas(String(operasi1));
    setTotUpah(String(operasi2));
    setTotMaCil(String(operasi3));
    setTotMaSar(String(operasi4));
    setTotNonMa(String(operasi5));
    setTotDircost(String(operasi6));
    setTotDebit(String(operasi7));
  }, [data]); // tambahkan dependency jika `data` berasal dari state

  return (
    <div className="bg-white p-2">
      <table className="w-full text-center bg-white text-black">
        <thead>
          <tr className="shadow-xl">
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
              <td className="py-2">Rp.{FormatNumber(row.material_kaskecil)}</td>
              <td className="py-2">Rp.{FormatNumber(row.material_kasbesar)}</td>
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
    // <Table
    //   dataTd={dataTd}
    //   dataTh={dataTh}
    //   source="total"
    //   fieldNameRow="Total Jumlah"
    //   classTotal="pr-20 min-[1450px]:pr-[110px] min-[1700px]:pr-[130px]"
    //   dataTotal={"Rp." + FormatNumber(Number(Total))}
    // ></Table>
  );
}

interface TabelBarangNotaBelanja {
  id: number;
  uraian: string;
  nota: string;
}

export function LinkImageProyekDetail({ id }: { id: string }) {
  const [data, setData] = useState<TabelBarangNotaBelanja[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/detail_jasa/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);
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

export function LinkUbahDataProyek({ id }: { id: string }) {
  return (
    <Link
      href={`ubah_data?id_bpj=${id}`}
      className="flex items-center px-5 py-2 rounded-lg gap-x-2 bg-[#F0FF66] text-black self-end w-fit"
    >
      <FontAwesomeIcon icon={faPen} className="w-4" />
      <p className="font-semibold">Edit Data Proyek</p>
    </Link>
  );
}
