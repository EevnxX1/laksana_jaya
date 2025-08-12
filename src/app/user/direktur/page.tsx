"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FormatNumber } from "@/app/component/format_number";
import DashboardTemplate from "@/app/ui/dahsboard_direktur";
import { Line, Pie, Bar, Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Daftarkan komponen Chart.js yang akan digunakan
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function page() {
  return <DashboardTemplate />;
}

export function Saldo() {
  const [Data, setData] = useState<any[]>([]);
  const [Saldo, setSaldo] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkb") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Hitung Saldo secara berurutan
  const dataWithSaldo = Data.reduce((acc: any[], current, index) => {
    const debit = Number(current.debit) || 0;
    const kredit = Number(current.kredit) || 0;
    const prevSaldo = index > 0 ? acc[index - 1].Saldo : 0;
    let operate = kredit - debit;
    operate += prevSaldo;
    const Saldo = operate;
    acc.push({
      ...current,
      Saldo, // tambahkan field baru
    });
    return acc;
  }, []);

  useEffect(() => {
    const dataSaldo = dataWithSaldo[dataWithSaldo.length - 1];
    if (dataSaldo) {
      setSaldo(dataSaldo.Saldo);
    }
  });
  return <>Rp. {FormatNumber(Number(Saldo))}</>;
}

export function Chart1() {
  const [Data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkb") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Mengelompokkan data berdasarkan tanggal menggunakan `reduce`
  const groupedData = Data.reduce((acc, current) => {
    const tanggal = current.tanggal;
    const debit = Number(current.debit) || 0;
    const kredit = Number(current.kredit) || 0;

    if (!acc[tanggal]) {
      // Jika tanggal belum ada, inisialisasi entri baru
      acc[tanggal] = {
        tanggal: tanggal,
        debit: 0,
        kredit: 0,
      };
    }

    // Tambahkan nilai dari item saat ini ke total yang sudah ada
    acc[tanggal].debit += debit;
    acc[tanggal].kredit += kredit;

    return acc;
  }, {});

  // Mengubah objek menjadi array dan menghitung saldo
  const dataWithSaldo = (Object.values(groupedData) as any[]).reduce(
    (acc: any[], current, index) => {
      const totalDebit = current.debit;
      const prevSaldo = index > 0 ? acc[index - 1].Saldo : 0;
      const Saldo = prevSaldo + current.kredit - totalDebit;

      acc.push({
        ...current,
        totalDebit,
        Saldo,
      });

      return acc;
    },
    []
  );

  const data = {
    labels: dataWithSaldo.map((item) => item.tanggal),
    datasets: [
      {
        label: "Total Saldo",
        data: dataWithSaldo.map((item) => item.Saldo),
        fill: false,
        backgroundColor: "rgb(0, 246, 16)",
        borderColor: "rgba(0, 246, 16, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff", // Mengubah warna teks legend menjadi putih
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu X menjadi putih
        },
        grid: {
          color: "gray", // Opsional: Mengubah warna grid sumbu X
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu Y menjadi putih
        },
        grid: {
          color: "gray", // Opsional: Mengubah warna grid sumbu Y
        },
      },
    },
  };
  return (
    <div style={{ width: "90%" }}>
      <Line data={data} options={options as any} />
    </div>
  );
}

export function Chart2() {
  const [Data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkb") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Filter data untuk menghilangkan entri dengan identity_uk = "-"
  const filteredData = Data.filter((item) => item.kredit == 0);

  // Mengelompokkan data berdasarkan tanggal menggunakan `reduce`
  const groupedData = filteredData.reduce((acc, current) => {
    const tanggal = current.tanggal;
    const debit = Number(current.debit) || 0;

    if (!acc[tanggal]) {
      // Jika tanggal belum ada, inisialisasi entri baru
      acc[tanggal] = {
        tanggal: tanggal,
        debit: 0,
      };
    }

    // Tambahkan nilai dari item saat ini ke total yang sudah ada
    acc[tanggal].debit += debit;

    return acc;
  }, {});

  // Mengubah objek menjadi array dan menghitung saldo
  const dataWithDebit = (Object.values(groupedData) as any[]).reduce(
    (acc: any[], current) => {
      const totalDebit = current.debit;

      acc.push({
        ...current,
        totalDebit,
      });

      return acc;
    },
    []
  );

  const data = {
    labels: dataWithDebit.map((item) => item.tanggal),
    datasets: [
      {
        label: "Total Pengeluaran",
        data: dataWithDebit.map((item) => item.totalDebit),
        fill: false,
        backgroundColor: "rgb(250, 0, 0)",
        borderColor: "rgba(250, 0, 0, 0.6)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff", // Mengubah warna teks legend menjadi putih
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu X menjadi putih
        },
        grid: {
          color: "gray", // Opsional: Mengubah warna grid sumbu X
        },
      },
      y: {
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu Y menjadi putih
        },
        grid: {
          color: "gray", // Opsional: Mengubah warna grid sumbu Y
        },
      },
    },
  };
  return (
    <div style={{ width: "90%" }}>
      <Line data={data} options={options as any} />
    </div>
  );
}
