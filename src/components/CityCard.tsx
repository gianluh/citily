import { motion } from "framer-motion";
import type gb from "../langs/gb";

type Language = typeof gb

interface CityCardProps {
  value: string;
  onChange: (v: string) => void;
  pin: string;
  currentLang: Language;
}

const CityCard = ({ value, onChange, pin, currentLang }: CityCardProps) => {
  const CITIES = [
    "Milano",
    "Roma",
    "Torino",
    "Napoli",
    "Bologna",
    "Firenze",
    "Berlino",
    "Barcellona",
    "Amsterdam",
    "Lisbona",
    "Vienna",
    "Praga",
  ];

  const renderStatus = {
    A: {
      x: -350,
      scale: 0.2,
      opacity: 0
    },
    B: {
      x: 350,
      scale: 0.2,
      opacity: 0
    },
  };

  return (
    <motion.div
      className="relative w-64 bg-[#f6f9fd] rounded-2xl border border-[#1b2e46]/10 shadow-[0_8px_24px_-8px_rgba(27,46,70,0.25)] px-5 py-5 text-left"
      initial={pin === "A" ? renderStatus.A : renderStatus.B}
      animate={{ x: 0, scale: 1, opacity: 1 }}
      transition={{ type: "spring", duration: 0.6, damping: 12 }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono-tag text-[10px] tracking-[0.2em] text-[#c0872f] uppercase">
          {currentLang.label} {pin}
        </span>
        <span className="font-mono-tag text-[10px] text-[#5b7291]">{pin}</span>
      </div>
      <input
        list={`cities-${pin}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={currentLang.placeholder}
        className="w-full font-display text-xl text-[#1b2e46] placeholder:text-[#1b2e46]/30 placeholder:font-body placeholder:text-base bg-transparent outline-none border-b border-[#1b2e46]/15 focus:border-[#c0872f] pb-2 transition-colors"
      />
      <datalist id={`cities-${pin}`}>
        {CITIES.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <p className="font-mono-tag text-[10px] text-[#5b7291] mt-3">
        {value ? "LAT · LON —" : currentLang.footer}
      </p>
    </motion.div>
  );
};

export default CityCard;
