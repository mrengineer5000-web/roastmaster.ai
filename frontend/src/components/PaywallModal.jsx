import React, { useState } from "react";
import { X, Zap } from "lucide-react";
import { api, loadRazorpay } from "../lib/api";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

export default function PaywallModal({ open, onClose, onSuccess }) {
  const { user, refreshUser } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handlePay = async () => {
    setLoading(true);
    try {
      const ok = await loadRazorpay();
      if (!ok) { toast.error("Failed to load Razorpay"); setLoading(false); return; }
      const { data } = await api.post("/create-order");
      const options = {
        key: data.key_id,
        amount: data.amount,
        currency: data.currency,
        name: "Roastmaster",
        description: "One Brutal Startup Roast",
        order_id: data.order_id,
        prefill: { name: user?.name, email: user?.email },
        theme: { color: "#FF3B30" },
        handler: async (resp) => {
          try {
            await api.post("/verify-payment", {
              razorpay_order_id: resp.razorpay_order_id,
              razorpay_payment_id: resp.razorpay_payment_id,
              razorpay_signature: resp.razorpay_signature,
            });
            await refreshUser();
            toast.success("Payment verified. Bring on the pain.");
            onSuccess?.();
            onClose?.();
          } catch (e) {
            toast.error("Payment verification failed");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      };
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => { toast.error("Payment failed"); setLoading(false); });
      rzp.open();
    } catch (e) {
      toast.error(e.response?.data?.detail || "Could not initiate payment");
      setLoading(false);
    }
  };

  return (
    <div data-testid="paywall-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-lg border border-[#27272A] bg-[#050505] slam-in">
        <div className="flex items-center justify-between border-b border-[#27272A] px-5 py-3">
          <span className="label-tag">NOTICE // PAYWALL</span>
          <button data-testid="paywall-close" onClick={onClose} className="text-[#A1A1AA] hover:text-[#FF3B30]">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          <h2 className="font-display uppercase text-4xl md:text-5xl leading-[0.95] tracking-tight">
            Your free<br/>
            roast is <span className="text-[#FF3B30]">gone.</span>
          </h2>

          <p className="mt-4 font-serif-italic text-xl text-[#A1A1AA]">
            The first hit is always free.
          </p>

          <div className="mt-6 border border-[#27272A] p-5">
            <p className="label-tag mb-2">One more dose of reality</p>
            <div className="flex items-end gap-2">
              <span className="font-display text-7xl leading-none text-[#FFD60A]">₹49</span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#71717A] pb-3">per roast</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-[#A1A1AA]">
              <li className="flex gap-2"><span className="text-[#FFD60A]">›</span> 1 brutal AI roast with score + 10 callouts</li>
              <li className="flex gap-2"><span className="text-[#FFD60A]">›</span> Downloadable shareable roast card</li>
              <li className="flex gap-2"><span className="text-[#FFD60A]">›</span> Feature on the Hall of Shame</li>
            </ul>
          </div>

          <button
            data-testid="paywall-pay-button"
            onClick={handlePay}
            disabled={loading}
            className="btn-brutal btn-yellow w-full mt-6"
          >
            <Zap className="h-5 w-5" />
            {loading ? "Opening Razorpay..." : "Pay ₹49 & Get Roasted"}
          </button>
          <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#71717A] text-center">
            Secured by Razorpay // UPI · Cards · Wallets
          </p>
        </div>
      </div>
    </div>
  );
}
