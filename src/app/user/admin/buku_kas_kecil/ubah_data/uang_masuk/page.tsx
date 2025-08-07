"use client";
import { useState, useEffect } from "react";
import FormBkkUbahData from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
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
  const [Nota, setNota] = useState("");
  const [Debit, setDebit] = useState("0");
  const [Kredit, setKredit] = useState("");
  const [Data, setData] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/edit/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) {
      setTanggal(proyek.tanggal);
      setUraian(proyek.uraian);
      setKredit(proyek.kredit);
    }
  }, [Data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("isi = ", Tanggal);
    console.log("isi = ", Uraian);
    console.log("isi = ", Kredit);
    console.log("isi = ", Id_bpbarang);
    console.log("isi = ", Id_bpjasa);
    console.log("isi = ", Identity);
    console.log("isi = ", Identity_uk);
    console.log("isi = ", Instansi);
    console.log("isi = ", Pekerjaan);
    console.log("isi = ", Harga_satuan);
    console.log("isi = ", Volume);
    console.log("isi = ", Satuan);
    console.log("isi = ", Nota);
    console.log("isi = ", Debit);
    console.log("isi = ", Kb_kas);
    console.log("isi = ", Upah);
    console.log("isi = ", Material_kasbesar);
    console.log("isi = ", Material_kaskecil);
    console.log("isi = ", Non_material);
    console.log("isi = ", Dircost);
    console.log("isi = ", Grand_total);
    console.log("Selesai_____");

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
    formData.append("nota", Nota);

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/bkk/ubah_data/${id}`, {
        method: "POST",
        body: formData, // ⬅️ Tanpa headers manual
      });

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
      judul="BUKU KAS KECIL - UBAH UANG MASUK"
      onSubmit={handleSubmit}
    >
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
        onChange={(e) => setUraian(e.target.value)}
      >
        Uraian
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Kredit}
        onChange={(e) => setKredit(e.target.value)}
      >
        Kredit
      </InputTbl>
    </FormBkkUbahData>
  );
}
