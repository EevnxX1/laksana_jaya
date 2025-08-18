"use client";
import React, { useState, useEffect } from "react";
import FormBkkUangMasuk from "@/app/ui/admin/buku_kas_kecil/uang_masuk/form_uang_masuk";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormatPrice } from "@/app/component/format_number";

export default function Page() {
  const Kb_kas = "0";
  const Upah = "0";
  const Material_kaskecil = "0";
  const Material_kasbesar = "0";
  const Non_material = "0";
  const Dircost = "0";
  const Grand_total = "0";
  const [Tanggal, setTanggal] = useState("");
  const [Id_bpbarang, setId_bpbarang] = useState("0");
  const [Id_bpjasa, setId_bpjasa] = useState("0");
  const [Identity, setIdentity] = useState("uang_masuk");
  const [Identity_uk, setIdentity_uk] = useState("-");
  const [Instansi, setInstansi] = useState("-");
  const [Pekerjaan, setPekerjaan] = useState("-");
  const [Uraian, setUraian] = useState("");
  const [Harga_satuan, setHarga_satuan] = useState("0");
  const [Volume, setVolume] = useState("0");
  const [Satuan, setSatuan] = useState("-");
  const [Nota, setNota] = useState("-");
  const [Debit, setDebit] = useState("0");
  const [Kredit, setKredit] = useState("");
  const [FormatKredit, setFormatKredit] = useState("");
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const formatted = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggal(formatted);
  }, []);

  // HILANGKAN TITIK DI SINI UNTUK NILAI ASLI
  useEffect(() => {
    const cleanedKredit = FormatKredit.replace(/\./g, "");
    setKredit(cleanedKredit);
  }, [FormatKredit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Kredit = ", Kredit);
    console.log("Format Kredit = ", FormatKredit);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bkk/uang_masuk`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_bpbarang: Id_bpbarang,
            id_bpjasa: Id_bpjasa,
            identity: Identity,
            identity_uk: Identity_uk,
            tanggal: Tanggal,
            instansi: Instansi,
            pekerjaan: Pekerjaan,
            uraian: Uraian,
            harga_satuan: Harga_satuan,
            volume: Volume,
            satuan: Satuan,
            nota: Nota,
            debit: Debit,
            kredit: Kredit,
            kb_kas: Kb_kas,
            upah: Upah,
            material_kaskecil: Material_kaskecil,
            material_kasbesar: Material_kasbesar,
            non_material: Non_material,
            dircost: Dircost,
            grand_total: Grand_total,
          }),
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Data berhasil disimpan");
        router.push("/user/admin/buku_kas_kecil");
      } else {
        toast.error("Gagal menyimpan data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatKredit(formattedValue);
  };

  return (
    <FormBkkUangMasuk onSubmit={handleSubmit}>
      <InputTbl
        classPage="hidden"
        value={Id_bpbarang}
        onChange={(e) => setId_bpbarang(e.target.value)}
      >
        id_bpbarang
      </InputTbl>
      <InputTbl
        classPage="hidden"
        value={Id_bpjasa}
        onChange={(e) => setId_bpjasa(e.target.value)}
      >
        id_bpjasa
      </InputTbl>
      <InputTbl
        classPage="hidden"
        value={Identity}
        onChange={(e) => setIdentity(e.target.value)}
      >
        identity
      </InputTbl>
      <InputTbl
        classPage="hidden"
        value={Identity_uk}
        onChange={(e) => setIdentity_uk(e.target.value)}
      >
        identity_uk
      </InputTbl>
      <InputTbl
        classPage="hidden"
        value={Harga_satuan}
        onChange={(e) => setHarga_satuan(e.target.value)}
      >
        Harga Satuan
      </InputTbl>
      <InputTbl
        classPage="hidden"
        value={Volume}
        onChange={(e) => setVolume(e.target.value)}
      >
        Volume
      </InputTbl>
      <InputTbl
        classPage="hidden"
        value={"-"}
        onChange={(e) => setSatuan(e.target.value)}
      >
        Satuan
      </InputTbl>
      <InputTbl
        classPage="hidden"
        value={Nota}
        onChange={(e) => setNota(e.target.value)}
      >
        nota
      </InputTbl>
      <InputTbl
        classPage="hidden"
        value={Debit}
        onChange={(e) => setDebit(e.target.value)}
      >
        debit
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Tanggal}
        readOnly
        onChange={(e) => setTanggal(e.target.value)}
      >
        Tanggal
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Instansi}
        readOnly
        onChange={(e) => setInstansi(e.target.value)}
      >
        Instansi
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Pekerjaan}
        readOnly
        onChange={(e) => setPekerjaan(e.target.value)}
      >
        Pekerjaan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Uraian}
        placeholder="Masukkan Uraian"
        onChange={(e) => setUraian(e.target.value)}
      >
        Uraian
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        placeholder="Masukkan Nominal"
        value={FormatKredit}
        onChange={handleInputChange}
      >
        Uang Masuk
      </InputTbl>
    </FormBkkUangMasuk>
  );
}
