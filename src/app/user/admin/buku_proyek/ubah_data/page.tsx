"use client";
import FormBkkUbahData from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { InputTbl } from "@/app/component/input_tbl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormatPrice, FormatNumber } from "@/app/component/format_number";
import { SelectInstansi } from "@/app/component/SelectInstansi";

interface BpBarang {
  id: number;
  tanggal: string;
  nomor_sp: string;
  tgl_sp: string;
  instansi: string;
  pekerjaan: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  mulai_pekerjaan: string;
  selesai_pekerjaan: string;
  label_pekerjaan: string;
  nilai_pekerjaan: string;
}

export default function Page() {
  const [id, setId] = useState<string | null>(null);
  const [Tanggal, setTanggal] = useState("");
  const [Nomor_sp, setNomor_sp] = useState("");
  const [Tgl_sp, setTgl_sp] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [Pekerjaan, setPekerjaan] = useState("");
  const [Sub_kegiatan, setSub_kegiatan] = useState("");
  const [Tahun_anggaran, setTahun_anggaran] = useState("");
  const [Mulai_pekerjaan, setMulai_pekerjaan] = useState("");
  const [Selesai_pekerjaan, setSelesai_pekerjaan] = useState("");
  const [Label_pekerjaan, setLabel_pekerjaan] = useState("");
  const [Nilai_pekerjaan, setNilai_pekerjaan] = useState("");
  const [FormatNilai_pekerjaan, setFormatNilai_pekerjaan] = useState("");
  const [Data, setData] = useState<BpBarang[]>([]);
  const router = useRouter(); // Hook navigasi

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id_bpb"));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) {
      setTanggal(proyek.tanggal);
      setNomor_sp(proyek.nomor_sp);
      setTgl_sp(proyek.tgl_sp);
      setInstansi(proyek.instansi);
      setPekerjaan(proyek.pekerjaan);
      setSub_kegiatan(proyek.sub_kegiatan);
      setTahun_anggaran(proyek.tahun_anggaran);
      setMulai_pekerjaan(proyek.mulai_pekerjaan);
      setSelesai_pekerjaan(proyek.selesai_pekerjaan);
      setLabel_pekerjaan(proyek.label_pekerjaan);
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
    formData.append("nomor_sp", Nomor_sp);
    formData.append("tgl_sp", Tgl_sp);
    formData.append("instansi", Instansi);
    formData.append("pekerjaan", Pekerjaan);
    formData.append("sub_kegiatan", Sub_kegiatan);
    formData.append("tahun_anggaran", Tahun_anggaran);
    formData.append("mulai_pekerjaan", Mulai_pekerjaan);
    formData.append("selesai_pekerjaan", Selesai_pekerjaan);
    formData.append("label_pekerjaan", Label_pekerjaan);
    formData.append("nilai_pekerjaan", Nilai_pekerjaan);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang/ubah_data/${id}`,
        {
          method: "POST",
          body: formData, // ⬅️ Tanpa headers manual
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Proyek Barang berhasil Diubah");
        router.push("/user/admin/buku_proyek");
      } else {
        toast.error("Gagal Mengubah Proyek Barang");
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
      judul="BUKU PROYEK - UBAH PROYEK BARANG"
      onSubmit={handleSubmit}
    >
      <InputTbl classPage="mb-7" type="date" value={Tanggal} readOnly>
        Tanggal
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="date"
        value={Tgl_sp}
        onChange={(e) => setTgl_sp(e.target.value)}
      >
        Tanggal SP
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Nomor_sp}
        onChange={(e) => setNomor_sp(e.target.value)}
      >
        Nomor SP
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
        value={Label_pekerjaan}
        onChange={(e) => setLabel_pekerjaan(e.target.value)}
      >
        Label Pekerjaan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="date"
        value={Mulai_pekerjaan}
        onChange={(e) => setMulai_pekerjaan(e.target.value)}
      >
        Mulai Pelaksanaan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="date"
        value={Selesai_pekerjaan}
        onChange={(e) => setSelesai_pekerjaan(e.target.value)}
      >
        Selesai Pelaksanaan
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
