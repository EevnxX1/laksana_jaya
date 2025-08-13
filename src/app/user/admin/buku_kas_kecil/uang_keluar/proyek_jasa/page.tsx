"use client";
import { useState, useEffect } from "react";
import FormBkkJasa from "@/app/ui/admin/buku_kas_kecil/uang_keluar/form_proyekJasa";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormatNumber } from "@/app/component/format_number";
import { SelectPostJasa } from "@/app/component/SelectPost";

export default function Page() {
  const router = useRouter();
  const Id_bpbarang = "0";
  const Identity = "uang_keluar";
  const Identity_uk = "buku_jasa";
  const Harga_satuan = "0";
  const Volume = "0";
  const Satuan = "-";
  const Kredit = "0";
  const [Id_bpjasa, setId_bpjasa] = useState("");
  const [Tanggal, setTanggal] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [Pekerjaan, setPekerjaan] = useState("");
  const [Uraian, setUraian] = useState("");
  const [Kb_kas, setKb_kas] = useState("");
  const [Upah, setUpah] = useState("");
  const [Material_kaskecil, setMaterial_kaskecil] = useState("");
  const [Material_kasbesar, setMaterial_kasbesar] = useState("");
  const [Non_material, setNon_material] = useState("");
  const [Dircost, setDircost] = useState("");
  const [Nota, setNota] = useState<File | null>(null);
  const [Debit, setDebit] = useState("");
  const [FormatDebit, setFormatDebit] = useState("");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggal(formatted);
  }, []);

  useEffect(() => {
    const jumlah =
      Number(Upah) +
      Number(Material_kaskecil) +
      Number(Material_kasbesar) +
      Number(Non_material) +
      Number(Dircost);
    setDebit(jumlah.toString());
    setFormatDebit(FormatNumber(jumlah));
  }, [Upah, Material_kaskecil, Material_kasbesar, Non_material, Dircost]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    // Tambahkan file-nya kalau ada
    if (Nota) {
      formData.append("nota", Nota);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/bkk/uang_keluar", {
        method: "POST",
        body: formData, // ⬅️ Tanpa headers manual
      });

      console.log("instansi" + Instansi);
      console.log("idbpbarang" + Id_bpbarang);
      console.log("identity" + Identity);

      if (res.status === 201 || res.status === 200) {
        toast.success("Transaksi berhasil disimpan");
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
    <FormBkkJasa onSubmit={handleSubmit} encType="multipart/form-data">
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
        value={Uraian}
        onChange={(e) => setUraian(e.target.value)}
      >
        Uraian
      </InputTbl>
      <SelectPostJasa
        onPostSelected={(post) => {
          setId_bpjasa(post.id);
          setInstansi(post.instansi);
          setPekerjaan(post.nama_pekerjaan);
        }}
      ></SelectPostJasa>
      <InputTbl
        classPage="mb-7"
        type="number"
        value={Kb_kas}
        onChange={(e) => setKb_kas(e.target.value)}
      >
        Kb Kas
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="number"
        value={Upah}
        onChange={(e) => setUpah(e.target.value)}
      >
        Upah
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="number"
        value={Material_kaskecil}
        onChange={(e) => setMaterial_kaskecil(e.target.value)}
      >
        Material Kas Kecil
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="number"
        value={Non_material}
        onChange={(e) => setNon_material(e.target.value)}
      >
        Non Material
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="number"
        value={Material_kasbesar}
        onChange={(e) => setMaterial_kasbesar(e.target.value)}
      >
        Material Kas Besar
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="number"
        value={Dircost}
        onChange={(e) => setDircost(e.target.value)}
      >
        Dircost
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
      <InputTbl classPage="mb-7" type="text" value={FormatDebit} readOnly>
        Jumlah
      </InputTbl>
    </FormBkkJasa>
  );
}
