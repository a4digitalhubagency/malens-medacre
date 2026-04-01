"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

export default function PortalPage() {
  const router = useRouter();
  const [patientId, setPatientId] = useState("");
  const [accessCode, setAccessCode] = useState("");
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);

  const hasError = touched && (!patientId.trim() || !accessCode.trim());

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!patientId.trim() || !accessCode.trim()) return;
    setLoading(true);
    // Demo: simulate a brief auth check, then navigate to results
    setTimeout(() => {
      router.push("/portal/results");
    }, 1200);
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background-light flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">

          {/* Lock icon header */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-primary text-3xl">
                lock
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">
              Patient Results Portal
            </h1>
            <p className="text-slate-500 text-sm">
              Enter your credentials to access your test results securely.
            </p>
          </div>

          {/* Login card */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-7 sm:p-9">
            <form onSubmit={handleSubmit} noValidate className="space-y-5">

              {/* Patient ID */}
              <div>
                <label
                  htmlFor="patient-id"
                  className="block text-sm font-bold text-slate-700 mb-2"
                >
                  Patient ID / Invoice No.
                </label>
                <input
                  id="patient-id"
                  type="text"
                  placeholder="e.g. AML-2000"
                  autoComplete="username"
                  value={patientId}
                  onChange={(e) => setPatientId(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary/20 ${
                    hasError && !patientId.trim()
                      ? "border-red-300 focus:border-red-400"
                      : "border-transparent focus:border-primary"
                  }`}
                />
                {hasError && !patientId.trim() && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>
                    Patient ID is required
                  </p>
                )}
              </div>

              {/* Access Code */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="access-code"
                    className="block text-sm font-bold text-slate-700"
                  >
                    Access Code
                  </label>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-xs text-primary hover:underline font-medium"
                  >
                    Need help?
                  </a>
                </div>
                <input
                  id="access-code"
                  type="password"
                  placeholder="Enter your access code"
                  autoComplete="current-password"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className={`w-full px-4 py-3 rounded-xl border-2 bg-slate-50 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-primary/20 ${
                    hasError && !accessCode.trim()
                      ? "border-red-300 focus:border-red-400"
                      : "border-transparent focus:border-primary"
                  }`}
                />
                {hasError && !accessCode.trim() && (
                  <p className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">error</span>
                    Access code is required
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-60 transition-all flex items-center justify-center gap-2 text-sm"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">key</span>
                    View My Results
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-100" />
              <span className="text-xs text-slate-400">secured by</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary/50">
                  shield
                </span>
                End-to-end encrypted
              </span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-primary/50">
                  verified
                </span>
                MLSCN Certified
              </span>
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-xs text-slate-400 mt-6">
            Your access code is printed on your appointment receipt.
            <br />
            Contact{" "}
            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-medium hover:underline"
            >
              our support team
            </a>{" "}
            if you need help.
          </p>
        </div>
      </main>
    </>
  );
}
