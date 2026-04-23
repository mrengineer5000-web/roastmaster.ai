import React from "react";
import { Link } from "react-router-dom";
import { Flame } from "lucide-react";

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="border-t border-[#27272A] bg-[#050505]">
      <div className="mx-auto max-w-7xl px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-[#FF3B30]" />
              <span className="font-display text-2xl uppercase tracking-tight">
                Roast<span className="text-[#FF3B30]">master</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm text-[#A1A1AA] leading-relaxed">
              An AI angel investor that actually tells you the truth. Five brutal reality checks. Five sharp fixes. Zero pleasantries.
            </p>
            <p className="mt-6 text-[10px] uppercase tracking-[0.25em] text-[#71717A]">
              Built with pain by <span className="text-[#FAFAFA]">XenithHQ</span>
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-[#71717A]">
              Secured by <span className="text-[#FAFAFA]">Razorpay</span>
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="label-tag">Legal</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/terms" data-testid="footer-link-terms" className="text-[#A1A1AA] hover:text-[#FFD60A] transition-colors">Terms &amp; Conditions</Link></li>
              <li><Link to="/privacy" data-testid="footer-link-privacy" className="text-[#A1A1AA] hover:text-[#FFD60A] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/refund" data-testid="footer-link-refund" className="text-[#A1A1AA] hover:text-[#FFD60A] transition-colors">Cancellation &amp; Refund</Link></li>
              <li><Link to="/contact" data-testid="footer-link-contact" className="text-[#A1A1AA] hover:text-[#FFD60A] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="label-tag">Reach Out</p>
            <ul className="mt-5 space-y-2 text-sm text-[#A1A1AA]">
              <li><a href="mailto:contact@pixelbond.in" className="hover:text-[#FFD60A] transition-colors">contact@pixelbond.in</a></li>
              <li><a href="mailto:xenithfounders@gmail.com" className="hover:text-[#FFD60A] transition-colors">xenithfounders@gmail.com</a></li>
              <li><a href="tel:+919350015443" className="hover:text-[#FFD60A] transition-colors">+91 93500 15443</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#27272A] flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-[10px] uppercase tracking-[0.25em] text-[#71717A]">
          <span>© {new Date().getFullYear()} Roastmaster by XenithHQ · All rights reserved</span>
          <span>No egos were harmed in the making of this product. Probably.</span>
        </div>
      </div>
    </footer>
  );
}
