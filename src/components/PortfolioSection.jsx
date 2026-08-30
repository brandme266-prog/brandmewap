"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const categories = ["الكل", "تصميم مواقع", "هوية بصرية", "تطبيقات جوال"];
const portfolio = [
  { id: 1, title: "منصة تعليمية متكاملة", cat: "تصميم مواقع", img: "/images/portfolio_ecommerce.png", client: "أكاديمية المستقبل", stats: { label: "زيادة الزيارات", val: "+120%" } },
  { id: 2, title: "تطبيق توصيل سريع", cat: "تطبيقات جوال", img: "/images/portfolio_app.png", client: "QuickDeliver", stats: { label: "تحميل التطبيق", val: "+50K" } },
  { id: 3, title: "تطوير هوية مطعم", cat: "هوية بصرية", img: "/images/portfolio_branding.png", client: "مطعم ريحان", stats: { label: "تفاعل السوشيال", val: "+300%" } },
  { id: 4, title: "متجر إلكتروني عصري", cat: "تصميم مواقع", img: "/images/portfolio_marketing.png", client: "إليجانس فاشن", stats: { label: "معدل التحويل", val: "4.8%" } },
];

export default function PortfolioSection() {
  const [activeCat, setActiveCat] = useState("الكل");
  const ref = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    ref.current?.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const filtered = activeCat === "الكل" ? portfolio : portfolio.filter(p => p.cat === activeCat);

  return (
    <section id="portfolio" className="py-24 bg-gray-50 border-b border-gray-100" aria-labelledby="portfolio-heading" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 reveal">
          <div>
            <span className="section-tag mb-4">أعمالنا</span>
            <h2 id="portfolio-heading" className="text-4xl md:text-5xl font-black text-gray-900 mt-4 leading-tight">
              أعمال تتحدث عن نفسها
            </h2>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                  activeCat === c
                    ? "bg-[#6dc924] text-white shadow-md shadow-green-100"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {filtered.map((item, i) => (
            <div key={item.id} className="reveal group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="relative h-[320px] w-full overflow-hidden bg-gray-100">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[#6dc924] bg-[#f0fce8] px-3 py-1 rounded-full">{item.cat}</span>
                  <span className="text-xs text-gray-500 font-medium">{item.client}</span>
                </div>
                <h3 className="text-xl font-black text-gray-900 mb-5 group-hover:text-[#6dc924] transition-colors">{item.title}</h3>
                <div className="flex items-center gap-4 pt-5 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{item.stats.label}</p>
                    <p className="font-black text-gray-900">{item.stats.val}</p>
                  </div>
                  <button className="mr-auto w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#6dc924] group-hover:text-white transition-all">
                    <svg className="w-4 h-4 -scale-x-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center reveal">
          <button className="border-2 border-gray-200 text-gray-700 px-8 py-3.5 rounded-full font-bold text-base hover:border-gray-400 transition-colors">
            عرض المزيد من الأعمال
          </button>
        </div>

      </div>
    </section>
  );
}
