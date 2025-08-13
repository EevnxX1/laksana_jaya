"use client";
import FormBkkUbahData from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { InputTbl } from "@/app/component/input_tbl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FormatPrice, FormatNumber } from "@/app/component/format_number";
import { SelectInstansi } from "@/app/component/SelectInstansi";

interface BpJasa {
  id: number;
  tanggal: string;
  instansi: string;
  nama_pekerjaan: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  nilai_pekerjaan: string;
}

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bpj");
  const [Tanggal, setTanggal] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [Tahun_anggaran, setTahun_anggaran] = useState("");
  const [Pekerjaan, setPekerjaan] = useState("");
  const [Nilai_pekerjaan, setNilai_pekerjaan] = useState("");
  const [Sub_kegiatan, setSub_kegiatan] = useState("");
  const [FormatNilai_pekerjaan, setFormatNilai_pekerjaan] = useState("");
  const [Data, setData] = useState<BpJasa[]>([]);
  const router = useRouter(); // Hook navigasi

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) {
      setTanggal(proyek.tanggal);
      setInstansi(proyek.instansi);
      setPekerjaan(proyek.nama_pekerjaan);
      setSub_kegiatan(proyek.sub_kegiatan);
      setTahun_anggaran(proyek.tahun_anggaran);
      setNilai_pekerjaan(proyek.nilai_pekerjaan);
      const formattedValue = FormatNumber(Number(proyek.nilai_pekerjaan));
      setFormatNilai_pekerjaan(formattedValue);
    }
  }, [Data]);

  // HILANGKAN TITIK DI SINI UNTUK NILAI ASLI
  useEffect(() => {
    const cleanedNilaiPekerjaan = FormatNilai_pekerjaan.replace(/\./g, "");
    setNilai_pekerjaan(cleanedNilaiPekerjaan);
  }, [FormatNilai_pekerjaan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tanggal", Tanggal);
    formData.append("instansi", Instansi);
    formData.append("nama_pekerjaan", Pekerjaan);
    formData.append("sub_kegiatan", Sub_kegiatan);
    formData.append("tahun_anggaran", Tahun_anggaran);
    formData.append("nilai_pekerjaan", Nilai_pekerjaan);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa/ubah_data/${id}`,
        {
          method: "POST",
          body: formData, // ⬅️ Tanpa headers manual
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Proyek Jasa berhasil Diubah");
        router.push("/user/admin/buku_proyek_jasa");
      } else {
        toast.error("Gagal Mengubah Proyek Jasa");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatNilai_pekerjaan(formattedValue);
  };

  return (
    <FormBkkUbahData
      judul="BUKU PROYEK - UBAH PROYEK JASA"
      onSubmit={handleSubmit}
    >
      <InputTbl classPage="mb-7" type="date" value={Tanggal} readOnly>
        Tanggal
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Sub_kegiatan}
        onChange={(e) => setSub_kegiatan(e.target.value)}
      >
        Sub Kegiatan
      </InputTbl>
      <SelectInstansi
        value={Instansi}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setInstansi(e.target.value)
        }
      />
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Pekerjaan}
        onChange={(e) => setPekerjaan(e.target.value)}
      >
        Pekerjaan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Tahun_anggaran}
        onChange={(e) => setTahun_anggaran(e.target.value)}
      >
        Tahun Anggaran
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        placeholder="Contoh : Rp.xxxxxx"
        value={FormatNilai_pekerjaan}
        onChange={handleInputChange}
      >
        Nilai Pekerjaan
      </InputTbl>
    </FormBkkUbahData>
  );
}
