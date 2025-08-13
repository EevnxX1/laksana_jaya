"use client";

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
