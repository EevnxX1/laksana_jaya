"use client";
import { useState, useEffect } from "react";
import FormBkkKantor from "@/app/ui/admin/buku_kas_kecil/uang_keluar/form_proyekKantor";
import { InputTbl, SelectTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function page() {
  const Id_bpjasa = "0";
  const Identity = "uang_keluar";
  const Identity_uk = "buku_kantor";
  const Kredit = "0";
  const Id_bpbarang = "0";
  const Harga_satuan = "0";
  const Volume = "-";
  const Satuan = "-";
  const router = useRouter();
  const [Tanggal, setTanggal] = useState("");
  const [Instansi, setInstansi] = useState("Buku Kantor");
  const [Pekerjaan, setPekerjaan] = useState("Buku Kantor");
  const [Uraian, setUraian] = useState("");
  const [Nota, setNota] = useState<File | null>(null);
  const [Debit, setDebit] = useState("");

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

    // ✅ Tambahkan file-nya kalau ada
    if (Nota) {
      formData.append("nota", Nota);
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/api/bkk/uang_keluar", {
        method: "POST",
        body: formData, // ⬅️ Tanpa headers manual
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
        value={Debit}
        onChange={(e) => setDebit(e.target.value)}
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

interface InputSelectPost
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onPostSelected?: (post: any) => void; // fungsi callback
}

export function SelectPost({ onPostSelected, ...rest }: InputSelectPost) {
  const [post, setpost] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    fetch("http://localhost:8000/api/bp_barang") // sesuaikan URL
      .then((res) => res.json())
      .then((data) => setpost(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);

    // Temukan data Post berdasarkan id yang dipilih
    const selectedPost = post.find((item) => item.id === parseInt(selectedId));
    if (onPostSelected && selectedPost) {
      onPostSelected(selectedPost);
    }
  };

  return (
    <SelectTbl
      {...rest}
      value={selectedId}
      onChange={handleChange}
      classPage="mb-7"
      labelValue="Post"
    >
      <option defaultValue={"Anda Belum Memilih"} className="text-black">
        ~Pilih Instansi~
      </option>
      {post.map((item) => (
        <option key={item.id} value={item.id} className="text-black">
          {item.post}
        </option>
      ))}
    </SelectTbl>
  );
}
