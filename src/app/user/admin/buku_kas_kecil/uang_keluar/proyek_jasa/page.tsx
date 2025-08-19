"use client";
import { useState, useEffect } from "react";
import FormBkkJasa from "@/app/ui/admin/buku_kas_kecil/uang_keluar/form_proyekJasa";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormatNumber, FormatPrice } from "@/app/component/format_number";
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
  const [FormatKb_kas, setFormatKb_kas] = useState("0");
  const [Upah, setUpah] = useState("");
  const [FormatUpah, setFormatUpah] = useState("0");
  const [Material_kaskecil, setMaterial_kaskecil] = useState("");
  const [FormatMaterial_kaskecil, setFormatMaterial_kaskecil] = useState("0");
  const [Material_kasbesar, setMaterial_kasbesar] = useState("");
  const [FormatMaterial_kasbesar, setFormatMaterial_kasbesar] = useState("0");
  const [Non_material, setNon_material] = useState("");
  const [FormatNon_material, setFormatNon_material] = useState("0");
  const [Dircost, setDircost] = useState("");
  const [FormatDircost, setFormatDircost] = useState("0");
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

  // HILANGKAN TITIK DI SINI UNTUK NILAI ASLI
  useEffect(() => {
    const cleanedKbKas = FormatKb_kas.replace(/\./g, "");
    setKb_kas(cleanedKbKas);
  }, [FormatKb_kas]);
  useEffect(() => {
    const cleanedUpah = FormatUpah.replace(/\./g, "");
    setUpah(cleanedUpah);
  }, [FormatUpah]);
  useEffect(() => {
    const cleanedMaterialKasKecil = FormatMaterial_kaskecil.replace(/\./g, "");
    setMaterial_kaskecil(cleanedMaterialKasKecil);
  }, [FormatMaterial_kaskecil]);
  useEffect(() => {
    const cleanedMaterialKasBesar = FormatMaterial_kasbesar.replace(/\./g, "");
    setMaterial_kasbesar(cleanedMaterialKasBesar);
  }, [FormatMaterial_kasbesar]);
  useEffect(() => {
    const cleanedNonMaterial = FormatNon_material.replace(/\./g, "");
    setNon_material(cleanedNonMaterial);
  }, [FormatNon_material]);
  useEffect(() => {
    const cleanedDircost = FormatDircost.replace(/\./g, "");
    setDircost(cleanedDircost);
  }, [FormatDircost]);

  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatKb_kas(formattedValue);
  };
  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatUpah(formattedValue);
  };
  const handleInputChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatMaterial_kaskecil(formattedValue);
  };
  const handleInputChange4 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatNon_material(formattedValue);
  };
  const handleInputChange5 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatMaterial_kasbesar(formattedValue);
  };
  const handleInputChange6 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatDircost(formattedValue);
  };

  console.log("tipe rupiah 1 Format = ", FormatKb_kas);
  console.log("tipe rupiah 1 Non Format = ", Kb_kas);
  console.log("tipe rupiah 2 Format = ", FormatUpah);
  console.log("tipe rupiah 2 Non Format = ", Upah);
  console.log("tipe rupiah 3 Format = ", FormatMaterial_kaskecil);
  console.log("tipe rupiah 3 Non Format = ", Material_kaskecil);
  console.log("tipe rupiah 4 Format = ", FormatMaterial_kasbesar);
  console.log("tipe rupiah 4 Non Format = ", Material_kasbesar);
  console.log("tipe rupiah 5 Format = ", FormatNon_material);
  console.log("tipe rupiah 5 Non Format = ", Non_material);
  console.log("tipe rupiah 6 Format = ", FormatDircost);
  console.log("tipe rupiah 6 Non Format = ", Dircost);

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
        value={FormatKb_kas}
        onChange={handleInputChange1}
      >
        Kb Kas
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={FormatUpah}
        onChange={handleInputChange2}
      >
        Upah
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={FormatMaterial_kaskecil}
        onChange={handleInputChange3}
      >
        Material Kas Kecil
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={FormatNon_material}
        onChange={handleInputChange4}
      >
        Non Material
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={FormatMaterial_kasbesar}
        onChange={handleInputChange5}
      >
        Material Kas Besar
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={FormatDircost}
        onChange={handleInputChange6}
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
