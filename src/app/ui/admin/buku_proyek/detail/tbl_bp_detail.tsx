import {
  InputTabelProyekDetail,
  TabelProyekDetail1,
  TabelProyekDetail2,
  LinkImageProyekDetail,
  LinkAddRekening,
  LinkUbahDataProyek,
  JudulPage,
} from "@/app/user/admin/buku_proyek/detail/page";
import Link from "next/link";

export default function TabelBukuProyekDetail() {
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8">
      <h1 className="text-2xl font-semibold mb-5">
        <JudulPage />
      </h1>
      <span className="border border-[#D4D4D4] w-full block mb-5"></span>
      <InputTabelProyekDetail></InputTabelProyekDetail>
      <div className="w-full flex justify-end mt-5">
        <LinkUbahDataProyek />
      </div>
      <div className="mt-10 flex flex-col gap-y-5 mb-10">
        <h1 className="text-2xl font-semibold">TABLE PEKERJAAN - NILAI PAGU</h1>
        <div className="flex">
          <LinkAddRekening />
        </div>
        <TabelProyekDetail1></TabelProyekDetail1>
      </div>
      <span className="border border-[#D4D4D4] w-full block mb-10"></span>
      <div className="flex flex-col gap-y-5 mb-10">
        <h1 className="text-2xl font-semibold">
          TABLE PEKERJAAN - NILAI BELANJA
        </h1>
        <TabelProyekDetail2 />
      </div>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-semibold">
          UPLOAD NOTA / BUKTI PENGIRIMAN
        </h1>
        <div className="flex flex-wrap gap-y-5 gap-x-5">
          <LinkImageProyekDetail />
        </div>
      </div>
    </section>
  );
}
