"use client";
import { FormTambahData } from "@/app/ui/admin/buku_kas_kecil/ubah_data/form_ubahData";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputTbl, SelectTbl } from "@/app/component/input_tbl";
import { toast } from "react-toastify";

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  alamat: string;
  no_hp: string;
  role: string;
}

export default function Page() {
  const [id, setId] = useState<string | null>(null);
  const [Name, setName] = useState("");
  const [Username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Alamat, setAlamat] = useState("");
  const [NoHp, setNoHp] = useState("");
  const [Role, setRole] = useState("");
  const [Data, setData] = useState<Users[]>([]);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setId(params.get("id_user"));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const proyek = Data[0];
    if (proyek) {
      setName(proyek.name);
      setUsername(proyek.username);
      setEmail(proyek.email);
      setAlamat(proyek.alamat);
      setNoHp(proyek.no_hp);
      setRole(proyek.role);
    }
  }, [Data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", Name);
    formData.append("username", Username);
    formData.append("email", Email);
    formData.append("password", Password);
    formData.append("alamat", Alamat);
    formData.append("no_hp", NoHp);
    formData.append("role", Role);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/updated/${id}`,
        {
          method: "POST",
          body: formData, // ⬅️ Tanpa headers manual
        }
      );

      if (res.status === 201 || res.status === 200) {
        toast.success("Data User berhasil Di Ubah");
        router.push("/user/teknisi/data_user");
      } else {
        toast.error("Data User Gagal Di Ubah");
      }
    } catch (error) {
      console.error(error);
      toast.error("Terjadi error saat submit");
    }
  };

  return (
    <FormTambahData
      btn="Ubah Data"
      judul="Form Ubah Data User"
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
        placeholder="Isi Jika Ingin Diubah"
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
