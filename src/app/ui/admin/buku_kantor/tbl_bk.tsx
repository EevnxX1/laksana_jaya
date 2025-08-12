"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faPrint } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { LinkImageNotaKantor } from "@/app/user/admin/buku_kantor/page";

interface TabelUi {
  children: React.ReactNode;
}

export default function TabelBukuKantor({ children }: TabelUi) {
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8 flex flex-col gap-y-10">
      {children}
    </section>
  );
}
