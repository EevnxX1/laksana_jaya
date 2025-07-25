"use client";
import { useState, useEffect } from "react";
import FormBkkUangMasuk from "@/app/ui/admin/buku_kas_kecil/uang_masuk/form_uang_masuk";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function page() {
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
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const formatted = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggal(formatted);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("id" + Id_bpbarang);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/bkk/uang_masuk", {
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
        }),
      });

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
    </FormBkkUangMasuk>
  );
}
