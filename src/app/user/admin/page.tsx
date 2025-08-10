"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FormatNumber } from "@/app/component/format_number";
import DashboardTemplate from "@/app/ui/dashboard_admin";
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

export function Saldo() {
  const [Data, setData] = useState<any[]>([]);
  const [Saldo, setSaldo] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
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
    for (let index = 0; index > dataWithSaldo.length; index++) {
      console.log("data = ", dataWithSaldo[index]);
      if (dataWithSaldo[index].id == dataWithSaldo.length) {
        setSaldo(dataWithSaldo[index].Saldo);
        console.log("datawithsaldo = ", dataWithSaldo[index].Saldo);
      }
    }
    console.log("saldo = ", Saldo);
  });
  return <>Rp. {FormatNumber(Number(Saldo))}</>;
}

export function Chart1() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Penjualan Bulanan",
        data: [33, 53, 85, 41, 44, 65],
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.6)",
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
    <div style={{ width: "100%" }}>
      <Line data={data} options={options as any} />
    </div>
  );
}

export function Chart2() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "Jumlah Suara",
        data: [300, 50, 100],
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
    <div style={{ width: "90%" }}>
      <Pie data={data} options={options as any} />
    </div>
  );
}

export function Chart3() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Penjualan Bulanan",
        data: [12, 19, 3, 5, 2, 3, 5],
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
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
          color: "#ffffff",
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu X (kategori)
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Mengubah warna grid sumbu X menjadi transparan putih
        },
      },
      x: {
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu X (kategori)
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Mengubah warna grid sumbu X menjadi transparan putih
        },
      },
    },
  };
  return (
    <div style={{ width: "100%" }}>
      <Bar data={data} options={options as any} />
    </div>
  );
}

export function Chart4() {
  const data = {
    datasets: [
      {
        label: "Titik Data",
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 10 },
          { x: 5, y: 15 },
          { x: 25, y: 22 },
          { x: 30, y: 18 },
        ],
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "linear", // Penting: Sumbu X harus bertipe 'linear'
        position: "bottom",
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu X (kategori)
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Mengubah warna grid sumbu X menjadi transparan putih
        },
      },
      y: {
        type: "linear", // Penting: Sumbu Y harus bertipe 'linear'
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu X (kategori)
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Mengubah warna grid sumbu X menjadi transparan putih
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <Scatter data={data} options={options as any} />
    </div>
  );
}

export function Chart5() {
  const data = {
    datasets: [
      {
        label: "Titik Data",
        data: [
          { x: 10, y: 20 },
          { x: 15, y: 10 },
          { x: 5, y: 15 },
          { x: 25, y: 22 },
          { x: 30, y: 18 },
        ],
        backgroundColor: "rgba(255, 99, 132, 1)",
        borderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        type: "linear", // Penting: Sumbu X harus bertipe 'linear'
        position: "bottom",
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu X (kategori)
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Mengubah warna grid sumbu X menjadi transparan putih
        },
      },
      y: {
        type: "linear", // Penting: Sumbu Y harus bertipe 'linear'
        ticks: {
          color: "#ffffff", // Mengubah warna teks label sumbu X (kategori)
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)", // Mengubah warna grid sumbu X menjadi transparan putih
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff",
        },
      },
    },
  };

  return (
    <div style={{ width: "100%" }}>
      <Scatter data={data} options={options as any} />
    </div>
  );
}
