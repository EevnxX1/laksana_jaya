"use client";
import TabelBukuKasKecil from "@/app/ui/admin/buku_kas_kecil/tbl_bkk";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function page() {
  const dataTh = [
    "",
    "No",
    "Tanggal",
    "Uraian",
    "Instansi",
    "Pekerjaan",
    "Debit",
    "Kredit",
    "Saldo",
    "Action",
  ];

  const dataTd = [
    [
      <div className="flex justify-center px-2">
        <input type="checkbox" className="w-4 h-4" />
      </div>,
      "1",
      "01/06/2025",
      "Fotocopy Dokumen Disnaker",
      "Disnaker",
      "Mebel",
      "",
      "Rp. 15.000.000",
      "Rp. 15.000.000",
      <div className="flex justify-center">
        <Link href={""} className={"text-green-800"}>
          <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
        </Link>
        <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
        <Link href={""} className={"text-red-800"}>
          <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
        </Link>
      </div>,
    ],
    [
      <div className="flex justify-center px-2">
        <input type="checkbox" className="w-4 h-4" />
      </div>,
      "1",
      "01/06/2025",
      "Fotocopy Dokumen Disnaker",
      "Disnaker",
      "Mebel",
      "",
      "Rp. 15.000.000",
      "Rp. 15.000.000",
      <div className="flex justify-center">
        <Link href={""} className={"text-green-800"}>
          <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
        </Link>
        <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
        <Link href={""} className={"text-red-800"}>
          <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
        </Link>
      </div>,
    ],
    [
      <div className="flex justify-center px-2">
        <input type="checkbox" className="w-4 h-4" />
      </div>,
      "1",
      "01/06/2025",
      "Fotocopy Dokumen Disnaker",
      "Disnaker",
      "Mebel",
      "",
      "Rp. 15.000.000",
      "Rp. 15.000.000",
      <div className="flex justify-center">
        <Link href={""} className={"text-green-800"}>
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
    <TabelBukuKasKecil>
      <Table dataTh={dataTh} dataTd={dataTd} />
    </TabelBukuKasKecil>
  );
}
