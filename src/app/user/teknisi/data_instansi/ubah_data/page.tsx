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

interface Bkk {
  id: number;
  id_bpbarang: number;
  id_bpjasa: number;
  identity: string;
  identity_uk: string;
  tanggal: string;
  instansi: string;
  uraian: string;
  harga_satuan: string;
  volume: string;
  satuan: string;
  debit: string;
  kredit: string;
  kb_kas: string;
  upah: string;
  material_kaskecil: string;
  material_kasbesar: string;
  non_material: string;
  dircost: string;
}

interface bp_barang {
  id: number;
  tanggal: string;
  instansi: string;
  nomor_sp: string;
  tgl_sp: string;
  pekerjaan: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  mulai_pekerjaan: string;
  selesai_pekerjaan: string;
  label_pekerjaan: string;
  nilai_pekerjaan: string;
}

interface bp_jasa {
  id: number;
  tanggal: string;
  instansi: string;
  tahun_anggaran: string;
  nama_pekerjaan: string;
  nilai_pekerjaan: string;
  sub_kegiatan: string;
}

export default function Page() {
  const [id, setId] = useState<string | null>(null);
  const [Instansi, setInstansi] = useState("");
  const [Post, setPost] = useState("");
  const [AlamatInstansi, setAlamatInstansi] = useState("");
  const [NoTelp, setNoTelp] = useState("");
  const [Npwp, setNpwp] = useState("");
  const [Data, setData] = useState<Instansi[]>([]);
  const [DataProyekBarang, setDataProyekBarang] = useState<bp_barang[]>([]);
  const [DataProyekJasa, setDataProyekJasa] = useState<bp_jasa[]>([]);
  const [DataBkk, setDataBkk] = useState<Bkk[]>([]);
  const [PostBefore, setPostBefore] = useState("");
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentId = params.get("id_instansi"); // ambil langsung
    if (!currentId) return;
    setId(currentId);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/instansi/${currentId}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setDataProyekBarang)
      .catch((err) => console.error(err));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setDataProyekJasa)
      .catch((err) => console.error(err));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setDataBkk)
      .catch((err) => console.error(err));
  }, []);

  console.log("data 1 = ", DataProyekBarang);
  console.log("data 2 = ", DataProyekJasa);
  console.log("data 3 = ", DataBkk);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) setPostBefore(proyek.post);
  }, [Data]);

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

    console.log("Instansi Pilihan Sebelumnya = ", PostBefore);

    // console.log("data = ", Instansi);
    // console.log("data = ", Post);
    // console.log("data = ", AlamatInstansi);
    // console.log("data = ", NoTelp);
    // console.log("data = ", Npwp);

    const formData = new FormData();
    formData.append("instansi", Instansi);
    formData.append("post", Post);
    formData.append("alamat_instansi", AlamatInstansi);
    formData.append("no_telp", NoTelp);
    formData.append("npwp", Npwp);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/instansi/ubah_data/${id}`,
        {
          method: "POST",
          body: formData, // ⬅️ Tanpa headers manual
        }
      );

      // proyek Barang
      const filteredDataBarang = DataProyekBarang.filter(
        (item) => item.instansi == PostBefore
      );

      console.log(filteredDataBarang);

      if (filteredDataBarang) {
        // Update tabel bp_barang untuk setiap baris yang terkait
        await Promise.all(
          filteredDataBarang.map((row) => {
            const formDataBarang = new FormData();

            // ambil semua key dari row
            for (const key in row) {
              if (
                key !== "id" &&
                key !== "created_at" &&
                key !== "post" &&
                key !== "instansi"
              ) {
                const typedKey = key as keyof typeof row;
                const value = row[typedKey];
                if (value !== undefined && value !== null) {
                  formDataBarang.append(key, String(value));
                }
              }
            }

            // tambahin field baru
            formDataBarang.append("instansi", Post);

            console.log(
              "Mengirim data:",
              Object.fromEntries(formDataBarang.entries())
            );

            return fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang/ubah_data/${row.id}`,
              {
                method: "POST",
                body: formDataBarang, // tanpa Content-Type, biar otomatis multipart/form-data
              }
            )
              .then((res) => {
                console.log("Response untuk row", row.id, res);
                return res.json();
              })
              .catch((err) => {
                console.error("Error row", row.id, err);
              });
          })
        );
      }
      // proyek Barang

      // proyek Jasa
      const filteredDataJasa = DataProyekJasa.filter(
        (item) => item.instansi == PostBefore
      );

      console.log(filteredDataJasa);

      if (filteredDataJasa) {
        // Update tabel bp_jasa untuk setiap baris yang terkait
        await Promise.all(
          filteredDataJasa.map((row) => {
            const formDataJasa = new FormData();

            // ambil semua key dari row
            for (const key in row) {
              if (
                key !== "id" &&
                key !== "created_at" &&
                key !== "post" &&
                key !== "instansi"
              ) {
                const typedKey = key as keyof typeof row;
                const value = row[typedKey];
                if (value !== undefined && value !== null) {
                  formDataJasa.append(key, String(value));
                }
              }
            }

            // tambahin field baru
            formDataJasa.append("instansi", Post);

            console.log(
              "Mengirim data:",
              Object.fromEntries(formDataJasa.entries())
            );

            return fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa/ubah_data/${row.id}`,
              {
                method: "POST",
                body: formDataJasa, // tanpa Content-Type, biar otomatis multipart/form-data
              }
            )
              .then((res) => {
                console.log("Response untuk row", row.id, res);
                return res.json();
              })
              .catch((err) => {
                console.error("Error row", row.id, err);
              });
          })
        );
      }
      // proyek Jasa

      // Bkk
      const filteredDataBkk = DataBkk.filter(
        (item) => item.instansi == PostBefore
      );

      console.log(filteredDataBkk);

      if (filteredDataBkk) {
        // Update tabel bp_jasa untuk setiap baris yang terkait
        await Promise.all(
          filteredDataBkk.map((row) => {
            const formDataBkk = new FormData();

            // ambil semua key dari row
            for (const key in row) {
              if (
                key !== "id" &&
                key !== "created_at" &&
                key !== "instansi" &&
                key !== "nota" &&
                key !== "grand_total"
              ) {
                const typedKey = key as keyof typeof row;
                const value = row[typedKey];
                if (value !== undefined && value !== null) {
                  formDataBkk.append(key, String(value));
                }
              }
            }

            // tambahin field baru
            formDataBkk.append("instansi", Post);

            console.log(
              "Mengirim data:",
              Object.fromEntries(formDataBkk.entries())
            );

            return fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/bkk/ubah_data/${row.id}`,
              {
                method: "POST",
                body: formDataBkk, // tanpa Content-Type, biar otomatis multipart/form-data
              }
            )
              .then((res) => {
                console.log("Response untuk row", row.id, res);
                return res.json();
              })
              .catch((err) => {
                console.error("Error row", row.id, err);
              });
          })
        );
      }
      // Bkk

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
