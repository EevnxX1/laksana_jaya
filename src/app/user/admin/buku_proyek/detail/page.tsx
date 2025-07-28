"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { InputTblDetail } from "@/app/component/input_tbl_detail";
import { TableDetail } from "@/app/component/table_detail";
import { Table } from "@/app/component/table";
import { LinkImage } from "@/app/component/link_image";
import TabelBukuProyekDetail from "@/app/ui/admin/buku_proyek/detail/tbl_bp_detail";
import Link from "next/link";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faCircleXmark,
  faFolderPlus,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

interface detailDataBukuProyek {
  id: number;
  pekerjaan: string;
  instansi: string;
  sub_kegiatan: string;
  mulai_pekerjaan: string;
  selesai_pekerjaan: string;
}

export default function page() {
  return <TabelBukuProyekDetail></TabelBukuProyekDetail>;
}

export function JudulPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  const [data, setData] = useState<detailDataBukuProyek[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bp_barang/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    const proyek = data[0];
    if (proyek) {
      setNamaPekerjaan(proyek.pekerjaan);
    }
  }, [data]);

  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  return <>{namaPekerjaan}</>;
}

// INPUT
export function InputTabelProyekDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  console.log(id);
  const [data, setData] = useState<detailDataBukuProyek[]>([]);
  const [data2, setData2] = useState<TabelBarangDpa[]>([]);
  const [data3, setData3] = useState<TabelBarangNilaiBelanja[]>([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bp_barang/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/barangdpa/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData2)
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/detail_barang/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData3)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let operasi1 = 0;
    let operasi2 = 0;
    for (let index = 0; index < data2.length; index++) {
      operasi1 += Number(data2[index].harga_total); // pastikan dikonversi ke number
    }
    for (let index = 0; index < data3.length; index++) {
      operasi2 += Number(data3[index].debit); // pastikan dikonversi ke number
    }
    const totalNilai = operasi1 + operasi2;
    setNilaiPekerjaan(String("Rp." + totalNilai));
  }, [data2, data3]);

  useEffect(() => {
    const proyek = data[0];
    if (proyek) {
      setNamaPekerjaan(proyek.pekerjaan);
      setInstansi(proyek.instansi);
      setSubKegiatan(proyek.sub_kegiatan);
      setMulaiPelaksanaan(proyek.mulai_pekerjaan);
      setSelesaiPelaksanaan(proyek.selesai_pekerjaan);
      console.log(proyek.mulai_pekerjaan);
      console.log(proyek.selesai_pekerjaan);
    }
  }, [data]);

  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [SubKegiatan, setSubKegiatan] = useState("");
  const [MulaiPelaksanaan, setMulaiPelaksanaan] = useState("");
  const [SelesaiPelaksanaan, setSelesaiPelaksanaan] = useState("");
  const [NilaiPekerjaan, setNilaiPekerjaan] = useState("");
  return (
    <form action="" className="flex flex-col gap-y-2">
      <InputTblDetail
        value={namaPekerjaan}
        onChange={(e) => setNamaPekerjaan(e.target.value)}
      >
        Nama Pekerjaan
      </InputTblDetail>
      <InputTblDetail
        value={Instansi}
        onChange={(e) => setInstansi(e.target.value)}
      >
        Instansi
      </InputTblDetail>
      <InputTblDetail
        value={SubKegiatan}
        onChange={(e) => setSubKegiatan(e.target.value)}
      >
        Sub Kegiatan
      </InputTblDetail>
      <InputTblDetail
        type="date"
        value={MulaiPelaksanaan}
        onChange={(e) => setMulaiPelaksanaan(e.target.value)}
      >
        Mulai Pelaksanaan
      </InputTblDetail>
      <InputTblDetail
        type="date"
        value={SelesaiPelaksanaan}
        onChange={(e) => setSelesaiPelaksanaan(e.target.value)}
      >
        Selesai Pelaksanaan
      </InputTblDetail>
      <InputTblDetail
        value={NilaiPekerjaan}
        onChange={(e) => setNilaiPekerjaan(e.target.value)}
        readOnly
      >
        Nilai Pekerjaan
      </InputTblDetail>
    </form>
  );
}

interface TabelBarangDpa {
  id: number;
  id_kdrekening: number;
  nama_barang: string;
  spesifikasi: string;
  vol: string;
  satuan: string;
  harga_satuan: string;
  harga_total: string;
}

interface TabelRekening {
  id: number;
  no_rekening: string;
  ket: string;
}

export function TabelProyekDetail1() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  const [data, setData] = useState<TabelBarangDpa[]>([]);
  const [data2, setData2] = useState<TabelRekening[]>([]);
  const [total, setTotal] = useState("");
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/barangdpa/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/kdrekening/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData2)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let operasi = 0;
    for (let index = 0; index < data.length; index++) {
      operasi += Number(data[index].harga_total); // pastikan dikonversi ke number
    }
    setTotal(String(operasi));
    console.log(operasi);
  }, [data]); // tambahkan dependency jika `data` berasal dari state

  return (
    <table className="w-full text-center bg-white text-black">
      <thead>
        <tr className="shadow-xl">
          <th className={"pb-2 py-2 w-[50px]"}>No</th>
          <th className={"pb-2 py-2"}>Nama Barang</th>
          <th className={"pb-2 py-2"}>Spesifikasi</th>
          <th className={"pb-2 py-2"}>Vol</th>
          <th className={"pb-2 py-2"}>Satuan</th>
          <th className={"pb-2 py-2"}>Harga Satuan</th>
          <th className={"pb-2 py-2"}>Harga Total</th>
          <th className={"pb-2 py-2"}>Action</th>
        </tr>
      </thead>
      {data2.map((kredit, ikredit) => (
        <tbody>
          <tr className="border-b-1 border-gray-400">
            <th colSpan={7} className="text-start pl-10 px-5">
              Kode Rekening: {kredit.no_rekening}
            </th>
            <th className="text-start py-4 px-5">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    const konfirmasi = confirm("Yakin ingin hapus?");
                    if (konfirmasi) {
                      fetch(
                        `http://127.0.0.1:8000/api/kdrekening/${kredit.id}`,
                        {
                          method: "DELETE",
                        }
                      )
                        .then((res) => {
                          if (!res.ok) throw new Error("Gagal hapus");
                          toast.success("Kode Rekening Berhasil Dihapus");

                          // Hapus data dari state agar tabel update
                          setData2((prev) =>
                            prev.filter((item) => item.id !== kredit.id)
                          );
                        })
                        .catch(() => {
                          toast.error("Terjadi kesalahan saat menghapus");
                        });
                    }
                  }}
                  className={"text-red-800 cursor-pointer"}
                >
                  <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
                </button>
              </div>
            </th>
          </tr>
          {data.map((barang, ibarang) => [
            barang.id_kdrekening == kredit.id ? (
              <tr className="border-b-1 border-gray-400">
                <td className={"py-4"}>{ibarang + 1}</td>
                <td className={"py-4"}>{barang.nama_barang}</td>
                <td className={"py-4"}>{barang.spesifikasi}</td>
                <td className={"py-4"}>{barang.vol}</td>
                <td className={"py-4"}>{barang.satuan}</td>
                <td className={"py-4"}>Rp.{barang.harga_satuan}</td>
                <td className={"py-4"}>Rp.{barang.harga_total}</td>
                <td className={"py-4"}>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        const konfirmasi = confirm("Yakin ingin hapus?");
                        if (konfirmasi) {
                          fetch(
                            `http://127.0.0.1:8000/api/barangdpa/${barang.id}`,
                            {
                              method: "DELETE",
                            }
                          )
                            .then((res) => {
                              if (!res.ok) throw new Error("Gagal hapus");
                              toast.success("Data Barang Berhasil Dihapus");

                              // Hapus data dari state agar tabel update
                              setData((prev) =>
                                prev.filter((item) => item.id !== barang.id)
                              );
                            })
                            .catch(() => {
                              toast.error("Terjadi kesalahan saat menghapus");
                            });
                        }
                      }}
                      className={"text-red-800 cursor-pointer"}
                    >
                      <FontAwesomeIcon icon={faCircleXmark} className="w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              <tr className="border-b-1 border-gray-400"></tr>
            ),
          ])}
          <tr className="border-b-1 border-gray-400">
            <td className={"py-4 pl-10"} colSpan={8}>
              <Link
                href={`detail/tambah_barang?id_bp=${id}&id_kr=${kredit.id}`}
                className="flex gap-x-2 items-center justify-center bg-[#F0FF66] text-black w-[180px] py-2 rounded-lg"
              >
                <FontAwesomeIcon icon={faFolderPlus} />
                Tambah Barang
              </Link>
            </td>
          </tr>
        </tbody>
      ))}
      <tfoot>
        <tr>
          <td colSpan={6} className={"py-2 text-right font-bold"}>
            Total Jumlah
          </td>
          <td className="py-2">Rp.{total}</td>
        </tr>
      </tfoot>
    </table>
  );
}

interface TabelBarangNilaiBelanja {
  id: number;
  uraian: string;
  volume: string;
  satuan: string;
  harga_satuan: string;
  debit: string;
}

export function TabelProyekDetail2() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  const [data, setData] = useState<TabelBarangNilaiBelanja[]>([]);
  const [Total, setTotal] = useState("");
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/detail_barang/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    let operasi = 0;
    for (let index = 0; index < data.length; index++) {
      operasi += Number(data[index].debit); // pastikan dikonversi ke number
    }
    setTotal(String(operasi));
    console.log(operasi);
  }, [data]);

  const dataTh = [
    "No",
    "Nama Barang",
    "Vol",
    "Satuan",
    "Harga Satuan",
    "Harga Total",
  ];

  const dataTd = data.map((row, index) => [
    index + 1,
    row.uraian,
    row.volume,
    row.satuan,
    "Rp." + row.harga_satuan,
    "Rp." + row.debit,
  ]);

  return (
    <Table
      dataTd={dataTd}
      dataTh={dataTh}
      source="total"
      fieldNameRow="Total Jumlah"
      classTotal="pr-20 min-[1450px]:pr-[110px] min-[1700px]:pr-[130px]"
      dataTotal={"Rp." + Total}
    ></Table>
  );
}

interface TabelBarangNotaBelanja {
  id: number;
  uraian: string;
  nota: string;
}

export function LinkImageProyekDetail() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  const [data, setData] = useState<TabelBarangNotaBelanja[]>([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/bkk/detail_barang/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      {data.map((list, index) => (
        <LinkImage
          key={index}
          text={list.uraian}
          href=""
          srcImage={list.nota}
        />
      ))}
    </>
  );
}

export function LinkAddRekening() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id_bp");
  return (
    <Link
      href={`detail/tambah_rekening?id_bp=${id}`}
      className="flex gap-x-2 items-center bg-[#F0FF66] text-black px-4 py-2 rounded-lg"
    >
      <FontAwesomeIcon icon={faCreditCard} />
      Masukkan Kode Rekening
    </Link>
  );
}
