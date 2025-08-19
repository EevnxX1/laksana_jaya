"use client";
import TambahBarang from "@/app/ui/admin/buku_proyek/detail/tambah_barang";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { FormatNumber, FormatPrice } from "@/app/component/format_number";

export default function Page() {
  const [Idbpbarang, setIdbpbarang] = useState("");
  const [Idrekening, setIdrekening] = useState("");
  const [NamaBarang, setNamaBarang] = useState("");
  const [Spesifikasi, setSpesifikasi] = useState("");
  const [Volume, setVolume] = useState("");
  const [Satuan, setSatuan] = useState("");
  const [HargaSatuan, setHargaSatuan] = useState("");
  const [FormatHargaSatuan, setFormatHargaSatuan] = useState("");
  const [HargaTotal, setHargaTotal] = useState("");
  const [FormatHargaTotal, setFormatHargaTotal] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cekIdBp = params.get("id_bp");
    const cekIdKr = params.get("id_kr");
    if (cekIdBp && cekIdKr) {
      setIdbpbarang(cekIdBp);
      setIdrekening(cekIdKr);
    }
  }, []);

  useEffect(() => {
    const total = Number(HargaSatuan) * Number(Volume);
    setHargaTotal(total.toString());
    setFormatHargaTotal(FormatNumber(total));
  }, [HargaSatuan, Volume]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/barangdpa/tambah_data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_bpbarang: Idbpbarang,
            id_kdrekening: Idrekening,
            nama_barang: NamaBarang,
            spesifikasi: Spesifikasi,
            vol: Volume,
            satuan: Satuan,
            harga_satuan: HargaSatuan,
            harga_total: HargaTotal,
          }),
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Data berhasil disimpan");
        router.push(`/user/admin/buku_proyek/detail?id_bp=${Idbpbarang}`);
      } else {
        toast.error("Gagal menyimpan data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  // HILANGKAN TITIK DI SINI UNTUK NILAI ASLI
  useEffect(() => {
    const cleanedHargaSatuan = FormatHargaSatuan.replace(/\./g, "");
    setHargaSatuan(cleanedHargaSatuan);
  }, [FormatHargaSatuan]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatHargaSatuan(formattedValue);
  };

  return (
    <TambahBarang onSubmit={handleSubmit}>
      <InputTbl
        classPage="mb-7 hidden"
        type="hidden"
        value={Idbpbarang}
        onChange={(e) => setIdbpbarang(e.target.value)}
      >
        id_bpbarang
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={NamaBarang}
        onChange={(e) => setNamaBarang(e.target.value)}
      >
        Nama Barang
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Spesifikasi}
        onChange={(e) => setSpesifikasi(e.target.value)}
      >
        Spesifikasi
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Volume}
        onChange={(e) => setVolume(e.target.value)}
      >
        Volume
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Satuan}
        onChange={(e) => setSatuan(e.target.value)}
      >
        Satuan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={FormatHargaSatuan}
        onChange={handleInputChange}
      >
        Harga Satuan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={FormatHargaTotal}
        onChange={(e) => setHargaTotal(e.target.value)}
      >
        Harga Total
      </InputTbl>
    </TambahBarang>
  );
}
