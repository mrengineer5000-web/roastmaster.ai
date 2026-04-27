import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toPng } from "html-to-image";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RoastCard from "../components/RoastCard";
import { Download, Share2, ArrowLeft, Flame, Trophy, Copy, Lock, Zap, Globe, MapPin, Users, Target, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { loadRazorpay } from "../lib/api";

export default function Roast() {
  const { id } = useParams();
  const { user } = useAuth();
  const [roast, setRoast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
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

  const handleUpgrade = async () => {
    setUpgrading(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) { toast.error("Failed to load Razorpay"); setUpgrading(false); return; }
      const { data } = await api.post(`/roast/${id}/premium-order`);
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Roastmaster Pro",
        description: "Unlock Market Insights",
        order_id: data.order_id,
        prefill: { name: user?.name, email: user?.email },
        theme: { color: "#FFD60A" },
        handler: async (resp) => {
          try {
            await api.post("/payment/verify", {
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
            });
            const { data: updatedRoast } = await api.get(`/roast/${id}`);
            setRoast(updatedRoast);
            toast.success("Insights unlocked. Prepare to be offended further.");
          } catch (e) {
            toast.error("Upgrade verification failed");
          } finally {
            setUpgrading(false);
          }
        },
        modal: { ondismiss: () => setUpgrading(false) },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => { toast.error("Upgrade failed"); setUpgrading(false); });
      rzp.open();
    } catch (e) {
      toast.error(e.response?.data?.detail || "Could not initiate upgrade");
      setUpgrading(false);
    }
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

        {/* Premium Insights Section */}
        <div className="mt-14 relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight flex items-center gap-3">
              <Zap className={`h-6 w-6 ${roast.is_premium ? "text-[#FFD60A] drop-shadow-[0_0_8px_rgba(255,214,10,0.5)]" : "text-[#71717A]"}`} /> 
              Pro Market Insights
            </h3>
            {roast.is_premium ? (
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#32D74B] px-2 py-1 border border-[#32D74B]/30 bg-[#32D74B]/5">Unlocked</span>
            ) : (
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#FFD60A] px-2 py-1 border border-[#FFD60A]/30">Locked</span>
            )}
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${roast.is_premium ? "premium-glow" : ""}`}>
            {/* Market Size */}
            <div className="border border-[#27272A] bg-[#050505] p-6 relative overflow-hidden group">
              <p className="label-tag mb-4 flex items-center gap-2"><Globe className="h-3 w-3" /> Market Size</p>
              <div className={roast.is_premium ? "" : "blur-md select-none opacity-40"}>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#A1A1AA]">TAM (Total)</p>
                    <p className="text-2xl font-display text-[#FFD60A]">{roast.is_premium ? roast.tam_value : "$10B+"}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 border-t border-[#27272A] pt-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#A1A1AA]">SAM</p>
                      <p className="text-lg font-display text-white">{roast.is_premium ? roast.sam_value : "$500M"}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#A1A1AA]">SOM</p>
                      <p className="text-lg font-display text-white">{roast.is_premium ? roast.som_value : "$50M"}</p>
                    </div>
                  </div>
                </div>
              </div>
              {!roast.is_premium && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-[#71717A] group-hover:text-[#FFD60A] transition-colors" />
                </div>
              )}
            </div>

            {/* Competitors */}
            <div className="border border-[#27272A] bg-[#050505] p-6 relative overflow-hidden group">
              <p className="label-tag mb-4 flex items-center gap-2"><Users className="h-3 w-3" /> Market Rivals</p>
              <div className={roast.is_premium ? "" : "blur-md select-none opacity-40"}>
                <ul className="space-y-3">
                  {(roast.is_premium ? roast.competitors : ["Placeholder A", "Placeholder B", "Placeholder C"]).map((comp, i) => (
                    <li key={i} className="text-sm font-mono flex items-center gap-2">
                      <span className="text-[#FF3B30] text-[10px]">0{i+1}</span> {comp}
                    </li>
                  ))}
                </ul>
              </div>
              {!roast.is_premium && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-[#71717A] group-hover:text-[#FFD60A] transition-colors" />
                </div>
              )}
            </div>

            {/* Ratings */}
            <div className="border border-[#27272A] bg-[#050505] p-6 relative overflow-hidden group">
              <p className="label-tag mb-4 flex items-center gap-2"><TrendingUp className="h-3 w-3" /> Survival Prob</p>
              <div className={roast.is_premium ? "" : "blur-md select-none opacity-40"}>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-wider mb-2">
                      <span>India Market</span>
                      <span className="text-[#FFD60A]">{roast.is_premium ? roast.india_rating : 42}%</span>
                    </div>
                    <div className="h-1 bg-[#27272A] w-full">
                      <div 
                        className="h-full bg-[#FFD60A]" 
                        style={{ width: `${roast.is_premium ? roast.india_rating : 42}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-[10px] uppercase tracking-wider mb-2">
                      <span>Global Potential</span>
                      <span className="text-[#32D74B]">{roast.is_premium ? roast.global_rating : 12}%</span>
                    </div>
                    <div className="h-1 bg-[#27272A] w-full">
                      <div 
                        className="h-full bg-[#32D74B]" 
                        style={{ width: `${roast.is_premium ? roast.global_rating : 12}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {!roast.is_premium && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-[#71717A] group-hover:text-[#FFD60A] transition-colors" />
                </div>
              )}
            </div>
          </div>

          {/* Second Row for GTM and Reality Check */}
          <div className={`mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 ${roast.is_premium ? "premium-glow" : ""}`}>
            {/* GTM Strategy */}
            <div className="border border-[#27272A] bg-[#050505] p-6 relative overflow-hidden group">
              <p className="label-tag mb-4 flex items-center gap-2"><Target className="h-3 w-3" /> Go-To-Market Strategy</p>
              <div className={roast.is_premium ? "" : "blur-md select-none opacity-40"}>
                <ul className="space-y-3">
                  {(roast.is_premium ? roast.gtm_strategy : ["Step 1", "Step 2", "Step 3", "Step 4"]).map((step, i) => (
                    <li key={i} className="text-sm leading-relaxed flex gap-3">
                      <span className="text-[#32D74B] font-mono shrink-0">→</span>
                      <span className="text-[#D1D1D6]">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {!roast.is_premium && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-[#71717A] group-hover:text-[#FFD60A] transition-colors" />
                </div>
              )}
            </div>

            {/* TAM Reality Check */}
            <div className="border border-[#27272A] bg-[#050505] p-6 relative overflow-hidden group">
              <p className="label-tag mb-4 flex items-center gap-2"><Flame className="h-3 w-3" /> Market Reality Check</p>
              <div className={roast.is_premium ? "" : "blur-md select-none opacity-40"}>
                <p className="text-lg leading-relaxed font-serif-italic text-[#A1A1AA]">
                  {roast.is_premium ? roast.tam_analysis : "This market is actually a lot smaller than you think it is, mostly because nobody actually wants to pay for this specific solution."}
                </p>
              </div>
              {!roast.is_premium && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-[#71717A] group-hover:text-[#FFD60A] transition-colors" />
                </div>
              )}
            </div>
          </div>

          {!roast.is_premium && (
            <div className="mt-8 border border-[#FFD60A] bg-[#FFD60A]/5 p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 opacity-10 pointer-events-none">
                <Zap className="h-32 w-32 text-[#FFD60A]" />
              </div>
              <div className="relative z-10">
                <p className="label-tag text-black bg-[#FFD60A] inline-block px-2 mb-3">Upgrade to Pro</p>
                <h4 className="font-display text-3xl uppercase leading-none">Unlock Savage Market Insights</h4>
                <p className="mt-2 text-[#A1A1AA] text-sm max-w-md">
                  Get real competitor names, actual TAM analysis, and your survival probability in India vs Global markets. 
                </p>
              </div>
              <button 
                onClick={handleUpgrade}
                disabled={upgrading}
                className="btn-brutal btn-yellow w-full md:w-auto relative z-10"
              >
                {upgrading ? "Loading..." : "Unlock for ₹29"}
              </button>
            </div>
          )}
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
