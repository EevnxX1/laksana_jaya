"use client";
import FormBkkUbahData from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { FormatPrice, FormatNumber } from "@/app/component/format_number";

interface Bkb {
  id: number;
  tanggal: string;
  kd_transaksi: string;
  uraian: string;
  debit: number;
  kredit: number;
}

export default function Page() {
  const [id, setId] = useState<string | null>(null);
  const [Tanggal, setTanggal] = useState("");
  const [KdTransaksi, setKdTransaksi] = useState("");
  const [Uraian, setUraian] = useState("");
  const [Debit, setDebit] = useState("");
  const [FormatDebit, setFormatDebit] = useState("");
  const [Kredit, setKredit] = useState("");
  const [FormatKredit, setFormatKredit] = useState("");
  const [Data, setData] = useState<Bkb[]>([]);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id_bkb"));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkb/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) {
      setTanggal(proyek.tanggal);
      setKdTransaksi(proyek.kd_transaksi);
      setUraian(proyek.uraian);
      setDebit(String(proyek.debit));
      setFormatDebit(FormatNumber(proyek.debit));
      setKredit(String(proyek.kredit));
      setFormatKredit(FormatNumber(proyek.kredit));
    }
  }, [Data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Format Debit = ", FormatDebit);
    console.log("Debit = ", Debit);
    console.log("Format Kredit = ", FormatKredit);
    console.log("Kredit = ", Kredit);

    const formData = new FormData();
    formData.append("tanggal", Tanggal);
    formData.append("kd_transaksi", KdTransaksi);
    formData.append("uraian", Uraian);
    formData.append("debit", Debit);
    formData.append("kredit", Kredit);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bkb/ubah_data/${id}`,
        {
          method: "POST",
          body: formData, // ⬅️ Tanpa headers manual
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Transaksi berhasil Diubah");
        router.push("/user/direktur/buku_kas_besar");
      } else {
        toast.error("Gagal Mengubah Transaksi");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  // HILANGKAN TITIK DI SINI UNTUK NILAI ASLI
  useEffect(() => {
    const cleanedNilaiDebit = FormatDebit.replace(/\./g, "");
    setDebit(cleanedNilaiDebit);
  }, [FormatDebit]);

  useEffect(() => {
    const cleanedNilaiKredit = FormatKredit.replace(/\./g, "");
    setKredit(cleanedNilaiKredit);
  }, [FormatKredit]);

  const handleInputChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatDebit(formattedValue);
  };

  const handleInputChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatKredit(formattedValue);
  };

  return (
    <FormBkkUbahData judul="Form Ubah Transaksi" onSubmit={handleSubmit}>
      <InputTbl classPage="mb-7" value={Tanggal} readOnly>
        Tanggal
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={FormatDebit}
        onChange={handleInputChange1}
      >
        Debit
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={KdTransaksi}
        onChange={(e) => setKdTransaksi(e.target.value)}
      >
        Kode Transaksi
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={FormatKredit}
        onChange={handleInputChange2}
      >
        Kredit
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Uraian}
        onChange={(e) => setUraian(e.target.value)}
      >
        Uraian
      </InputTbl>
    </FormBkkUbahData>
  );
}
