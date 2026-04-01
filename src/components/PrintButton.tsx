"use client";

export default function ReportActions() {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
      >
        <span className="material-symbols-outlined text-base">print</span>
        Print
      </button>

      <button
        onClick={() => window.print()}
        className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition-all"
      >
        <span className="material-symbols-outlined text-base">download</span>
        <span className="hidden sm:inline">Download PDF</span>
        <span className="sm:hidden">PDF</span>
      </button>
    </div>
  );
}
