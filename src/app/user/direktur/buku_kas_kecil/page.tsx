"use client";
import React, { useState, useEffect } from "react";
import { TabelBukuKasKecilDirektur } from "@/app/ui/admin/buku_kas_kecil/tbl_bkk";
import { Table } from "@/app/component/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FormatNumber } from "@/app/component/format_number";

interface BukuKasKecil {
  id: number;
  identity: string;
  identity_uk: string;
  tanggal: string;
  uraian: string;
  instansi: string;
  pekerjaan: string;
  debit: string;
  kredit: string;
  kb_kas: number;
}

export default function page() {
  const [data, setData] = useState<BukuKasKecil[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let kredit = 0;
    let debit = 0;
    for (let index = 0; index < data.length; index++) {
      kredit += Number(data[index].kredit); // pastikan dikonversi ke number
      debit += Number(data[index].debit); // pastikan dikonversi ke number
    }
    const totalSaldo = kredit - debit;
    console.log(totalSaldo);
  });

  const dataTh = [
    "No",
    "Tanggal",
    "Uraian",
    "Instansi",
    "Pekerjaan",
    "Debit",
    "Kredit",
    "Saldo",
  ];

  // Hitung Saldo secara berurutan
  const dataWithSaldo = data.reduce((acc: any[], current, index) => {
    const debit = Number(current.debit) || 0;
    const kredit = Number(current.kredit) || 0;
    const kb_kas = Number(current.kb_kas) || 0;
    const prevSaldo = index > 0 ? acc[index - 1].Saldo : 0;
    const totalDebit = debit + kb_kas;
    let operate = kredit - totalDebit;
    operate += prevSaldo;
    const Saldo = operate;
    acc.push({
      ...current,
      totalDebit,
      Saldo, // tambahkan field baru
    });
    return acc;
  }, []);

  const dataTd = dataWithSaldo.map((row, index) => [
    index + 1,
    row.tanggal,
    row.uraian,
    row.instansi,
    row.pekerjaan,
    "Rp." + FormatNumber(row.totalDebit),
    "Rp." + FormatNumber(row.kredit),
    "Rp." + FormatNumber(row.Saldo),
  ]);

  return (
    <TabelBukuKasKecilDirektur>
      <Table source="info" dataTh={dataTh} dataTd={dataTd} />
    </TabelBukuKasKecilDirektur>
  );
}
