"use client";
import React from "react";
import { useState, useEffect } from "react";
import { FormatNumber } from "./format_number";
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
  ChartOptions,
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

interface BkkWithTanggal {
  tanggal: string;
  debit: number;
  kredit: number;
  kb_kas: number;
}

interface BkkWithTotalSaldo extends BkkWithTanggal {
  totalDebit: number;
  Saldo: number;
}

interface BkkWithProyek {
  proyek: string;
  totalDebit: number;
}

interface BkkWithInstansi {
  instansi: string;
  debit: number;
  kb_kas: number;
}

interface BkkWithTotalDebit extends BkkWithInstansi {
  totalDebit: number;
}

interface BkkWithGrandTotal extends Bkk {
  grandTotal: number;
}

interface Bkb {
  id: number;
  tanggal: string;
  kd_transaksi: string;
  uraian: string;
  debit: number;
  kredit: number;
}

interface BkbWithSaldo extends Bkb {
  Saldo: number;
}

interface BkbWithTanggal {
  tanggal: string;
  debit: number;
  kredit: number;
}

interface BkbWithTotalDebit extends BkbWithTanggal {
  totalDebit: number;
  Saldo: number;
}

interface BkbWithTgl {
  tanggal: string;
  debit: number;
}

interface BkbWithTotDebit extends BkbWithTgl {
  totalDebit: number;
}

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

interface BpBarang {
  id: number;
  tanggal: string;
  nomor_sp: string;
  tgl_sp: string;
  instansi: string;
  pekerjaan: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  mulai_pekerjaan: string;
  selesai_pekerjaan: string;
  label_pekerjaan: string;
  nilai_pekerjaan: string;
}

interface BpJasa {
  id: number;
  tanggal: string;
  instansi: string;
  nama_pekerjaan: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  nilai_pekerjaan: string;
}

export function Saldo() {
  const [Data, setData] = useState<Bkk[]>([]);
  const [Saldo, setSaldo] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [Data]);

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
  }, [dataWithSaldo]);
  return <>Rp. {FormatNumber(Number(Saldo))}</>;
}

export function Saldo2() {
  const [Data, setData] = useState<Bkb[]>([]);
  const [Saldo, setSaldo] = useState("");

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkb`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Hitung Saldo secara berurutan
  const dataWithSaldo = Data.reduce<BkbWithSaldo[]>((acc, current, index) => {
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
      setSaldo(String(dataSaldo.Saldo));
    }
  }, [dataWithSaldo]);
  return <>Rp. {FormatNumber(Number(Saldo))}</>;
}

export function Chart1() {
  const [Data, setData] = useState<Bkk[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Mengelompokkan data berdasarkan tanggal menggunakan `reduce`
  const groupedDataObj = Data.reduce(
    (acc: Record<string, BkkWithTanggal>, current) => {
      const tanggal = current.tanggal;
      const debit = Number(current.debit) || 0;
      const kredit = Number(current.kredit) || 0;
      const kb_kas = Number(current.kb_kas) || 0;

      if (!acc[tanggal]) {
        acc[tanggal] = {
          tanggal,
          debit: 0,
          kredit: 0,
          kb_kas: 0,
        };
      }

      acc[tanggal].debit += debit;
      acc[tanggal].kredit += kredit;
      acc[tanggal].kb_kas += kb_kas;

      return acc;
    },
    {}
  );

  // Ubah object jadi array dan urutkan tanggalnya
  const groupedData = Object.values(groupedDataObj).sort(
    (a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime()
  );

  // Hitung saldo
  const dataWithSaldo = groupedData.reduce(
    (acc: BkkWithTotalSaldo[], current, index) => {
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

  const options: ChartOptions<"line"> = {
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
      <Line data={data} options={options} />
    </div>
  );
}

export function Chart2() {
  const [Data, setData] = useState<Bkk[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Filter data untuk menghilangkan entri dengan identity_uk = "-"
  const filteredData = Data.filter((item) => item.identity_uk !== "-");

  const groupedDataObj = filteredData.reduce(
    (acc: Record<string, BkkWithProyek>, current) => {
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
    },
    {}
  );

  const dataProyek = Object.values(groupedDataObj) as {
    proyek: string;
    totalDebit: number;
  }[];

  const data = {
    labels: dataProyek.map((item) => item.proyek),
    datasets: [
      {
        label: "Jumlah Pengeluaran",
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

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff", // Mengubah warna teks legend menjadi putih
        },
      },
    },
  };
  return (
    <div style={{ width: "90%" }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export function Chart3() {
  const [Data, setData] = useState<Bkk[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Filter data untuk menghilangkan entri dengan instansi = "-"
  const filteredData = Data.filter((item) => item.instansi !== "-");

  // Mengelompokkan data berdasarkan instansi menggunakan `reduce`
  const groupedData = filteredData.reduce(
    (acc: Record<string, BkkWithInstansi>, current) => {
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
    },
    {}
  );

  // Mengubah objek menjadi array dan menghitung Debit
  const dataWithDebit = (
    Object.values(groupedData) as BkkWithInstansi[]
  ).reduce((acc: BkkWithTotalDebit[], current) => {
    const totalDebit = current.debit + current.kb_kas;
    acc.push({
      ...current,
      totalDebit,
    });

    return acc;
  }, []);

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

  const options: ChartOptions<"bar"> = {
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
      <Bar data={data} options={options} />
    </div>
  );
}

export function Chart4() {
  const [Data, setData] = useState<Bkk[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk`) // endpoint dari Laravel
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
      data: [{ x: item.volume, y: item.debit }], // Menggunakan index dan harga_satuan
      backgroundColor: colors[colorIndex],
      borderColor: colors[colorIndex],
    };
  });

  const data = {
    datasets: datasets,
  };

  const options: ChartOptions<"scatter"> = {
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
      <Scatter data={data} options={options} />
    </div>
  );
}

export function Chart5() {
  const [Data, setData] = useState<Bkk[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Filter data
  const filteredData = Data.filter((item) => item.identity_uk == "buku_jasa");

  // Hitung grand_total secara berurutan
  const dataWithGrandTotal = filteredData.reduce(
    (acc: BkkWithGrandTotal[], current, index) => {
      const debit = Number(current.debit) || 0;
      const prevGrandTotal = index > 0 ? acc[index - 1].grand_total : 0;
      const grandTotal = Number(prevGrandTotal) + debit;

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

  const options: ChartOptions<"scatter"> = {
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
      <Scatter data={data} options={options} />
    </div>
  );
}

export function Chart6() {
  const [Data, setData] = useState<Bkb[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkb`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Mengelompokkan data berdasarkan tanggal menggunakan `reduce`
  const groupedData = Data.reduce(
    (acc: Record<string, BkbWithTanggal>, current) => {
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
    },
    {}
  );

  // Mengubah objek menjadi array dan menghitung saldo
  const dataWithSaldo = (Object.values(groupedData) as BkbWithTanggal[]).reduce(
    (acc: BkbWithTotalDebit[], current, index) => {
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

  const options: ChartOptions<"line"> = {
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
      <Line data={data} options={options} />
    </div>
  );
}

export function Chart7() {
  const [Data, setData] = useState<Bkb[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkb`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  // Filter data untuk menghilangkan entri dengan identity_uk = "-"
  const filteredData = Data.filter((item) => item.kredit == 0);

  // Mengelompokkan data berdasarkan tanggal menggunakan `reduce`
  const groupedData = filteredData.reduce(
    (acc: Record<string, BkbWithTgl>, current) => {
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
    },
    {}
  );

  // Mengubah objek menjadi array dan menghitung saldo
  const dataWithDebit = (Object.values(groupedData) as BkbWithTgl[]).reduce(
    (acc: BkbWithTotDebit[], current) => {
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

  const options: ChartOptions<"line"> = {
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
      <Line data={data} options={options} />
    </div>
  );
}

export function Chart8() {
  const [Data, setData] = useState<Users[]>([]);
  const [roleCounts, setRoleCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/all`) // endpoint dari Laravel
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

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff", // Mengubah warna teks legend menjadi putih
        },
      },
    },
  };
  return (
    <div style={{ width: "80%" }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export function Chart9() {
  const [DataBarang, setDataBarang] = useState<BpBarang[]>([]);
  const [DataJasa, setDataJasa] = useState<BpJasa[]>([]);
  const [InstansiCounts, setInstansiCounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setDataBarang)
      .catch((err) => console.error(err));

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_jasa`) // endpoint dari Laravel
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

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#ffffff", // Mengubah warna teks legend menjadi putih
        },
      },
    },
  };
  return (
    <div style={{ width: "80%" }}>
      <Pie data={data} options={options} />
    </div>
  );
}
