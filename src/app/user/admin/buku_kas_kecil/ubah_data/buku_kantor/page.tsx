"use client";
import { useState, useEffect } from "react";
import FormBkkUbahData from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { InputTbl, SelectTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface IsiValueBukuKantor {
  id: number;
  tanggal: string;
  uraian: string;
  debit: string;
  nota: string;
}

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
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
  const [Data, setData] = useState<IsiValueBukuKantor[]>([]);
  const [Tanggal, setTanggal] = useState("");
  const [Instansi, setInstansi] = useState("Buku Kantor");
  const [Pekerjaan, setPekerjaan] = useState("Buku Kantor");
  const [Uraian, setUraian] = useState("");
  const [Nota, setNota] = useState<File | null>(null);
  const [Gambar, setGambar] = useState("");
  const [Debit, setDebit] = useState("");

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
      setDebit(proyek.debit);
      setGambar(proyek.nota);
    }
  }, [Data]);

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
    formData.append("grand_total", Grand_total);

    // ✅ Tambahkan file-nya kalau ada
    if (Nota) {
      formData.append("nota", Nota);
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/bkk/ubah_data/${id}`, {
        method: "POST",
        body: formData, // ⬅️ Tanpa headers manual
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Transaksi berhasil diubah");
        router.push("/user/admin/buku_kas_kecil");
      } else {
        toast.error("Gagal Mengubah Transaksi");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  return (
    <FormBkkUbahData
      onSubmit={handleSubmit}
      encType="multipart/form-data"
      judul="BUKU KAS KECIL - UBAH BUKU KANTOR"
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
      <div className="flex flex-col gap-y-1 mb-7 mt-7">
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
    </FormBkkUbahData>
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
