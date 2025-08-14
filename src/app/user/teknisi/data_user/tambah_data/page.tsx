"use client";
import { FormTambahData } from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { InputTbl, SelectTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";

export default function Page() {
  const [Name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Alamat, setAlamat] = useState("");
  const [NoHp, setNoHp] = useState("");
  const [Role, setRole] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: Name,
            username: Username,
            email: Email,
            password: Password,
            alamat: Alamat,
            no_hp: NoHp,
            role: Role,
          }),
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("User berhasil Di Tambahkan");
        router.push("/user/teknisi/data_user");
      } else {
        toast.error("User Gagal Di tambahkan");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  return (
    <FormTambahData
      judul="Form Data User"
      btn="Tambah User"
      onSubmit={handleSubmit}
    >
      <InputTbl
        classPage="mb-7"
        type="text"
        value={Name}
        onChange={(e) => setName(e.target.value)}
      >
        Nama
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Username}
        onChange={(e) => setUsername(e.target.value)}
      >
        Username
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
      >
        Email
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={Alamat}
        onChange={(e) => setAlamat(e.target.value)}
      >
        Alamat
      </InputTbl>
      <InputTbl
        classPage="mb-7"
        value={NoHp}
        onChange={(e) => setNoHp(e.target.value)}
      >
        Nomer Hp
      </InputTbl>
      <SelectTbl
        classPage="mb-7"
        labelValue="Role"
        value={Role}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setRole(e.target.value)
        }
      >
        <option defaultValue={""} className="text-black">
          ~Pilih Role~
        </option>
        <option value="admin" className="text-black">
          Admin
        </option>
        <option value="direktur" className="text-black">
          Direktur
        </option>
        <option value="teknisi" className="text-black">
          Teknisi
        </option>
      </SelectTbl>
    </FormTambahData>
  );
}
