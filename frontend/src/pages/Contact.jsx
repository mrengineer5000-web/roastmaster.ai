import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Mail, Phone, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col">
      <Navbar />
      <main data-testid="contact-page" className="flex-1">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 md:py-24">
          <span className="label-tag">Say Hello</span>
          <h1 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] tracking-tight mt-4">
            Contact <span className="text-[#FF3B30]">Us</span>
          </h1>
          <p className="font-serif-italic text-xl text-[#A1A1AA] mt-4 max-w-2xl">
            Questions, refunds, media asks, partnerships, or just want to yell about a roast? We read every message.
          </p>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-[#27272A] border border-[#27272A]">
            <a
              href="mailto:contact@pixelbond.in"
              data-testid="contact-email-primary"
              className="bg-[#050505] p-8 md:p-10 hover:bg-[#0A0A0A] transition-colors group"
            >
              <Mail className="h-6 w-6 text-[#FF3B30] mb-5" />
              <p className="label-tag">Primary Email</p>
              <p className="mt-3 font-display text-2xl md:text-3xl tracking-tight break-all">
                contact@pixelbond.in
              </p>
              <p className="mt-3 text-sm text-[#A1A1AA]">
                Best for: support, refunds, billing, data requests.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#FFD60A] group-hover:gap-2 transition-all">
                Send email <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>

            <a
              href="mailto:xenithfounders@gmail.com"
              data-testid="contact-email-founders"
              className="bg-[#050505] p-8 md:p-10 hover:bg-[#0A0A0A] transition-colors group"
            >
              <Mail className="h-6 w-6 text-[#FFD60A] mb-5" />
              <p className="label-tag">Founders&apos; Inbox</p>
              <p className="mt-3 font-display text-2xl md:text-3xl tracking-tight break-all">
                xenithfounders@gmail.com
              </p>
              <p className="mt-3 text-sm text-[#A1A1AA]">
                Best for: partnerships, press, collaborations.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#FFD60A] group-hover:gap-2 transition-all">
                Send email <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>

            <a
              href="tel:+919350015443"
              data-testid="contact-phone"
              className="bg-[#050505] p-8 md:p-10 hover:bg-[#0A0A0A] transition-colors group"
            >
              <Phone className="h-6 w-6 text-[#32D74B] mb-5" />
              <p className="label-tag">Phone</p>
              <p className="mt-3 font-display text-2xl md:text-3xl tracking-tight">
                +91 93500 15443
              </p>
              <p className="mt-3 text-sm text-[#A1A1AA]">
                Mon–Fri, 11am–7pm IST. WhatsApp preferred.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-[#FFD60A] group-hover:gap-2 transition-all">
                Call now <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </div>

          <div className="mt-14 border border-[#27272A] p-8 md:p-12">
            <p className="label-tag">XenithHQ</p>
            <h2 className="font-display uppercase text-3xl md:text-4xl tracking-tight mt-3">
              The humans behind the roast.
            </h2>
            <p className="mt-4 text-[#A1A1AA] max-w-2xl leading-relaxed">
              Roastmaster is built &amp; maintained by XenithHQ — a small team based out of India,
              obsessed with shipping small, opinionated products that tell the truth.
              If you think an idea you submitted was roasted unfairly, email us. We will review it
              (and probably agree the AI was too polite).
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
