import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPrint, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

interface TabelUi {
  children: React.ReactNode;
}

export default function TabelUser({ children }: TabelUi) {
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8">
      <div className="text-white mb-5">
        <h1 className="font-bold text-2xl mb-3">DATA USER</h1>
        <div className="flex justify-between">
          <form action="" className="flex space-x-3">
            <div className="flex flex-col">
              {/* <label className="mb-[2px]">Pilih Tanggal Mulai:</label> */}
              <input
                type="text"
                name=""
                placeholder="Cari Judul"
                className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
              />
            </div>
            <button
              type="submit"
              className="flex items-center cursor-pointer self-end px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium"
            >
              <span className="mr-1">Cari</span>{" "}
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />
            </button>
          </form>
          <Link
            href="/user/teknisi/data_user/tambah_data"
            className="h-fit self-end"
          >
            <button className="flex items-center cursor-pointer px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium">
              <FontAwesomeIcon icon={faUserPlus} className="w-5" />
              <span className="ml-1">Tambah User</span>
            </button>
          </Link>
        </div>
      </div>
      <div>{children}</div>
    </section>
  );
}
