import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export function SearchKeyword({
  keyword,
  setKeyword,
  handleSearch,
}: {
  keyword: string;
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: React.FormEventHandler;
}) {
  return (
    <form onSubmit={handleSearch} className="flex space-x-5">
      <div className="flex flex-col">
        {/* <label className="mb-[2px]">Pilih Tanggal Mulai:</label> */}
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Cari Data"
          className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
        />
      </div>
      <button
        type="submit"
        className="flex items-center cursor-pointer self-end px-3 py-1 bg-[#9EFF66] rounded-lg text-gray-700 font-medium"
      >
        <span className="mr-1">Cari</span>{" "}
        <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4" />
      </button>
    </form>
  );
}
