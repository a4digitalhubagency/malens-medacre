"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

/* ─── Demo Data ──────────────────────────────────────────────────────────── */

type PayStatus = "Paid Online" | "Paid Offline" | "Pending";
type ResultStatus = "Uploaded" | "Pending Upload";

interface Appointment {
  id:      string;
  patient: string;
  phone:   string;
  service: string;
  branch:  "Ikorodu" | "Ebute" | "Agric";
  date:    string;
  payment: PayStatus;
  result:  ResultStatus;
}

const APPOINTMENTS: Appointment[] = [
  { id: "BKG-20260401-1042", patient: "Adaeze Okonkwo",   phone: "0801 234 5678", service: "Pathology — FBC",       branch: "Ikorodu", date: "01 Apr 2026", payment: "Paid Online",  result: "Uploaded"       },
  { id: "BKG-20260401-2217", patient: "Emeka Eze",         phone: "0803 456 7890", service: "Radiology — X-Ray",    branch: "Ebute",   date: "01 Apr 2026", payment: "Pending",      result: "Pending Upload" },
  { id: "BKG-20260401-3381", patient: "Fatimah Bello",     phone: "0805 678 9012", service: "Cardiac — ECG",        branch: "Agric",   date: "01 Apr 2026", payment: "Paid Offline", result: "Pending Upload" },
  { id: "BKG-20260401-4456", patient: "Chukwudi Nwosu",    phone: "0807 890 1234", service: "Health Checks",        branch: "Ikorodu", date: "01 Apr 2026", payment: "Paid Online",  result: "Uploaded"       },
  { id: "BKG-20260402-1103", patient: "Ngozi Adeyemi",     phone: "0809 012 3456", service: "Women's Health",       branch: "Ebute",   date: "02 Apr 2026", payment: "Paid Online",  result: "Pending Upload" },
  { id: "BKG-20260402-2278", patient: "Babatunde Lawal",   phone: "0811 234 5678", service: "Radiology — 4D Scan",  branch: "Agric",   date: "02 Apr 2026", payment: "Pending",      result: "Pending Upload" },
  { id: "BKG-20260402-3394", patient: "Amina Suleiman",    phone: "0813 456 7890", service: "Pathology — Thyroid",  branch: "Ikorodu", date: "02 Apr 2026", payment: "Paid Offline", result: "Uploaded"       },
  { id: "BKG-20260402-4412", patient: "Oluwaseun Adesanya",phone: "0815 678 9012", service: "Specialty — Endoscopy",branch: "Ebute",   date: "02 Apr 2026", payment: "Paid Online",  result: "Pending Upload" },
];

/* ─── Stat Card ──────────────────────────────────────────────────────────── */

function StatCard({ icon, label, value, sub, color }: {
  icon: string; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-start gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
        <span className="material-symbols-outlined text-xl text-white">{icon}</span>
      </div>
      <div>
        <p className="text-2xl font-black text-slate-900 leading-tight">{value}</p>
        <p className="text-sm font-semibold text-slate-600">{label}</p>
        {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

/* ─── Payment Badge ──────────────────────────────────────────────────────── */

function PayBadge({ status }: { status: PayStatus }) {
  const styles: Record<PayStatus, string> = {
    "Paid Online":  "bg-green-100 text-green-700",
    "Paid Offline": "bg-blue-100 text-blue-700",
    "Pending":      "bg-yellow-100 text-yellow-700",
  };
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full ${styles[status]}`}>
      {status}
    </span>
  );
}

/* ─── Result Badge ───────────────────────────────────────────────────────── */

function ResultBadge({ status }: { status: ResultStatus }) {
  return status === "Uploaded"
    ? <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
        <span className="material-symbols-outlined text-sm">check_circle</span>Uploaded
      </span>
    : <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-500">
        <span className="material-symbols-outlined text-sm">pending</span>Pending
      </span>;
}

/* ─── Upload Modal ───────────────────────────────────────────────────────── */

function UploadModal({ appt, onClose, onDone }: { appt: Appointment; onClose: () => void; onDone: () => void }) {
  const [uploading, setUploading] = useState(false);
  const [file,      setFile]      = useState<File | null>(null);

  function handleUpload() {
    if (!file) return;
    setUploading(true);
    setTimeout(() => { setUploading(false); onDone(); }, 1500);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-black text-slate-900 text-lg">Upload Results</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
            <span className="material-symbols-outlined text-slate-500">close</span>
          </button>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-5 text-sm">
          <p className="font-bold text-slate-800">{appt.patient}</p>
          <p className="text-slate-500">{appt.service} · {appt.branch} Branch</p>
          <p className="text-xs text-slate-400 mt-0.5">Booking: {appt.id}</p>
        </div>

        <label className="block mb-4">
          <div className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${
            file ? "border-primary bg-primary/5" : "border-slate-200 hover:border-primary/50"
          }`}>
            <span className="material-symbols-outlined text-3xl text-slate-300 mb-2 block">
              {file ? "description" : "upload_file"}
            </span>
            <p className="text-sm font-semibold text-slate-600">
              {file ? file.name : "Click to select PDF report"}
            </p>
            <p className="text-xs text-slate-400 mt-1">{file ? "File ready to upload" : "PDF files only"}</p>
          </div>
          <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        </label>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl border-2 border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="flex-1 py-3 rounded-xl bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {uploading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Uploading...</>
              : <><span className="material-symbols-outlined text-lg">cloud_upload</span>Upload &amp; Notify Patient</>
            }
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Dashboard Page ─────────────────────────────────────────────────────── */

export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>(APPOINTMENTS);
  const [filterBranch,  setFilterBranch]  = useState("All");
  const [filterPayment, setFilterPayment] = useState("All");
  const [filterDate,    setFilterDate]    = useState("");
  const [uploadTarget,  setUploadTarget]  = useState<Appointment | null>(null);
  const [notified,      setNotified]      = useState<string[]>([]);

  /* Filters */
  const visible = appointments.filter((a) => {
    if (filterBranch  !== "All" && a.branch  !== filterBranch)  return false;
    if (filterPayment !== "All" && a.payment !== filterPayment) return false;
    if (filterDate && !a.date.includes(filterDate))             return false;
    return true;
  });

  /* Mark paid */
  function markPaid(id: string) {
    setAppointments((prev) =>
      prev.map((a) => a.id === id ? { ...a, payment: "Paid Offline" } : a)
    );
  }

  /* After upload */
  function handleUploadDone(id: string) {
    setAppointments((prev) =>
      prev.map((a) => a.id === id ? { ...a, result: "Uploaded" } : a)
    );
    setUploadTarget(null);
  }

  /* Notify */
  function notify(id: string) {
    setNotified((prev) => [...prev, id]);
  }

  /* Stats */
  const today       = appointments.filter((a) => a.date === "01 Apr 2026").length;
  const pending     = appointments.filter((a) => a.payment === "Pending").length;
  const uploaded    = appointments.filter((a) => a.result  === "Uploaded").length;
  const total       = appointments.length;

  return (
    <>
      {uploadTarget && (
        <UploadModal
          appt={uploadTarget}
          onClose={() => setUploadTarget(null)}
          onDone={() => handleUploadDone(uploadTarget.id)}
        />
      )}

      <div className="min-h-screen bg-slate-50">

        {/* Top bar */}
        <header className="print-hide bg-white border-b border-slate-200 px-4 sm:px-6 h-16 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image src="/logo.png" alt="Malens Medcare" width={120} height={36} className="h-8 w-auto object-contain" />
            </Link>
            <span className="hidden sm:inline text-xs font-bold bg-primary/10 text-primary px-2.5 py-1 rounded-full uppercase tracking-wider">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-600">
              <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-base">person</span>
              </div>
              <span className="font-semibold">Admin</span>
            </div>
            <Link
              href="/admin"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <span className="material-symbols-outlined text-base">logout</span>
              <span className="hidden sm:inline">Sign Out</span>
            </Link>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10">

          {/* Page title */}
          <div className="mb-6">
            <h1 className="text-2xl font-black text-slate-900">Dashboard</h1>
            <p className="text-slate-500 text-sm mt-0.5">Manage appointments, payments, and test results.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
            <StatCard icon="calendar_month"  label="Today's Appointments" value={today}   sub="01 Apr 2026"        color="bg-primary"       />
            <StatCard icon="pending_actions" label="Pending Payments"     value={pending} sub="Require follow-up"  color="bg-yellow-400"    />
            <StatCard icon="task_alt"        label="Results Uploaded"     value={uploaded} sub={`of ${total} total`} color="bg-green-500"  />
            <StatCard icon="groups"          label="Total Appointments"   value={total}   sub="This period"        color="bg-slate-600"     />
          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 sm:p-5 mb-4">
            <div className="flex flex-wrap gap-3 items-end">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Branch</label>
                <select
                  value={filterBranch}
                  onChange={(e) => setFilterBranch(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:border-primary outline-none transition-all"
                >
                  {["All", "Ikorodu", "Ebute", "Agric"].map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Payment Status</label>
                <select
                  value={filterPayment}
                  onChange={(e) => setFilterPayment(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:border-primary outline-none transition-all"
                >
                  {["All", "Paid Online", "Paid Offline", "Pending"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Date</label>
                <input
                  type="text"
                  placeholder="e.g. 01 Apr"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="px-3 py-2.5 rounded-xl border-2 border-slate-200 bg-white text-sm font-semibold text-slate-700 focus:border-primary outline-none transition-all w-32"
                />
              </div>

              {(filterBranch !== "All" || filterPayment !== "All" || filterDate) && (
                <button
                  onClick={() => { setFilterBranch("All"); setFilterPayment("All"); setFilterDate(""); }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 hover:text-red-500 transition-colors px-3 py-2.5 rounded-xl border-2 border-transparent hover:border-red-100 hover:bg-red-50"
                >
                  <span className="material-symbols-outlined text-sm">filter_list_off</span>
                  Clear
                </button>
              )}

              <p className="text-xs text-slate-400 ml-auto self-center">
                {visible.length} result{visible.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {/* Table — desktop */}
          <div className="hidden md:block bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50">
                  {["Patient", "Service", "Branch", "Date", "Payment", "Results", "Actions"].map((h) => (
                    <th key={h} className="text-left px-5 py-3.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visible.map((a) => (
                  <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <p className="font-bold text-slate-900">{a.patient}</p>
                      <p className="text-xs text-slate-400">{a.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-slate-600">{a.service}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                        <span className="material-symbols-outlined text-sm text-primary">location_on</span>
                        {a.branch}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-600 whitespace-nowrap">{a.date}</td>
                    <td className="px-5 py-4"><PayBadge status={a.payment} /></td>
                    <td className="px-5 py-4"><ResultBadge status={a.result} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {a.payment === "Pending" && (
                          <button
                            onClick={() => markPaid(a.id)}
                            className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100 transition-all"
                          >
                            <span className="material-symbols-outlined text-sm">payments</span>
                            Mark Paid
                          </button>
                        )}
                        {a.result === "Pending Upload" && (
                          <button
                            onClick={() => setUploadTarget(a)}
                            className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 transition-all"
                          >
                            <span className="material-symbols-outlined text-sm">upload_file</span>
                            Upload
                          </button>
                        )}
                        {a.result === "Uploaded" && !notified.includes(a.id) && (
                          <button
                            onClick={() => notify(a.id)}
                            className="inline-flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-all"
                          >
                            <span className="material-symbols-outlined text-sm">notifications</span>
                            Notify
                          </button>
                        )}
                        {notified.includes(a.id) && (
                          <span className="text-xs text-slate-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-green-500">check_circle</span>
                            Notified
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {visible.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-slate-400 text-sm">
                      No appointments match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Cards — mobile */}
          <div className="md:hidden flex flex-col gap-3">
            {visible.map((a) => (
              <div key={a.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-bold text-slate-900">{a.patient}</p>
                    <p className="text-xs text-slate-400">{a.phone}</p>
                  </div>
                  <PayBadge status={a.payment} />
                </div>
                <div className="flex flex-col gap-1.5 text-sm text-slate-600 mb-3">
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">biotech</span>
                    {a.service}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-base">location_on</span>
                    {a.branch} · {a.date}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <ResultBadge status={a.result} />
                  <div className="flex gap-2">
                    {a.payment === "Pending" && (
                      <button onClick={() => markPaid(a.id)} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-yellow-50 text-yellow-700 border border-yellow-200">
                        Mark Paid
                      </button>
                    )}
                    {a.result === "Pending Upload" && (
                      <button onClick={() => setUploadTarget(a)} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-primary/5 text-primary border border-primary/20">
                        Upload
                      </button>
                    )}
                    {a.result === "Uploaded" && !notified.includes(a.id) && (
                      <button onClick={() => notify(a.id)} className="text-xs font-bold px-3 py-1.5 rounded-lg bg-green-50 text-green-700 border border-green-200">
                        Notify
                      </button>
                    )}
                    {notified.includes(a.id) && (
                      <span className="text-xs text-slate-400 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-green-500">check_circle</span>
                        Notified
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {visible.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-sm">No appointments match your filters.</div>
            )}
          </div>

        </main>
      </div>
    </>
  );
}
