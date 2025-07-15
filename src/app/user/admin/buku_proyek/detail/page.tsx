"use client";
import { useState } from "react";
import { InputTblDetail } from "@/app/component/input_tbl_detail";
import { TableDetail } from "@/app/component/table_detail";
import { Table } from "@/app/component/table";
import { LinkImage } from "@/app/component/link_image";
import TabelBukuProyekDetail from "@/app/ui/admin/buku_proyek/detail/tbl_bp_detail";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";

export default function page() {
  return <TabelBukuProyekDetail></TabelBukuProyekDetail>;
}

// INPUT
export function InputTabelProyekDetail() {
  const [namaPekerjaan, setNamaPekerjaan] = useState(
    "Pekerjaan AC DKUKMPP Kota Cirebon"
  );
  const [Instansi, setInstansi] = useState(
    "Dinas Koperasi, Usaha Kecil, Menengah, Perdagangan, dan Perindustrian .."
  );
  const [SubKegiatan, setSubKegiatan] = useState(
    "Pengembangan Kapasitas Kelembagaan Petani di Kecamatan dan Desa"
  );
  const [MulaiPelaksanaan, setMulaiPelaksanaan] = useState("1 Januari 2025");
  const [SelesaiPelaksanaan, setSelesaiPelaksanaan] =
    useState("14 Januari 2025");
  const [NilaiPekerjaan, setNilaiPekerjaan] = useState("Rp. 159.736.234");
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
        value={MulaiPelaksanaan}
        onChange={(e) => setMulaiPelaksanaan(e.target.value)}
      >
        Mulai Pelaksanaan
      </InputTblDetail>
      <InputTblDetail
        value={SelesaiPelaksanaan}
        onChange={(e) => setSelesaiPelaksanaan(e.target.value)}
      >
        Selesai Pelaksanaan
      </InputTblDetail>
      <InputTblDetail
        value={NilaiPekerjaan}
        onChange={(e) => setNilaiPekerjaan(e.target.value)}
      >
        Nilai Pekerjaan
      </InputTblDetail>
    </form>
  );
}

export function TabelProyekDetail1() {
  const dataTh = [
    "No",
    "Nama Barang",
    "Spesifikasi",
    "Vol",
    "Satuan",
    "Harga Satuan",
    "Harga Total",
    "Action",
  ];
  const dataTd = [
    [
      "1",
      "PC All in One",
      "Intel core i5 Gen 7/ DDR4 8GB/ 512GB SSD/ LCD 23.8'/Wifi, Bluethooth, Lan, HDMI, Camera, Audio, USB/Win 10 Home Garansi 1/1/0 TKDN 26,63 (AITZXP)",
      "2",
      "Unit",
      "Rp. 12.668.250",
      "Rp. 101.346.000",
      <div className="flex justify-center">
        <Link href={"buku_proyek/detail"} className={"text-green-800"}>
          <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
        </Link>
        <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
        <Link href={""} className={"text-red-800"}>
          <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
        </Link>
      </div>,
    ],
    [
      "2",
      "PC All in One",
      "Intel core i5 Gen 7/ DDR4 8GB/ 512GB SSD/ LCD 23.8'/Wifi, Bluethooth, Lan, HDMI, Camera, Audio, USB/Win 10 Home Garansi 1/1/0 TKDN 26,63 (AITZXP)",
      "2",
      "Unit",
      "Rp. 12.668.250",
      "Rp. 101.346.000",
      <div className="flex justify-center">
        <Link href={"buku_proyek/detail"} className={"text-green-800"}>
          <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
        </Link>
        <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
        <Link href={""} className={"text-red-800"}>
          <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
        </Link>
      </div>,
    ],
  ];
  return (
    <TableDetail
      dataRows="5.2.02.10.01.0002 Belanja Modal Personal Computer"
      dataTd={dataTd}
      dataTh={dataTh}
      classThTd="px-6 text-justify"
    />
  );
}

export function TabelProyekDetail2() {
  const dataTh = [
    "No",
    "Nama Barang",
    "Vol",
    "Satuan",
    "Harga Satuan",
    "Harga Total",
    "Action",
  ];
  const dataTd = [
    [
      "1",
      "PC All in One",
      "2",
      "Unit",
      "Rp. 10.668.250",
      "Rp. 80.346.000",
      <div className="flex justify-center">
        <Link href={"buku_proyek/detail"} className={"text-green-800"}>
          <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
        </Link>
        <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
        <Link href={""} className={"text-red-800"}>
          <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
        </Link>
      </div>,
    ],
    [
      "2",
      "Laptop",
      "4",
      "Unit",
      "Rp. 11.516.500",
      "Rp. 49.066.000",
      <div className="flex justify-center">
        <Link href={"buku_proyek/detail"} className={"text-green-800"}>
          <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
        </Link>
        <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
        <Link href={""} className={"text-red-800"}>
          <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
        </Link>
      </div>,
    ],
  ];
  return <Table dataTd={dataTd} dataTh={dataTh}></Table>;
}

export function LinkImageProyekDetail() {
  return (
    <>
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle1.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle2.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle3.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle3.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle3.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle3.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle3.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle3.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle3.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle3.png" />
      <LinkImage href="" srcImage="/asset_bukti-pengiriman/Rectangle3.png" />
    </>
  );
}
