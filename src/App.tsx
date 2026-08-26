import { useState } from "react";
import { easeIn, easeInOut, easeOut, motion } from "framer-motion";
import CityCard from "./components/CityCard";

export default function App() {
  const [cityA, setCityA] = useState("");
  const [cityB, setCityB] = useState("");
  const canCompare = cityA.trim().length > 0 && cityB.trim().length > 0;

  const metrics = [
    "Sicurezza",
    "Costo della vita",
    "Reddito medio",
    "Qualità della vita",
    "Istituzione",
  ];

  return (
    <div className="relative bg-[#d3e2f2] min-h-dvh w-screen overflow-x-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(#1b2e46 1px, transparent 1px), linear-gradient(90deg, #1b2e46 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black, transparent 75%)",
        }}
      />

      <section className="relative font-body max-w-5xl mx-auto px-6 pt-10 pb-24 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-6">
          <motion.i
            className="fa-solid fa-location-dot text-[#c0872f] text-lg"
            initial={{ x: -350, scale: 4, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              ease: easeInOut,
              duration: 1,
              damping: 16,
            }}
          />
          <motion.span
            className="font-display text-2xl font-semibold tracking-tight text-[#1b2e46]"
            initial={{ x: 350, scale: 3, opacity: 0 }}
            animate={{ x: 0, scale: 1, opacity: 1 }}
            transition={{
              duration: 1,
              ease: easeInOut,
              type: "spring",
              damping: 16,
            }}
          >
            Citily
          </motion.span>
        </div>

        <h1 className="font-display text-[#1b2e46] text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-2xl">
          Scegli due città.
          <br /> Scopri dove vivresti meglio.
        </h1>

        {/* card di confronto */}
        <div className="relative w-full mt-14 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          <CityCard label="Città A" value={cityA} onChange={setCityA} pin="A" />

          <motion.div
            className="relative flex items-center justify-center md:w-40 h-16 md:h-auto my-2 md:my-0"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", duration: 0.5, damping: 9 }}
          >
            <svg
              className="hidden md:block absolute w-40 h-24 -translate-y-2"
              viewBox="0 0 160 96"
              fill="none"
            >
              <path
                d="M4 20 Q80 -10 156 20"
                stroke="#2c6e6a"
                strokeWidth="1.5"
                strokeDasharray="4 5"
                strokeLinecap="round"
              />
            </svg>
            <span className="relative z-10 font-mono-tag text-xs tracking-widest text-[#f6f9fd] bg-[#1b2e46] rounded-full w-12 h-12 flex items-center justify-center border-2 border-[#c0872f]">
              VS
            </span>
          </motion.div>

          <CityCard label="Città B" value={cityB} onChange={setCityB} pin="B" />
        </div>

        {/* tag delle metriche */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
          {metrics.map((m) => (
            <span
              key={m}
              className="font-mono-tag text-[11px] uppercase tracking-wider text-[#1b2e46] bg-white/60 border border-[#1b2e46]/15 rounded-full px-3 py-1.5"
            >
              {m}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          disabled={!canCompare}
          className={`mt-10 font-body font-medium text-sm tracking-wide px-8 py-3.5 rounded-full transition-all duration-200 ${
            canCompare ?
              "bg-[#1b2e46] text-[#f6f9fd] hover:bg-[#c0872f] hover:scale-[1.02] cursor-pointer"
            : "bg-[#1b2e46]/20 text-[#1b2e46]/40 cursor-not-allowed"
          }`}
        >
          Confronta città →
        </button>
      </section>
    </div>
  );
}
