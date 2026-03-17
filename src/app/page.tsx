// Replace /logo.png with your actual logo file placed in /public/logo.png
import { Fragment } from "react";
import Image from "next/image";
import Header from "@/components/Header";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <ServicesGrid />
        <WhyUs />
        <HowItWorks />
        <ResultsPortal />
        <Testimonials />
        <CorporatePartners />
      </main>
      <Footer />

      {/* Floating WhatsApp — persistent touchpoint for Lagos market */}
      <a
        href="https://wa.me/2348000000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-5 z-40 w-13 h-13 sm:w-14 sm:h-14 bg-[#25D366] rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-white text-2xl">forum</span>
      </a>
    </>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-white to-background-light pt-10 pb-16 md:pt-16 md:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Text */}
        <div className="z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Open for next-day bookings
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4 md:mb-6 text-slate-900">
            Get Accurate Medical Results —{" "}
            <span className="text-primary">Fast</span>
          </h1>

          <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 max-w-lg leading-relaxed">
            Advanced diagnostics with next-day appointments across our 3
            branches in Ikorodu, Ebute &amp; Agric, Lagos. Trusted by thousands
            for precision and care.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold sm:text-lg shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-all"
            >
              Schedule Your Visit
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold sm:text-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              View Lab Menu
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGD-bPhdMCI4vHDoVp332ulVeeuN10NRo9xqZLKCOTzlpUKtNdB2d7tslRZ9AL3Ve_n-7Xls1IjNXg6x9XccDtGT3Fd5s6FfMjCmEyF1-o6CyWenDRJK5Xjmeyn--tejUNm6dZzgrfF1ZlqSjj0ET1by29sN39u0fnNmh3rOo8btaU8cB_ZprBu5RzAjIqYeSP2fzXRS6lEc0W-QdQvp7WJ488b1bf4s7tkNOxDWhVgNyjnkzZ6-VSq2vVti8mCoPv3WrK-V1m24yU"
              alt="Professional diagnostic laboratory technician with advanced equipment"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Badge — inside image bounds, no overflow on any screen */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-primary/10">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-green-100 rounded-full text-green-600 shrink-0">
                <span className="material-symbols-outlined text-lg sm:text-xl">verified</span>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold leading-tight">MLSCN Certified</p>
                <p className="text-xs text-slate-500 hidden sm:block">ISO Standard Laboratories</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Trust Badges ───────────────────────────────────────────────────────── */

const stats = [
  { value: "100%", label: "Accurate Results", icon: "verified" },
  { value: "15+",  label: "Years Experience",  icon: "history_edu" },
  { value: "50+",  label: "Expert Specialists", icon: "groups" },
  { value: "24/7", label: "Digital Support",    icon: "support_agent" },
];

function TrustBadges() {
  return (
    <section className="bg-white py-10 border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/*
          gap-px + bg-slate-100 on the container = 1px divider lines between cells
          at every breakpoint — works cleanly in both 2-col (mobile) and 4-col (desktop)
        */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-100 rounded-2xl overflow-hidden">
          {stats.map(({ value, label, icon }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-1 py-6 px-3 sm:px-6 bg-white"
            >
              <span className="material-symbols-outlined text-primary/40 text-xl sm:text-2xl mb-1">
                {icon}
              </span>
              <p className="text-2xl sm:text-3xl font-black text-primary">{value}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest leading-tight">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services Grid ──────────────────────────────────────────────────────── */

const services = [
  { icon: "radiology",       title: "Medical Imaging", desc: "Digital X-ray, Ultrasound (4D), and Mammography." },
  { icon: "biotech",         title: "Lab Tests",        desc: "Hematology, Biochemistry, and Microbiology panels." },
  { icon: "cardiology",      title: "Cardiology",       desc: "ECG, Echocardiogram, and Stress Testing." },
  { icon: "health_and_safety", title: "Health Checks",  desc: "Comprehensive pre-employment and annual screenings." },
  { icon: "microscope",      title: "Endoscopy",        desc: "Upper and Lower GI tract internal examinations." },
  { icon: "pregnant_woman",  title: "Antenatal",        desc: "Specialized prenatal care and fetal monitoring." },
  { icon: "dna",             title: "DNA Testing",      desc: "Paternity tests and genetic health mapping." },
  { icon: "exercise",        title: "Physiotherapy",    desc: "Rehabilitation and recovery management." },
];

function ServicesGrid() {
  return (
    <section id="services" className="py-14 md:py-24 bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Our Comprehensive Diagnostics
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-base">
            Equipped with the latest technology to provide precise insights for
            your health journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-5 md:p-8 rounded-2xl border border-primary/5 hover:border-primary/30 transition-all hover:shadow-xl group flex flex-col"
            >
              <span className="material-symbols-outlined text-3xl md:text-4xl text-primary mb-3 md:mb-4 block group-hover:scale-110 transition-transform">
                {icon}
              </span>
              <h3 className="text-base md:text-lg font-bold mb-1.5 md:mb-2">{title}</h3>
              <p className="text-slate-500 text-sm flex-1">{desc}</p>
              <a
                href="#contact"
                className="mt-4 inline-flex items-center gap-1 text-primary text-sm font-semibold hover:gap-2 transition-all"
              >
                Book this test
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Why Choose Us ──────────────────────────────────────────────────────── */

const whyItems = [
  { icon: "speed",                  title: "Fast Turnaround",      desc: "Most results are available within 24 hours via our secure portal." },
  { icon: "precision_manufacturing", title: "Modern Infrastructure", desc: "World-class diagnostic equipment from global manufacturers." },
  { icon: "groups",                 title: "Expert Pathologists",   desc: "Reports reviewed by experienced consultants and doctors." },
];

function WhyUs() {
  return (
    <section id="why-us" className="py-14 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">

        {/* Text */}
        <div className="lg:w-1/2 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            Why Patients Trust Malens Medcare
          </h2>
          <p className="text-slate-500 mb-8 text-sm md:text-base">
            We combine medical expertise with compassionate care and
            state-of-the-art technology.
          </p>

          <ul className="space-y-6 mb-8 md:mb-10">
            {whyItems.map(({ icon, title, desc }) => (
              <li key={title} className="flex gap-4">
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-lg md:text-xl">
                    {icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-base md:text-lg mb-0.5">{title}</h4>
                  <p className="text-slate-500 text-sm md:text-base">{desc}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3.5 sm:px-8 sm:py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all"
          >
            Schedule Your Visit Today
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </a>
        </div>

        {/*
          Staggered images — translate-y only on md+ to prevent overflow on mobile.
          md:pb-8 gives the translated image room within the layout flow.
        */}
        <div className="lg:w-1/2 w-full grid grid-cols-2 gap-3 sm:gap-4 md:pb-8 lg:pb-0">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAy859Lxs4hknGiUAuFtiy9IDag-cwKqHwTV18-KDjA4qh6IrlmbdN-DeG1EPQ05vGL16xkiKQT3ZnSL-Hyk6FZfX2mB1xvtixeUy6INyTMj4Yvh4iAHePKOavgY5YLbk2OrLokAEG-ETMKlIzjWv6sNMohK77-YO8_j2yDD9TeDd3LDfsRECLZhs0KnNHyc9WExuBgfS9kSJOqduwdMhAnn2lNgOIULPetrw9oPY3MUmwaom58ip6skXnFVJHve8Ufxsv2RjkV14k6"
              alt="Advanced medical diagnostic equipment in a sterile clinic environment"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-lg md:translate-y-8">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGJlegXElZcvJA20QdTimL93w4NCnWC7UYNomSlqRYu-iqW3tLPJqwwhbhKHOa_Mcjdwd2Cw-6LqfkTqu72DC7M7GVC06UL951KaqZUDG63RV7s6k98RS7bHhKvy5I3LzQIvDnHKdURwN4LVXmJMbKhI5zmVxnycU5Z3nH4qM7Xm5ZBPTk1wo0Qtc0V03Tb6rpNUhtPcl_bbEUTYs-8B0-DydEvn3szbpolQQlcEBit5s27uBjtFicqxLDxnQfNq-aqEGkXDDoWu0H"
              alt="Professional patient care in a modern medical facility"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── How It Works ───────────────────────────────────────────────────────── */

const steps = [
  { num: "01", icon: "calendar_month",     title: "Book Online",  desc: "Choose your test and preferred time slot at any of our 3 branches." },
  { num: "02", icon: "medical_information", title: "Visit Center", desc: "Quick and comfortable sample collection by our professional staff." },
  { num: "03", icon: "cloud_download",      title: "Get Results",  desc: "Access and download your reports from our online patient portal." },
];

function HowItWorks() {
  return (
    <section className="py-14 md:py-24 bg-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">Simple 3-Step Process</h2>
        <p className="text-slate-500 mb-10 md:mb-16 max-w-xl mx-auto text-sm md:text-base">
          From booking to results — we make the process as smooth as possible.
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-0 mb-10 md:mb-14">
          {steps.map((step, i) => (
            <Fragment key={step.num}>
              <div className="flex-1 flex flex-col items-center text-center px-4 md:px-6 w-full md:w-auto">
                <div className="text-5xl md:text-6xl font-black text-primary/10 mb-2 leading-none">
                  {step.num}
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-md border border-primary/10">
                  <span className="material-symbols-outlined text-primary text-2xl md:text-3xl">
                    {step.icon}
                  </span>
                </div>
                <h4 className="font-bold text-lg md:text-xl mb-2">{step.title}</h4>
                <p className="text-slate-500 text-sm max-w-55 mx-auto">{step.desc}</p>
              </div>

              {/*
                Connector between steps:
                - Mobile: arrow pointing DOWN (rotate-90 on arrow_forward)
                - Desktop: arrow pointing RIGHT
              */}
              {i < steps.length - 1 && (
                <div className="flex items-center justify-center py-3 md:py-0 md:pt-14 shrink-0">
                  <span className="material-symbols-outlined text-primary/25 text-3xl md:text-4xl rotate-90 md:rotate-0">
                    arrow_forward
                  </span>
                </div>
              )}
            </Fragment>
          ))}
        </div>

        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 sm:px-10 sm:py-4 rounded-xl font-bold sm:text-lg shadow-xl shadow-primary/30 hover:-translate-y-0.5 transition-all"
        >
          Book Your Appointment
          <span className="material-symbols-outlined text-xl">arrow_forward</span>
        </a>
      </div>
    </section>
  );
}

/* ─── Results Portal ─────────────────────────────────────────────────────── */

function ResultsPortal() {
  const avatars = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBKp_F6AdyJweVzvglI9woZ1hYUreUPU9sfZ8FxjGL0L1l8pii9XlZiJMICPv8NqDKr5BKulaD3gyE-Gsb-Nvry5vwesYCzfZI2E4hCUQUnVN_FBNFIsah5T6AV98f_69wxSpEEAIzZY798bc_UkjmKsQDLkZY2-enddclp_KUfA9Tl-07CcDMo6fTBd9V3H0cBwqvI3dFa6kek2jPTepCXYt9eUM9gSAshiHQc8x2SFRpmO_Bnk59qMi8I1WiTPeI7duCEU4p6HUag",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCP6HUvA6STpuC8cHlQuEXa6N8N8dGpNC4do6lSod-dhwROQcaHSUkwHXiJqshvTUYHHZ7AxNvoYAmVpP3ARzDm1qwObPjWQe9p4-hDyRE91MBJdafI9JwQWCvU0E1ImRIdZueYGG-Wx2k8K4VnD0PqEZrpZ4DohpsDftzAu5kRe14Z-IgrjfzENLmgRZa_XqPju6W9uJIiSqUeG7ht2h6vNeLj_9h5G9qOUXgwmfEhA-lmXW0SU50VQV1tLSvIpnpM1mYEGq4HJM5Y",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBvEqmKNUIyQOHNUuuXZxG25gj3DaB11FtrIUgmccHnQl9creSqmSi9ia_Hy8ztaydmJwRzN5tlAysroxwcekGWEaVMBsny33ke3S5GWloPE_plonl1-NafhA96QdoHkUFWK5Rkjl4IHItj5puoN37Km2cnbryTwDe4U74-fEiK4CXHnw67BUt_STdDfubwSNcuhZQrcsGm0N1L0uep0o5nkD-tJ8zELi7at6gj-8NDC6N7Z-zwmP2yT8DKei6B5vsCPbWfa3WUPbVN",
  ];

  return (
    <section id="portal" className="py-14 md:py-24 bg-primary text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center relative z-10">

        {/* Left */}
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4">
            Patient Results Portal
          </h2>
          <p className="text-white/75 text-sm md:text-lg mb-6 md:mb-8 leading-relaxed">
            Access your medical records securely from anywhere. No need to wait
            for physical copies — results delivered straight to your device.
          </p>

          <div className="flex items-center gap-4 mb-6 md:mb-8">
            <div className="flex -space-x-3">
              {avatars.map((src, i) => (
                <Image
                  key={i}
                  src={src}
                  alt="Active patient"
                  width={40}
                  height={40}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-primary object-cover"
                />
              ))}
            </div>
            <p className="text-xs sm:text-sm font-medium">
              Joined by 10k+ active patients
            </p>
          </div>

          <div className="flex flex-col gap-2.5">
            {[
              { icon: "lock",    text: "End-to-end encrypted access" },
              { icon: "devices", text: "Available on phone, tablet & desktop" },
              { icon: "share",   text: "Instantly share with your doctor" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-white/80 text-sm">
                <span className="material-symbols-outlined text-white/50 text-base shrink-0">
                  {icon}
                </span>
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl text-slate-900">
          <h3 className="text-lg sm:text-xl font-bold mb-1">Check My Report</h3>
          <p className="text-slate-500 text-xs sm:text-sm mb-5 md:mb-6">
            Enter your details to access your results.
          </p>

          <div className="space-y-4">
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
                placeholder="e.g. MAL-2023-8901"
                autoComplete="username"
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="access-code"
                  className="block text-sm font-bold text-slate-700"
                >
                  Access Code
                </label>
                <a href="#" className="text-xs text-primary hover:underline font-medium">
                  Forgot code?
                </a>
              </div>
              <input
                id="access-code"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-transparent focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3.5 sm:py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <span className="material-symbols-outlined text-lg">key</span>
              View Lab Results
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ───────────────────────────────────────────────────────── */

const testimonials = [
  {
    quote:   "Fastest result I've ever received in Lagos. The staff at Ebute branch are very professional and empathetic.",
    initials: "JO", name: "John Okon",  service: "Annual Screening",
  },
  {
    quote:   "Extremely clean facility. I brought my aged father for an ECG and they handled him with such great care.",
    initials: "AM", name: "Aisha Musa",  service: "Cardiology Patient",
  },
  {
    quote:   "Their portal makes it so easy to share reports with my doctor in the US. Very tech-forward diagnostic center.",
    initials: "EE", name: "Emeka Eze",   service: "Medical Imaging",
  },
];

function Testimonials() {
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 md:mb-16">
          <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-widest mb-3">
            Patient Stories
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-3">What Our Patients Say</h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Real experiences from real patients across our branches.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {testimonials.map(({ quote, initials, name, service }) => (
            <div
              key={name}
              className="bg-background-light p-6 md:p-8 rounded-2xl border border-slate-100 flex flex-col"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-base leading-none">★</span>
                ))}
              </div>

              <p className="text-slate-600 leading-relaxed flex-1 mb-5 text-sm md:text-base">
                &ldquo;{quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-primary/15 rounded-full flex items-center justify-center font-bold text-primary text-xs sm:text-sm shrink-0">
                  {initials}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{name}</p>
                  <p className="text-xs text-slate-500">{service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Corporate Partners ─────────────────────────────────────────────────── */

const partnerLogos = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDs3bSWMlnuM1t4ObKrIxWljsCpfSqR6gLbyuFSiTJOXWhu52rV-JehxuiuVb_aE_BLAaTUqPRevBo2T0siIDdl8GFWhgVVJp7CECupHXXb4FOLaE6ea4XP9p4wxE8qulB4d8gzprfKqkym_mM2GsVm6YnDedd0j_0xiVB0fRyHs7zHIBjdKxCXJZG7qfpuEY7S2-dG3_o_ElUutq9GWK4km5nJd6CNRGgJT6oT-PWdLxV3mXI-sYhyK6IbXnxgcqV9pcFFw9Fkmp88",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBkVPjm85Qh91y7eXc15O6yggzEEWw9tZ3tVIO1t_rUf-SOFlptjxQ_q-KbUlKSH556PKC1dDSh0DPJ8KhqR3PkUPdz1XGUYwkMSYDmb4YF4lRJ701WjUBO4TSxELJ9KHRBfZ7-k3ONdSnlVNpNhGuc00btDGm3TOXeG0Ahjlz-vur9dFip0hfVdmhbjYhYko3YGAkRaHLk0xyp06fn351ga_7xoss__WOg88r80aHm2k41CgrBvw5zQLF-jYOTnRlDrBFAz56C_c8J",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDK9s5qFYH81yCFHnYtBDkET8ZTHcu7lOqUaaQ529KvJXDbPpBCDZH0RBzQjcJ7JXrlK-pVVn5pEsJ1DXGl9lCECZN9nHO4HZa4z-6u-iQ8b59n42lcnpI3jCnGq7QFUgCri_v_Bir2X4WTiFObvynjP1R6PzFX2lWvXfVNhjSqoX6vvlxtCsJ1sSf37lcKCdrGe-37Xc9Ln3f4dYvq--q9JxPUsWJZhwZvBph7iYk9Gf12ihe3jllAeQ3acdylsCEj4RfaGWz81X7c",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA_xnWAIw-CnViLBaCUlTtMaGOHO0ZTHFcVCRt8OrLE2S_ty4MUDjUHl0alDjS_3R9Eq6tP9skoUJ_lkeJV8C610pp3ONLTpIX35aQcNccyRV3ZcoHX95sqKjgqG11zNLrQkpNQYIXVGVzwp8hmWgJUyHkvgU_jYjL0a8hfxE5fdIXk5DRf56aIY5rTk0QchHYtEBYUPhwANYjlcoVZBFSdypUkicJ5qjJqi6KNjjZV7KsWwKAaq3gXGQtF_d5A4a1apRn-qo4YY_k-",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB3xwA0SwxKG-9-DyMDnAsD7Rk94VFYY2_tGKcmnqnhBz_2kyF9lhtzm-cZ-mXJ3afl7E0sj1XWavR4Fful_CMxoyBr6j1-p-4Y-WtkNLSo7aR8i16ufxy5I0SHTHMtqCFo-kGg0oopM6B3DnnMsL3Buapl0jZg5oGUMNdFgvPGaAtOOrDuJs7oFjmJ7TTL2y3zKQkUMiGf6rEIRhetPS97SfgdhYyeLfisbjlghv4sdDGjdNshF8lHsdGHMwpp3MAQYP-GB_PPHF7S",
];

function CorporatePartners() {
  return (
    <section className="py-12 md:py-20 bg-background-light border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-4 sm:gap-6 mb-8 md:mb-12">
          <div className="flex-1 h-px bg-slate-200" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
            Trusted by leading HMOs &amp; Corporations
          </p>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {partnerLogos.map((src, i) => (
            <div
              key={i}
              className="group flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-5 sm:px-6 sm:py-6 hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <Image
                src={src}
                alt="Partner Logo"
                width={120}
                height={48}
                className="h-8 sm:h-10 w-auto object-contain grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */

function Footer() {
  const branches = [
    { name: "Ikorodu", addr: "52 T.O.S Benson Road, Beside Ikorodu Licensing Office, Near Library Bustop, Ikorodu, Lagos." },
    { name: "Ebute",   addr: "62 Beach Road, Beside Kingsfield College, Cappa Junction, Ebute, Ikorodu, Lagos." },
    { name: "Agric",   addr: "132 Isawo Road, Beside LaBelle Hotel, Opposite UBA Bank, Near Lawyer Bustop, Agric, Ikorodu, Lagos." },
  ];

  return (
    <footer
      id="contact"
      className="bg-slate-50 text-slate-500 pt-14 md:pt-20 pb-8 md:pb-10 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-10 md:mb-16">

        {/* Brand */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/logo.png"
              alt="Malens Medcare Logo"
              width={160}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed mb-5">
            Providing world-class diagnostic services with precision, care, and
            compassion across Lagos State.
          </p>
          <div className="flex items-center gap-3 p-3 bg-[#25D366]/10 rounded-xl">
            <span className="material-symbols-outlined text-[#25D366] shrink-0">forum</span>
            <a
              href="https://wa.me/2348000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-[#25D366] hover:underline"
            >
              Chat us on WhatsApp
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-slate-800 font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs sm:text-sm">
            Quick Links
          </h4>
          <ul className="space-y-2.5 sm:space-y-3 text-sm">
            {[
              ["Services",       "#services"],
              ["Why Choose Us",  "#why-us"],
              ["Results Portal", "#portal"],
              ["Book Appointment","#contact"],
              ["Contact Us",     "#contact"],
            ].map(([label, href]) => (
              <li key={label}>
                <a href={href} className="hover:text-primary transition-colors">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h4 className="text-slate-800 font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs sm:text-sm">
            Our Locations
          </h4>
          <div className="space-y-4 text-sm">
            {branches.map(({ name, addr }) => (
              <div key={name} className="flex gap-2.5">
                <span className="material-symbols-outlined text-primary text-base mt-0.5 shrink-0">
                  location_on
                </span>
                <div>
                  <p className="text-slate-800 font-semibold text-xs sm:text-sm mb-0.5">{name}</p>
                  <p className="text-xs sm:text-sm leading-relaxed">{addr}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-slate-800 font-bold mb-4 md:mb-6 uppercase tracking-wider text-xs sm:text-sm">
            Contact Us
          </h4>
          <ul className="space-y-3 sm:space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-base sm:text-lg mt-0.5 shrink-0">phone</span>
              <a href="tel:+2348000000000" className="hover:text-primary transition-colors">
                +234 800 000 0000
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-base sm:text-lg mt-0.5 shrink-0">mail</span>
              <a
                href="mailto:info@malensmedcare.com"
                className="hover:text-primary transition-colors break-all"
              >
                info@malensmedcare.com
              </a>
            </li>
            <li className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-base sm:text-lg mt-0.5 shrink-0">schedule</span>
              <span>Mon – Sat: 7am – 7pm</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar — flex-wrap prevents overflow on narrow screens */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 md:pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 text-xs text-slate-400">
        <p>&copy; {new Date().getFullYear()} Malens Medcare. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
          <span className="flex items-center gap-1 text-green-600 font-semibold">
            <span className="material-symbols-outlined text-sm">verified</span>
            MLSCN Certified
          </span>
        </div>
      </div>
    </footer>
  );
}
