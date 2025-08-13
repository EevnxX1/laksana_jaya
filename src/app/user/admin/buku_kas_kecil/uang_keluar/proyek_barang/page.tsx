"use client";
import React, { useState, useEffect } from "react";
import FormBkkBarang from "@/app/ui/admin/buku_kas_kecil/uang_keluar/form_proyekBarang";
import { InputTbl, SelectTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormatPrice, FormatNumber } from "@/app/component/format_number";
import { SelectPostBarang } from "@/app/component/SelectPost";

export default function Page() {
  const Id_bpjasa = "0";
  const Identity = "uang_keluar";
  const Identity_uk = "buku_barang";
  const Kredit = "0";
  const Kb_kas = "0";
  const Upah = "0";
  const Material_kaskecil = "0";
  const Material_kasbesar = "0";
  const Non_material = "0";
  const Dircost = "0";
  const Grand_total = "0";
  const router = useRouter();
  const [Id_bpbarang, setId_bpbarang] = useState("");
  const [Tanggal, setTanggal] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [Pekerjaan, setPekerjaan] = useState("");
  const [Uraian, setUraian] = useState("");
  const [Harga_satuan, setHarga_satuan] = useState("");
  const [Volume, setVolume] = useState("");
  const [Satuan, setSatuan] = useState("");
  const [Nota, setNota] = useState<File | null>(null);
  const [Debit, setDebit] = useState("");
  const [FormatDebit, setFormatDebit] = useState("");
  const [FormatHargaSatuan, setFormatHargaSatuan] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggal(formatted);
  }, []);

  useEffect(() => {
    const total = Number(Harga_satuan) * Number(Volume);
    setDebit(total.toString());
    setFormatDebit(FormatNumber(total));
  }, [Harga_satuan, Volume]);

  // HILANGKAN TITIK DI SINI UNTUK NILAI ASLI
  useEffect(() => {
    const cleanedHargaSatuan = FormatHargaSatuan.replace(/\./g, "");
    setHarga_satuan(cleanedHargaSatuan);
  }, [FormatHargaSatuan]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatHargaSatuan(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Format Harga Satuan = ", FormatHargaSatuan);
    console.log("Harga Satuan = ", Harga_satuan);
    console.log("Debit = ", Debit);

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

    // Tambahkan file-nya kalau ada
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

      console.log("instansi" + Instansi);
      console.log("idbpbarang" + Id_bpbarang);
      console.log("identity" + Identity);

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
    <FormBkkBarang onSubmit={handleSubmit} encType="multipart/form-data">
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
        placeholder="Masukkan Nama Barang"
        value={Uraian}
        onChange={(e) => setUraian(e.target.value)}
      >
        Nama Barang
      </InputTbl>
      <SelectPostBarang
        onPostSelected={(post) => {
          setId_bpbarang(post.id);
          setInstansi(post.instansi);
          setPekerjaan(post.label_pekerjaan);
        }}
      ></SelectPostBarang>
      <InputTbl
        classPage="mb-7"
        type="text"
        placeholder="Masukkkan Nominal"
        value={FormatHargaSatuan}
        onChange={handleInputChange}
      >
        Harga Satuan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        placeholder="Masukkan Nominal Volume"
        value={Volume}
        onChange={(e) => setVolume(e.target.value)}
      >
        Volume
      </InputTbl>
      <SelectTbl
        classPage="mb-7"
        labelValue="Satuan"
        value={Satuan}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setSatuan(e.target.value)
        }
      >
        <option defaultValue={"pilih"} className="text-black">
          ~Pilih Satuan~
        </option>
        <option value="Unit" className="text-black">
          Unit
        </option>
        <option value="Pcs" className="text-black">
          Pcs
        </option>
        <option value="Buah" className="text-black">
          Buah
        </option>
        <option value="Lusin" className="text-black">
          Lusin
        </option>
        <option value="Box" className="text-black">
          Box
        </option>
        <option value="Rim" className="text-black">
          Rim
        </option>
        <option value="Pasang" className="text-black">
          Pasang
        </option>
        <option value="Set" className="text-black">
          Set
        </option>
        <option value="Kodi" className="text-black">
          Kodi
        </option>
        <option value="Pak" className="text-black">
          Pak
        </option>
        <option value="Dus" className="text-black">
          Dus
        </option>
        <option value="Kg" className="text-black">
          Kg
        </option>
        <option value="Ikat" className="text-black">
          Ikat
        </option>
      </SelectTbl>
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
      <InputTbl classPage="mb-7" type="text" value={FormatDebit} readOnly>
        Harga Total
      </InputTbl>
    </FormBkkBarang>
  );
}
