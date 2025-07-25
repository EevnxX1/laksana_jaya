"use client";
import TabelBukuKantor from "@/app/ui/admin/buku_kantor/tbl_bk";
import { Table } from "@/app/component/table";
import { useState, useEffect } from "react";
import { LinkImage } from "@/app/component/link_image";

export default function page() {
  return (
    <TabelBukuKantor>
      <TabelDataKantor />
    </TabelBukuKantor>
  );
}

interface IsiTabelDataKantor {
  id: number;
  tanggal: string;
  uraian: string;
  debit: string;
}

export function TabelDataKantor() {
  const [Data, setData] = useState<IsiTabelDataKantor[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk/detail_kantor") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  const dataTh = ["No", "Tanggal", "Uraian", "Uang Keluar"];
  const dataTd = Data.map((list, index) => [
    index + 1,
    list.tanggal,
    list.uraian,
    list.debit,
  ]);
  return <Table dataTd={dataTd} dataTh={dataTh} source="info" />;
}

interface TabelBarangNotaBelanja {
  id: number;
  nota: string;
}

export function LinkImageNotaKantor() {
  const [data, setData] = useState<TabelBarangNotaBelanja[]>([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/detail_kantor`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      {data.map((list, index) => (
        <LinkImage key={index} text={""} href="" srcImage={list.nota} />
      ))}
    </>
  );
}
