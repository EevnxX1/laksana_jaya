import clsx from "clsx";

interface TableOuput {
  dataTh: string[];
  dataRows: (string | React.ReactNode)[][];
  dataTd: (string | React.ReactNode)[][];
  dataTotal?: string;
  classThTd?: string;
  classTotal?: string;
  source: "total" | "info";
}

export function TableDetail({
  dataTh,
  dataTd,
  dataRows,
  dataTotal,
  classThTd,
  classTotal,
  source,
}: TableOuput) {
  return (
    <div className="bg-white p-2">
      {source === "total" ? (
        <table className="w-full text-center bg-white text-black">
          <thead>
            <tr className="shadow-xl">
              {dataTh?.map((th, index) => (
                <th key={index} className={clsx("pb-2", classThTd)}>
                  {th}
                </th>
              ))}
            </tr>
            {dataRows.map((th, index) => (
              <tr key={index} className="border-b-1 border-gray-400">
                {dataRows[index].map((th, index) => (
                  <th
                    key={index}
                    colSpan={dataTh.length - 1}
                    className="text-start py-4 px-5"
                  >
                    {th}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {dataTd.map((td, index) => (
              <tr key={index} className="border-b-1 border-gray-400">
                {dataTd[index].map((td, index) => (
                  <td key={index} className={clsx("py-4", classThTd)}>
                    {td}
                  </td>
                ))}
              </tr>
            ))}
            <tr>
              <td
                colSpan={dataTh.length - 2}
                className={clsx("py-2 text-right font-bold", classTotal)}
              >
                Total Jumlah
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
                <th key={index} className={clsx("pb-2", classThTd)}>
                  {th}
                </th>
              ))}
            </tr>
            <tr className="border-b-1 border-gray-400">
              <th colSpan={dataTh.length} className="text-start py-4 px-5">
                {dataRows}
              </th>
            </tr>
          </thead>
          <tbody>
            {dataTd.map((td, index) => (
              <tr key={index} className="border-b-1 border-gray-400">
                {dataTd[index].map((td, index) => (
                  <td key={index} className={clsx("py-4", classThTd)}>
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
