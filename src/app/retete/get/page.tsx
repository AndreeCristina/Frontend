"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { API } from "../../../../lib/lib";
import { useRouter } from "next/navigation";

export default function ListaRetetePage() {
  const router = useRouter();
  const [retete, setRetete] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eroare, setEroare] = useState<string | null>(null);

  async function fetchRetete() {
    try {
      setLoading(true);
      setEroare(null);

      const res = await fetch(`${API}/retete`);

      if (!res.ok) throw new Error("Nu pot încărca rețetele.");

      const data = await res.json();
      setRetete(data);
    } catch (err) {
      setEroare("A apărut o eroare la încărcarea rețetelor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRetete();
  }, []);

  async function handleDelete(id: number) {
    const confirmare = window.confirm("Sigur vrei să ștergi această rețetă?");
    if (!confirmare) return;

    try {
      const res = await fetch(`${API}/retete/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Nu s-a putut șterge rețeta.");
      }

      await fetchRetete();
    } catch (err) {
      console.error(err);
      alert("A apărut o eroare la ștergere.");
    }
  }
  function handleEdit(id: number) {
    router.push(`/retete/update?id=${id}`);
  }

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
        {loading && <p className="text-center text-zinc-700">Se încarcă...</p>}

        {eroare && <p className="text-center text-red-600">{eroare}</p>}

        {!loading && retete.length === 0 && (
          <p className="text-center text-zinc-700">Nu există rețete.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {retete.map((r: any) => (
            <div
              key={r.id}
              className="border border-black/40 rounded-lg p-5 bg-white/80 shadow-md hover:shadow-lg transition-shadow w-full"
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
              <div className="flex gap-95">
                <button
                  onClick={() => handleDelete(r.id)}
                  className="mt-4  items-center p-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Șterge
                </button>

                <button
                  onClick={() => handleEdit(r.id)}
                  className="mt-4  items-center p-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md "
                >
                  Editează
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
