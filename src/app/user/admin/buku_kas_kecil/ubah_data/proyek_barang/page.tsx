"use client";
import { useState, useEffect } from "react";
import FormBkkUbahData from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { InputTbl, SelectTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface IsiValueBukuBarang {
  id: number;
  id_bpbarang: string;
  instansi: string;
  pekerjaan: string;
  tanggal: string;
  uraian: string;
  harga_satuan: string;
  volume: string;
  satuan: string;
  debit: string;
  nota: string;
}

export default function page() {
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
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  const [Data, setData] = useState<IsiValueBukuBarang[]>([]);
  const [Id_bpbarang, setId_bpbarang] = useState("");
  const [Tanggal, setTanggal] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [Pekerjaan, setPekerjaan] = useState("");
  const [Uraian, setUraian] = useState("");
  const [Harga_satuan, setHarga_satuan] = useState("");
  const [Volume, setVolume] = useState("");
  const [Satuan, setSatuan] = useState("");
  const [Nota, setNota] = useState<File | null>(null);
  const [Gambar, setGambar] = useState("");
  const [Debit, setDebit] = useState("");

  useEffect(() => {
    const total = Number(Harga_satuan) * Number(Volume);
    setDebit(total.toString());
  }, [Harga_satuan, Volume]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/edit/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) {
      setId_bpbarang(proyek.id_bpbarang);
      setInstansi(proyek.instansi);
      setPekerjaan(proyek.pekerjaan);
      setTanggal(proyek.tanggal);
      setUraian(proyek.uraian);
      setHarga_satuan(proyek.harga_satuan);
      setVolume(proyek.volume);
      setSatuan(proyek.satuan);
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

    // Tambahkan file-nya kalau ada
    if (Nota) {
      formData.append("nota", Nota);
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/bkk/ubah_data/${id}`, {
        method: "POST",
        body: formData, // ⬅️ Tanpa headers manual
      });

      console.log("idbpbarang = " + Id_bpbarang);
      console.log("instansi = " + Instansi);
      console.log("pekerjaan = " + Pekerjaan);
      console.log("identity = " + Identity);

      if (res.status === 201 || res.status === 200) {
        toast.success("Transaksi berhasil Diubah");
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
      judul="BUKU KAS KECIL - UBAH BUKU BARANG"
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
        Nama Barang
      </InputTbl>
      <SelectPost
        onPostSelected={(post) => {
          setId_bpbarang(post.id);
          setInstansi(post.instansi);
          setPekerjaan(post.label_pekerjaan);
        }}
      ></SelectPost>
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Harga_satuan}
        onChange={(e) => setHarga_satuan(e.target.value)}
      >
        Harga Satuan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
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
      <div className="flex flex-col gap-y-1 mb-7">
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
        readOnly
      >
        Harga Total
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
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  const [Data, setData] = useState<IsiValueBukuBarang[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/edit/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
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
      {post.map((item) =>
        item.id == Data[0].id_bpbarang ? (
          <option key={item.id} value={item.id} className="text-black">
            {item.post + " (Before)"}
          </option>
        ) : null
      )}
      {post.map((item) =>
        item.id !== Data[0].id_bpbarang ? (
          <option key={item.id} value={item.id} className="text-black">
            {item.post}
          </option>
        ) : null
      )}
    </SelectTbl>
  );
}
