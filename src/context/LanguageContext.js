"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { getLocale, defaultLocale } from "@/i18n";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(defaultLocale);

  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && (saved === "ar" || saved === "en")) {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.body.className = `font-almarai antialiased bg-white text-gray-900`;
  }, [lang]);

  const t = getLocale(lang);

  const toggleLang = () => {
    setLang((prev) => (prev === "ar" ? "en" : "ar"));
  };

  return (
    <LanguageContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}
