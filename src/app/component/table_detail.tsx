import clsx from "clsx";

interface TableOuput {
  dataTh: string[];
  dataRows: string;
  dataTd: (string | React.ReactNode)[][];
  classThTd?: string;
}

export function TableDetail({
  dataTh,
  dataTd,
  dataRows,
  classThTd,
}: TableOuput) {
  return (
    <div className="bg-white p-2">
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
    </div>
  );
}
