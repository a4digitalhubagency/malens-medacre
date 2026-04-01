/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/purity */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  { id: "radiology",      icon: "radiology",         title: "Radiology",      desc: "X-ray, 4D Ultrasound, Mammography" },
  { id: "pathology",      icon: "biotech",            title: "Pathology",      desc: "Hematology, Biochemistry, Microbiology" },
  { id: "cardiac",        icon: "cardiology",         title: "Cardiac Care",   desc: "ECG, Echocardiogram, Stress Testing" },
  { id: "womens-health",  icon: "pregnant_woman",     title: "Women's Health", desc: "Antenatal, Prenatal, Fetal Monitoring" },
  { id: "health-checks",  icon: "health_and_safety",  title: "Health Checks",  desc: "Pre-employment, Annual Screenings" },
  { id: "specialty",      icon: "medical_services",   title: "Specialty",      desc: "Endoscopy, Physiotherapy, Rehab" },
];

const BRANCHES = [
  { id: "ikorodu", name: "Ikorodu Branch", tag: "Main Branch",       addr: "52 T.O.S Benson Road, Beside Ikorodu Licensing Office, Near Library Bustop, Ikorodu, Lagos." },
  { id: "ebute",   name: "Ebute Branch",   tag: "Ebute, Ikorodu",    addr: "62 Beach Road, Beside Kingsfield College, Cappa Junction, Ebute, Ikorodu, Lagos." },
  { id: "agric",   name: "Agric Branch",   tag: "Agric, Ikorodu",    addr: "132 Isawo Road, Beside LaBelle Hotel, Opposite UBA Bank, Near Lawyer Bustop, Agric, Ikorodu, Lagos." },
];

type Step = 1 | 2 | 3 | "done";
interface FormState { name: string; phone: string; email: string }

/* ─── Step Indicator ─────────────────────────────────────────────────────── */

function StepIndicator({ current }: { current: Step }) {
  const steps = [{ n: 1, label: "Service" }, { n: 2, label: "Location" }, { n: 3, label: "Details" }];
  return (
    <div className="flex items-center mb-8">
      {steps.map((s, i) => {
        const done   = current === "done" || (typeof current === "number" && current > s.n);
        const active = current === s.n;
        return (
          <div key={s.n} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-200 ${
                done   ? "bg-primary border-primary text-white" :
                active ? "bg-white border-primary text-primary shadow-md shadow-primary/20" :
                         "bg-white border-slate-200 text-slate-400"
              }`}>
                {done
                  ? <span className="material-symbols-outlined text-sm">check</span>
                  : s.n}
              </div>
              <span className={`text-xs font-semibold ${
                active ? "text-primary" : done ? "text-slate-600" : "text-slate-400"
              }`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-4 transition-all duration-300 ${done ? "bg-primary" : "bg-slate-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Step 1: Service Category ───────────────────────────────────────────── */

function Step1({ selected, onSelect }: { selected: string | null; onSelect: (id: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">What service do you need?</h2>
      <p className="text-slate-500 text-sm mb-5">Tap a category to continue.</p>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`text-left p-4 rounded-2xl border-2 transition-all duration-150 active:scale-[0.97] group ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-md shadow-primary/10"
                  : "border-slate-200 bg-white hover:border-primary/50 hover:shadow-md"
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                isSelected ? "bg-primary" : "bg-slate-100 group-hover:bg-primary/10"
              }`}>
                <span className={`material-symbols-outlined text-lg ${isSelected ? "text-white" : "text-slate-500 group-hover:text-primary"}`}>
                  {cat.icon}
                </span>
              </div>
              <p className={`font-bold text-sm leading-tight mb-1 ${isSelected ? "text-primary" : "text-slate-800"}`}>
                {cat.title}
              </p>
              <p className="text-xs text-slate-400 leading-snug">{cat.desc}</p>
              {isSelected && (
                <div className="mt-2.5 flex items-center gap-1 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Step 2: Branch + Date ──────────────────────────────────────────────── */

function Step2({
  selectedBranch, selectedDate, onSelectBranch, onSelectDate,
}: {
  selectedBranch: string | null; selectedDate: string;
  onSelectBranch: (id: string) => void; onSelectDate: (d: string) => void;
}) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Choose a branch &amp; date</h2>
      <p className="text-slate-500 text-sm mb-5">Next-day appointments available at all branches.</p>

      {/* Branch list */}
      <div className="flex flex-col gap-3 mb-6">
        {BRANCHES.map((b) => {
          const isSelected = selectedBranch === b.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelectBranch(b.id)}
              className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-150 active:scale-[0.99] ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-sm"
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Radio indicator */}
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                  isSelected ? "border-primary" : "border-slate-300"
                }`}>
                  {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`font-bold text-sm ${isSelected ? "text-primary" : "text-slate-800"}`}>
                      {b.name}
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-medium">
                      {b.tag}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 leading-snug">{b.addr}</p>
                </div>

                <span className={`material-symbols-outlined text-lg shrink-0 ${isSelected ? "text-primary" : "text-slate-300"}`}>
                  location_on
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Date picker */}
      <div>
        <label htmlFor="appt-date" className="block text-sm font-bold text-slate-700 mb-2">
          Preferred Appointment Date
        </label>
        <input
          id="appt-date"
          type="date"
          min={minDate}
          value={selectedDate}
          onChange={(e) => onSelectDate(e.target.value)}
          className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base text-slate-800"
        />
        <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">info</span>
          Mon – Sat, 7am – 7pm. Next-day slots available.
        </p>
      </div>
    </div>
  );
}

/* ─── Step 3: Patient Details ────────────────────────────────────────────── */

function Step3({
  form, onChange, category, branch, date,
}: {
  form: FormState; onChange: (f: Partial<FormState>) => void;
  category: string | null; branch: string | null; date: string;
}) {
  const cat = CATEGORIES.find((c) => c.id === category);
  const br  = BRANCHES.find((b) => b.id === branch);
  const formatted = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-NG", {
        weekday: "short", day: "numeric", month: "short", year: "numeric",
      })
    : "—";

  return (
    <div>
      <h2 className="text-xl font-bold text-slate-900 mb-1">Your details</h2>
      <p className="text-slate-500 text-sm mb-5">Almost done — just a few more details.</p>

      {/* Compact booking summary */}
      <div className="bg-primary/5 border border-primary/15 rounded-2xl p-4 mb-6">
        <p className="text-xs font-bold text-primary/70 uppercase tracking-widest mb-2.5">Booking Summary</p>
        <div className="flex flex-col gap-1.5">
          {[
            { icon: "category",       label: "Service", value: cat?.title ?? "—" },
            { icon: "location_on",    label: "Branch",  value: br?.name ?? "—" },
            { icon: "calendar_month", label: "Date",    value: formatted },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5 text-sm">
              <span className="material-symbols-outlined text-primary text-base shrink-0">{icon}</span>
              <span className="text-slate-500 w-14 shrink-0 text-xs">{label}:</span>
              <span className="font-semibold text-slate-800 text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form fields — 16px font everywhere to prevent iOS zoom */}
      <div className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
          <input
            type="text"
            placeholder="e.g. Adaeze Okonkwo"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
          <input
            type="tel"
            placeholder="e.g. 0801 234 5678"
            value={form.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="e.g. adaeze@email.com"
            value={form.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="w-full px-4 py-3.5 rounded-xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Success Screen ─────────────────────────────────────────────────────── */

function SuccessScreen({ form, category, branch, date }: {
  form: FormState; category: string | null; branch: string | null; date: string;
}) {
  const cat = CATEGORIES.find((c) => c.id === category);
  const br  = BRANCHES.find((b) => b.id === branch);
  const formatted = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-NG", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
      })
    : "—";

  const ref = `BKG-${date.replace(/-/g, "")}-${Math.floor(Math.random() * 9000) + 1000}`;

  return (
    <div className="text-center py-4">
      {/* Animated check */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <span className="material-symbols-outlined text-green-500 text-3xl">check_circle</span>
      </div>

      <h2 className="text-2xl font-black text-slate-900 mb-2">Booking Confirmed!</h2>
      <p className="text-slate-500 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
        Thank you, <strong className="text-slate-700">{form.name}</strong>. You'll receive an SMS and email confirmation shortly.
      </p>

      {/* Reference card */}
      <div className="bg-background-light rounded-2xl p-5 text-left max-w-xs mx-auto mb-6 border border-slate-200">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Booking Reference</p>
        <p className="text-2xl font-black text-primary mb-4 tracking-wide">{ref}</p>
        <div className="flex flex-col gap-2 text-sm border-t border-slate-200 pt-3">
          {[
            { icon: "category",       label: "Service",  value: cat?.title ?? "—" },
            { icon: "location_on",    label: "Branch",   value: br?.name ?? "—" },
            { icon: "calendar_month", label: "Date",     value: formatted },
            { icon: "phone",          label: "Contact",  value: form.phone },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">{icon}</span>
              <span className="text-slate-400 w-14 shrink-0 text-xs pt-0.5">{label}:</span>
              <span className="font-semibold text-slate-800 text-sm leading-snug">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all text-sm"
      >
        <span className="material-symbols-outlined text-lg">home</span>
        Back to Home
      </Link>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function BookPage() {
  const [step,     setStep]     = useState<Step>(1);
  const [category, setCategory] = useState<string | null>(null);
  const [branch,   setBranch]   = useState<string | null>(null);
  const [date,     setDate]     = useState("");
  const [form,     setForm]     = useState<FormState>({ name: "", phone: "", email: "" });
  const [error,    setError]    = useState("");

  const cardRef = useRef<HTMLDivElement>(null);

  // Scroll wizard card into view on every step change
  useEffect(() => {
    cardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  // Auto-advance when category is tapped — common mobile booking UX pattern
  function handleCategorySelect(id: string) {
    setCategory(id);
    setError("");
    setTimeout(() => setStep(2), 220);
  }

  function handleNext() {
    if (step === 1 && !category) { setError("Please select a service category."); return; }
    if (step === 2 && !branch)   { setError("Please select a branch."); return; }
    if (step === 2 && !date)     { setError("Please pick an appointment date."); return; }
    if (step === 3) {
      if (!form.name.trim())  { setError("Please enter your full name."); return; }
      if (!form.phone.trim()) { setError("Please enter your phone number."); return; }
      if (!form.email.trim()) { setError("Please enter your email address."); return; }
      setStep("done");
      return;
    }
    setError("");
    setStep((s) => (typeof s === "number" ? (s + 1) as Step : s));
  }

  function handleBack() {
    if (typeof step === "number" && step > 1) {
      setError("");
      setStep((s) => (typeof s === "number" ? (s - 1) as Step : s));
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background-light py-6 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">

          {/* Back link + heading */}
          {step !== "done" && (
            <div className="mb-6">
              <Link href="/" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-3">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to home
              </Link>
              <h1 className="text-2xl font-black text-slate-900">Book an Appointment</h1>
              <p className="text-slate-500 text-sm mt-0.5">Next-day slots available across all 3 branches.</p>
            </div>
          )}

          {/* Wizard card */}
          <div
            ref={cardRef}
            className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-8"
            style={{ scrollMarginTop: "90px" }}
          >
            {step !== "done" && <StepIndicator current={step} />}

            {step === 1    && <Step1 selected={category} onSelect={handleCategorySelect} />}
            {step === 2    && <Step2 selectedBranch={branch} selectedDate={date} onSelectBranch={(id) => { setBranch(id); setError(""); }} onSelectDate={(d) => { setDate(d); setError(""); }} />}
            {step === 3    && <Step3 form={form} onChange={(p) => { setForm((f) => ({ ...f, ...p })); setError(""); }} category={category} branch={branch} date={date} />}
            {step === "done" && <SuccessScreen form={form} category={category} branch={branch} date={date} />}

            {/* Inline error */}
            {error && (
              <div className="mt-4 flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                <span className="material-symbols-outlined text-base shrink-0">error</span>
                {error}
              </div>
            )}

            {/* Nav — hidden on step 1 (auto-advances) and done */}
            {step !== "done" && step !== 1 && (
              <div className="flex items-center gap-3 mt-7 pt-5 border-t border-slate-100">
                <button
                  onClick={handleBack}
                  className="flex items-center justify-center gap-1.5 px-5 py-3.5 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:bg-slate-50 transition-all active:scale-[0.97]"
                >
                  <span className="material-symbols-outlined text-base">arrow_back</span>
                  Back
                </button>

                <button
                  onClick={handleNext}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all active:scale-[0.97]"
                >
                  {step === 3 ? "Confirm Booking" : "Continue"}
                  <span className="material-symbols-outlined text-lg">{step === 3 ? "check" : "arrow_forward"}</span>
                </button>
              </div>
            )}

            {/* Step 1 hint — since it auto-advances, show a subtle cue */}
            {step === 1 && (
              <p className="text-center text-xs text-slate-400 mt-5">
                Tap any category above to continue
              </p>
            )}
          </div>

          {/* Trust strip */}
          {step !== "done" && (
            <div className="flex items-center justify-center gap-5 mt-5 text-xs text-slate-400 flex-wrap">
              {[
                { icon: "verified",      text: "MLSCN Certified" },
                { icon: "lock",          text: "Secure & Private" },
                { icon: "support_agent", text: "24/7 Support" },
              ].map(({ icon, text }) => (
                <span key={text} className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-primary/50">{icon}</span>
                  {text}
                </span>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
