"use client"; // Menandakan ini Client Component, karena menggunakan useState dan useEffect
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useRouter } from "next/navigation"; // Hook untuk navigasi programatik

// Definisi tipe konteks otentikasi
interface AuthContextType {
  token: string | null; // JWT token, null jika belum login
  login: (username: string, password: string) => Promise<void>; // Fungsi login
  register: (
    name: string,
    username: string,
    email: string,
    password: string,
    role: string
  ) => Promise<void>; // Fungsi register
  logout: () => void; // Fungsi logout
}

// Inisialisasi context dengan default kosong
const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
});

// Provider komponen yang membungkus seluruh aplikasi
export function AuthProvider({ children }: { children: ReactNode }) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/`;
  const [token, setToken] = useState<string | null>(null); // State menyimpan token
  const router = useRouter(); // Hook navigasi

  // useEffect dijalankan sekali saat mount untuk load token dari localStorage
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(stored); // Set token jika ada
  }, []);

  // Fungsi login: kirim username/password ke API, simpan token, redirect
  const login = async (username: string, password: string) => {
    const res = await fetch(`${url}login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    console.log("Status:", res.status); // <- Tambahkan ini
    console.log("Data:", data);
    console.log(data.user.id);
    if (res.status === 201 || res.status === 200) {
      setToken(data.access_token); // Simpan ke state
      localStorage.setItem("token", data.access_token); // Persist di browser
      localStorage.setItem("user_name", data.user.name);
      localStorage.setItem("role", data.user.role);
      const role_check = localStorage.getItem("role");
      if (role_check == "admin") {
        router.push("/user/admin"); // Navigasi ke dashboard setelah login sukses
      } else if (role_check == "direktur") {
        router.push("/user/direktur");
      } else if (role_check == "teknisi") {
        router.push("/user/teknisi");
      }
    } else {
      throw new Error(data.message || "Login failed"); // Lempar error jika gagal
    }
  };

  // Fungsi register: kirim data, lalu otomatis login jika sukses
  const register = async (
    name: string,
    username: string,
    email: string,
    password: string,
    role: string
  ) => {
    const res = await fetch(`${url}register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, email, password, role }),
    });
    const data = await res.json();
    if (res.status === 201 || res.status === 200) {
      // Jika pendaftaran sukses, panggil login untuk autentikasi otomatis
      await login(username, password);
    } else {
      throw new Error(data.message || "Register failed");
    }
  };

  // Fungsi logout: hapus token dan redirect ke halaman login
  const logout = () => {
    setToken(null); // Reset state
    localStorage.removeItem("token"); // Hapus dari localStorage
    router.push("/login"); // Arahkan ke login
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children} {/* Render aplikasi di dalam provider */}
    </AuthContext.Provider>
  );
}

// Custom Hook untuk mengakses konteks dengan mudah
export const useAuth = () => useContext(AuthContext);
