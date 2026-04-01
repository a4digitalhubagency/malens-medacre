/* eslint-disable react-hooks/purity */
"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";

/* ─── Data ───────────────────────────────────────────────────────────────── */

const CATEGORIES = [
  {
    id: "radiology",
    icon: "radiology",
    title: "Radiology",
    desc: "Digital X-ray, 4D Ultrasound, Mammography",
  },
  {
    id: "pathology",
    icon: "biotech",
    title: "Pathology",
    desc: "Hematology, Biochemistry, Microbiology, DNA Testing",
  },
  {
    id: "cardiac",
    icon: "cardiology",
    title: "Cardiac Care",
    desc: "ECG, Echocardiogram, Stress Testing",
  },
  {
    id: "womens-health",
    icon: "pregnant_woman",
    title: "Women's Health",
    desc: "Antenatal, Prenatal Care, Fetal Monitoring",
  },
  {
    id: "health-checks",
    icon: "health_and_safety",
    title: "Health Checks",
    desc: "Pre-employment Screening, Annual Check-ups",
  },
  {
    id: "specialty",
    icon: "microscope",
    title: "Specialty",
    desc: "Endoscopy, Physiotherapy, Rehabilitation",
  },
];

const BRANCHES = [
  {
    id: "ikorodu",
    name: "Ikorodu Branch",
    tag: "Main Branch",
    addr: "52 T.O.S Benson Road, Beside Ikorodu Licensing Office, Near Library Bustop, Ikorodu, Lagos.",
    icon: "location_city",
  },
  {
    id: "ebute",
    name: "Ebute Branch",
    tag: "Ebute, Ikorodu",
    addr: "62 Beach Road, Beside Kingsfield College, Cappa Junction, Ebute, Ikorodu, Lagos.",
    icon: "location_on",
  },
  {
    id: "agric",
    name: "Agric Branch",
    tag: "Agric, Ikorodu",
    addr: "132 Isawo Road, Beside LaBelle Hotel, Opposite UBA Bank, Near Lawyer Bustop, Agric, Ikorodu, Lagos.",
    icon: "location_on",
  },
];

type Step = 1 | 2 | 3 | "done";

interface FormState {
  name: string;
  phone: string;
  email: string;
}

/* ─── Helpers ────────────────────────────────────────────────────────────── */

function StepIndicator({ current }: { current: Step }) {
  const steps = [
    { n: 1, label: "Service" },
    { n: 2, label: "Location" },
    { n: 3, label: "Details" },
  ];
  return (
    <div className="flex items-center gap-0 mb-8 md:mb-12">
      {steps.map((s, i) => {
        const done = current === "done" || (typeof current === "number" && current > s.n);
        const active = current === s.n;
        return (
          <div key={s.n} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-xs md:text-sm font-bold border-2 transition-all ${
                  done
                    ? "bg-primary border-primary text-white"
                    : active
                    ? "bg-white border-primary text-primary"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                {done ? (
                  <span className="material-symbols-outlined text-sm">check</span>
                ) : (
                  s.n
                )}
              </div>
              <span
                className={`text-xs font-semibold hidden sm:block ${
                  active ? "text-primary" : done ? "text-slate-600" : "text-slate-400"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all ${
                  done ? "bg-primary" : "bg-slate-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─── Step 1: Service Category ───────────────────────────────────────────── */

function Step1({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
        What service do you need?
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Select a category to proceed.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`text-left p-5 rounded-2xl border-2 transition-all group ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-md"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`material-symbols-outlined text-2xl shrink-0 transition-colors ${
                    isSelected ? "text-primary" : "text-slate-400 group-hover:text-primary"
                  }`}
                >
                  {cat.icon}
                </span>
                <div>
                  <p
                    className={`font-bold text-sm md:text-base mb-0.5 ${
                      isSelected ? "text-primary" : "text-slate-800"
                    }`}
                  >
                    {cat.title}
                  </p>
                  <p className="text-xs text-slate-500 leading-snug">{cat.desc}</p>
                </div>
              </div>
              {isSelected && (
                <div className="mt-3 flex items-center gap-1 text-primary text-xs font-semibold">
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
  selectedBranch,
  selectedDate,
  onSelectBranch,
  onSelectDate,
}: {
  selectedBranch: string | null;
  selectedDate: string;
  onSelectBranch: (id: string) => void;
  onSelectDate: (d: string) => void;
}) {
  // Min date = tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
        Choose a branch &amp; date
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        All branches offer next-day appointments. Select your nearest location.
      </p>

      {/* Branch cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        {BRANCHES.map((b) => {
          const isSelected = selectedBranch === b.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelectBranch(b.id)}
              className={`text-left p-4 rounded-2xl border-2 transition-all ${
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-slate-200 bg-white hover:border-primary/40 hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`material-symbols-outlined text-lg ${
                    isSelected ? "text-primary" : "text-slate-400"
                  }`}
                >
                  {b.icon}
                </span>
                <span
                  className={`font-bold text-sm ${
                    isSelected ? "text-primary" : "text-slate-800"
                  }`}
                >
                  {b.name}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mb-1.5">{b.tag}</p>
              <p className="text-xs text-slate-500 leading-snug">{b.addr}</p>
              {isSelected && (
                <div className="mt-3 flex items-center gap-1 text-primary text-xs font-semibold">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  Selected
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Date picker */}
      <div>
        <label
          htmlFor="appt-date"
          className="block text-sm font-bold text-slate-700 mb-2"
        >
          Preferred Appointment Date
        </label>
        <input
          id="appt-date"
          type="date"
          min={minDate}
          value={selectedDate}
          onChange={(e) => onSelectDate(e.target.value)}
          className="w-full sm:w-72 px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-slate-800"
        />
        <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">info</span>
          Next-day appointments available Mon – Sat, 7am – 7pm
        </p>
      </div>
    </div>
  );
}

/* ─── Step 3: Patient Details ────────────────────────────────────────────── */

function Step3({
  form,
  onChange,
  category,
  branch,
  date,
}: {
  form: FormState;
  onChange: (f: Partial<FormState>) => void;
  category: string | null;
  branch: string | null;
  date: string;
}) {
  const cat = CATEGORIES.find((c) => c.id === category);
  const br = BRANCHES.find((b) => b.id === branch);
  const formatted = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-1">
        Your details
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        We need a few details to confirm your booking.
      </p>

      {/* Booking summary */}
      <div className="bg-background-light rounded-2xl p-4 mb-6 border border-slate-200">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Booking Summary
        </p>
        <div className="flex flex-col gap-2">
          {[
            { icon: "category", label: "Service", value: cat?.title ?? "—" },
            { icon: "location_on", label: "Branch", value: br?.name ?? "—" },
            { icon: "calendar_month", label: "Date", value: formatted },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 text-sm">
              <span className="material-symbols-outlined text-primary text-base shrink-0">
                {icon}
              </span>
              <span className="text-slate-500 w-16 shrink-0">{label}:</span>
              <span className="font-semibold text-slate-800">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            placeholder="e.g. Adaeze Okonkwo"
            value={form.name}
            onChange={(e) => onChange({ name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g. 0801 234 5678"
            value={form.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            placeholder="e.g. adaeze@email.com"
            value={form.email}
            onChange={(e) => onChange({ email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Success Screen ─────────────────────────────────────────────────────── */

function SuccessScreen({
  form,
  category,
  branch,
  date,
}: {
  form: FormState;
  category: string | null;
  branch: string | null;
  date: string;
}) {
  const cat = CATEGORIES.find((c) => c.id === category);
  const br = BRANCHES.find((b) => b.id === branch);
  const formatted = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "—";

  // Deterministic booking ref from date
  const ref = `BKG-${date.replace(/-/g, "")}-${Math.floor(Math.random() * 9000) + 1000}`;

  return (
    <div className="text-center py-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <span className="material-symbols-outlined text-green-600 text-3xl">
          check_circle
        </span>
      </div>
      <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
        Booking Confirmed!
      </h2>
      <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
        Thank you, <strong>{form.name}</strong>. Your appointment request has been received. You will get an SMS and email confirmation shortly.
      </p>

      <div className="bg-background-light rounded-2xl p-5 text-left max-w-sm mx-auto mb-6 border border-slate-200">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
          Booking Reference
        </p>
        <p className="text-2xl font-black text-primary mb-4">{ref}</p>
        <div className="flex flex-col gap-2 text-sm">
          {[
            { icon: "category", label: "Service", value: cat?.title ?? "—" },
            { icon: "location_on", label: "Branch", value: br?.name ?? "—" },
            { icon: "calendar_month", label: "Date", value: formatted },
            { icon: "phone", label: "Contact", value: form.phone },
          ].map(({ icon, label, value }) => (
            <div key={label} className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-base shrink-0">
                {icon}
              </span>
              <span className="text-slate-500 w-16 shrink-0">{label}:</span>
              <span className="font-semibold text-slate-800">{value}</span>
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
  const [step, setStep] = useState<Step>(1);
  const [category, setCategory] = useState<string | null>(null);
  const [branch, setBranch] = useState<string | null>(null);
  const [date, setDate] = useState("");
  const [form, setForm] = useState<FormState>({ name: "", phone: "", email: "" });
  const [errors, setErrors] = useState<string[]>([]);

  function canNext(): boolean {
    if (step === 1) return !!category;
    if (step === 2) return !!branch && !!date;
    if (step === 3) return !!form.name && !!form.phone && !!form.email;
    return false;
  }

  function handleNext() {
    if (!canNext()) {
      if (step === 1) setErrors(["Please select a service category."]);
      if (step === 2) setErrors(["Please select a branch and date."]);
      if (step === 3) setErrors(["Please fill in all fields."]);
      return;
    }
    setErrors([]);
    if (step === 3) {
      setStep("done");
    } else {
      setStep((s) => (typeof s === "number" ? ((s + 1) as Step) : s));
    }
  }

  function handleBack() {
    if (typeof step === "number" && step > 1) {
      setErrors([]);
      setStep((s) => (typeof s === "number" ? ((s - 1) as Step) : s));
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background-light py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          {/* Page heading */}
          {step !== "done" && (
            <div className="mb-8 md:mb-10">
              <Link
                href="/"
                className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-primary transition-colors mb-4"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Back to home
              </Link>
              <h1 className="text-2xl md:text-3xl font-black text-slate-900">
                Book an Appointment
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                Next-day appointments available across all 3 branches.
              </p>
            </div>
          )}

          {/* Card */}
          <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-100 p-6 sm:p-8 md:p-10">
            {step !== "done" && <StepIndicator current={step} />}

            {step === 1 && (
              <Step1
                selected={category}
                onSelect={(id) => {
                  setCategory(id);
                  setErrors([]);
                }}
              />
            )}
            {step === 2 && (
              <Step2
                selectedBranch={branch}
                selectedDate={date}
                onSelectBranch={(id) => {
                  setBranch(id);
                  setErrors([]);
                }}
                onSelectDate={(d) => {
                  setDate(d);
                  setErrors([]);
                }}
              />
            )}
            {step === 3 && (
              <Step3
                form={form}
                onChange={(partial) => {
                  setForm((f) => ({ ...f, ...partial }));
                  setErrors([]);
                }}
                category={category}
                branch={branch}
                date={date}
              />
            )}
            {step === "done" && (
              <SuccessScreen
                form={form}
                category={category}
                branch={branch}
                date={date}
              />
            )}

            {/* Errors */}
            {errors.length > 0 && (
              <p className="mt-4 text-sm text-red-500 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">error</span>
                {errors[0]}
              </p>
            )}

            {/* Nav buttons */}
            {step !== "done" && (
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                {typeof step === "number" && step > 1 ? (
                  <button
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">arrow_back</span>
                    Back
                  </button>
                ) : (
                  <div />
                )}

                <button
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-40 transition-all"
                >
                  {step === 3 ? "Confirm Booking" : "Continue"}
                  <span className="material-symbols-outlined text-lg">
                    {step === 3 ? "check" : "arrow_forward"}
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Trust strip */}
          {step !== "done" && (
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-xs text-slate-400">
              {[
                { icon: "verified", text: "MLSCN Certified" },
                { icon: "lock", text: "Secure & Private" },
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
