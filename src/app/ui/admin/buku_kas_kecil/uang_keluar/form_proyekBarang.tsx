interface FormBkb extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export default function FormBkkBarang({ children, ...rest }: FormBkb) {
  return (
    <section className="relative w-[91vw] h-[80vh] min-[1100px]:h-auto mx-auto rounded-xl bg-white/20 px-14 py-14 min-[1100px]:px-28">
      <h1 className="font-bold text-white text-2xl mb-10">Form Transaksi</h1>
      <form {...rest} className="flex flex-col items-end gap-y-8">
        <div className="flex flex-wrap justify-between text-white w-full">
          {children}
        </div>
        <div className="w-[86%] min-[980px]:w-[84%] min-[1300px]:w-[88%] min-[1515px]:w-[90%] ml-[120px] border border-white"></div>
        <button
          type="submit"
          className="ml-[120px] self-start cursor-pointer w-[200px] h-[45px] bg-[#9EFF66] rounded-lg text-gray-700 font-semibold"
        >
          <i className="fa-solid fa-folder-plus"></i>
          <span className="ml-1">Simpan Transaksi</span>
        </button>
      </form>
    </section>
  );
}
