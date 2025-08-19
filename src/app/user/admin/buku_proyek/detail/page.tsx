"use client";
import { useState, useEffect } from "react";
import {
  JudulPage,
  InputTabelProyekDetail,
  TabelProyekDetail1,
  TabelProyekDetail2,
  LinkImageProyekDetail,
  LinkAddRekening,
  LinkUbahDataProyek,
  LinkCetakData,
} from "@/app/component/detail_barang";

export default function Page() {
  const [id, setId] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cekId = params.get("id_bp");
    if (cekId) setId(cekId);
  }, [id]);

  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8">
      <h1 className="text-2xl font-semibold mb-5">
        <JudulPage id={String(id)} />
      </h1>
      <span className="border border-[#D4D4D4] w-full block mb-5"></span>
      <InputTabelProyekDetail id={String(id)} />
      <div className="w-full flex justify-end mt-5 gap-x-4">
        <LinkCetakData id={String(id)} />
        <LinkUbahDataProyek id={String(id)} />
      </div>
      <div className="mt-10 flex flex-col gap-y-5 mb-10">
        <h1 className="text-2xl font-semibold">TABEL PEKERJAAN - NILAI PAGU</h1>
        <div className="flex">
          <LinkAddRekening id={String(id)} />
        </div>
        <TabelProyekDetail1 id={String(id)} />
      </div>
      <span className="border border-[#D4D4D4] w-full block mb-10"></span>
      <div className="flex flex-col gap-y-5 mb-10">
        <h1 className="text-2xl font-semibold">
          TABEL PEKERJAAN - NILAI BELANJA
        </h1>
        <TabelProyekDetail2 id={String(id)} />
      </div>
      <div className="flex flex-col gap-y-5">
        <h1 className="text-2xl font-semibold">
          UPLOAD NOTA / BUKTI PENGIRIMAN
        </h1>
        <div className="flex flex-wrap gap-y-5 gap-x-5">
          <LinkImageProyekDetail id={String(id)} />
        </div>
      </div>
    </section>
  );
}
