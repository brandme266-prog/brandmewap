"use client";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

function Counter({ target, suffix, started }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!started) return;
    let v = 0;
    const step = target / 80;
    const t = setInterval(() => {
      v += step;
      if (v >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(v));
    }, 20);
    return () => clearInterval(t);
  }, [target, started]);
  return <>{val}{suffix}</>;
}

export default function HeroSection() {
  const { t } = useLanguage();
  const statsRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setStarted(true);
    }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const stats = [
    { value: 150, suffix: "+", label: t.hero.stats.clients },
    { value: 300, suffix: "+", label: t.hero.stats.projects },
    { value: 98,  suffix: "%", label: t.hero.stats.satisfaction },
    { value: 5,   suffix: "+", label: t.hero.stats.experience },
  ];

  return (
    <>
      <section id="home" className="bg-white pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
             style={{ backgroundImage: "linear-gradient(#000 1px,transparent 1px),linear-gradient(90deg,#000 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Content */}
            <div className="text-right">
              <div className="inline-flex items-center gap-2 bg-[#f0fce8] border border-[#c8e6a0] text-[#2d6a08] text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#6dc924] rounded-full animate-pulse-dot" />
                {t.hero.badge}
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-gray-900 leading-[1.1] mb-6">
                {t.hero.title1}
                <br />
                <span className="text-gradient">{t.hero.title2}</span>
              </h1>

              <p className="text-gray-500 text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
                {t.hero.desc}
              </p>

              <div className="flex flex-wrap items-center justify-end gap-4 mb-12">
                <button onClick={() => go("#contact")}
                  className="bg-[#6dc924] text-white px-8 py-4 rounded-full font-bold text-base hover:bg-[#58a71b] transition-colors shadow-lg shadow-green-100 flex items-center gap-2">
                  {t.hero.btn1}
                  <svg className="w-4 h-4 -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
                <button onClick={() => go("#portfolio")}
                  className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-bold text-base hover:border-gray-400 hover:bg-gray-50 transition-colors">
                  {t.hero.btn2}
                </button>
              </div>

              {/* Social proof */}
              <div className="flex items-center justify-end gap-4 pt-8 border-t border-gray-100">
                <div className="flex -space-x-2 space-x-reverse">
                  {["#f59e0b","#3b82f6","#ec4899","#8b5cf6"].map((c, i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold shadow-sm"
                      style={{ backgroundColor: c }}>
                      {["A","M","S","O"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-0.5 justify-end">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm font-semibold text-gray-600 mt-1">{t.hero.clients}</p>
                </div>
              </div>
            </div>

            {/* UI Composition */}
            <div className="relative h-[480px] w-full flex items-center justify-center">
              <div className="absolute right-4 top-10 w-[340px] bg-white rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 p-6 animate-float z-10">
                <div className="flex items-center justify-between mb-6 border-b border-gray-50 pb-4">
                  <div className="w-10 h-10 bg-[#f0fce8] rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#6dc924]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                    </svg>
                  </div>
                  <span className="text-sm font-bold text-gray-900">Campaign Performance</span>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "Reach", val: "2.4M", p: "80%" },
                    { label: "Engagement", val: "150K", p: "60%" },
                    { label: "Conversion", val: "12K", p: "40%" },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-1.5 font-semibold">
                        <span className="text-gray-500">{s.label}</span>
                        <span className="text-gray-900">{s.val}</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-[#6dc924] rounded-full" style={{ width: s.p }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute left-0 bottom-16 w-56 bg-white rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 p-5 animate-float-slow z-20">
                <p className="text-xs text-gray-500 font-bold mb-1">Growth Rate</p>
                <div className="flex items-center gap-3">
                  <p className="text-3xl font-black text-gray-900">+320%</p>
                  <svg className="w-6 h-6 text-[#6dc924]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
                  </svg>
                </div>
              </div>

              <div className="absolute left-10 top-0 w-48 bg-white rounded-2xl shadow-xl shadow-gray-200 border border-gray-100 p-5 animate-float-delay z-0">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
                    <span className="text-sm">⭐</span>
                  </div>
                  <p className="text-xs text-gray-500 font-bold">Client Satisfaction</p>
                </div>
                <p className="text-2xl font-black text-gray-900 text-center mt-2">98%</p>
              </div>

              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#6dc924]/5 rounded-full blur-3xl z-[-1]" />
            </div>

          </div>
        </div>
      </section>

      {/* PARTNERS */}
      <div className="bg-gray-50 border-y border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">{t.hero.partners}</p>
          <div className="flex flex-wrap justify-center items-center gap-10">
            {["noon", "tamara", "sidra", "jahez"].map((p, i) => (
              <span key={i} className="text-gray-500 font-bold text-base hover:text-gray-700 transition-colors cursor-default">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div ref={statsRef} className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100 divide-x-reverse">
            {stats.map((s, i) => (
              <div key={i} className="flex flex-col items-center">
                <p className="text-4xl md:text-5xl font-black text-gray-900 leading-none mb-3">
                  <Counter target={s.value} suffix={s.suffix} started={started} />
                </p>
                <p className="text-gray-500 text-sm font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
