"use client";
import React from "react";
import { useState, useEffect } from "react";
import DashboardTemplate from "@/app/ui/dashboard_teknisi";
import { Pie } from "react-chartjs-2";
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
import { color } from "chart.js/helpers";

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

export function Chart1() {
  const [Data, setData] = useState<any[]>([]);
  const [roleCounts, setRoleCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/user/all") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Hitung jumlah setiap role setiap kali data 'users' berubah
  useEffect(() => {
    if (Data.length > 0) {
      const counts = Data.reduce((acc, user) => {
        // Ambil role dari setiap objek user
        const role = user.role;
        // Jika role sudah ada di objek 'acc', tambahkan 1
        // Jika belum, inisialisasi dengan 1
        acc[role] = (acc[role] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number }); // Inisialisasi objek kosong
      setRoleCounts(counts);
    }
  }, [Data]); // Jalankan ulang effect ini hanya saat 'users' berubah

  const data = {
    labels: Object.keys(roleCounts),
    datasets: [
      {
        label: "Jumlah User",
        data: Object.values(roleCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
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
          margin: "50",
        },
      },
    },
  };
  return (
    <div style={{ width: "80%" }}>
      <Pie data={data} options={options as any} />
    </div>
  );
}

export function Chart2() {
  const [DataBarang, setDataBarang] = useState<any[]>([]);
  const [DataJasa, setDataJasa] = useState<any[]>([]);
  const [InstansiCounts, setInstansiCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bp_barang") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setDataBarang)
      .catch((err) => console.error(err));

    fetch("http://127.0.0.1:8000/api/bp_jasa") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setDataJasa)
      .catch((err) => console.error(err));
  }, []);

  // Hitung jumlah setiap role setiap kali data 'users' berubah
  useEffect(() => {
    // Pastikan kedua data sudah terisi
    if (DataBarang.length > 0 || DataJasa.length > 0) {
      // 1. Gabungkan kedua array menjadi satu
      const combinedData = [...DataBarang, ...DataJasa];

      // 2. Lakukan satu operasi reduce() pada array gabungan
      const counts = combinedData.reduce((acc, item) => {
        // Ambil instansi dari setiap item
        const instansi = item.instansi;
        // Tambahkan 1 ke instansi yang sudah ada, atau inisialisasi dengan 1
        acc[instansi] = (acc[instansi] || 0) + 1;
        return acc;
      }, {} as { [key: string]: number });

      // 3. Simpan hasil perhitungan gabungan ke dalam state baru
      setInstansiCounts(counts);
    }
  }, [DataBarang, DataJasa]); // Dependency array tetap sama

  const data = {
    labels: Object.keys(InstansiCounts),
    datasets: [
      {
        label: "Jumlah Proyek",
        data: Object.values(InstansiCounts),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
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
          margin: "50",
        },
      },
    },
  };
  return (
    <div style={{ width: "80%" }}>
      <Pie data={data} options={options as any} />
    </div>
  );
}
