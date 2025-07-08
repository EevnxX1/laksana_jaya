export default function FormBKB() {
    return(
        <section className="relative w-[91vw] h-[80vh] min-[1100px]:h-auto mx-auto rounded-xl bg-white/20 px-14 py-14 min-[1100px]:px-28">
        <h1 className="font-bold text-white text-2xl mb-6">Form Transaksi</h1>
        <form action="" className="flex flex-col items-end gap-y-10">
            <div className="flex flex-wrap justify-between space-y-5 text-white w-full">
            <div className="flex items-center space-y-1 space-x-16">
                <label className="">Tanggal</label>
                <input type="date" name="tgl_transaksi" id="tanggal" className="bg-white/15 w-[250px] min-[1700px]:w-[500px] min-[1400px]:w-[370px] min-[1440px]:w-[350px] px-4 py-[6px] min-[1400px]:h-[45px] min-[1150px]:h-[40px] rounded-lg"/>
            </div>
            <div className="flex items-center space-y-1 space-x-10">
                <label className="">Kode Transaksi</label>
                <input type="text" name="kd_transaksi" id="kode" className="bg-white/15 w-[250px] min-[1700px]:w-[500px] min-[1400px]:w-[370px] min-[1440px]:w-[350px] px-4 py-[6px] min-[1400px]:h-[45px] min-[1150px]:h-[40px] rounded-lg"/>
            </div>
            <div className="flex items-center space-y-1 space-x-10">
                <label className="">Keterangan</label>
               <input type="text" name="kd_transaksi" id="kode" className="bg-white/15 w-[250px] min-[1700px]:w-[500px] min-[1400px]:w-[370px] min-[1440px]:w-[350px] px-4 py-[6px] min-[1400px]:h-[45px] min-[1150px]:h-[40px] rounded-lg"/>
            </div>
            <div className="flex items-center space-y-1 space-x-10">
                <label className="">Debit</label>
                <input type="number" name="debit" id="debit" className="bg-white/15 w-[250px] min-[1700px]:w-[500px] min-[1400px]:w-[370px] min-[1440px]:w-[350px] px-4 py-[6px] min-[1400px]:h-[45px] min-[1150px]:h-[40px] rounded-lg"/>
            </div>
            <div className="flex items-center space-y-1 space-x-20">
                <label className="">Kredit</label>
                <input type="number" name="kredit" id="kredit" className="bg-white/15 w-[250px] min-[1700px]:w-[500px] min-[1400px]:w-[370px] min-[1440px]:w-[350px] px-4 py-[6px] min-[1400px]:h-[45px] min-[1150px]:h-[40px] rounded-lg"/>
            </div>
            </div>
            <div className="w-[86%] min-[980px]:w-[84%] min-[1300px]:w-[88%] min-[1515px]:w-[90%] ml-[120px] border border-white"></div>
            <button type="submit" className="ml-[120px] self-start cursor-pointer w-[200px] h-[45px] bg-[#9EFF66] rounded-lg text-gray-700 font-semibold"><i className="fa-solid fa-folder-plus"></i><span className="ml-1">Simpan Transaksi</span></button>
        </form>
    </section>
    );
}