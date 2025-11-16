"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";
import { API } from "../../../../lib/lib";

export default function AdaugareRetetaPage() {
  const router = useRouter();

  const [titlu, setTitlu] = useState("");
  const [descriere, setDescriere] = useState("");
  const [timp, setTimp] = useState("");
  const [dificultate, setDificultate] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault(); //nu da refresh la formular
    setMsg(null); //sterge toate mesajele de dinainte

    if (
      !titlu.trim() ||
      !descriere.trim() ||
      !timp.trim() ||
      !dificultate.trim() ||
      !categorie.trim() ||
      !image
    ) {
      setMsg("Completați toate câmpurile.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("titlu", titlu);
      formData.append("descriere", descriere);
      formData.append("timpMinute", timp);
      formData.append("categorie", categorie);
      formData.append("dificultate", dificultate);
      formData.append("image", image);

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Nu ești autentificat.");
        return;
      }

      const res = await fetch(`${API}/retete`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setMsg("Rețeta a fost creată cu succes!");
        setTitlu("");
        setDescriere("");
        setTimp("");
        setCategorie("");
        setDificultate("");
        setImage(null);
        setTimeout(() => router.push("/home"), 1500);
        return;
      }

      if (res.status === 400) {
        setMsg("Bad request.");
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
      style={{ backgroundImage: "url('/backgroundCreate.png')" }}
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
          Creează o rețetă
        </h1>

        <div>
          <label className="text-sm font-bold">Titlu</label>
          <input
            value={titlu}
            onChange={(e) => setTitlu(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Descriere</label>
          <textarea
            value={descriere}
            onChange={(e) => setDescriere(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Dificultate</label>
          <select
            value={dificultate}
            onChange={(e) => setDificultate(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Selectează dificultatea</option>
            <option value="USOR">USOR</option>
            <option value="MEDIU">MEDIU</option>
            <option value="GREU">GREU</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-bold">Categorie</label>
          <select
            value={categorie}
            onChange={(e) => setCategorie(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          >
            <option value="">Selectează categoria</option>
            <option value="DULCE">DULCE</option>
            <option value="SARAT">SARAT</option>
          </select>
        </div>

        <div>
          <label className="text-sm font-bold">Timp (minute)</label>
          <input
            type="number"
            value={timp}
            onChange={(e) => setTimp(e.target.value)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-bold">Poză</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="w-full border rounded p-2 mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full font-bold bg-violet-400 hover:bg-violet-700 text-black p-2 rounded  disabled:opacity-50 mt-2"
        >
          {loading ? "Se trimite..." : "Creează rețeta"}
        </button>

        {msg && <p className="text-center text-sm text-zinc-700">{msg}</p>}
      </form>
    </main>
  );
}
