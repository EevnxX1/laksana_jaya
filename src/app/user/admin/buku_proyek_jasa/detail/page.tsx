"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { InputTblDetail } from "@/app/component/input_tbl_detail";
import { Table } from "@/app/component/table";
import { LinkImage } from "@/app/component/link_image";
import TabelBukuProyekDetail from "@/app/ui/admin/buku_proyek_jasa/detail/tbl_bp_detail";
import Link from "next/link";
import { toast } from "react-toastify";
import { FormatNumber } from "@/app/component/format_number";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

interface detailDataBukuProyek {
  id: number;
  nama_pekerjaan: string;
  instansi: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  nilai_pekerjaan: string;
}

export default function page() {
  return <TabelBukuProyekDetail></TabelBukuProyekDetail>;
}

export function JudulPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  const [data, setData] = useState<detailDataBukuProyek[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bp_jasa/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

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
export function InputTabelProyekDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  console.log(id);
  const [data, setData] = useState<detailDataBukuProyek[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bp_jasa/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

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
  kb_kas: string;
  upah: string;
  material_kaskecil: string;
  material_kasbesar: string;
  non_material: string;
  dircost: string;
  debit: string;
  grand_total: string;
}

export function TabelProyekDetail2() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  const [data, setData] = useState<TabelBarangNilaiBelanja[]>([]);
  const [Total, setTotal] = useState("");
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/detail_jasa/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let operasi = 0;
    for (let index = 0; index < data.length; index++) {
      operasi += Number(data[index].debit); // pastikan dikonversi ke number
    }
    setTotal(String(operasi));
    console.log(operasi);
  }, [data]);

  const dataTh = [
    "No",
    "Tanggal",
    "Uraian",
    "Kb Kas",
    "Material\nKas Kecil",
    "Material\nKas Besar",
    "Non\nMaterial",
    "Dircost",
    "Jumlah",
    "Grand\nTotal",
  ];

  // Hitung grand_total secara berurutan
  const dataWithGrandTotal = data.reduce((acc: any[], current, index) => {
    const debit = Number(current.debit) || 0;
    const prevGrandTotal = index > 0 ? acc[index - 1].grand_total : 0;
    const grandTotal = prevGrandTotal + debit;

    acc.push({
      ...current,
      grandTotal, // tambahkan field baru
    });

    return acc;
  }, []);

  const dataTd = dataWithGrandTotal.map((row, index) => [
    index + 1,
    row.tanggal,
    row.uraian,
    "Rp." + FormatNumber(row.kb_kas),
    "Rp." + FormatNumber(row.material_kaskecil),
    "Rp." + FormatNumber(row.material_kasbesar),
    "Rp." + FormatNumber(row.non_material),
    "Rp." + FormatNumber(row.dircost),
    "Rp." + FormatNumber(row.debit),
    "Rp." + FormatNumber(row.grandTotal),
  ]);

  return (
    <Table
      dataTd={dataTd}
      dataTh={dataTh}
      source="total"
      fieldNameRow="Total Jumlah"
      classTotal="pr-20 min-[1450px]:pr-[110px] min-[1700px]:pr-[130px]"
      dataTotal={"Rp." + FormatNumber(Number(Total))}
    ></Table>
  );
}

interface TabelBarangNotaBelanja {
  id: number;
  uraian: string;
  nota: string;
}

export function LinkImageProyekDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  const [data, setData] = useState<TabelBarangNotaBelanja[]>([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/detail_jasa/${id}`) // endpoint dari Laravel
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

export function LinkUbahDataProyek() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
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
