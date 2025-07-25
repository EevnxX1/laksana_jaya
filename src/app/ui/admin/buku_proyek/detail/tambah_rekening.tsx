interface UiFormTambaRekening
  extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export default function TambahRekening({
  children,
  ...rest
}: UiFormTambaRekening) {
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8">
      <h1 className="text-2xl font-semibold mb-5">Masukkan Nomer Rekening</h1>
      <form {...rest} className="flex flex-col items-end gap-y-10">
        <div className="flex flex-wrap justify-between text-white w-full">
          {children}
        </div>
        <div className="w-[86%] min-[980px]:w-[84%] min-[1300px]:w-[88%] min-[1515px]:w-[90%] ml-[120px] border border-white"></div>
        <button
          type="submit"
          className="ml-[120px] self-start cursor-pointer w-[200px] h-[45px] bg-[#9EFF66] rounded-lg text-gray-700 font-semibold"
        >
          <i className="fa-solid fa-folder-plus"></i>
          <span className="ml-1">+ Tambah Rekening</span>
        </button>
      </form>
    </section>
  );
}
