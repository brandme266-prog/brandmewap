"use client";
import { useState, useEffect, useCallback } from "react";

import { useLanguage } from "@/context/LanguageContext";
import { localeNames } from "@/i18n";

export default function Navbar() {
  const { lang, t, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = document.querySelectorAll("section[id]");
      let cur = "home";
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) cur = s.id;
      });
      setActive(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((e, href) => {
    e.preventDefault();
    
    if (href === "/" || href === "#home") {
      if (window.location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.location.href = "/";
      }
      setMenuOpen(false);
      return;
    }
    
    if (href.includes("#")) {
      const hash = href.substring(href.indexOf("#"));
      if (window.location.pathname === "/") {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        setMenuOpen(false);
        return;
      } else {
        window.location.href = "/";
        return;
      }
    }
    
    window.location.href = href;
    setMenuOpen(false);
  }, []);

  const navItems = [
    { label: t.nav.portfolio, href: "/portfolio" },
    { label: lang === "ar" ? "خدمات المواقع والمتاجر" : "Web & Stores Services", href: "/online-store" },
    { label: lang === "ar" ? "خدمات السوشيال ميديا" : "Social Media Services", href: "/#services" },
  ];

  return (
    <>
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-sm py-3" : "py-4"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" onClick={(e) => go(e, "/")} aria-label="BrandMe">
          <img src="/images/logo/logo.webp" alt="BrandMe" className="h-14 sm:h-16 md:h-24 lg:h-28 w-auto transition-all" />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e, item.href)}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                active === item.href.slice(1) ? "text-[#4a9a10]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + Language Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <a href="https://wa.me/201002052205" target="_blank" rel="noopener noreferrer"
            className="bg-[#4a9a10] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#3d820d] transition-colors shadow-md shadow-green-100">
            {t.nav.cta}
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center gap-1.5 w-10 h-10"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-gray-700 rounded transition-all duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden bg-white border-t border-gray-100 transition-all duration-300 overflow-hidden ${menuOpen ? "max-h-[500px]" : "max-h-0"}`}>
        <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={(e) => go(e, item.href)}
              className="text-gray-700 font-semibold px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              {item.label}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="mt-2 text-center bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-bold text-sm"
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
          <a href="https://wa.me/201002052205" target="_blank" rel="noopener noreferrer"
            className="mt-2 text-center bg-[#4a9a10] text-white px-6 py-3 rounded-full font-bold text-sm">
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
    <a
      href="https://wa.me/201002052205?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%D9%8B%20%D8%A8%D9%83%D9%85%20BrandMe"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا واتساب"
      className="fixed bottom-8 right-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-green-300 flex items-center justify-center hover:bg-[#1da851] hover:scale-110 transition-all duration-300"
    >
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
    </>
  );
}
