import React from "react";
import { Chart1, Chart2 } from "../user/teknisi/page";

export default function DashboardTemplate() {
  return (
    <section className="rounded-lg w-[91vw] h-fit p-5 bg-white/15 mx-auto relative">
      <h1 className="text-2xl font-bold mb-10">Dashboard</h1>
      <div className="flex">
        <div className="flex flex-col gap-y-10 pb-5 px-5 border-r-2 border-white/25 w-[50%]">
          <h3 className="font-bold text-2xl">Jumlah User Per Role</h3>
          <div className="flex justify-center">
            <Chart1 />
          </div>
        </div>
        <div className="pb-5 pl-5 w-[50%] flex flex-col justify-end gap-y-10">
          <h3 className="font-bold text-2xl">Jumlah Proyek Per Instansi</h3>
          <div className="flex justify-center w-full">
            <Chart2 />
          </div>
        </div>
      </div>
    </section>
  );
}
