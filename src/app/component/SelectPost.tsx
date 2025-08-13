"use client";
import { useState, useEffect } from "react";
import { SelectTbl } from "@/app/component/input_tbl";

interface SeletectedValue {
  id: string;
  post: string;
  instansi: string;
  pekerjaan: string;
  label_pekerjaan: string;
  nama_pekerjaan: string;
  id_bpbarang: string;
  id_bpjasa: string;
}

interface InputSelectPost
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onPostSelected?: (post: SeletectedValue) => void; // fungsi callback
  id_post?: string | null;
}

export function SelectPostBarang({ onPostSelected, ...rest }: InputSelectPost) {
  const [post, setpost] = useState<SeletectedValue[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang`) // sesuaikan URL
      .then((res) => res.json())
      .then((data) => setpost(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);

    // Temukan data Post berdasarkan id yang dipilih
    const selectedPost = post.find(
      (item) => Number(item.id) === parseInt(selectedId)
    );
    if (onPostSelected && selectedPost) {
      onPostSelected(selectedPost);
    }
  };

  return (
    <SelectTbl
      {...rest}
      value={selectedId}
      onChange={handleChange}
      classPage="mb-7"
      labelValue="Post"
    >
      <option defaultValue={"Anda Belum Memilih"} className="text-black">
        ~Pilih Instansi~
      </option>
      {post.map((item) => (
        <option key={item.id} value={item.id} className="text-black">
          {item.post}
        </option>
      ))}
    </SelectTbl>
  );
}

export function SelectPostJasa({ onPostSelected, ...rest }: InputSelectPost) {
  const [post, setpost] = useState<SeletectedValue[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa`) // sesuaikan URL
      .then((res) => res.json())
      .then((data) => setpost(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);

    // Temukan data Post berdasarkan id yang dipilih
    const selectedPost = post.find(
      (item) => Number(item.id) === parseInt(selectedId)
    );
    if (onPostSelected && selectedPost) {
      onPostSelected(selectedPost);
    }
  };

  return (
    <SelectTbl
      {...rest}
      value={selectedId}
      onChange={handleChange}
      classPage="mb-7"
      labelValue="Post"
    >
      <option defaultValue={"Anda Belum Memilih"} className="text-black">
        ~Pilih Post~
      </option>
      {post.map((item) => (
        <option key={item.id} value={item.id} className="text-black">
          {item.post}
        </option>
      ))}
    </SelectTbl>
  );
}

export function SelectPostBarangEdit({
  onPostSelected,
  id_post,
  ...rest
}: InputSelectPost) {
  const [post, setpost] = useState<SeletectedValue[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [Data, setData] = useState<SeletectedValue[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/edit/${id_post}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang`) // sesuaikan URL
      .then((res) => res.json())
      .then((data) => setpost(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, [id_post]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);

    // Temukan data Post berdasarkan id yang dipilih
    const selectedPost = post.find(
      (item) => Number(item.id) === parseInt(selectedId)
    );
    if (onPostSelected && selectedPost) {
      onPostSelected(selectedPost);
    }
  };

  return (
    <SelectTbl
      {...rest}
      value={selectedId}
      onChange={handleChange}
      classPage="mb-7"
      labelValue="Post"
    >
      {post.map((item) =>
        item.id == Data[0].id_bpbarang ? (
          <option key={item.id} value={item.id} className="text-black">
            {item.post + " (Before)"}
          </option>
        ) : null
      )}
      {post.map((item) =>
        item.id !== Data[0].id_bpbarang ? (
          <option key={item.id} value={item.id} className="text-black">
            {item.post}
          </option>
        ) : null
      )}
    </SelectTbl>
  );
}

export function SelectPostJasaEdit({
  onPostSelected,
  id_post,
  ...rest
}: InputSelectPost) {
  const [post, setpost] = useState<SeletectedValue[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [Data, setData] = useState<SeletectedValue[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/edit/${id_post}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa`) // sesuaikan URL
      .then((res) => res.json())
      .then((data) => setpost(data))
      .catch((err) => console.error("Gagal ambil data:", err));
  }, [id_post]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedId(selectedId);

    // Temukan data Post berdasarkan id yang dipilih
    const selectedPost = post.find(
      (item) => Number(item.id) === parseInt(selectedId)
    );
    if (onPostSelected && selectedPost) {
      onPostSelected(selectedPost);
    }
  };

  return (
    <SelectTbl
      {...rest}
      value={selectedId}
      onChange={handleChange}
      classPage="mb-7"
      labelValue="Post"
    >
      {post.map((item) =>
        item.id == Data[0].id_bpjasa ? (
          <option key={item.id} value={item.id} className="text-black">
            {item.post + " (Before)"}
          </option>
        ) : null
      )}
      {post.map((item) =>
        item.id !== Data[0].id_bpjasa ? (
          <option key={item.id} value={item.id} className="text-black">
            {item.post}
          </option>
        ) : null
      )}
    </SelectTbl>
  );
}
