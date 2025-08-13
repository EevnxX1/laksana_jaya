interface TabelUi {
  children: React.ReactNode;
}

export default function TabelBukuProyekJasa({ children }: TabelUi) {
  return (
    <section className="relative mx-auto w-[91vw] rounded-xl bg-white/20 px-8 py-8">
      <div>{children}</div>
    </section>
  );
}
