import type { Metadata } from "next";
import { Geist_Mono, Inter, Lora } from "next/font/google";
import "./globals.css";

import { AppProvider } from "@/providers";

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const loraSerif = Lora({
  variable: "--font-lora-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fractal",
  description:
    "O Fractal é um aplicativo que ajuda pessoas com TDAH a organizar tarefas, dividindo-as em subtarefas com o auxílio de IA para reduzir a sobrecarga e aumentar a produtividade",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${interSans.variable} ${geistMono.variable} ${loraSerif.variable} dark overflow-hidden`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
