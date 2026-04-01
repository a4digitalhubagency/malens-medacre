import Header from "@/components/Header";
import ReportActions from "@/components/PrintButton";

/* ─── Static demo data ───────────────────────────────────────────────────── */

const PATIENT = {
  name: "Adaeze Okonkwo",
  id: "AML-2024-0042",
  dob: "12 / Mar / 1990",
  sex: "Female",
  phone: "0801 234 5678",
  branch: "Ikorodu Branch",
  referredBy: "Dr. B. Adekunle",
  collected: "28 March 2026 — 09:14 AM",
  reported: "29 March 2026 — 07:50 AM",
  pathologist: "Dr. K. Adeleke",
  qualification: "FMCPath, MLSCN Reg.",
};

const RESULTS = [
  { test: "WBC (White Blood Cells)", result: "6.2", unit: "× 10³/μL", low: "4.0", high: "11.0", flag: "" },
  { test: "RBC (Red Blood Cells)", result: "4.8", unit: "× 10⁶/μL", low: "4.2", high: "5.4", flag: "" },
  { test: "Haemoglobin (Hb)", result: "13.5", unit: "g/dL", low: "12.0", high: "16.0", flag: "" },
  { test: "Haematocrit (HCT)", result: "40", unit: "%", low: "36", high: "46", flag: "" },
  { test: "MCV (Mean Corpuscular Volume)", result: "82", unit: "fL", low: "80", high: "100", flag: "" },
  { test: "MCH", result: "28", unit: "pg", low: "27", high: "33", flag: "" },
  { test: "MCHC", result: "34", unit: "g/dL", low: "32", high: "36", flag: "" },
  { test: "Platelet Count", result: "220", unit: "× 10³/μL", low: "150", high: "400", flag: "" },
  { test: "Neutrophils", result: "68", unit: "%", low: "40", high: "75", flag: "" },
  { test: "Lymphocytes", result: "26", unit: "%", low: "20", high: "45", flag: "" },
  { test: "Monocytes", result: "5.2", unit: "%", low: "2", high: "10", flag: "" },
  { test: "Eosinophils", result: "0.8", unit: "%", low: "1", high: "6", flag: "L" },
];

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function ResultsPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-background-light py-8 md:py-12 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Toolbar — hidden when printing */}
          <div className="print-hide flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-3">
            <a
              href="/portal"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Back to Portal
            </a>

            <ReportActions />
          </div>

          {/* Report card */}
          <div
            id="lab-report"
            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
          >
            {/* Report header */}
            <div className="bg-primary px-4 sm:px-8 py-5 sm:py-6 text-white">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">
                    Laboratory Report
                  </p>
                  <h1 className="text-xl sm:text-2xl font-black">
                    Full Blood Count (FBC)
                  </h1>
                  <p className="text-white/75 text-sm mt-1">
                    Haematology Panel
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-white/60 text-xs mb-0.5">Reference</p>
                  <p className="font-black text-lg">{PATIENT.id}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-green-400/20 border border-green-400/40 rounded-full text-xs font-bold text-green-200">
                    ✓ Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 sm:px-8 py-5 sm:py-6 space-y-5 sm:space-y-6">

              {/* Patient info */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Patient Information
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                  {[
                    { label: "Full Name", value: PATIENT.name },
                    { label: "Patient ID", value: PATIENT.id },
                    { label: "Date of Birth", value: PATIENT.dob },
                    { label: "Sex", value: PATIENT.sex },
                    { label: "Branch", value: PATIENT.branch },
                    { label: "Referred By", value: PATIENT.referredBy },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-xs text-slate-400 mb-0.5">{label}</p>
                      <p className="font-semibold text-slate-800">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Dates */}
              <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Date Collected</p>
                  <p className="font-semibold text-slate-800">{PATIENT.collected}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-0.5">Date Reported</p>
                  <p className="font-semibold text-slate-800">{PATIENT.reported}</p>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Results table */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Results
                </p>
                <div className="overflow-x-auto -mx-2">
                  <table className="w-full text-sm border-collapse min-w-130">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="text-left px-3 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider rounded-tl-lg">
                          Test
                        </th>
                        <th className="text-right px-3 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Result
                        </th>
                        <th className="text-right px-3 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
                          Reference Range
                        </th>
                        <th className="text-center px-3 py-2.5 text-xs font-bold text-slate-500 uppercase tracking-wider rounded-tr-lg">
                          Flag
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {RESULTS.map((row, i) => (
                        <tr
                          key={row.test}
                          className={`border-t border-slate-100 ${
                            i % 2 === 0 ? "bg-white" : "bg-slate-50/50"
                          } ${row.flag ? "bg-yellow-50/60" : ""}`}
                        >
                          <td className="px-3 py-2.5 text-slate-700 font-medium">
                            {row.test}
                          </td>
                          <td className="px-3 py-2.5 text-right font-bold text-slate-900">
                            {row.result}
                            <span className="text-slate-400 font-normal text-xs ml-1">
                              {row.unit}
                            </span>
                          </td>
                          <td className="px-3 py-2.5 text-right text-slate-500">
                            {row.low} – {row.high}
                            <span className="text-xs ml-1">{row.unit}</span>
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {row.flag ? (
                              <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-yellow-100 text-yellow-700">
                                {row.flag}
                              </span>
                            ) : (
                              <span className="text-green-500 text-xs font-semibold">
                                Normal
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Comment */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-800">
                <p className="font-bold mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-blue-500">
                    comment
                  </span>
                  Pathologist&apos;s Comment
                </p>
                <p className="leading-relaxed text-blue-700">
                  Full Blood Count results are within normal limits. Mild reduction in Eosinophils noted — clinically insignificant. No further haematological investigation required at this time. Correlate with clinical findings.
                </p>
              </div>

              {/* Signature block */}
              <div className="flex items-end justify-between flex-wrap gap-4 pt-2">
                <div>
                  <div className="w-32 h-px bg-slate-300 mb-1" />
                  <p className="text-sm font-bold text-slate-800">{PATIENT.pathologist}</p>
                  <p className="text-xs text-slate-500">{PATIENT.qualification}</p>
                  <p className="text-xs text-slate-400">Consultant Pathologist</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-400">Issued by</p>
                  <p className="text-sm font-bold text-slate-800">Malens Medcare</p>
                  <p className="text-xs text-slate-500">MLSCN Certified Laboratory</p>
                </div>
              </div>
            </div>

            {/* Report footer */}
            <div className="bg-slate-50 border-t border-slate-100 px-4 sm:px-8 py-4">
              <p className="text-xs text-slate-400 text-center">
                This report is confidential and intended solely for the named patient and their referring physician. &nbsp;·&nbsp; Malens Medcare — ISO Standard Diagnostic Center, Lagos.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

