import TabelBukuKasBesar from "@/app/ui/tbl_bkb";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function page() {
    const dataTh = 
        [
            'No',
            'Tanggal',
            'Kode Transaksi',
            'Keterangan',
            'Debit',
            'Credit',
            'Saldo',
            'Action',
        ]
        const dataTd = [
            [
                "1", 
                "12/4/2025", 
                "BKC-0112030025", 
                "Tf buku kas kecil", 
                "-", 
                "Rp.158.000.000", 
                "Rp.556.140.000",
                <div className="flex">
                     <Link
                    href={''}
                    className={'text-green-800'}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
                    </Link>
                    <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
                    <Link
                    href={''}
                    className={'text-red-800'}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} className="w-5"/>
                    </Link>
                </div>
            ],
            [
                "2", 
                "12/4/2025", 
                "BKC-0112030025", 
                "Tf buku kas Besar", 
                "-", 
                "Rp.158.000.000", 
                "Rp.556.140.000",
                <div className="flex">
                     <Link
                    href={''}
                    className={'text-green-800'}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} className="w-5" />
                    </Link>
                    <span className="border border-gray-500 mr-[6px] ml-[3px]"></span>
                    <Link
                    href={''}
                    className={'text-red-800'}
                    >
                        <FontAwesomeIcon icon={faCircleXmark} className="w-5"/>
                    </Link>
                </div>
            ]
      ]
    return(
        <TabelBukuKasBesar>
            <Table
            dataTh={dataTh}
            dataTd={dataTd}
            />
        </TabelBukuKasBesar>
    );
}