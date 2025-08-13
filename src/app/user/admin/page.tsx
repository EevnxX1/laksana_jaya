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

interface Bkk {
  id: number;
  id_bpbarang: number;
  id_bpjasa: number;
  identity: string;
  identity_uk: string;
  tanggal: string;
  instansi: string;
  pekerjaan: string;
  uraian: string;
  harga_satuan: number;
  volume: number;
  satuan: string;
  kb_kas: string;
  upah: string;
  material_kaskecil: string;
  material_kasbesar: string;
  non_material: string;
  dircost: string;
  grand_total: string;
  nota: string;
  debit: string;
  kredit: string;
}

interface BkkWithSaldo extends Bkk {
  Saldo: number;
}

export default function page() {
  return <DashboardTemplate />;
}

export function Saldo() {
  const [Data, setData] = useState<Bkk[]>([]);
  const [Saldo, setSaldo] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Hitung Saldo secara berurutan
  const dataWithSaldo = Data.reduce<BkkWithSaldo[]>((acc, current, index) => {
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
      Saldo, // tambahkan field baru
    });
    return acc;
  }, []);

  useEffect(() => {
    const dataSaldo = dataWithSaldo[dataWithSaldo.length - 1];
    if (dataSaldo) {
      setSaldo(String(dataSaldo.Saldo));
    }
  });
  return <>Rp. {FormatNumber(Number(Saldo))}</>;
}

export function Chart1() {
  const [Data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Mengelompokkan data berdasarkan tanggal menggunakan `reduce`
  const groupedData = Data.reduce((acc, current) => {
    const tanggal = current.tanggal;
    const debit = Number(current.debit) || 0;
    const kredit = Number(current.kredit) || 0;
    const kb_kas = Number(current.kb_kas) || 0;

    if (!acc[tanggal]) {
      // Jika tanggal belum ada, inisialisasi entri baru
      acc[tanggal] = {
        tanggal: tanggal,
        debit: 0,
        kredit: 0,
        kb_kas: 0,
      };
    }

    // Tambahkan nilai dari item saat ini ke total yang sudah ada
    acc[tanggal].debit += debit;
    acc[tanggal].kredit += kredit;
    acc[tanggal].kb_kas += kb_kas;

    return acc;
  }, {});

  // Mengubah objek menjadi array dan menghitung saldo
  const dataWithSaldo = (Object.values(groupedData) as any[]).reduce(
    (acc: any[], current, index) => {
      const totalDebit = current.debit + current.kb_kas;
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
  const [Data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Filter data untuk menghilangkan entri dengan identity_uk = "-"
  const filteredData = Data.filter((item) => item.identity_uk !== "-");

  const groupedData = filteredData.reduce((acc, current) => {
    // Pastikan nama proyek tidak kosong atau null
    const proyekName = current.identity_uk;

    // Cek apakah proyek sudah ada di objek pengelompokan
    if (!acc[proyekName]) {
      // Jika belum ada, inisialisasi entri baru
      acc[proyekName] = {
        proyek: proyekName,
        totalDebit: 0,
      };
    }

    // Tambahkan nilai debit ke totalDebit yang sudah ada
    const debit = Number(current.debit) || 0;
    const kb_kas = Number(current.kb_kas) || 0;
    acc[proyekName].totalDebit += debit + kb_kas;

    return acc;
  }, {});

  const dataProyek = Object.values(groupedData) as {
    proyek: string;
    totalDebit: number;
  }[];

  const data = {
    labels: dataProyek.map((item) => item.proyek),
    datasets: [
      {
        label: "Jumlah Suara",
        data: dataProyek.map((item) => item.totalDebit),
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
  const [Data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Filter data untuk menghilangkan entri dengan instansi = "-"
  const filteredData = Data.filter((item) => item.instansi !== "-");

  // Mengelompokkan data berdasarkan instansi menggunakan `reduce`
  const groupedData = filteredData.reduce((acc, current) => {
    const instansi = current.instansi;
    const debit = Number(current.debit) || 0;
    const kb_kas = Number(current.kb_kas) || 0;

    if (!acc[instansi]) {
      // Jika instansi belum ada, inisialisasi entri baru
      acc[instansi] = {
        instansi: instansi,
        debit: 0,
        kb_kas: 0,
      };
    }

    // Tambahkan nilai dari item saat ini ke total yang sudah ada
    acc[instansi].debit += debit;
    acc[instansi].kb_kas += kb_kas;

    return acc;
  }, {});

  // Mengubah objek menjadi array dan menghitung Debit
  const dataWithDebit = (Object.values(groupedData) as any[]).reduce(
    (acc: any[], current) => {
      const totalDebit = current.debit + current.kb_kas;
      acc.push({
        ...current,
        totalDebit,
      });

      return acc;
    },
    []
  );

  const data = {
    labels: dataWithDebit.map((item) => item.instansi),
    datasets: [
      {
        label: "",
        data: dataWithDebit.map((item) => item.totalDebit),
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
        display: false,
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
  const [Data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Filter data
  const filteredData = Data.filter((item) => item.identity_uk == "buku_barang");

  const datasets = filteredData.map((item, index) => {
    // Anda bisa mengganti warna sesuai kebutuhan
    const colors = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(105, 181, 95, 1)",
      "rgba(36, 115, 52, 1)",
      "rgba(124, 35, 124, 1)",
      "rgba(21, 124, 42, 1)",
    ];
    const colorIndex = index % colors.length;

    return {
      label: item.uraian, // Label untuk setiap titik data
      data: [{ x: item.volume, y: item.harga_satuan }], // Menggunakan index dan harga_satuan
      backgroundColor: colors[colorIndex],
      borderColor: colors[colorIndex],
    };
  });

  const data = {
    datasets: datasets,
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
        display: false,
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
  const [Data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/bkk") // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Filter data
  const filteredData = Data.filter((item) => item.identity_uk == "buku_jasa");

  // Hitung grand_total secara berurutan
  const dataWithGrandTotal = filteredData.reduce(
    (acc: any[], current, index) => {
      const debit = Number(current.debit) || 0;
      const prevGrandTotal = index > 0 ? acc[index - 1].grand_total : 0;
      const grandTotal = prevGrandTotal + debit;

      acc.push({
        ...current,
        grandTotal, // tambahkan field baru
      });

      return acc;
    },
    []
  );

  const datasets = dataWithGrandTotal.map((item, index) => {
    // Anda bisa mengganti warna sesuai kebutuhan
    const colors = [
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(105, 181, 95, 1)",
      "rgba(36, 115, 52, 1)",
      "rgba(124, 35, 124, 1)",
      "rgba(21, 124, 42, 1)",
    ];
    const colorIndex = index % colors.length;

    return {
      label: item.uraian, // Label untuk setiap titik data
      data: [{ x: item.kb_kas, y: item.grandTotal }], // Menggunakan index dan harga_satuan
      backgroundColor: colors[colorIndex],
      borderColor: colors[colorIndex],
    };
  });

  const data = {
    datasets: datasets,
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
        display: false,
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
