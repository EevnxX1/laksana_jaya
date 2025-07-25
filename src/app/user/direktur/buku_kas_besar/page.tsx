"use client";
import { useEffect, useState } from "react";
import TabelBukuKasBesar from "@/app/ui/direktur/tbl_bkb";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface BukuKasBesar {
  id: number;
  tanggal: string;
  uraian: string;
  debit: string;
  kredit: string;
  saldo: string;
}

export default function page() {
  const [data, setData] = useState<BukuKasBesar[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  const dataTh = [
    "No",
    "Tanggal",
    "Uraian",
    "Debit",
    "Kredit",
    "Saldo",
    "Action",
  ];

  const dataTd = data.map((row, index) => [
    index + 1,
    row.tanggal,
    row.uraian,
    row.debit,
    row.kredit,
    row.saldo,
    <div className="flex justify-center">
      <Link href={""} className={"text-green-800"}>
        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
      </Link>
      <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
      <Link href={""} className={"text-red-800"}>
        <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
      </Link>
    </div>,
  ]);
  //     const dataTd = [
  //         [
  //             "1",
  //             "12/4/2025",
  //             "Tf buku kas kecil",
  //             "-",
  //             "Rp.158.000.000",
  //             "Rp.556.140.000",
  //             <div className="flex">
  //                  <Link
  //                 href={''}
  //                 className={'text-green-800'}
  //                 >
  //                     <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
  //                 </Link>
  //                 <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
  //                 <Link
  //                 href={''}
  //                 className={'text-red-800'}
  //                 >
  //                     <FontAwesomeIcon icon={faCircleXmark} className="w-5"/>
  //                 </Link>
  //             </div>
  //         ],
  //   ]
  return (
    <TabelBukuKasBesar>
      <Table source="info" dataTh={dataTh} dataTd={dataTd} />
    </TabelBukuKasBesar>
  );
}
