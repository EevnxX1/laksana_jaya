"use client";
import FormTambahData from "@/app/ui/admin/buku_proyek/tambah_data";
import { InputTbl } from "@/app/component/input_tbl";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormatPrice } from "@/app/component/format_number";
import { SelectInstansi } from "@/app/component/SelectInstansi";

export default function Page() {
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
  const router = useRouter(); // Hook navigasi

  useEffect(() => {
    const now = new Date();
    const formatted = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggal(formatted);
  }, [Tanggal]);

  // HILANGKAN TITIK DI SINI UNTUK NILAI ASLI
  useEffect(() => {
    const cleanedNilaiPekerjaan = FormatNilai_pekerjaan.replace(/\./g, "");
    setNilai_pekerjaan(cleanedNilaiPekerjaan);
  }, [FormatNilai_pekerjaan]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("nilai pekerjaan = ", Nilai_pekerjaan);
    console.log("Format nilai pekerjaan = ", FormatNilai_pekerjaan);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang/tambah_data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tanggal: Tanggal,
            nomor_sp: Nomor_sp,
            tgl_sp: Tgl_sp,
            instansi: Instansi,
            pekerjaan: Pekerjaan,
            sub_kegiatan: Sub_kegiatan,
            tahun_anggaran: Tahun_anggaran,
            mulai_pekerjaan: Mulai_pekerjaan,
            selesai_pekerjaan: Selesai_pekerjaan,
            label_pekerjaan: Label_pekerjaan,
            nilai_pekerjaan: Nilai_pekerjaan,
          }),
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Data berhasil disimpan");
        router.push("/user/admin/buku_proyek");
      } else {
        toast.error("Gagal menyimpan data");
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
    <FormTambahData onSubmit={handleSubmit}>
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
        placeholder="Contoh : PRJ-B1-001/XII/2024"
        value={Nomor_sp}
        onChange={(e) => setNomor_sp(e.target.value)}
      >
        Nomor SP
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        placeholder="Contoh : Pengadaan Barang"
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
        placeholder="Contoh : Manufaktur"
        value={Pekerjaan}
        onChange={(e) => setPekerjaan(e.target.value)}
      >
        Pekerjaan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        placeholder="Contoh : 2025"
        value={Tahun_anggaran}
        onChange={(e) => setTahun_anggaran(e.target.value)}
      >
        Tahun Anggaran
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        placeholder="Contoh: Mebel"
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
    </FormTambahData>
  );
}
