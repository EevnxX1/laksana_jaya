"use client";
import { FormTambahData } from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";

export default function Page() {
  const [Instansi, setInstansi] = useState("");
  const [Post, setPost] = useState("");
  const [AlamatInstansi, setAlamatInstansi] = useState("");
  const [NoTelp, setNoTelp] = useState("");
  const [Npwp, setNpwp] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("data = ", Instansi);
    console.log("data = ", Post);
    console.log("data = ", AlamatInstansi);
    console.log("data = ", NoTelp);
    console.log("data = ", Npwp);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instansi/tambah_data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            instansi: Instansi,
            post: Post,
            alamat_instansi: AlamatInstansi,
            no_telp: NoTelp,
            npwp: Npwp,
          }),
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Instansi berhasil Di Tambahkan");
        router.push("/user/teknisi/data_instansi");
      } else {
        toast.error("Instansi Gagal Di tambahkan");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  return (
    <FormTambahData
      judul="Form Instansi"
      btn="Tambah Instansi"
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
