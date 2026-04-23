import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ArrowLeft, Mail, KeyRound } from "lucide-react";

export default function ForgotPassword() {
  const subject = encodeURIComponent("Password Reset Request — Roastmaster");
  const body = encodeURIComponent(
    "Hi Roastmaster team,\n\nI forgot the password for my account. Please help me reset it.\n\nRegistered email: <your email here>\n\nThanks!"
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA] flex flex-col" data-testid="forgot-password-page">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-xl">
          <Link
            to="/login"
            data-testid="forgot-back-link"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-[#A1A1AA] hover:text-[#FFD60A] mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Login
          </Link>

          <span className="label-tag">Account Recovery</span>
          <h1 className="font-display uppercase text-5xl md:text-6xl leading-[0.9] tracking-tight mt-4">
            Forgot your<br />
            <span className="text-[#FF3B30]">password?</span>
          </h1>
          <p className="font-serif-italic text-xl text-[#A1A1AA] mt-4">
            It happens. We&rsquo;ll help you reset it — manually, safely, and quickly.
          </p>

          <div className="mt-10 border border-[#27272A] p-6 md:p-8 space-y-5">
            <div className="flex items-start gap-4">
              <KeyRound className="h-5 w-5 text-[#FFD60A] shrink-0 mt-1" />
              <div>
                <p className="label-tag">Step 1</p>
                <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">
                  Send us an email from your registered email address with the subject
                  <span className="text-[#FAFAFA]"> &ldquo;Password Reset&rdquo;</span>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 border-t border-[#27272A] pt-5">
              <Mail className="h-5 w-5 text-[#FF3B30] shrink-0 mt-1" />
              <div>
                <p className="label-tag">Step 2</p>
                <p className="mt-2 text-sm text-[#A1A1AA] leading-relaxed">
                  Our team manually verifies and resets your password within
                  <span className="text-[#FAFAFA]"> 24 hours</span> (usually much faster).
                  You&rsquo;ll receive a temporary password that you can change after logging in.
                </p>
              </div>
            </div>
          </div>

          <a
            href={`mailto:contact@pixelbond.in?subject=${subject}&body=${body}`}
            data-testid="forgot-email-btn"
            className="btn-brutal w-full mt-6 !py-4"
          >
            <Mail className="h-5 w-5" /> Email contact@pixelbond.in
          </a>

          <p className="mt-5 text-[10px] uppercase tracking-[0.25em] text-[#71717A] text-center">
            Or reach out to us on <a href="mailto:xenithfounders@gmail.com" className="text-[#A1A1AA] hover:text-[#FFD60A]">xenithfounders@gmail.com</a>
          </p>

          <p className="mt-8 text-sm text-[#A1A1AA] text-center">
            Remembered it?{" "}
            <Link to="/login" data-testid="forgot-login-link" className="text-[#FFD60A] hover:text-[#FF3B30] underline underline-offset-4">
              Back to login
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
