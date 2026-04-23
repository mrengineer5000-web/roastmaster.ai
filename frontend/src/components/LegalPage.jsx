import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LegalPage({ title, subtitle, children, testId }) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col">
      <Navbar />
      <main data-testid={testId} className="flex-1">
        <div className="mx-auto max-w-4xl px-6 md:px-10 py-16 md:py-24">
          <span className="label-tag">Legal</span>
          <h1 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] tracking-tight mt-4">
            {title}
          </h1>
          {subtitle && (
            <p className="font-serif-italic text-xl text-[#A1A1AA] mt-4 max-w-2xl">{subtitle}</p>
          )}
          <div className="mt-12 space-y-10 text-[15px] text-[#A1A1AA] leading-[1.8]">
            {children}
          </div>
          <div className="mt-16 pt-6 border-t border-[#27272A] text-[10px] uppercase tracking-[0.25em] text-[#71717A]">
            Last updated: February 2026
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({ label, heading, children }) {
  return (
    <section className="border-t border-[#27272A] pt-8">
      {label && <p className="label-tag">{label}</p>}
      {heading && (
        <h2 className="font-display uppercase text-2xl md:text-3xl text-[#FAFAFA] tracking-tight mt-2 mb-4">
          {heading}
        </h2>
      )}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
