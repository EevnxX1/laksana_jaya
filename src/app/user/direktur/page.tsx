import { Saldo2, Chart6, Chart7 } from "@/app/component/dashboard";

export default function page() {
  return (
    <section className="rounded-lg w-[91vw] h-fit p-5 bg-white/15 mx-auto relative">
      <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
      <div className="flex flex-col gap-y-5">
        <div className="flex flex-col gap-y-10 pb-8 px-5 w-full border-b-2 border-b-white/25">
          <div>
            <h2 className="font-semibold">Saldo Utama Buku Kas Besar</h2>
            <p className="text-4xl font-bold">
              <Saldo2 />
            </p>
          </div>
          <div className="flex flex-col gap-y-5">
            <h3 className="font-bold text-2xl">Arus Kas Harian</h3>
            <div className="flex justify-center w-full">
              <Chart6 />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-5 pt-8">
          <h3 className="font-bold text-2xl">Detail Kas Besar Harian</h3>
          <div className="flex justify-center w-full">
            <Chart7 />
          </div>
        </div>
      </div>
    </section>
  );
}
