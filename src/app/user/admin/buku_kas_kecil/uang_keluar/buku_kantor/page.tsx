"use client";
import React, { useState, useEffect } from "react";
import FormBkkKantor from "@/app/ui/admin/buku_kas_kecil/uang_keluar/form_proyekKantor";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormatPrice } from "@/app/component/format_number";

export default function Page() {
  const Id_bpjasa = "0";
  const Identity = "uang_keluar";
  const Identity_uk = "buku_kantor";
  const Kredit = "0";
  const Id_bpbarang = "0";
  const Harga_satuan = "0";
  const Volume = "-";
  const Satuan = "-";
  const Kb_kas = "0";
  const Upah = "0";
  const Material_kaskecil = "0";
  const Material_kasbesar = "0";
  const Non_material = "0";
  const Dircost = "0";
  const Grand_total = "0";
  const router = useRouter();
  const [Tanggal, setTanggal] = useState("");
  const [Instansi, setInstansi] = useState("Buku Kantor");
  const [Pekerjaan, setPekerjaan] = useState("Buku Kantor");
  const [Uraian, setUraian] = useState("");
  const [Nota, setNota] = useState<File | null>(null);
  const [Debit, setDebit] = useState("");
  const [FormatDebit, setFormatDebit] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggal(formatted);
  }, []);

  // HILANGKAN TITIK DI SINI UNTUK NILAI ASLI
  useEffect(() => {
    const cleanedDebit = FormatDebit.replace(/\./g, "");
    setDebit(cleanedDebit);
  }, [FormatDebit]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatDebit(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Debit = ", Debit);
    console.log("Format Debit = ", FormatDebit);

    const formData = new FormData();
    formData.append("id_bpbarang", Id_bpbarang);
    formData.append("id_bpjasa", Id_bpjasa);
    formData.append("identity", Identity);
    formData.append("identity_uk", Identity_uk);
    formData.append("tanggal", Tanggal);
    formData.append("instansi", Instansi);
    formData.append("pekerjaan", Pekerjaan);
    formData.append("uraian", Uraian);
    formData.append("harga_satuan", Harga_satuan);
    formData.append("volume", Volume);
    formData.append("satuan", Satuan);
    formData.append("debit", Debit);
    formData.append("kredit", Kredit);
    formData.append("kb_kas", Kb_kas);
    formData.append("upah", Upah);
    formData.append("material_kaskecil", Material_kaskecil);
    formData.append("material_kasbesar", Material_kasbesar);
    formData.append("non_material", Non_material);
    formData.append("dircost", Dircost);
    formData.append("grand_total", Grand_total);

    // ✅ Tambahkan file-nya kalau ada
    if (Nota) {
      formData.append("nota", Nota);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bkk/uang_keluar`,
        {
          method: "POST",
          body: formData, // ⬅️ Tanpa headers manual
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

  return (
    <FormBkkKantor onSubmit={handleSubmit} encType="multipart/form-data">
      <InputTbl
        classPage="mb-7"
        type="date"
        value={Tanggal}
        onChange={(e) => setTanggal(e.target.value)}
      >
        Tanggal
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        placeholder="Masukkan Uraian"
        value={Uraian}
        onChange={(e) => setUraian(e.target.value)}
      >
        Uraian
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setNota(file);
        }}
      >
        Nota
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        placeholder="Masukkan Nominal"
        value={FormatDebit}
        onChange={handleInputChange}
      >
        Nilai Uang Keluar
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Instansi}
        onChange={(e) => setInstansi(e.target.value)}
        readOnly
      >
        Instansi
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Pekerjaan}
        onChange={(e) => setPekerjaan(e.target.value)}
        readOnly
      >
        Pekerjaan
      </InputTbl>
    </FormBkkKantor>
  );
}
