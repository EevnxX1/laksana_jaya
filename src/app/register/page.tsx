'use client'
import Register from "../ui/register";
import { Input } from "../component/input";
import { Button } from "../component/button";
import { useState } from "react";
import { useAuth } from "@/auth/auth";
import { toast } from "react-toastify";

export default function page() {
  const { register } = useAuth(); // Ambil fungsi register dari context
  const [name, setName] = useState(''); // State input nama
  const [username, setUsername] = useState(''); // State input username
  const [email, setEmail] = useState(''); // State input email
  const [password, setPassword] = useState(''); // State input password
  const [role, setRole] = useState(''); // State input role

  // Handle submit form register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, username, email, password, role); // Panggil register
      toast.success('User registered successfull');
    } catch (err: any) {
      toast.error('User registered Failed'); // Set error jika gagal
    }
  };
    return(
        <Register>
              <form onSubmit={handleSubmit} method="post" className="flex flex-col space-y-5">
                <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                ></Input>
                <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                ></Input>
                <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                ></Input>
                <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                ></Input>
                <select onChange={(e) => setRole(e.target.value)} className='appearance-none outline-none border border-gray-400 w-[270px] h-[40px] px-3 rounded-lg text-sm text-gray-200 bg-black placeholder:text-gray-200'>
                    <option defaultValue={'direktur'}>Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="direktur">Direktur</option>
                    <option value="teknisi">Teknisi</option>
                </select>
                <Button
                type="submit"
                className="text-white bg-green-400"
                >
                  Sign Up
                </Button>
              </form>
            </Register>
    );
}