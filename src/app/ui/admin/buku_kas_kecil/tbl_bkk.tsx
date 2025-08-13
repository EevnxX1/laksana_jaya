"use client";
import Link from "next/link";
import Image from "next/image";

interface TabelUi {
  children: React.ReactNode;
}

export default function TabelBukuKasKecil({ children }: TabelUi) {
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8 flex flex-col gap-y-10">
      {children}
      <div className="flex self-center items-center bg-white text-black rounded-xl">
        <Link href={""} className="w-12 h-10 flex justify-center items-center">
          <Image
            src={"/assets/__.png"}
            alt="arrow left"
            width={50}
            height={50}
            className="w-3"
          ></Image>
        </Link>
        <Link
          href={""}
          className="w-10 h-10 flex justify-center items-center border border-[#C7C7C7]"
        >
          <p>1</p>
        </Link>
        <Link
          href={""}
          className="w-10 h-10 flex justify-center items-center border border-[#C7C7C7]"
        >
          <p>2</p>
        </Link>
        <Link
          href={""}
          className="w-10 h-10 flex justify-center items-center border border-[#C7C7C7]"
        >
          <p>3</p>
        </Link>
        <Link href={""} className="w-12 h-10 flex justify-center items-center">
          <Image
            src={"/assets/__.png"}
            alt="arrow left"
            width={50}
            height={50}
            className="w-3 rotate-180"
          ></Image>
        </Link>
      </div>
    </section>
  );
}

export function TabelBukuKasKecilDirektur({ children }: TabelUi) {
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8 flex flex-col gap-y-10">
      {children}
      <div className="flex self-center items-center bg-white text-black rounded-xl">
        <Link href={""} className="w-12 h-10 flex justify-center items-center">
          <Image
            src={"/assets/__.png"}
            alt="arrow left"
            width={50}
            height={50}
            className="w-3"
          ></Image>
        </Link>
        <Link
          href={""}
          className="w-10 h-10 flex justify-center items-center border border-[#C7C7C7]"
        >
          <p>1</p>
        </Link>
        <Link
          href={""}
          className="w-10 h-10 flex justify-center items-center border border-[#C7C7C7]"
        >
          <p>2</p>
        </Link>
        <Link
          href={""}
          className="w-10 h-10 flex justify-center items-center border border-[#C7C7C7]"
        >
          <p>3</p>
        </Link>
        <Link href={""} className="w-12 h-10 flex justify-center items-center">
          <Image
            src={"/assets/__.png"}
            alt="arrow left"
            width={50}
            height={50}
            className="w-3 rotate-180"
          ></Image>
        </Link>
      </div>
    </section>
  );
}
