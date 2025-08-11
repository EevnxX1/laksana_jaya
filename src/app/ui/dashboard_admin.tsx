import React from "react";
import {
  Chart1,
  Chart2,
  Chart3,
  Chart4,
  Chart5,
  Saldo,
} from "../user/admin/page";

export default function DashboardTemplate() {
  return (
    <section className="rounded-lg w-[91vw] h-fit p-5 bg-white/15 mx-auto relative">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="flex border-b-2 border-white/25">
        <div className="flex flex-col gap-y-6 pb-5 px-5 border-r-2 border-white/25 w-[60%]">
          <div>
            <h2 className="font-semibold">Saldo Utama</h2>
            <p className="text-4xl font-bold">
              <Saldo />
            </p>
          </div>
          <div>
            <h3 className="font-bold">Arus Kas Harian</h3>
            <div>
              <Chart1 />
            </div>
          </div>
        </div>
        <div className="pb-5 px-5 w-[40%] flex flex-col justify-between">
          <h3 className="font-bold">Detail Pengeluaran Proyek</h3>
          <div className="flex justify-center">
            <Chart2 />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="w-[32%] pt-5 flex flex-col gap-y-5 px-5 border-r-2 border-white/25">
          <h3 className="font-bold">Detail Pengeluaran Instansi</h3>
          <div>
            <Chart3 />
          </div>
        </div>
        <div className="w-[34%] pt-5 flex flex-col gap-y-5 px-4 border-r-2 border-white/25">
          <h3 className="font-bold">Barang Yang Dibeli</h3>
          <div className="w-full">
            <Chart4 />
          </div>
        </div>
        <div className="w-[34%] pt-5 flex flex-col gap-y-5 px-4">
          <h3 className="font-bold">Jasa Yang Digunakan</h3>
          <div className="w-full">
            <Chart5 />
          </div>
        </div>
      </div>
    </section>
  );
}
