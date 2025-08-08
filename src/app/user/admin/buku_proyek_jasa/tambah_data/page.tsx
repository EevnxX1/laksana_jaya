"use client";
import FormTambahData from "@/app/ui/admin/buku_proyek_jasa/tambah_data";
import { InputTbl, SelectTbl } from "@/app/component/input_tbl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { FormatPrice } from "@/app/component/format_number";

interface InputSelectInstansi
  extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export function SelectInstansi({ ...rest }: InputSelectInstansi) {
  const [instansi, setInstansi] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/instansi") // sesuaikan URL
      .then((res) => res.json())
      .then((data) => setInstansi(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);
  return (
    <SelectTbl {...rest} classPage="mb-7" labelValue="Instansi">
      <option defaultValue={"Anda Belum Memilih"} className="text-black">
        ~Pilih Instansi~
      </option>
      {instansi.map((item) => (
        <option key={item.id} value={item.instansi} className="text-black">
          {item.instansi}
        </option>
      ))}
    </SelectTbl>
  );
}

export default function page() {
  const [Tanggal, setTanggal] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [Pekerjaan, setPekerjaan] = useState("");
  const [Sub_kegiatan, setSub_kegiatan] = useState("");
  const [Tahun_anggaran, setTahun_anggaran] = useState("");
  const [Nilai_pekerjaan, setNilai_pekerjaan] = useState("");
  const [FormatNilai_pekerjaan, setFormatNilai_pekerjaan] = useState("");
  const router = useRouter(); // Hook navigasi

  useEffect(() => {
    const now = new Date();
    const formatted = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    setTanggal(formatted);
  }, []);

  // HILANGKAN TITIK DI SINI UNTUK NILAI ASLI
  useEffect(() => {
    const cleanedNilaiPekerjaan = FormatNilai_pekerjaan.replace(/\./g, "");
    setNilai_pekerjaan(cleanedNilaiPekerjaan);
  }, [FormatNilai_pekerjaan]);

  const handleInputChange = (event: any) => {
    // Ambil nilai dari input saat ini
    const rawValue = event.target.value;

    // Bersihkan nilai dari titik, lalu format ulang
    const formattedValue = FormatPrice(rawValue);

    // Update state dengan nilai yang sudah diformat
    setFormatNilai_pekerjaan(formattedValue);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Format nilai pekerjaan = ", FormatNilai_pekerjaan);
    console.log("nilai pekerjaan = ", Nilai_pekerjaan);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/bp_jasa/tambah_data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tanggal: Tanggal,
          instansi: Instansi,
          tahun_anggaran: Tahun_anggaran,
          nama_pekerjaan: Pekerjaan,
          nilai_pekerjaan: Nilai_pekerjaan,
          sub_kegiatan: Sub_kegiatan,
        }),
      });

      if (res.status === 201 || res.status === 200) {
        toast.success("Data berhasil disimpan");
        router.push("/user/admin/buku_proyek_jasa");
      } else {
        toast.error("Gagal menyimpan data");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };
  return (
    <FormTambahData onSubmit={handleSubmit}>
      <InputTbl classPage="mb-7" type="date" value={Tanggal} readOnly>
        Tanggal
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
        value={Tahun_anggaran}
        onChange={(e) => setTahun_anggaran(e.target.value)}
      >
        Tahun Anggaran
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Pekerjaan}
        onChange={(e) => setPekerjaan(e.target.value)}
      >
        Nama Pekerjaan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        value={FormatNilai_pekerjaan}
        onChange={handleInputChange}
      >
        Nilai Pekerjaan
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Sub_kegiatan}
        onChange={(e) => setSub_kegiatan(e.target.value)}
      >
        Sub Kegiatan
      </InputTbl>
    </FormTambahData>
  );
}
