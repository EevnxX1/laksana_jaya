"use client";
import FormTambahData from "@/app/ui/admin/buku_proyek/tambah_data";
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
        <option key={item.id} value={item.post} className="text-black">
          {item.post}
        </option>
      ))}
    </SelectTbl>
  );
}

export default function page() {
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
  }, []);

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
        "http://127.0.0.1:8000/api/bp_barang/tambah_data",
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

  const handleInputChange = (event: any) => {
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
