"use client";
import FormBkkUbahData from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { InputTbl, SelectTbl } from "@/app/component/input_tbl";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { FormatPrice, FormatNumber } from "@/app/component/format_number";

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
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bpj");
  const [Tanggal, setTanggal] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [Tahun_anggaran, setTahun_anggaran] = useState("");
  const [Pekerjaan, setPekerjaan] = useState("");
  const [Nilai_pekerjaan, setNilai_pekerjaan] = useState("");
  const [Sub_kegiatan, setSub_kegiatan] = useState("");
  const [FormatNilai_pekerjaan, setFormatNilai_pekerjaan] = useState("");
  const [Data, setData] = useState<any[]>([]);
  const router = useRouter(); // Hook navigasi

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bp_jasa/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) {
      setTanggal(proyek.tanggal);
      setInstansi(proyek.instansi);
      setPekerjaan(proyek.nama_pekerjaan);
      setSub_kegiatan(proyek.sub_kegiatan);
      setTahun_anggaran(proyek.tahun_anggaran);
      setNilai_pekerjaan(proyek.nilai_pekerjaan);
      const formattedValue = FormatNumber(proyek.nilai_pekerjaan);
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
        `http://127.0.0.1:8000/api/bp_jasa/ubah_data/${id}`,
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

  const handleInputChange = (event: any) => {
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
