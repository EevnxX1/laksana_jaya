"use client";
import { SelectTbl } from "@/app/component/input_tbl";
import { useEffect, useState } from "react";

interface instansi {
  id: number;
  instansi: string;
  post: string;
  alamat_instansi: string;
  no_telp: string;
  npwp: string;
}

export function SelectInstansi({
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [instansi, setInstansi] = useState<instansi[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/instansi`) // sesuaikan URL
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
