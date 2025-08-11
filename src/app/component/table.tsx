import clsx from "clsx";

interface TableOuput {
  dataTh: string[];
  dataTd: (string | React.ReactNode)[][];
  dataTotal?: string;
  classTotal?: string;
  source: "total" | "info";
  fieldNameRow?: "Total Jumlah" | string;
}

export function Table({
  dataTh,
  dataTd,
  source,
  dataTotal,
  classTotal,
  fieldNameRow,
}: TableOuput) {
  return (
    <div className="bg-white p-2">
      {source === "total" ? (
        <table className="w-full text-center bg-white text-black">
          <thead>
            <tr className="shadow-xl">
              {dataTh?.map((th, index) => (
                <th key={index} className="pb-2 whitespace-pre-wrap ">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTd.map((td, index) => (
              <tr key={index} className="border-b-1 border-gray-400">
                {dataTd[index].map((td, index) => (
                  <td key={index} className="py-2">
                    {td}
                  </td>
                ))}
                {/* <td className="text-xl py-2 flex">
                                {children}
                            </td> */}
              </tr>
            ))}
            <tr>
              <td
                colSpan={dataTh.length - 2}
                className={clsx("py-2 text-right font-bold", classTotal)}
              >
                {fieldNameRow}
              </td>
              <td className="py-2">{dataTotal}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <table className="w-full text-center bg-white text-black">
          <thead>
            <tr className="shadow-xl">
              {dataTh?.map((th, index) => (
                <th key={index} className="pb-2 w-48 break-words">
                  {th}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {dataTd.map((td, index) => (
              <tr
                key={index}
                className="border-b-1 border-gray-400 border-l-4 border-l-red-500"
              >
                {dataTd[index].map((td, index) => (
                  <td key={index} className="py-2">
                    {td}
                  </td>
                ))}
                {/* <td className="text-xl py-2 flex">
                                {children}
                            </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export function TablePrint({ dataTh, dataTd }: TableOuput) {
  return (
    <div className="bg-white p-2">
      <table className="w-full text-center bg-white text-black">
        <thead>
          <tr className="shadow-xl">
            {dataTh?.map((th, index) => (
              <th
                key={index}
                className="pb-2 whitespace-pre-wrap text-sm w-20 break-all"
              >
                {th}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {dataTd.map((td, index) => (
            <tr key={index} className="border-b-1 border-gray-400">
              {dataTd[index].map((td, index) => (
                <td key={index} className="py-2 text-sm break-words">
                  {td}
                </td>
              ))}
              {/* <td className="text-xl py-2 flex">
                                {children}
                            </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
