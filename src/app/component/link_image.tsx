import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface LinkComponent extends React.LinkHTMLAttributes<HTMLLinkElement> {
  srcImage: string;
  href: string;
  text: string;
  classImage?: string;
}

export function LinkImage({ srcImage, href, classImage, text }: LinkComponent) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between h-[240px] w-[200px] px-4 py-4 bg-white text-black overflow-hidden"
    >
      <Image
        src={srcImage}
        alt="image"
        width={50}
        height={50}
        className={clsx("w-full", classImage)}
      />
      <div className="flex flex-col gap-y-2">
        <p className="text-sm">{text}</p>
        <div className="w-full flex justify-between items-center text-sm font-semibold">
          <div className="px-3 py-1 bg-[#FF5656] rounded-lg">Lihat Detail</div>
          <div className="px-2 py-1 bg-[#FF5656] rounded-lg">
            <FontAwesomeIcon icon={faArrowDown} />
          </div>
        </div>
      </div>
    </Link>
  );
}
