"use client";
import { FormTambahData } from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";

interface Instansi {
  id: number;
  instansi: string;
  post: string;
  alamat_instansi: string;
  no_telp: string;
  npwp: string;
}

export default function Page() {
  const [id, setId] = useState<string | null>(null);
  const [Instansi, setInstansi] = useState("");
  const [Post, setPost] = useState("");
  const [AlamatInstansi, setAlamatInstansi] = useState("");
  const [NoTelp, setNoTelp] = useState("");
  const [Npwp, setNpwp] = useState("");
  const [Data, setData] = useState<Instansi[]>([]);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id_instansi"));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/instansi/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) {
      setInstansi(proyek.instansi);
      setPost(proyek.post);
      setAlamatInstansi(proyek.alamat_instansi);
      setNoTelp(proyek.no_telp);
      setNpwp(proyek.npwp);
    }
  }, [Data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("data = ", Instansi);
    console.log("data = ", Post);
    console.log("data = ", AlamatInstansi);
    console.log("data = ", NoTelp);
    console.log("data = ", Npwp);

    const formData = new FormData();
    formData.append("instansi", Instansi);
    formData.append("post", Post);
    formData.append("alamat_instansi", AlamatInstansi);
    formData.append("no_telp", NoTelp);
    formData.append("npwp", Npwp);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/instansi/ubah_data/${id}`,
        {
          method: "POST",
          body: formData, // ⬅️ Tanpa headers manual
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Instansi berhasil Di Ubah");
        router.push("/user/teknisi/data_instansi");
      } else {
        toast.error("Instansi Gagal Di Ubah");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  return (
    <FormTambahData
      judul="Form Ubah Data Instansi"
      btn="Ubah Instansi"
      onSubmit={handleSubmit}
    >
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Instansi}
        onChange={(e) => setInstansi(e.target.value)}
      >
        Nama Instansi
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Post}
        onChange={(e) => setPost(e.target.value)}
      >
        Post
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={AlamatInstansi}
        type="text"
        onChange={(e) => setAlamatInstansi(e.target.value)}
      >
        Alamat Instansi
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={NoTelp}
        onChange={(e) => setNoTelp(e.target.value)}
      >
        No Telp
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Npwp}
        onChange={(e) => setNpwp(e.target.value)}
      >
        NPWP
      </InputTbl>
    </FormTambahData>
  );
}
