"use client";
import React, { useState, useEffect } from "react";
import FormBkkUbahData from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SelectPostJasaEdit } from "@/app/component/SelectPost";

interface IsiValueBukuJasa {
  id: string;
  id_bpjasa: string;
  instansi: string;
  pekerjaan: string;
  tanggal: string;
  uraian: string;
  kb_kas: string;
  upah: string;
  material_kaskecil: string;
  material_kasbesar: string;
  non_material: string;
  dircost: string;
  nota: string;
}

export default function Page() {
  const [id, setId] = useState<string | null>(null);
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
  const [Gambar, setGambar] = useState("");
  const [Debit, setDebit] = useState("");
  const [Data, setData] = useState<IsiValueBukuJasa[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id_bp"));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/edit/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) {
      setId_bpjasa(proyek.id_bpjasa);
      setInstansi(proyek.instansi);
      setPekerjaan(proyek.pekerjaan);
      setTanggal(proyek.tanggal);
      setUraian(proyek.uraian);
      setKb_kas(proyek.kb_kas);
      setUpah(proyek.upah);
      setMaterial_kaskecil(proyek.material_kaskecil);
      setMaterial_kasbesar(proyek.material_kasbesar);
      setNon_material(proyek.non_material);
      setDircost(proyek.dircost);
      setGambar(proyek.nota);
    }
  }, [Data]);

  useEffect(() => {
    const jumlah =
      Number(Upah) +
      Number(Material_kaskecil) +
      Number(Material_kasbesar) +
      Number(Non_material) +
      Number(Dircost);
    setDebit(jumlah.toString());
  }, [Upah, Material_kaskecil, Material_kasbesar, Non_material, Dircost]);

  useEffect(() => {
    const now = new Date();
    const formatted = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggal(formatted);
  }, []);

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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bkk/ubah_data/${id}`,
        {
          method: "POST",
          body: formData, // ⬅️ Tanpa headers manual
        }
      );

      console.log("instansi = " + Instansi);
      console.log("idbpjasa = " + Id_bpjasa);
      console.log("pekerjaan = " + Pekerjaan);
      console.log("identity = " + Identity);

      if (res.status === 201 || res.status === 200) {
        toast.success("Transaksi berhasil Diubah");
        router.push("/user/admin/buku_kas_kecil");
      } else {
        toast.error("Gagal menyimpan Transaksi");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  return (
    <FormBkkUbahData
      judul="BUKU KAS KECIL - UBAH BUKU JASA"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
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
      <SelectPostJasaEdit
        id_post={id}
        onPostSelected={(post) => {
          setId_bpjasa(post.id);
          setInstansi(post.instansi);
          setPekerjaan(post.nama_pekerjaan);
        }}
      ></SelectPostJasaEdit>
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
      <div className="flex flex-col gap-y-1">
        <InputTbl
          classPage=""
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setNota(file);
          }}
        >
          Nota
        </InputTbl>
        <Link
          href={Gambar}
          target="_blank"
          className="underline self-end w-[68%] text-sm"
        >
          Lihat Nota Sebelumnya
        </Link>
      </div>
      <InputTbl
        classPage="mb-7"
        type="number"
        value={Debit}
        onChange={(e) => setDebit(e.target.value)}
        readOnly
      >
        Jumlah
      </InputTbl>
    </FormBkkUbahData>
  );
}
