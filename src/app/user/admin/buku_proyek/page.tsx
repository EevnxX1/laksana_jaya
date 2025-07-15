"use client";
import TabelBukuProyek from "@/app/ui/admin/buku_proyek/tbl_bp";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function page() {
  const dataTh = ["", "No", "POST", "Nama Pekerjaan", "Instansi", "Action"];

  const dataTd = [
    [
      <div className="flex justify-center px-2">
        <input type="checkbox" className="w-4 h-4" />
      </div>,
      "1",
      "DISNAKER-01020425",
      "Pengadaan Mebel DISNAKER Kota Cirebon",
      "DISNAKER",
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
    <TabelBukuProyek>
      <Table dataTh={dataTh} dataTd={dataTd} />
    </TabelBukuProyek>
  );
}
