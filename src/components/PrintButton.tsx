"use client";

function printReport(mode: "print" | "download") {
  const el = document.getElementById("lab-report");
  if (!el) return;

  // Grab Material Symbols stylesheet so icons render in the print window
  const iconsHref = Array.from(document.querySelectorAll("link[rel='stylesheet']"))
    .map((l) => (l as HTMLLinkElement).href)
    .find((h) => h.includes("Material+Symbols")) ?? "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Malens Medcare — Lab Report</title>
  ${iconsHref ? `<link rel="stylesheet" href="${iconsHref}" />` : ""}
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Inter, ui-sans-serif, system-ui, sans-serif; background: #fff; color: #0f172a; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    @page { size: A4; margin: 10mm; }
  </style>
</head>
<body>${el.outerHTML}</body>
</html>`;

  const win = window.open("", "_blank", "width=900,height=700");
  if (!win) return;
  win.document.write(html);
  win.document.close();

  // Small delay lets fonts + icons load before print dialog
  win.onload = () => {
    setTimeout(() => {
      if (mode === "print") {
        win.print();
      } else {
        // "Save as PDF" is the browser's native PDF export from the print dialog
        win.print();
      }
    }, 600);
  };
}

export default function ReportActions() {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => printReport("print")}
        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm shadow-primary/20"
      >
        <span className="material-symbols-outlined text-base">print</span>
        Print
      </button>

      <button
        onClick={() => printReport("download")}
        className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:border-primary hover:text-primary transition-all"
      >
        <span className="material-symbols-outlined text-base">download</span>
        <span className="hidden sm:inline">Download PDF</span>
        <span className="sm:hidden">PDF</span>
      </button>
    </div>
  );
}
