import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SelectFilterProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
}

const capitalizeText = (text: string): string => {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

const SelectFilter: React.FC<SelectFilterProps> = ({
  label,
  options,
  value,
  onChange,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const displayValue = value ? capitalizeText(value) : `Select ${label}`;
  const isDisabled = options.length === 0;

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Label styled with deep navy weighting */}
      <label className="block text-[10px] sm:text-xs font-black text-navy-900/60 uppercase tracking-widest mb-1.5 pl-1">
        {label}
      </label>
      
      {/* Select button trigger */}
      <button
        onClick={() => !isDisabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between border rounded-xl px-4 py-3 text-left text-xs sm:text-sm font-semibold transition-all duration-300 ${
          isDisabled
            ? "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
            : "bg-white border-slate-200 text-navy-900 hover:border-slate-350 hover:shadow-premium focus:outline-none focus:ring-2 focus:ring-accent-blue/20"
        }`}
        disabled={isDisabled}
      >
        <span className="flex items-center gap-2 truncate pr-2">
          {icon && <span className="flex-shrink-0 text-slate-400">{icon}</span>}
          <span className="truncate">{displayValue}</span>
        </span>
        <ChevronDown
          size={16}
          className={`flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          } ${isDisabled ? "text-slate-350" : "text-slate-500"}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && !isDisabled && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-50 w-full mt-1.5 bg-white border border-slate-150 rounded-xl shadow-xl overflow-hidden"
          >
            <ul className="py-1 max-h-48 sm:max-h-60 overflow-auto scrollbar-thin">
              {options.map((option, index) => {
                const isSelected = value === option;
                return (
                  <li key={index}>
                    <button
                      onClick={() => {
                        onChange(option);
                        setIsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-navy-900 text-white"
                          : "text-navy-900 hover:bg-slate-50"
                      }`}
                    >
                      {capitalizeText(option)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SelectFilter;
