import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toPng } from "html-to-image";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoastCard from "../components/RoastCard";
import { Download, Share2, ArrowLeft, Flame, Trophy, Copy } from "lucide-react";
import { toast } from "sonner";

export default function Roast() {
  const { id } = useParams();
  const [roast, setRoast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    api.get(`/roast/${id}`)
      .then((r) => setRoast(r.data))
      .catch(() => toast.error("Roast not found"))
      .finally(() => setLoading(false));
  }, [id]);

  const download = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#050505",
      });
      const link = document.createElement("a");
      link.download = `roast-${id.slice(0, 8)}.png`;
      link.href = dataUrl;
      link.click();
      toast.success("Downloaded. Share it anywhere.");
    } catch {
      toast.error("Download failed");
    } finally { setDownloading(false); }
  };

  const share = async () => {
    const url = window.location.href;
    const text = `My startup idea just got roasted ${roast?.score}/10 by Roastmaster.\n"${roast?.one_liner}"\n\n`;
    if (navigator.share) {
      try { await navigator.share({ title: "My Roast", text, url }); } catch {}
    } else {
      await navigator.clipboard.writeText(text + url);
      toast.success("Copied to clipboard");
    }
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#FAFAFA]">
        <Navbar/>
        <div className="p-12 text-center text-[#A1A1AA]">Loading the pain...</div>
      </div>
    );
  }

  if (!roast) {
    return (
      <div className="min-h-screen bg-[#050505] text-[#FAFAFA]">
        <Navbar/>
        <div className="p-12 text-center">
          <p className="font-display text-5xl text-[#FF3B30]">404</p>
          <p className="mt-2 text-[#A1A1AA]">This roast has vanished into the void.</p>
          <Link to="/" className="btn-brutal mt-6 inline-flex">Back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col">
      <Navbar/>
      <div className="mx-auto max-w-5xl w-full px-6 md:px-10 py-14 md:py-20 flex-1">
        <div className="flex items-center justify-between mb-8">
          <Link to="/" data-testid="roast-back-link" className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#A1A1AA] hover:text-[#FFD60A]">
            <ArrowLeft className="h-3.5 w-3.5"/> New roast
          </Link>
          <span className="label-tag">Roast // Delivered</span>
        </div>

        <div className="slam-in">
          <RoastCard ref={cardRef} roast={roast}/>
        </div>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <button data-testid="roast-download-btn" onClick={download} disabled={downloading} className="btn-brutal">
            <Download className="h-5 w-5"/> {downloading ? "Rendering..." : "Download PNG"}
          </button>
          <button data-testid="roast-share-btn" onClick={share} className="btn-brutal btn-yellow">
            <Share2 className="h-5 w-5"/> Share
          </button>
          <button data-testid="roast-copy-link-btn" onClick={copyLink} className="btn-brutal btn-ghost">
            <Copy className="h-5 w-5"/> Copy Link
          </button>
        </div>

        {/* Idea text */}
        <div className="mt-14 border border-[#27272A] p-8">
          <p className="label-tag">The Idea That Got Roasted</p>
          <p className="mt-4 text-sm text-[#A1A1AA] whitespace-pre-wrap leading-[1.8]">{roast.idea}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Link to="/" data-testid="roast-new-link" className="btn-brutal btn-ghost">
            <Flame className="h-5 w-5"/> Roast another idea
          </Link>
          <Link to="/leaderboard" data-testid="roast-leaderboard-link" className="btn-brutal btn-ghost">
            <Trophy className="h-5 w-5"/> Hall of Shame
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
