"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { InputTblDetail } from "@/app/component/input_tbl_detail";
import { Table } from "@/app/component/table";
import { FormatNumber } from "./format_number";
import { toast } from "react-toastify";
import { LinkImage } from "@/app/component/link_image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPrint,
  faPen,
  faCircleXmark,
  faFolderPlus,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

interface BpBarang {
  id: number;
  tanggal: string;
  post: string;
  nomor_sp: string;
  tgl_sp: string;
  instansi: string;
  pekerjaan: string;
  sub_kegiatan: string;
  tahun_anggaran: string;
  mulai_pekerjaan: string;
  selesai_pekerjaan: string;
  label_pekerjaan: string;
  nilai_pekerjaan: number;
}

interface BarangDpa {
  id: number;
  id_bpbarang: number;
  id_kdrekening: number;
  nama_barang: string;
  spesifikasi: string;
  vol: string;
  satuan: string;
  harga_satuan: number;
  harga_total: number;
}

interface kdrekening {
  id: number;
  id_bpbarang: number;
  no_rekening: string;
  ket: string;
}

interface Bkk {
  id: number;
  id_bpbarang: number;
  tanggal: string;
  uraian: string;
  harga_satuan: number;
  volume: string;
  satuan: string;
  instansi: string;
  pekerjaan: string;
  kredit: string;
  debit: string;
  identity: string;
  identity_uk: string;
  nota: string;
}

export function JudulPage({ id }: { id: string }) {
  const [data, setData] = useState<BpBarang[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const proyek = data[0];
    if (proyek) {
      setNamaPekerjaan(proyek.pekerjaan);
    }
  }, [data]);

  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  return <>{namaPekerjaan}</>;
}

export function InputTabelProyekDetail({ id }: { id: string }) {
  const [data, setData] = useState<BpBarang[]>([]);
  const [data2, setData2] = useState<BarangDpa[]>([]);
  const [data3, setData3] = useState<Bkk[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bp_barang/detail/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/barangdpa/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData2)
      .catch((err) => console.error(err));
  }, [id]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/detail_barang/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData3)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    let operasi1 = 0;
    let operasi2 = 0;
    for (let index = 0; index < data2.length; index++) {
      operasi1 += Number(data2[index].harga_total); // pastikan dikonversi ke number
    }
    for (let index = 0; index < data3.length; index++) {
      operasi2 += Number(data3[index].debit); // pastikan dikonversi ke number
    }
    const totalNilai = operasi1 - operasi2;
    setKeuntungan(String("Rp." + FormatNumber(Number(totalNilai))));
  }, [data2, data3]);

  useEffect(() => {
    const proyek = data[0];
    if (proyek) {
      setNamaPekerjaan(proyek.pekerjaan);
      setInstansi(proyek.instansi);
      setSubKegiatan(proyek.sub_kegiatan);
      setMulaiPelaksanaan(proyek.mulai_pekerjaan);
      setSelesaiPelaksanaan(proyek.selesai_pekerjaan);
      setNilaiPekerjaan("Rp." + FormatNumber(Number(proyek.nilai_pekerjaan)));
    }
  }, [data]);

  const [namaPekerjaan, setNamaPekerjaan] = useState("");
  const [Instansi, setInstansi] = useState("");
  const [SubKegiatan, setSubKegiatan] = useState("");
  const [MulaiPelaksanaan, setMulaiPelaksanaan] = useState("");
  const [SelesaiPelaksanaan, setSelesaiPelaksanaan] = useState("");
  const [NilaiPekerjaan, setNilaiPekerjaan] = useState("");
  const [Keuntungan, setKeuntungan] = useState("");
  return (
    <form action="" className="flex flex-col gap-y-2">
      <InputTblDetail
        value={namaPekerjaan}
        onChange={(e) => setNamaPekerjaan(e.target.value)}
        readOnly
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
        readOnly
      >
        Sub Kegiatan
      </InputTblDetail>
      <InputTblDetail
        type="date"
        value={MulaiPelaksanaan}
        onChange={(e) => setMulaiPelaksanaan(e.target.value)}
        readOnly
      >
        Mulai Pelaksanaan
      </InputTblDetail>
      <InputTblDetail
        type="date"
        value={SelesaiPelaksanaan}
        onChange={(e) => setSelesaiPelaksanaan(e.target.value)}
        readOnly
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
      <InputTblDetail
        value={Keuntungan}
        onChange={(e) => setKeuntungan(e.target.value)}
        readOnly
      >
        Keuntungan
      </InputTblDetail>
    </form>
  );
}

export function TabelProyekDetail1({ id }: { id: string }) {
  const [data, setData] = useState<BarangDpa[]>([]);
  const [data2, setData2] = useState<kdrekening[]>([]);
  const [total, setTotal] = useState("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/barangdpa/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/kdrekening/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData2)
      .catch((err) => console.error(err));
  }, [id]);

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
        <tbody key={ikredit}>
          <tr className="border-b-1 border-gray-400">
            <th colSpan={7} className="text-start pl-10 px-5">
              <div className="flex gap-x-2">
                <span>{kredit.no_rekening}</span>
                <span>{kredit.ket}</span>
              </div>
            </th>
            <th className="text-start py-4 px-5">
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    const konfirmasi = confirm("Yakin ingin hapus?");
                    if (konfirmasi) {
                      fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/api/kdrekening/${kredit.id}`,
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
              <tr key={ibarang} className="border-b-1 border-gray-400">
                <td className={"py-4"}>{ibarang + 1}</td>
                <td className={"py-4"}>{barang.nama_barang}</td>
                <td className={"py-4"}>{barang.spesifikasi}</td>
                <td className={"py-4"}>{barang.vol}</td>
                <td className={"py-4"}>{barang.satuan}</td>
                <td className={"py-4"}>
                  Rp.{FormatNumber(Number(barang.harga_satuan))}
                </td>
                <td className={"py-4"}>
                  Rp.{FormatNumber(Number(barang.harga_total))}
                </td>
                <td className={"py-4"}>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        const konfirmasi = confirm("Yakin ingin hapus?");
                        if (konfirmasi) {
                          fetch(
                            `${process.env.NEXT_PUBLIC_API_URL}/api/barangdpa/${barang.id}`,
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
            ) : null,
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
          <td className="py-2">Rp.{FormatNumber(Number(total))}</td>
        </tr>
      </tfoot>
    </table>
  );
}

export function TabelProyekDetail2({ id }: { id: string }) {
  const [data, setData] = useState<Bkk[]>([]);
  const [Total, setTotal] = useState("");
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/detail_barang/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    let operasi = 0;
    for (let index = 0; index < data.length; index++) {
      operasi += Number(data[index].debit); // pastikan dikonversi ke number
    }
    setTotal(FormatNumber(operasi));
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
    "Rp." + FormatNumber(Number(row.harga_satuan)),
    "Rp." + FormatNumber(Number(row.debit)),
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

export function LinkImageProyekDetail({ id }: { id: string }) {
  const [data, setData] = useState<Bkk[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/detail_barang/${id}`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, [id]);
  return (
    <>
      {data.map((list, index) =>
        list.nota !== "-" ? (
          <LinkImage
            key={index}
            text={list.uraian}
            href=""
            srcImage={list.nota}
          />
        ) : null
      )}
    </>
  );
}

export function LinkAddRekening({ id }: { id: string }) {
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

export function LinkUbahDataProyek({ id }: { id: string }) {
  return (
    <Link
      href={`ubah_data?id_bpb=${id}`}
      className="flex items-center px-5 py-2 rounded-lg gap-x-2 bg-[#F0FF66] text-black self-end w-fit"
    >
      <FontAwesomeIcon icon={faPen} className="w-4" />
      <p className="font-semibold">Edit Data Proyek</p>
    </Link>
  );
}

export function LinkCetakData({ id }: { id: string }) {
  return (
    <Link
      href={`/cetak_barang?id=${id}`}
      className="flex items-center px-5 py-2 rounded-lg gap-x-2 bg-[#F0FF66] text-black self-end w-fit"
      target="_blank"
    >
      <FontAwesomeIcon icon={faPrint} className="w-4" />
      <p className="font-semibold">Cetak Data</p>
    </Link>
  );
}