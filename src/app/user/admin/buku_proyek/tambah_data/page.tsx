import FormTambahData from "@/app/ui/admin/buku_proyek/tambah_data";
import { InputTbl } from "@/app/component/input_tbl";
export default function page() {
  return (
    <FormTambahData>
      <InputTbl>Tanggal</InputTbl>
      <InputTbl>Nama Pekerjaan</InputTbl>
      <InputTbl>Instansi</InputTbl>
      <InputTbl>Sub Kegiatan</InputTbl>
      <InputTbl>Mulai Pelaksanaan</InputTbl>
      <InputTbl>Selesai Pelaksanaan</InputTbl>
      <InputTbl>Nilai Pekerjaan</InputTbl>
      <InputTbl>Label Pekerjaan</InputTbl>
    </FormTambahData>
  );
}
