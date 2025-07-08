import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "@/auth/auth";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV LAKSANA JAYA",
  description: "",
  icons: 'logo.ico'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body
        className={`${inter.className} overflow-hidden antialiased`}
      >
        <ToastContainer/>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
