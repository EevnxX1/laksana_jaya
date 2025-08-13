export function FormatNumber(number: number) {
  // Pastikan input adalah number, jika tidak, kembalikan string kosong atau handle error.
  if (typeof number !== "number") {
    return "0";
  }
  return number.toLocaleString("id-ID");
}

export const FormatPrice = (value: string) => {
  // Hapus semua karakter selain angka
  const cleanedValue = value.replace(/\D/g, "");

  // Ubah menjadi angka, lalu format dengan toLocaleString
  // `id-ID` memastikan penggunaan titik sebagai pemisah ribuan
  const formattedValue = new Intl.NumberFormat("id-ID").format(
    Number(cleanedValue)
  );

  return formattedValue;
};
