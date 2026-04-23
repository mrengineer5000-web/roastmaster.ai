import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { Flame, ArrowRight, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export default function Auth({ mode }) {
  const isLogin = mode === "login";
  const { login, register } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) await login(email, password);
      else await register(name, email, password);
      toast.success(isLogin ? "Welcome back, savage." : "Account created. Now bring the pain.");
      nav(loc.state?.from || "/");
    } catch (err) {
      toast.error(err.response?.data?.detail || "Authentication failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FAFAFA]">
      <Navbar />
      <div className="relative min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-2">
        <div className="hidden lg:flex relative border-r border-[#27272A] bg-[#0A0A0A] overflow-hidden">
          <div className="absolute inset-0 grid-lines opacity-[0.08]"/>
          <div className="absolute inset-0 grain"/>
          <div className="relative z-10 flex flex-col justify-between p-12 w-full">
            <div className="flex items-center gap-2">
              <Flame className="h-6 w-6 text-[#FF3B30]"/>
              <span className="font-display text-2xl uppercase">Roastmaster</span>
            </div>
            <div>
              <p className="label-tag">Warning</p>
              <h2 className="font-display uppercase text-5xl md:text-7xl leading-[0.9] tracking-tight mt-4">
                This is not<br/>
                a <span className="text-[#FF3B30]">safe space.</span>
              </h2>
              <p className="font-serif-italic text-2xl mt-6 text-[#A1A1AA] max-w-md">
                &ldquo;If your ego can&rsquo;t survive an AI roast, it definitely can&rsquo;t survive Series A.&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-4 text-[10px] uppercase tracking-[0.25em] text-[#71717A]">
              <span>Login · Signup</span>
              <span className="h-px flex-1 bg-[#27272A]"/>
              <span>Brutal since 2026</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 md:p-12">
          <form data-testid="auth-form" onSubmit={submit} className="w-full max-w-md">
            <span className="label-tag">{isLogin ? "Login" : "Create Account"}</span>
            <h1 className="font-display uppercase text-5xl md:text-6xl leading-[0.9] tracking-tight mt-3">
              {isLogin ? "Welcome" : "Enter"}
              <br/>
              <span className="text-[#FF3B30]">{isLogin ? "Back." : "The Arena."}</span>
            </h1>

            <div className="mt-8 space-y-4">
              {!isLogin && (
                <div>
                  <label className="label-tag">Name</label>
                  <input
                    data-testid="auth-name-input"
                    required
                    className="input-brutal mt-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>
              )}
              <div>
                <label className="label-tag">Email</label>
                <input
                  data-testid="auth-email-input"
                  type="email"
                  required
                  className="input-brutal mt-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@startup.com"
                />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="label-tag">Password</label>
                  {isLogin && (
                    <Link
                      to="/forgot-password"
                      data-testid="auth-forgot-link"
                      className="text-[10px] uppercase tracking-[0.2em] text-[#A1A1AA] hover:text-[#FFD60A] transition-colors"
                    >
                      Forgot?
                    </Link>
                  )}
                </div>
                <div className="relative mt-2">
                  <input
                    data-testid="auth-password-input"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    className="input-brutal pr-12"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="min 6 characters"
                  />
                  <button
                    type="button"
                    data-testid="auth-password-toggle"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute top-1/2 -translate-y-1/2 right-3 p-1.5 text-[#A1A1AA] hover:text-[#FFD60A] transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button data-testid="auth-submit-btn" type="submit" disabled={loading} className="btn-brutal w-full">
                {loading ? "..." : isLogin ? "Login" : "Create Account"}
                <ArrowRight className="h-5 w-5"/>
              </button>
            </div>

            <p className="mt-6 text-sm text-[#A1A1AA]">
              {isLogin ? "No account?" : "Already have an account?"}{" "}
              <Link
                to={isLogin ? "/signup" : "/login"}
                data-testid="auth-switch-link"
                className="text-[#FFD60A] hover:text-[#FF3B30] underline underline-offset-4"
              >
                {isLogin ? "Sign up" : "Login"}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
