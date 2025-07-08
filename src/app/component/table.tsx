import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import clsx from "clsx";

interface TableOuput {
    dataTh: string[];
    dataTd: (string | React.ReactNode)[][];
}

export function Table({dataTh, dataTd, ...rest}: TableOuput) {
    return(
        <div className="bg-white p-2">
                <table className="w-full text-center bg-white text-black">
                    <thead>
                        <tr className="shadow-xl">
                            {
                                dataTh?.map((th, index) => (
                                    <th key={index} className="pb-2">{th}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dataTd.map((td, index) => (
                                <tr key={index} className="border-b-1 border-gray-400 border-l-4 border-l-red-500">
                                {
                                    dataTd[index].map((td, index) => (
                                        <td key={index} className="py-2">{td}</td>
                                    ))
                                }
                            {/* <td className="text-xl py-2 flex">
                                {children}
                            </td> */}
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
    );
}