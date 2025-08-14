"use client";
import FormBkbMasuk from "@/app/ui/direktur/form_bkb_masuk";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";
import { FormatPrice } from "@/app/component/format_number";

export default function Page() {
  const [Tanggal, setTanggal] = useState("");
  const [KdTransaksi, setKdTransaksi] = useState("");
  const [Uraian, setUraian] = useState("");
  const [Debit, setDebit] = useState("");
  const [FormatDebit, setFormatDebit] = useState("0");
  const [Kredit, setKredit] = useState("");
  const [FormatKredit, setFormatKredit] = useState("0");
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const formatted = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggal(formatted);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Format Debit = ", FormatDebit);
    console.log("Debit = ", Debit);
    console.log("Format Kredit = ", FormatKredit);
    console.log("Kredit = ", Kredit);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bkb/tambah_data`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tanggal: Tanggal,
            kd_transaksi: KdTransaksi,
            uraian: Uraian,
            debit: Debit,
            kredit: Kredit,
          }),
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Transaksi berhasil disimpan");
        router.push("/user/direktur/buku_kas_besar");
      } else {
        toast.error("Gagal menyimpan Transaksi");
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
    <FormBkbMasuk onSubmit={handleSubmit}>
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
    </FormBkbMasuk>
  );
}
