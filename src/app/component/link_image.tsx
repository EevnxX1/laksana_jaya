import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface LinkComponent extends React.LinkHTMLAttributes<HTMLLinkElement> {
  classImage?: string;
  srcImage: string;
  href: string;
}

export function LinkImage({
  classImage,
  srcImage,
  href,
  ...rest
}: LinkComponent) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-y-2 w-[200px] px-4 py-4 bg-white text-black overflow-hidden"
    >
      <Image
        src={srcImage}
        alt="image"
        width={50}
        height={50}
        className="w-full"
      />
      <p className="text-sm">Nota Pembelian PC & Komputer</p>
      <div className="w-full flex justify-between items-center text-sm font-semibold">
        <div className="px-3 py-1 bg-[#FF5656] rounded-lg">Lihat Detail</div>
        <div className="px-2 py-1 bg-[#FF5656] rounded-lg">
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
      </div>
    </Link>
  );
}
