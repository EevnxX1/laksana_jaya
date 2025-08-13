import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";

export function SearchByDate({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  handleSearch,
}: {
  startDate: string;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  endDate: string;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: React.FormEventHandler;
}) {
  return (
    <form onSubmit={handleSearch} className="flex gap-x-3">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="bg-white/40 px-3 py-1 rounded-lg cursor-pointer text-gray-700"
      />
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
