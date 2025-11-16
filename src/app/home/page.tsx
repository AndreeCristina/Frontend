"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
export default function Page() {
  return (
    <main className="text-white">
      {/* HERO background */}
      <div
        className="h-screen bg-cover bg-center"
        style={{
          backgroundImage: "url('/backgroundHome.png')",
        }}
      >
        <header className="relative">
          <nav className="flex items-center justify-end gap-6 p-6">
            <Link
              href="/retete/get"
              className="font-extrabold text-white text-[12px]  bg-violet-500 hover:bg-violet-800
 rounded-md p-1"
            >
              VIZUALIZARE
            </Link>
            <Link
              href="/retete/categorie"
              className="font-extrabold text-white text-[12px] bg-violet-500 hover:bg-violet-800 rounded-md p-1"
            >
              CATEGORIE
            </Link>
            <Link
              href="/retete/create"
              className="font-extrabold text-white text-[12px] bg-violet-500 hover:bg-violet-800 rounded-md p-1"
            >
              REȚETĂ NOUĂ
            </Link>

            <Link
              href="/logare"
              className="font-extrabold text-white text-[12px] bg-violet-500 hover:bg-violet-800 rounded-md p-1"
            >
              DECONECTEAZĂ-TE
            </Link>
          </nav>
        </header>

        <div className="relative mt-[6px] flex justify-center">
          <div className="h-[80px] w-[80px]">
            <img
              src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
              alt="logo"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-[200px]">
          <h1 className="text-[120px] font-bold text-white tracking-[20px] relative">
            GustArte
          </h1>
          <p className="text-[35px] text-white tracking-[10px] relative">
            REȚETE 📖
          </p>
        </div>
      </div>
    </main>
  );
}
