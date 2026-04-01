"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => router.push("/admin/dashboard"), 1000);
  }

  return (
    <main className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-white rounded-2xl p-3 mb-4 shadow-xl">
            <Image src="/logo.png" alt="Malens Medcare" width={120} height={36} className="h-9 w-auto object-contain" />
          </div>
          <h1 className="text-white text-xl font-black">Staff Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Admin access only</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-7 shadow-2xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="admin@malensmedcare.com"
                autoComplete="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">error</span>
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2 text-sm mt-2"
            >
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Signing in...</>
              ) : (
                <><span className="material-symbols-outlined text-lg">login</span>Sign In</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Demo — any credentials will work
        </p>
      </div>
    </main>
  );
}
