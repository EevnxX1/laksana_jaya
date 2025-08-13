"use client";
import { useState } from "react";
import Login from "./ui/login";
import { Input } from "./component/input";
import { Button } from "./component/button";
import { toast } from "react-toastify";
import { useAuth } from "@/auth/auth";

export default function Home() {
  const { login } = useAuth(); // Ambil fungsi login dari context
  const [username, setUsername] = useState(""); // State input username
  const [password, setPassword] = useState(""); // State input password

  // Fungsi handle submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Cegah reload halaman
    try {
      await login(username, password); // Panggil login
      toast.success("Login successful");
    } catch {
      toast.error("Username & Password Invalid"); // Set error jika gagal
    }
  };
  return (
    <Login>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        ></Input>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        ></Input>
        <Button type="submit" className="bg-green-400 text-white">
          Sign In
        </Button>
      </form>
    </Login>
  );
}
