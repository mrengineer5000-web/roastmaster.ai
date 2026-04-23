import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Flame, Plus } from "lucide-react";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    api.get("/roasts/my")
      .then((r) => setItems(r.data || []))
      .finally(() => setLoading(false));
  }, [user]);

  if (authLoading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col">
      <Navbar/>
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-14 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <span className="label-tag">Your File</span>
            <h1 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] tracking-tight mt-3">
              Hi <span className="text-[#FF3B30]">{user.name}.</span>
            </h1>
            <p className="font-serif-italic text-lg text-[#A1A1AA] mt-2">Your collection of beautiful disasters.</p>
          </div>
          <div className="grid grid-cols-3 gap-px bg-[#27272A] border border-[#27272A]">
            <div className="bg-[#0A0A0A] px-5 py-3">
              <p className="label-tag">Roasts</p>
              <p className="font-display text-3xl mt-1" data-testid="dashboard-count">{items.length}</p>
            </div>
            <div className="bg-[#0A0A0A] px-5 py-3">
              <p className="label-tag">Free Used</p>
              <p className="font-display text-3xl mt-1 text-[#FFD60A]">{user.used_free_roast ? "YES" : "NO"}</p>
            </div>
            <div className="bg-[#0A0A0A] px-5 py-3">
              <p className="label-tag">Credits</p>
              <p className="font-display text-3xl mt-1 text-[#32D74B]">{user.paid_roasts_balance}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 border border-[#27272A]">
          <div className="flex items-center justify-between border-b border-[#27272A] bg-[#0A0A0A] px-5 py-3">
            <span className="label-tag">Roast Archive</span>
            <Link to="/" data-testid="dashboard-new-roast" className="text-[10px] uppercase tracking-[0.25em] text-[#FFD60A] hover:text-[#FF3B30] flex items-center gap-1.5">
              <Plus className="h-3.5 w-3.5"/> New Roast
            </Link>
          </div>

          {loading && <div className="p-8 text-center text-[#A1A1AA]">Loading...</div>}
          {!loading && items.length === 0 && (
            <div className="p-10 text-center">
              <Flame className="h-10 w-10 mx-auto text-[#71717A]"/>
              <p className="mt-3 text-[#A1A1AA] font-serif-italic text-xl">No roasts yet. Time to submit one.</p>
              <Link to="/" data-testid="dashboard-empty-cta" className="btn-brutal mt-5 inline-flex">Roast an idea</Link>
            </div>
          )}

          {items.map((it) => {
            const c = it.score <= 3 ? "#FF3B30" : it.score <= 6 ? "#FF6B22" : "#32D74B";
            return (
              <Link
                to={`/roast/${it.id}`}
                key={it.id}
                data-testid={`dashboard-roast-${it.id}`}
                className="flex items-start gap-4 border-b border-[#27272A] last:border-b-0 px-5 py-5 hover:bg-[#0A0A0A] transition-colors"
              >
                <div className="text-right w-16 shrink-0">
                  <span className="font-display text-4xl" style={{ color: c }}>{it.score}</span>
                  <span className="font-display text-sm text-[#71717A]">/10</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display uppercase text-xl tracking-tight">{it.startup_name || "Unnamed"}</p>
                  <p className="text-xs text-[#A1A1AA] mt-1 font-serif-italic line-clamp-2">&ldquo;{it.one_liner}&rdquo;</p>
                </div>
                <span className="hidden md:block text-[10px] uppercase tracking-[0.2em] text-[#71717A] shrink-0">
                  {new Date(it.created_at).toLocaleDateString()}
                </span>
              </Link>
            );
          })}
        </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
