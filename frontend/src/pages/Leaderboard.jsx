import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Skull, Trophy } from "lucide-react";

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/roasts/leaderboard")
      .then((r) => setItems(r.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 md:px-10 py-16 md:py-24">
          <span className="label-tag">Archive · Public</span>
          <h1 className="font-display uppercase text-6xl md:text-8xl leading-[0.9] tracking-tight mt-4">
            Hall of <span className="text-[#FF3B30]">Shame</span>
          </h1>
          <p className="font-serif-italic text-xl text-[#A1A1AA] mt-4 max-w-2xl">
            The harshest verdicts ever delivered. Scores and one-liner takedowns only — ideas stay private.
          </p>

          <div className="mt-14 border border-[#27272A]">
            <div className="grid grid-cols-12 border-b border-[#27272A] bg-[#0A0A0A] px-5 md:px-7 py-4 text-[10px] uppercase tracking-[0.2em] text-[#71717A]">
              <div className="col-span-2 md:col-span-1">Rank</div>
              <div className="col-span-6 md:col-span-8">Verdict</div>
              <div className="col-span-4 md:col-span-3 text-right">Score</div>
            </div>

            {loading && <div className="p-10 text-center text-[#A1A1AA]">Loading disasters...</div>}

            {!loading && items.length === 0 && (
              <div className="p-14 text-center">
                <Skull className="h-10 w-10 mx-auto text-[#71717A]" />
                <p className="mt-4 text-[#A1A1AA] font-serif-italic text-xl">No verdicts yet. Be the first.</p>
                <Link to="/" data-testid="leaderboard-empty-cta" className="btn-brutal mt-6 inline-flex">
                  Roast an idea
                </Link>
              </div>
            )}

            {items.map((it, idx) => {
              const c = it.score <= 3 ? "#FF3B30" : it.score <= 6 ? "#FF6B22" : "#32D74B";
              return (
                <div
                  key={it.id}
                  data-testid={`leaderboard-row-${idx}`}
                  className="grid grid-cols-12 items-center gap-3 border-b border-[#27272A] last:border-b-0 px-5 md:px-7 py-6 hover:bg-[#0A0A0A] transition-colors"
                >
                  <div className="col-span-2 md:col-span-1 font-display text-3xl md:text-4xl text-[#71717A] leading-none">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div className="col-span-6 md:col-span-8 min-w-0">
                    <p className="font-serif-italic text-sm md:text-base text-[#FAFAFA] leading-snug">
                      &ldquo;{it.one_liner}&rdquo;
                    </p>
                    <p className="mt-1.5 text-[10px] uppercase tracking-[0.2em] text-[#71717A]">
                      Delivered to {it.user_name}
                    </p>
                  </div>
                  <div className="col-span-4 md:col-span-3 text-right">
                    <span className="font-display text-4xl md:text-5xl" style={{ color: c }}>
                      {it.score}
                    </span>
                    <span className="font-display text-lg text-[#71717A]">/10</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-14 text-center">
            <Trophy className="h-6 w-6 mx-auto text-[#FFD60A]" />
            <p className="mt-3 text-sm text-[#A1A1AA]">Think your idea deserves a lower score?</p>
            <Link to="/" data-testid="leaderboard-cta" className="btn-brutal mt-5 inline-flex">
              Submit yours
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
