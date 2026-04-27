import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaywallModal from "../components/PaywallModal";
import Marquee from "react-fast-marquee";
import {
  Flame, ArrowRight, Trophy, Download, Share2,
  FileText, Link as LinkIcon, Type, Upload, X,
} from "lucide-react";
import { toast } from "sonner";

const TABS = [
  { key: "text", label: "Text", icon: Type },
  { key: "pdf", label: "Upload File", icon: FileText },
  { key: "url", label: "Website URL", icon: LinkIcon },
];

export default function Landing() {
  const { user } = useAuth();
  const nav = useNavigate();
  const fileInputRef = useRef(null);

  const [tab, setTab] = useState("text");
  const [idea, setIdea] = useState("");
  const [startupName, setStartupName] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [sourceUrl, setSourceUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [flash, setFlash] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const canSubmit = () => {
    if (tab === "text") return idea.trim().length >= 15;
    if (tab === "pdf") return !!pdfFile;
    if (tab === "url") return /^(https?:\/\/)?[^\s]+\.[^\s]+/.test(sourceUrl.trim());
    return false;
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append("startup_name", startupName);
    fd.append("idea", idea);
    if (tab === "pdf" && pdfFile) fd.append("pdf_file", pdfFile);
    if (tab === "url") fd.append("source_url", sourceUrl);
    return fd;
  };

  const submitRoast = async () => {
    const { data } = await api.post("/roast/generate", buildFormData(), {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
  };

  const handleRoast = async () => {
    if (!user) {
      toast("Sign up to unleash the roast.");
      nav("/signup");
      return;
    }
    if (!canSubmit()) {
      toast.error(
        tab === "text"
          ? "Give us at least 15 characters."
          : tab === "pdf"
          ? "Upload a pitch deck PDF first."
          : "Enter a valid URL."
      );
      return;
    }
    setLoading(true);
    try {
      const data = await submitRoast();
      setFlash(true);
      setTimeout(() => { setFlash(false); nav(`/roast/${data.id}`); }, 350);
    } catch (e) {
      if (e.response?.status === 402) setPaywallOpen(true);
      else toast.error(e.response?.data?.detail || "Roast failed");
    } finally {
      setLoading(false);
    }
  };

  const handlePaySuccess = async () => {
    try {
      setLoading(true);
      const data = await submitRoast();
      nav(`/roast/${data.id}`);
    } catch {
      toast.error("Please try generating again.");
    } finally { setLoading(false); }
  };

  const onFilePick = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.size > 15 * 1024 * 1024) {
      toast.error("File too large (max 15 MB).");
      return;
    }
    setPdfFile(f);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA]">
      {flash && <div className="flashbulb" />}
      <Navbar />
      <PaywallModal open={paywallOpen} onClose={() => setPaywallOpen(false)} onSuccess={handlePaySuccess} />

      {/* Marquee */}
      <div className="border-b border-[#27272A]">
        <Marquee speed={55} gradient={false} className="py-2.5">
          <span className="font-display uppercase tracking-widest text-[#FF3B30] text-sm mx-8">· Delusion Detected ·</span>
          <span className="font-display uppercase tracking-widest text-[#FFD60A] text-sm mx-8">· Reality Check ·</span>
          <span className="font-display uppercase tracking-widest text-[#FAFAFA] text-sm mx-8">· Zero Product-Market Fit ·</span>
          <span className="font-display uppercase tracking-widest text-[#FF3B30] text-sm mx-8">· Your TAM is a Myth ·</span>
          <span className="font-display uppercase tracking-widest text-[#FFD60A] text-sm mx-8">· Another Uber For X ·</span>
          <span className="font-display uppercase tracking-widest text-[#FAFAFA] text-sm mx-8">· Raise Less, Listen More ·</span>
        </Marquee>
      </div>

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#27272A]">
        <div className="absolute inset-0 grid-lines opacity-[0.05] pointer-events-none" />
        <div className="absolute inset-0 grain pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 md:px-12 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid grid-cols-12 gap-10 md:gap-16 items-start">
            {/* LEFT */}
            <div className="col-span-12 md:col-span-7 md:pr-6">
              <div className="flex items-center gap-3 mb-8">
                <span className="label-tag">Vol. 01 · Issue 49</span>
                <span className="h-px flex-1 bg-[#27272A]" />
                <span className="label-tag text-[#A1A1AA]">est. 2026</span>
              </div>

              <h1 className="font-display uppercase leading-[0.86] tracking-tight text-[52px] sm:text-[76px] md:text-[96px]">
                An AI angel<br />
                investor that <span className="text-[#FF3B30]">actually</span><br />
                <span className="font-serif-italic normal-case tracking-normal font-normal text-[44px] sm:text-[64px] md:text-[80px]">
                  tells the truth.
                </span>
              </h1>

              <p className="mt-8 max-w-xl text-base md:text-lg text-[#A1A1AA] leading-[1.8]">
                Submit your startup idea — as text, any file (pitch deck, doc, image), or a website URL.
                Our AI angel investor delivers <span className="text-[#FAFAFA]">5 brutal reality checks</span> and <span className="text-[#FAFAFA]">5 sharp fixes</span>.
                No pleasantries. No &ldquo;interesting, but&rdquo;.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 text-[10px] uppercase tracking-[0.25em] text-[#71717A]">
                <span className="flex items-center gap-1.5">
                  <Flame className="h-3 w-3 text-[#FF3B30]" /> 5 Roasts
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Download className="h-3 w-3 text-[#FAFAFA]" /> 5 Fixes
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Trophy className="h-3 w-3 text-[#FFD60A]" /> Hall of Shame
                </span>
              </div>
            </div>

            {/* RIGHT — input */}
            <div className="col-span-12 md:col-span-5">
              <div className="border border-[#27272A] bg-[#0A0A0A]">
                <div className="flex items-center justify-between border-b border-[#27272A] px-6 py-4">
                  <span className="label-tag">Submit Your Idea</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] cursor-blink">AWAITING INPUT</span>
                </div>

                {/* Tabs */}
                <div className="grid grid-cols-3 border-b border-[#27272A]">
                  {TABS.map((t) => {
                    const active = tab === t.key;
                    const Icon = t.icon;
                    return (
                      <button
                        key={t.key}
                        data-testid={`landing-tab-${t.key}`}
                        onClick={() => setTab(t.key)}
                        className={`flex items-center justify-center gap-2 py-3.5 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                          active
                            ? "bg-[#FF3B30] text-black"
                            : "text-[#A1A1AA] hover:text-[#FAFAFA] border-r border-[#27272A] last:border-r-0"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" /> {t.label}
                      </button>
                    );
                  })}
                </div>

                <div className="p-6 md:p-7 space-y-5">
                  <div>
                    <label className="label-tag">Startup Name (optional)</label>
                    <input
                      data-testid="landing-startup-name-input"
                      className="input-brutal mt-3"
                      placeholder="e.g. Uber for Goldfish"
                      value={startupName}
                      onChange={(e) => setStartupName(e.target.value)}
                      maxLength={80}
                    />
                  </div>

                  {tab === "text" && (
                    <div>
                      <label className="label-tag">Describe the idea</label>
                      <textarea
                        data-testid="landing-idea-textarea"
                        className="input-brutal mt-3 min-h-[180px] resize-y"
                        placeholder={"> What problem does it solve?\n> Who is the target market?\n> Why will anyone pay?"}
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        maxLength={4000}
                      />
                      <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-[#71717A]">
                        <span>min 15 chars</span>
                        <span>{idea.length}/4000</span>
                      </div>
                    </div>
                  )}

                  {tab === "pdf" && (
                    <div>
                      <label className="label-tag">Upload any file</label>
                      <input
                        ref={fileInputRef}
                        data-testid="landing-pdf-input"
                        type="file"
                        onChange={onFilePick}
                        className="hidden"
                      />
                      {!pdfFile ? (
                        <button
                          type="button"
                          data-testid="landing-pdf-picker"
                          onClick={() => fileInputRef.current?.click()}
                          className="mt-3 w-full border border-dashed border-[#27272A] p-8 flex flex-col items-center justify-center gap-3 hover:border-[#FF3B30] hover:bg-[#0f0f0f] transition-colors"
                        >
                          <Upload className="h-6 w-6 text-[#FFD60A]" />
                          <p className="text-sm text-[#FAFAFA]">Drop a file or click to upload</p>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] text-center">
                            PDF · PPTX · DOCX · Images · Text · Max 15 MB
                          </p>
                        </button>
                      ) : (
                        <div className="mt-3 border border-[#27272A] p-4 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <FileText className="h-5 w-5 text-[#FF3B30] shrink-0" />
                            <div className="min-w-0">
                              <p className="text-sm truncate">{pdfFile.name}</p>
                              <p className="text-[10px] uppercase tracking-[0.2em] text-[#71717A]">
                                {(pdfFile.size / 1024).toFixed(0)} KB
                              </p>
                            </div>
                          </div>
                          <button
                            data-testid="landing-pdf-remove"
                            onClick={() => { setPdfFile(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                            className="text-[#A1A1AA] hover:text-[#FF3B30] shrink-0"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                      <div className="mt-3">
                        <label className="label-tag">Extra context (optional)</label>
                        <textarea
                          data-testid="landing-pdf-extra"
                          className="input-brutal mt-2 min-h-[80px]"
                          placeholder="Anything the deck doesn't already say..."
                          value={idea}
                          onChange={(e) => setIdea(e.target.value)}
                          maxLength={2000}
                        />
                      </div>
                    </div>
                  )}

                  {tab === "url" && (
                    <div>
                      <label className="label-tag">Your website / landing page URL</label>
                      <input
                        data-testid="landing-url-input"
                        type="text"
                        inputMode="url"
                        className="input-brutal mt-3"
                        placeholder="https://yourstartup.com"
                        value={sourceUrl}
                        onChange={(e) => setSourceUrl(e.target.value)}
                      />
                      <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-[#71717A]">
                        We&apos;ll fetch the page content and roast it.
                      </p>
                      <div className="mt-3">
                        <label className="label-tag">Extra context (optional)</label>
                        <textarea
                          data-testid="landing-url-extra"
                          className="input-brutal mt-2 min-h-[80px]"
                          placeholder="What problem does your startup actually solve?"
                          value={idea}
                          onChange={(e) => setIdea(e.target.value)}
                          maxLength={2000}
                        />
                      </div>
                    </div>
                  )}

                  <button
                    data-testid="landing-roast-btn"
                    onClick={handleRoast}
                    disabled={loading}
                    className="btn-brutal w-full !py-4"
                  >
                    {loading ? "ROASTING..." : "ROAST MY IDEA"}
                    <ArrowRight className="h-5 w-5" />
                  </button>

                  <p className="text-[10px] uppercase tracking-[0.2em] text-[#71717A] text-center pt-1">
                    {user
                      ? user.used_free_roast
                        ? user.paid_roasts_balance > 0
                          ? `You have ${user.paid_roasts_balance} paid roast(s) left`
                          : "Next roast: ₹10"
                        : "Your first roast is free"
                      : "Sign up · First roast on the house"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-7xl px-6 md:px-12 py-24 md:py-32">
        <div className="flex items-center gap-4 mb-14">
          <span className="label-tag">01 // The Process</span>
          <span className="h-px flex-1 bg-[#27272A]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#27272A] border border-[#27272A]">
          {[
            { n: "01", t: "Submit", d: "Paste your idea, drop any file (PDF, PPTX, DOCX, images, text), or share a landing page URL." },
            { n: "02", t: "Get Roasted", d: "Our AI angel investor scores it 1–10, writes 5 brutal callouts and 5 sharp fixes." },
            { n: "03", t: "Share or Cry", d: "Download the zine-style card. Post it anywhere. Cry a little. Rebuild stronger." },
          ].map((s) => (
            <div key={s.n} className="bg-[#050505] p-10 md:p-12">
              <div className="font-display text-[96px] leading-none text-[#FF3B30]">{s.n}</div>
              <h3 className="font-display uppercase text-3xl mt-3">{s.t}</h3>
              <p className="text-sm text-[#A1A1AA] mt-5 leading-[1.8]">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section className="border-y border-[#27272A] bg-[#0A0A0A]">
        <div className="mx-auto max-w-7xl px-6 md:px-12 py-16 md:py-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 items-center">
          <div>
            <span className="label-tag">Pricing</span>
            <h3 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] mt-3">
              First roast <span className="text-[#FFD60A]">free.</span>
            </h3>
            <p className="font-serif-italic text-xl mt-3 text-[#A1A1AA]">Then ₹10 per savage review.</p>
          </div>
          <div className="border border-[#27272A] p-8">
            <ul className="space-y-3 text-sm text-[#A1A1AA]">
              <li className="flex gap-3"><Flame className="h-4 w-4 text-[#FF3B30]" /> AI-generated score &amp; verdict</li>
              <li className="flex gap-3"><Download className="h-4 w-4 text-[#FAFAFA]" /> Downloadable PNG roast card</li>
              <li className="flex gap-3"><Share2 className="h-4 w-4 text-[#FAFAFA]" /> Share anywhere</li>
              <li className="flex gap-3"><Trophy className="h-4 w-4 text-[#FFD60A]" /> Feature on Hall of Shame</li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <div className="font-display text-7xl md:text-8xl text-[#FF3B30] leading-none">₹10</div>
            <Link to={user ? "/" : "/signup"} data-testid="pricing-cta-link" className="btn-brutal mt-8 inline-flex">
              Get Roasted
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
