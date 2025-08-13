"use client";
import { useSearchParams } from "next/navigation";
import {
  JudulPage,
  InputTabelProyekDetail,
  TabelProyekDetail2,
  LinkImageProyekDetail,
  LinkUbahDataProyek,
} from "@/app/component/detail_jasa";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8">
      <h1 className="text-2xl font-semibold mb-5">
        <JudulPage id={Number(id)} />
      </h1>
      <span className="border border-[#D4D4D4] w-full block mb-5"></span>
      <InputTabelProyekDetail id={Number(id)} />
      <div className="w-full flex justify-end mt-5">
        <LinkUbahDataProyek id={Number(id)} />
      </div>
      <div className="flex flex-col gap-y-5 mb-10 mt-20">
        <h1 className="text-2xl font-semibold">DATA DETAIL PEKERJAAN</h1>
        <TabelProyekDetail2 id={Number(id)} />
      </div>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-semibold">
          UPLOAD NOTA / BUKTI PENGIRIMAN
        </h1>
        <div className="flex flex-wrap gap-y-5 gap-x-5">
          <LinkImageProyekDetail id={Number(id)} />
        </div>
      </div>
    </section>
  );
}
