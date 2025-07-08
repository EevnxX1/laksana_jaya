import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface TabelUi {
    children: React.ReactNode;
}

export default function TabelBukuKasBesar({children}:TabelUi) {
    return(
        <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8">
        <div className="text-white mb-5">
            <h1 className="font-bold text-2xl mb-3">Buku Kas Besar</h1>
            <div className="flex justify-between">
                <form action="" className="flex space-x-5">
                    <div className="flex flex-col">
                        <label className="mb-[2px]">Pilih Tanggal Mulai:</label>
                        <input type="date" name="" id="" className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="mb-[2px]">Pilih Tanggal Selesai:</label>
                        <input type="date" name="" id="" className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"/>
                    </div>
                    <button type="submit" className="flex cursor-pointer self-end px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium"><span className="mr-1">Cari</span> <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4"/></button>
                </form>
                <a href="" className="h-fit self-end"><button className="flex cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium"><FontAwesomeIcon icon={faPrint} className="w-5"/><span className="ml-1">Cetak Transkip</span></button></a>
            </div>
        </div>
        <div>
            <h1 className="font-bold text-xl mb-3 text-white">Data Transaksi</h1>
            {children}
        </div>
        <div className="mt-5">
            <Link
            href={'/user/direktur/buku_kas_besar/tambah_data'}
            >
                <button className="flex cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium"><FontAwesomeIcon icon={faPlus} className="w-5"/><span className="ml-1">Tambah Transaksi</span></button>
            </Link>
        </div>
    </section>
    );
}