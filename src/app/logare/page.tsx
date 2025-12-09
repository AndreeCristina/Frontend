"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { API } from "../../../lib/lib";

export default function InregistrarePage() {
  const router = useRouter();

  const [parola, setParola] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); //nu da refresh la formular
    setMsg(null); //sterge toate mesajele de dinainte

    if (!parola.trim() || !email.trim()) {
      setMsg("Completați toate câmpurile.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          parola: parola,
          email: email,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        localStorage.setItem("token", data.token);
        setMsg("Te-ai conectat cu succes!");
        setParola("");
        setEmail("");
        setTimeout(() => router.push("/home"));

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
      style={{ backgroundImage: "url('/backgroundRegister.png')" }}
    >
      <form
        onSubmit={onSubmit}
        className="bg-white/100 p-6 rounded-md opacity-90 space-y-5"
      >
        <h1 className="text-[30px] font-bold text-center mb-4">Logare</h1>

        <div>
          <label className="text-sm font-bold">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Parolă</label>
          <input
            type="password"
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full font-bold bg-violet-400 hover:bg-violet-700 text-black p-2 rounded  disabled:opacity-50 mt-2"
        >
          {loading ? "Se trimite..." : "Conectare"}
        </button>

        {msg && <p className="text-center text-sm text-zinc-700">{msg}</p>}

        <p className="text-center text-sm text-zinc-800 ">
          Nu ai cont?{" "}
          <Link
            href="/autentificare"
            className=" font-semibold hover:underline"
          >
            Înregistrază-te
          </Link>
        </p>
      </form>
    </main>
  );
}
