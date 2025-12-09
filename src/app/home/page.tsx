"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
export default function Page() {
  return (
    <main className="text-white">
      {/* HERO background */}
      <div
        className="min-h-screen bg-cover bg-center flex flex-col"
        style={{
          backgroundImage: "url('/backgroundHome.png')",
        }}
      >
        <header className="relative">
          <nav className="flex flex-wrap items-center justify-end gap-2 sm:gap-6 p-3 sm:p-6">
            <Link
              href="/retete/get"
              className="font-extrabold text-white text-xs sm:text-sm bg-violet-500 hover:bg-violet-800 rounded-full px-3 py-2"
            >
              VIZUALIZARE
            </Link>
            <Link
              href="/retete/categorie"
              className="font-extrabold text-white text-xs sm:text-sm bg-violet-500 hover:bg-violet-800 rounded-full px-3 py-2"
            >
              CATEGORIE
            </Link>
            <Link
              href="/retete/create"
              className="font-extrabold text-white text-xs sm:text-sm bg-violet-500 hover:bg-violet-800 rounded-full px-3 py-2"
            >
              REȚETĂ NOUĂ
            </Link>

            <Link
              href="/logare"
              className="font-extrabold text-white text-xs sm:text-sm bg-violet-500 hover:bg-violet-800 rounded-full px-3 py-2"
            >
              DECONECTEAZĂ-TE
            </Link>

            <Link
              href="/profil"
              className="font-extrabold text-white text-xs sm:text-sm bg-violet-500 hover:bg-violet-800 rounded-full px-3 py-2"
            >
              DETALII PROFIL
            </Link>
          </nav>
        </header>

        <div className="relative mt-4 flex justify-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/857/857681.png"
              alt="logo"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-[200px]">
          <h1 className="font-bold text-white tracking-[0.25em] sm:tracking-[0.35em] text-4xl sm:text-6xl md:text-7xl text-center">
            GustArte
          </h1>
          <p className="mt-4 text-white tracking-[0.3em] text-lg sm:text-2xl text-center">
            REȚETE 📖
          </p>
        </div>
      </div>
    </main>
  );
}
