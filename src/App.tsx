import { useState } from "react";
import { motion } from "framer-motion";
import CityCard from "./components/CityCard";
import "flag-icons/css/flag-icons.min.css";
import { translations } from "./langs";
import type gb from "./langs/gb";

type Language = typeof gb;

export default function App() {
  const [cityA, setCityA] = useState("");
  const [cityB, setCityB] = useState("");
  const [lang, setLang] = useState(localStorage.getItem("lang") || "gb");
  const languages = ["it", "gb"];

  const canCompare = cityA.trim().length > 0 && cityB.trim().length > 0;

  const currentLang: Language =
    lang === "gb" ? translations.gb : translations.it;

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

      {/* toggle language button */}
      <div className="absolute z-10 flex justify-between w-full gap-2 mt-2 px-2">
        {languages.map((language) => (
          <motion.button
            key={language}
            onClick={() => {
              setLang(language);
              localStorage.setItem("lang", language)
            }}
            className="group flex items-center gap-2 rounded-full bg-[#788695]/80 px-4 py-2 text-white shadow-md backdrop-blur-sm hover:bg-[#788695] hover:cursor-pointer"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
            whileFocus={{ scale: 0.95 }}
            initial={
              language === "gb" ?
                { y: -70, x: 70, scale: 0 }
              : { y: -70, x: -70, scale: 0 }
            }
            animate={{ y: 0, x: 0, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <motion.span
              className={`fi fi-${language} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}
            />

            <span className="text-sm font-medium">
              {language.toUpperCase()}
            </span>
          </motion.button>
        ))}
      </div>

      <section className="relative font-body max-w-5xl mx-auto px-6 pt-10 pb-24 flex flex-col items-center text-center">
        <div className="flex items-center gap-2 mb-6">
          <motion.i className="fa-solid fa-location-dot text-[#c0872f] text-lg" />
          <motion.span className="font-display text-2xl font-semibold tracking-tight text-[#1b2e46]">
            Citily
          </motion.span>
        </div>

        <h1 className="font-display text-[#1b2e46] text-4xl sm:text-5xl md:text-6xl leading-[1.05] max-w-2xl">
          {currentLang.header1}
          <br /> {currentLang.header2}
        </h1>

        {/* comparison card */}
        <div className="relative w-full mt-14 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
          <CityCard
            value={cityA}
            onChange={setCityA}
            pin="A"
            currentLang={currentLang}
          />

          <motion.div
            className="relative flex items-center justify-center md:w-40 h-16 md:h-auto my-2 md:my-0"
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

          <CityCard
            value={cityB}
            onChange={setCityB}
            pin="B"
            currentLang={currentLang}
          />
        </div>

        {/* metrics' tag */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-2 mt-10 ">
          {currentLang.metrics.map((m) => (
            <span
              key={m}
              className="font-mono-tag text-[11px] uppercase tracking-wider text-[#1b2e46] bg-white/60 border border-[#1b2e46]/15 rounded-full px-3 py-1.5"
            >
              {m}
            </span>
          ))}
        </div>

        {/* comparison button */}
        <button
          disabled={!canCompare}
          className={`mt-10 font-body font-medium text-sm tracking-wide px-8 py-3.5 rounded-full transition-all duration-200 ${
            canCompare ?
              "bg-[#1b2e46] text-[#f6f9fd] hover:bg-[#c0872f] hover:scale-[1.02] cursor-pointer"
            : "bg-[#1b2e46]/20 text-[#1b2e46]/40 cursor-not-allowed"
          }`}
        >
          {currentLang.button}
        </button>
      </section>
    </div>
  );
}
