import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

interface TabelUi {
  children: React.ReactNode;
}

export default function TabelBukuKasBesar({ children }: TabelUi) {
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8">
      <div>{children}</div>
      <div className="flex gap-x-5 mt-5">
        <Link
          href="/user/direktur/buku_kas_besar/uang_masuk"
          className="h-fit self-end"
        >
          <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
            <FontAwesomeIcon icon={faPrint} className="w-5" />
            <span className="ml-1">Tambah Transaksi</span>
          </button>
        </Link>
      </div>
    </section>
  );
}
