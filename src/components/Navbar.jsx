"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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
    if (window.location.pathname !== "/") {
      window.location.href = "/" + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  const navItems = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.portfolio, href: "#portfolio" },
    { label: t.nav.blog, href: "#blog" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const onlineStoreLabel = lang === "ar" ? "المتجر الإلكتروني" : "Online Store";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${scrolled ? "shadow-sm py-3" : "py-4"}`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#home" onClick={(e) => go(e, "#home")} aria-label="BrandMe">
          <Image src="/images/logo/logo.webp" alt="BrandMe" width={240} height={80} className="h-20 w-auto" priority />
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => go(e, item.href)}
              className={`px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors ${
                active === item.href.slice(1) ? "text-[#6dc924]" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/online-store"
            className="px-3.5 py-2 text-sm font-semibold rounded-lg transition-colors text-gray-600 hover:text-gray-900"
          >
            {onlineStoreLabel}
          </a>
        </nav>

        {/* CTA + Language Toggle */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 text-xs font-bold rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            {lang === "ar" ? "EN" : "عربي"}
          </button>
          <a href="#contact" onClick={(e) => go(e, "#contact")}
            className="bg-[#6dc924] text-white text-sm font-bold px-5 py-2.5 rounded-full hover:bg-[#58a71b] transition-colors shadow-md shadow-green-100">
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
          <a href="/online-store"
            className="text-gray-700 font-semibold px-3 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            {onlineStoreLabel}
          </a>
          <button
            onClick={toggleLang}
            className="mt-2 text-center bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-bold text-sm"
          >
            {lang === "ar" ? "English" : "العربية"}
          </button>
          <a href="#contact" onClick={(e) => go(e, "#contact")}
            className="mt-2 text-center bg-[#6dc924] text-white px-6 py-3 rounded-full font-bold text-sm">
            {t.nav.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
