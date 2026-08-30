"use client";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const go = (e, href) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); };

  const socials = [
    { label: "Instagram", href: "#", icon: (<><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></>) },
    { label: "Twitter", href: "#", icon: (<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>) },
    { label: "LinkedIn", href: "#", icon: (<><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></>) },
    { label: "Facebook", href: "#", icon: (<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>) },
  ];

  return (
    <footer className="bg-white border-t border-gray-200" role="contentinfo">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10">

          {/* Brand */}
          <div className="lg:col-span-4">
            <a href="#home" onClick={(e) => go(e, "#home")}>
              <Image src="/images/logo/logo.webp" alt="BrandMe" width={240} height={80} className="h-20 w-auto mb-6" />
            </a>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              {t.footer.desc}
            </p>
            <div className="flex gap-2">
              {socials.map((s, i) => (
                <a key={i} href={s.href} aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-[#6dc924] hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <nav className="lg:col-span-2">
            <h3 className="font-black text-gray-900 mb-4">{t.footer.services}</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#services" onClick={(e) => go(e, "#services")} className="hover:text-[#6dc924] transition-colors">Digital Marketing</a></li>
              <li><a href="#services" onClick={(e) => go(e, "#services")} className="hover:text-[#6dc924] transition-colors">Web Design</a></li>
              <li><a href="#services" onClick={(e) => go(e, "#services")} className="hover:text-[#6dc924] transition-colors">Software Dev</a></li>
              <li><a href="#services" onClick={(e) => go(e, "#services")} className="hover:text-[#6dc924] transition-colors">Mobile Apps</a></li>
            </ul>
          </nav>

          {/* Company */}
          <nav className="lg:col-span-2">
            <h3 className="font-black text-gray-900 mb-4">{t.footer.company}</h3>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#about" onClick={(e) => go(e, "#about")} className="hover:text-[#6dc924] transition-colors">{t.nav.about}</a></li>
              <li><a href="#portfolio" onClick={(e) => go(e, "#portfolio")} className="hover:text-[#6dc924] transition-colors">{t.nav.portfolio}</a></li>
              <li><a href="#blog" onClick={(e) => go(e, "#blog")} className="hover:text-[#6dc924] transition-colors">{t.nav.blog}</a></li>
              <li><a href="#contact" onClick={(e) => go(e, "#contact")} className="hover:text-[#6dc924] transition-colors">{t.nav.contact}</a></li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="lg:col-span-4">
            <h3 className="font-black text-gray-900 mb-4">{t.footer.newsletter}</h3>
            <p className="text-sm text-gray-500 mb-4">{t.footer.newsletterDesc}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#6dc924]"
              />
              <button className="bg-[#6dc924] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#58a71b] transition-colors">
                {t.footer.subscribe}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className="bg-gray-50 border-t border-gray-200 py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm font-medium text-gray-500">
          <p>&copy; {year} BrandMe Agency. {t.footer.rights}</p>
          <nav className="flex gap-6">
            <a href="#" className="hover:text-gray-900 transition-colors">{t.footer.privacy}</a>
            <a href="#" className="hover:text-gray-900 transition-colors">{t.footer.terms}</a>
            <a href="#" className="hover:text-gray-900 transition-colors">{t.footer.cookies}</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
