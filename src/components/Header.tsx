"use client";
import { useState } from "react";
import Image from "next/image";

const links: [string, string][] = [
  ["Services", "#services"],
  ["Why Us", "#why-us"],
  ["Results Portal", "/portal"],
  ["Contact", "#contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-primary/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Image
            src="/logo.png"
            alt="Malens Medcare Logo"
            width={160}
            height={48}
            className="h-12 w-auto object-contain"
            priority
          />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="/book"
              className="hidden md:inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-primary/20"
            >
              Book Appointment
            </a>

            {/* Hamburger */}
            <button
              onClick={() => setOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <span className="material-symbols-outlined text-slate-700">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div className="absolute inset-y-0 right-0 w-72 bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <Image
                src="/logo.png"
                alt="Malens Medcare"
                width={120}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <button
                onClick={() => setOpen(false)}
                className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <span className="material-symbols-outlined text-slate-600">close</span>
              </button>
            </div>

            <nav className="flex flex-col p-4 gap-1 flex-1">
              {links.map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 rounded-xl font-semibold text-slate-700 hover:bg-primary/5 hover:text-primary transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="p-6 border-t border-slate-100">
              <a
                href="/book"
                onClick={() => setOpen(false)}
                className="block w-full bg-primary text-white text-center py-3.5 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
