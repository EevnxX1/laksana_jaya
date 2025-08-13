"use client";
import { LinkImage } from "@/app/component/link_image";
import { useState, useEffect } from "react";

interface Bkk {
  id: number;
  uraian: string;
  nota: string;
}

export function LinkImageNotaKantor() {
  const [data, setData] = useState<Bkk[]>([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bkk/detail_kantor`) // endpoint dari Laravel
      .then((res) => res.json())
      .then(setData)
      .catch((err) => console.error(err));
  }, []);
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
