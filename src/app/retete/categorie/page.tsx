"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { API } from "../../../../lib/lib";

export default function ListaRetetePage() {
  const router = useRouter();
  const [retete, setRetete] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [categorieSelectata, setCategorieSelectata] = useState("");
  const [loading, setLoading] = useState(false);
  const [eroare, setEroare] = useState<string | null>(null);

  async function fetchRetete() {
    try {
      setLoading(true);
      const res = await fetch(`${API}/retete`);
      if (!res.ok) throw new Error("Nu pot încărca rețetele.");

      const data = await res.json();
      setRetete(data);
      setFiltered(data); // initial toate
    } catch {
      setEroare("A apărut o eroare la încărcarea rețetelor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRetete();
  }, []);
  useEffect(() => {
    if (!categorieSelectata) {
      setFiltered(retete);
    } else {
      setFiltered(retete.filter((r) => r.categorie === categorieSelectata));
    }
  }, [categorieSelectata, retete]);

  return (
    <main
      className="min-h-screen p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('/backgroundGet.png')" }}
    >
      <Link
        href="/home"
        className="absolute top-4 left-4 flex items-center text-white bg-violet-500 hover:bg-violet-800 p-2 rounded-md "
      >
        <span className="text-lg">←</span> Înapoi
      </Link>

      <div className="p-6 max-w-6xl w-full mx-auto mt-10">
        <div className="mb-6">
          <label className="font-bold mr-3 text-white text-lg">
            Filtrează după categorie:
          </label>

          <select
            value={categorieSelectata}
            onChange={(e) => setCategorieSelectata(e.target.value)}
            className="p-2 rounded-md bg-white text-black"
          >
            <option value="DULCE">DULCE</option>
            <option value="SARAT">SARAT</option>
          </select>
        </div>

        {loading && <p className="text-center text-zinc-700">Se încarcă...</p>}
        {eroare && <p className="text-center text-red-600">{eroare}</p>}

        {!loading && filtered.length === 0 && (
          <p className="text-center text-zinc-700">Nu există rețete.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((r) => (
            <div
              key={r.id}
              className="border border-black/40 rounded-lg p-5 bg-white/80 shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-2xl mb-1">{r.titlu}</h3>
              <p className="text-md text-gray-700 mb-2">{r.descriere}</p>

              <div className="text-sm text-gray-600 flex gap-2">
                <span>Timp: {r.timpMinute} min</span>
                <span>•</span>
                <span>{r.dificultate}</span>
                <span>•</span>
                <span>{r.categorie}</span>
              </div>

              {r.imageUrl && (
                <img
                  src={`http://localhost:8383${r.imageUrl}`}
                  className="w-full h-40 object-cover rounded mt-3"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
