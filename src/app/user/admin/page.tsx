"use client";
import React from "react";
import DashboardTemplate from "@/app/ui/dashboard_admin";
import { Line, Pie, Bar } from "react-chartjs-2";
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
