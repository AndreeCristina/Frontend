"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { API } from "../../../lib/lib";

export default function AdaugareRetetaPage() {
  const router = useRouter();

  const [prenume, setPrenume] = useState("");
  const [numeFamilie, setNumeFamilie] = useState("");

  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); //nu da refresh la formular
    setMsg(null); //sterge toate mesajele de dinainte

    if (!prenume.trim() || !numeFamilie.trim()) {
      setMsg("Completați toate câmpurile.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("titlu", prenume);
      formData.append("descriere", numeFamilie);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Nu ești autentificat.");
        return;
      }

      const res = await fetch(`${API}/user/detalii`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          prenume,
          numeFamilie,
        }),
      });

      if (res.ok) {
        setMsg("Ai introdus detaliile cu succes.");
        setPrenume("");
        setNumeFamilie("");
        setTimeout(() => router.push("/home"), 1500);
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.message);
        return;
      }

      setMsg("A apărut o eroare.");
    } catch {
      setMsg("Nu mă pot conecta la server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/backgroundGet.png')" }}
    >
      <Link
        href="/home"
        className="absolute top-4 left-4 flex items-center text-white bg-violet-500 hover:bg-violet-800 p-2 rounded-md"
      >
        <span className="text-lg">←</span> Înapoi
      </Link>

      <form
        onSubmit={onSubmit}
        className="bg-white/100 p-6 rounded-md opacity-90 space-y-5"
      >
        <h1 className="text-[30px] font-bold text-center mb-4">
          Introduceți detalii
        </h1>

        <div>
          <label className="text-sm font-bold">Prenume</label>
          <input
            value={prenume}
            onChange={(e) => setPrenume(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Nume de familie</label>
          <input
            value={numeFamilie}
            onChange={(e) => setNumeFamilie(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full font-bold bg-violet-400 hover:bg-violet-700 text-black p-2 rounded  disabled:opacity-50 mt-2"
        >
          {loading ? "Se trimite..." : "Submit"}
        </button>

        {msg && <p className="text-center text-sm text-zinc-700">{msg}</p>}
      </form>
    </main>
  );
}
